'use client';

import { useEffect, useRef } from 'react';

/* ─── Panel sub‑components ─── */

function GoogleAdsPanel() {
  return (
    <div className="w-screen h-screen flex-shrink-0 bg-navy flex items-center justify-center p-8 md:p-16">
      <div className="max-w-5xl w-full">
        <span className="label-tag-dark mb-4 inline-block">Interactive Demo</span>
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-8">
          Google Ads Command Center
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* CPC Card */}
          <div className="glass-card-dark p-6">
            <p className="text-white/40 text-sm font-mono mb-1">Cost Per Click</p>
            <div className="flex items-baseline gap-3">
              <span className="text-white/30 line-through text-lg">$2.40</span>
              <span className="text-3xl font-bold text-gradient animate-counter">$0.95</span>
            </div>
            <p className="text-teal-light text-xs mt-2 font-mono">▼ 60% reduction</p>
          </div>
          {/* CTR Card */}
          <div className="glass-card-dark p-6">
            <p className="text-white/40 text-sm font-mono mb-1">Click-Through Rate</p>
            <div className="flex items-baseline gap-3">
              <span className="text-white/30 line-through text-lg">1.2%</span>
              <span className="text-3xl font-bold text-gradient">4.8%</span>
            </div>
            <p className="text-teal-light text-xs mt-2 font-mono">▲ 300% increase</p>
          </div>
          {/* Conversions Card */}
          <div className="glass-card-dark p-6">
            <p className="text-white/40 text-sm font-mono mb-1">Conversions</p>
            <span className="text-3xl font-bold text-gradient">1,247</span>
            <p className="text-teal-light text-xs mt-2 font-mono">▲ +89% MoM</p>
          </div>
        </div>

        {/* Mini bar chart */}
        <div className="glass-card-dark p-6">
          <p className="text-white/40 text-sm font-mono mb-4">Campaign Performance (12 weeks)</p>
          <div className="flex items-end gap-2 h-32">
            {[25, 35, 30, 45, 50, 42, 60, 72, 68, 80, 90, 95].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-teal to-teal-light rounded-t opacity-0"
                style={{
                  height: `${h}%`,
                  animation: `chart-grow 0.8s ease-out ${i * 0.1}s forwards`,
                  transformOrigin: 'bottom',
                }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-white/20 text-xs font-mono">
            <span>W1</span><span>W6</span><span>W12</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchConsolePanel() {
  const keywords = [
    { keyword: 'growth engineering agency', from: 47, to: 3 },
    { keyword: 'marketing automation tools', from: 52, to: 5 },
    { keyword: 'ai lead scoring', from: 38, to: 1 },
    { keyword: 'custom marketing dashboard', from: 61, to: 4 },
    { keyword: 'technical seo services', from: 44, to: 2 },
  ];

  return (
    <div className="w-screen h-screen flex-shrink-0 bg-white flex items-center justify-center p-8 md:p-16">
      <div className="max-w-5xl w-full">
        <span className="label-tag mb-4 inline-block">Interactive Demo</span>
        <h3 className="text-3xl md:text-4xl font-bold text-navy mb-8">
          Search Console Rankings
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-card p-6">
            <p className="text-navy/40 text-sm font-mono mb-1">Total Impressions</p>
            <span className="text-3xl font-bold text-gradient">847K</span>
            <p className="text-teal text-xs mt-2 font-mono">▲ +340% growth</p>
          </div>
          <div className="glass-card p-6">
            <p className="text-navy/40 text-sm font-mono mb-1">Total Clicks</p>
            <span className="text-3xl font-bold text-gradient">52.3K</span>
            <p className="text-teal text-xs mt-2 font-mono">▲ +280% growth</p>
          </div>
          <div className="glass-card p-6">
            <p className="text-navy/40 text-sm font-mono mb-1">Avg Position</p>
            <span className="text-3xl font-bold text-gradient">4.2</span>
            <p className="text-teal text-xs mt-2 font-mono">▲ from 38.7</p>
          </div>
        </div>

        {/* Rankings table */}
        <div className="glass-card overflow-hidden">
          <div className="grid grid-cols-3 gap-4 p-4 text-sm font-mono text-navy/40 border-b border-surface-border">
            <span>Keyword</span>
            <span className="text-center">Before</span>
            <span className="text-center">After</span>
          </div>
          {keywords.map((kw, i) => (
            <div
              key={kw.keyword}
              className="grid grid-cols-3 gap-4 p-4 text-sm border-b border-surface-border last:border-0 opacity-0"
              style={{ animation: `fadeIn 0.5s ease-out ${i * 0.15}s forwards` }}
            >
              <span className="text-navy font-medium">{kw.keyword}</span>
              <span className="text-center text-navy/30">#{kw.from}</span>
              <span className="text-center font-bold text-gradient">#{kw.to}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LiveAnalyticsPanel() {
  return (
    <div className="w-screen h-screen flex-shrink-0 bg-navy flex items-center justify-center p-8 md:p-16">
      <div className="max-w-5xl w-full">
        <span className="label-tag-dark mb-4 inline-block">Interactive Demo</span>
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-8">
          Live Analytics Dashboard
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-card-dark p-5">
            <p className="text-white/40 text-xs font-mono mb-1">Active Now</p>
            <span className="text-2xl font-bold text-gradient">1,847</span>
            <div className="mt-2 flex items-center gap-1">
              <span className="w-2 h-2 bg-teal-light rounded-full animate-pulse" />
              <span className="text-teal-light text-xs">Live</span>
            </div>
          </div>
          <div className="glass-card-dark p-5">
            <p className="text-white/40 text-xs font-mono mb-1">Page Views</p>
            <span className="text-2xl font-bold text-gradient">24.5K</span>
            <p className="text-teal-light text-xs mt-2">▲ +12% today</p>
          </div>
          <div className="glass-card-dark p-5">
            <p className="text-white/40 text-xs font-mono mb-1">Bounce Rate</p>
            <span className="text-2xl font-bold text-gradient">18%</span>
            <p className="text-teal-light text-xs mt-2">▼ from 42%</p>
          </div>
          <div className="glass-card-dark p-5">
            <p className="text-white/40 text-xs font-mono mb-1">Avg Session</p>
            <span className="text-2xl font-bold text-gradient">4m 32s</span>
            <p className="text-teal-light text-xs mt-2">▲ +85%</p>
          </div>
        </div>

        {/* Live chart visualization */}
        <div className="glass-card-dark p-6">
          <p className="text-white/40 text-sm font-mono mb-4">Real-time Page Views</p>
          <svg viewBox="0 0 600 120" className="w-full h-32">
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1FA5A3" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#1FA5A3" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,100 C50,90 100,70 150,65 C200,60 250,50 300,40 C350,30 400,35 450,25 C500,20 550,15 600,10"
              fill="none"
              stroke="#1FA5A3"
              strokeWidth="2"
              className="animate-chart-grow"
              style={{ transformOrigin: 'left', strokeDasharray: 800, strokeDashoffset: 800, animation: 'draw-line 2s ease-out forwards' }}
            />
            <path
              d="M0,100 C50,90 100,70 150,65 C200,60 250,50 300,40 C350,30 400,35 450,25 C500,20 550,15 600,10 L600,120 L0,120Z"
              fill="url(#chartGrad)"
              opacity="0.5"
            />
          </svg>
          {/* Ping dots - world map simulation */}
          <div className="relative mt-6 h-16 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-around">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="relative">
                  <span
                    className="block w-2 h-2 bg-teal rounded-full"
                    style={{ animation: `pulse-slow 2s ease-in-out ${i * 0.4}s infinite` }}
                  />
                  <span
                    className="absolute inset-0 w-2 h-2 bg-teal rounded-full animate-ping"
                    style={{ animationDelay: `${i * 0.4}s` }}
                  />
                </div>
              ))}
            </div>
            <p className="absolute bottom-0 left-0 text-white/20 text-xs font-mono">
              Visitors from 23 countries
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AutomationEnginePanel() {
  const steps = [
    { label: 'Form Submit', status: 'complete' },
    { label: 'AI Scoring', status: 'complete' },
    { label: 'Enrichment', status: 'complete' },
    { label: 'CRM Sync', status: 'complete' },
    { label: 'Assignment', status: 'active' },
    { label: 'Notification', status: 'pending' },
  ];

  return (
    <div className="w-screen h-screen flex-shrink-0 bg-surface flex items-center justify-center p-8 md:p-16">
      <div className="max-w-5xl w-full">
        <span className="label-tag mb-4 inline-block">Interactive Demo</span>
        <h3 className="text-3xl md:text-4xl font-bold text-navy mb-8">
          Automation Engine
        </h3>

        {/* Flow diagram */}
        <div className="glass-card p-8 mb-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {steps.map((step, i) => (
              <div key={step.label} className="flex items-center gap-3">
                <div
                  className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                    step.status === 'complete'
                      ? 'bg-teal/10 border-teal text-teal'
                      : step.status === 'active'
                        ? 'bg-teal text-white border-teal animate-pulse'
                        : 'bg-surface border-surface-border text-navy/40'
                  }`}
                  style={{ animation: step.status !== 'active' ? `fadeIn 0.5s ease-out ${i * 0.2}s both` : undefined }}
                >
                  {step.status === 'complete' && '✓ '}
                  {step.label}
                </div>
                {i < steps.length - 1 && (
                  <svg width="24" height="12" className="text-navy/20 flex-shrink-0 hidden md:block">
                    <line x1="0" y1="6" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2">
                      <animate attributeName="stroke-dashoffset" from="6" to="0" dur="1s" repeatCount="indefinite" />
                    </line>
                    <polygon points="16,2 24,6 16,10" fill="currentColor" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6">
            <p className="text-navy/40 text-sm font-mono mb-1">Leads Processed Today</p>
            <span className="text-3xl font-bold text-gradient">1,247</span>
            <p className="text-teal text-xs mt-2 font-mono">Fully automated</p>
          </div>
          <div className="glass-card p-6">
            <p className="text-navy/40 text-sm font-mono mb-1">Avg Processing Time</p>
            <span className="text-3xl font-bold text-gradient">3.2s</span>
            <p className="text-teal text-xs mt-2 font-mono">Down from 24 hours</p>
          </div>
          <div className="glass-card p-6">
            <p className="text-navy/40 text-sm font-mono mb-1">Error Rate</p>
            <span className="text-3xl font-bold text-gradient">0.01%</span>
            <p className="text-teal text-xs mt-2 font-mono">99.99% uptime</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main ScrollAnimations component ─── */

export default function ScrollAnimations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    async function initGSAP() {
      try {
        const gsapModule = await import('gsap');
        const scrollTriggerModule = await import('gsap/ScrollTrigger');
        const gsap = gsapModule.default;
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        if (!containerRef.current || !trackRef.current) return;

        const panels = trackRef.current.children;
        const totalPanels = panels.length;

        const st = ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${totalPanels * 100}%`,
          scrub: 1,
          pin: true,
          animation: gsap.to(trackRef.current, {
            x: () => -(trackRef.current!.scrollWidth - window.innerWidth),
            ease: 'none',
          }),
          invalidateOnRefresh: true,
        });

        cleanup = () => st.kill();
      } catch {
        // GSAP not available - panels stack vertically as fallback
      }
    }

    // Only init on desktop
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      initGSAP();
    }

    return () => cleanup?.();
  }, []);

  return (
    <section id="showcase" ref={containerRef} className="relative overflow-hidden">
      <div
        ref={trackRef}
        className="flex flex-col md:flex-row md:flex-nowrap"
      >
        <GoogleAdsPanel />
        <SearchConsolePanel />
        <LiveAnalyticsPanel />
        <AutomationEnginePanel />
      </div>

      {/* Inline keyframes for panel animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes draw-line {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </section>
  );
}
