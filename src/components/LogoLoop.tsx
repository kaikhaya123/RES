import { useCallback, useEffect, useMemo, useRef, useState, memo } from 'react';
import './LogoLoop.css';

const ANIMATION_CONFIG = {
  SMOOTH_TAU: 0.25,
  MIN_COPIES: 4,  // Increased from 2 to ensure visibility on mobile
  COPY_HEADROOM: 3  // Increased from 2 for better coverage
};

const toCssLength = (value: string | number | undefined) => (typeof value === 'number' ? `${value}px` : (value ?? undefined));

const cx = (...parts: (string | boolean | undefined)[]) => parts.filter(Boolean).join(' ');

// Memoized individual logo item to prevent unnecessary re-renders
const LogoItem = memo<{
  item: any;
  itemKey: string;
  isVertical: boolean;
  scaleOnHover: boolean;
  renderItem?: (item: any, key: string) => React.ReactNode;
}>(({ item, itemKey, isVertical, scaleOnHover, renderItem }) => {
  if (renderItem) {
    return (
      <li
        className={cx(
          'flex-none text-[length:var(--logoloop-logoHeight)] leading-[1]',
          isVertical ? 'mb-[var(--logoloop-gap)]' : 'mr-[var(--logoloop-gap)]',
          scaleOnHover && 'overflow-visible group/item'
        )}
        key={itemKey}
        role="listitem"
      >
        {renderItem(item, itemKey)}
      </li>
    );
  }

  const content = (
    <img
      className={cx(
        'h-[var(--logoloop-logoHeight)] w-auto block object-contain',
        '[-webkit-user-drag:none] pointer-events-none',
        '[image-rendering:-webkit-optimize-contrast]',
        'motion-reduce:transition-none',
        scaleOnHover &&
          'transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-110'
      )}
      style={{
        transform: 'translate3d(0, 0, 0)',
        WebkitTransform: 'translate3d(0, 0, 0)'
      }}
      src={item.src}
      srcSet={item.srcSet}
      sizes={item.sizes}
      width={item.width}
      height={item.height}
      alt={item.alt ?? ''}
      title={item.title}
      loading="eager"
      decoding="async"
      draggable={false}
    />
  );

  const itemAriaLabel = item.alt ?? item.title;

  const inner = item.href ? (
    <a
      className={cx(
        'inline-flex items-center no-underline rounded',
        'transition-opacity duration-200 ease-linear',
        'hover:opacity-80',
        'focus-visible:outline focus-visible:outline-current focus-visible:outline-offset-2'
      )}
      href={item.href}
      aria-label={itemAriaLabel || 'logo link'}
      target="_blank"
      rel="noreferrer noopener"
    >
      {content}
    </a>
  ) : (
    content
  );

  return (
    <li
      className={cx(
        'flex-none text-[length:var(--logoloop-logoHeight)] leading-[1]',
        isVertical ? 'mb-[var(--logoloop-gap)]' : 'mr-[var(--logoloop-gap)]',
        scaleOnHover && 'overflow-visible group/item'
      )}
      key={itemKey}
      role="listitem"
    >
      {inner}
    </li>
  );
});

LogoItem.displayName = 'LogoItem';

