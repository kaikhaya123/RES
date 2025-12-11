'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const features = [
    {
      id: 1,
      title: 'Vote for Contestants',
      fullDescription:
        'Cast your votes and watch the live vote counts update instantly. Vote up to 100 times daily to support your favorite contestants. Your votes directly influence who advances in each round.',
      details: [
        'Vote up to 100 times daily',
        'Real-time vote count updates',
        'Direct impact on eliminations',
        'Secure voting system',
        'Multiple voting methods',
      ],
      lottie: 'Election concept Lottie JSON animation.lottie',
      cta: 'START VOTING',
    },
    {
      id: 2,
      title: 'Watch Live Streaming',
      fullDescription:
        'Experience real-time streaming across all major platforms. Watch HD quality broadcasts with interactive features and never miss a moment of the action.',
      details: [
        'HD quality live broadcasts',
        'Multiple platform streams',
        'Interactive viewer features',
        'Replay availability',
        'Live chat engagement',
      ],
      lottie: 'Live Streaming.lottie',
      cta: 'WATCH NOW',
    },
    {
      id: 3,
      title: 'Participate in Challenges',
      fullDescription:
        'Take on exciting weekly challenges designed to test your skills. Complete tasks to earn bonus points and unlock exclusive badges and rewards.',
      details: [
        'Weekly themed challenges',
        'Earn bonus points',
        'Unlock exclusive badges',
        'Compete on leaderboards',
        'Win special rewards',
      ],
      lottie: 'Rewards Programme.lottie',
      cta: 'VIEW CHALLENGES',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    return scrollYProgress.onChange((p) => {
      const index = Math.min(features.length - 1, Math.floor(p * features.length));
      setActiveIndex(index);
    });
  }, [scrollYProgress, features.length]);

  return (
    <section ref={containerRef} className="relative bg-black">
      {/* Sticky container for scroll effect */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {features.map((feature, index) => {
          const start = index / features.length;
          const end = (index + 1) / features.length;

          const opacity = useTransform(scrollYProgress, [start - 0.1, start, end, end + 0.1], [0, 1, 1, 0]);
          const scale = useTransform(scrollYProgress, [start - 0.1, start, end, end + 0.1], [0.95, 1, 1, 0.95]);

          return (
            <motion.div
              key={feature.id}
              style={{ opacity, scale, pointerEvents: activeIndex === index ? 'auto' : 'none' }}
              className="absolute inset-0 w-full h-screen flex flex-col lg:flex-row"
            >
              {/* Left Side - Lottie */}
              <div className="hidden lg:flex lg:w-2/5 w-1/2 h-full items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                <DotLottieReact
                  src={`/lottie-files/${feature.lottie}`}
                  autoplay
                  loop
                  style={{ width: '70%', height: '70%' }}
                />
              </div>

              {/* Right Side - Content */}
              <div className="w-full lg:w-3/5 h-full flex items-center justify-center px-6 lg:px-16 py-20 overflow-y-auto lg:overflow-hidden">
                <div className="max-w-2xl flex flex-col gap-6">
                  {/* Mobile Lottie */}
                  <div className="lg:hidden w-full h-auto mb-6 flex justify-center">
                    <DotLottieReact
                      src={`/lottie-files/${feature.lottie}`}
                      autoplay
                      loop
                      style={{ width: 'clamp(6rem, 50%, 18rem)', height: 'clamp(6rem, 50%, 18rem)' }}
                    />
                  </div>

                  {/* Title */}
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tighter">
                    {feature.title}
                  </h2>

                  {/* Accent line */}
                  <div className="h-1 w-16 lg:w-24 bg-white rounded-full mb-4"></div>

                  {/* Description */}
                  <p className="text-gray-300 text-base md:text-lg">{feature.fullDescription}</p>

                  {/* Details list */}
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    {feature.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button className="px-8 py-4 bg-white text-black font-black uppercase rounded-lg hover:bg-gray-200 transition-all w-fit">
                    {feature.cta}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Slide indicator dots */}
        <div className="absolute bottom-8 left-6 md:left-14 lg:left-20 z-50 flex gap-2">
          {features.map((_, i) => (
            <motion.div
              key={i}
              animate={{ width: activeIndex === i ? 32 : 8 }}
              className={`h-2 rounded-full transition-all duration-300 ${activeIndex === i ? 'bg-white' : 'bg-gray-700'}`}
            />
          ))}
        </div>
      </div>

      {/* Spacer to allow scrolling */}
      <div style={{ height: `${features.length * 100}vh` }} />
    </section>
  );
}
