'use client';

import { useEffect, useRef, useState, useId } from 'react';
import { useMotionValue } from 'framer-motion';
import Image from 'next/image';

type CircleConfig = {
  x?: number;
  y?: number;
  delay?: number;
  radius?: number;
};

type HoverRevealProps = {
  frontSrc: string;
  backSrc: string;
  alt?: string;
  className?: string;
  circles?: CircleConfig[];
  size?: 'cover' | 'contain';
  duration?: number;
  startRadius?: number;
  endRadius?: number;
  interactive?: boolean;
  /** When true, expands the circles to fully reveal the back image */
  fullOnHover?: boolean;
  /** Radius used for full reveal (large to cover entire viewBox) */
  fullRadius?: number;
  /** Delay (s) before expanding to full reveal after initial hover */
  fullDelay?: number;
  children?: React.ReactNode;
};

export default function HoverReveal({
  frontSrc,
  backSrc,
  alt = '',
  className = '',
  circles = [{ x: 50, y: 50, delay: 0, radius: 110 }],
  size = 'cover',
  duration = 0.9,
  startRadius = 0,
  endRadius = 110,
  interactive = true,
  fullOnHover = true,
  fullRadius = 1000,
  fullDelay = 0.6,
  children,
}: HoverRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showing, setShowing] = useState(false);
  const [supportsClip, setSupportsClip] = useState(false);

  useEffect(() => {
    setSupportsClip(
      typeof window !== 'undefined' &&
        CSS.supports('clip-path', 'circle(50% at 50% 50%)')
    );
  }, []);

  const states = circles.map((cfg) => ({
    r: useMotionValue(startRadius),
    x: useMotionValue(cfg.x ?? 50),
    y: useMotionValue(cfg.y ?? 50),
    cfg,
  }));

  const clipId = `clip-${useId().replace(/[:.]/g, '')}`;
  const circleRefs = useRef<SVGCircleElement[]>([]);
  const fullTimerRef = useRef<number | null>(null);
  const [fullRevealed, setFullRevealed] = useState(false);

  useEffect(() => {
    states.forEach((s, i) => {
      const sync = () => {
        const c = circleRefs.current[i];
        if (!c) return;
        c.setAttribute('cx', `${s.x.get()}`);
        c.setAttribute('cy', `${s.y.get()}`);
        c.setAttribute('r', `${s.r.get()}`);
      };

      s.x.onChange(sync);
      s.y.onChange(sync);
      s.r.onChange(sync);
      sync();
    });
  }, [states]);

  const animateTo = (mv: any, to: number, delay = 0) => {
    const start = performance.now() + delay * 1000;
    const from = mv.get();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 5);
      mv.set(from + (to - from) * eased);
      if (t < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const handleEnter = () => {
    setShowing(true);
    // initial reveal per-circle
    states.forEach((s) => animateTo(s.r, s.cfg.radius ?? endRadius, s.cfg.delay));

    // optionally expand to a full reveal after a short delay
    if (fullOnHover) {
      if (fullTimerRef.current) window.clearTimeout(fullTimerRef.current);
      fullTimerRef.current = window.setTimeout(() => {
        states.forEach((s) => animateTo(s.r, fullRadius));        setFullRevealed(true);        fullTimerRef.current = null;
      }, fullDelay * 1000) as unknown as number;
    }
  };

  const handleLeave = () => {
    setShowing(false);
    // cancel any pending full reveal
    if (fullTimerRef.current) {
      window.clearTimeout(fullTimerRef.current);
      fullTimerRef.current = null;
    }
    // reset full reveal state
    setFullRevealed(false);
    states.forEach((s) => animateTo(s.r, startRadius));
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (fullTimerRef.current) {
        window.clearTimeout(fullTimerRef.current);
        fullTimerRef.current = null;
      }
    };
  }, []);
  const handleMove = (e: React.PointerEvent) => {
    if (!interactive) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    states.forEach((s) => {
      s.x.set(x);
      s.y.set(y);
    });
  };

  const fitClass = size === 'contain' ? 'object-contain' : 'object-cover';

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
      onPointerMove={handleMove}
    >
      {/* FRONT IMAGE */}
      <div
        className="absolute inset-0 z-10 transition-opacity"
        style={{ opacity: fullRevealed ? 0 : (showing && !supportsClip ? 0.04 : 0.6), transition: `opacity ${duration}s cubic-bezier(0.22,1,0.36,1)` }}
      >
        <Image
          src={frontSrc}
          alt={alt}
          fill
          priority
          className={fitClass}
          sizes="100vw"
        />
      </div>

      {/* BACK IMAGE */}
      <div className="absolute inset-0 z-20">
        <div
          style={{
            ...(supportsClip
              ? {
                  clipPath: `url(#${clipId})`,
                  WebkitClipPath: `url(#${clipId})`,
                }
              : {}),
            transform: showing ? 'scale(1.04)' : 'scale(1)',
            transition: `transform ${duration}s cubic-bezier(0.22,1,0.36,1)`,
          }}
          className="w-full h-full"
        >
          <Image
            src={backSrc}
            alt={alt}
            fill
            priority
            className={fitClass}
            sizes="100vw"
          />
        </div>
      </div>

      {supportsClip && (
        <svg
          className="absolute inset-0 z-30 pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
              {states.map((s, i) => (
                <circle
                  key={i}
                  ref={(el) => {
                    if (el) circleRefs.current[i] = el;
                  }}
                  cx={s.x.get()}
                  cy={s.y.get()}
                  r={s.r.get()}
                />
              ))}
            </clipPath>
          </defs>
        </svg>
      )}

      {/* Overlay for legibility; hidden during full reveal */}
      <div
        className="absolute inset-0 z-30 pointer-events-none bg-gradient-to-b from-black/20 via-black/30 to-black/60"
        style={{ opacity: fullRevealed ? 0 : 1, transition: `opacity ${duration}s ease` }}
      />

      {/* Render children (content) above images */}
      {children ?? (
        <div
          className="relative z-40 h-full"
          style={{ opacity: fullRevealed ? 0 : 1, transition: `opacity ${duration}s ease` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />

          <div className="relative max-w-7xl mx-auto px-6 lg:px-12 h-full flex items-end pb-20 md:pb-28">
            <div className="max-w-xl space-y-8">

              {/* Eyebrow */}
              <div className="flex items-center gap-3">
                <span className="w-8 h-px bg-brand-yellow" />
                <span className="text-[11px] font-bold tracking-[0.35em] uppercase text-brand-yellow">
                  Official Merchandise
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-white">
                Wear the
                <br />
                Movement
              </h1>

              {/* Supporting copy */}
              <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-md">
                Premium streetwear designed for the Roomza’s Educated Secret community.
                Every purchase supports the platform and student initiatives.
              </p>

              {/* CTA row */}
              <div className="flex items-center gap-6 pt-4">
                <a
                  href="#products"
                  className="inline-flex items-center justify-center bg-brand-yellow text-black px-8 py-4 font-black text-sm uppercase tracking-widest hover:scale-[1.02] transition"
                >
                  Shop Collection
                </a>

                <span className="text-xs uppercase tracking-widest text-white/40">
                  Limited Drops
                </span>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
