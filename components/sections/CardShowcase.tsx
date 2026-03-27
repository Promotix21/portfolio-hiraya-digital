'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { AnimatedHeading } from '@/components/ui/AnimatedHeading';

const CLD = 'https://res.cloudinary.com/dqfhsj52r';

const creatives = [
  { id: 1, src: `${CLD}/image/upload/q_auto,f_auto,w_400/hiraya-portfolio/AsianBowl/AsianBowl.jpg`, brand: 'Asian Bowl' },
  { id: 2, src: `${CLD}/image/upload/q_auto,f_auto,w_400/hiraya-portfolio/arnaporna/arnaporna1.jpg`, brand: 'Arnaporna' },
  { id: 3, src: `${CLD}/image/upload/q_auto,f_auto,w_400/hiraya-portfolio/indiacashandcarrybayare/indiacashandcarrybayarea1.jpg`, brand: 'India Cash & Carry' },
  { id: 4, src: `${CLD}/image/upload/q_auto,f_auto,w_400/hiraya-portfolio/parantha_house/parantha_house.jpg`, brand: 'Parantha House' },
  { id: 5, src: `${CLD}/image/upload/q_auto,f_auto,w_400/hiraya-portfolio/spicehouseunioncity/spicehouseunioncity1.jpg`, brand: 'Spice House' },
  { id: 6, src: `${CLD}/image/upload/q_auto,f_auto,w_400/hiraya-portfolio/AsianBowl/AsianBowl1.jpg`, brand: 'Asian Bowl' },
  { id: 7, src: `${CLD}/image/upload/q_auto,f_auto,w_400/hiraya-portfolio/arnaporna/arnaporna3.jpg`, brand: 'Arnaporna' },
  { id: 8, src: `${CLD}/image/upload/q_auto,f_auto,w_400/hiraya-portfolio/indiacashandcarrybayare/indiacashandcarrybayarea3.jpg`, brand: 'India Cash & Carry' },
  { id: 9, src: `${CLD}/image/upload/q_auto,f_auto,w_400/hiraya-portfolio/parantha_house/parantha_house2.jpg`, brand: 'Parantha House' },
  { id: 10, src: `${CLD}/image/upload/q_auto,f_auto,w_400/hiraya-portfolio/spicehouseunioncity/spicehouseunioncity3.jpg`, brand: 'Spice House' },
  { id: 11, src: `${CLD}/image/upload/q_auto,f_auto,w_400/hiraya-portfolio/AsianBowl/AsianBowl3.jpg`, brand: 'Asian Bowl' },
  { id: 12, src: `${CLD}/image/upload/q_auto,f_auto,w_400/hiraya-portfolio/arnaporna/arnaporna4.jpg`, brand: 'Arnaporna' },
];

// Split into 3 rows of 4 for the marquee
const row1 = creatives.slice(0, 4);
const row2 = creatives.slice(4, 8);
const row3 = creatives.slice(8, 12);

function MarqueeRow({ items, direction = 'left', duration = 30 }: { items: typeof creatives; direction?: 'left' | 'right'; duration?: number }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <div
        className={direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}
        style={{ animationDuration: `${duration}s`, display: 'flex', gap: '1rem', width: 'max-content' }}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            className="w-56 h-56 md:w-64 md:h-64 rounded-2xl border border-slate-200 relative overflow-hidden flex-shrink-0 group"
          >
            <Image
              src={item.src}
              alt={item.brand}
              fill
              className="object-cover"
              sizes="256px"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-white text-sm font-semibold drop-shadow-lg">{item.brand}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CardShowcase() {
  return (
    <section className="py-24 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
        <AnimatedHeading
          text="High-Performance Ad Creatives"
          className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 tracking-tight"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-slate-600 max-w-2xl text-lg"
        >
          We treat design as a measurable variable. See our top-performing creative assets in action.
        </motion.p>
      </div>

      <div className="flex flex-col gap-4">
        <MarqueeRow items={row1} direction="left" duration={35} />
        <MarqueeRow items={row2} direction="right" duration={40} />
        <MarqueeRow items={row3} direction="left" duration={32} />
      </div>
    </section>
  );
}
