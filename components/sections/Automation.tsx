'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'motion/react';
import { Terminal, Inbox, Bot, Shuffle, Droplet, Handshake, BarChart2 } from 'lucide-react';
import { AnimatedHeading } from '@/components/ui/AnimatedHeading';

const steps = [
  { 
    icon: Inbox, 
    title: 'Lead Capture', 
    desc: 'Captured from ads, forms, or organic traffic',
    activeBg: 'bg-blue-900/40',
    activeBorder: 'border-blue-500/50',
    activeIconBg: 'bg-blue-500/20',
    activeIconColor: 'text-blue-400',
    shadow: 'shadow-[0_0_30px_rgba(59,130,246,0.3)]'
  },
  { 
    icon: Bot, 
    title: 'AI Scoring', 
    desc: 'Scored and enriched with predictive models',
    activeBg: 'bg-indigo-900/40',
    activeBorder: 'border-indigo-500/50',
    activeIconBg: 'bg-indigo-500/20',
    activeIconColor: 'text-indigo-400',
    shadow: 'shadow-[0_0_30px_rgba(99,102,241,0.3)]'
  },
  { 
    icon: Shuffle, 
    title: 'CRM Routing', 
    desc: 'Auto-assigned to the right pipeline and rep',
    activeBg: 'bg-violet-900/40',
    activeBorder: 'border-violet-500/50',
    activeIconBg: 'bg-violet-500/20',
    activeIconColor: 'text-violet-400',
    shadow: 'shadow-[0_0_30px_rgba(139,92,246,0.3)]'
  },
  { 
    icon: Droplet, 
    title: 'Nurture Sequence', 
    desc: 'Personalized drip campaigns triggered instantly',
    activeBg: 'bg-fuchsia-900/40',
    activeBorder: 'border-fuchsia-500/50',
    activeIconBg: 'bg-fuchsia-500/20',
    activeIconColor: 'text-fuchsia-400',
    shadow: 'shadow-[0_0_30px_rgba(217,70,239,0.3)]'
  },
  { 
    icon: Handshake, 
    title: 'Sales Handoff', 
    desc: 'Warm intro with full context and lead history',
    activeBg: 'bg-cyan-900/40',
    activeBorder: 'border-cyan-500/50',
    activeIconBg: 'bg-cyan-500/20',
    activeIconColor: 'text-cyan-400',
    shadow: 'shadow-[0_0_30px_rgba(6,182,212,0.3)]'
  },
  { 
    icon: BarChart2, 
    title: 'Reporting', 
    desc: 'Real-time attribution and performance data',
    activeBg: 'bg-teal-900/40',
    activeBorder: 'border-teal-500/50',
    activeIconBg: 'bg-teal-500/20',
    activeIconColor: 'text-teal-400',
    shadow: 'shadow-[0_0_30px_rgba(20,184,166,0.3)]'
  },
];

const fullCode = `// Lead routing middleware
export async function handleNewLead(req, res) {
  const lead = req.body;
  
  // 1. Enrich data via Clearbit API
  const enriched = await enrichLead(lead.email);
  
  // 2. AI Lead Scoring
  const score = await calculateScore(enriched);
  
  // 3. Route based on score
  if (score > 80) {
    await notifySalesSlack(enriched);
    await syncToSalesforce(enriched, 'Hot');
  } else {
    await addToNurtureSequence(enriched);
  }
  
  return res.status(200).json({ status: 'routed' });
}`;

