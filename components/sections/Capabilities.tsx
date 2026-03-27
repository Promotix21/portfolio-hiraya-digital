'use client';

import { motion } from 'motion/react';
import { Code2, Workflow, Bot, LineChart, Palette } from 'lucide-react';
import { AnimatedHeading } from '@/components/ui/AnimatedHeading';

const pillars = [
  {
    title: 'Growth Engineering',
    description: 'SEO, Paid Ads, Conversion systems, Funnel architecture, Analytics engineering.',
    icon: LineChart,
  },
  {
    title: 'Marketing Automation',
    description: 'Workflow automation, Reporting automation, CRM integration, Lead routing.',
    icon: Workflow,
  },
  {
    title: 'AI Solutions',
    description: 'AI chatbots, Lead qualification AI, AI workflows, AI analytics.',
    icon: Bot,
  },
  {
    title: 'Custom Development',
    description: 'Web platforms, Dashboards, Internal tools, SaaS systems, API integrations.',
    icon: Code2,
  },
  {
    title: 'Creative Execution',
    description: 'Brand design, Ad creatives, Video, Email systems, UI design.',
    icon: Palette,
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="py-24 relative bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4"><span className="text-slate-900">Core </span><span className="text-gradient">Capabilities</span></h2>
          <p className="text-slate-600 max-w-2xl">
            We solve complex business problems through engineering, automation, and data-driven execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-slate-200 shadow-sm p-8 rounded-2xl hover:shadow-md transition-shadow group"
            >
              <div className="w-12 h-12 bg-hiraya-light rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <pillar.icon className="w-6 h-6 text-hiraya-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-900">{pillar.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="/book" className="inline-flex items-center gap-2 bg-hiraya-blue text-white px-8 py-4 rounded-xl font-semibold hover:bg-hiraya-blue-dark transition-colors mr-4">
            Book a Discovery Call
          </a>
          <a href="#contact" className="inline-flex items-center gap-2 border border-slate-300 text-slate-700 px-8 py-4 rounded-xl font-semibold hover:bg-slate-50 transition-colors">
            Start a Project
          </a>
        </div>
      </div>
    </section>
  );
}
