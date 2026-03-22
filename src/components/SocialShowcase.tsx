'use client';

import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useInView } from '@/hooks/useInView';

const posts = [
  { id: 1, platform: 'Instagram', type: 'Carousel', engagement: '12.4K', reach: '89K', category: 'Brand Campaign', rotation: -3, x: '5%', y: '0%', width: 280, zIndex: 3 },
  { id: 2, platform: 'Facebook', type: 'Single Image', engagement: '8.2K', reach: '45K', category: 'Product Launch', rotation: 2, x: '35%', y: '5%', width: 240, zIndex: 2 },
  { id: 3, platform: 'LinkedIn', type: 'Thought Leadership', engagement: '3.1K', reach: '28K', category: 'B2B Content', rotation: -1, x: '65%', y: '-2%', width: 260, zIndex: 4 },
  { id: 4, platform: 'Instagram', type: 'Story Ad', engagement: '22K', reach: '150K', category: 'Paid Campaign', rotation: 4, x: '10%', y: '45%', width: 220, zIndex: 1 },
  { id: 5, platform: 'TikTok', type: 'Trend Hook', engagement: '45K', reach: '320K', category: 'Viral Content', rotation: -2, x: '40%', y: '40%', width: 250, zIndex: 5 },
  { id: 6, platform: 'Instagram', type: 'Reel Cover', engagement: '18K', reach: '200K', category: 'Creative Series', rotation: 1, x: '70%', y: '35%', width: 230, zIndex: 2 },
  { id: 7, platform: 'Facebook', type: 'Ad Creative', engagement: '5.8K', reach: '67K', category: 'Performance Ad', rotation: -4, x: '25%', y: '70%', width: 270, zIndex: 3 },
  { id: 8, platform: 'LinkedIn', type: 'Infographic', engagement: '2.4K', reach: '19K', category: 'Data Visual', rotation: 2, x: '55%', y: '65%', width: 240, zIndex: 1 },
];

const gradients = [
  'linear-gradient(135deg, #0B1F33 0%, #1FA5A3 100%)',
  'linear-gradient(160deg, #0F2A44 0%, #2ED3C6 60%, #F5F7FA 100%)',
  'linear-gradient(45deg, #1FA5A3 0%, #0B1F33 100%)',
  'linear-gradient(180deg, #0B1F33 0%, #0F2A44 50%, #1FA5A3 100%)',
  'linear-gradient(120deg, #2ED3C6 0%, #0F2A44 100%)',
  'linear-gradient(200deg, #0B1F33 0%, #1FA5A3 50%, #2ED3C6 100%)',
  'linear-gradient(90deg, #0F2A44 0%, #2ED3C6 50%, #F5F7FA 100%)',
  'linear-gradient(150deg, #1FA5A3 0%, #0B1F33 60%, #0F2A44 100%)',
];

const platformColors: Record<string, string> = {
  Instagram: '#E1306C',
  Facebook: '#1877F2',
  LinkedIn: '#0A66C2',
  TikTok: '#010101',
};

const platformIcons: Record<string, React.ReactNode> = {
  Instagram: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  ),
  Facebook: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  LinkedIn: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  TikTok: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  ),
};

/* Origami bird silhouette as an SVG motif */
function BirdMotif() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.06]"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 30L60 80L20 120L60 110L80 140L100 100L120 140L140 110L180 120L140 80L100 30Z"
        fill="white"
      />
      <path
        d="M100 30L80 70L100 100L120 70L100 30Z"
        fill="white"
        opacity="0.5"
      />
    </svg>
  );
}

/* Geometric pattern overlay */
function GeometricPattern({ index }: { index: number }) {
  const patterns = [
    // Diagonal lines
    <svg key="diag" className="absolute inset-0 w-full h-full opacity-[0.07]" viewBox="0 0 100 100">
      <defs>
        <pattern id={`diag-${index}`} width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="10" stroke="white" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100" height="100" fill={`url(#diag-${index})`} />
    </svg>,
    // Dots
    <svg key="dots" className="absolute inset-0 w-full h-full opacity-[0.08]" viewBox="0 0 100 100">
      <defs>
        <pattern id={`dots-${index}`} width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="6" cy="6" r="1" fill="white" />
        </pattern>
      </defs>
      <rect width="100" height="100" fill={`url(#dots-${index})`} />
    </svg>,
    // Crosshatch
    <svg key="cross" className="absolute inset-0 w-full h-full opacity-[0.05]" viewBox="0 0 100 100">
      <defs>
        <pattern id={`cross-${index}`} width="16" height="16" patternUnits="userSpaceOnUse">
          <line x1="0" y1="8" x2="16" y2="8" stroke="white" strokeWidth="0.3" />
          <line x1="8" y1="0" x2="8" y2="16" stroke="white" strokeWidth="0.3" />
        </pattern>
      </defs>
      <rect width="100" height="100" fill={`url(#cross-${index})`} />
    </svg>,
  ];

  return patterns[index % patterns.length];
}

interface PostCardProps {
  post: typeof posts[0];
  index: number;
  isInView: boolean;
}

