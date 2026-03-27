import { NextRequest, NextResponse } from 'next/server';

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';

let SA_KEY: any = null;
try {
  if (process.env.GOOGLE_CALENDAR_SA_KEY && process.env.GOOGLE_CALENDAR_SA_KEY.startsWith('{')) {
    SA_KEY = JSON.parse(process.env.GOOGLE_CALENDAR_SA_KEY);
  } else {
    // Try multiple paths — standalone build moves the working directory
    const paths = [
      join(process.cwd(), 'calendar-sa-key.json'),
      join(process.cwd(), '..', 'calendar-sa-key.json'),
      join(process.cwd(), '..', '..', 'calendar-sa-key.json'),
      '/var/www/hd-portfolio/calendar-sa-key.json',
    ];
    for (const p of paths) {
      if (existsSync(p)) {
        SA_KEY = JSON.parse(readFileSync(p, 'utf-8'));
        break;
      }
    }
  }
} catch (e) { console.error('Calendar SA key load error:', e); }

const TEAM = [
  { name: 'Content Strategy', email: 'content_writer1@hiraya.digital', calendarId: 'content_writer1@hiraya.digital' },
  { name: 'HR & Operations', email: 'hr@hiraya.digital', calendarId: 'hr@hiraya.digital' },
];

const MEETING_TYPES = [
  { id: 'discovery', label: 'Discovery Call', duration: 15 },
  { id: 'strategy', label: 'Strategy Session', duration: 30 },
];

const WORKING_HOURS = { start: 9, end: 17 }; // 9am-5pm Pacific
const SLOT_INTERVAL = 15; // minutes

// Generate JWT for Google API auth
async function getAccessToken(): Promise<string> {
  if (!SA_KEY) throw new Error('Calendar service account not configured');

  const header = btoa(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const now = Math.floor(Date.now() / 1000);
  const claim = btoa(JSON.stringify({
    iss: SA_KEY.client_email,
    scope: 'https://www.googleapis.com/auth/calendar',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  }));

  // Sign with private key
  const crypto = await import('crypto');
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(`${header}.${claim}`);
  const signature = sign.sign(SA_KEY.private_key, 'base64url');

  const jwt = `${header}.${claim}.${signature}`;

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });

  const tokenData = await tokenRes.json();
  if (!tokenData.access_token) throw new Error('Failed to get access token');
  return tokenData.access_token;
}

