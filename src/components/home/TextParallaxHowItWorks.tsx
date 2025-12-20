'use client';

import React, { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

interface TextParallaxContentProps {
  imgUrl: string;
  subheading: string;
  heading: string;
  children: ReactNode;
  stepNumber: number;
  totalSteps: number;
}

interface StickyImageProps {
  imgUrl: string;
  stepNumber: number;
  totalSteps: number;
}

interface OverlayCopyProps {
  subheading: string;
  heading: string;
  stepNumber: number;
  totalSteps: number;
}

interface ExampleContentProps {
  title: string;
  description: string;
  stepNumber: number;
  totalSteps: number;
  showCTA?: boolean;
}

// Determine if step is first, last, or middle
const getStepWeight = (stepNumber: number, totalSteps: number) => {
  if (stepNumber === 1 || stepNumber === totalSteps) return 'heavy';
  return 'light';
};

// Get animation timing based on weight
const getAnimationTiming = (stepNumber: number, totalSteps: number) => {
  const weight = getStepWeight(stepNumber, totalSteps);
  return weight === 'heavy' ? 0.8 : 0.4; // heavy steps are slower (0.8s), light are faster (0.4s)
};

// Get height based on weight
const getSectionHeight = (stepNumber: number, totalSteps: number) => {
  const weight = getStepWeight(stepNumber, totalSteps);
  return weight === 'heavy' ? 'h-[120vh]' : 'h-[90vh]';
};

export const TextParallaxHowItWorks = () => {
  const totalSteps = 6;
  
  return (
    <div className="bg-dark-bg-soft">
      <TextParallaxContent
        imgUrl="/Images/vertical-shot-curly-haired-millennial-girl-sits-crossed-legs-uses-mobile-phone-laptop-computer-connected-wireless-min.jpg"
        subheading="Step 1"
        heading="Register and Verify"
        stepNumber={1}
        totalSteps={totalSteps}
      >
        <ExampleContent
          title="Create Your Account"
          description="Join in seconds. Verify your identity. Start building your voice in the movement."
          stepNumber={1}
          totalSteps={totalSteps}
          showCTA={false}
        />
      </TextParallaxContent>

      <TextParallaxContent
        imgUrl="/Images/person-pressing-buzzer-min.jpg"
        subheading="Step 2"
        heading="Apply or Nominate"
        stepNumber={2}
        totalSteps={totalSteps}
      >
        <ExampleContent
          title="Get in the Ring"
          description="Upload. Inspire. Get nominated by thousands."
          stepNumber={2}
          totalSteps={totalSteps}
          showCTA={false}
        />
      </TextParallaxContent>

      <TextParallaxContent
        imgUrl="/Images/front-view-women-pressing-buzzer-min.jpg"
        subheading="Step 3"
        heading="Vote and Play Daily"
        stepNumber={3}
        totalSteps={totalSteps}
      >
        <ExampleContent
          title="Shape the Game"
          description="100 free votes daily. Quizzes. Live leaderboards. You decide who rises."
          stepNumber={3}
          totalSteps={totalSteps}
          showCTA={false}
        />
      </TextParallaxContent>

      <TextParallaxContent
        imgUrl="/Images/african-american-woman-watching-streaming-service.jpg"
        subheading="Step 4"
        heading="Watch Live and Vote"
        stepNumber={4}
        totalSteps={totalSteps}
      >
        <ExampleContent
          title="Real-Time Influence"
          description="The show streams live across all platforms. Your vote happens in real time."
          stepNumber={4}
          totalSteps={totalSteps}
          showCTA={false}
        />
      </TextParallaxContent>

      <TrustAndIntegrity />

      <TextParallaxContent
        imgUrl="/Images/still-life-betrayal-concept-min.jpg"
        subheading="Step 5"
        heading="Growth Beyond Competition"
        stepNumber={5}
        totalSteps={totalSteps}
      >
        <ExampleContent
          title="Leadership Development"
          description="Evicted? Never. You move to the Leadership House. Mentorship. Training. Growth."
          stepNumber={5}
          totalSteps={totalSteps}
          showCTA={false}
        />
      </TextParallaxContent>

      <TextParallaxContent
        imgUrl="/Images/cheerful-women-holding-trophy-icon-min.jpg"
        subheading="Step 6"
        heading="Win. Impact. Change"
        stepNumber={6}
        totalSteps={totalSteps}
      >
        <ExampleContent
          title="The Final Round"
          description="The nation votes. Winners are crowned. Bursaries awarded. Projects launched that change communities."
          stepNumber={6}
          totalSteps={totalSteps}
          showCTA={true}
        />
      </TextParallaxContent>
    </div>
  );
};

const IMG_PADDING = 12;

const TextParallaxContent = ({ 
  imgUrl, 
  subheading, 
  heading, 
  children,
  stepNumber,
  totalSteps
}: TextParallaxContentProps) => {
  const heightClass = getSectionHeight(stepNumber, totalSteps);
  
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className={`relative ${heightClass}`}>
        <StickyImage 
          imgUrl={imgUrl} 
          stepNumber={stepNumber}
          totalSteps={totalSteps}
        />
        <OverlayCopy 
          heading={heading} 
          subheading={subheading}
          stepNumber={stepNumber}
          totalSteps={totalSteps}
        />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl, stepNumber, totalSteps }: StickyImageProps) => {
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

const OverlayCopy = ({ subheading, heading, stepNumber, totalSteps }: OverlayCopyProps) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const weight = getStepWeight(stepNumber, totalSteps);
  const isHeavy = weight === 'heavy';

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
      <motion.p 
        className="mb-4 text-center text-base md:mb-6 md:text-2xl font-semibold tracking-wider"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {subheading}
      </motion.p>
      <motion.p 
        className={`text-center font-black tracking-tight ${
          isHeavy 
            ? 'text-4xl md:text-7xl leading-tight' 
            : 'text-3xl md:text-5xl'
        }`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        viewport={{ once: true }}
      >
        {heading}
      </motion.p>
    </motion.div>
  );
};

