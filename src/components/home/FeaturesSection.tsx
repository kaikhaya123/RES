"use client";

import React from "react";
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function ModernFeatures() {
  const features = [
    {
      title: "Vote for Contestants",
      description:
        "Cast up to 100 votes daily. Simple, fast, and secure voting.",
      animation: "Election concept Lottie JSON animation.lottie",
    },
    {
      title: "Daily Quizzes",
      description:
        "Answer fun quizzes, earn points, and climb the leaderboard.",
      animation: "Funny brain.lottie",
    },
    {
      title: "Nominate Students",
      description:
        "Help undiscovered talent get into the show by nominating them.",
      animation: "referral.lottie",
    },
    {
      title: "Live Streaming",
      description:
        "Watch daily livestreams across TikTok, Facebook, and YouTube.",
      animation: "Live Streaming.lottie",
    },
    {
      title: "Win Prizes",
      description:
        "Earn rewards including cash, devices, and exclusive merch.",
      animation: "Champion.lottie",
    },
    {
      title: "Earn Achievements",
      description:
        "Unlock badges as you participate and grow your profile.",
      animation: "Winner.lottie",
    },
  ];

  return (
    <section className="relative py-28 bg-white overflow-hidden">
      {/* Soft parallax light blobs */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 rounded-full bg-purple-300 opacity-20 blur-3xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-pink-300 opacity-20 blur-3xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-sm tracking-widest text-gray-500 mb-4">
            PLATFORM FEATURES
          </p>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
            Your Tools for the Competition
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}
              whileHover={{
                y: -12,
                scale: 1.03,
                transition: { duration: 0.25 },
              }}
              className="relative backdrop-blur-xl bg-white/40 p-8 rounded-3xl shadow-lg border border-white/60"
              style={{
                boxShadow:
                  "0 10px 35px rgba(0,0,0,0.06), inset 0 0 0 1px rgba(255,255,255,0.5)",
              }}
            >
              {/* Floating light behind card */}
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-200/40 to-pink-200/40 opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />

              {/* Lottie Animation */}
              <div className="flex items-center justify-center mb-6 relative z-10">
                <div className="w-32 h-32">
                  <DotLottieReact
                    src={encodeURI(`/lottie-files/${feature.animation}`)}
                    loop
                    autoplay
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 text-center mb-3 relative z-10">
                {feature.title}
              </h3>

              <p className="text-gray-600 text-center relative z-10">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
