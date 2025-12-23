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
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure muted & playsInline for autoplay policies and attempt to play immediately
    try {
      video.muted = true;
      video.setAttribute('playsinline', '');
      // autoplay attribute is set on the element; attempt programmatic play too
      video.play().catch(() => {});
    } catch (e) {}

    // If autoplay fails (video remains paused), show a mobile play button
    const checkAutoplay = () => {
      try {
        if (video.paused) {
          setShowPlayButton(true);
          setIsPlaying(false);
        } else {
          setShowPlayButton(false);
          setIsPlaying(true);
        }
      } catch (e) {
        setShowPlayButton(true);
      }
    };

    const onPlay = () => {
      setIsPlaying(true);
      setShowPlayButton(false);
    };
    const onPause = () => {
      setIsPlaying(false);
      setShowPlayButton(true);
    };

    // Run a check after a small delay to allow autoplay attempt to resolve
    const t = window.setTimeout(checkAutoplay, 250);

    video.addEventListener('play', onPlay);
    video.addEventListener('playing', onPlay);
    video.addEventListener('pause', onPause);

    return () => {
      clearTimeout(t);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('playing', onPlay);
      video.removeEventListener('pause', onPause);
    };
  }, []);


  return (
    <section ref={containerRef} className="relative bg-black text-white">

      {/* INTRO HERO */}
      <section className="relative min-h-screen overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            autoPlay
            preload="auto"
            poster="/Images/vertical-shot-curly-haired-millennial-girl-sits-crossed-legs-uses-mobile-phone-laptop-computer-connected-wireless-min-opt.jpg"
            className="w-full h-full object-cover scale-[1.08]"
            aria-hidden="true"
          >
            <source src="/Videos/14595546-hd_1920_1080_60fps.webm" type="video/webm" />
            <source src="/Videos/14595546-hd_1920_1080_60fps.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/40" />
          <div className="absolute inset-0 bg-black/30" />

          {/* Mobile-only play button overlay when autoplay is blocked */}
          {showPlayButton && (
            <div className="absolute inset-0 flex items-center justify-center sm:hidden z-20">
              <button
                type="button"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
                className="bg-black/40 text-white rounded-full p-4 shadow-lg hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-white"
                onClick={async () => {
                  const video = videoRef.current;
                  if (!video) return;
                  try {
                    await video.play();
                    setIsPlaying(true);
                    setShowPlayButton(false);
                  } catch (e) {
                    // If still fails, keep showing the button
                    setShowPlayButton(true);
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  {isPlaying ? (
                    <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                  ) : (
                    <path d="M4 2.5v19L19 12 4 2.5z" />
                  )}
                </svg>
              </button>
            </div>
          )}
        </div>

        <div className="relative z-10 max-w-xl lg:max-w-2xl px-6 lg:px-16 space-y-10 text-center lg:text-left mx-auto lg:mx-0 lg:ml-16">
          <div className="flex items-center gap-4">
            <span className="w-10 h-px bg-brand-white" />
            <span className="text-[11px] font-bold tracking-[0.35em] uppercase text-brand-white">
              National Student Reality Platform
            </span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-black leading-[1.05] tracking-tight">
            Where Students
            <br />
            Compete.
            <br />
            Grow.
            <br />
            Rise.
          </h1>

          <p className="text-base lg:text-lg text-white/80 leading-relaxed">
            A national digital stage unlocking leadership, opportunity,
            and measurable impact for South African students.
          </p>

          <motion.a
            href="#story"
            whileHover={{ x: 8 }}
            className="inline-flex items-center gap-4 text-sm font-bold tracking-wide group pt-4"
          >
            Explore the Story
            <span className="w-10 h-px bg-brand-white transition-all group-hover:w-16" />
          </motion.a>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-white/50"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        >
          <span className="text-[10px] font-bold tracking-[0.35em] uppercase">
            Scroll
          </span>
          <FiArrowDown className="w-5 h-5" />
        </motion.div>
      </section>

      {/* STORY SECTIONS */}
      <section
        id="story"
        className="relative h-[300vh]"
      >
        {slides.map((slide, index) => {
          const start = index / slides.length;
          const end = (index + 1) / slides.length;

          const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
          const scale = useTransform(scrollYProgress, [start, end], [1.08, 1]);

          return (
            <motion.section
              key={slide.id}
              style={{ opacity }}
              className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
            >
              <motion.div
                style={{ scale }}
                className="absolute inset-0"
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  sizes="100vw"
                  quality={75}
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/50" />
              </motion.div>

              <div className="relative z-10 max-w-3xl px-6 lg:px-16 text-center space-y-6">
                <h2 className="text-4xl lg:text-6xl font-black tracking-tight">
                  {slide.title}
                </h2>
                <p className="text-lg lg:text-xl text-white/80">
                  {slide.subtitle}
                </p>
              </div>
            </motion.section>
          );
        })}
      </section>
    </section>
  );
}
