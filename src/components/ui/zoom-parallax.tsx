'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface Image {
  src: string;
  alt?: string;
}

interface ZoomParallaxProps {
  /** Array of images to be displayed in the parallax effect max 7 images */
  images: Image[];
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  // mobile detection
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 767px)');
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Desktop scales (strong effect)
  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);
  const desktopScales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

  // Mobile scales (subtle)
  const mScale1 = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const mScale2 = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const mScale3 = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const mobileScales = [mScale1, mScale2, mScale3, mScale2, mScale3, mScale2, mScale1];

  // Mobile layout: stacked images with subtle scale on scroll
  if (isMobile) {
    return (
      <div ref={container} className="bg-black text-white">
        <div className="flex flex-col gap-4 py-6">
          {images.slice(0, 7).map(({ src, alt }, idx) => {
            const scale = mobileScales[idx % mobileScales.length];
            return (
              <motion.div
                key={idx}
                style={{ scale }}
                initial={{ opacity: 0.9 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                className="mx-4 overflow-hidden rounded-lg"
              >
                <div className="relative w-full h-[40vh] bg-black">
                  <img src={src || '/placeholder.svg'} alt={alt || `Parallax image ${idx + 1}`} className="w-full h-full object-cover" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  // Desktop layout: grid filling the sticky viewport
  return (
    <div ref={container} className="relative h-[300vh] bg-black w-full">
      <div className="sticky top-0 h-screen overflow-hidden bg-black w-full">
        {/* Grid filling the sticky viewport (up to 9 cells) */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-2">
          {images.slice(0, 9).map(({ src, alt }, index) => {
            const scale = desktopScales[index % desktopScales.length];

            return (
              <motion.div key={index} style={{ scale }} className="relative overflow-hidden">
                <img
                  src={src || '/placeholder.svg'}
                  alt={alt || `Parallax image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
