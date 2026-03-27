'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Calendar, Clock, User, CheckCircle, Video } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getStoredRef } from '@/components/tracking/LeadTracker';

const IQ_API = process.env.NEXT_PUBLIC_IQ_API_URL || '';

interface TeamMember { id: number; name: string; }
interface MeetingType { id: string; label: string; duration: number; }

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [meetingTypes, setMeetingTypes] = useState<MeetingType[]>([]);
  const [selectedMember, setSelectedMember] = useState(0);
  const [selectedType, setSelectedType] = useState('discovery');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [notes, setNotes] = useState('');
  const [booking, setBooking] = useState(false);
  const [booked, setBooked] = useState<{ message: string; meetLink?: string } | null>(null);

  useEffect(() => {
    fetch('/api/booking').then(r => r.json()).then(d => {
      setTeam(d.team || []);
      setMeetingTypes(d.meetingTypes || []);
    }).catch(() => {});

    // Auto-fill from UTM ref if lead came from Hiraya IQ email
    const ref = getStoredRef();
    if (ref && IQ_API) {
      fetch(`${IQ_API}/communication/lead-by-ref/${encodeURIComponent(ref)}`)
        .then(r => r.ok ? r.json() : null)
        .then(data => {
          if (!data) return;
          if (data.business_name) setCompany(data.business_name);
          if (data.email) setEmail(data.email);
        })
        .catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (!selectedDate) return;
    setLoadingSlots(true);
    const duration = meetingTypes.find(t => t.id === selectedType)?.duration || 15;
    fetch(`/api/booking?date=${selectedDate}&member=${selectedMember}&duration=${duration}`)
      .then(r => r.json())
      .then(d => { setSlots(d.slots || []); setSelectedTime(''); })
      .catch(() => setSlots([]))
      .finally(() => setLoadingSlots(false));
  }, [selectedDate, selectedMember, selectedType]);

  async function handleBook() {
    if (!name || !email || !selectedDate || !selectedTime) return;
    setBooking(true);
    try {
      const duration = meetingTypes.find(t => t.id === selectedType)?.duration || 15;
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: selectedDate, time: selectedTime, duration, memberId: selectedMember, name, email, company, notes }),
      });
      const data = await res.json();
      if (data.success) {
        setBooked({ message: data.message, meetLink: data.meetLink });
        setStep(5);
      }
    } catch { }
    finally { setBooking(false); }
  }

  // Generate next 14 days
  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    if (d.getDay() === 0 || d.getDay() === 6) return null; // Skip weekends
    return d.toISOString().split('T')[0];
  }).filter(Boolean) as string[];

  function formatDate(d: string) {
    const date = new Date(d + 'T12:00:00');
    return { day: date.toLocaleDateString('en-US', { weekday: 'short' }), date: date.getDate(), month: date.toLocaleDateString('en-US', { month: 'short' }) };
  }

  function formatTime(t: string) {
    const [h, m] = t.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour = h > 12 ? h - 12 : h === 0 ? 12 : h;
    return `${hour}:${String(m).padStart(2, '0')} ${ampm}`;
  }

  if (step === 5 && booked) {
    return (
      <div className="min-h-screen bg-hiraya-light flex items-center justify-center px-6 relative overflow-hidden">
        {/* Confetti — 2 second burst from bottom corners at 45° */}
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
          {Array.from({ length: 30 }).map((_, i) => {
            const isLeft = i < 15;
            const colors = ['#3b5a96', '#f9b923', '#f39223', '#2a416f', '#5b7ec0', '#22c55e'];
            const color = colors[i % colors.length];
            const size = 6 + Math.random() * 6;
            const startX = isLeft ? -5 + Math.random() * 10 : 90 + Math.random() * 10;
            const endX = isLeft ? 15 + Math.random() * 35 : 50 + Math.random() * 35;
            const delay = Math.random() * 0.8;
            const duration = 1.5 + Math.random() * 1;
            const rotation = Math.random() * 720;
            const isCircle = Math.random() > 0.5;
            return (
              <div key={i} style={{
                position: 'absolute',
                left: `${startX}%`,
                bottom: '-2%',
                width: `${size}px`,
                height: isCircle ? `${size}px` : `${size * 2.5}px`,
                backgroundColor: color,
                borderRadius: isCircle ? '50%' : '2px',
                opacity: 0,
                animation: `confetti-${isLeft ? 'left' : 'right'} ${duration}s ease-out ${delay}s forwards`,
                // @ts-ignore
                '--end-x': `${endX}vw`,
                '--rotation': `${rotation}deg`,
              }} />
            );
          })}
        </div>

        <div className="max-w-md w-full text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-50 mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-3">You&apos;re booked!</h2>
          <p className="text-slate-600 mb-6">{booked.message}</p>
          {booked.meetLink && (
            <a href={booked.meetLink} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#3b5a96] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#2a416f] transition-colors mb-4">
              <Video className="w-5 h-5" /> Open Google Meet
            </a>
          )}
          <p className="text-sm text-slate-500 mt-4">A calendar invite has been sent to {email}</p>
          <Link href="/" className="inline-block mt-6 text-[#3b5a96] font-medium hover:underline">
            ← Back to portfolio
          </Link>
        </div>

        <style jsx>{`
          @keyframes confetti-left {
            0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
            100% { transform: translate(var(--end-x), -120vh) rotate(var(--rotation)); opacity: 0; }
          }
          @keyframes confetti-right {
            0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
            100% { transform: translate(calc(var(--end-x) * -1), -120vh) rotate(var(--rotation)); opacity: 0; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hiraya-light">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Hiraya Digital" width={160} height={44} className="object-contain h-10 w-auto" />
          </Link>
          <div className="text-sm text-slate-500">Schedule a Meeting</div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-10">
          {['Meeting Type', 'Date & Time', 'Your Details', 'Confirm'].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                step > i + 1 ? 'bg-green-500 text-white' : step === i + 1 ? 'bg-[#3b5a96] text-white' : 'bg-slate-200 text-slate-500'
              }`}>{step > i + 1 ? '✓' : i + 1}</div>
              <span className={`text-sm font-medium hidden sm:inline ${step === i + 1 ? 'text-slate-900' : 'text-slate-400'}`}>{label}</span>
              {i < 3 && <div className="w-8 h-px bg-slate-200 hidden sm:block" />}
            </div>
          ))}
        </div>

        {/* Step 1: Meeting Type & Team */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">What type of meeting?</h2>
            <p className="text-slate-600 mb-8">Choose the meeting type and who you&apos;d like to speak with.</p>

            <div className="grid gap-4 mb-8">
              {meetingTypes.map((mt) => (
                <button key={mt.id} onClick={() => setSelectedType(mt.id)}
                  className={`flex items-center gap-4 p-5 rounded-xl border-2 text-left transition-all ${
                    selectedType === mt.id ? 'border-[#3b5a96] bg-blue-50' : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}>
                  <Clock className={`w-6 h-6 ${selectedType === mt.id ? 'text-[#3b5a96]' : 'text-slate-400'}`} />
                  <div>
                    <div className="font-semibold text-slate-900">{mt.label}</div>
                    <div className="text-sm text-slate-500">{mt.duration} minutes</div>
                  </div>
                </button>
              ))}
            </div>

            <h3 className="font-semibold text-slate-900 mb-4">Meet with</h3>
            <div className="grid gap-3 mb-8">
              {team.map((m) => (
                <button key={m.id} onClick={() => setSelectedMember(m.id)}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                    selectedMember === m.id ? 'border-[#3b5a96] bg-blue-50' : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    selectedMember === m.id ? 'bg-[#3b5a96] text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <User className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-slate-900">{m.name}</span>
                </button>
              ))}
            </div>

            <button onClick={() => setStep(2)} className="bg-[#3b5a96] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#2a416f] transition-colors flex items-center gap-2">
              Next <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Date & Time */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Pick a date & time</h2>
            <p className="text-slate-600 mb-8">All times in Pacific Time (California).</p>

            <div className="flex gap-3 overflow-x-auto pb-4 mb-8">
              {dates.map((d) => {
                const f = formatDate(d);
                return (
                  <button key={d} onClick={() => setSelectedDate(d)}
                    className={`flex-shrink-0 w-20 py-4 rounded-xl border-2 text-center transition-all ${
                      selectedDate === d ? 'border-[#3b5a96] bg-blue-50' : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}>
                    <div className="text-xs text-slate-500 font-medium">{f.day}</div>
                    <div className="text-2xl font-bold text-slate-900">{f.date}</div>
                    <div className="text-xs text-slate-500">{f.month}</div>
                  </button>
                );
              })}
            </div>

            {selectedDate && (
              <div>
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#3b5a96]" />
                  Available times for {formatDate(selectedDate).month} {formatDate(selectedDate).date}
                </h3>
                {loadingSlots ? (
                  <p className="text-slate-500">Checking availability...</p>
                ) : slots.length === 0 ? (
                  <p className="text-slate-500">No available slots on this day. Try another date.</p>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 mb-8">
                    {slots.map((t) => (
                      <button key={t} onClick={() => setSelectedTime(t)}
                        className={`py-3 rounded-lg border text-sm font-medium transition-all ${
                          selectedTime === t ? 'border-[#3b5a96] bg-[#3b5a96] text-white' : 'border-slate-200 hover:border-[#3b5a96] text-slate-700 bg-white'
                        }`}>
                        {formatTime(t)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="px-6 py-3 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button onClick={() => setStep(3)} disabled={!selectedDate || !selectedTime}
                className="bg-[#3b5a96] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#2a416f] disabled:opacity-40 transition-colors flex items-center gap-2">
                Next <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Details */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Your details</h2>
            <p className="text-slate-600 mb-8">So we can prepare for our conversation.</p>

            <div className="max-w-md space-y-5 mb-8">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Name *</label>
                <input value={name} onChange={(e) => setName(e.target.value)} required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#3b5a96] focus:ring-1 focus:ring-[#3b5a96] bg-white" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email *</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#3b5a96] focus:ring-1 focus:ring-[#3b5a96] bg-white" placeholder="you@company.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Company</label>
                <input value={company} onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#3b5a96] focus:ring-1 focus:ring-[#3b5a96] bg-white" placeholder="Your company" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Anything you&apos;d like to discuss?</label>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#3b5a96] focus:ring-1 focus:ring-[#3b5a96] bg-white resize-none" placeholder="Optional" />
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="px-6 py-3 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button onClick={() => setStep(4)} disabled={!name || !email}
                className="bg-[#3b5a96] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#2a416f] disabled:opacity-40 transition-colors flex items-center gap-2">
                Review <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Confirm */}
        {step === 4 && (
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Confirm your booking</h2>
            <p className="text-slate-600 mb-8">Review the details below.</p>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8 max-w-md space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Meeting</span>
                <span className="font-medium text-slate-900">{meetingTypes.find(t => t.id === selectedType)?.label}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">With</span>
                <span className="font-medium text-slate-900">{team[selectedMember]?.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Date</span>
                <span className="font-medium text-slate-900">{selectedDate && `${formatDate(selectedDate).month} ${formatDate(selectedDate).date}`}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Time</span>
                <span className="font-medium text-slate-900">{selectedTime && formatTime(selectedTime)} PT</span>
              </div>
              <div className="border-t border-slate-100 pt-4 flex justify-between text-sm">
                <span className="text-slate-500">Name</span>
                <span className="font-medium text-slate-900">{name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Email</span>
                <span className="font-medium text-slate-900">{email}</span>
              </div>
              {company && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Company</span>
                  <span className="font-medium text-slate-900">{company}</span>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(3)} className="px-6 py-3 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button onClick={handleBook} disabled={booking}
                className="bg-[#3b5a96] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#2a416f] disabled:opacity-40 transition-colors">
                {booking ? 'Booking...' : 'Confirm Booking'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
