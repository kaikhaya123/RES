"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface AnimatedTextRevealProps {
  text: string;
  className?: string;
  color?: string;
  fontSize?: number;
  lineHeight?: number;
  letterSpacing?: number;
  textAlign?: "left" | "center" | "right";
  initialBlur?: number;
  initialOpacity?: number;
  fadeDelay?: number;
  fadeDuration?: number;
  fadeEasing?: [number, number, number, number];
  fullRevealDistance?: number;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "div";
}

export default function AnimatedTextReveal({
  text,
  className = "",
  color = "#000000",
  fontSize = 18,
  lineHeight = 1.6,
  letterSpacing = 0,
  textAlign = "left",
  initialBlur = 10,
  initialOpacity = 0.3,
  fadeDelay = 0.03,
  fadeDuration = 0.5,
  fadeEasing = [0.16, 1, 0.3, 1],
  fullRevealDistance = 0.5,
  tag = "p",
}: AnimatedTextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const words = text.split(" ");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", `start ${0.8 - fullRevealDistance}`],
  });

  const styles = {
    fontSize: `${fontSize}px`,
    lineHeight,
    letterSpacing: `${letterSpacing}em`,
    textAlign,
    color,
  };

  if (tag === "h1") {
    return (
      <h1 ref={containerRef as any} className={className} style={styles}>
        {words.map((word, index) => (
          <Word
            key={index}
            word={word}
            index={index}
            totalWords={words.length}
            scrollYProgress={scrollYProgress}
            initialBlur={initialBlur}
            initialOpacity={initialOpacity}
            fadeDelay={fadeDelay}
            fadeDuration={fadeDuration}
            fadeEasing={fadeEasing}
          />
        ))}
      </h1>
    );
  }

  if (tag === "h2") {
    return (
      <h2 ref={containerRef as any} className={className} style={styles}>
        {words.map((word, index) => (
          <Word
            key={index}
            word={word}
            index={index}
            totalWords={words.length}
            scrollYProgress={scrollYProgress}
            initialBlur={initialBlur}
            initialOpacity={initialOpacity}
            fadeDelay={fadeDelay}
            fadeDuration={fadeDuration}
            fadeEasing={fadeEasing}
          />
        ))}
      </h2>
    );
  }

  if (tag === "h3") {
    return (
      <h3 ref={containerRef as any} className={className} style={styles}>
        {words.map((word, index) => (
          <Word
            key={index}
            word={word}
            index={index}
            totalWords={words.length}
            scrollYProgress={scrollYProgress}
            initialBlur={initialBlur}
            initialOpacity={initialOpacity}
            fadeDelay={fadeDelay}
            fadeDuration={fadeDuration}
            fadeEasing={fadeEasing}
          />
        ))}
      </h3>
    );
  }

  if (tag === "div") {
    return (
      <div ref={containerRef as any} className={className} style={styles}>
        {words.map((word, index) => (
          <Word
            key={index}
            word={word}
            index={index}
            totalWords={words.length}
            scrollYProgress={scrollYProgress}
            initialBlur={initialBlur}
            initialOpacity={initialOpacity}
            fadeDelay={fadeDelay}
            fadeDuration={fadeDuration}
            fadeEasing={fadeEasing}
          />
        ))}
      </div>
    );
  }

  // Default to p tag
  return (
    <p ref={containerRef as any} className={className} style={styles}>
      {words.map((word, index) => (
        <Word
          key={index}
          word={word}
          index={index}
          totalWords={words.length}
          scrollYProgress={scrollYProgress}
          initialBlur={initialBlur}
          initialOpacity={initialOpacity}
          fadeDelay={fadeDelay}
          fadeDuration={fadeDuration}
          fadeEasing={fadeEasing}
        />
      ))}
    </p>
  );
}

function Word({
  word,
  index,
  totalWords,
  scrollYProgress,
  initialBlur,
  initialOpacity,
  fadeDelay,
  fadeDuration,
  fadeEasing,
}: {
  word: string;
  index: number;
  totalWords: number;
  scrollYProgress: any;
  initialBlur: number;
  initialOpacity: number;
  fadeDelay: number;
  fadeDuration: number;
  fadeEasing: [number, number, number, number];
}) {
  const progress = index / totalWords;
  const start = progress;
  const end = Math.min(start + fadeDelay + fadeDuration, 1);

  const opacity = useTransform(
    scrollYProgress,
    [start, end],
    [initialOpacity, 1]
  );

  const blur = useTransform(
    scrollYProgress,
    [start, end],
    [initialBlur, 0]
  );

  return (
    <motion.span
      style={{
        opacity,
        filter: useTransform(blur, (b) => `blur(${b}px)`),
        display: "inline-block",
        marginRight: "0.25em",
      }}
      transition={{
        duration: fadeDuration,
        ease: fadeEasing,
      }}
    >
      {word}
    </motion.span>
  );
}


