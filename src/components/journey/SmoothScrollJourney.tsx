"use client";

import { ReactLenis } from "lenis/react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

export const SmoothScrollJourney = () => {
  return (
    <div className="bg-black">
      <ReactLenis
        root
        options={{
          lerp: 0.05,
        }}
      >
        <Hero />
        <Timeline />
      </ReactLenis>
    </div>
  );
};

const SECTION_HEIGHT = 1500;

const Hero = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterImage />
      <ParallaxImages />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-black/0 to-black" />
    </div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["170%", "100%"]
  );
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full flex items-center justify-center"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage:
          "url('/Images/college-students-different-ethnicities-cramming-min.jpg')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="text-center z-10">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-black text-white drop-shadow-lg"
        >
          OUR JOURNEY
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-white/80 text-lg mt-6 max-w-2xl mx-auto"
        >
          From vision to reality, transforming student lives one challenge at a time.
        </motion.p>
      </div>
    </motion.div>
  );
};

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <ParallaxImg
        src="/Images/friendlylooking-sociable-stylish-woman-with-curly-hair-red-beanie-winking-joyfully-pointi.jpg"
        alt="The Beginning"
        start={-200}
        end={200}
        className="w-1/3 rounded-lg"
      />
      <ParallaxImg
        src="/Images/photo-attractive-young-woman-makes-heart-shape-gesture-face.jpg"
        alt="Growth Phase"
        start={200}
        end={-250}
        className="mx-auto w-2/3 rounded-lg"
      />
      <ParallaxImg
        src="/Images/college-students-different-ethnicities-cramming-min.jpg"
        alt="Community Impact"
        start={-200}
        end={200}
        className="ml-auto w-1/3 rounded-lg"
      />
    </div>
  );
};

interface ParallaxImgProps {
  className: string;
  alt: string;
  src: string;
  start: number;
  end: number;
}

const ParallaxImg = ({ className, alt, src, start, end }: ParallaxImgProps) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};

const Timeline = () => {
  const milestones = [
    { year: "2023", title: "Foundation", description: "R.E.S. is founded with a vision to empower students through real challenges." },
    { year: "2024 Q1", title: "Launch", description: "First season goes live, reaching students across multiple universities." },
    { year: "2024 Q2", title: "Growth", description: "Community expands to 130+ communities with 4,200+ students empowered." },
    { year: "2024 Q3", title: "Impact", description: "1.8M+ social engagements, 52+ events hosted across regions." },
    { year: "2025", title: "Evolution", description: "Introducing advanced challenges, mentorship programs, and global opportunities." },
  ];

  return (
    <section className="mx-auto max-w-5xl px-4 py-48 text-white">
      <motion.h1
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="mb-20 text-4xl font-black uppercase text-white"
      >
        Milestones
      </motion.h1>
      <div className="space-y-8">
        {milestones.map((milestone, idx) => (
          <motion.div
            key={idx}
            initial={{ y: 48, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.75, delay: idx * 0.1 }}
            className="border-l-4 border-brand-yellow pl-8 py-4"
          >
            <p className="text-brand-yellow font-bold text-lg">{milestone.year}</p>
            <h3 className="text-2xl font-black text-white mt-2">{milestone.title}</h3>
            <p className="text-gray-400 mt-2 text-lg">{milestone.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
