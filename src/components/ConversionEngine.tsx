'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { trackEvent } from '@/lib/lead-tracker';

interface FormData {
  name: string;
  company: string;
  website: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}

const initialForm: FormData = {
  name: '',
  company: '',
  website: '',
  email: '',
  projectType: '',
  budget: '',
  timeline: '',
  message: '',
};

const projectTypes = [
  'Growth Engineering',
  'Marketing Automation',
  'AI Solutions',
  'Custom Development',
  'Creative',
  'Multiple/Not Sure',
];

const budgetRanges = [
  '<$5K',
  '$5K-$15K',
  '$15K-$50K',
  '$50K+',
  "Let's Discuss",
];

const timelines = ['ASAP', '1-2 Months', '3-6 Months', 'Flexible'];

const trustPoints = [
  'Response within 24 hours',
  'No-commitment discovery call',
  'Custom solution architecture',
];

const inputClasses =
  'w-full bg-surface border border-surface-border rounded-lg px-4 py-3 text-sm text-navy placeholder:text-navy/40 transition-colors focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal';

const selectClasses =
  'w-full bg-surface border border-surface-border rounded-lg px-4 py-3 text-sm text-navy transition-colors focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal appearance-none';

export default function ConversionEngine() {
  const { ref, isInView } = useInView(0.2);
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const hasTrackedStart = useRef(false);

  function handleFocus() {
    if (!hasTrackedStart.current) {
      hasTrackedStart.current = true;
      trackEvent('FORM_START');
    }
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    trackEvent('FORM_SUBMIT');
    setSubmitted(true);
  }

  return (
    <section id="contact" className="section-light relative overflow-hidden">
      {/* Subtle teal gradient accent at the top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-teal/5 to-transparent" />

      <div className="container-wide relative section-padding">
        <div
          ref={ref}
          className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16"
        >
          {/* Left Column — Text */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <span className="label-tag">Start a Project</span>

            <h2 className="text-4xl font-bold text-navy">
              Need systems like these?
            </h2>

            <p className="text-lg text-navy/60">
              Tell us about your growth challenge. We&apos;ll architect the
              solution.
            </p>

            <ul className="mt-2 flex flex-col gap-3">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-center gap-3 text-sm text-navy/70">
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-teal"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right Column — Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="glass-card p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center gap-4 py-12 text-center"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                    <svg
                      className="h-7 w-7 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-navy">
                    Project Brief Received
                  </h3>
                  <p className="text-sm text-navy/60">
                    We&apos;ll be in touch within 24 hours.
                  </p>
                  <a
                    href="#"
                    className="mt-2 font-mono text-sm text-teal transition-colors hover:text-teal/80"
                  >
                    Schedule a Call &rarr;
                  </a>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-navy/70">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Your name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      className={inputClasses}
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-navy/70">
                      Company
                    </label>
                    <input
                      id="company"
                      type="text"
                      name="company"
                      placeholder="Your company"
                      value={form.company}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      className={inputClasses}
                    />
                  </div>

                  {/* Website */}
                  <div>
                    <label htmlFor="website" className="mb-1.5 block text-sm font-medium text-navy/70">
                      Website
                    </label>
                    <input
                      id="website"
                      type="url"
                      name="website"
                      placeholder="https://yoursite.com"
                      value={form.website}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      className={inputClasses}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy/70">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="you@company.com"
                      required
                      value={form.email}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      className={inputClasses}
                    />
                  </div>

                  {/* Project Type */}
                  <div>
                    <label htmlFor="projectType" className="mb-1.5 block text-sm font-medium text-navy/70">
                      Project Type
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      required
                      value={form.projectType}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      className={selectClasses}
                    >
                      <option value="" disabled>
                        Select a project type
                      </option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Budget & Timeline */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="budget" className="mb-1.5 block text-sm font-medium text-navy/70">
                        Budget Range
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        required
                        value={form.budget}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        className={selectClasses}
                      >
                        <option value="" disabled>
                          Select budget
                        </option>
                        {budgetRanges.map((range) => (
                          <option key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="timeline" className="mb-1.5 block text-sm font-medium text-navy/70">
                        Timeline
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        required
                        value={form.timeline}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        className={selectClasses}
                      >
                        <option value="" disabled>
                          Select timeline
                        </option>
                        {timelines.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-navy/70">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your project..."
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      className={`${inputClasses} resize-none`}
                    />
                  </div>

                  {/* Submit */}
                  <button type="submit" className="btn-primary mt-2 w-full">
                    Send Project Brief &rarr;
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
