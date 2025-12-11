import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

function StepCard({ step, index }: { step: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  // Scroll-linked animation
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Parallax image movement
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-30px", "30px"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  // Sticky big number
  const stickyOpacity = useTransform(scrollYProgress, [0.2, 0.7], [0, 0.06]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.9,
        delay: index * 0.25,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="group relative"
    >
      {/* Sticky big number behind the card */}
      <motion.div
        style={{
          opacity: stickyOpacity
        }}
        className="sticky top-40 text-[210px] font-black text-transparent leading-none select-none pointer-events-none z-0"
      >
        <span
          style={{
            WebkitTextStroke: "3px rgba(255,255,255,0.05)"
          }}
        >
          {index + 1}
        </span>
      </motion.div>

      {/* Main card content */}
      <motion.div
        className="relative z-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Image container */}
        <div className="relative mb-10 overflow-hidden rounded-xl">
          <motion.div className="relative w-full aspect-[3/4] bg-gradient-to-br from-black to-gray-800">
            <motion.div
              style={{
                y: parallaxY,
                scale: imageScale
              }}
              className="absolute inset-0"
            >
              <Image
                src={step.image}
                alt={step.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                quality={90}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Content section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.25 + 0.4 }}
        >
          {/* Subtitle */}
          <div className="flex items-center gap-3 mb-5">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="h-[2px] w-8 bg-white origin-left"
            />
            <p className="text-[10px] font-black text-white uppercase tracking-[0.3em]">
              {step.subtitle}
            </p>
          </div>

          {/* Title */}
          <h3 className="text-4xl font-black text-white mb-6 tracking-tighter leading-[1.1]">
            {step.title}
          </h3>

          {/* Description */}
          <p className="text-gray-300 leading-relaxed mb-10 font-light text-[15px]">
            {step.description}
          </p>

          {/* Button */}
          <Link
            href={step.link}
            className="group/btn relative inline-flex items-center gap-4 text-white font-black text-xs uppercase tracking-[0.15em] overflow-hidden"
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
                className="h-[2px] bg-white"
                initial={{ width: 32 }}
                whileHover={{ width: 48 }}
                transition={{ duration: 0.3 }}
              />
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
  }

export default function HowItWorks() {
  const steps = [
    {
      subtitle: 'Step 1',
      title: 'Create an Account',
      description: 'Sign up with your student account to start voting and participating in challenges.',
      image: '/Images/KSENIIA FAST.png',
      link: '/auth/register',
      linkText: 'Register',
    },
    {
      subtitle: 'Step 2',
      title: 'Explore & Engage',
      description: 'Watch live streams, vote for contestants, and take part in weekly challenges.',
      image: '/Images/download (18).png',
      link: '/challenges',
      linkText: 'View Challenges',
    },
    {
      subtitle: 'Step 3',
      title: 'Win Rewards',
      description: 'Earn points and redeem exclusive prizes while supporting emerging talent.',
      image: '/Images/Download UEFA Champion Celebration Design for free.png',
      link: '/rewards',
      linkText: 'Claim Rewards',
    },
  ];

  return (
    <section className="py-20 bg-dark-bg-soft">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <p className="section-eyebrow text-white">How It Works</p>
          <h2 className="text-3xl lg:text-4xl section-title text-white">Get Started with R.E.S.</h2>
          <p className="section-subtitle text-gray-300 max-w-2xl mx-auto">Follow a few simple steps to engage, vote, and win prizes.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <StepCard key={i} step={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
