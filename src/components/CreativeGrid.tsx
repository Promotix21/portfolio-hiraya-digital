'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

/* ─── Animated preview components ─── */

function AnimatedHeart() {
  return (
    <div className="flex items-center gap-2">
      <motion.svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-red-400"
        animate={{ scale: [1, 1.25, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.5 }}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </motion.svg>
      <motion.span
        className="font-mono text-xs text-navy/60"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        2.4k
      </motion.span>
    </div>
  );
}

function AnimatedPlayButton() {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center">
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-teal/40"
        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal/20">
        <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor" className="ml-0.5 text-teal">
          <path d="M0 0l12 7-12 7z" />
        </svg>
      </div>
    </div>
  );
}

function AnimatedLoop() {
  return (
    <motion.svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-teal"
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
    >
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </motion.svg>
  );
}

function AnimatedEnvelope() {
  return (
    <div className="relative">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-teal">
        <rect x="2" y="6" width="20" height="14" rx="2" />
        <motion.path
          d="M2 6l10 7 10-7"
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        />
      </svg>
    </div>
  );
}

function AnimatedPalette() {
  const colors = ['bg-teal', 'bg-navy', 'bg-teal-light', 'bg-navy-light'];
  return (
    <div className="flex items-center gap-1.5">
      {colors.map((color, i) => (
        <motion.span
          key={color}
          className={`h-4 w-4 rounded-full ${color}`}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

function AnimatedCTR() {
  return (
    <div className="flex items-baseline gap-1">
      <motion.span
        className="font-mono text-lg font-bold text-teal"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        4.8%
      </motion.span>
      <span className="font-mono text-[10px] text-navy/40">CTR</span>
      <motion.svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        className="text-teal"
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <path d="M6 9V3M6 3l3 3M6 3L3 6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </motion.svg>
    </div>
  );
}

function AnimatedWireframe() {
  return (
    <div className="grid h-8 w-12 grid-cols-3 grid-rows-2 gap-0.5">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="rounded-[2px] bg-teal/20"
          animate={{ opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

function AnimatedWave() {
  return (
    <svg width="48" height="20" viewBox="0 0 48 20" fill="none" className="overflow-visible">
      <motion.path
        d="M0 10 Q6 0 12 10 Q18 20 24 10 Q30 0 36 10 Q42 20 48 10"
        stroke="currentColor"
        strokeWidth="2"
        className="text-teal"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </svg>
  );
}

/* ─── Creative card data ─── */
interface CreativeCard {
  title: string;
  category: string;
  gradient: string;
  height: string;
  preview: React.ReactNode;
}

const creativeCards: CreativeCard[] = [
  {
    title: 'Social Media Creatives',
    category: 'Design',
    gradient: 'bg-gradient-to-br from-teal/5 to-navy/5',
    height: 'h-48',
    preview: <AnimatedHeart />,
  },
  {
    title: 'Reels & Video',
    category: 'Video',
    gradient: 'bg-gradient-to-br from-navy/5 to-teal/10',
    height: 'h-56',
    preview: <AnimatedPlayButton />,
  },
  {
    title: 'GIF Animations',
    category: 'Motion',
    gradient: 'bg-gradient-to-br from-teal/10 to-navy/5',
    height: 'h-44',
    preview: <AnimatedLoop />,
  },
  {
    title: 'Email Campaigns',
    category: 'Marketing',
    gradient: 'bg-gradient-to-br from-navy/5 to-teal/5',
    height: 'h-52',
    preview: <AnimatedEnvelope />,
  },
  {
    title: 'Brand Systems',
    category: 'Branding',
    gradient: 'bg-gradient-to-br from-teal/5 to-navy/10',
    height: 'h-56',
    preview: <AnimatedPalette />,
  },
  {
    title: 'Ad Creatives',
    category: 'Performance',
    gradient: 'bg-gradient-to-br from-navy/10 to-teal/5',
    height: 'h-44',
    preview: <AnimatedCTR />,
  },
  {
    title: 'UI/UX Design',
    category: 'Product',
    gradient: 'bg-gradient-to-br from-teal/10 to-navy/5',
    height: 'h-52',
    preview: <AnimatedWireframe />,
  },
  {
    title: 'Motion Design',
    category: 'Animation',
    gradient: 'bg-gradient-to-br from-navy/5 to-teal/10',
    height: 'h-48',
    preview: <AnimatedWave />,
  },
];

/* ─── Variants ─── */
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

/* ─── Component ─── */
export default function CreativeGrid() {
  const { ref, isInView } = useInView(0.1);

  const col1 = [creativeCards[0], creativeCards[4], creativeCards[2], creativeCards[6]];
  const col2 = [creativeCards[1], creativeCards[5], creativeCards[3], creativeCards[7]];

  return (
    <section id="creative" className="section-padding section-light overflow-hidden" ref={ref}>
      <div className="container-wide">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="mb-16 text-center"
        >
          <motion.span variants={fadeUp} className="label-tag mb-4 inline-block">
            Creative Execution
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl"
          >
            Design That Converts
          </motion.h2>
        </motion.div>

        {/* Masonry Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2"
        >
          {/* Column 1 */}
          <div className="flex flex-col gap-5">
            {col1.map((card) => (
              <motion.div
                key={card.title}
                variants={fadeUp}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3, ease: 'easeOut' },
                }}
                className="group cursor-default"
              >
                <div className="glass-card overflow-hidden transition-all duration-300 hover:border-teal/40 hover:shadow-lg hover:shadow-teal/5">
                  {/* Preview area */}
                  <div className={`${card.gradient} ${card.height} flex items-center justify-center`}>
                    {card.preview}
                  </div>
                  {/* Info */}
                  <div className="p-5">
                    <span className="mb-2 inline-block rounded-full bg-teal/10 px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-teal">
                      {card.category}
                    </span>
                    <h3 className="text-base font-semibold text-navy">{card.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Column 2 - offset for masonry effect */}
          <div className="flex flex-col gap-5 pt-0 sm:pt-12">
            {col2.map((card) => (
              <motion.div
                key={card.title}
                variants={fadeUp}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3, ease: 'easeOut' },
                }}
                className="group cursor-default"
              >
                <div className="glass-card overflow-hidden transition-all duration-300 hover:border-teal/40 hover:shadow-lg hover:shadow-teal/5">
                  {/* Preview area */}
                  <div className={`${card.gradient} ${card.height} flex items-center justify-center`}>
                    {card.preview}
                  </div>
                  {/* Info */}
                  <div className="p-5">
                    <span className="mb-2 inline-block rounded-full bg-teal/10 px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-teal">
                      {card.category}
                    </span>
                    <h3 className="text-base font-semibold text-navy">{card.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
