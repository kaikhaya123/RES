'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSplit() {
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [isWide, setIsWide] = useState<boolean>(true);
  // Parallax tuning constants (higher = more motion)
  const PARALLAX_WIDE = 110; // used on wide desktop screens
  const PARALLAX_NARROW = 44; // used on narrow/less-wide screens

  // Swap images when screen ratio changes
  useEffect(() => {
    function updateRatio() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setIsWide(w / h > 1.05);
    }

    updateRatio();
    window.addEventListener('resize', updateRatio);
    // Some mobile browsers send orientationchange instead of resize
    window.addEventListener('orientationchange', updateRatio);

    return () => {
      window.removeEventListener('resize', updateRatio);
      window.removeEventListener('orientationchange', updateRatio);
    };
  }, []);

  // scroll-based parallax for split hero on desktop
  useEffect(() => {
    function applyParallax() {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const progress = Math.min(Math.max((windowH - rect.top) / (windowH + rect.height), 0), 1);

      // stronger motion on wide screens, subtle on small (tweak PARALLAX_WIDE/PARALLAX_NARROW at top)
      const multiplier = isWide ? PARALLAX_WIDE : PARALLAX_NARROW;
      const leftY = (progress - 0.5) * -multiplier; // left moves up
      const rightY = (progress - 0.5) * multiplier; // right moves down

      if (leftRef.current) leftRef.current.style.transform = `translateY(${leftY}px) translateZ(0)`;
      if (rightRef.current) rightRef.current.style.transform = `translateY(${rightY}px) translateZ(0)`;
    }

    function loop() {
      applyParallax();
      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);
    window.addEventListener('resize', applyParallax);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', applyParallax);
    };
  }, [isWide]);

  // Mobile uses a single intentional image; desktop swaps left/right based on screen ratio
  // Use the left image on mobile so the focal subject (left side) fits better when cropped
  const leftImage = isWide ? '/Images/portrait-young-beautiful-woman-gesticulating.jpg' : '/Images/playful-women-shopping-together.jpg';
  const rightImage = isWide ? '/Images/waist-up-shot-happy-man-smiles-happily-dressed-orange-hat-sweater-being-good-mood-looks-directly-front-expresses-positive-emotions-stands-studio-against-bright-wall-min.jpg' : '/Images/portrait-young-adult-wearing-hoodie-mockup.jpg';

  return (
    <section ref={heroRef} className="relative overflow-hidden bg-black">
      {/* MOBILE HERO: single image using the left image to preserve subject composition */}
      <div className="relative h-[82vh] md:hidden">
        <Image
          src={leftImage}
          alt="Hero mobile"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: isWide ? 'left center' : 'center 28%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30" />

        <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-12">
          <h1 className="font-display text-2xl font-extrabold leading-tight tracking-tight text-white">
            <span className="block">COMPETE.</span>
            <span className="block">COLLABORATE.</span>
            <span className="block">CHANGE.</span>
          </h1>

          <p className="mt-3 text-sm text-white/90 max-w-sm">Official R.E.S. merchandise. Limited drops and performance ready apparel for students who compete and lead.</p>

          <Link href="#products" className="mt-6 inline-flex w-max items-center px-5 py-3 bg-white text-black text-sm font-semibold uppercase rounded-full">
            Shop the collection
          </Link>
        </div>
      </div>

      {/* DESKTOP HERO: split images and centered safe content */}
      <div className="hidden md:grid grid-cols-2 md:h-[92vh] lg:h-[110vh]">
        <div className="relative overflow-hidden">
          <div ref={leftRef} className="absolute inset-0 will-change-transform transition-transform duration-500">
            <Image
              src={leftImage}
              alt="Left hero"
              fill
              priority
              className="object-cover"
              style={{
                // nudge and slightly scale on wide desktop to improve subject composition
                objectPosition: isWide ? 'center 18%' : 'center',
                transform: isWide ? 'scale(1.02) translateX(-2%)' : undefined,
              }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        </div>

        <div className="relative overflow-hidden">
          <div ref={rightRef} className="absolute inset-0 will-change-transform transition-transform duration-500">
            <Image
              src={rightImage}
              alt="Right hero"
              fill
              priority
              className="object-cover"
              style={{
                objectPosition: isWide ? 'center right' : 'center 36%',
                // nudge and slightly scale on narrow screens to keep the subject visible when cropped
                transform: isWide ? undefined : 'scale(1.03)'
              }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-l from-black/70 to-transparent" />
        </div>

        {/* DESKTOP CONTENT in its own layer */}
        <div className="absolute inset-0 flex items-center justify-center px-6 pointer-events-none">
          <div className="text-center max-w-3xl pointer-events-auto">
            <h1 className="font-display text-3xl lg:text-5xl font-extrabold leading-tight tracking-tight text-white">
              <span className="block">COMPETE.</span>
              <span className="block">COLLABORATE.</span>
              <span className="block">CHANGE.</span>
            </h1>

            <p className="mt-4 text-white/90 text-base max-w-xl mx-auto">Official R.E.S. merchandise. Limited drops and performance ready apparel for students who compete and lead.</p>

            <div className="mt-8">
              <Link href="#products" className="inline-flex items-center px-6 py-3 bg-white text-black font-semibold uppercase rounded-full">
                Shop the collection
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* subtle divider */}
      <div className="hidden md:block absolute bottom-0 left-0 right-0 pointer-events-none">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 -mb-20 translate-y-20">
          <div className="h-px bg-white/10" />
        </div>
      </div>
    </section>
  );
}
