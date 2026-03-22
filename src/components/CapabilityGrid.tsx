'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { capabilities, type Capability } from '@/data/capabilities';
import { useInView } from '@/hooks/useInView';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

interface CapabilityCardProps {
  capability: Capability;
  isExpanded: boolean;
  onToggle: () => void;
}

function CapabilityCard({ capability, isExpanded, onToggle }: CapabilityCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      onClick={onToggle}
      className={`
        glass-card p-6 md:p-8 cursor-pointer group relative overflow-hidden
        transition-all duration-500 ease-out
        hover:shadow-lg hover:border-teal/30
        ${isExpanded ? 'border-teal/30 shadow-lg' : ''}
      `}
    >
      {/* Subtle hover accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        {/* Icon */}
        <div className="text-3xl mb-4">{capability.icon}</div>

        {/* Title & subtitle */}
        <h3 className="text-xl font-bold text-navy mb-1 group-hover:text-teal transition-colors duration-300">
          {capability.title}
        </h3>
        <p className="text-sm text-teal font-mono mb-3">{capability.subtitle}</p>

        {/* Description */}
        <p className="text-sm text-navy/60 leading-relaxed mb-4">{capability.description}</p>

        {/* Services list - expandable accordion */}
        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? 'auto' : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <div className="flex flex-wrap gap-2 pt-4 border-t border-navy/[0.08]">
            {capability.services.map((service) => (
              <span
                key={service}
                className="inline-flex items-center px-3 py-1 text-xs font-medium text-teal
                           bg-teal/[0.06] border border-teal/20 rounded-full"
              >
                {service}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Expand indicator */}
        <div className="flex items-center gap-1.5 mt-4 text-xs text-navy/40 group-hover:text-teal transition-colors duration-300">
          <span>{isExpanded ? 'Show less' : 'View services'}</span>
          <svg
            className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export default function CapabilityGrid() {
  const { ref, isInView } = useInView(0.1);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="capabilities" className="section-padding section-surface relative">
      <div className="container-wide" ref={ref}>
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="label-tag mb-4 inline-flex">What We Build</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy mt-4">
            Five Pillars of{' '}
            <span className="text-gradient">Growth Engineering</span>
          </h2>
        </div>

        {/* Grid: 3 on top, 2 on bottom centered */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {capabilities.slice(0, 3).map((cap) => (
            <CapabilityCard
              key={cap.id}
              capability={cap}
              isExpanded={expandedId === cap.id}
              onToggle={() => handleToggle(cap.id)}
            />
          ))}
        </motion.div>

        {/* Bottom row: 2 cards centered */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-w-4xl mx-auto"
        >
          {capabilities.slice(3, 5).map((cap) => (
            <CapabilityCard
              key={cap.id}
              capability={cap}
              isExpanded={expandedId === cap.id}
              onToggle={() => handleToggle(cap.id)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
