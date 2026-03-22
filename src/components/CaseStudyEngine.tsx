'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { caseStudies, type CaseStudy } from '@/data/case-studies';
import { trackEvent } from '@/lib/lead-tracker';

export default function CaseStudyEngine() {
  const tags = ['All', ...Array.from(new Set(caseStudies.map((s) => s.tag)))];
  const [activeTag, setActiveTag] = useState('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered =
    activeTag === 'All'
      ? caseStudies
      : caseStudies.filter((s) => s.tag === activeTag);

  function handleToggle(study: CaseStudy) {
    const isOpening = expandedId !== study.id;
    setExpandedId(isOpening ? study.id : null);
    if (isOpening) {
      trackEvent('CASE_OPEN', { case: study.id });
    }
  }

  return (
    <section id="case-studies" className="section-light section-padding">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center">
          <span className="label-tag">Case Studies</span>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight text-navy md:text-4xl lg:text-5xl">
            Systems We&rsquo;ve Built
          </h2>
        </div>

        {/* Tag Filters */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setActiveTag(tag);
                setExpandedId(null);
              }}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                activeTag === tag
                  ? 'bg-teal text-white shadow-lg shadow-teal/20'
                  : 'border border-navy/20 bg-white text-navy hover:border-teal hover:text-teal'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Case Study Cards */}
        <div className="mt-12 flex flex-col gap-6">
          <AnimatePresence mode="wait">
            {filtered.map((study) => {
              const isExpanded = expandedId === study.id;

              return (
                <motion.div
                  key={study.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35 }}
                  className="glass-card overflow-hidden"
                >
                  {/* Card Header - always visible */}
                  <button
                    onClick={() => handleToggle(study)}
                    className="flex w-full items-center justify-between gap-4 p-6 text-left md:p-8"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                      <h3 className="text-lg font-bold text-navy md:text-xl">
                        {study.client}
                      </h3>
                      <span className="rounded-full bg-surface px-3 py-0.5 text-xs font-medium text-navy/60">
                        {study.industry}
                      </span>
                      <span className="inline-block rounded-full bg-teal/10 px-3 py-0.5 text-xs font-medium text-teal">
                        {study.tag}
                      </span>
                    </div>
                    <motion.span
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="shrink-0 text-navy/40"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 7.5L10 12.5L15 7.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.span>
                  </button>

                  {/* Expandable Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-surface-border px-6 pb-8 pt-6 md:px-8">
                          {/* Problem */}
                          <div className="mb-6">
                            <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-teal">
                              Problem
                            </h4>
                            <p className="text-sm leading-relaxed text-navy/70">
                              {study.problem}
                            </p>
                          </div>

                          {/* System Built */}
                          <div className="mb-6">
                            <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-teal">
                              System Built
                            </h4>
                            <p className="text-sm leading-relaxed text-navy/70">
                              {study.system}
                            </p>
                          </div>

                          {/* Execution Steps */}
                          <div className="mb-6">
                            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-teal">
                              Execution
                            </h4>
                            <ol className="list-inside list-decimal space-y-2">
                              {study.execution.map((step, i) => (
                                <li
                                  key={i}
                                  className="text-sm text-navy/70"
                                >
                                  {step}
                                </li>
                              ))}
                            </ol>
                          </div>

                          {/* Results Grid */}
                          <div className="mb-6">
                            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-teal">
                              Results
                            </h4>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                              {study.results.map((result, i) => (
                                <div
                                  key={i}
                                  className="flex flex-col gap-1 rounded-2xl border border-surface-border bg-surface p-4"
                                >
                                  <span className="text-xs font-medium uppercase tracking-wider text-navy/50">
                                    {result.metric}
                                  </span>
                                  <span className="text-gradient font-mono text-2xl font-bold">
                                    {result.value}
                                  </span>
                                  <span className="text-xs text-navy/50">
                                    {result.change}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Tech Stack */}
                          <div>
                            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-teal">
                              Tech Stack
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {study.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="rounded-full bg-surface px-3 py-1 font-mono text-xs text-navy/70"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
