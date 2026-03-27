'use client';

import { motion } from 'motion/react';

const MotionH1 = motion.create('h1');
const MotionH2 = motion.create('h2');
const MotionH3 = motion.create('h3');
const MotionH4 = motion.create('h4');
const MotionH5 = motion.create('h5');
const MotionH6 = motion.create('h6');
const MotionDiv = motion.create('div');
const MotionP = motion.create('p');
const MotionSpan = motion.create('span');

export function AnimatedHeading({ text, className, as = 'h2', delay = 0, forceVisible = false }: { text: string; className?: string; as?: any; delay?: number; forceVisible?: boolean }) {
  const words = text.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
    },
  };

  let MotionTag;
  switch (as) {
    case 'h1': MotionTag = MotionH1; break;
    case 'h3': MotionTag = MotionH3; break;
    case 'h4': MotionTag = MotionH4; break;
    case 'h5': MotionTag = MotionH5; break;
    case 'h6': MotionTag = MotionH6; break;
    case 'div': MotionTag = MotionDiv; break;
    case 'p': MotionTag = MotionP; break;
    case 'span': MotionTag = MotionSpan; break;
    case 'h2':
    default: MotionTag = MotionH2; break;
  }

  return (
    <MotionTag
      variants={container}
      initial="hidden"
      {...(forceVisible
        ? { animate: "visible" }
        : { whileInView: "visible", viewport: { once: true, margin: "-10%" } }
      )}
      className={`flex flex-wrap ${className}`}
    >
      {words.map((word, index) => (
        <motion.span variants={child} className="mr-[0.25em]" key={index}>
          {word}
        </motion.span>
      ))}
    </MotionTag>
  );
}
