'use client';

import { motion } from 'motion/react';
import { Bot, Sparkles, Cpu, LineChart } from 'lucide-react';
import { AnimatedHeading } from '@/components/ui/AnimatedHeading';

export function AISystems() {
  return (
    <section className="py-24 relative bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-hiraya-blue/10 text-hiraya-blue text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Applied AI
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center"><span className="text-slate-900">Practical AI </span><span className="text-gradient">Integration</span></h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            We move beyond the hype to implement AI systems that drive measurable business value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Intelligent Chatbots',
              desc: 'Custom-trained LLM agents that handle customer support and qualify leads 24/7.',
              icon: Bot
            },
            {
              title: 'Predictive Analytics',
              desc: 'Machine learning models that forecast LTV and optimize ad spend allocation.',
              icon: LineChart
            },
            {
              title: 'Automated Workflows',
              desc: 'AI-driven content generation and data extraction pipelines.',
              icon: Cpu
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-2xl border border-slate-200 bg-hiraya-light hover:shadow-md transition-shadow"
            >
              <item.icon className="w-8 h-8 text-hiraya-blue mb-6" />
              <h3 className="text-xl font-semibold mb-3 text-slate-900">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="/book" className="inline-flex items-center gap-2 bg-hiraya-blue text-white px-8 py-4 rounded-xl font-semibold hover:bg-hiraya-blue-dark transition-colors mr-4">
            Explore AI for Your Business
          </a>
          <a href="#contact" className="inline-flex items-center gap-2 border border-slate-300 text-slate-700 px-8 py-4 rounded-xl font-semibold hover:bg-slate-50 transition-colors">
            Start a Project
          </a>
        </div>
      </div>
    </section>
  );
}
