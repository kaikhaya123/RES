"use client";

import React from "react";
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function FeaturesSection() {
  const features = [
    {
      title: "Vote for Contestants",
      description: "Cast up to 100 votes per day for your favorite contestants. Free and premium voting options available.",
      animation: "Election concept Lottie JSON animation.lottie"
    },
    {
      title: "Daily Quizzes",
      description: "Test your knowledge with exciting daily quizzes. Win points, climb leaderboards, and earn rewards.",
      animation: "Brain disappointed.lottie"
    },
    {
      title: "Nominate Students",
      description: "Know someone amazing? Nominate talented students from your campus to join the competition.",
      animation: "referral.lottie"
    },
    {
      title: "Live Streaming",
      description: "Watch the show live 18 hours daily on TikTok, Facebook, and YouTube.",
      animation: "Live Streaming.lottie"
    },
    {
      title: "Win Prizes",
      description: "Compete for prizes including cash, devices, bursaries, and exclusive merchandise.",
      animation: "Rewards Programme.lottie"
    },
    {
      title: "Earn Achievements",
      description: "Unlock badges and achievements as you participate.",
      animation: "Champion.lottie"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-sm font-semibold text-gray-500 tracking-wider mb-3">
            PLATFORM FEATURES
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Everything You Can Do
          </h2>
        </motion.div>

        {/* 3-column modern layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-8">
            {features.slice(0, 2).map((item, idx) => (
              <FeatureCard key={idx} item={item} delay={idx * 0.2} />
            ))}
          </div>

          {/* CENTER COLUMN */}
          <div className="flex flex-col gap-8">
            <FeatureCard item={features[2]} delay={0.4} />
            
            {/* LARGE CARD */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-3xl p-10 bg-white/50 backdrop-blur-md shadow-xl border border-gray-100 flex flex-col justify-center"
            >
              <div className="mx-auto w-48 h-48 mb-8">
                <DotLottieReact
                  src={`/lottie-files/${features[3].animation}`}
                  loop
                  autoplay
                />
              </div>

              <h3 className="text-2xl font-bold text-center mb-4">
                {features[3].title}
              </h3>

              <p className="text-gray-600 text-center leading-relaxed">
                {features[3].description}
              </p>
            </motion.div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-8">
            {features.slice(4, 6).map((item, idx) => (
              <FeatureCard key={idx} item={item} delay={idx * 0.2} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function FeatureCard({ item, delay }: { item: { title: string; description: string; animation: string }; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{
        scale: 1.03,
        y: -6,
        transition: { duration: 0.25 }
      }}
      className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition"
    >
      <div className="w-28 h-28 mx-auto mb-6">
        <DotLottieReact
          src={`/lottie-files/${item.animation}`}
          loop
          autoplay
        />
      </div>
      <h3 className="text-xl font-bold text-center mb-3">
        {item.title}
      </h3>
      <p className="text-gray-600 text-center">
        {item.description}
      </p>
    </motion.div>
  );
}