// GET: Return available slots for a given date and team member
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date'); // YYYY-MM-DD
  const memberId = searchParams.get('member') || '0';
  const duration = parseInt(searchParams.get('duration') || '15');

  if (!date) {
    return NextResponse.json({ team: TEAM.map((t, i) => ({ id: i, name: t.name })), meetingTypes: MEETING_TYPES });
  }

  if (!SA_KEY) {
    // Fallback: return all slots as available (no calendar check)
    const slots = generateSlots(date, duration);
    return NextResponse.json({ date, slots, member: TEAM[parseInt(memberId)]?.name });
  }

  try {
    const member = TEAM[parseInt(memberId)];
    if (!member) return NextResponse.json({ error: 'Invalid team member' }, { status: 400 });

    const token = await getAccessToken();
    const dayStart = `${date}T${String(WORKING_HOURS.start).padStart(2, '0')}:00:00-07:00`;
    const dayEnd = `${date}T${String(WORKING_HOURS.end).padStart(2, '0')}:00:00-07:00`;

    // Get existing events
    const calRes = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(member.calendarId)}/events?timeMin=${encodeURIComponent(dayStart)}&timeMax=${encodeURIComponent(dayEnd)}&singleEvents=true&orderBy=startTime`,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    let busySlots: Array<{ start: string; end: string }> = [];
    if (calRes.ok) {
      const calData = await calRes.json();
      busySlots = (calData.items || []).map((e: any) => ({
        start: e.start?.dateTime || e.start?.date,
        end: e.end?.dateTime || e.end?.date,
      }));
    }

    // Generate available slots
    const allSlots = generateSlots(date, duration);
    const available = allSlots.filter((slot) => {
      const slotStart = new Date(`${date}T${slot}:00-07:00`).getTime();
      const slotEnd = slotStart + duration * 60 * 1000;
      return !busySlots.some((busy) => {
        const busyStart = new Date(busy.start).getTime();
        const busyEnd = new Date(busy.end).getTime();
        return slotStart < busyEnd && slotEnd > busyStart;
      });
    });

    return NextResponse.json({ date, slots: available, member: member.name });
  } catch (err: any) {
    console.error('Booking slots error:', err.message);
    const slots = generateSlots(date, duration);
    return NextResponse.json({ date, slots, member: TEAM[parseInt(memberId)]?.name });
  }
}

// Rate limiting for bookings
const bookingLimiter = new Map<string, { count: number; resetAt: number }>();

function checkBookingLimit(ip: string): boolean {
  const now = Date.now();
  const entry = bookingLimiter.get(ip);
  if (!entry || now > entry.resetAt) {
    bookingLimiter.set(ip, { count: 1, resetAt: now + 3600000 });
    return true;
  }
  if (entry.count >= 5) return false; // Max 5 bookings per hour per IP
  entry.count++;
  return true;
}

// POST: Book a slot
export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    if (!checkBookingLimit(ip)) {
      return NextResponse.json({ error: 'Too many booking attempts. Please try again later.' }, { status: 429 });
    }

    const body = await req.json();
    const { date, time, duration, memberId, name, email, company, notes, ref } = body;

    // Honeypot check
    if (body.website) {
      return NextResponse.json({ success: true, message: 'Booking confirmed!' });
    }

    if (!date || !time || !name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const member = TEAM[parseInt(memberId || '0')];
    if (!member) return NextResponse.json({ error: 'Invalid team member' }, { status: 400 });

    const meetingDuration = parseInt(duration || '15');
    const startDateTime = `${date}T${time}:00-07:00`; // Pacific time
    const endDate = new Date(new Date(startDateTime).getTime() + meetingDuration * 60 * 1000);
    const endDateTime = endDate.toISOString();

    if (SA_KEY) {
      const token = await getAccessToken();

      // Create calendar event
      const event = {
        summary: `Discovery Call — ${name} (${company || 'N/A'})`,
        description: `Booked via Hiraya Digital portfolio\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\nNotes: ${notes || 'None'}`,
        start: { dateTime: startDateTime, timeZone: 'America/Los_Angeles' },
        end: { dateTime: endDateTime, timeZone: 'America/Los_Angeles' },
        attendees: [
          { email: member.email },
          { email },
        ],
        conferenceData: {
          createRequest: {
            requestId: `hiraya-${Date.now()}`,
            conferenceSolutionKey: { type: 'hangoutsMeet' },
          },
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 30 },
            { method: 'popup', minutes: 15 },
          ],
        },
      };

      const createRes = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(member.calendarId)}/events?conferenceDataVersion=1&sendUpdates=all`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(event),
        },
      );

      if (createRes.ok) {
        const created = await createRes.json();
        const meetLink = created.conferenceData?.entryPoints?.find((e: any) => e.entryPointType === 'video')?.uri;

        // Notify Hiraya IQ team
        notifyHirayaIQ({ name, email, company, date, time, duration: meetingDuration, member: member.name, ref }).catch(() => {});

        return NextResponse.json({
          success: true,
          meetLink,
          eventId: created.id,
          message: `Meeting booked with ${member.name} on ${date} at ${time} PT`,
        });
      } else {
        const err = await createRes.text();
        console.error('Calendar create error:', err);
      }
    }

    // Notify Hiraya IQ team
    notifyHirayaIQ({ name, email, company, date, time, duration: meetingDuration, member: member.name, ref }).catch(() => {});

    // Fallback — no calendar, just confirm
    return NextResponse.json({
      success: true,
      meetLink: null,
      message: `Booking confirmed with ${member.name} on ${date} at ${time} PT. We'll send you a calendar invite shortly.`,
    });
  } catch (err: any) {
    console.error('Booking error:', err.message);
    return NextResponse.json({ error: 'Booking failed. Please try again.' }, { status: 500 });
  }
}

const IQ_API = process.env.NEXT_PUBLIC_IQ_API_URL || '';

async function notifyHirayaIQ(data: { name: string; email: string; company: string; date: string; time: string; duration: number; member: string; ref?: string }) {
  if (!IQ_API) return;
  await fetch(`${IQ_API}/communication/webhook/booking`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

function generateSlots(date: string, duration: number): string[] {
  const slots: string[] = [];
  for (let h = WORKING_HOURS.start; h < WORKING_HOURS.end; h++) {
    for (let m = 0; m < 60; m += SLOT_INTERVAL) {
      // Check if slot + duration fits within working hours
      const totalMinutes = h * 60 + m + duration;
      if (totalMinutes <= WORKING_HOURS.end * 60) {
        slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
      }
    }
  }
  return slots;
}
