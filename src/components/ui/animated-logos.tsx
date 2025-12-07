"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Logo {
  name: string;
  img: string;
}

interface AnimatedLogosProps {
  displayMode?: "infinite-scroll" | "batch-cycle";
  batchSize?: number;
  cycleDuration?: number;
  randomize?: boolean;
}

export default function AnimatedLogos({
  displayMode = "batch-cycle",
  batchSize = 6,
  cycleDuration = 3500,
  randomize = true,
}: AnimatedLogosProps) {
  const logos: Logo[] = [
    { name: "MTN", img: "/Images/MTN Group_id6u4FvWmZ_1.png" },
    { name: "Capitec", img: "/Images/Capitec Bank_Logo_1.png" },
    { name: "KFC", img: "/Images/KFC_idjOyGqmuk_1.png" },
    { name: "Vodacom", img: "/Images/Vodacom_idt9E17-ZI_0.png" },
    { name: "Samsung", img: "/Images/Samsung_idkTmfps1i_1.png" },
    { name: "Mr Price", img: "/Images/Mr Price Foundation_idzme9ZFa6_0.png" },
    { name: "Uber", img: "/Images/Uber_idkRW7k3sW_1.png" },
    { name: "Dis-Chem", img: "/Images/Dis-Chem Pharmacies_idw8b4sQGI_1.png" },
    { name: "Nandos", img: "/Images/Nando's_idlrXECncs_1.png" }
  ];

  const [currentBatch, setCurrentBatch] = useState(0);
  const [shuffledLogos, setShuffledLogos] = useState(logos);

  useEffect(() => {
    if (randomize && displayMode === "batch-cycle") {
      setShuffledLogos([...logos].sort(() => Math.random() - 0.5));
    }
  }, []);

  useEffect(() => {
    if (displayMode !== "batch-cycle") return;

    const interval = setInterval(() => {
      setCurrentBatch((prev) => (prev + 1) % Math.ceil(shuffledLogos.length / batchSize));
    }, cycleDuration);

    return () => clearInterval(interval);
  }, [displayMode, shuffledLogos.length, batchSize, cycleDuration]);

  const getCurrentBatch = () => {
    const start = currentBatch * batchSize;
    return shuffledLogos.slice(start, start + batchSize);
  };

  // Duplicate logos for infinite scroll
  const duplicatedLogos = [...logos, ...logos, ...logos];
  const batchLogos = getCurrentBatch();

  // Animation variants for batch cycling
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.25,
        staggerChildren: 0.03,
        staggerDirection: -1,
      },
    },
  };

  const logoVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9,
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      transition: {
        duration: 0.25,
      },
    },
  };

  if (displayMode === "batch-cycle") {
    return (
      <div
        className="relative w-full py-16 bg-gradient-to-r from-gray-50 via-white to-gray-50 overflow-hidden"
        style={{
          backgroundImage: 'url(/Images/prism.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50 pointer-events-none z-0" />
        {/* Content Container */}
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 z-10">
          {/* Compact Header with Stats - Horizontal Layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12"
          >
            {/* Left: Title & Badge */}
            <div className="flex items-center gap-6">
              <div>
                <h3 className="text-white lg:text-4xl font-black mb-2 drop-shadow-lg">
                  Our Partners
                </h3>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-black text-white rounded-full text-xs font-bold tracking-wider drop-shadow-lg">
                  <div className="w-4 h-[2px] bg-white" />
                  TRUSTED BY {logos.length}+ BRANDS
                </div>
              </div>
            </div>
            {/* Right: Compact Stats */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-black text-white drop-shadow-lg">{logos.length}+</div>
                <div className="text-xs text-white font-semibold uppercase drop-shadow-lg">Partners</div>
              </div>
              <div className="w-px h-10 bg-gray-300" />
              <div className="text-center">
                <div className="text-2xl font-black text-white drop-shadow-lg">20M+</div>
                <div className="text-xs text-white font-semibold uppercase drop-shadow-lg">Reach</div>
              </div>
              <div className="w-px h-10 bg-gray-300" />
              <div className="text-center">
                <div className="text-2xl font-black text-white drop-shadow-lg">15+</div>
                <div className="text-xs text-white font-semibold uppercase drop-shadow-lg">Industries</div>
              </div>
            </div>
          </motion.div>
          {/* Compact Logo Strip */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentBatch}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex items-center justify-center gap-8 md:gap-12 py-8"
                style={{ willChange: "opacity" }}
              >
                {batchLogos.map((logo, index) => (
                  <motion.div
                    key={`${logo.name}-${currentBatch}-${index}`}
                    variants={logoVariants}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                    className="relative w-24 h-16 md:w-32 md:h-20 flex items-center justify-center grayscale hover:grayscale-0 opacity-90 hover:opacity-100 transition-all group bg-white/80 rounded-lg shadow-lg backdrop-blur-sm"
                    style={{ willChange: "transform, opacity" }}
                  >
                    <Image
                      src={logo.img}
                      alt={`${logo.name} logo`}
                      fill
                      className="object-contain p-2"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<div class=\"flex items-center justify-center w-full h-full\"><p class=\"text-xs font-bold text-gray-800\">${logo.name}</p></div>`;
                        }
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
            {/* Minimal Dot Indicators */}
            <div className="flex justify-center gap-1.5 mt-6">
              {Array.from({ length: Math.ceil(shuffledLogos.length / batchSize) }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentBatch(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === currentBatch 
                      ? "w-6 bg-white" 
                      : "w-1.5 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`View batch ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  // Infinite Scroll Mode
  return (
    <div 
      className="relative w-full py-16 overflow-hidden"
      style={{
        backgroundImage: 'url(/Images/prism.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Content - Horizontal Compact Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header & Logos - Single Row */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left: Header Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-shrink-0"
          >
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="w-8 h-[2px] bg-black" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-600">
                Trusted Partners
              </span>
            </div>
            <h3 className="text-3xl lg:text-4xl font-black text-black">
              Our Partners
            </h3>
          </motion.div>
          {/* Right: Infinite Scrolling Logos */}
          <div className="flex-1 relative overflow-hidden">
            {/* Gradient Fades */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white/95 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white/95 to-transparent z-10 pointer-events-none" />
            {/* Logo Strip */}
            <motion.div
              className="flex gap-12 items-center py-4"
              animate={{
                x: [0, -1440],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 25,
                  ease: "linear",
                },
              }}
              style={{ willChange: "transform" }}
            >
              {duplicatedLogos.map((logo, index) => (
                <div
                  key={`${logo.name}-${index}`}
                  className="flex-shrink-0 relative w-32 h-16 grayscale hover:grayscale-0 opacity-90 hover:opacity-100 transition-all duration-300 bg-white/80 rounded-lg shadow-lg backdrop-blur-sm"
                >
                  <Image
                    src={logo.img}
                    alt={`${logo.name} logo`}
                    fill
                    className="object-contain p-2"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `<div class=\"flex items-center justify-center w-full h-full\"><p class=\"text-sm font-bold text-gray-800\">${logo.name}</p></div>`;
                      }
                    }}
                  />
                </div>
              ))}
            </motion.div>
          </div>
          {/* Stats - Compact */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-shrink-0 flex items-center gap-6 px-6 py-3 bg-black/5 backdrop-blur-sm border border-black/10 rounded-full"
          >
            <div className="text-center">
              <div className="text-xl font-black text-black">{logos.length}+</div>
              <div className="text-[10px] text-gray-600 font-semibold uppercase tracking-wider">Partners</div>
            </div>
            <div className="w-px h-8 bg-black/10" />
            <div className="text-center">
              <div className="text-xl font-black text-black">20M+</div>
              <div className="text-[10px] text-gray-600 font-semibold uppercase tracking-wider">Reach</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
