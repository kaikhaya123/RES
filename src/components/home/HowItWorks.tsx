'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function HowItWorks() {
  const steps = [
    {
      title: 'Student Registration',
      subtitle: 'EDUCATIONAL OPPORTUNITIES',
      description: 'Students register for the competition to showcase their talents and compete for educational scholarships and prizes.',
      image: '/Images/sergey-zolkin-_UeY8aTI6d0-unsplash.jpg',
      link: '/auth/register',
      linkText: 'OUR PLATFORM',
      color: 'from-slate-900 to-gray-800'
    },
    {
      title: 'Voting System',
      subtitle: 'PUBLIC ENGAGEMENT',
      description: 'Public votes for their favorite contestants up to 100 times daily. Vote counts determine weekly eliminations and final winners.',
      image: '/Images/download (10) (1).jpg',
      link: '/vote',
      linkText: 'VOTE NOW',
      color: 'from-zinc-900 to-stone-800'
    },
    {
      title: 'Live Streaming',
      subtitle: 'REAL-TIME VIEWING',
      description: 'Live streaming across multiple social platforms allows viewers to follow contestant journeys and daily activities in real-time.',
      image: '/Images/youtube-stream.png',
      link: '/stream',
      linkText: 'WATCH LIVE',
      color: 'from-neutral-900 to-gray-800'
    },
  ];

  return (
    <section className="bg-white py-32 lg:py-40 relative overflow-hidden">
      {/* Animated background grid */}
      <motion.div 
        className="absolute inset-0 opacity-[0.03]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.03 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'linear-gradient(black 1px, transparent 1px), linear-gradient(90deg, black 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </motion.div>

      <div className="container mx-auto px-6 lg:px-12 max-w-[1400px] relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-32 text-center relative"
        >
          {/* Animated decorative lines */}
          <div className="flex items-center justify-center gap-8 mb-12">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-[2px] w-24 bg-black origin-right"
            />
            <motion.span
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
              className="w-3 h-3 bg-black rotate-45"
            />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-[2px] w-24 bg-black origin-left"
            />
          </div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-6xl lg:text-7xl font-black text-black mb-8 tracking-tighter"
          >
            How It Works
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg text-gray-600 max-w-xl mx-auto font-light tracking-wide"
          >
            Three seamless steps to transform student potential into achievement
          </motion.p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {steps.map((step, index) => (
            <StepCard key={index} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, index }: { step: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.9, 
        delay: index * 0.25,
        ease: [0.22, 1, 0.36, 1]
      }}
      style={{ perspective: 1000 }}
      className="group relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Mega Step Number Background */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: index * 0.25 + 0.3, type: "spring" }}
        className="absolute -top-16 -left-8 text-[200px] font-black text-transparent leading-none select-none pointer-events-none"
        style={{
          WebkitTextStroke: '2px rgba(0, 0, 0, 0.03)'
        }}
      >
        {index + 1}
      </motion.div>

      <motion.div
        style={{ 
          rotateX: isHovered ? rotateX : 0, 
          rotateY: isHovered ? rotateY : 0,
          transformStyle: "preserve-3d"
        }}
        className="relative"
      >
        {/* Image Container */}
        <div className="relative mb-10 overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full aspect-[3/4] bg-gradient-to-br from-black to-gray-800"
          >
            <Image
              src={step.image}
              alt={step.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-all duration-700"
              style={{ transform: isHovered ? 'translateZ(20px)' : 'translateZ(0)' }}
              priority={index === 0}
            />
            
            {/* Animated border */}
            <motion.div 
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <svg className="absolute inset-0 w-full h-full" style={{ strokeDasharray: '200%', strokeDashoffset: '0' }}>
                <motion.rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  fill="none"
                  stroke="black"
                  strokeWidth="4"
                  initial={{ pathLength: 0 }}
                  whileHover={{ pathLength: 1 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
              </svg>
            </motion.div>

            {/* Floating badge with pulse */}
            <motion.div
              initial={{ y: 30, opacity: 0, scale: 0 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.25 + 0.5,
                type: "spring",
                stiffness: 200
              }}
              animate={isHovered ? { scale: [1, 1.05, 1] } : { scale: 1 }}
              className="absolute bottom-6 left-6 w-16 h-16 bg-black text-white flex items-center justify-center text-2xl font-black shadow-2xl z-10"
              style={{ 
                transform: isHovered ? 'translateZ(40px)' : 'translateZ(0)',
              }}
            >
              {index + 1}
            </motion.div>
          </motion.div>
        </div>

        {/* Content */}
        <motion.div 
          className="relative"
          style={{ transform: isHovered ? 'translateZ(30px)' : 'translateZ(0)' }}
        >
          {/* Animated subtitle line */}
          <motion.div className="flex items-center gap-3 mb-5">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.25 + 0.6 }}
              className="h-[2px] w-8 bg-black origin-left"
            />
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.25 + 0.7 }}
              className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]"
            >
              {step.subtitle}
            </motion.p>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.25 + 0.8 }}
            className="text-4xl font-black text-black mb-6 tracking-tighter leading-[1.1]"
          >
            {step.title}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.25 + 0.9 }}
            className="text-gray-700 leading-relaxed mb-10 font-light text-[15px]"
          >
            {step.description}
          </motion.p>

          {/* Advanced button */}
          <Link
            href={step.link}
            className="group/btn relative inline-flex items-center gap-4 text-black font-black text-xs uppercase tracking-[0.15em] overflow-hidden"
          >
            <span className="relative z-10 transition-transform group-hover/btn:translate-x-2 duration-300">
              {step.linkText}
            </span>
            
            <motion.div 
              className="flex items-center gap-2"
              animate={{ x: isHovered ? [0, 5, 0] : 0 }}
              transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0 }}
            >
              <motion.span 
                className="h-[2px] bg-black"
                initial={{ width: 32 }}
                whileHover={{ width: 48 }}
                transition={{ duration: 0.3 }}
              />
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="square" strokeLinejoin="miter" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.div>

            {/* Animated underline */}
            <motion.div
              className="absolute bottom-0 left-0 h-[2px] bg-black"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.4 }}
              style={{ originX: 0 }}
            />
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
