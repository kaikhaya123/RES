'use client';

import { motion } from 'framer-motion';

interface StaggeredTextProps {
  text: string;
  className?: string;
  staggerDirection?: 'top' | 'bottom';
  staggerDelay?: number;
  distance?: number;
  duration?: number;
}

export function StaggeredText({
  text,
  className = 'text-white text-4xl md:text-6xl font-black leading-tight',
  staggerDirection = 'top',
  staggerDelay = 0.05,
  distance = 20,
  duration = 0.5,
}: StaggeredTextProps) {
  const letters = text.split('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: staggerDirection === 'top' ? -distance : distance,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={letterVariants}>
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
}
