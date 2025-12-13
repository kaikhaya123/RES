"use client";

import { ReactLenis } from "lenis/react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

export const SmoothScrollImpact = () => {
  return (
    <div className="bg-black">
      <ReactLenis
        root
        options={{
          lerp: 0.05,
        }}
      >
        <Hero />
        <ImpactStats />
        <Stories />
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
          "url('/Images/friendlylooking-sociable-stylish-woman-with-curly-hair-red-beanie-winking-joyfully-pointi.jpg')",
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
          YOUR STORY.
          <br />
          YOUR VOICE.
          <br />
          YOUR IMPACT.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-white/80 text-lg mt-6 max-w-2xl mx-auto"
        >
          See how R.E.S. gives students and communities real opportunities.
        </motion.p>
      </div>
    </motion.div>
  );
};

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <ParallaxImg
        src="/Images/photo-attractive-young-woman-makes-heart-shape-gesture-face.jpg"
        alt="Student Success"
        start={-200}
        end={200}
        className="w-1/3 rounded-lg"
      />
      <ParallaxImg
        src="/Images/college-students-different-ethnicities-cramming-min.jpg"
        alt="Community Together"
        start={200}
        end={-250}
        className="mx-auto w-2/3 rounded-lg"
      />
      <ParallaxImg
        src="/Images/modern-loose-fit-hoodie-mockup-for-fashion-brands-and-online-stores-promo-use-01452.png"
        alt="R.E.S. Movement"
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

const ImpactStats = () => {
  const stats = [
    { label: "Students Empowered", value: "4,200+" },
    { label: "Communities Reached", value: "130+" },
    { label: "Events Hosted", value: "52+" },
    { label: "Social Engagement", value: "1.8M+" },
  ];

  return (
    <section className="mx-auto max-w-5xl px-4 py-24 text-white">
      <motion.h2
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="mb-16 text-4xl font-black uppercase"
      >
        Our Reach
      </motion.h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ y: 48, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.75, delay: idx * 0.1 }}
            className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 text-center"
          >
            <p className="text-3xl md:text-4xl font-black text-brand-yellow">{stat.value}</p>
            <p className="text-gray-400 text-sm mt-3">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Stories = () => {
  return (
    <section className="mx-auto max-w-5xl px-4 py-24 text-white">
      <motion.h2
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="mb-16 text-4xl font-black uppercase"
      >
        Student Stories
      </motion.h2>
      <div className="space-y-16">
        {[
          {
            name: "Sarah",
            story: "From self-doubt to confidence, R.E.S. helped me discover my true potential in leadership.",
            image: "/Images/photo-attractive-young-woman-makes-heart-shape-gesture-face.jpg",
          },
          {
            name: "Alex",
            story: "The challenges pushed me beyond my limits. I grew not just personally, but professionally too.",
            image: "/Images/friendlylooking-sociable-stylish-woman-with-curly-hair-red-beanie-winking-joyfully-pointi.jpg",
          },
          {
            name: "Jordan",
            story: "R.E.S. connected me with a community that inspires me every single day to be better.",
            image: "/Images/college-students-different-ethnicities-cramming-min.jpg",
          },
        ].map((story, idx) => (
          <motion.div
            key={idx}
            initial={{ y: 48, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.75, delay: idx * 0.1 }}
            className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-8"
          >
            <p className="text-lg text-gray-300 italic mb-4">"{story.story}"</p>
            <p className="text-brand-yellow font-bold">— {story.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
