'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { X, Send, Calendar, Clock, User, ChevronRight, Check, ArrowLeft, ExternalLink } from 'lucide-react';
import { getStoredRef } from '@/components/tracking/LeadTracker';

const IQ_API = process.env.NEXT_PUBLIC_IQ_API_URL || '';
const MAX_MESSAGES = 25;
const LEAD_CAPTURE_AFTER = 5;

type MessageType = 'text' | 'services' | 'booking_prompt' | 'booking_dates' | 'booking_times' | 'booking_form' | 'booking_confirm' | 'lead_capture' | 'contact_card';

interface ChatMessage {
  role: 'user' | 'assistant';
  type: MessageType;
  content: string;
  data?: any;
}

// Format markdown-like text to HTML
function formatMessage(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code style="background:#f1f5f9;padding:1px 4px;border-radius:3px;font-size:12px;">$1</code>')
    .replace(/\n- /g, '\n• ')
    .replace(/\n\d+\.\s/g, (m) => `\n${m.trim()} `)
    .replace(/\n/g, '<br/>')
    .replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener" style="color:#3b5a96;text-decoration:underline;">$1</a>')
    .replace(/portfolio\.hiraya\.digital/g, '<a href="https://portfolio.hiraya.digital" target="_blank" rel="noopener" style="color:#3b5a96;text-decoration:underline;font-weight:500;">portfolio.hiraya.digital</a>');
}

