'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Item = {
  id: string;
  name: string;
  collection: string;
  image: string;
};

export default function ProductivitySlider({
  items,
  initialIndex = 0,
  dragSpeed = 1,
  autoplay = false,
  autoplayInterval = 4000,
  pauseOnInteraction = true,
  showProgress = true,
  slideTransitionDuration = 900,
}: {
  items: Item[];
  initialIndex?: number;
  dragSpeed?: number;
  autoplay?: boolean;
  autoplayInterval?: number;
  pauseOnInteraction?: boolean;
  showProgress?: boolean;
  slideTransitionDuration?: number;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<number>(initialIndex);
  const [imgError, setImgError] = useState<Record<string, boolean>>({});
  const raf = useRef<number | null>(null);

  // Autoplay & interaction state
  const isInteractingRef = useRef(false);
  const interactionTimer = useRef<number | null>(null);

  // Autoplay progress refs
  const autoplayStartRef = useRef<number | null>(null);
  const pausedElapsedRef = useRef<number | null>(null);
  const rafProgress = useRef<number | null>(null);
  const progressRef = useRef(0);
  const [progress, setProgress] = useState(0);
  // helper: center a child horizontally within the container (prevents vertical jumps)
  const isAnimatingRef = useRef(false);

  // animate scroll (horizontal) to target using RAF so we can control timing precisely
  const animateScrollTo = (container: HTMLElement, to: number, duration: number) => {
    if (duration <= 0) {
      container.scrollLeft = to;
      return Promise.resolve();
    }

    const start = container.scrollLeft;
    const change = to - start;
    const startTime = performance.now();

    return new Promise<void>((resolve) => {
      const step = (ts: number) => {
        const elapsed = ts - startTime;
        const t = Math.min(1, elapsed / duration);
        // easeInOutQuad
        const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        container.scrollLeft = Math.round(start + change * eased);
        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          resolve();
        }
      };

      requestAnimationFrame(step);
    });
  };

  const centerSlide = async (idx: number, smooth = true, duration = slideTransitionDuration) => {
    const container = containerRef.current;
    const el = container?.children[idx] as HTMLElement | undefined;
    if (!container || !el) return;
    const target = el.offsetLeft - (container.clientWidth - el.offsetWidth) / 2;
    // Clamp to valid scroll range to avoid overscroll/jumps on last item
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    const clamped = Math.min(maxScrollLeft, Math.max(0, target));

    // Prevent overlapping animations
    if (smooth && duration > 0) {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;
      await animateScrollTo(container, clamped, duration);
      isAnimatingRef.current = false;
    } else {
      container.scrollLeft = clamped;
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;
    centerSlide(initialIndex, false);
    setActive(initialIndex);
  }, [initialIndex]);

  // Pause/resume helpers for pause-on-interaction
  const pauseInteraction = () => {
    if (!pauseOnInteraction || !autoplay) return;
    isInteractingRef.current = true;

    // capture elapsed progress when pausing
    if (autoplayStartRef.current) {
      pausedElapsedRef.current = performance.now() - autoplayStartRef.current;
      progressRef.current = Math.min(1, (pausedElapsedRef.current || 0) / autoplayInterval);
      setProgress(progressRef.current);
    }

    if (interactionTimer.current) {
      window.clearTimeout(interactionTimer.current);
      interactionTimer.current = null;
    }
  };

  const resumeInteraction = (delay = 600) => {
    if (!pauseOnInteraction || !autoplay) return;
    if (interactionTimer.current) window.clearTimeout(interactionTimer.current);
    interactionTimer.current = window.setTimeout(() => {
      // resume autoplay where it left off
      autoplayStartRef.current = performance.now() - (progressRef.current || 0) * autoplayInterval;
      isInteractingRef.current = false;
      interactionTimer.current = null;
    }, delay);
  };

  useEffect(() => {
    return () => {
      if (interactionTimer.current) window.clearTimeout(interactionTimer.current);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  // Throttled scroll handler that sets active item closest to center
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollEndTimer: number | null = null;

    const onScroll = () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const center = container.scrollLeft + container.clientWidth / 2;
        let closestIndex = 0;
        let minDist = Infinity;

        Array.from(container.children).forEach((node, idx) => {
          const el = node as HTMLElement;
          const elCenter = el.offsetLeft + el.offsetWidth / 2;
          const dist = Math.abs(elCenter - center);
          if (dist < minDist) {
            minDist = dist;
            closestIndex = idx;
          }
        });

        setActive((prev) => (prev !== closestIndex ? closestIndex : prev));

        // Snap to nearest item after scrolling stops
        if (scrollEndTimer) window.clearTimeout(scrollEndTimer);
        scrollEndTimer = window.setTimeout(() => {
          centerSlide(closestIndex, true);
        }, 120);
      });
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
      if (scrollEndTimer) window.clearTimeout(scrollEndTimer);
    };
  }, []);

  // Autoplay effect (wraps around) + RAF-driven progress bar
  useEffect(() => {
    if (!autoplay || items.length < 2) {
      setProgress(0);
      return;
    }

    // prefer slightly slower default when autoplay enabled - user can override via prop
    // (no change needed if user passed autoplayInterval explicitly)


    let mounted = true;

    const step = (ts: number) => {
      if (!mounted) return;

      if (isInteractingRef.current) {
        // while paused, keep progressRef as-is and continue RAF loop
        rafProgress.current = requestAnimationFrame(step);
        return;
      }

      if (!autoplayStartRef.current) autoplayStartRef.current = ts;
      const elapsed = ts - (autoplayStartRef.current || ts);
      const p = Math.min(1, elapsed / autoplayInterval);
      progressRef.current = p;
      setProgress(p);

        if (p >= 1) {
        // advance to next and immediately start the next progress cycle
        setActive((prev) => {
          const next = (prev + 1) % items.length;
          // animate using the configured duration
          centerSlide(next, true, slideTransitionDuration);
          return next;
        });
        // reset progress and restart timing right away
        progressRef.current = 0;
        setProgress(0);
        autoplayStartRef.current = ts; // continue seamlessly
      }

      rafProgress.current = requestAnimationFrame(step);
    };

    rafProgress.current = requestAnimationFrame(step);

    const onVisibility = () => {
      isInteractingRef.current = document.hidden;
      if (isInteractingRef.current) {
        // preserve progress when hidden
        if (autoplayStartRef.current) pausedElapsedRef.current = performance.now() - autoplayStartRef.current;
      } else if (pausedElapsedRef.current) {
        autoplayStartRef.current = performance.now() - pausedElapsedRef.current;
        pausedElapsedRef.current = null;
      }
    };

    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      mounted = false;
      if (rafProgress.current) cancelAnimationFrame(rafProgress.current);
      autoplayStartRef.current = null;
      progressRef.current = 0;
      setProgress(0);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [autoplay, autoplayInterval, items.length]);

  // tweak visuals: slightly longer segment transition for smoothness
  // (this class is applied inline where segments are rendered)

  // keyboard navigation
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!containerRef.current) return;

    if (e.key === 'ArrowRight') {
      const next = Math.min(items.length - 1, active + 1);
      setActive(next);
      centerSlide(next, true);
      e.preventDefault();
    } else if (e.key === 'ArrowLeft') {
      const prev = Math.max(0, active - 1);
      setActive(prev);
      centerSlide(prev, true);
      e.preventDefault();
    }
  };

  // click to activate & center
  const onCardClick = (idx: number) => {
    if (!containerRef.current) return;
    setActive(idx);
    centerSlide(idx, true, slideTransitionDuration);

    // reset progress and autoplay start time so the next autoplay cycle restarts
    progressRef.current = 0;
    setProgress(0);
    if (autoplay) autoplayStartRef.current = performance.now();
  };

  // prevent image drag interfering with gestures
  const preventDrag = (e: React.DragEvent) => e.preventDefault();

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory items-center py-6 px-6 md:px-12"
        onKeyDown={onKeyDown}
        tabIndex={0}
        role="list"
        aria-label="Productivity slider: use arrow keys or swipe to change active item"
        onMouseEnter={() => pauseInteraction()}
        onMouseLeave={() => resumeInteraction()}
        onTouchStart={() => pauseInteraction()}
        onTouchEnd={() => resumeInteraction()}
        onFocus={() => pauseInteraction()}
        onBlur={() => resumeInteraction()}
      >
        {items.map((item, idx) => {
          const isActive = idx === active;

          return (
            <div
              key={item.id}
              role="listitem"
              aria-current={isActive}
              aria-label={`${item.name} — ${item.collection}`}
              tabIndex={0}
              onClick={() => onCardClick(idx)}
              onFocus={() => onCardClick(idx)}
              onDragStart={preventDrag}
              className={`group snap-center flex-shrink-0 relative rounded-2xl overflow-hidden transition-transform duration-500 ease-out cursor-pointer focus:outline-none md:group-hover:scale-105 ${
                isActive ? 'scale-105 z-10 ring-4 ring-[#F5C400]/20 shadow-lg' : 'scale-95 z-0 opacity-95'
              }`}
              style={{
                // Use flex to expand center card while others collapse
                display: 'flex',
                alignItems: 'stretch',
                flexDirection: 'column',
                // larger active flex/growth and narrower inactive widths
                flex: isActive ? '1.8 0 48%' : '0.9 0 26%'
                ,
                minWidth: isActive ? 280 : 200,
                maxWidth: isActive ? 640 : 380,
                transition: 'flex 500ms ease, min-width 500ms ease, max-width 500ms ease'
              }}
            >
              <div className={`relative h-[220px] md:h-[340px] bg-white flex items-center justify-center ${isActive ? 'p-6 md:p-8' : 'p-3 md:p-4'}`}>
                {/* Encode path to handle spaces/special chars and add onError fallback */}
                {!imgError[item.id] ? (
                  <Image
                    src={encodeURI(item.image)}
                    alt={item.name}
                    fill
                    draggable={false}
                    sizes="(max-width: 768px) 80vw, 45vw"
                    className={`object-contain w-auto h-full max-w-[95%] transition-transform duration-500 md:group-hover:scale-105`}
                    priority={isActive}
                    onError={() => setImgError((prev) => ({ ...prev, [item.id]: true }))}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-sm text-gray-500">
                    <div className="text-center">
                      <div className="font-semibold">Image unavailable</div>
                      <div className="text-xs mt-1">{item.name}</div>
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-opacity duration-300" />
              </div>

              <div className="p-4 md:p-6 bg-white flex flex-col gap-2">
                <p className="text-xs uppercase tracking-wider text-gray-500">{item.collection}</p>
                <h3 className="text-lg md:text-2xl font-bold text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-600">Designed for movement — built for focus.</p>

                {/* Per-card CTA shown only for active card */}
                {isActive && (
                  <div className="mt-4">
                    <Link
                      href={`/merch/${item.id}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#0B0B0B] text-white text-sm font-semibold rounded-md shadow hover:opacity-90 transition-opacity"
                      aria-label={`View ${item.name}`}
                    >
                      View product
                    </Link>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* small visual hint */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              pauseInteraction();
              centerSlide(i, true);
              setActive(i);
              // reset progress when user manually goes to a slide
              progressRef.current = 0;
              setProgress(0);
              if (autoplay) autoplayStartRef.current = performance.now();
              // resume autoplay after a short delay so users can interact
              resumeInteraction(800);
            }}
            className={`w-2 h-2 rounded-full ${i === active ? 'bg-[#F5C400]' : 'bg-gray-300'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
      {/* Compact progress bar for autoplay */}
      {autoplay && showProgress && (
        <div className="mt-3 w-full flex items-center gap-2" aria-hidden>
          {items.map((_, i) => {
            const fill = i < active ? 100 : i === active ? Math.round(progress * 100) : 0;
            return (
              <div key={i} className="flex-1 h-1 bg-gray-200 rounded overflow-hidden">
                <div
                  className="h-full bg-[#F5C400] transition-[width] duration-300 ease-linear"
                  style={{ width: `${fill}%` }}
                />
                {i === active && fill === 100 && (
                  <div className="absolute -bottom-1 left-0 right-0 flex justify-center">
                    <span className="w-2 h-2 bg-[#F5C400] rounded-full animate-ping opacity-60" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
