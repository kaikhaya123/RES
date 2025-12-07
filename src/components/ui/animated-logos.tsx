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
    { name: "Nandos", img: "/Images/Nando's_idlrXECncs_1.png" },
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
      <div className="relative w-full py-24 lg:py-32 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/Images/low-angle-underground-hip-hop-musicians.jpg"
            alt="Student partners background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30" />
        </div>

        {/* Content Container */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12">
          
          {/* Header Section - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-black/80 border border-white/30 rounded-full mb-8">
              <div className="w-6 h-[2px] bg-white" />
              <span className="text-sm font-bold tracking-[0.25em] uppercase text-white">
                Trusted by 80+ Brands
              </span>
            </div>
            <h3 className="text-4xl md:text-5xl lg:text-7xl font-black text-white drop-shadow-2xl">
              Our Partners
            </h3>
          </motion.div>

          {/* Logo Grid Section */}
          <div className="min-h-[420px] flex items-center justify-center mb-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentBatch}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8 w-full"
                style={{ willChange: "opacity" }}
              >
                {batchLogos.map((logo, index) => (
                  <motion.div
                    key={`${logo.name}-${currentBatch}-${index}`}
                    variants={logoVariants}
                    whileHover={{ 
                      scale: 1.08,
                      transition: { duration: 0.2 }
                    }}
                    className="relative aspect-[3/2] flex items-center justify-center group"
                    style={{ willChange: "transform, opacity" }}
                  >
                    <div className="relative w-full h-full p-2">
                      <Image
                        src={logo.img}
                        alt={`${logo.name} logo`}
                        fill
                        className="object-contain brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity drop-shadow-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `<div class="flex items-center justify-center w-full h-full"><p class="text-sm font-bold text-white">${logo.name}</p></div>`;
                          }
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Batch Indicators - Centered */}
          <div className="flex justify-center gap-2 mb-16">
            {Array.from({ length: Math.ceil(shuffledLogos.length / batchSize) }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentBatch(i)}
                className={`h-2 rounded-full transition-all ${
                  i === currentBatch 
                    ? "w-8 bg-white" 
                    : "w-2 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`View batch ${i + 1}`}
              />
            ))}
          </div>

          {/* Stats Section - Centered & Balanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex justify-center"
          >
            <div className="inline-flex flex-wrap items-center justify-center gap-6 md:gap-8 px-6 md:px-10 py-5 bg-black/80 border border-white/30 rounded-2xl">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-black text-white mb-1">{logos.length}+</div>
                <div className="text-xs text-white/70 font-semibold uppercase tracking-wide">Partners</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-black text-white mb-1">20M+</div>
                <div className="text-xs text-white/70 font-semibold uppercase tracking-wide">Reach</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-black text-white mb-1">15+</div>
                <div className="text-xs text-white/70 font-semibold uppercase tracking-wide">Industries</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Infinite Scroll Mode
  return (
    <div className="relative w-full py-32 overflow-hidden">
      {/* Background Image with Minimal Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/Images/steptodown.com915272.jpg"
          alt="Premium background"
          fill
          className="object-cover"
          priority
        />
        {/* Very subtle overlay for text contrast */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Content - Centered on Image */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-[500px]">
        
        {/* Centered Badge on Glass */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-24 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-black/80 border border-white/30 rounded-full">
            <div className="w-6 h-[2px] bg-white" />
            <span className="text-sm font-bold tracking-[0.25em] uppercase text-white">
              Trusted by 80+ Brands
            </span>
          </div>
        </motion.div>

        {/* Infinite Scrolling Logos - Overlaid on Image */}
        <div className="relative w-full">
          {/* Subtle gradient fades */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black/30 via-transparent to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black/30 via-transparent to-transparent z-10 pointer-events-none" />

          {/* Logo Strip */}
          <motion.div
            className="flex gap-20 items-center py-8"
            animate={{
              x: [0, -1920],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
            style={{ willChange: "transform" }}
          >
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                className="flex-shrink-0 relative w-48 h-20 brightness-0 invert opacity-90 hover:opacity-100 transition-opacity duration-300"
              >
                <Image
                  src={logo.img}
                  alt={`${logo.name} logo`}
                  fill
                  className="object-contain drop-shadow-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<div class="flex items-center justify-center w-full h-full"><p class="text-xl font-black text-white drop-shadow-lg">${logo.name}</p></div>`;
                    }
                  }}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