function PostCard({ post, index, isInView }: PostCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const aspectRatio = index % 3 === 0 ? '4/5' : '1/1';

  return (
    <motion.div
      className="absolute"
      style={{
        left: post.x,
        top: post.y,
        width: post.width,
        zIndex: isHovered ? 50 : post.zIndex,
      }}
      initial={{ opacity: 0, y: 60, rotate: post.rotation }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              rotate: post.rotation,
            }
          : { opacity: 0, y: 60, rotate: post.rotation }
      }
      transition={{
        type: 'spring',
        stiffness: 80,
        damping: 18,
        delay: index * 0.1,
      }}
      whileHover={{
        scale: 1.08,
        rotate: 0,
        y: -10,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 20,
        },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          rounded-xl overflow-hidden bg-white border border-surface-border cursor-pointer
          transition-shadow duration-300
          ${isHovered ? 'shadow-xl shadow-navy/10' : 'shadow-lg shadow-navy/5'}
        `}
      >
        {/* Image area */}
        <div
          className="relative overflow-hidden"
          style={{
            aspectRatio,
            background: gradients[index],
          }}
        >
          {/* Geometric pattern */}
          <GeometricPattern index={index} />

          {/* Bird motif on select cards */}
          {index % 2 === 0 && <BirdMotif />}

          {/* Platform icon badge */}
          <div
            className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-full text-white text-[10px] font-medium backdrop-blur-md"
            style={{ backgroundColor: `${platformColors[post.platform]}CC` }}
          >
            {platformIcons[post.platform]}
            <span>{post.platform}</span>
          </div>

          {/* Type badge bottom-right */}
          <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-white/20 backdrop-blur-sm text-white text-[10px] font-mono">
            {post.type}
          </div>

          {/* Hover overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute inset-0 flex flex-col justify-end p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <p className="text-teal font-semibold text-sm mb-1.5">
                    {post.category}
                  </p>
                  <div className="flex items-center gap-3 text-navy/70 text-xs mb-2">
                    <span className="flex items-center gap-1">
                      {/* Heart icon */}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                      {post.engagement}
                    </span>
                    <span className="flex items-center gap-1">
                      {/* Eye icon */}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      {post.reach}
                    </span>
                  </div>
                  <p className="text-teal text-xs font-medium hover:underline">
                    View Case &rarr;
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content strip */}
        <div className="px-3 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: platformColors[post.platform] }}
            />
            <span className="text-navy/70 text-xs font-medium">
              {post.platform}
            </span>
          </div>
          <span className="font-mono text-xs text-navy/40">{post.type}</span>
        </div>
      </div>
    </motion.div>
  );
}

/* Mobile grid card (simplified) */
function MobileCard({ post, index, isInView }: PostCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const aspectRatio = index % 3 === 0 ? '4/5' : '1/1';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 20,
        delay: index * 0.08,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <div className="rounded-xl overflow-hidden bg-white border border-surface-border shadow-md">
        {/* Image area */}
        <div
          className="relative overflow-hidden"
          style={{
            aspectRatio,
            background: gradients[index],
          }}
        >
          <GeometricPattern index={index} />
          {index % 2 === 0 && <BirdMotif />}

          <div
            className="absolute top-2 left-2 flex items-center gap-1 px-1.5 py-0.5 rounded-full text-white text-[9px] font-medium backdrop-blur-md"
            style={{ backgroundColor: `${platformColors[post.platform]}CC` }}
          >
            {platformIcons[post.platform]}
            <span>{post.platform}</span>
          </div>

          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute inset-0 flex flex-col justify-end p-3"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-2.5 shadow-lg">
                  <p className="text-teal font-semibold text-xs mb-1">
                    {post.category}
                  </p>
                  <div className="flex items-center gap-2 text-navy/70 text-[10px] mb-1.5">
                    <span className="flex items-center gap-0.5">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                      {post.engagement}
                    </span>
                    <span className="flex items-center gap-0.5">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      {post.reach}
                    </span>
                  </div>
                  <p className="text-teal text-[10px] font-medium">
                    View Case &rarr;
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="px-2.5 py-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: platformColors[post.platform] }}
            />
            <span className="text-navy/70 text-[10px] font-medium">
              {post.platform}
            </span>
          </div>
          <span className="font-mono text-[10px] text-navy/40">{post.type}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function SocialShowcase() {
  const { ref, isInView } = useInView(0.15);

  const tickerContent =
    'Instagram \u2022 847K reach \u2022 Facebook \u2022 340K impressions \u2022 LinkedIn \u2022 12.4K engagement \u2022 TikTok \u2022 320K views';

  return (
    <section id="social-creatives" className="section-light section-padding">
      <div className="container-wide" ref={ref}>
        {/* Header */}
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="label-tag mb-4 inline-block">
            Social Media &amp; Creatives
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-navy mt-4 mb-4 tracking-tight">
            Scroll-Stopping Creative
          </h2>
          <p className="text-navy/50 text-lg md:text-xl max-w-xl">
            Designed for engagement. Engineered for conversion.
          </p>
        </motion.div>

        {/* Desktop floating layout */}
        <div className="hidden md:block relative" style={{ minHeight: 700 }}>
          {posts.map((post, index) => (
            <PostCard
              key={post.id}
              post={post}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Mobile 2-column grid */}
        <div className="md:hidden grid grid-cols-2 gap-3">
          {posts.map((post, index) => (
            <MobileCard
              key={post.id}
              post={post}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Ticker tape */}
        <div className="mt-16 md:mt-24 overflow-hidden">
          <div className="flex whitespace-nowrap animate-ticker">
            {[0, 1].map((i) => (
              <span
                key={i}
                className="text-navy/20 font-mono text-sm flex items-center gap-3 mr-3"
              >
                {tickerContent.split('\u2022').map((segment, j) => (
                  <span key={j} className="flex items-center gap-3">
                    {j > 0 && (
                      <span className="w-1.5 h-1.5 rounded-full bg-teal/40 inline-block flex-shrink-0" />
                    )}
                    <span>{segment.trim()}</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
