'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

/* ─── Pipeline step data ─── */
interface PipelineStep {
  icon: string;
  title: string;
  description: string;
}

const pipelineSteps: PipelineStep[] = [
  {
    icon: '📩',
    title: 'Lead Capture',
    description: 'Captured from ads, forms, or organic traffic',
  },
  {
    icon: '🤖',
    title: 'AI Scoring',
    description: 'Scored and enriched with predictive models',
  },
  {
    icon: '🔀',
    title: 'CRM Routing',
    description: 'Auto-assigned to the right pipeline and rep',
  },
  {
    icon: '💧',
    title: 'Nurture Sequence',
    description: 'Personalized drip campaigns triggered instantly',
  },
  {
    icon: '🤝',
    title: 'Sales Handoff',
    description: 'Warm intro with full context and lead history',
  },
  {
    icon: '📊',
    title: 'Reporting',
    description: 'Real-time attribution and performance data',
  },
];

/* ─── Automation example cards ─── */
interface AutomationCard {
  title: string;
  description: string;
  icon: string;
}

const automationCards: AutomationCard[] = [
  {
    title: 'Reporting Automation',
    description: 'Real-time dashboards replacing manual Excel reports',
    icon: '📈',
  },
  {
    title: 'Lead Routing Engine',
    description: 'AI-scored leads auto-routed to right sales rep',
    icon: '🎯',
  },
  {
    title: 'Campaign Automation',
    description: 'Multi-channel campaigns triggered by behavior',
    icon: '⚡',
  },
];

/* ─── CLI pseudo-code ─── */
const cliLines = [
  { text: '$ hiraya deploy --automation lead-router', type: 'command' as const },
  { text: '✓ Lead scoring model loaded', type: 'success' as const },
  { text: '✓ CRM webhook configured', type: 'success' as const },
  { text: '✓ Routing rules applied', type: 'success' as const },
  { text: '✓ Notification channels set', type: 'success' as const },
  { text: '→ System active: processing leads...', type: 'active' as const },
];

/* ─── Animation variants ─── */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const stepReveal = {
  hidden: { opacity: 0, scale: 0.85, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15, ease: 'easeOut' },
  }),
};

/* ─── Component ─── */
export default function AutomationShowcase() {
  const { ref, isInView } = useInView(0.15);

  return (
    <section
      id="automation"
      className="section-dark parallax-section section-padding relative"
      ref={ref}
    >
      {/* Parallax background grain */}
      <div className="parallax-overlay pointer-events-none" />

      <div className="container-wide relative z-10">
        {/* Header */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="mb-16 text-center"
        >
          <motion.span variants={fadeUp} className="label-tag-dark mb-4 inline-block">
            Automation Systems
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Automation Before Manpower
          </motion.h2>
        </motion.div>

        {/* ── Pipeline diagram ── */}
        <div className="relative mb-20">
          {/* Connecting dashed line (desktop) */}
          <div className="pointer-events-none absolute top-1/2 left-0 hidden h-px w-full -translate-y-1/2 lg:block">
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, rgba(31,165,163,0.4) 0px, rgba(31,165,163,0.4) 8px, transparent 8px, transparent 16px)',
                backgroundSize: '16px 1px',
                animation: 'flowDash 1.5s linear infinite',
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {pipelineSteps.map((step, i) => (
              <motion.div
                key={step.title}
                custom={i}
                variants={stepReveal}
                initial="hidden"
                animate={isInView ? 'show' : 'hidden'}
                className="relative flex flex-col items-center"
              >
                {/* Arrow between steps (desktop) */}
                {i > 0 && (
                  <span className="absolute -left-3 top-8 hidden text-lg text-teal/50 lg:block">
                    &#8594;
                  </span>
                )}

                <div className="glass-card-dark flex w-full flex-col items-center gap-2 p-4 text-center transition-colors hover:border-teal/30">
                  <span className="text-2xl">{step.icon}</span>
                  <h3 className="text-sm font-semibold text-white">{step.title}</h3>
                  <p className="text-xs leading-relaxed text-white/50">{step.description}</p>
                </div>

                {/* Arrow between rows (mobile) */}
                {i < pipelineSteps.length - 1 && i % 2 === 1 && (
                  <span className="mt-2 block text-teal/40 sm:hidden">&#8595;</span>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Example automation cards ── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="mb-16 grid gap-6 md:grid-cols-3"
        >
          {automationCards.map((card) => (
            <motion.div
              key={card.title}
              variants={fadeUp}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="glass-card-dark p-6 transition-colors hover:border-teal/30"
            >
              <span className="mb-3 block text-2xl">{card.icon}</span>
              <h3 className="mb-2 text-lg font-semibold text-white">{card.title}</h3>
              <p className="text-sm leading-relaxed text-white/60">{card.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── CLI code block ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-card-dark mx-auto max-w-2xl overflow-hidden"
        >
          {/* Terminal chrome */}
          <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 font-mono text-[10px] text-white/30">hiraya-cli</span>
          </div>

          {/* Lines */}
          <div className="space-y-1 bg-navy/80 p-5 font-mono text-sm leading-relaxed">
            {cliLines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                transition={{ duration: 0.3, delay: 0.5 + i * 0.12 }}
                className={`overflow-hidden whitespace-nowrap ${
                  line.type === 'command'
                    ? 'text-white/80'
                    : line.type === 'success'
                      ? 'text-[#28c840]'
                      : 'text-teal-light'
                }`}
                style={
                  isInView
                    ? {
                        animation: `typing 0.8s steps(40) ${0.5 + i * 0.12}s both`,
                      }
                    : undefined
                }
              >
                {line.text}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Flow-dash animation keyframes */}
      <style jsx>{`
        @keyframes flowDash {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 32px 0;
          }
        }
      `}</style>
    </section>
  );
}
