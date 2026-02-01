"use client";

import React from "react";
import { motion } from "framer-motion";

interface RevealLinksProps {
  links?: Array<{ label: string; href: string }>;
  layout?: "horizontal" | "vertical";
  className?: string;
}

export const RevealLinks = ({
  links = [
    { label: "Twitter", href: "https://twitter.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Facebook", href: "https://facebook.com" },
    { label: "Instagram", href: "https://instagram.com" },
  ],
  layout = "vertical",
  className = "",
}: RevealLinksProps) => {
  const layoutClass =
    layout === "horizontal"
      ? "flex flex-wrap gap-6 items-center"
      : "grid place-content-center gap-4";

  return (
    <section className={`${layoutClass} ${className}`}>
      {links.map((link) => (
        <FlipLink key={link.label} href={link.href}>
          {link.label}
        </FlipLink>
      ))}
    </section>
  );
};

const DURATION = 0.25;
const STAGGER = 0.025;

interface FlipLinkProps {
  children: string;
  href: string;
}

const FlipLink = ({ children, href }: FlipLinkProps) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block overflow-hidden whitespace-nowrap text-lg font-bold uppercase sm:text-2xl md:text-3xl text-white hover:text-honey-tan transition-colors"
      style={{
        lineHeight: 0.9,
      }}
    >
      <div>
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: 0,
              },
              hovered: {
                y: "-100%",
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: "100%",
              },
              hovered: {
                y: 0,
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block text-honey-tan"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};
