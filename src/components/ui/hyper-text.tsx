"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";

import { cn } from "@/lib/utils";

interface HyperTextProps {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
  animateOnLoad?: boolean;
}

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

export function HyperText({
  children,
  className,
  duration = 800,
  delay = 0,
  animateOnLoad = true,
}: HyperTextProps) {
  const [displayText, setDisplayText] = useState(children.split(""));
  const [trigger, setTrigger] = useState(false);
  const interationsRef = useRef(0);
  const isFirstRender = useRef(true);

  const triggerAnimation = () => {
    interationsRef.current = 0;
    setTrigger(true);
  };

  useEffect(() => {
    if (!animateOnLoad && isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const interval = setInterval(
      () => {
        if (!animateOnLoad && !trigger) return;

        if (interationsRef.current < children.length) {
          setDisplayText((t) =>
            t.map((l, i) =>
              l === " "
                ? l
                : i <= interationsRef.current
                  ? children[i]
                  : alphabets[getRandomInt(26)]
            )
          );
          interationsRef.current = interationsRef.current + 0.1;
        } else {
          setTrigger(false);
          clearInterval(interval);
        }
      },
      duration / (children.length * 10)
    );

    return () => clearInterval(interval);
  }, [children, duration, trigger, animateOnLoad]);

  useEffect(() => {
    if (animateOnLoad) {
      const timeoutId = setTimeout(() => {
        triggerAnimation();
      }, delay);
      return () => clearTimeout(timeoutId);
    }
  }, [animateOnLoad, delay]);

  return (
    <div
      className={cn(
        "overflow-hidden font-mono cursor-default",
        className
      )}
      onMouseEnter={triggerAnimation}
    >
      <AnimatePresence mode="wait">
        {displayText.map((letter, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, delay: i * 0.05 }}
          >
            {letter}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
