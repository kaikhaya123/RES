'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Image from 'next/image';

export default function FeaturesSection() {
  const participationPhase = [
    {
      id: 1,
      title: 'Cast Your Vote',
      description: 'Your choice matters. Vote in real time and directly influence the competition.',
      image: '/Images/VOTE (1).jpg',
      lottie: 'Election concept Lottie JSON animation.lottie',
      isPrimary: true
    },
    {
      id: 2,
      title: 'Watch Live',
      description: 'Catch the action as it unfolds. Every moment, live.',
      image: '/Images/medium-shot-woman-holding-remote.jpg',
      lottie: 'Live Streaming.lottie',
      isPrimary: false
    },
    {
      id: 3,
      title: 'Compete Daily',
      description: 'Quizzes, challenges, leaderboards. Engagement rewarded.',
      image: '/Images/teenager-spending-time-together-outdoors.jpg',
      lottie: 'Rewards Programme.lottie',
      isPrimary: false
    }
  ];

  const progressionPhase = [
    {
      id: 4,
      title: 'Refer a Leader',
      description: 'Know someone exceptional? Nominate them directly.',
      image: '/Images/KSENIIA FAST.png',
      lottie: 'referral.lottie',
      isPrimary: false
    },
    {
      id: 5,
      title: 'Test Your Knowledge',
      description: 'Brain power wins prizes. Prove your edge.',
      image: '/Images/college-students-different-ethnicities-cramming (2).jpg',
      lottie: 'Funny brain.lottie',
      isPrimary: false
    },
    {
      id: 6,
      title: 'Win the Prize',
      description: 'Bursaries. Recognition. Opportunity. The reward for impact.',
      image: '/Images/portrait-young-woman-with-curly-hair-min.jpg',
      lottie: 'Champion.lottie',
      isPrimary: false
    }
  ];

  const allFeatures = [...participationPhase, ...progressionPhase];
  const [active, setActive] = useState(allFeatures[0]);

  const FeatureButton = ({ feature, isPhaseStart }: { feature: (typeof allFeatures)[0]; isPhaseStart?: boolean }) => (
    <motion.button
      onClick={() => setActive(feature)}
      className={`w-full text-left p-4 md:p-5 rounded-xl md:rounded-2xl transition-all border relative group ${
        active.id === feature.id
          ? 'border-black bg-gradient-to-r from-black/5 to-transparent shadow-md'
          : 'border-gray-300 hover:border-gray-400'
      } ${feature.isPrimary ? 'ring-2 ring-black/10' : ''}`}
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Vertical progress line connector - visible when active or next */}
      {!feature.isPrimary && active.id >= feature.id && (
        <div className="absolute -left-7 top-0 bottom-0 hidden lg:block">
          <div className="w-0.5 h-full bg-gradient-to-b from-black to-transparent" />
        </div>
      )}

      <div className="flex items-start gap-3 md:gap-4">
        {/* Icon - Static, animate on hover only */}
        <div className={`${feature.isPrimary ? 'w-16 h-16 md:w-14 md:h-14' : 'w-12 h-12 md:w-11 md:h-11'} flex-shrink-0 relative`}>
          <div className={feature.isPrimary ? 'absolute inset-0 bg-black/5 rounded-full blur-lg' : ''} />
          <DotLottieReact
            src={`/lottie-files/${feature.lottie}`}
            autoplay={active.id === feature.id}
            loop
            style={{
              width: '100%',
              height: '100%',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.08))'
            }}
          />
        </div>

        <div className="min-w-0 flex-1 pt-0.5">
          <h3 className={`font-bold leading-tight ${
            feature.isPrimary
              ? 'text-lg md:text-xl text-black'
              : 'text-base md:text-lg text-gray-900'
          }`}>
            {feature.title}
          </h3>
          <p className={`leading-snug mt-1 ${
            feature.isPrimary
              ? 'text-sm md:text-base text-gray-700'
              : 'text-xs md:text-sm text-gray-600'
          }`}>
            {feature.description}
          </p>
        </div>

        {/* Active indicator */}
        {active.id === feature.id && (
          <motion.div
            layoutId="indicator"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-black rounded-full"
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}
      </div>
    </motion.button>
  );

  return (
    <section className="w-full py-12 md:py-16 lg:py-24 px-4 md:px-6 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
      <div className="mb-8 md:mb-12 lg:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 md:mb-4 lg:mb-5">
          Your Impact Starts Here
        </h2>
        <p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl leading-relaxed">
          From first vote to lasting impact. Three phases. One movement.
        </p>
      </div>

      {/* Desktop: Flex layout | Mobile: Stacked */}
      <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-16 items-stretch">
        
        {/* LEFT SIDE - FEATURE LIST WITH PHASES */}
        <div className="flex-1 order-2 lg:order-1">
          
          {/* PARTICIPATION PHASE */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="w-1 h-6 bg-black rounded-full" />
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-900">
                Phase 1: Participate
              </h3>
            </div>
            <div className="space-y-3 md:space-y-4 relative">
              {participationPhase.map((feature, idx) => (
                <div key={feature.id}>
                  <FeatureButton feature={feature} isPhaseStart={idx === 0} />
                </div>
              ))}
            </div>
          </div>

          {/* PROGRESSION PHASE */}
          <div>
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="w-1 h-6 bg-black/40 rounded-full" />
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-600">
                Phase 2: Progress
              </h3>
            </div>
            <div className="space-y-3 md:space-y-4 relative">
              {progressionPhase.map((feature, idx) => (
                <div key={feature.id}>
                  <FeatureButton feature={feature} isPhaseStart={idx === 0} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE IMAGE - ENHANCED MOTION */}
        <div className="flex-1 h-72 md:h-[500px] lg:h-auto lg:min-h-[700px] rounded-3xl overflow-hidden order-1 lg:order-2 relative shadow-xl">
          <motion.div 
            key={active.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="w-full h-full relative"
          >
            <Image
              src={active.image}
              alt={active.title}
              fill
              className="object-cover"
              priority
              quality={80}
            />
            
            {/* Overlay gradient + label on image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white"
            >
              <p className="text-xs md:text-sm font-bold uppercase tracking-wider text-white/80 mb-2">
                {active.isPrimary ? '★ Primary Action' : 'Secondary'}
              </p>
              <h4 className="text-2xl md:text-3xl font-black leading-tight">
                {active.title}
              </h4>
            </motion.div>
          </motion.div>

          {/* Corner accent */}
          <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-white/30 rounded-tr-lg pointer-events-none" />
        </div>
      </div>
      </div>
    </section>
  );
}