const useResizeObserver = (callback: () => void, elements: React.RefObject<HTMLElement>[], dependencies: any[]) => {
  useEffect(() => {
    let rafId: number | null = null;
    let isScheduled = false;
    
    // Throttled callback - only runs once per animation frame
    const throttledCallback = () => {
      if (isScheduled) return;
      isScheduled = true;
      rafId = requestAnimationFrame(() => {
        callback();
        isScheduled = false;
      });
    };
    
    if (!window.ResizeObserver) {
      window.addEventListener('resize', throttledCallback);
      throttledCallback();
      return () => {
        window.removeEventListener('resize', throttledCallback);
        if (rafId !== null) cancelAnimationFrame(rafId);
      };
    }

    const observers = elements.map(ref => {
      if (!ref.current) return null;
      const observer = new ResizeObserver(throttledCallback);
      observer.observe(ref.current);
      return observer;
    });

    throttledCallback();
    return () => {
      observers.forEach(observer => observer?.disconnect());
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [callback, elements, dependencies]);
};

const useImageLoader = (seqRef: React.RefObject<HTMLElement>, onLoad: () => void, dependencies: any[]) => {
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll('img') ?? [];

    if (images.length === 0) {
      onLoad();
      return;
    }

    let remainingImages = images.length;
    const handleImageLoad = () => {
      remainingImages -= 1;
      if (remainingImages === 0) {
        onLoad();
      }
    };

    images.forEach(img => {
      const htmlImg = img as HTMLImageElement;
      if (htmlImg.complete) {
        handleImageLoad();
      } else {
        htmlImg.addEventListener('load', handleImageLoad, { once: true });
        htmlImg.addEventListener('error', handleImageLoad, { once: true });
      }
    });

    return () => {
      images.forEach(img => {
        img.removeEventListener('load', handleImageLoad);
        img.removeEventListener('error', handleImageLoad);
      });
    };
  }, [onLoad, seqRef, dependencies]);
};

const useAnimationLoop = (
  trackRef: React.RefObject<HTMLDivElement>,
  targetVelocity: number,
  seqWidth: number,
  seqHeight: number,
  isHovered: boolean,
  hoverSpeed: number | undefined,
  isVertical: boolean,
  isMobile: boolean
) => {
  const rafRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // On mobile, skip JS animation entirely - let CSS animation handle it
    if (isMobile) {
      // Set initial transform and exit - CSS will animate
      track.style.transform = 'translate3d(0, 0, 0)';
      (track.style as any).webkitTransform = 'translate3d(0, 0, 0)';
      return;
    }

    // Apply animation on desktop only
    const mobileFactor = 1;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const seqSize = isVertical ? seqHeight : seqWidth;
    
    // Force hardware acceleration and initial transform setup
    if (track) {
      track.style.willChange = 'transform';
      track.style.backfaceVisibility = 'hidden';
      (track.style as any).webkitBackfaceVisibility = 'hidden';
      track.style.transform = 'translate3d(0, 0, 0)';
      (track.style as any).webkitTransform = 'translate3d(0, 0, 0)';
    }
    
    if (seqSize > 0) {
      offsetRef.current = ((offsetRef.current % seqSize) + seqSize) % seqSize;
      const transformValue = isVertical
        ? `translate3d(0, ${-offsetRef.current}px, 0)`
        : `translate3d(${-offsetRef.current}px, 0, 0)`;
      if (track) {
        track.style.transform = transformValue;
        (track.style as any).webkitTransform = transformValue;
      }
    }

    if (prefersReduced) {
      if (track) {
        track.style.transform = isVertical ? 'translate3d(0, 0, 0)' : 'translate3d(0, 0, 0)';
        (track.style as any).webkitTransform = isVertical ? 'translate3d(0, 0, 0)' : 'translate3d(0, 0, 0)';
      }
      return () => {
        lastTimestampRef.current = null;
      };
    }

    const animate = (timestamp: number) => {
      if (!track) return;
      
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }

      const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;


      const target = isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity;
      const effectiveTarget = target * mobileFactor;

      const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (effectiveTarget - velocityRef.current) * easingFactor;

      // If seqSize is zero (measurements not ready on some mobile browsers),
      // fall back to a reasonable size taken from the track or sequence measurements
      // so animation can still run visibly.
      const fallbackSize = (() => {
        if (isVertical) return seqHeight || track.clientHeight || 100;
        return seqWidth || track.clientWidth || 100;
      })();

      const effectiveSeqSize = seqSize > 0 ? seqSize : fallbackSize;

      let nextOffset = offsetRef.current + velocityRef.current * deltaTime;
      nextOffset = ((nextOffset % effectiveSeqSize) + effectiveSeqSize) % effectiveSeqSize;
      offsetRef.current = nextOffset;

      const transformValue = isVertical
        ? `translate3d(0, ${-offsetRef.current}px, 0)`
        : `translate3d(${-offsetRef.current}px, 0, 0)`;
      track.style.transform = transformValue;
      (track.style as any).webkitTransform = transformValue;

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastTimestampRef.current = null;
    };
  }, [targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical, isMobile, trackRef]);
};

