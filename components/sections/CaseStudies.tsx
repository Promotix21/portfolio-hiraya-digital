'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ArrowRight, Bot, CheckCircle, Database, GitMerge } from 'lucide-react';
import { AnimatedHeading } from '@/components/ui/AnimatedHeading';

const cases = [
  {
    title: 'Automated Lead Routing System',
    client: 'Enterprise SaaS',
    problem: 'Manual lead assignment causing 24h+ delays and 30% drop-off.',
    solution: 'Built custom Node.js middleware connecting CRM, Slack, and email for instant routing.',
    tags: ['Node.js', 'API Integration', 'Automation'],
    Animation: LeadRoutingAnimation,
  },
  {
    title: 'Programmatic SEO Architecture',
    client: 'E-commerce Marketplace',
    problem: 'Stagnant organic growth due to poor site structure and duplicate content.',
    solution: 'Engineered Next.js dynamic routing system generating 10k+ optimized category pages.',
    tags: ['Next.js', 'SEO', 'Data Engineering'],
    Animation: SEOArchitectureAnimation,
  },
  {
    title: 'AI-Powered Qualification',
    client: 'Real Estate Firm',
    problem: 'Sales team overwhelmed by unqualified leads.',
    solution: 'Deployed custom LLM chatbot to pre-qualify and schedule appointments automatically.',
    tags: ['AI', 'LLM', 'Workflow'],
    Animation: AIQualificationAnimation,
  }
];

// --- Animations ---

function LeadRoutingAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-slate-900 overflow-hidden">
      {/* Central Hub */}
      <motion.div 
        className="w-24 h-24 bg-hiraya-blue rounded-2xl flex items-center justify-center z-10 shadow-[0_0_40px_rgba(59,90,150,0.5)] relative"
      >
        <GitMerge className="w-10 h-10 text-white" />
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-2 border-dashed border-white/30 rounded-2xl"
        />
      </motion.div>
      
      {/* Incoming Leads */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 h-64">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`in-${i}`}
            className="absolute w-3 h-3 bg-hiraya-yellow rounded-full shadow-[0_0_10px_rgba(249,185,35,0.8)]"
            initial={{ left: '-10%', top: `${20 + i * 15}%`, opacity: 0 }}
            animate={{ left: '100%', top: '50%', opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Outgoing Routes */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-64">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`out-${i}`}
            className="absolute w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.8)]"
            initial={{ right: '100%', top: '50%', opacity: 0 }}
            animate={{ right: '-10%', top: `${20 + i * 30}%`, opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.7 + 1.2, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <path d="M 0 50% L 50% 50%" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
        <path d="M 50% 50% L 100% 20%" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
        <path d="M 50% 50% L 100% 50%" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
        <path d="M 50% 50% L 100% 80%" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
      </svg>
    </div>
  );
}

function SEOArchitectureAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-hiraya-light overflow-hidden">
      <div className="flex flex-col items-center gap-8 w-full max-w-md">
        <motion.div 
          className="px-8 py-4 bg-white border border-slate-200 rounded-2xl shadow-lg text-hiraya-blue font-mono font-bold flex items-center gap-3 z-10"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Database className="w-5 h-5" />
          Headless CMS
        </motion.div>
        
        <div className="flex justify-between w-full px-8 relative">
          {/* Top connecting line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-slate-300" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-8 bg-slate-300 -translate-y-full" />

          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-4 relative">
              <div className="w-px h-8 bg-slate-300" />
              <motion.div 
                className="px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm text-slate-600 text-sm font-mono relative overflow-hidden group"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-hiraya-blue/10"
                  initial={{ x: '-100%' }}
                  whileInView={{ x: '100%' }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                />
                /category-{i + 1}
              </motion.div>
              
              <div className="flex gap-3 mt-4">
                {[...Array(2)].map((_, j) => (
                  <motion.div 
                    key={j}
                    className="w-12 h-16 bg-white border border-slate-200 rounded shadow-sm flex flex-col gap-1.5 p-2 relative overflow-hidden"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: i * 0.2 + j * 0.1 + 0.4 }}
                  >
                    <div className="w-full h-1.5 bg-slate-100 rounded" />
                    <div className="w-3/4 h-1.5 bg-slate-100 rounded" />
                    <div className="w-full h-1.5 bg-slate-100 rounded mt-auto" />
                    
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-b from-transparent via-hiraya-blue/5 to-transparent"
                      initial={{ y: '-100%' }}
                      whileInView={{ y: '100%' }}
                      transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AIQualificationAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-slate-50 p-8 md:p-12">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col h-[500px] relative">
        <div className="p-5 bg-hiraya-blue text-white flex items-center gap-3 shadow-md z-10">
          <Bot className="w-6 h-6" />
          <div>
            <div className="font-semibold">Hiraya AI Agent</div>
            <div className="text-xs text-white/70 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online
            </div>
          </div>
        </div>
        
        <div className="flex-1 p-6 flex flex-col gap-5 overflow-hidden relative bg-slate-50/50">
          <motion.div 
            initial={{ opacity: 0, x: -20, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="bg-white p-4 rounded-2xl rounded-tl-none text-sm text-slate-700 w-[85%] shadow-sm border border-slate-100"
          >
            What is your current monthly marketing budget?
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 1.5, type: "spring" }}
            className="bg-hiraya-blue text-white p-4 rounded-2xl rounded-tr-none text-sm w-[85%] self-end shadow-sm"
          >
            Around $15k/month, looking to scale.
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: -20, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 2.8, type: "spring" }}
            className="bg-white p-4 rounded-2xl rounded-tl-none text-sm text-slate-700 w-[85%] shadow-sm border border-slate-100"
          >
            Perfect. I've analyzed your site. Let's schedule a technical audit.
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 4, type: "spring", stiffness: 200 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-6 py-3 rounded-full font-bold shadow-xl flex items-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            Lead Qualified
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// --- Main Component ---

export function CaseStudies() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  // Track vertical scroll progress within the target section
  const { scrollYProgress } = useScroll({ 
    target: targetRef,
    offset: ["start start", "end end"]
  });
  
  // Apply a spring physics to the scroll progress.
  // This gives the "easy easing motion" on fast scrolls,
  // while still tracking 1:1 on slow scrolls.
  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 20,
    restDelta: 0.001
  });
  
  // Map the smoothed vertical progress to horizontal translation.
  // We have 3 cards, so we need to move left by 200vw (or -66.66% of a 300vw container)
  const x = useTransform(smoothProgress, [0, 1], ["0%", "-66.666%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-white">
      {/* 
        Sticky container that holds the horizontal scroll area.
        It stays pinned to the top of the screen while the user scrolls through the 300vh section.
      */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-white flex flex-col">
        
        {/* Section Header - Fixed at top */}
        <div className="w-full p-6 md:p-12 z-20 shrink-0">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">System Architecture Case Studies</h2>
          <p className="text-slate-600 mt-2 text-lg">Scroll to explore our engineered solutions.</p>
        </div>

        {/* Horizontal Moving Area */}
        <motion.div 
          style={{ x }}
          className="flex w-[300vw] flex-1"
        >
          {cases.map((study, index) => (
            <div 
              key={index} 
              className="w-screen h-full shrink-0 flex flex-col md:flex-row relative"
            >
              {/* Left Side: Text Content (50%) */}
              <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center p-8 md:p-16 lg:p-24 bg-white z-10">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="text-sm font-mono text-hiraya-blue mb-4 uppercase tracking-widest">{study.client}</div>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-slate-900 leading-tight">{study.title}</h3>
                  
                  <div className="flex flex-wrap gap-2 mb-10">
                    {study.tags.map(tag => (
                      <span key={tag} className="text-sm px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="space-y-8">
                    <div>
                      <div className="text-sm font-bold text-slate-400 mb-3 uppercase tracking-wider flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-400" /> Problem
                      </div>
                      <p className="text-slate-700 text-lg leading-relaxed">{study.problem}</p>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-400 mb-3 uppercase tracking-wider flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-400" /> System Built
                      </div>
                      <p className="text-slate-700 text-lg leading-relaxed">{study.solution}</p>
                    </div>
                  </div>
                  
                  <div className="mt-12 pt-8 border-t border-slate-100">
                    <button className="flex items-center text-base font-bold text-hiraya-blue group hover:text-hiraya-blue-dark transition-colors">
                      View Full Architecture <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Right Side: Interactive Animation (50%) */}
              <div className="w-full md:w-1/2 h-1/2 md:h-full relative border-l border-slate-100">
                <study.Animation />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Progress Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20 pointer-events-none">
          {cases.map((_, i) => (
            <motion.div 
              key={i} 
              className="w-2 h-2 rounded-full bg-hiraya-blue"
              style={{
                opacity: useTransform(
                  smoothProgress,
                  // Map progress to opacity: 1 when active, 0.3 when inactive
                  [
                    (i - 0.5) / (cases.length - 1), 
                    i / (cases.length - 1), 
                    (i + 0.5) / (cases.length - 1)
                  ],
                  [0.3, 1, 0.3]
                )
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