export default function ChatOrb() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [leadCaptured, setLeadCaptured] = useState(false);

  // Booking state
  const [bookingStep, setBookingStep] = useState<'idle' | 'date' | 'time' | 'form' | 'done'>('idle');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingSlots, setBookingSlots] = useState<string[]>([]);
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingCompany, setBookingCompany] = useState('');

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      setTimeout(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }, 100);
    }
  }, [messages, bookingStep]);

  function addMessage(msg: ChatMessage) {
    setMessages((prev) => [...prev, msg]);
  }

  function handleOpen() {
    setOpen(true);
    if (messages.length === 0) {
      addMessage({
        role: 'assistant', type: 'text',
        content: "Hey! I'm Hiraya's growth assistant. I can help you understand our capabilities, show you our work, or even book a call with our team right here. What are you looking for?",
      });
      // Notify IQ that a chat session started
      if (IQ_API) {
        const ref = getStoredRef();
        if (ref) {
          fetch(`${IQ_API}/communication/webhook/portfolio-visit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ref, utm: {}, page: '/chatbot-opened',
              timestamp: new Date().toISOString(),
            }),
          }).catch(() => {});
        }
      }
    }
  }

  async function handleSend() {
    if (!input.trim() || thinking) return;
    if (messageCount >= MAX_MESSAGES) {
      addMessage({ role: 'assistant', type: 'contact_card', content: "We've had a great chat! Here's how to continue the conversation:" });
      return;
    }

    const userMsg = input.trim();
    setInput('');
    addMessage({ role: 'user', type: 'text', content: userMsg });
    setMessageCount((c) => c + 1);
    setThinking(true);

    // Detect intent
    const lower = userMsg.toLowerCase();
    const isBooking = /book|schedule|meeting|call|appointment|speak|talk to/.test(lower);
    const isServices = /service|what do you|what can you|offer|help|capabilit/.test(lower);
    const isContact = /contact|email|reach|phone|address/.test(lower);
    const isPortfolio = /portfolio|work|project|example|case stud/.test(lower);

    if (isBooking && bookingStep === 'idle') {
      setThinking(false);
      startBookingFlow();
      return;
    }

    if (isContact) {
      setThinking(false);
      addMessage({ role: 'assistant', type: 'contact_card', content: 'Here\'s how to reach us:' });
      return;
    }

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, history: messages.filter(m => m.type === 'text').slice(-8) }),
      });
      const data = await res.json();
      addMessage({ role: 'assistant', type: 'text', content: data.reply });

      // After services question, show action cards
      if (isServices) {
        setTimeout(() => addMessage({ role: 'assistant', type: 'services', content: '' }), 600);
      }

      // After portfolio question, show link
      if (isPortfolio) {
        setTimeout(() => addMessage({
          role: 'assistant', type: 'text',
          content: '👉 **Check out our work:** [portfolio.hiraya.digital](https://portfolio.hiraya.digital)',
        }), 500);
      }

      // Show lead capture after enough messages
      if (messageCount + 1 >= LEAD_CAPTURE_AFTER && !leadCaptured) {
        setTimeout(() => addMessage({ role: 'assistant', type: 'lead_capture', content: '' }), 2000);
      }
    } catch {
      addMessage({ role: 'assistant', type: 'text', content: "Something went wrong. Try again or reach us at hello@hirayadigital.com" });
    } finally {
      setThinking(false);
    }
  }

  // === BOOKING FLOW ===
  function startBookingFlow() {
    setBookingStep('date');
    addMessage({ role: 'assistant', type: 'text', content: "Let's get you booked! Pick a date that works:" });
    addMessage({ role: 'assistant', type: 'booking_dates', content: '' });
  }

  async function selectDate(date: string) {
    setBookingDate(date);
    setBookingStep('time');
    const formatted = new Date(date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    addMessage({ role: 'user', type: 'text', content: formatted });
    addMessage({ role: 'assistant', type: 'text', content: 'Great choice! Here are the available slots:' });

    try {
      const res = await fetch(`/api/booking?date=${date}&member=0&duration=15`);
      const data = await res.json();
      setBookingSlots(data.slots || []);
      addMessage({ role: 'assistant', type: 'booking_times', content: '', data: data.slots || [] });
    } catch {
      addMessage({ role: 'assistant', type: 'text', content: 'Could not load times. Try the booking page instead.' });
      setBookingStep('idle');
    }
  }

  function selectTime(time: string) {
    setBookingTime(time);
    setBookingStep('form');
    const h = parseInt(time.split(':')[0]);
    const m = time.split(':')[1];
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour = h > 12 ? h - 12 : h;
    addMessage({ role: 'user', type: 'text', content: `${hour}:${m} ${ampm} PT` });
    addMessage({ role: 'assistant', type: 'text', content: 'Almost there! Just need a couple details:' });
    addMessage({ role: 'assistant', type: 'booking_form', content: '' });
  }

  async function submitBooking() {
    if (!bookingName || !bookingEmail) return;
    setBookingStep('done');
    addMessage({ role: 'user', type: 'text', content: `${bookingName} — ${bookingEmail}` });
    setThinking(true);

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: bookingDate, time: bookingTime, duration: 15,
          memberId: 0, name: bookingName, email: bookingEmail, company: bookingCompany,
          ref: getStoredRef() || undefined,
        }),
      });
      const data = await res.json();
      addMessage({ role: 'assistant', type: 'booking_confirm', content: data.message || 'Booking confirmed!', data: { meetLink: data.meetLink } });
    } catch {
      addMessage({ role: 'assistant', type: 'text', content: 'Booking failed. Please try our booking page at portfolio.hiraya.digital/book' });
    } finally {
      setThinking(false);
      setBookingStep('idle');
    }
  }

  async function handleLeadCapture(name: string, email: string) {
    setLeadCaptured(true);
    if (IQ_API) {
      // Build conversation summary from user messages
      const userMessages = messages
        .filter(m => m.role === 'user' && m.type === 'text')
        .map(m => m.content);
      const chatSummary = userMessages.length > 0
        ? userMessages.slice(0, 10).join(' | ')
        : 'No messages before capture';

      fetch(`${IQ_API}/communication/webhook/portfolio-inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, company: '', email, projectType: 'Chat Inquiry',
          ref: getStoredRef(), utm: {}, source: 'chatbot_capture',
          chatMessages: messageCount,
          chatSummary,
        }),
      }).catch(() => {});
    }
  }

  // Generate next 10 weekdays
  const bookingDates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() + i + 1);
    return d.getDay() !== 0 && d.getDay() !== 6 ? d.toISOString().split('T')[0] : null;
  }).filter(Boolean).slice(0, 8) as string[];

  function formatTimeLabel(t: string) {
    const [h, m] = t.split(':').map(Number);
    return `${h > 12 ? h - 12 : h}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
  }

  return (
    <>
      {/* === FLOATING ORB — Matrix Sphere + Label === */}
      {!open && (
        <button onClick={handleOpen} className="fixed bottom-6 right-6 z-50 group flex items-center gap-3" aria-label="Chat with us">
          {/* Chat label — slides in from right */}
          <div className="relative">
            <div className="px-4 py-2.5 bg-white rounded-full shadow-lg border border-slate-200 text-sm font-semibold text-[#2a416f] whitespace-nowrap group-hover:bg-[#3b5a96] group-hover:text-white group-hover:border-[#3b5a96] transition-all duration-300 animate-[chatLabelPulse_3s_ease-in-out_infinite]">
              Chat with us
            </div>
            {/* Arrow pointing to orb */}
            <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-white border-r border-b border-slate-200 rotate-[-45deg] group-hover:bg-[#3b5a96] group-hover:border-[#3b5a96] transition-all duration-300" />
          </div>

          {/* Orb */}
          <div className="relative w-[64px] h-[64px]">
            {/* Glow */}
            <div className="absolute inset-[-6px] rounded-full bg-[#3b5a96] opacity-30 blur-xl group-hover:opacity-50 transition-opacity" />
            {/* Notification dot */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full z-10 border-2 border-white shadow-sm">
              <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
            </div>
            {/* Sphere */}
            <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl group-hover:scale-110 transition-transform bg-gradient-to-br from-[#1a2d52] via-[#2a416f] to-[#3b5a96]">
              {/* Grid lines — matrix effect */}
              <svg className="absolute inset-0 w-full h-full animate-[spin_20s_linear_infinite]" viewBox="0 0 64 64">
                {/* Horizontal arcs */}
                {[16, 24, 32, 40, 48].map((y) => (
                  <ellipse key={`h${y}`} cx="32" cy="32" rx={Math.sqrt(32*32 - (y-32)*(y-32))} ry={Math.abs(y-32)*0.3+2} fill="none" stroke="rgba(96,165,250,0.3)" strokeWidth="0.5" />
                ))}
                {/* Vertical arcs */}
                {[16, 24, 32, 40, 48].map((x) => (
                  <ellipse key={`v${x}`} cx="32" cy="32" rx={Math.abs(x-32)*0.3+2} ry={Math.sqrt(32*32 - (x-32)*(x-32))} fill="none" stroke="rgba(96,165,250,0.3)" strokeWidth="0.5" />
                ))}
              </svg>
              {/* Wave bars */}
              <div className="absolute bottom-[14px] left-1/2 -translate-x-1/2 flex gap-[3px] items-end">
                {[12, 18, 24, 18, 12].map((h, i) => (
                  <div key={i} className="w-[3px] rounded-full bg-[#60a5fa]" style={{
                    height: `${h}px`,
                    animation: `waveBar 1.2s ease-in-out ${i * 0.15}s infinite`,
                    boxShadow: '0 0 4px rgba(96,165,250,0.6)',
                  }} />
                ))}
              </div>
              {/* Highlight */}
              <div className="absolute top-2 left-3 w-4 h-4 rounded-full bg-white/10 blur-[3px]" />
            </div>
            {/* Pulse ring */}
            <div className="absolute inset-[-4px] rounded-full border border-[#3b5a96]/40 animate-[ping_4s_ease-in-out_infinite]" />
          </div>
        </button>
      )}

      {/* === CHAT WINDOW === */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-24px)] h-[600px] max-h-[calc(100vh-80px)] flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">

          {/* Header with animated orb */}
          <div className="flex items-center gap-3 px-5 py-3.5 bg-gradient-to-r from-[#2a416f] to-[#3b5a96] text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#3b5a96]/0 via-white/5 to-[#f9b923]/10 animate-[shimmer_4s_ease-in-out_infinite]" />
            {/* Matrix sphere avatar — header */}
            <div className="relative w-10 h-10 flex-shrink-0">
              <div className={`w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-[#1a2d52] via-[#2a416f] to-[#3b5a96] ${thinking ? '' : ''}`}>
                <svg className="absolute inset-0 w-full h-full animate-[spin_15s_linear_infinite]" viewBox="0 0 40 40">
                  {[12, 17, 23, 28].map((y) => (
                    <ellipse key={y} cx="20" cy="20" rx={Math.sqrt(20*20-(y-20)*(y-20))} ry={Math.abs(y-20)*0.3+1.5} fill="none" stroke="rgba(96,165,250,0.35)" strokeWidth="0.4" />
                  ))}
                </svg>
                <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 flex gap-[2px] items-end">
                  {[7, 11, 14, 11, 7].map((h, i) => (
                    <div key={i} className="w-[2px] rounded-full bg-[#60a5fa]" style={{
                      height: `${h}px`,
                      animation: thinking ? `waveBar 0.6s ease-in-out ${i * 0.1}s infinite` : `waveBar 1.4s ease-in-out ${i * 0.15}s infinite`,
                      boxShadow: '0 0 3px rgba(96,165,250,0.5)',
                    }} />
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#2a416f] bg-green-400" />
            </div>
            <div className="flex-1 relative z-10">
              <div className="font-semibold text-[15px]">Hiraya Assistant</div>
              <div className="text-[12px] text-blue-200 font-medium">{thinking ? '● Thinking...' : '● Online'}</div>
            </div>
            <button onClick={() => setOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors relative z-10">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gradient-to-b from-slate-50 to-white">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-[fadeUp_0.3s_ease]`}>
                {renderMessage(msg, i)}
              </div>
            ))}

            {thinking && (
              <div className="flex justify-start animate-[fadeUp_0.2s_ease]">
                <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                  <div className="flex gap-1.5 items-center">
                    <div className="w-2 h-2 bg-[#3b5a96] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-[#4a6db5] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-[#f9b923] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="px-4 py-3 bg-white border-t border-slate-100">
            {messageCount >= MAX_MESSAGES ? (
              <p className="text-center text-sm text-slate-400 py-1">Chat limit reached — use the contact form below</p>
            ) : (
              <div className="flex gap-2">
                <input
                  value={input} onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[14px] focus:outline-none focus:border-[#3b5a96] transition-colors"
                />
                <button onClick={handleSend} disabled={!input.trim() || thinking}
                  className="w-10 h-10 flex items-center justify-center bg-[#3b5a96] text-white rounded-xl hover:bg-[#2a416f] disabled:opacity-30 transition-colors flex-shrink-0">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes glow { 0%,100% { opacity: 0.3; } 50% { opacity: 0.6; } }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes waveBar {
          0%, 100% { transform: scaleY(0.4); opacity: 0.5; }
          50% { transform: scaleY(1); opacity: 1; }
        }
        @keyframes chatLabelPulse {
          0%, 100% { box-shadow: 0 2px 8px rgba(59,90,150,0.15); }
          50% { box-shadow: 0 4px 20px rgba(59,90,150,0.35); }
        }
      `}</style>
    </>
  );

  // === RICH MESSAGE RENDERER ===
  function renderMessage(msg: ChatMessage, idx: number) {
    // User messages
    if (msg.role === 'user') {
      return (
        <div className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-br-sm bg-[#3b5a96] text-white text-[14px] leading-relaxed">
          {msg.content}
        </div>
      );
    }

    // Service cards
    if (msg.type === 'services') {
      const services = [
        { icon: '🚀', title: 'Growth Engineering', desc: 'Revenue-driving systems & funnels' },
        { icon: '⚡', title: 'Marketing Automation', desc: 'Email flows, CRM, lead nurturing' },
        { icon: '🤖', title: 'AI Integration', desc: 'Chatbots, AI workflows, smart tools' },
        { icon: '💻', title: 'Custom Development', desc: 'Websites, apps, dashboards' },
        { icon: '📱', title: 'Social & Messenger', desc: 'FB, IG, WhatsApp, YouTube DMs' },
        { icon: '📈', title: 'SEO & Digital Marketing', desc: 'Search, ads, content strategy' },
      ];
      return (
        <div className="max-w-[90%] space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {services.map((s) => (
              <div key={s.title} className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm hover:border-[#3b5a96]/30 transition-colors">
                <div className="text-lg mb-1">{s.icon}</div>
                <div className="text-[13px] font-semibold text-slate-800">{s.title}</div>
                <div className="text-[11px] text-slate-500">{s.desc}</div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <button onClick={startBookingFlow} className="flex items-center gap-1.5 bg-[#3b5a96] text-white text-[12px] px-4 py-2 rounded-lg font-medium hover:bg-[#2a416f] transition-colors">
              <Calendar className="w-3.5 h-3.5" /> Book a Call
            </button>
            <a href="https://portfolio.hiraya.digital" target="_blank" rel="noopener"
              className="flex items-center gap-1.5 border border-slate-200 text-slate-600 text-[12px] px-4 py-2 rounded-lg font-medium hover:bg-slate-50 transition-colors">
              <ExternalLink className="w-3.5 h-3.5" /> See Our Work
            </a>
          </div>
        </div>
      );
    }

    // Contact card
    if (msg.type === 'contact_card') {
      return (
        <div className="max-w-[90%] bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3">
          <p className="text-[13px] text-slate-600">{msg.content}</p>
          <div className="space-y-2 text-[13px]">
            <div className="flex items-center gap-2 text-slate-700"><span className="text-base">📧</span> hello@hirayadigital.com</div>
            <a href="https://portfolio.hiraya.digital" target="_blank" rel="noopener" className="flex items-center gap-2 text-[#3b5a96] font-medium"><span className="text-base">🌐</span> portfolio.hiraya.digital</a>
            <a href="https://portfolio.hiraya.digital/book" target="_blank" rel="noopener" className="flex items-center gap-2 text-[#3b5a96] font-medium"><span className="text-base">📅</span> Book a meeting</a>
          </div>
        </div>
      );
    }

    // Booking: date picker
    if (msg.type === 'booking_dates') {
      return (
        <div className="max-w-[90%] space-y-2">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {bookingDates.map((d) => {
              const dt = new Date(d + 'T12:00:00');
              return (
                <button key={d} onClick={() => selectDate(d)}
                  className="flex-shrink-0 w-16 py-3 rounded-xl border border-slate-200 text-center bg-white hover:border-[#3b5a96] hover:bg-blue-50 transition-all shadow-sm">
                  <div className="text-[10px] text-slate-400 font-medium">{dt.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                  <div className="text-[18px] font-bold text-slate-800">{dt.getDate()}</div>
                  <div className="text-[10px] text-slate-400">{dt.toLocaleDateString('en-US', { month: 'short' })}</div>
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    // Booking: time picker
    if (msg.type === 'booking_times') {
      const slots = msg.data || bookingSlots;
      return (
        <div className="max-w-[90%]">
          <div className="grid grid-cols-3 gap-1.5">
            {(slots as string[]).slice(0, 12).map((t: string) => (
              <button key={t} onClick={() => selectTime(t)}
                className="py-2 rounded-lg border border-slate-200 text-[12px] font-medium text-slate-700 bg-white hover:border-[#3b5a96] hover:bg-blue-50 hover:text-[#3b5a96] transition-all shadow-sm">
                {formatTimeLabel(t)}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-slate-400 mt-2">All times in Pacific Time (PT)</p>
        </div>
      );
    }

    // Booking: inline form
    if (msg.type === 'booking_form') {
      return (
        <div className="max-w-[90%] bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3">
          <input value={bookingName} onChange={(e) => setBookingName(e.target.value)} placeholder="Your name *"
            className="w-full px-3 py-2 text-[13px] border border-slate-200 rounded-lg focus:outline-none focus:border-[#3b5a96] bg-slate-50" />
          <input type="email" value={bookingEmail} onChange={(e) => setBookingEmail(e.target.value)} placeholder="Email *"
            className="w-full px-3 py-2 text-[13px] border border-slate-200 rounded-lg focus:outline-none focus:border-[#3b5a96] bg-slate-50" />
          <input value={bookingCompany} onChange={(e) => setBookingCompany(e.target.value)} placeholder="Company (optional)"
            className="w-full px-3 py-2 text-[13px] border border-slate-200 rounded-lg focus:outline-none focus:border-[#3b5a96] bg-slate-50" />
          <button onClick={submitBooking} disabled={!bookingName || !bookingEmail}
            className="w-full bg-[#3b5a96] text-white text-[13px] py-2.5 rounded-lg font-semibold hover:bg-[#2a416f] disabled:opacity-40 transition-colors flex items-center justify-center gap-2">
            <Check className="w-4 h-4" /> Confirm Booking
          </button>
        </div>
      );
    }

    // Booking: confirmed
    if (msg.type === 'booking_confirm') {
      return (
        <div className="max-w-[90%] bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center"><Check className="w-5 h-5 text-green-600" /></div>
            <span className="font-semibold text-green-800 text-[15px]">You&apos;re all set!</span>
          </div>
          <p className="text-[13px] text-green-700 mb-2">{msg.content}</p>
          <p className="text-[12px] text-green-600">📧 A calendar invite with the Google Meet link has been sent to your email.</p>
          {msg.data?.meetLink && (
            <a href={msg.data.meetLink} target="_blank" rel="noopener"
              className="inline-flex items-center gap-1.5 mt-3 bg-green-600 text-white text-[12px] px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
              🎥 Join Google Meet
            </a>
          )}
        </div>
      );
    }

    // Lead capture
    if (msg.type === 'lead_capture' && !leadCaptured) {
      return <LeadCaptureCard onSubmit={handleLeadCapture} />;
    }

    // Default text message
    return (
      <div className="max-w-[85%] px-4 py-2.5 rounded-2xl rounded-bl-sm bg-white text-slate-700 border border-slate-200 shadow-sm text-[14px] leading-relaxed"
        dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }} />
    );
  }
}

// Lead capture sub-component
function LeadCaptureCard({ onSubmit }: { onSubmit: (name: string, email: string) => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="max-w-[90%] bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4 shadow-sm text-center">
        <Check className="w-6 h-6 text-blue-600 mx-auto mb-2" />
        <p className="text-[13px] text-slate-700 font-medium">Thanks! We&apos;ll be in touch.</p>
      </div>
    );
  }

  return (
    <div className="max-w-[90%] bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4 shadow-sm space-y-2.5">
      <p className="text-[13px] text-slate-700 font-medium">Enjoying our chat? Drop your details for tailored growth ideas.</p>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name"
        className="w-full px-3 py-2 text-[13px] border border-slate-200 rounded-lg focus:outline-none focus:border-[#3b5a96] bg-white" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email"
        className="w-full px-3 py-2 text-[13px] border border-slate-200 rounded-lg focus:outline-none focus:border-[#3b5a96] bg-white" />
      <button onClick={() => { if (email) { onSubmit(name, email); setDone(true); } }} disabled={!email}
        className="w-full bg-[#3b5a96] text-white text-[13px] py-2 rounded-lg font-medium hover:bg-[#2a416f] disabled:opacity-40 transition-colors">
        Send me ideas
      </button>
    </div>
  );
}
