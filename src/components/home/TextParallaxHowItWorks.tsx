'use client';

import React, { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

interface TextParallaxContentProps {
  imgUrl: string;
  subheading: string;
  heading: string;
  children: ReactNode;
}

interface StickyImageProps {
  imgUrl: string;
}

interface OverlayCopyProps {
  subheading: string;
  heading: string;
}

interface ExampleContentProps {
  title: string;
  description: string;
}

export const TextParallaxHowItWorks = () => {
  return (
    <div className="bg-black">
      <TextParallaxContent
        imgUrl="/Images/vertical-shot-curly-haired-millennial-girl-sits-crossed-legs-uses-mobile-phone-laptop-computer-connected-wireless.jpg"
        subheading="Step 1"
        heading="Register & Showcase"
      >
        <ExampleContent
          title="Get Started"
          description="Create your R.E.S. account and showcase your unique talents. Whether you're an academic achiever, creative genius, or natural leader, R.E.S. has a platform for you. Register today and join thousands of students transforming their potential into reality."
        />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="/Images/close-up-employee-typing-laptop-keyboard-inputting-data-metrics.jpg"
        subheading="Step 2"
        heading="Compete & Challenge"
      >
        <ExampleContent
          title="Face Real Challenges"
          description="Participate in curated challenges designed to test your skills and push your boundaries. From intellectual competitions to creative tasks, every challenge is an opportunity to prove yourself. Gain visibility through your performance and compete for top positions on the leaderboard."
        />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="/Images/african-american-woman-watching-streaming-service.jpg"
        subheading="Step 3"
        heading="Win & Celebrate"
      >
        <ExampleContent
          title="Achieve Victory"
          description="Rise through the ranks as the community votes for their favorites. Top performers gain scholarships, exclusive opportunities, and a platform to share their story with millions. Your journey on R.E.S. is just the beginning of something extraordinary."
        />
      </TextParallaxContent>
    </div>
  );
};

const IMG_PADDING = 12;

const TextParallaxContent = ({ imgUrl, subheading, heading, children }: TextParallaxContentProps) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl }: StickyImageProps) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0 bg-black/60"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

const OverlayCopy = ({ subheading, heading }: OverlayCopyProps) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">
        {subheading}
      </p>
      <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>
    </motion.div>
  );
};

const ExampleContent = ({ title, description }: ExampleContentProps) => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12 bg-black">
    <h2 className="col-span-1 text-3xl font-black text-white md:col-span-4">
      {title}
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-8 text-xl text-gray-300 md:text-2xl leading-relaxed">
        {description}
      </p>
      <a href="/challenges" className="inline-flex items-center gap-2 rounded bg-brand-yellow px-9 py-4 text-lg font-semibold text-black transition-all hover:bg-brand-yellow/80">
        Explore Challenges <FiArrowUpRight />
      </a>
    </div>
  </div>
);
