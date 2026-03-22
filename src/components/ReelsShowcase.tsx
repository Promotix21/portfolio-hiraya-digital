'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useInView } from '@/hooks/useInView';

const reels = [
  { id: 1, title: 'Brand Story Reel', platform: 'Instagram', views: '2.4M', likes: '189K', type: 'Reel', duration: '0:30', gradient: 'from-teal to-navy-light' },
  { id: 2, title: 'Product Launch GIF', platform: 'Email/Web', views: '450K', likes: '—', type: 'GIF', duration: '0:03', gradient: 'from-navy-light to-teal-light' },
  { id: 3, title: 'Trend Hook Video', platform: 'TikTok', views: '5.1M', likes: '342K', type: 'Reel', duration: '0:15', gradient: 'from-teal-light to-navy' },
  { id: 4, title: 'Animated Infographic', platform: 'LinkedIn', views: '890K', likes: '45K', type: 'GIF', duration: '0:08', gradient: 'from-navy to-teal' },
  { id: 5, title: 'Story Sequence', platform: 'Instagram', views: '1.8M', likes: '95K', type: 'Reel', duration: '0:45', gradient: 'from-teal to-teal-light' },
  { id: 6, title: 'Ad Creative Motion', platform: 'Meta Ads', views: '3.2M', likes: '210K', type: 'Reel', duration: '0:20', gradient: 'from-navy-light to-navy' },
];

const stats = [
  { label: 'Total Views', value: '14.7M+' },
  { label: 'Engagement Rate', value: '8.4%' },
  { label: 'Content Pieces', value: '200+' },
  { label: 'Platforms', value: '5+' },
];