export function Automation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20%" });
  const trackControls = useAnimation();
  
  const [activeNode, setActiveNode] = useState(-1);
  const [activeLine, setActiveLine] = useState(-1);
  const [codeLength, setCodeLength] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let isMounted = true;

    const run = async () => {
      // Initial pause before starting
      await new Promise(r => setTimeout(r, 1000));
      
      for (let i = 0; i < steps.length; i++) {
        if (!isMounted) return;
        
        // 1. Show Node
        setActiveNode(i);
        await new Promise(r => setTimeout(r, 800));
        
        // 2. Draw Line (if not the last node)
        if (i < steps.length - 1) {
          setActiveLine(i);
          
          // Pan track left to keep the next item in view
          if (i >= 1) {
            trackControls.start({ 
              x: -(i) * 280, 
              transition: { duration: 1.2, ease: "easeInOut" } 
            });
          }
          await new Promise(r => setTimeout(r, 800));
        }
      }

      // 3. Pan to Code Window
      if (!isMounted) return;
      setActiveLine(steps.length - 1); // Draw final line to code window
      trackControls.start({ 
        x: -(steps.length - 1) * 280, // Pans so code window is clearly visible
        transition: { duration: 1.5, ease: "easeInOut" } 
      });
      await new Promise(r => setTimeout(r, 1000));
      
      // 4. Type Code
      for (let i = 1; i <= fullCode.length; i++) {
        if (!isMounted) return;
        setCodeLength(i);
        await new Promise(r => setTimeout(r, 20)); // Fast typing speed
      }
    };

    run();

    return () => { isMounted = false; };
  }, [isInView, trackControls]);

  return (
    <section ref={containerRef} className="bg-hiraya-dark relative py-24 md:py-32 overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b5a9620_1px,transparent_1px),linear-gradient(to_bottom,#3b5a9620_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Part (Pinned Text) */}
          <div className="lg:col-span-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-6"><span className="text-white">Automation Before </span><span className="text-gradient">Manpower</span></h2>
            <p className="text-slate-300 text-lg mb-8">
              We build custom internal tools, dashboards, and workflow automations that eliminate manual tasks and scale your operations without scaling headcount.
            </p>
            
            <ul className="space-y-4">
              {['Custom CRM Integrations', 'Automated Reporting Pipelines', 'Lead Scoring Algorithms', 'API Middleware Development'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-hiraya-yellow" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Part (Panning Animation) */}
          <div className="lg:col-span-8 relative h-[500px] flex items-center overflow-hidden rounded-l-3xl">
            {/* Fading edges for the track */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-hiraya-dark to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-hiraya-dark to-transparent z-20 pointer-events-none" />

            <motion.div animate={trackControls} className="flex items-center absolute left-12">
              
              {steps.map((step, i) => (
                <React.Fragment key={i}>
                  {/* Node */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={activeNode >= i ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className={`w-[220px] shrink-0 border p-6 rounded-2xl flex flex-col items-center text-center relative z-10 backdrop-blur-sm transition-all duration-500 ${activeNode === i ? `${step.activeBg} ${step.activeBorder} ${step.shadow}` : 'bg-slate-800/80 border-slate-700 shadow-xl'}`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border transition-colors duration-500 ${activeNode === i ? `${step.activeIconBg} ${step.activeBorder}` : 'bg-slate-700/50 border-slate-600/50'}`}>
                      <step.icon className={`w-6 h-6 ${activeNode === i ? step.activeIconColor : 'text-slate-400'}`} />
                    </div>
                    <h4 className={`font-semibold text-sm mb-2 transition-colors duration-500 ${activeNode === i ? 'text-white' : 'text-slate-300'}`}>{step.title}</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">{step.desc}</p>
                  </motion.div>

                  {/* Line to next node OR to code window */}
                  <div className="w-[60px] shrink-0 flex items-center relative">
                    <div className="w-full h-[2px] bg-slate-800 relative overflow-hidden">
                      <motion.div
                        className="absolute left-0 top-0 bottom-0 bg-hiraya-blue"
                        initial={{ width: "0%" }}
                        animate={activeLine >= i ? { width: "100%" } : { width: "0%" }}
                        transition={{ duration: 0.4, ease: "linear" }}
                      />
                    </div>
                    {/* Arrowhead */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={activeLine >= i ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                      transition={{ delay: 0.3, duration: 0.2 }}
                      className="absolute right-0 w-0 h-0 border-y-[5px] border-y-transparent border-l-[8px] border-l-hiraya-blue translate-x-[2px]"
                    />
                  </div>
                </React.Fragment>
              ))}

              {/* Code Window */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={activeLine >= steps.length - 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className={`w-[500px] shrink-0 rounded-xl border ${activeLine >= steps.length - 1 ? 'border-hiraya-blue/50 shadow-[0_0_40px_rgba(59,130,246,0.2)]' : 'border-white/10 shadow-2xl'} bg-[#0f172a] overflow-hidden relative z-10 transition-all duration-700`}
              >
                <div className="flex items-center px-4 py-3 border-b border-white/10 bg-black/40">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="mx-auto text-xs text-slate-400 font-mono flex items-center gap-2">
                    <Terminal className="w-3 h-3" />
                    automation-pipeline.ts
                  </div>
                </div>
                <div className="p-6 font-mono text-sm text-slate-300 overflow-x-auto min-h-[420px]">
                  <pre>
                    <code className="language-typescript">
                      {fullCode.slice(0, codeLength)}
                      {codeLength > 0 && codeLength < fullCode.length && (
                        <span className="animate-pulse inline-block w-2 h-4 bg-hiraya-blue ml-1 align-middle" />
                      )}
                    </code>
                  </pre>
                </div>
              </motion.div>

            </motion.div>
          </div>

        </div>
    </section>
  );
}
