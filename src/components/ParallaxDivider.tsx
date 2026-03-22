'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

try {
  gsap.registerPlugin(ScrollTrigger);
} catch (_) {
  // SSR safety – ScrollTrigger requires a DOM
}

const NAVY = '#0B1F33';
const TEAL = '#1FA5A3';

interface ParallaxDividerProps {
  text: string;
  subtext?: string;
}

export default function ParallaxDivider({ text, subtext }: ParallaxDividerProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const section = sectionRef.current;
    const textEl = textRef.current;
    if (!section || !textEl) return;

    const ctx = gsap.context(() => {
      gsap.to(textEl, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        height: 200,
        background: NAVY,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Subtle grid pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Teal gradient glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          height: 200,
          borderRadius: '50%',
          background: `radial-gradient(ellipse at center, ${TEAL}18 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Parallax text */}
      <div
        ref={textRef}
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          transform: 'translateY(30px)',
        }}
      >
        <div
          style={{
            fontFamily: 'monospace',
            fontSize: 'clamp(1.2rem, 3vw, 2rem)',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.6)',
            letterSpacing: 1,
          }}
        >
          {text}
        </div>
        {subtext && (
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: 'clamp(0.75rem, 1.5vw, 0.95rem)',
              color: 'rgba(255,255,255,0.3)',
              marginTop: 8,
            }}
          >
            {subtext}
          </div>
        )}
      </div>
    </section>
  );
}