const ExampleContent = ({ 
  title, 
  description, 
  stepNumber, 
  totalSteps,
  showCTA = false
}: ExampleContentProps) => {
  const weight = getStepWeight(stepNumber, totalSteps);
  const isHeavy = weight === 'heavy';
  
  return (
    <div className={`mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 ${
      isHeavy ? 'pb-24 pt-16' : 'pb-12 pt-8'
    } md:grid-cols-12 bg-brand-yellow`}>
      <motion.h2 
        className={`col-span-1 font-black text-black ${
          isHeavy 
            ? 'text-4xl md:text-5xl' 
            : 'text-3xl md:text-4xl'
        } md:col-span-4`}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {title}
      </motion.h2>
      <motion.div 
        className="col-span-1 md:col-span-8"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
      >
        <p className={`mb-8 text-black ${
          isHeavy 
            ? 'text-xl md:text-2xl leading-relaxed' 
            : 'text-base md:text-lg leading-relaxed'
        }`}>
          {description}
        </p>
        {showCTA && (
          <motion.a 
            href="/challenges" 
            className="inline-flex items-center gap-3 rounded-lg bg-black px-8 py-3 text-base font-semibold text-brand-yellow transition-all hover:bg-black/90 active:scale-95"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Journey <FiArrowUpRight />
          </motion.a>
        )}
      </motion.div>
    </div>
  );
};

const TrustAndIntegrity = () => (
  <motion.div 
    className="mx-auto max-w-7xl px-6 py-16 bg-brand-yellow"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    <div className="rounded-3xl border border-black/10 p-12 bg-gradient-to-br from-brand-yellow to-brand-yellow">
      <motion.h2 
        className="text-3xl md:text-4xl font-black text-black mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Built on Trust
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-bold text-black mb-3">Verified. Secure. Fair.</h3>
          <p className="text-black text-base leading-relaxed">
            Every vote counted. Every participant verified. Anti-fraud systems active 24/7.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-bold text-black mb-3">Transparent. Always.</h3>
          <p className="text-black text-base leading-relaxed">
            Rules are clear. Outcomes are public. No hidden agendas. Just leadership.
          </p>
        </motion.div>
      </div>

      <motion.div 
        className="border-t border-black/20 pt-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <p className="text-2xl font-bold text-black mb-3">
          Your voice. Your choice. Your future.
        </p>
        <p className="text-lg font-semibold text-black">
          Together, we're building the next generation of leaders.
        </p>
      </motion.div>
    </div>
  </motion.div>
);
