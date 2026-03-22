'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

interface Phase {
  number: number;
  title: string;
  description: string;
  bullets: string[];
}

const phases: Phase[] = [
  {
    number: 1,
    title: 'Discovery',
    description:
      'Deep analysis of your growth stack, data infrastructure, and market position',
    bullets: [
      'Technical audit',
      'Data analysis',
      'Stack assessment',
      'Goal mapping',
    ],
  },
  {
    number: 2,
    title: 'Engineering',
    description:
      'System architecture, tool selection, and technical implementation planning',
    bullets: [
      'Architecture design',
      'Tool integration',
      'Workflow engineering',
      'KPI framework',
    ],
  },
  {
    number: 3,
    title: 'Execution',
    description:
      'Iterative build cycles with continuous testing and optimization',
    bullets: [
      'Sprint-based delivery',
      'A/B testing',
      'Performance tracking',
      'Weekly optimization',
    ],
  },
  {
    number: 4,
    title: 'Scaling',
    description:
      'Performance monitoring, system expansion, and compound growth',
    bullets: [
      'Growth monitoring',
      'System expansion',
      'New channel activation',
      'Continuous improvement',
    ],
  },
];

/* ─── Variants ─── */
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const fromLeft = {
  hidden: { opacity: 0, x: -60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const fromRight = {
  hidden: { opacity: 0, x: 60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function ProcessIntelligence() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="process" className="section-padding section-dark parallax-section" ref={ref}>
      <div className="container-wide relative z-10">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="mb-16 text-center"
        >
          <motion.span variants={fadeUp} className="label-tag-dark mb-4 inline-block">
            Our Process
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Engineered for Outcomes
          </motion.h2>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="relative"
        >
          {/* Vertical teal gradient line - desktop only */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block">
            <div className="h-full w-full bg-gradient-to-b from-teal/60 via-teal/30 to-teal/60" />
          </div>

          <div className="flex flex-col gap-8 md:gap-16">
            {phases.map((phase, i) => {
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={phase.number}
                  variants={isEven ? fromLeft : fromRight}
                  className="relative md:flex md:items-start"
                >
                  {/* Teal dot on timeline - desktop */}
                  <div className="absolute left-1/2 top-8 z-10 hidden -translate-x-1/2 md:block">
                    <div className="h-4 w-4 rounded-full border-2 border-teal bg-teal/20 shadow-[0_0_12px_rgba(45,212,191,0.4)]" />
                  </div>

                  {/* Card positioned left or right on desktop */}
                  <div
                    className={`w-full md:w-[calc(50%-2rem)] ${
                      isEven ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                    }`}
                  >
                    <div className="glass-card-dark p-6 md:p-8">
                      {/* Large phase number */}
                      <span className="text-gradient font-mono text-5xl font-extrabold leading-none md:text-6xl">
                        0{phase.number}
                      </span>

                      {/* Teal dot + phase label - mobile only */}
                      <div className="mt-3 flex items-center gap-3 md:hidden">
                        <div className="h-3 w-3 rounded-full border-2 border-teal bg-teal/20" />
                        <span className="font-mono text-xs text-white/40">
                          Phase {phase.number}
                        </span>
                      </div>

                      {/* Phase label - desktop */}
                      <span className="mt-2 hidden font-mono text-xs text-white/40 md:block">
                        Phase {phase.number}
                      </span>

                      <h3 className="mt-2 text-xl font-bold text-white md:text-2xl">
                        {phase.title}
                      </h3>

                      <p className="mt-2 text-sm text-white/60 md:text-base">
                        {phase.description}
                      </p>

                      <ul className="mt-4 grid grid-cols-2 gap-2">
                        {phase.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex items-center gap-2 text-sm text-white/50"
                          >
                            <span className="h-1 w-1 flex-shrink-0 rounded-full bg-teal" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
