'use client';

import { motion } from 'motion/react';
import { PenTool, Layers, Layout, Zap } from 'lucide-react';
import { AnimatedHeading } from '@/components/ui/AnimatedHeading';

const features = [
  {
    icon: PenTool,
    title: 'Data-Driven Design',
    description: 'We treat creative assets as measurable variables, optimizing for conversion rates rather than just aesthetics.',
    colSpan: 'md:col-span-2',
    bg: 'bg-white',
  },
  {
    icon: Layers,
    title: 'A/B Testing Framework',
    description: 'Rapid iteration cycles to find the winning creative combinations.',
    colSpan: 'md:col-span-1',
    bg: 'bg-slate-50',
  },
  {
    icon: Layout,
    title: 'Responsive Architecture',
    description: 'Assets engineered to perform flawlessly across all devices and platforms.',
    colSpan: 'md:col-span-1',
    bg: 'bg-slate-50',
  },
  {
    icon: Zap,
    title: 'High-Performance Delivery',
    description: 'Optimized media delivery ensuring sub-second load times for maximum engagement.',
    colSpan: 'md:col-span-2',
    bg: 'bg-hiraya-blue text-white',
    iconColor: 'text-white',
    textColor: 'text-white/90',
  }
];

export function Creative() {
  return (
    <section className="py-24 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Creative Engineering</h2>
          <p className="text-slate-600 max-w-2xl">
            High-performance creative assets built for conversion. We treat design as a measurable variable.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-8 rounded-3xl border border-slate-200 shadow-sm ${feature.bg} ${feature.colSpan} flex flex-col justify-between group hover:shadow-md transition-shadow`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${feature.iconColor ? 'bg-white/20' : 'bg-hiraya-light'}`}>
                <feature.icon className={`w-6 h-6 ${feature.iconColor || 'text-hiraya-blue'}`} />
              </div>
              <div>
                <h3 className={`text-2xl font-bold mb-3 ${feature.iconColor ? 'text-white' : 'text-slate-900'}`}>
                  {feature.title}
                </h3>
                <p className={`text-lg leading-relaxed ${feature.textColor || 'text-slate-600'}`}>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
