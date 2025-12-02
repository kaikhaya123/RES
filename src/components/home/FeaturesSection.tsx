'use client';

import { motion } from 'framer-motion';
import { Vote, Brain, Trophy, Radio, Award, Users } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import React from 'react';

export default function FeaturesSection() {
  const features = [
    {
      icon: null,
      title: 'Vote for Contestants',
      description: 'Cast up to 100 votes per day for your favorite contestants. Free and premium voting options available.',
      useAnimation: true,
      animationType: 'voting'
    },
    {
      icon: null,
      title: 'Daily Quizzes',
      description: 'Test your knowledge with exciting daily quizzes. Win points, climb leaderboards, and earn rewards.',
      useAnimation: true,
      animationType: 'brain'
    },
    {
      icon: null,
      title: 'Nominate Students',
      description: 'Know someone amazing? Nominate talented students from your campus to join the competition.',
      useAnimation: true,
      animationType: 'referral'
    },
    {
      icon: null,
      title: 'Live Streaming',
      description: 'Watch the show live 18 hours daily on TikTok, Facebook, and YouTube. Never miss a moment!',
      useAnimation: true,
      animationType: 'streaming'
    },
    {
      icon: null,
      title: 'Win Prizes',
      description: 'Compete for amazing prizes including cash, devices, bursaries, and exclusive merchandise.',
      useAnimation: true,
      animationType: 'champion'
    },
    {
      icon: null,
      title: 'Earn Achievements',
      description: 'Unlock badges and achievements as you participate. Build your profile and show off your status!',
      useAnimation: true,
      animationType: 'winner'
    },
  ];

  return (
    <section className="py-20 bg-gray-50 font-futura">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Why Join <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">R.E.S.?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the ultimate student competition platform with exciting features designed for maximum engagement and entertainment.
          </p>
        </motion.div>

        {/* Features List - horizontal layout inspired by design */}
        <div className="max-w-6xl mx-auto space-y-12">
          {features.map((feature, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="w-full"
              >
                <div className={`flex flex-col md:flex-row items-center gap-6 md:gap-10 ${isEven ? '' : 'md:flex-row-reverse'}`}>
                  {/* Lottie / Image box */}
                  <div className="flex-shrink-0 w-full md:w-1/2">
                    <div className="w-full h-44 md:h-40 bg-gray-200 rounded-lg flex items-center justify-center">
                      <div className="w-48 h-28 md:w-64 md:h-36">
                        <DotLottieReact
                          src={`/lottie files/${
                            feature.animationType === 'brain' ? 'Funny brain.lottie' :
                            feature.animationType === 'referral' ? 'referral.lottie' :
                            feature.animationType === 'streaming' ? 'Live Streaming.lottie' :
                            feature.animationType === 'champion' ? 'Champion.lottie' :
                            feature.animationType === 'winner' ? 'Winner.lottie' :
                            'Election concept Lottie JSON animation.lottie'
                          }`}
                          loop
                          autoplay
                          style={{ width: '100%', height: '100%' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Text content */}
                  <div className="flex-1 text-center md:text-left md:w-1/2">
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
