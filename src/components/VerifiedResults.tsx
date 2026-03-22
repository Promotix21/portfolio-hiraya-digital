'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

interface Metric {
  label: string;
  value: number;
  suffix: string;
  description: string;
  chartType: 'line' | 'bar' | 'ring' | 'progress';
}

const metrics: Metric[] = [
  { label: '340%+', value: 340, suffix: '%+', description: 'Average Organic Growth', chartType: 'line' },
  { label: '52%', value: 52, suffix: '%', description: 'Average CPL Reduction', chartType: 'bar' },
  { label: '4.8x', value: 4.8, suffix: 'x', description: 'Average ROAS', chartType: 'ring' },
  { label: '85%', value: 85, suffix: '%', description: 'Manual Task Reduction', chartType: 'progress' },
];

/* ── Animated counter ─────────────────────────────────── */
function AnimatedCounter({
  target,
  suffix,
  isInView,
}: {
  target: number;
  suffix: string;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * target).toFixed(1)));

      if (step >= steps) {
        setCount(target);
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target]);

  const displayValue = Number.isInteger(target) ? Math.round(count) : count.toFixed(1);

  return (
    <span className="text-gradient font-mono text-4xl font-bold tracking-tight md:text-5xl">
      {displayValue}
      {suffix}
    </span>
  );
}

/* ── Mini chart: animated line going up ───────────────── */
function GrowthLineChart({ isInView }: { isInView: boolean }) {
  return (
    <svg viewBox="0 0 120 48" className="w-full h-12 mt-3" fill="none">
      <motion.path
        d="M0 44 L20 38 L40 35 L55 28 L70 22 L85 14 L100 8 L120 2"
        stroke="url(#lineGrad)"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1.8, delay: 0.4, ease: 'easeOut' }}
      />
      <motion.path
        d="M0 44 L20 38 L40 35 L55 28 L70 22 L85 14 L100 8 L120 2 L120 48 L0 48 Z"
        fill="url(#areaGrad)"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.15 } : {}}
        transition={{ duration: 1.2, delay: 0.8 }}
      />
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1FA5A3" />
          <stop offset="1" stopColor="#3DD8D6" />
        </linearGradient>
        <linearGradient id="areaGrad" x1="60" y1="0" x2="60" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1FA5A3" />
          <stop offset="1" stopColor="#1FA5A3" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── Mini chart: bars going down ──────────────────────── */
function CPLBarChart({ isInView }: { isInView: boolean }) {
  const bars = [42, 36, 30, 24, 18, 14];
  return (
    <svg viewBox="0 0 120 48" className="w-full h-12 mt-3" fill="none">
      {bars.map((h, i) => (
        <motion.rect
          key={i}
          x={i * 20 + 2}
          y={48 - h}
          width={14}
          rx={2}
          height={h}
          fill="url(#barGrad)"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
          style={{ transformOrigin: `${i * 20 + 9}px 48px` }}
        />
      ))}
      <defs>
        <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1FA5A3" />
          <stop offset="1" stopColor="#1FA5A3" stopOpacity="0.3" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── Mini chart: multiplier ring ──────────────────────── */
function ROASRing({ isInView }: { isInView: boolean }) {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const target = (4.8 / 6) * circumference; // 4.8x out of ~6x max

  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12 mt-3 mx-auto">
      {/* Track */}
      <circle cx="24" cy="24" r={radius} stroke="white" strokeOpacity="0.08" strokeWidth="4" fill="none" />
      {/* Progress */}
      <motion.circle
        cx="24"
        cy="24"
        r={radius}
        stroke="url(#ringGrad)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={isInView ? { strokeDashoffset: circumference - target } : {}}
        transition={{ duration: 1.8, delay: 0.4, ease: 'easeOut' }}
        style={{ transform: 'rotate(-90deg)', transformOrigin: '24px 24px' }}
      />
      <defs>
        <linearGradient id="ringGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1FA5A3" />
          <stop offset="1" stopColor="#3DD8D6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── Mini chart: progress bar filling ─────────────────── */
function TaskProgressBar({ isInView }: { isInView: boolean }) {
  return (
    <div className="w-full mt-3">
      <div className="w-full h-2.5 rounded-full bg-white/[0.08] overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-teal to-teal-light"
          initial={{ width: '0%' }}
          animate={isInView ? { width: '85%' } : {}}
          transition={{ duration: 1.6, delay: 0.4, ease: 'easeOut' }}
        />
      </div>
      <div className="flex justify-between mt-1.5 text-[10px] text-white/30 font-mono">
        <span>0%</span>
        <span>100%</span>
      </div>
    </div>
  );
}

/* ── Chart selector ───────────────────────────────────── */
function MiniChart({ type, isInView }: { type: Metric['chartType']; isInView: boolean }) {
  switch (type) {
    case 'line':
      return <GrowthLineChart isInView={isInView} />;
    case 'bar':
      return <CPLBarChart isInView={isInView} />;
    case 'ring':
      return <ROASRing isInView={isInView} />;
    case 'progress':
      return <TaskProgressBar isInView={isInView} />;
  }
}

/* ── Main component ───────────────────────────────────── */
export default function VerifiedResults() {
  const { ref, isInView } = useInView(0.2);

  return (
    <section
      id="results"
      className="section-padding section-dark parallax-section relative overflow-hidden"
    >
      {/* Diagonal lines background pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 40px,
            rgba(255,255,255,0.03) 40px,
            rgba(255,255,255,0.03) 41px
          )`,
        }}
      />
      {/* Grid overlay pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container-wide relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="label-tag-dark">Verified Results</span>
          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            Representative Results from Selected Engagements
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/60 md:text-lg">
            All metrics represent real, verified outcomes from client engagements.
            Identities anonymized where required.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.description}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              className="glass-card-dark flex flex-col items-center gap-3 p-8 text-center"
            >
              <AnimatedCounter
                target={metric.value}
                suffix={metric.suffix}
                isInView={isInView}
              />
              <span className="text-sm font-medium text-white/70">
                {metric.description}
              </span>
              <div className="w-full px-2">
                <MiniChart type={metric.chartType} isInView={isInView} />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-10 text-center font-mono text-xs text-white/30"
        >
          Data sourced from Google Search Console, Meta Ads Manager, and internal
          analytics platforms.
        </motion.p>
      </div>
    </section>
  );
}
