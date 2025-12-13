"use client";

import { ReactLenis } from "lenis/react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { useRef } from "react";

export const SmoothScrollHero = () => {
  return (
    <div className="bg-black">
      <ReactLenis
        root
        options={{
          lerp: 0.05,
        }}
      >
        <Nav />
        <Hero />
        <About />
      </ReactLenis>
    </div>
  );
};

const Nav = () => {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-4 text-white bg-black/50 backdrop-blur-md">
      <h1 className="text-2xl font-bold text-brand-yellow">R.E.S</h1>
      <button
        onClick={() => {
          document.getElementById("about-section")?.scrollIntoView({
            behavior: "smooth",
          });
        }}
        className="flex items-center gap-2 text-sm text-white hover:text-brand-yellow transition"
      >
        LEARN MORE <FiArrowRight />
      </button>
    </nav>
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
          ROOMZA'S
          <br />
          EDUCATED SECRET
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-white/80 text-lg mt-6 max-w-2xl mx-auto"
        >
          Where students face real challenges, rise, fall, and grow.
        </motion.p>
      </div>
    </motion.div>
  );
};

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <ParallaxImg
        src="/Images/modern-loose-fit-hoodie-mockup-for-fashion-brands-and-online-stores-promo-use-01452.png"
        alt="R.E.S Community"
        start={-200}
        end={200}
        className="w-1/3 rounded-lg"
      />
      <ParallaxImg
        src="/Images/friendlylooking-sociable-stylish-woman-with-curly-hair-red-beanie-winking-joyfully-pointi.jpg"
        alt="Student Community"
        start={200}
        end={-250}
        className="mx-auto w-2/3 rounded-lg"
      />
      <ParallaxImg
        src="/Images/college-students-different-ethnicities-cramming-min.jpg"
        alt="Students Collaborate"
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

const About = () => {
  return (
    <section
      id="about-section"
      className="mx-auto max-w-5xl px-4 py-48 text-white"
    >
      <motion.div
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="mb-20"
      >
        <h2 className="mb-8 text-4xl font-black uppercase text-white">
          What is R.E.S?
        </h2>
        <p className="text-lg text-gray-300 leading-relaxed mb-6">
          Roomza's Educated Secret (R.E.S.) is a student reality show that transforms ordinary challenges into extraordinary opportunities for growth.
        </p>
        <p className="text-lg text-gray-300 leading-relaxed">
          Watch students compete, overcome obstacles, and discover their true potential while building a community that inspires millions.
        </p>
      </motion.div>
    </section>
  );
};