/* ─── Film Strip Decoration ─── */
function FilmStrip({ position }: { position: 'top' | 'bottom' }) {
  return (
    <div
      className={`absolute left-0 right-0 h-8 z-10 pointer-events-none ${
        position === 'top' ? 'top-0' : 'bottom-0'
      }`}
    >
      {/* Main strip line */}
      <div className="absolute inset-0 bg-white/[0.03] border-y border-white/[0.05]" />
      {/* Sprocket holes */}
      <div className="absolute inset-0 flex items-center justify-between px-2">
        {Array.from({ length: 32 }).map((_, i) => (
          <div
            key={i}
            className="w-3 h-4 rounded-sm bg-white/[0.05] border border-white/[0.08] flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Play Button with Pulse ─── */
function PlayButton({ size = 'large' }: { size?: 'large' | 'small' }) {
  const isLarge = size === 'large';
  return (
    <div className="relative flex items-center justify-center">
      {/* Pulse ring */}
      <motion.div
        className={`absolute rounded-full border-2 border-white/30 ${
          isLarge ? 'w-20 h-20' : 'w-8 h-8'
        }`}
        animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
      />
      {/* Second pulse ring (offset) */}
      {isLarge && (
        <motion.div
          className="absolute w-20 h-20 rounded-full border border-white/20"
          animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
        />
      )}
      {/* Button circle */}
      <div
        className={`flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 ${
          isLarge ? 'w-16 h-16' : 'w-7 h-7'
        }`}
      >
        <svg
          width={isLarge ? 22 : 10}
          height={isLarge ? 26 : 12}
          viewBox="0 0 12 14"
          fill="currentColor"
          className={`text-white ${isLarge ? 'ml-1' : 'ml-0.5'}`}
        >
          <path d="M0 0l12 7-12 7z" />
        </svg>
      </div>
    </div>
  );
}

/* ─── Social Icons (Instagram-style side bar) ─── */
function ReelSideActions({ likes, views }: { likes: string; views: string }) {
  return (
    <div className="flex flex-col items-center gap-5">
      {/* Heart */}
      <div className="flex flex-col items-center gap-1">
        <motion.div
          whileHover={{ scale: 1.2 }}
          className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center cursor-pointer"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </motion.div>
        <span className="text-white/80 text-[10px] font-mono">{likes}</span>
      </div>
      {/* Comment */}
      <div className="flex flex-col items-center gap-1">
        <motion.div
          whileHover={{ scale: 1.2 }}
          className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center cursor-pointer"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </motion.div>
        <span className="text-white/80 text-[10px] font-mono">{views}</span>
      </div>
      {/* Share */}
      <div className="flex flex-col items-center gap-1">
        <motion.div
          whileHover={{ scale: 1.2 }}
          className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center cursor-pointer"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function ReelsShowcase() {
  const { ref, isInView } = useInView(0.15);
  const [selectedReel, setSelectedReel] = useState(0);
  const stripRef = useRef<HTMLDivElement>(null);

  const featured = reels[selectedReel];

  return (
    <section
      id="reels"
      ref={ref}
      className="section-dark section-padding relative overflow-hidden"
    >
      {/* ── Film grain overlay ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      />

      {/* ── Film strip decorations ── */}
      <FilmStrip position="top" />
      <FilmStrip position="bottom" />

      <div className="container-wide relative z-10">
        {/* ── Header ── */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="label-tag-dark mb-4 inline-block">Reels &amp; Motion</span>
          <h2 className="text-white text-4xl md:text-5xl font-bold mt-4 mb-4">
            Motion That Moves
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-lg">
            Reels, GIFs, and motion content engineered for maximum engagement.
          </p>
        </motion.div>

        {/* ── Main Showcase Gallery ── */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-16">
          {/* Featured Reel — Phone Mockup */}
          <motion.div
            className="flex-1 lg:max-w-[60%] flex justify-center"
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', stiffness: 60, damping: 18, delay: 0.2 }}
          >
            <div className="flex flex-col items-center">
              {/* Phone frame */}
              <div className="relative w-[280px] sm:w-[300px] md:w-[320px] rounded-[2.5rem] border-4 border-white/10 bg-black/40 p-2 shadow-2xl shadow-black/40">
                {/* Notch */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-white/10 rounded-full z-20" />

                {/* Screen area */}
                <div className="relative w-full aspect-[9/16] rounded-[2rem] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={featured.id}
                      className={`absolute inset-0 bg-gradient-to-br ${featured.gradient}`}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                    >
                      {/* Gradient shimmer overlay */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      />

                      {/* Center play button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <PlayButton size="large" />
                      </div>

                      {/* Duration badge */}
                      <div className="absolute bottom-4 right-4 z-10">
                        <span className="font-mono text-white/80 bg-black/40 px-2 py-0.5 rounded text-sm">
                          {featured.duration}
                        </span>
                      </div>

                      {/* Type badge */}
                      <div className="absolute top-8 left-4 z-10">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-white/60 bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/10">
                          {featured.type}
                        </span>
                      </div>

                      {/* Right side social icons */}
                      <div className="absolute right-3 bottom-20 z-10">
                        <ReelSideActions likes={featured.likes} views={featured.views} />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Below phone: title + badges */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={featured.id}
                  className="mt-6 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-white text-xl font-bold mb-2">{featured.title}</h3>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xs font-mono text-teal-light bg-teal/10 border border-teal/20 px-2.5 py-0.5 rounded-full">
                      {featured.platform}
                    </span>
                    <span className="text-xs font-mono text-white/50 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full">
                      {featured.type}
                    </span>
                    <span className="text-xs font-mono text-white/40">
                      {featured.views} views
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Reel Selector Strip */}
          <motion.div
            className="lg:flex-1 lg:max-w-[40%]"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ type: 'spring', stiffness: 60, damping: 18, delay: 0.4 }}
          >
            <div
              ref={stripRef}
              className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-x-visible lg:overflow-y-auto pb-4 lg:pb-0 lg:max-h-[600px] scrollbar-thin"
            >
              {reels.map((reel, index) => (
                <motion.button
                  key={reel.id}
                  onClick={() => setSelectedReel(index)}
                  className={`flex-shrink-0 group cursor-pointer text-left transition-all duration-300 ${
                    selectedReel === index
                      ? 'scale-[1.02]'
                      : ''
                  }`}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4">
                    {/* Thumbnail phone mockup */}
                    <div
                      className={`relative w-[72px] h-[128px] rounded-2xl border-2 overflow-hidden flex-shrink-0 transition-all duration-300 ${
                        selectedReel === index
                          ? 'border-teal shadow-lg shadow-teal/20'
                          : 'border-white/10 group-hover:border-white/20'
                      }`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${reel.gradient}`} />
                      {/* Small play icon centered */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <PlayButton size="small" />
                      </div>
                      {/* Duration */}
                      <div className="absolute bottom-1.5 right-1.5">
                        <span className="font-mono text-[8px] text-white/70 bg-black/50 px-1 py-0.5 rounded">
                          {reel.duration}
                        </span>
                      </div>
                    </div>

                    {/* Text info */}
                    <div className="hidden lg:block min-w-0">
                      <p
                        className={`text-sm font-semibold truncate transition-colors duration-300 ${
                          selectedReel === index ? 'text-white' : 'text-white/60 group-hover:text-white/80'
                        }`}
                      >
                        {reel.title}
                      </p>
                      <p className="text-xs font-mono text-white/30 mt-0.5">{reel.platform}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-mono text-white/25">{reel.views} views</span>
                        {reel.likes !== '—' && (
                          <span className="text-[10px] font-mono text-white/25">{reel.likes} likes</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Mobile-only title below thumbnail */}
                  <div className="lg:hidden mt-2 w-[72px]">
                    <p
                      className={`text-[10px] font-semibold truncate ${
                        selectedReel === index ? 'text-white' : 'text-white/50'
                      }`}
                    >
                      {reel.title}
                    </p>
                    <p className="text-[9px] font-mono text-white/30 truncate">{reel.platform}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Stats Bar ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass-card-dark p-6 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            >
              <p className="text-white/40 font-mono text-xs uppercase tracking-wider mb-2">
                {stat.label}
              </p>
              <p className="text-gradient text-2xl font-bold">{stat.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
