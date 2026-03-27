'use client';

import { motion, useInView, animate } from 'motion/react';
import { useEffect, useRef } from 'react';
import { Search, MessageSquare, TrendingUp, Heart, MessageCircle, BarChart, ArrowUpRight, Grid, Play } from 'lucide-react';
import { AnimatedHeading } from '@/components/ui/AnimatedHeading';
import Image from 'next/image';

const CLD = 'https://res.cloudinary.com/dqfhsj52r';

// Advanced Counter with Sparkline
function MetricCard({ title, value, prefix = '', suffix = '', trend, colorClass, isReduction = false }: any) {
  const ref = useRef<HTMLSpanElement>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && ref.current) {
      animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (v) => {
          if (ref.current) ref.current.textContent = Math.floor(v).toString();
        }
      });
    }
  }, [isInView, value]);

  const sparklinePath = isReduction 
    ? "M0,5 L15,10 L30,8 L45,18 L60,15 L80,25 L100,28" 
    : "M0,30 L15,25 L30,28 L45,15 L60,20 L80,5 L100,0";
    
  const sparklineFill = isReduction
    ? "M0,5 L15,10 L30,8 L45,18 L60,15 L80,25 L100,28 L100,30 L0,30 Z"
    : "M0,30 L15,25 L30,28 L45,15 L60,20 L80,5 L100,0 L100,30 Z";

  return (
    <div ref={containerRef} className="p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden group col-span-1">
      {/* Live Indicator */}
      <div className="absolute top-6 right-6 flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <span className="text-xs text-emerald-500 font-semibold uppercase tracking-wider">Live</span>
      </div>

      <h3 className="text-slate-400 font-medium mb-2">{title}</h3>
      
      <div className="flex items-end gap-3 mb-6">
        <div className="text-5xl font-bold text-white font-mono tracking-tight">
          {prefix}<span ref={ref}>0</span>{suffix}
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className={`flex items-center text-sm font-semibold mb-1 px-2 py-1 rounded-full ${isReduction ? 'text-emerald-400 bg-emerald-400/10' : 'text-emerald-400 bg-emerald-400/10'}`}
        >
          <ArrowUpRight className={`w-3 h-3 mr-1 ${isReduction ? 'rotate-90' : ''}`} />
          {trend}
        </motion.div>
      </div>

      {/* Animated Sparkline */}
      <svg viewBox="0 0 100 30" className="w-full h-12 overflow-visible">
        <defs>
          <linearGradient id={`grad-${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colorClass} stopOpacity="0.4" />
            <stop offset="100%" stopColor={colorClass} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d={sparklinePath}
          fill="none"
          stroke={colorClass}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        />
        <motion.path
          d={sparklineFill}
          fill={`url(#grad-${title.replace(/\s+/g, '')})`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
        />
      </svg>
    </div>
  );
}

// Curved Line Chart for ROAS
function RoasChart() {
  return (
    <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm col-span-1 md:col-span-2 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-xl bg-hiraya-blue/10">
          <TrendingUp className="w-6 h-6 text-hiraya-blue" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-900 text-lg">Google Ads ROAS</h3>
          <p className="text-sm text-slate-500">Return on Ad Spend over 6 months</p>
        </div>
      </div>
      
      <div className="flex-1 relative min-h-[200px] mt-auto">
        <svg viewBox="0 0 400 200" className="w-full h-full overflow-visible" preserveAspectRatio="none">
          <defs>
            <linearGradient id="roas-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b5a96" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#3b5a96" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Grid lines */}
          {[0, 50, 100, 150, 200].map((y, i) => (
            <line key={i} x1="0" y1={y} x2="400" y2={y} stroke="#f1f5f9" strokeWidth="1" />
          ))}

          {/* Fill Area */}
          <motion.path
            d="M0,200 L0,150 C100,150 150,180 200,100 C250,20 300,80 400,20 L400,200 Z"
            fill="url(#roas-fill)"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          />
          
          {/* Line */}
          <motion.path
            d="M0,150 C100,150 150,180 200,100 C250,20 300,80 400,20"
            fill="none"
            stroke="#3b5a96"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />

          {/* Data Points */}
          {[
            { cx: 0, cy: 150, delay: 0 },
            { cx: 200, cy: 100, delay: 1 },
            { cx: 400, cy: 20, delay: 2 }
          ].map((point, i) => (
            <motion.circle
              key={i}
              cx={point.cx}
              cy={point.cy}
              r="6"
              fill="#ffffff"
              stroke="#3b5a96"
              strokeWidth="3"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: point.delay, type: "spring" }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}

// Keyword Ranking Animation
function SearchConsoleRankings() {
  const keywords = [
    { word: "B2B Growth Agency", start: 84, end: 2 },
    { word: "SaaS Marketing Automation", start: 56, end: 1 },
    { word: "Revenue Operations", start: 42, end: 3 },
  ];

  return (
    <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm col-span-1 md:col-span-2">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-xl bg-hiraya-yellow/20">
          <Search className="w-6 h-6 text-hiraya-yellow" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-900 text-lg">Search Console Rankings</h3>
          <p className="text-sm text-slate-500">Target keyword position growth</p>
        </div>
      </div>

      <div className="space-y-4">
        {keywords.map((kw, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="font-medium text-slate-700">{kw.word}</span>
            <div className="flex items-center gap-4">
              <span className="text-slate-400 font-mono text-sm">#{kw.start}</span>
              <motion.div 
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: 40, opacity: 1 }}
                transition={{ duration: 1, delay: i * 0.2 }}
                className="h-[2px] bg-emerald-400 relative"
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-emerald-400 rotate-45" />
              </motion.div>
              <motion.span 
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", delay: 1 + (i * 0.2) }}
                className="font-bold text-hiraya-blue font-mono text-xl"
              >
                #{kw.end}
              </motion.span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Instagram Grid Component
const igPosts = [
  { src: `${CLD}/image/upload/q_auto,f_auto,w_300,h_300,c_fill/hiraya-portfolio/AsianBowl/AsianBowl.jpg`, brand: 'Asian Bowl' },
  { src: `${CLD}/image/upload/q_auto,f_auto,w_300,h_300,c_fill/hiraya-portfolio/arnaporna/arnaporna1.jpg`, brand: 'Arnaporna' },
  { src: `${CLD}/image/upload/q_auto,f_auto,w_300,h_300,c_fill/hiraya-portfolio/parantha_house/parantha_house1.jpg`, brand: 'Parantha House' },
  { src: `${CLD}/image/upload/q_auto,f_auto,w_300,h_300,c_fill/hiraya-portfolio/spicehouseunioncity/spicehouseunioncity2.jpg`, brand: 'Spice House' },
  { src: `${CLD}/image/upload/q_auto,f_auto,w_300,h_300,c_fill/hiraya-portfolio/indiacashandcarrybayare/indiacashandcarrybayarea2.jpg`, brand: 'India Cash & Carry' },
  { src: `${CLD}/image/upload/q_auto,f_auto,w_300,h_300,c_fill/hiraya-portfolio/AsianBowl/AsianBowl4.jpg`, brand: 'Asian Bowl' },
];

function InstagramGrid() {
  return (
    <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm col-span-1 md:col-span-2 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-pink-100">
          <Grid className="w-6 h-6 text-pink-600" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-900 text-lg">Instagram Grids</h3>
          <p className="text-sm text-slate-500">Curated visual identity</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 flex-1">
        {igPosts.map((post, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            className="aspect-square bg-slate-100 rounded-xl overflow-hidden relative group cursor-pointer shadow-sm"
          >
            <Image src={post.src} alt={post.brand} fill className="object-cover" sizes="150px" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
              <Heart className="w-6 h-6 text-white fill-white" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Social Reels Marquee
const reels = [
  { src: `${CLD}/video/upload/q_auto,w_300/hiraya-portfolio/AsianBowl/AsianBowl.mp4`, thumb: `${CLD}/video/upload/q_auto,f_auto,w_300,h_375,c_fill,so_2/hiraya-portfolio/AsianBowl/AsianBowl.jpg`, brand: 'Asian Bowl' },
  { src: `${CLD}/video/upload/q_auto,w_300/hiraya-portfolio/arnaporna/arnaporna.mp4`, thumb: `${CLD}/video/upload/q_auto,f_auto,w_300,h_375,c_fill,so_2/hiraya-portfolio/arnaporna/arnaporna.jpg`, brand: 'Arnaporna' },
  { src: `${CLD}/video/upload/q_auto,w_300/hiraya-portfolio/indiacashandcarrybayare/indiacashandcarrybayarea1.mp4`, thumb: `${CLD}/video/upload/q_auto,f_auto,w_300,h_375,c_fill,so_2/hiraya-portfolio/indiacashandcarrybayare/indiacashandcarrybayarea1.jpg`, brand: 'India Cash & Carry' },
  { src: `${CLD}/video/upload/q_auto,w_300/hiraya-portfolio/parantha_house/parantha_house.mp4`, thumb: `${CLD}/video/upload/q_auto,f_auto,w_300,h_375,c_fill,so_2/hiraya-portfolio/parantha_house/parantha_house.jpg`, brand: 'Parantha House' },
  { src: `${CLD}/video/upload/q_auto,w_300/hiraya-portfolio/spicehouseunioncity/spicehouseunioncity1.mp4`, thumb: `${CLD}/video/upload/q_auto,f_auto,w_300,h_375,c_fill,so_2/hiraya-portfolio/spicehouseunioncity/spicehouseunioncity1.jpg`, brand: 'Spice House' },
  { src: `${CLD}/video/upload/q_auto,w_300/hiraya-portfolio/AsianBowl/AsianBowl1.mp4`, thumb: `${CLD}/video/upload/q_auto,f_auto,w_300,h_375,c_fill,so_2/hiraya-portfolio/AsianBowl/AsianBowl1.jpg`, brand: 'Asian Bowl' },
];

function SocialReels() {
  return (
    <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm col-span-1 md:col-span-2 overflow-hidden relative">
      <div className="flex items-center gap-3 mb-8 relative z-10">
        <div className="p-3 rounded-xl bg-pink-100">
          <Heart className="w-6 h-6 text-pink-600" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-900 text-lg">Reels & TikToks</h3>
          <p className="text-sm text-slate-500">High-converting short-form video</p>
        </div>
      </div>

      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10" />

      <div className="flex gap-4 overflow-hidden py-4">
        <motion.div
          animate={{ x: [0, -1200] }}
          transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
          className="flex gap-4 shrink-0"
        >
          {[...reels, ...reels].map((reel, i) => (
            <div key={i} className="w-48 shrink-0 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group">
              <div className="p-3 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-hiraya-blue to-hiraya-yellow" />
                <div className="text-xs font-semibold text-slate-700">{reel.brand}</div>
              </div>
              <div className="aspect-[4/5] w-full relative overflow-hidden bg-slate-100">
                <video
                  src={reel.src}
                  muted
                  loop
                  playsInline
                  autoPlay
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-3 flex gap-3">
                <Heart className="w-5 h-5 text-slate-400" />
                <MessageCircle className="w-5 h-5 text-slate-400" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// Chatbot Component
function ChatbotDemo() {
  return (
    <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col h-full col-span-1 md:col-span-2">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-hiraya-blue/10">
          <MessageSquare className="w-6 h-6 text-hiraya-blue" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-900 text-lg">AI Lead Qualification</h3>
          <p className="text-sm text-slate-500">Automated 24/7 sales reps</p>
        </div>
      </div>
      <div className="flex-1 bg-slate-50 rounded-2xl p-6 flex flex-col gap-4 overflow-hidden relative border border-slate-100">
        <motion.div 
          initial={{ opacity: 0, x: -20, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="bg-white p-4 rounded-2xl rounded-tl-none text-sm text-slate-700 shadow-sm w-[85%] border border-slate-100"
        >
          Hi! I noticed you&apos;re looking to scale your B2B revenue. How are you currently generating leads?
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 1.2, type: "spring" }}
          className="bg-hiraya-blue text-white p-4 rounded-2xl rounded-tr-none text-sm shadow-sm w-[85%] self-end"
        >
          Mostly cold email, but our booking rate is under 1%.
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2 }}
          className="flex gap-1.5 items-center bg-white p-4 rounded-2xl rounded-tl-none w-fit shadow-sm border border-slate-100"
        >
          <div className="w-2 h-2 bg-hiraya-blue/60 rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-hiraya-blue/60 rounded-full animate-bounce delay-75" />
          <div className="w-2 h-2 bg-hiraya-blue/60 rounded-full animate-bounce delay-150" />
        </motion.div>
      </div>
    </div>
  );
}

export function InteractiveShowcase() {
  return (
    <section className="py-24 bg-hiraya-light border-y border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-hiraya-blue/10 text-hiraya-blue text-sm font-medium mb-6"
          >
            <BarChart className="w-4 h-4" />
            Interactive Dashboard
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center"><span className="text-slate-900">Growth Engine </span><span className="text-gradient">in Action</span></h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Explore the interactive systems and metrics that drive our clients&apos; success.
          </p>
        </div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Row 1 */}
          <RoasChart />
          <MetricCard 
            title="Visitor Increase" 
            value={340} 
            prefix="+" 
            suffix="%" 
            trend="24% MoM"
            colorClass="#34d399" // emerald-400
          />
          <MetricCard 
            title="Acquisition Cost" 
            value={42} 
            prefix="-" 
            suffix="%" 
            trend="18% MoM"
            colorClass="#a78bfa" // purple-400
            isReduction={true}
          />

          {/* Row 2 */}
          <SearchConsoleRankings />
          <InstagramGrid />

          {/* Row 3 */}
          <ChatbotDemo />
          <SocialReels />

          {/* Row 4 */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="p-8 bg-hiraya-blue rounded-3xl shadow-xl flex flex-col justify-center items-center text-center text-white relative overflow-hidden group cursor-pointer col-span-1 md:col-span-4 lg:col-span-4 mt-6"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-hiraya-blue-dark to-hiraya-blue opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full px-4 md:px-12">
              <div className="text-left mb-8 md:mb-0">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">Ready to Scale?</h3>
                <p className="text-white/90 text-base leading-relaxed max-w-xl">Deploy these exact systems, automations, and creative assets for your business today.</p>
              </div>
              <div className="flex gap-3">
                <a href="/book" className="px-8 py-4 bg-white text-hiraya-blue rounded-full font-bold hover:bg-slate-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 whitespace-nowrap inline-block">
                  Book a Call
                </a>
                <a href="#contact" className="px-8 py-4 bg-transparent text-white border-2 border-white/50 rounded-full font-bold hover:bg-white/10 transition-colors whitespace-nowrap inline-block">
                  Start Project
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