type LogoItem = {
  src: string;
  alt?: string;
  title?: string;
  href?: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
  ariaLabel?: string;
};

type LogoLoopProps = {
  logos: LogoItem[];
  speed?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  width?: string | number;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  renderItem?: (item: LogoItem, key: string) => React.ReactNode;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
};

export const LogoLoop = memo<LogoLoopProps>(
  ({
    logos,
    speed = 120,
    direction = 'left',
    width = '100%',
    logoHeight = 28,
    gap = 32,
    pauseOnHover,
    hoverSpeed,
    fadeOut = false,
    fadeOutColor,
    scaleOnHover = false,
    renderItem,
    ariaLabel = 'Partner logos',
    className,
    style
  }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const seqRef = useRef<HTMLUListElement>(null);

    const [seqWidth, setSeqWidth] = useState(0);
    const [seqHeight, setSeqHeight] = useState(0);
    const [copyCount, setCopyCount] = useState(10); // Start with more copies for mobile visibility
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    const effectiveHoverSpeed = useMemo(() => {
      if (hoverSpeed !== undefined) return hoverSpeed;
      if (pauseOnHover === true) return 0;
      if (pauseOnHover === false) return undefined;
      return 0;
    }, [hoverSpeed, pauseOnHover]);

    const isVertical = direction === 'up' || direction === 'down';

    // Calculate animation duration for CSS fallback (mobile)
    // Speed is in px/s, and we need to move seqWidth distance
    // Duration = distance / speed
    const cssAnimationDuration = useMemo(() => {
      const size = isVertical ? seqHeight : seqWidth;
      if (size === 0 || speed === 0) {
        // Fallback: estimate based on logo count and typical spacing
        // Assume ~200px per logo (logo + gap) × logo count / speed
        const estimatedSize = logos.length * 200;
        return Math.abs(estimatedSize / speed) || 60; // default 60s if speed is 0
      }
      // Calculate time to scroll one full sequence width
      return Math.abs(size / speed);
    }, [seqWidth, seqHeight, speed, isVertical, logos.length]);

    const targetVelocity = useMemo(() => {
      const magnitude = Math.abs(speed);
      let directionMultiplier: number;
      if (isVertical) {
        directionMultiplier = direction === 'up' ? 1 : -1;
      } else {
        directionMultiplier = direction === 'left' ? 1 : -1;
      }
      const speedMultiplier = speed < 0 ? -1 : 1;
      return magnitude * directionMultiplier * speedMultiplier;
    }, [speed, direction, isVertical]);

    const updateDimensions = useCallback(() => {
      // Use RAF to defer expensive measurements and prevent blocking
      requestAnimationFrame(() => {
        const containerWidth = containerRef.current?.clientWidth ?? 0;
        const sequenceRect = seqRef.current?.getBoundingClientRect?.();
        const sequenceWidth = sequenceRect?.width ?? 0;
        const sequenceHeight = sequenceRect?.height ?? 0;
        
        if (isVertical) {
          const parentHeight = containerRef.current?.parentElement?.clientHeight ?? 0;
          if (containerRef.current && parentHeight > 0) {
            const targetHeight = Math.ceil(parentHeight);
            if (containerRef.current.style.height !== `${targetHeight}px`)
              containerRef.current.style.height = `${targetHeight}px`;
          }
          if (sequenceHeight > 0) {
            setSeqHeight(Math.ceil(sequenceHeight));
            const viewport = containerRef.current?.clientHeight ?? parentHeight ?? sequenceHeight;
            const copiesNeeded = Math.ceil(viewport / sequenceHeight) + ANIMATION_CONFIG.COPY_HEADROOM;
            setCopyCount(Math.max(8, copiesNeeded));
          }
        } else if (sequenceWidth > 0) {
          setSeqWidth(Math.ceil(sequenceWidth));
          const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
          setCopyCount(Math.max(8, copiesNeeded));
        } else {
          // Simplified fallback - avoid expensive querySelectorAll
          if (containerWidth > 0) {
            // Estimate: logo count × average logo width (200px)
            const estimatedWidth = logos.length * 200;
            setSeqWidth(estimatedWidth);
            const copiesNeeded = Math.ceil(containerWidth / estimatedWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
            setCopyCount(Math.max(8, copiesNeeded));
          } else {
            // Last-resort fallback
            const vw = typeof window !== 'undefined' ? window.innerWidth : 0;
            if (vw > 0) {
              const estimatedWidth = logos.length * 200;
              setSeqWidth(estimatedWidth);
              const copiesNeeded = Math.ceil(vw / estimatedWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
              setCopyCount(Math.max(10, copiesNeeded));
            } else {
              setCopyCount(10);
            }
          }
        }
      });
    }, [isVertical, logos.length]);

    // Retry measurements a few times after mount to handle mobile rendering timing
    // Reduced frequency to minimize blocking
    useEffect(() => {
      if (typeof window === 'undefined') return;
      // Immediate first call
      updateDimensions();
      const t1 = setTimeout(updateDimensions, 100);
      const t2 = setTimeout(updateDimensions, 300);
      const t3 = setTimeout(updateDimensions, 1000);
      // Single retry after initial attempts
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }, [updateDimensions]);

    useResizeObserver(updateDimensions, [containerRef, seqRef], [logos, gap, logoHeight, isVertical]);

    useImageLoader(seqRef, updateDimensions, [logos, gap, logoHeight, isVertical]);

    // detect mobile via matchMedia and update state
    useEffect(() => {
      if (typeof window === 'undefined' || !window.matchMedia) return;
      const mq = window.matchMedia('(max-width: 767px)');
      const handler = () => setIsMobile(mq.matches);
      handler();
      if (typeof mq.addEventListener === 'function') mq.addEventListener('change', handler);
      else mq.addListener(handler as any);
      return () => {
        if (typeof mq.removeEventListener === 'function') mq.removeEventListener('change', handler);
        else mq.removeListener(handler as any);
      };
    }, []);

    // run animation loop; on mobile the hook will use a reduced speed multiplier
    useAnimationLoop(trackRef, targetVelocity, seqWidth, seqHeight, isHovered, effectiveHoverSpeed, isVertical, isMobile);

    const cssVariables = useMemo(
      () => ({
        '--logoloop-gap': `${gap}px`,
        '--logoloop-logoHeight': `${logoHeight}px`,
        ...(fadeOutColor && { '--logoloop-fadeColor': fadeOutColor })
      } as React.CSSProperties),
      [gap, logoHeight, fadeOutColor]
    );

    const rootClasses = useMemo(
      () =>
        cx(
          'logoloop',
          'relative group',
          isVertical ? 'logoloop--vertical overflow-hidden h-full inline-block' : 'overflow-x-hidden',
          '[--logoloop-gap:32px]',
          '[--logoloop-logoHeight:28px]',
          '[--logoloop-fadeColorAuto:#ffffff]',
          'dark:[--logoloop-fadeColorAuto:#0b0b0b]',
          scaleOnHover && 'py-[calc(var(--logoloop-logoHeight)*0.1)]',
          isMobile && 'logoloop--mobile',
          className
        ),
      [isVertical, scaleOnHover, isMobile, className]
    );

    const handleMouseEnter = useCallback(() => {
      if (effectiveHoverSpeed !== undefined) setIsHovered(true);
    }, [effectiveHoverSpeed]);
    const handleMouseLeave = useCallback(() => {
      if (effectiveHoverSpeed !== undefined) setIsHovered(false);
    }, [effectiveHoverSpeed]);

    // Touch devices don't fire mouseenter/mouseleave; map touch events to hover state
    // Use RAF to debounce and prevent blocking
    const handleTouchStart = useCallback(() => {
      if (effectiveHoverSpeed !== undefined) {
        requestAnimationFrame(() => setIsHovered(true));
      }
    }, [effectiveHoverSpeed]);
    const handleTouchEnd = useCallback(() => {
      if (effectiveHoverSpeed !== undefined) {
        requestAnimationFrame(() => setIsHovered(false));
      }
    }, [effectiveHoverSpeed]);

    const logoLists = useMemo(
      () =>
        Array.from({ length: copyCount }, (_, copyIndex) => (
          <ul
            className={cx('flex items-center', isVertical && 'flex-col')}
            key={`copy-${copyIndex}`}
            role="list"
            aria-hidden={copyIndex > 0}
            ref={copyIndex === 0 ? seqRef : undefined}
          >
            {logos.map((item, itemIndex) => (
              <LogoItem
                key={`${copyIndex}-${itemIndex}`}
                item={item}
                itemKey={`${copyIndex}-${itemIndex}`}
                isVertical={isVertical}
                scaleOnHover={scaleOnHover}
                renderItem={renderItem}
              />
            ))}
          </ul>
        )),
      [copyCount, logos, isVertical, scaleOnHover, renderItem]
    );

    const containerStyle = useMemo(
      () => ({
        width: isVertical
          ? toCssLength(width) === '100%'
            ? undefined
            : toCssLength(width)
          : (toCssLength(width) ?? '100%'),
        ...cssVariables,
        ...style
      }),
      [width, cssVariables, style, isVertical]
    );

    // Development-only debug values for on-screen overlay
    // Show a small debug overlay when not in production so we can inspect measurements
    // (seqWidth, seqHeight, copyCount, container width) on mobile devices.
    const debugEnabled = typeof process !== 'undefined' && process.env.NODE_ENV !== 'production' ? true : false;
    const debugValues = {
      seqWidth,
      seqHeight,
      copyCount,
      containerWidth: containerRef.current?.clientWidth ?? 0
    };

    return (
      <div
        ref={containerRef}
        className={rootClasses}
        style={{
          ...containerStyle,
          touchAction: 'pan-y',
          WebkitOverflowScrolling: 'touch'
        }}
        role="region"
        aria-label={ariaLabel}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        {fadeOut && (
          <>
            {isVertical ? (
              <>
                <div
                  aria-hidden
                  className={cx(
                    'pointer-events-none absolute inset-x-0 top-0 z-10',
                    'h-[clamp(24px,8%,120px)]',
                    'bg-[linear-gradient(to_bottom,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]'
                  )}
                />
                <div
                  aria-hidden
                  className={cx(
                    'pointer-events-none absolute inset-x-0 bottom-0 z-10',
                    'h-[clamp(24px,8%,120px)]',
                    'bg-[linear-gradient(to_top,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]'
                  )}
                />
              </>
            ) : (
              <>
                <div
                  aria-hidden
                  className={cx(
                    'pointer-events-none absolute inset-y-0 left-0 z-10',
                    'w-[clamp(24px,8%,120px)]',
                    'bg-[linear-gradient(to_right,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]'
                  )}
                />
                <div
                  aria-hidden
                  className={cx(
                    'pointer-events-none absolute inset-y-0 right-0 z-10',
                    'w-[clamp(24px,8%,120px)]',
                    'bg-[linear-gradient(to_left,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]'
                  )}
                />
              </>
            )}
          </>
        )}

        <div
          className={cx(
            'logoloop__track',
            'flex will-change-transform select-none relative z-0',
            'motion-reduce:transform-none',
            isVertical ? 'flex-col h-max w-full' : 'flex-row w-max'
          )}
          ref={trackRef}
          style={{
            transform: 'translate3d(0, 0, 0)',
            WebkitTransform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            perspective: 1000,
            WebkitPerspective: 1000,
            // Apply CSS animation on mobile devices
            ...(isMobile && {
              animation: `logoloop-scroll-${isVertical ? 'vertical' : 'horizontal'} ${cssAnimationDuration}s linear infinite`,
              WebkitAnimation: `logoloop-scroll-${isVertical ? 'vertical' : 'horizontal'} ${cssAnimationDuration}s linear infinite`
            })
          } as React.CSSProperties}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {logoLists}
        </div>
      </div>
    );
  }
);

LogoLoop.displayName = 'LogoLoop';

export default LogoLoop;
