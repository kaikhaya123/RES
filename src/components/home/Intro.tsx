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

  // Ensure safe area padding is applied on mobile (notch devices)
  const heroStyle = { paddingTop: 'env(safe-area-inset-top, 16px)' } as const;
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let observer: IntersectionObserver | null = null;
    let playPromise: Promise<void> | null = null;

    const attemptPlay = async () => {
      try {
        // Set all critical mobile attributes
        video.muted = true;
        video.defaultMuted = true;
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        video.setAttribute('x5-playsinline', '');
        video.setAttribute('crossorigin', 'anonymous');
        
        // Ensure video is loaded before attempting play
        if (video.readyState < 2) {
          video.load();
        }
        
        playPromise = video.play();
        if (playPromise !== undefined) {
          await playPromise;
          setShowPlayButton(false);
          setIsPlaying(true);
        }
      } catch (e: any) {
        // Log specific error for debugging
        console.warn('Video play error:', e?.name, e?.message);
        setShowPlayButton(true);
        setIsPlaying(false);
      }
    };

    // Attempt play on mount
    const mountTimeout = setTimeout(() => {
      attemptPlay();
    }, 100);

    // Observe visibility - restart attempts if video element comes into view
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window && containerRef.current) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            // Give a moment for video to be ready
            setTimeout(() => attemptPlay(), 150);
          }
        });
      }, { threshold: [0.3] });

      observer.observe(containerRef.current);
    }

    // Mobile: Enable play on any user interaction
    const handleUserInteraction = async () => {
      await attemptPlay();
      // Remove listener after first interaction
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction, { passive: true });
    document.addEventListener('touchstart', handleUserInteraction, { passive: true });

    // Event listeners for video state
    const onLoadedData = () => {
      setVideoLoaded(true);
    };

    const onPlay = () => {
      setIsPlaying(true);
      setShowPlayButton(false);
    };

    const onPause = () => {
      setIsPlaying(false);
    };

    const onError = (e: Event) => {
      console.error('Video error event:', {
        error: video.error,
        networkState: video.networkState,
        readyState: video.readyState,
      });
      setShowPlayButton(true);
      setIsPlaying(false);
    };

    // Check autoplay policy after a slight delay
    const autoplayCheckTimeout = setTimeout(() => {
      if (video.paused) {
        setShowPlayButton(true);
      } else {
        setShowPlayButton(false);
      }
    }, 500);

    video.addEventListener('loadeddata', onLoadedData);
    video.addEventListener('play', onPlay);
    video.addEventListener('playing', onPlay);
    video.addEventListener('pause', onPause);
    video.addEventListener('error', onError);

    return () => {
      clearTimeout(mountTimeout);
      clearTimeout(autoplayCheckTimeout);
      video.removeEventListener('loadeddata', onLoadedData);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('playing', onPlay);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('error', onError);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      if (observer && containerRef.current) {
        observer.disconnect();
      }
    };
  }, []);


  return (
    <section ref={containerRef} className="relative bg-black text-white" style={heroStyle}>

      {/* INTRO HERO */}
      <section className="relative min-h-screen overflow-hidden flex items-center" style={{paddingTop:0}}>
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            autoPlay
            preload="metadata"
            className="w-full h-full object-cover scale-[1.08]"
            aria-hidden="true"
            crossOrigin="anonymous"
          >
            <source src="/Videos/1166555_Environment_Man_3840x2160%20(1).mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/40" />
          <div className="absolute inset-0 bg-black/40" />

          {/* Mobile-only play button overlay when autoplay is blocked */}
          {showPlayButton && (
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <button
                type="button"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
                className="bg-black/40 text-white rounded-full p-4 shadow-lg hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-white"
                onClick={async () => {
                  const video = videoRef.current;
                  if (!video) return;
                  try {
                    video.muted = true;
                    video.defaultMuted = true;
                    video.setAttribute('playsinline', '');
                    video.setAttribute('webkit-playsinline', '');
                    video.setAttribute('x5-playsinline', '');

                    const playPromise = video.play();
                    if (playPromise !== undefined) {
                      await playPromise;
                      setIsPlaying(true);
                      setShowPlayButton(false);
                    }
                  } catch (e: any) {
                    console.error('Manual play failed:', e?.name, e?.message);
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

        <div className="relative z-10 max-w-xl lg:max-w-2xl px-4 md:px-6 lg:px-0 space-y-6 text-left mx-4 md:mx-0 md:ml-8 lg:ml-20">
          <div className="relative">
            <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-10 h-px bg-brand-white" aria-hidden="true" />
            <span className="text-[11px] md:text-sm font-semibold tracking-[0.45em] uppercase text-brand-white">
              NATIONAL STUDENT REALITY PLATFORM
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight overflow-hidden" style={{ WebkitLineClamp: 3, display: '-webkit-box', WebkitBoxOrient: 'vertical' as any }}>
            Where Students
            <br />
            Compete.
            <br />
            Grow. Rise.
          </h1>

          <p className="text-sm md:text-base lg:text-lg text-white/80 leading-relaxed max-w-[90%] sm:max-w-[420px]">
            A national digital stage unlocking leadership, opportunity,
            and measurable impact for South African students.
          </p>

          {/* Apply CTA removed */}

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
                  className="object-cover img-lighten"
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
