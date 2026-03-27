'use client';

import { motion } from 'motion/react';
import { AnimatedHeading } from '@/components/ui/AnimatedHeading';

const results = [
  {
    metric: '+340%',
    label: 'Organic Traffic Growth',
    client: 'US Healthcare Group',
    timeframe: '12 Months',
    icon: '/assets/icons/traffic.png',
  },
  {
    metric: '4.2x',
    label: 'ROAS Improvement',
    client: 'Restaurant SaaS Platform',
    timeframe: '6 Months',
    icon: '/assets/icons/roas.png',
  },
  {
    metric: '85%',
    label: 'Reporting Automation',
    client: 'Multi-location dental brand',
    timeframe: 'System Deployed',
    icon: '/assets/icons/automation.png',
  },
  {
    metric: '12k+',
    label: 'Leads Processed via AI',
    client: 'Real Estate Firm',
    timeframe: 'Monthly Avg',
    icon: '/assets/icons/leads-ai.png',
  },
];

export function Results() {
  return (
    <section id="results" className="py-24 bg-hiraya-light border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4"><span className="text-slate-900">Verified </span><span className="text-gradient">Outcomes</span></h2>
            <p className="text-slate-600 max-w-2xl">
              Representative results from our engineering-first approach. No fabricated metrics.
            </p>
          </div>
          <div className="font-mono text-xs text-hiraya-blue bg-hiraya-blue/10 px-3 py-1 rounded border border-hiraya-blue/20">
            DATA_SOURCE: VERIFIED_API
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map((result, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl border border-slate-200 bg-white relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="absolute top-0 right-0 p-3 opacity-15 group-hover:opacity-25 transition-opacity">
                <img src={result.icon} alt={result.label} className="w-16 h-16 object-contain" />
              </div>
              <div className="text-4xl font-bold text-hiraya-blue mb-2 font-mono">{result.metric}</div>
              <div className="text-sm font-medium text-slate-900 mb-4">{result.label}</div>
              <div className="text-xs text-slate-500 space-y-1">
                <div className="flex justify-between">
                  <span className="opacity-70">Client:</span>
                  <span className="truncate ml-2 text-slate-700 font-medium">{result.client}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">Time:</span>
                  <span className="text-slate-700 font-medium">{result.timeframe}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="/book" className="inline-flex items-center gap-2 bg-hiraya-blue text-white px-8 py-4 rounded-xl font-semibold hover:bg-hiraya-blue-dark transition-colors">
            Get Results Like These →
          </a>
        </div>
      </div>
    </section>
  );
}
