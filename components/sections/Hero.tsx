'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Terminal, TrendingUp, Settings, Network } from 'lucide-react';
import { AnimatedHeading } from '@/components/ui/AnimatedHeading';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hiraya-light pt-28 md:pt-24">
      {/* Background Engineering Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b5a9610_1px,transparent_1px),linear-gradient(to_bottom,#3b5a9610_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      {/* Animated Growth / Engineering Visual */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none overflow-hidden">
        <svg className="absolute w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
          {/* Grid Lines */}
          <motion.path
            d="M 100 800 L 900 800"
            stroke="#3b5a96"
            strokeWidth="2"
            strokeDasharray="10 10"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <motion.path
            d="M 100 800 L 100 200"
            stroke="#3b5a96"
            strokeWidth="2"
            strokeDasharray="10 10"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
          />

          {/* Rising Growth Chart */}
          <motion.path
            d="M 100 800 C 300 800, 400 500, 600 400 C 750 325, 850 200, 900 100"
            fill="none"
            stroke="url(#growth-gradient)"
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, ease: "easeOut", delay: 1 }}
          />

          {/* Data Nodes */}
          {[
            { cx: 100, cy: 800, delay: 1 },
            { cx: 450, cy: 560, delay: 1.8 },
            { cx: 600, cy: 400, delay: 2.2 },
            { cx: 900, cy: 100, delay: 3.5 }
          ].map((node, i) => (
            <motion.circle
              key={i}
              cx={node.cx}
              cy={node.cy}
              r="12"
              fill="#f9b923"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: node.delay, type: "spring" }}
            />
          ))}

          {/* Gradient Definition */}
          <defs>
            <linearGradient id="growth-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b5a96" />
              <stop offset="100%" stopColor="#f9b923" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating Engineering Elements */}
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 opacity-20"
        >
          <Settings className="w-24 h-24 text-hiraya-blue" />
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, -20, 0] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 right-1/4 opacity-20"
        >
          <Network className="w-32 h-32 text-hiraya-yellow" />
        </motion.div>
      </div>

      {/* Radial Gradient for readability */}
      <div className="absolute inset-0 bg-white [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center text-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-hiraya-blue text-sm font-mono mb-4 md:mb-8 shadow-sm pointer-events-auto"
        >
          <Terminal className="w-4 h-4" />
          <span>System Status: Operational</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-1 text-slate-900"
        >
          We don&apos;t run marketing.
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4 md:mb-6 text-gradient"
        >
          We engineer growth.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base md:text-xl text-slate-600 max-w-2xl mb-6 md:mb-10"
        >
          Hiraya Digital is a technology-agnostic Growth Engineering, Automation, and Product Development partner. We build systems that scale revenue.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 pointer-events-auto"
        >
          <Button size="lg" className="h-12 px-8 text-base group" asChild>
            <Link href="/book">
              Book a Call
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="h-12 px-8 text-base bg-white" asChild>
            <Link href="#contact">
              Start Project
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
