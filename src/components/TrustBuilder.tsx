'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

const capabilities: string[] = [
  'Build custom marketing tools',
  'Create internal dashboards',
  'Automate reporting systems',
  'Develop AI lead scoring',
  'Build workflow automation',
  'Create API integrations',
  'Develop internal SaaS tools',
  'Build growth infrastructure',
];

interface TechCategory {
  label: string;
  items: string[];
}

const techGrid: TechCategory[] = [
  { label: 'Frontend', items: ['React', 'Next.js', 'Vue', 'Svelte', 'Astro'] },
  { label: 'Backend', items: ['Node', 'NestJS', 'Python', 'Go', 'PHP'] },
  {
    label: 'Infrastructure',
    items: ['AWS', 'Cloudflare', 'Vercel', 'Docker'],
  },
  { label: 'Data', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'] },
];

/* ─── Variants ─── */
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const staggerList = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const listItem = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function TrustBuilder() {
  const { ref, isInView } = useInView(0.15);

  return (
    <section id="trust" className="section-padding section-surface" ref={ref}>
      <div className="container-wide">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="mb-16 text-center"
        >
          <motion.span variants={fadeUp} className="label-tag mb-4 inline-block">
            Why Hiraya
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl"
          >
            What We Do That Most Agencies Cannot
          </motion.h2>
        </motion.div>

        {/* Two columns */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Left: Capabilities */}
          <motion.ul
            variants={staggerList}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            className="flex flex-col gap-3"
          >
            {capabilities.map((item) => (
              <motion.li
                key={item}
                variants={listItem}
                className="glass-card flex items-center gap-3 px-5 py-4"
              >
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-teal/10">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-teal">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="text-sm font-medium text-navy md:text-base">
                  {item}
                </span>
              </motion.li>
            ))}
          </motion.ul>

          {/* Right: Technology Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            className="glass-card p-6 md:p-8"
          >
            <motion.h3 variants={fadeUp} className="mb-6 text-lg font-semibold text-navy">
              Technology Stack
            </motion.h3>
            <div className="flex flex-col gap-6">
              {techGrid.map((category) => (
                <motion.div key={category.label} variants={fadeUp}>
                  <span className="mb-2 block font-mono text-xs uppercase tracking-wider text-navy/40">
                    {category.label}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((tech) => (
                      <span
                        key={tech}
                        className="glass-card rounded-lg px-3 py-1.5 text-xs font-medium text-navy/70 transition-colors hover:border-teal/30 hover:text-teal"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom quote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 text-center font-mono text-sm italic text-navy/40"
        >
          &ldquo;We don&apos;t sell stacks. We solve problems.&rdquo;
        </motion.p>
      </div>
    </section>
  );
}
