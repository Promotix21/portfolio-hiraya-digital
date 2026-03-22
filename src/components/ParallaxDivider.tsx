'use client';

import { useEffect, useRef } from 'react';

interface ParallaxDividerProps {
  text: string;
  subtext?: string;
}

export default function ParallaxDivider({ text, subtext }: ParallaxDividerProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const textEl = textRef.current;
    if (!section || !textEl) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = section.getBoundingClientRect();
          const offset = rect.top * 0.3;
          textEl.style.transform = `translateY(${offset}px)`;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative h-48 md:h-56 overflow-hidden bg-navy flex items-center justify-center"
    >
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Teal glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal/10 to-transparent" />

      <div ref={textRef} className="relative text-center z-10">
        <p className="font-mono text-2xl md:text-3xl text-white/50 tracking-wider">
          {text}
        </p>
        {subtext && (
          <p className="mt-2 font-mono text-sm text-white/25">{subtext}</p>
        )}
      </div>
    </div>
  );
}
