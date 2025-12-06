"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Direction = "top" | "bottom" | "left" | "right";

interface RevealTextScrollProps {
  text: string;
  className?: string;
  direction?: Direction;
  fadeEdge?: number;
  blur?: boolean;
  blurAmount?: number;
  colorMorph?: boolean;
  startColor?: string;
  endColor?: string;
  scramble?: boolean;
  typewriter?: boolean;
  kerningTighten?: boolean;
  startKerning?: number;
  endKerning?: number;
  chromaticAberration?: boolean;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "div";
}

export default function RevealTextScroll({
  text,
  className = "",
  direction = "bottom",
  fadeEdge = 50,
  blur = false,
  blurAmount = 10,
  colorMorph = false,
  startColor = "#9CA3AF",
  endColor = "#000000",
  kerningTighten = false,
  startKerning = 0.1,
  endKerning = 0,
  chromaticAberration = false,
  tag = "p",
}: RevealTextScrollProps) {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.3"],
  });

  // Transform scroll to opacity
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Blur effect
  const blurValue = useTransform(
    scrollYProgress,
    [0, 1],
    blur ? [blurAmount, 0] : [0, 0]
  );

  // Color morph
  const textColor = colorMorph
    ? useTransform(scrollYProgress, (progress) => {
        const start = hexToRgb(startColor);
        const end = hexToRgb(endColor);
        if (!start || !end) return endColor;
        
        const r = Math.round(start.r + (end.r - start.r) * progress);
        const g = Math.round(start.g + (end.g - start.g) * progress);
        const b = Math.round(start.b + (end.b - start.b) * progress);
        return `rgb(${r}, ${g}, ${b})`;
      })
    : endColor;

  // Kerning tighten
  const letterSpacing = useTransform(
    scrollYProgress,
    [0, 1],
    kerningTighten ? [`${startKerning}em`, `${endKerning}em`] : [`${endKerning}em`, `${endKerning}em`]
  );

  // Gradient mask based on direction
  const getGradientMask = (progress: number) => {
    const fadePercent = fadeEdge;
    const revealPercent = progress * 100;

    switch (direction) {
      case "bottom":
        return `linear-gradient(to top, transparent 0%, black ${fadePercent}%, black ${revealPercent}%, transparent ${revealPercent + fadePercent}%)`;
      case "top":
        return `linear-gradient(to bottom, transparent 0%, black ${fadePercent}%, black ${revealPercent}%, transparent ${revealPercent + fadePercent}%)`;
      case "left":
        return `linear-gradient(to right, transparent 0%, black ${fadePercent}%, black ${revealPercent}%, transparent ${revealPercent + fadePercent}%)`;
      case "right":
        return `linear-gradient(to left, transparent 0%, black ${fadePercent}%, black ${revealPercent}%, transparent ${revealPercent + fadePercent}%)`;
      default:
        return `linear-gradient(to top, transparent 0%, black ${fadePercent}%, black ${revealPercent}%, transparent ${revealPercent + fadePercent}%)`;
    }
  };

  const maskStyle = useTransform(scrollYProgress, getGradientMask);
  const blurFilter = useTransform(blurValue, (b) => `blur(${b}px)`);

  const content = (
    <motion.span
      style={{
        opacity,
        filter: blurFilter as any,
        color: colorMorph ? (textColor as any) : undefined,
        letterSpacing: kerningTighten ? (letterSpacing as any) : undefined,
        display: "inline-block",
        WebkitMaskImage: maskStyle as any,
        maskImage: maskStyle as any,
        willChange: "opacity, filter, color, letter-spacing",
      } as any}
    >
      {chromaticAberration ? (
        <span className="relative inline-block">
          {/* RGB ghost layers */}
          <motion.span
            className="absolute inset-0 text-red-500 opacity-30"
            style={{
              transform: useTransform(
                scrollYProgress,
                [0, 1],
                ["translateX(-2px)", "translateX(0px)"]
              ),
            }}
          >
            {text}
          </motion.span>
          <motion.span
            className="absolute inset-0 text-blue-500 opacity-30"
            style={{
              transform: useTransform(
                scrollYProgress,
                [0, 1],
                ["translateX(2px)", "translateX(0px)"]
              ),
            }}
          >
            {text}
          </motion.span>
          <span className="relative">{text}</span>
        </span>
      ) : (
        text
      )}
    </motion.span>
  );

  // Render the appropriate tag with proper typing
  if (tag === "h1") {
    return <h1 ref={containerRef as any} className={className}>{content}</h1>;
  }
  if (tag === "h2") {
    return <h2 ref={containerRef as any} className={className}>{content}</h2>;
  }
  if (tag === "h3") {
    return <h3 ref={containerRef as any} className={className}>{content}</h3>;
  }
  if (tag === "h4") {
    return <h4 ref={containerRef as any} className={className}>{content}</h4>;
  }
  if (tag === "h5") {
    return <h5 ref={containerRef as any} className={className}>{content}</h5>;
  }
  if (tag === "h6") {
    return <h6 ref={containerRef as any} className={className}>{content}</h6>;
  }
  if (tag === "div") {
    return <div ref={containerRef as any} className={className}>{content}</div>;
  }

  return <p ref={containerRef as any} className={className}>{content}</p>;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}
