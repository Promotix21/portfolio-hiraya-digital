'use client';

import { motion } from 'framer-motion';
import Logo from '@/components/Logo';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const slideInLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 60,
      damping: 14,
      delay: 0.8,
    },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 60,
      damping: 14,
      delay: 1.0,
    },
  },
};

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Subtle animated grid */}
      <div className="absolute inset-0 opacity-[0.07]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-surface-border, #e2e8f0) 1px, transparent 1px), linear-gradient(90deg, var(--color-surface-border, #e2e8f0) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Floating geometric shapes — triangles */}
      <svg
        className="absolute animate-float"
        style={{ top: '12%', left: '8%', animationDelay: '0s', animationDuration: '7s' }}
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
      >
        <polygon points="20,4 36,36 4,36" fill="rgba(31,165,163,0.08)" />
      </svg>
      <svg
        className="absolute animate-float"
        style={{ top: '60%', left: '5%', animationDelay: '2s', animationDuration: '8s' }}
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
      >
        <polygon points="14,2 26,26 2,26" fill="rgba(15,23,42,0.05)" />
      </svg>
      <svg
        className="absolute animate-float"
        style={{ top: '25%', right: '6%', animationDelay: '1s', animationDuration: '6s' }}
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
      >
        <polygon points="17,3 31,31 3,31" fill="rgba(31,165,163,0.06)" />
      </svg>

      {/* Floating geometric shapes — circles */}
      <div
        className="absolute rounded-full animate-float"
        style={{
          width: '18px',
          height: '18px',
          top: '18%',
          right: '15%',
          backgroundColor: 'rgba(31,165,163,0.07)',
          animationDelay: '0.5s',
          animationDuration: '6.5s',
        }}
      />
      <div
        className="absolute rounded-full animate-float"
        style={{
          width: '12px',
          height: '12px',
          top: '70%',
          right: '20%',
          backgroundColor: 'rgba(15,23,42,0.05)',
          animationDelay: '3s',
          animationDuration: '7.5s',
        }}
      />
      <div
        className="absolute rounded-full animate-float"
        style={{
          width: '22px',
          height: '22px',
          top: '45%',
          left: '12%',
          backgroundColor: 'rgba(31,165,163,0.06)',
          animationDelay: '1.8s',
          animationDuration: '8s',
        }}
      />
      <div
        className="absolute rounded-full animate-float"
        style={{
          width: '10px',
          height: '10px',
          top: '80%',
          left: '25%',
          backgroundColor: 'rgba(15,23,42,0.04)',
          animationDelay: '2.5s',
          animationDuration: '9s',
        }}
      />

      {/* Radial glow — light version */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-teal/[0.03] blur-3xl" />
    </div>
  );
}

function AnalyticsDashboardWidget() {
  return (
    <motion.div
      variants={slideInRight}
      initial="hidden"
      animate="visible"
      className="glass-card animate-float hidden lg:block absolute right-[6%] top-[28%] p-5 rounded-2xl"
      style={{
        backdropFilter: 'blur(12px)',
        background: 'rgba(255,255,255,0.75)',
        boxShadow: '0 8px 32px rgba(15,23,42,0.08), 0 1px 2px rgba(15,23,42,0.04)',
        border: '1px solid rgba(226,232,240,0.7)',
        animationDelay: '1.5s',
        animationDuration: '6s',
      }}
    >
      {/* Mini bar chart */}
      <div className="flex items-end gap-1.5 h-12 mb-3">
        {[28, 42, 55, 72, 95].map((height, i) => (
          <div
            key={i}
            className="w-4 rounded-sm"
            style={{
              backgroundColor: 'rgba(31,165,163,0.7)',
              height: '0%',
              animation: `growBar 1.2s ease-out ${1.4 + i * 0.15}s forwards`,
            }}
          >
            <style>{`
              @keyframes growBar {
                to { height: ${height}%; }
              }
            `}</style>
          </div>
        ))}
      </div>
      {/* Stat */}
      <div className="flex items-center gap-1.5">
        <span className="text-xl font-bold text-navy">+340%</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 12V4M8 4L4 8M8 4L12 8" stroke="rgba(31,165,163,1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span className="text-xs text-navy/60 mt-1 block">Organic Traffic</span>
    </motion.div>
  );
}

function RankingWidget() {
  return (
    <motion.div
      variants={slideInLeft}
      initial="hidden"
      animate="visible"
      className="glass-card animate-float hidden lg:block absolute left-[6%] top-[38%] p-5 rounded-2xl"
      style={{
        backdropFilter: 'blur(12px)',
        background: 'rgba(255,255,255,0.75)',
        boxShadow: '0 8px 32px rgba(15,23,42,0.08), 0 1px 2px rgba(15,23,42,0.04)',
        border: '1px solid rgba(226,232,240,0.7)',
        animationDelay: '2s',
        animationDuration: '7s',
      }}
    >
      <div className="flex items-center gap-2 mb-1">
        {/* Search icon */}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="7" cy="7" r="5" stroke="rgba(15,23,42,0.5)" strokeWidth="1.5" />
          <path d="M11 11L14 14" stroke="rgba(15,23,42,0.5)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="text-lg font-bold text-navy">Position #1</span>
      </div>
      <span className="text-xs text-navy/60 block">12 keywords</span>
    </motion.div>
  );
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden"
    >
      <AnimatedBackground />
      <AnalyticsDashboardWidget />
      <RankingWidget />

      <div className="relative z-10 container-wide px-6 md:px-8 lg:px-12 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center gap-6 max-w-4xl mx-auto"
        >
          {/* Large origami bird logo */}
          <motion.div custom={0} variants={fadeUp}>
            <Logo variant="blue" size={80} showText={false} />
          </motion.div>

          {/* Label tag */}
          <motion.span
            custom={1}
            variants={fadeUp}
            className="label-tag"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-teal inline-block" />
            Growth Engineering Studio
          </motion.span>

          {/* Headline */}
          <motion.h1
            custom={2}
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-navy"
          >
            We don&apos;t run marketing.
            <br />
            <span className="text-gradient">We engineer growth.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            custom={3}
            variants={fadeUp}
            className="text-lg md:text-xl text-navy/60 max-w-2xl leading-relaxed"
          >
            Growth engineering, automation, AI systems, and custom development
            &mdash; built to compound.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={4}
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-4 mt-4"
          >
            <a href="#capabilities" className="btn-primary">
              Explore Systems
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <a href="#results" className="btn-secondary">
              View Results
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade — light version */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
