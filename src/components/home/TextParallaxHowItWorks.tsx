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
        heading="Register and Verify"
      >
        <ExampleContent
          title="Get Started"
          description="You start by creating an account on the platform. Choose student or public registration, enter your basic details and location, and verify your email or mobile number. This keeps the platform fair, secure, and free from bots."
        />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="/Images/person-pressing-buzzer.jpg"
        subheading="Step 2"
        heading="Apply or Nominate"
      >
        <ExampleContent
          title="Get Nominated"
          description="Future leaders enter through application or nomination. Applicants upload a short introduction video. The public supports candidates through verified voting. Only candidates with enough support move forward."
        />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="/Images/remote-employee-home-office-desk-editing-documents-tablet.jpg"
        subheading="Step 3"
        heading="Vote, Play, and Engage Daily"
      >
        <ExampleContent
          title="Participate Every Day"
          description="You participate every day by voting for contestants and playing daily quizzes and challenges while tracking progress on live leaderboards. Each verified user receives up to 100 free votes per day, with time-limited voting windows to ensure fairness."
        />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="/Images/african-american-woman-watching-streaming-service.jpg"
        subheading="Step 4"
        heading="Watch Live and Shape the Show"
      >
        <ExampleContent
          title="Influence in Real Time"
          description="The show streams live on social platforms. You watch events as they happen, vote in real time, and your choices influence rankings, challenges, and outcomes directly."
        />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="/Images/still-life-betrayal-concept.jpg"
        subheading="Step 5"
        heading="Growth Beyond Eviction"
      >
        <ExampleContent
          title="Continuous Development"
          description="Progress is part of the journey. Evicted contestants move to the Leadership House where they receive mentorship, training, and development. The focus stays on growth, not elimination."
        />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="/Images/cheerful-women-holding-trophy-icon.jpg"
        subheading="Step 6"
        heading="Finals, Rewards, and Real Impact"
      >
        <ExampleContent
          title="Celebrate Success"
          description="The final phase is decided by public voting, with winners announced live. Rewards include bursaries, prizes, and opportunities. Projects launched during the show support students and communities."
        />
      </TextParallaxContent>
      <TrustAndIntegrity />
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

const TrustAndIntegrity = () => (
  <div className="mx-auto max-w-5xl px-4 py-24 bg-black">
    <div className="rounded-3xl border border-gray-800 p-12 bg-gradient-to-br from-gray-900 to-black">
      <h2 className="text-4xl md:text-5xl font-black text-white mb-8">
        Built on Trust and Integrity
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <h3 className="text-xl font-bold text-white mb-3">Security & Verification</h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            All activity is secured and monitored. Votes are verified and limited per user. Anti-fraud and anti-bot systems are active.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-3">Transparency</h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            Rules and outcomes remain transparent at all times. Every step of the process is clear and fair for all participants.
          </p>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-12">
        <p className="text-2xl font-bold text-white mb-2">
          Your vote matters.
        </p>
        <p className="text-2xl font-bold text-brand-yellow">
          Your participation shapes future leaders.
        </p>
      </div>
    </div>
  </div>
);
