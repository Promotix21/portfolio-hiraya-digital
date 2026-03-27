'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { Search, PenTool, Rocket, LineChart, TrendingUp } from 'lucide-react';
import { AnimatedHeading } from '@/components/ui/AnimatedHeading';

const CLD = 'https://res.cloudinary.com/dqfhsj52r/image/upload/q_auto,f_auto,w_800';

const steps = [
  {
    id: '01',
    title: 'Discovery & Audit',
    desc: 'Deep dive into your current infrastructure, identifying bottlenecks and opportunities.',
    icon: Search,
    image: `${CLD}/hiraya-portfolio/process/discovery.png`
  },
  {
    id: '02',
    title: 'System Engineering',
    desc: 'Architecting the solution: tracking setup, automation workflows, and custom development.',
    icon: PenTool,
    image: `${CLD}/hiraya-portfolio/process/engineering.png`
  },
  {
    id: '03',
    title: 'Execution',
    desc: 'Deploying campaigns, launching tools, and implementing the growth strategy.',
    icon: Rocket,
    image: `${CLD}/hiraya-portfolio/process/execution.png`
  },
  {
    id: '04',
    title: 'Optimization',
    desc: 'Continuous refinement based on data, A/B testing, and performance metrics.',
    icon: LineChart,
    image: `${CLD}/hiraya-portfolio/process/optimization.png`
  },
  {
    id: '05',
    title: 'Scaling',
    desc: 'Expanding successful systems to drive exponential growth.',
    icon: TrendingUp,
    image: `${CLD}/hiraya-portfolio/process/scaling.png`
  },
];

export function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  // Auto-play logic
  useEffect(() => {
    const duration = 5000; // 5 seconds per slide
    const interval = 50; // Update progress every 50ms
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveStep((current) => (current + 1) % steps.length);
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [activeStep]);

  // Handle manual step click
  const handleStepClick = (index: number) => {
    setActiveStep(index);
    setProgress(0);
  };

  return (
    <section id="process" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Dynamic Background Blur */}
      <div className="absolute inset-0 z-0 opacity-30 transition-opacity duration-1000">
        <AnimatePresence>
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <Image 
              src={steps[activeStep].image} 
              alt="Background" 
              fill 
              className="object-cover blur-3xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-slate-950/60" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-4"><span className="text-white">Process </span><span className="text-gradient">Intelligence</span></h2>
          <p className="text-slate-400 max-w-2xl text-lg">
            A systematic, engineering-driven approach to growth.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:h-[70vh] lg:min-h-[600px]">
          
          {/* Left: Interactive Steps List */}
          <div className="w-full lg:w-5/12 flex flex-col gap-4 h-full justify-center">
            {steps.map((step, i) => {
              const isActive = activeStep === i;
              const Icon = step.icon;

              return (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(i)}
                  className={`group relative text-left p-6 rounded-2xl transition-all duration-500 overflow-hidden ${
                    isActive 
                      ? 'bg-white/10 border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.05)]' 
                      : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {/* Progress Bar Background for Active Step */}
                  {isActive && (
                    <div 
                      className="absolute top-0 left-0 bottom-0 bg-hiraya-blue/10 z-0"
                      style={{ width: `${progress}%`, transition: 'width 50ms linear' }}
                    />
                  )}

                  <div className="relative z-10 flex items-start gap-5">
                    <div className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center transition-colors duration-500 ${
                      isActive ? 'bg-hiraya-blue text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className={`font-mono text-sm font-bold ${isActive ? 'text-hiraya-blue' : 'text-slate-500'}`}>
                          {step.id}
                        </span>
                        <h3 className={`text-xl font-bold transition-colors duration-500 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                          {step.title}
                        </h3>
                      </div>
                      
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: 'auto', opacity: 1, marginTop: 8 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <p className="text-slate-300 leading-relaxed">
                              {step.desc}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Visualizer Viewport */}
          <div className="w-full lg:w-7/12 h-[400px] lg:h-full relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900">
            <AnimatePresence>
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image 
                  src={steps[activeStep].image} 
                  alt={steps[activeStep].title}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay Gradient for better contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                {/* Floating Badge inside the image */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="absolute bottom-8 left-8 right-8"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium">
                    <span className="w-2 h-2 rounded-full bg-hiraya-blue animate-pulse" />
                    Phase {steps[activeStep].id} Active
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
