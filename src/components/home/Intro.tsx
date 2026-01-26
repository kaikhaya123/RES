'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { FiArrowDown } from 'react-icons/fi';

type Slide = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
};

const slides: Slide[] = [
  {
    id: 1,
    title: 'Where Students Compete',
    subtitle: 'A national digital stage built for talent and growth.',
    image: '/Images/bottom-view-four-schoolkids-min.jpg',
  },
  {
    id: 2,
    title: 'Real Challenges',
    subtitle: 'Leadership, skill, pressure, and performance.',
    image: '/Images/horizontal-image-interracial-couple-pulling-tricks-each-other-posing-isolated-against-blank-orange-wall-looking-suspicious-planning-trick-prank-rubbing-hands-min.jpg',
  },
  {
    id: 3,
    title: 'Public Impact',
    subtitle: 'Votes, visibility, and real world opportunity.',
    image: '/Images/authentic-small-youthful-marketing-agency-min.jpg',
  },
];

export default function IntroStorySections() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const isMobileDevice =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    const setMobileAttrs = () => {
      video.muted = true;
      video.playsInline = true;

      // iOS Safari + some Android webviews
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', 'true');
      video.setAttribute('x5-playsinline', 'true');
    };

    const tryPlay = async () => {
      try {
        setMobileAttrs();

        // Ensure video loads before trying to play
        if (video.readyState < 2) {
          await new Promise<void>((resolve) => {
            const onReady = () => resolve();
            video.addEventListener('loadeddata', onReady, { once: true });
            video.load();
          });
        }

        await video.play();

        setIsPlaying(true);
        setShowPlayButton(false);
        return true;
      } catch (error) {
        setIsPlaying(false);

        // Only show button on mobile
        if (isMobileDevice) setShowPlayButton(true);

        return false;
      }
    };

    // Try autoplay once
    tryPlay();

    // Mobile fallback: only remove listeners after successful play
    const onUserInteract = async () => {
      const ok = await tryPlay();
      if (ok) {
        document.removeEventListener('click', onUserInteract);
        document.removeEventListener('touchstart', onUserInteract);
      }
    };

    document.addEventListener('click', onUserInteract, { passive: true });
    document.addEventListener('touchstart', onUserInteract, { passive: true });

    return () => {
      document.removeEventListener('click', onUserInteract);
      document.removeEventListener('touchstart', onUserInteract);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative bg-black text-white">
      {/* HERO VIDEO */}
      <section className="relative min-h-screen overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            muted
            playsInline
            autoPlay
            loop
            preload="auto"
            className={`w-full h-full object-cover transition-transform duration-1000 ${
              isPlaying ? 'scale-[1.08]' : 'scale-100'
            }`}
            aria-hidden="true"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onError={(e) => {
              console.error('Video error:', e.currentTarget.error);
              setShowPlayButton(true);
            }}
          >
            <source
              src="/Videos/7683446-hd_1080_1920_30fps.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/40" />
          <div className="absolute inset-0 bg-black/30" />

          {showPlayButton && (
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <button
                onClick={async () => {
                  const video = videoRef.current;
                  if (!video) return;

                  try {
                    video.muted = true;
                    video.playsInline = true;
                    video.setAttribute('playsinline', '');
                    video.setAttribute('webkit-playsinline', 'true');
                    video.setAttribute('x5-playsinline', 'true');

                    await video.play();

                    setIsPlaying(true);
                    setShowPlayButton(false);
                  } catch (error) {
                    console.error('Manual play failed:', error);
                  }
                }}
                className="bg-black/60 p-4 rounded-full text-white hover:bg-black/80 transition"
                aria-label="Play video"
              >
                ▶
              </button>
            </div>
          )}
        </div>

        {/* HERO CONTENT */}
        <div className="relative z-10 max-w-2xl px-6 lg:px-0 ml-6 lg:ml-20 space-y-6">
          <span className="text-xs tracking-[0.4em] uppercase text-white/80">
            National Student Reality Platform
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
            Where Students
            <br />
            Compete.
            <br />
            Grow. Rise.
          </h1>

          <p className="text-white/80 max-w-md text-sm lg:text-base">
            A national digital stage unlocking leadership, opportunity, and
            measurable impact for South African students.
          </p>

          <motion.a
            href="#story"
            whileHover={{ x: 8 }}
            className="inline-flex items-center gap-4 text-sm font-bold tracking-wide"
          >
            Explore the Story
            <span className="w-10 h-px bg-white" />
          </motion.a>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center text-white/50"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        >
          <span className="text-[10px] tracking-[0.35em] uppercase">Scroll</span>
          <FiArrowDown />
        </motion.div>
      </section>

      {/* STORY SECTIONS */}
      <section id="story" className="relative h-[300vh]">
        {slides.map((slide, index) => {
          const start = index / slides.length;
          const end = (index + 1) / slides.length;

          const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
          const scale = useTransform(scrollYProgress, [start, end], [1.08, 1]);

          return (
            <motion.section
              key={slide.id}
              style={{ opacity }}
              className="sticky top-0 h-screen w-screen flex items-end justify-center overflow-hidden"
            >
              <motion.div style={{ scale }} className="absolute inset-0">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/50" />
              </motion.div>

              <div className="relative z-10 w-full px-6 pb-12 text-center space-y-2">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black">
                  {slide.title}
                </h2>
                <p className="text-xs sm:text-sm text-white/80">{slide.subtitle}</p>
              </div>
            </motion.section>
          );
        })}
      </section>
    </section>
  );
}
