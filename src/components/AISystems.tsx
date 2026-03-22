'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

/* ─── AI capability cards ─── */
interface AiCapability {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const capabilities: AiCapability[] = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-teal">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: 'AI Chatbots',
    description: 'Custom conversational AI for lead qualification and 24/7 customer support.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-teal">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    title: 'AI Workflows',
    description: 'Intelligent automation that learns, adapts, and scales with your business.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-teal">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: 'Predictive Analytics',
    description: 'Data-driven forecasting to power every growth decision you make.',
  },
];

/* ─── Mock chat messages ─── */
interface ChatMessage {
  role: 'bot' | 'user';
  text: string;
}

const chatMessages: ChatMessage[] = [
  {
    role: 'bot',
    text: "Hi! I'm the Hiraya AI assistant. What growth challenge are you facing?",
  },
  {
    role: 'user',
    text: 'We need to reduce our cost per lead',
  },
  {
    role: 'bot',
    text: 'Based on your industry, our clients typically see 40-60% CPL reduction through automated bid management and AI-powered audience optimization.',
  },
];

/* ─── Variants ─── */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

/* ─── Typing Indicator ─── */
function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      <span className="inline-block h-2 w-2 rounded-full bg-teal/50 animate-bounce [animation-delay:0ms] [animation-duration:1s]" />
      <span className="inline-block h-2 w-2 rounded-full bg-teal/50 animate-bounce [animation-delay:200ms] [animation-duration:1s]" />
      <span className="inline-block h-2 w-2 rounded-full bg-teal/50 animate-bounce [animation-delay:400ms] [animation-duration:1s]" />
    </div>
  );
}

/* ─── Component ─── */
export default function AISystems() {
  const { ref, isInView } = useInView(0.15);
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    setVisibleMessages(0);
    setIsTyping(false);

    const delays = [600, 2200, 3800];
    const typingDelays = [0, 1400, 2800];
    const timers: ReturnType<typeof setTimeout>[] = [];

    typingDelays.forEach((delay, i) => {
      timers.push(
        setTimeout(() => {
          setIsTyping(true);
        }, delay)
      );
      timers.push(
        setTimeout(() => {
          setIsTyping(false);
          setVisibleMessages(i + 1);
        }, delays[i])
      );
    });

    timers.push(
      setTimeout(() => {
        setIsTyping(true);
      }, delays[delays.length - 1] + 800)
    );

    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  return (
    <section id="ai-systems" className="section-padding section-surface" ref={ref}>
      <div className="container-wide">
        {/* Header */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="mb-16 text-center"
        >
          <motion.span variants={fadeUp} className="label-tag mb-4 inline-block">
            AI Solutions
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl"
          >
            Intelligence Built Into Every System
          </motion.h2>
        </motion.div>

        {/* Capability cards */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="mb-20 grid gap-6 md:grid-cols-3"
        >
          {capabilities.map((cap) => (
            <motion.div
              key={cap.title}
              variants={fadeUp}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="glass-card group cursor-default p-6 transition-all duration-300 hover:border-teal/30 hover:shadow-lg hover:shadow-teal/5"
            >
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10">
                {cap.icon}
              </span>
              <h3 className="mb-2 text-lg font-semibold text-navy">{cap.title}</h3>
              <p className="text-sm leading-relaxed text-navy/60">{cap.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Interactive demo: mock chat */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto max-w-2xl"
        >
          {/* Chat window */}
          <div className="glass-card overflow-hidden rounded-2xl">
            {/* Title bar */}
            <div className="flex items-center gap-2 border-b border-surface-border px-5 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-teal" />
              <span className="font-mono text-xs font-medium text-navy/50">
                hiraya-ai-demo
              </span>
              <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] font-medium text-teal">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal" />
                LIVE
              </span>
            </div>

            {/* Messages */}
            <div className="min-h-[260px] space-y-4 bg-surface/30 p-5">
              {chatMessages.slice(0, visibleMessages).map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'rounded-br-md bg-navy text-white'
                        : 'rounded-bl-md bg-teal/10 text-navy'
                    }`}
                  >
                    {msg.role === 'bot' && (
                      <span className="mb-1 block font-mono text-[10px] font-medium uppercase tracking-wider text-teal">
                        Hiraya AI
                      </span>
                    )}
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="flex justify-start"
                >
                  <div className="rounded-2xl rounded-bl-md bg-teal/10">
                    <TypingIndicator />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input bar (decorative) */}
            <div className="border-t border-surface-border px-5 py-3">
              <div className="flex items-center gap-3">
                <div className="flex-1 rounded-lg border border-surface-border bg-white px-4 py-2 text-sm text-navy/30">
                  Type a message...
                </div>
                <button
                  disabled
                  className="rounded-lg bg-teal/10 px-4 py-2 text-sm font-medium text-teal/60"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
