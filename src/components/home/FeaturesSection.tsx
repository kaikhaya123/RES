"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function FeaturesSection() {
  const features = [
    { 
      title: 'Vote for Contestants', 
      description: 'Cast up to 100 votes per day for your favorite contestants. Free and premium voting options available.', 
      animation: 'Election concept Lottie JSON animation.lottie',
    },
    { 
      title: 'Daily Quizzes', 
      description: 'Test your knowledge with exciting daily quizzes. Win points, climb leaderboards, and earn rewards.', 
      animation: 'Funny brain.lottie',
    },
    { 
      title: 'Nominate Students', 
      description: 'Know someone amazing? Nominate talented students from your campus to join the competition.', 
      animation: 'referral.lottie',
    },
    { 
      title: 'Live Streaming', 
      description: 'Watch the show live 18 hours daily on TikTok, Facebook, and YouTube. Never miss a moment!', 
      animation: 'Live Streaming.lottie',
    },
    { 
      title: 'Win Prizes', 
      description: 'Compete for amazing prizes including cash, devices, bursaries, and exclusive merchandise.', 
      animation: 'Champion.lottie',
    },
    { 
      title: 'Earn Achievements', 
      description: 'Unlock badges and achievements as you participate. Build your profile and show off your status!', 
      animation: 'Winner.lottie',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3"
          >
            PLATFORM FEATURES
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl lg:text-4xl font-bold text-gray-900 section-title"
          >
            Everything You Need to Participate
          </motion.h2>
        </motion.div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ 
                y: -8,
                scale: 1.03,
                transition: { duration: 0.3 }
              }}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              {/* Lottie Animation */}
              <motion.div 
                className="flex items-center justify-center mb-6"
                whileHover={{
                  scale: [1, 1.1, 1.05, 1.1, 1],
                  transition: {
                    duration: 0.6,
                    repeat: Infinity,
                    repeatDelay: 0.5
                  }
                }}
              >
                <div className="w-32 h-32">
                  <DotLottieReact 
                    src={encodeURI(`/lottie-files/${feature.animation}`)} 
                    loop 
                    autoplay 
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
              </motion.div>

              {/* Title */}
              <motion.h3 
                className="text-xl font-bold text-gray-900 mb-3 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 + 0.2 }}
              >
                {feature.title}
              </motion.h3>

              {/* Description */}
              <motion.p 
                className="text-gray-600 text-center leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 + 0.3 }}
              >
                {feature.description}
              </motion.p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
