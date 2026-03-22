'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

try {
  gsap.registerPlugin(ScrollTrigger);
} catch (_) {
  // SSR safety – ScrollTrigger requires a DOM
}

/* ─── Brand tokens ─── */
const NAVY = '#0B1F33';
const TEAL = '#1FA5A3';
const SURFACE = '#F5F7FA';

/* ════════════════════════════════════════════════════════════
   Panel 1 – Google Ads Dashboard
   ════════════════════════════════════════════════════════════ */
function GoogleAdsPanel() {
  return (
    <div
      className="panel"
      style={{
        width: '100vw',
        height: '100vh',
        flexShrink: 0,
        background: NAVY,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* subtle grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, width: '85%', maxWidth: 900 }}>
        <span
          style={{
            fontSize: 11,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: TEAL,
            fontFamily: 'monospace',
          }}
        >
          Interactive Demo &middot; Representative Data
        </span>

        <h2
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 700,
            margin: '0.5rem 0 1.5rem',
          }}
        >
          Google Ads Dashboard
        </h2>

        {/* Metrics row */}
        <div
          className="ads-metrics"
          style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 32 }}
        >
          <MetricCard label="CPC" from="$2.40" to="$0.95" color="#22c55e" />
          <MetricCard label="CTR" from="1.2%" to="4.8%" color={TEAL} />
          <MetricCard label="Conversions" from="34" to="187" color="#f59e0b" />
        </div>

        {/* Bar chart */}
        <div className="ads-bars" style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 120, marginBottom: 32 }}>
          {[65, 45, 80, 55, 90, 70, 95].map((h, i) => (
            <div
              key={i}
              className="ads-bar"
              style={{
                width: 28,
                height: 0,
                borderRadius: 4,
                background: `linear-gradient(to top, ${TEAL}, ${TEAL}88)`,
              }}
              data-height={h}
            />
          ))}
        </div>

        {/* Campaign table */}
        <div className="ads-table">
          {['Brand Campaign', 'Retargeting', 'Lookalike Audiences', 'Search – Non-brand'].map(
            (name, i) => (
              <div
                key={i}
                className="ads-row"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px 16px',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  opacity: 0,
                  transform: 'translateY(12px)',
                  fontSize: 14,
                }}
              >
                <span>{name}</span>
                <span style={{ color: '#22c55e' }}>Active</span>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   Panel 2 – Search Console Rankings
   ════════════════════════════════════════════════════════════ */
function SearchConsolePanel() {
  return (
    <div
      className="panel"
      style={{
        width: '100vw',
        height: '100vh',
        flexShrink: 0,
        background: SURFACE,
        color: NAVY,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'relative', zIndex: 1, width: '85%', maxWidth: 900 }}>
        <span
          style={{
            fontSize: 11,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: TEAL,
            fontFamily: 'monospace',
          }}
        >
          Interactive Demo &middot; Representative Data
        </span>

        <h2
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 700,
            margin: '0.5rem 0 1.5rem',
          }}
        >
          Search Console Rankings
        </h2>

        {/* Ranking graph */}
        <div
          style={{
            position: 'relative',
            height: 180,
            marginBottom: 32,
            background: '#fff',
            borderRadius: 12,
            padding: 20,
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 400 140"
            preserveAspectRatio="none"
            style={{ overflow: 'visible' }}
          >
            <text x="0" y="15" fontSize="10" fill="#999">1</text>
            <text x="0" y="55" fontSize="10" fill="#999">25</text>
            <text x="0" y="95" fontSize="10" fill="#999">50</text>
            <text x="0" y="135" fontSize="10" fill="#999">100</text>
            <polyline
              className="gsc-line"
              points="30,120 80,110 140,90 200,60 260,35 320,20 380,10"
              fill="none"
              stroke={TEAL}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="600"
              strokeDashoffset="600"
            />
            {[
              [30, 120], [80, 110], [140, 90], [200, 60],
              [260, 35], [320, 20], [380, 10],
            ].map(([cx, cy], i) => (
              <circle
                key={i}
                className="gsc-dot"
                cx={cx}
                cy={cy}
                r="4"
                fill={TEAL}
                opacity="0"
              />
            ))}
          </svg>
        </div>

        {/* Keywords table */}
        <div
          style={{
            background: '#fff',
            borderRadius: 12,
            padding: '8px 0',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          }}
        >
          {[
            { kw: 'digital marketing agency', from: 58, to: 3 },
            { kw: 'seo services philippines', from: 42, to: 1 },
            { kw: 'google ads management', from: 67, to: 5 },
            { kw: 'lead generation automation', from: 51, to: 4 },
          ].map((row, i) => (
            <div
              key={i}
              className="gsc-row"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 20px',
                borderBottom: i < 3 ? '1px solid #eee' : 'none',
                fontSize: 14,
                opacity: 0,
                transform: 'translateX(-20px)',
              }}
            >
              <span style={{ fontWeight: 500 }}>{row.kw}</span>
              <span>
                <span style={{ color: '#999', textDecoration: 'line-through', marginRight: 8 }}>
                  #{row.from}
                </span>
                <span style={{ color: TEAL, fontWeight: 700, fontSize: 18 }}>
                  #{row.to}
                </span>
              </span>
            </div>
          ))}
        </div>

        {/* Counters */}
        <div style={{ display: 'flex', gap: 24, marginTop: 24 }}>
          <CounterBox label="Impressions" value="284910" />
          <CounterBox label="Clicks" value="23487" />
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   Panel 3 – Live Analytics
   ════════════════════════════════════════════════════════════ */
function LiveAnalyticsPanel() {
  return (
    <div
      className="panel"
      style={{
        width: '100vw',
        height: '100vh',
        flexShrink: 0,
        background: NAVY,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* grid bg */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, width: '85%', maxWidth: 900 }}>
        <span
          style={{
            fontSize: 11,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: TEAL,
            fontFamily: 'monospace',
          }}
        >
          Interactive Demo &middot; Representative Data
        </span>

        <h2
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 700,
            margin: '0.5rem 0 1.5rem',
          }}
        >
          Live Analytics
        </h2>

        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 32 }}>
          {/* Visitor counter */}
          <div
            style={{
              flex: '1 1 200px',
              background: 'rgba(255,255,255,0.04)',
              borderRadius: 12,
              padding: 24,
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>
              Active Visitors
            </div>
            <div
              className="visitor-count"
              style={{ fontSize: 48, fontWeight: 700, fontFamily: 'monospace', color: TEAL }}
            >
              0
            </div>
          </div>

          {/* Bounce rate */}
          <div
            style={{
              flex: '1 1 200px',
              background: 'rgba(255,255,255,0.04)',
              borderRadius: 12,
              padding: 24,
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>
              Bounce Rate
            </div>
            <div
              className="bounce-value"
              style={{ fontSize: 48, fontWeight: 700, fontFamily: 'monospace', color: '#22c55e' }}
            >
              68%
            </div>
          </div>
        </div>

        {/* World map placeholder with pinging dots */}
        <div
          style={{
            position: 'relative',
            height: 200,
            background: 'rgba(255,255,255,0.02)',
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.06)',
            overflow: 'hidden',
            marginBottom: 24,
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />
          {[
            { top: '30%', left: '20%', delay: '0s' },
            { top: '45%', left: '48%', delay: '0.7s' },
            { top: '35%', left: '75%', delay: '1.4s' },
            { top: '55%', left: '35%', delay: '2.1s' },
            { top: '25%', left: '60%', delay: '0.3s' },
            { top: '60%', left: '80%', delay: '1.8s' },
          ].map((dot, i) => (
            <span
              key={i}
              className="ping-dot"
              style={{
                position: 'absolute',
                top: dot.top,
                left: dot.left,
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: TEAL,
                boxShadow: `0 0 12px ${TEAL}`,
                animationDelay: dot.delay,
              }}
            />
          ))}
          <span
            style={{
              position: 'absolute',
              bottom: 8,
              right: 12,
              fontSize: 10,
              color: 'rgba(255,255,255,0.3)',
              fontFamily: 'monospace',
            }}
          >
            Global Traffic Map
          </span>
        </div>

        {/* Page views chart */}
        <div
          style={{
            background: 'rgba(255,255,255,0.04)',
            borderRadius: 12,
            padding: 20,
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 12 }}>
            Page Views (24h)
          </div>
          <svg width="100%" height="60" viewBox="0 0 400 60" preserveAspectRatio="none">
            <polyline
              className="analytics-line"
              points="0,55 40,48 80,50 120,38 160,42 200,28 240,30 280,18 320,22 360,10 400,8"
              fill="none"
              stroke={TEAL}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="600"
              strokeDashoffset="600"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   Panel 4 – Automation Engine
   ════════════════════════════════════════════════════════════ */
function AutomationPanel() {
  const nodes = [
    { label: 'Lead Captured', x: 60 },
    { label: 'AI Scoring', x: 185 },
    { label: 'CRM Routing', x: 310 },
    { label: 'Nurture Sent', x: 435 },
  ];

  return (
    <div
      className="panel"
      style={{
        width: '100vw',
        height: '100vh',
        flexShrink: 0,
        background: SURFACE,
        color: NAVY,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'relative', zIndex: 1, width: '85%', maxWidth: 900 }}>
        <span
          style={{
            fontSize: 11,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: TEAL,
            fontFamily: 'monospace',
          }}
        >
          Interactive Demo &middot; Representative Data
        </span>

        <h2
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 700,
            margin: '0.5rem 0 1.5rem',
          }}
        >
          Automation Engine
        </h2>

        {/* Flow diagram */}
        <div
          className="flow-diagram"
          style={{
            position: 'relative',
            background: '#fff',
            borderRadius: 16,
            padding: '40px 24px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            marginBottom: 32,
            overflow: 'hidden',
          }}
        >
          <svg
            width="100%"
            height="80"
            viewBox="0 0 520 80"
            preserveAspectRatio="xMidYMid meet"
            style={{ display: 'block', margin: '0 auto' }}
          >
            {[0, 1, 2].map((i) => (
              <line
                key={i}
                className="flow-pipe"
                x1={nodes[i].x + 40}
                y1={40}
                x2={nodes[i + 1].x}
                y2={40}
                stroke="#ddd"
                strokeWidth="3"
                strokeDasharray="8 4"
                strokeDashoffset="0"
              />
            ))}
            {nodes.map((node, i) => (
              <g key={i}>
                <rect
                  className="flow-node"
                  x={node.x}
                  y={16}
                  width={80}
                  height={48}
                  rx={10}
                  fill="#e8e8e8"
                  stroke="#ddd"
                  strokeWidth="1.5"
                />
                <text
                  x={node.x + 40}
                  y={44}
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight="600"
                  fill={NAVY}
                >
                  {node.label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Status indicators */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}>
          {['Email Sent', 'CRM Updated', 'Slack Notified', 'Report Logged'].map((status, i) => (
            <div
              key={i}
              className="status-indicator"
              style={{
                flex: '1 1 140px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 16px',
                background: '#fff',
                borderRadius: 10,
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              <span
                className="status-dot"
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: '#ddd',
                  flexShrink: 0,
                  transition: 'background 0.3s',
                }}
              />
              {status}
            </div>
          ))}
        </div>

        {/* Leads counter */}
        <div
          style={{
            textAlign: 'center',
            background: '#fff',
            borderRadius: 12,
            padding: 24,
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          }}
        >
          <div style={{ fontSize: 13, color: '#666', marginBottom: 4 }}>
            Leads processed today
          </div>
          <div
            className="leads-value"
            style={{ fontSize: 42, fontWeight: 700, fontFamily: 'monospace', color: TEAL }}
          >
            0
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   Shared sub-components
   ════════════════════════════════════════════════════════════ */
function MetricCard({
  label,
  from,
  to,
  color,
}: {
  label: string;
  from: string;
  to: string;
  color: string;
}) {
  return (
    <div
      style={{
        flex: '1 1 140px',
        background: 'rgba(255,255,255,0.04)',
        borderRadius: 12,
        padding: '16px 20px',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span
          style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', textDecoration: 'line-through' }}
        >
          {from}
        </span>
        <span style={{ fontSize: 28, fontWeight: 700, color }}>{to}</span>
      </div>
    </div>
  );
}

function CounterBox({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        flex: '1 1 160px',
        background: '#fff',
        borderRadius: 12,
        padding: '16px 20px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      }}
    >
      <div style={{ fontSize: 12, color: '#999', marginBottom: 4 }}>{label}</div>
      <div
        className="counter-value"
        style={{ fontSize: 28, fontWeight: 700, fontFamily: 'monospace', color: TEAL }}
        data-value={value}
      >
        0
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   Main export – Horizontal Scroll Showcase
   ════════════════════════════════════════════════════════════ */
export default function ScrollAnimations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const panels = track.querySelectorAll<HTMLDivElement>('.panel');
      const totalPanels = panels.length;

      /* ── Horizontal scroll pin ── */
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${totalPanels * 100}%`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      /* ── Panel 1 – Google Ads ── */
      const adsBars = track.querySelectorAll<HTMLDivElement>('.ads-bar');
      const adsRows = track.querySelectorAll<HTMLDivElement>('.ads-row');

      adsBars.forEach((bar) => {
        gsap.to(bar, {
          height: Number(bar.dataset.height),
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=50%',
            scrub: 1,
          },
        });
      });

      adsRows.forEach((row, i) => {
        gsap.to(row, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=60%',
            scrub: 1,
          },
        });
      });

      /* ── Panel 2 – Search Console ── */
      const gscLine = track.querySelector<SVGPolylineElement>('.gsc-line');
      const gscDots = track.querySelectorAll<SVGCircleElement>('.gsc-dot');
      const gscRows = track.querySelectorAll<HTMLDivElement>('.gsc-row');
      const counterValues = track.querySelectorAll<HTMLDivElement>('.counter-value');

      if (gscLine) {
        gsap.to(gscLine, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: '+=100%',
            end: '+=175%',
            scrub: 1,
          },
        });
      }

      gscDots.forEach((dot, i) => {
        gsap.to(dot, {
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: `+=${110 + i * 8}%`,
            end: `+=${120 + i * 8}%`,
            scrub: 1,
          },
        });
      });

      gscRows.forEach((row, i) => {
        gsap.to(row, {
          opacity: 1,
          x: 0,
          scrollTrigger: {
            trigger: section,
            start: `+=${115 + i * 8}%`,
            end: `+=${135 + i * 8}%`,
            scrub: 1,
          },
        });
      });

      counterValues.forEach((el) => {
        const raw = el.dataset.value || '0';
        const target = parseInt(raw.replace(/,/g, ''), 10);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: section,
            start: '+=120%',
            end: '+=180%',
            scrub: 1,
          },
          onUpdate() {
            el.textContent = Math.round(obj.val).toLocaleString();
          },
        });
      });

      /* ── Panel 3 – Live Analytics ── */
      const analyticsLine = track.querySelector<SVGPolylineElement>('.analytics-line');
      const visitorCount = track.querySelector<HTMLDivElement>('.visitor-count');
      const bounceValue = track.querySelector<HTMLDivElement>('.bounce-value');

      if (analyticsLine) {
        gsap.to(analyticsLine, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: '+=200%',
            end: '+=275%',
            scrub: 1,
          },
        });
      }

      if (visitorCount) {
        const vObj = { val: 0 };
        gsap.to(vObj, {
          val: 1342,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: section,
            start: '+=200%',
            end: '+=280%',
            scrub: 1,
          },
          onUpdate() {
            visitorCount.textContent = Math.round(vObj.val).toLocaleString();
          },
        });
      }

      if (bounceValue) {
        const bObj = { val: 68 };
        gsap.to(bObj, {
          val: 31,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: section,
            start: '+=210%',
            end: '+=280%',
            scrub: 1,
          },
          onUpdate() {
            bounceValue.textContent = `${Math.round(bObj.val)}%`;
          },
        });
      }

      /* ── Panel 4 – Automation Engine ── */
      const flowNodes = track.querySelectorAll<SVGRectElement>('.flow-node');
      const flowPipes = track.querySelectorAll<SVGLineElement>('.flow-pipe');
      const statusDots = track.querySelectorAll<HTMLSpanElement>('.status-dot');
      const leadsValue = track.querySelector<HTMLDivElement>('.leads-value');

      flowNodes.forEach((node, i) => {
        gsap.to(node, {
          attr: { fill: TEAL, stroke: TEAL },
          scrollTrigger: {
            trigger: section,
            start: `+=${305 + i * 15}%`,
            end: `+=${315 + i * 15}%`,
            scrub: 1,
          },
        });
      });

      flowPipes.forEach((pipe, i) => {
        gsap.to(pipe, {
          attr: { stroke: TEAL },
          strokeDashoffset: -24,
          scrollTrigger: {
            trigger: section,
            start: `+=${310 + i * 15}%`,
            end: `+=${340 + i * 15}%`,
            scrub: 1,
          },
        });
      });

      statusDots.forEach((dot, i) => {
        gsap.to(dot, {
          background: '#22c55e',
          scrollTrigger: {
            trigger: section,
            start: `+=${320 + i * 10}%`,
            end: `+=${330 + i * 10}%`,
            scrub: 1,
          },
        });
      });

      if (leadsValue) {
        const lObj = { val: 0 };
        gsap.to(lObj, {
          val: 1247,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: section,
            start: '+=310%',
            end: '+=380%',
            scrub: 1,
          },
          onUpdate() {
            leadsValue.textContent = Math.round(lObj.val).toLocaleString();
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Ping-dot animation keyframes */}
      <style>{`
        @keyframes ping-pulse {
          0% { box-shadow: 0 0 0 0 ${TEAL}88; }
          70% { box-shadow: 0 0 0 12px ${TEAL}00; }
          100% { box-shadow: 0 0 0 0 ${TEAL}00; }
        }
        .ping-dot {
          animation: ping-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>

      <section
        id="showcase"
        ref={sectionRef}
        style={{ width: '100%', overflow: 'hidden' }}
      >
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            flexWrap: 'nowrap',
            width: 'fit-content',
          }}
        >
          <GoogleAdsPanel />
          <SearchConsolePanel />
          <LiveAnalyticsPanel />
          <AutomationPanel />
        </div>
      </section>
    </>
  );
}
