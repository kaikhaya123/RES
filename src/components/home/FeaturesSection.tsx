'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Image from 'next/image';

export default function FeaturesSection() {
  const features = [
    {
      id: 1,
      title: 'Vote for Contestants',
      description: 'Use your account to vote for your favourite contestant in real time.',
      image: '/Images/VOTE (1).jpg',
      lottie: 'Election concept Lottie JSON animation.lottie'
    },
    {
      id: 2,
      title: 'Watch Live Streaming',
      description: 'Catch daily live feeds and stay updated with drama and highlights.',
      image: '/Images/Live Neon Sign, Live LED Light, Live Logo Neon Wall Art, Broadcast Wall Art, Live Show LED Sign, Custom Neon Sign, News Channel Wall Art,.png',
      lottie: 'Live Streaming.lottie'
    },
    {
      id: 3,
      title: 'Participate in Challenges',
      description: 'Compete in weekly challenges and boost your chances to win rewards.',
      image: '/Images/download (18).png',
      lottie: 'Rewards Programme.lottie'
    },
    {
      id: 4,
      title: 'Nominate a Contestant',
      description: 'Refer your friends and nominate them as contestants in the competition.',
      image: '/Images/KSENIIA FAST.png',
      lottie: 'referral.lottie'
    },
    {
      id: 5,
      title: 'Take the Quiz',
      description: 'Test your knowledge with fun trivia and win extra points.',
      image: '/Images/download (17) (1).jpg',
      lottie: 'Funny brain.lottie'
    },
    {
      id: 6,
      title: 'Win Exclusive Prizes',
      description: 'Stand a chance to win exclusive prizes by completing tasks.',
      image: '/Images/Download UEFA Champion Celebration Design for free.png',
      lottie: 'Champion.lottie'
    }
  ];

  const [active, setActive] = useState(features[0]);

  return (
    <section className="w-full py-12 md:py-20 px-4 md:px-6 lg:px-16">
      <h2 className="text-3xl md:text-4xl font-black mb-2 md:mb-3">
        How You Participate
      </h2>
      <p className="text-gray-600 text-sm md:text-base mb-8 md:mb-10 max-w-2xl leading-relaxed">
        Explore every way you can join, vote, compete and win inside the platform.
      </p>

      {/* Desktop: Flex layout | Mobile: Stacked */}
      <div className="flex flex-col lg:flex-row gap-6 md:gap-10 lg:gap-14 items-stretch">
        
        {/* LEFT SIDE LIST */}
        <div className="space-y-3 md:space-y-5 flex-1 order-2 lg:order-1">
          {features.map(feature => (
            <motion.div
              key={feature.id}
              onClick={() => setActive(feature)}
              whileHover={{ scale: 1.02 }}
              className={`p-4 md:p-5 rounded-xl md:rounded-2xl cursor-pointer transition-all border 
                ${active.id === feature.id ? 'border-black bg-gray-100' : 'border-gray-300'}`}
            >
              <div className="flex items-start md:items-center gap-3 md:gap-4">
                
                {/* Small micro Lottie icon - Larger on mobile for clarity */}
                <div className="w-14 h-14 md:w-12 md:h-12 flex-shrink-0">
                  <DotLottieReact
                    src={`/lottie-files/${feature.lottie}`}
                    autoplay
                    loop
                    style={{
                      width: '100%',
                      height: '100%',
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                    }}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-base md:text-lg font-bold leading-tight">{feature.title}</h3>
                  <p className="text-gray-600 text-xs md:text-sm leading-snug mt-1">{feature.description}</p>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* RIGHT SIDE IMAGE - FULL HEIGHT BORDERLESS */}
        <div className="relative flex-1 h-64 md:h-96 lg:h-auto lg:min-h-[550px] rounded-none overflow-hidden shadow-none order-1 lg:order-2">
                  <motion.div 
            key={active.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
                  >
                    <Image
              src={active.image}
              alt="Feature"
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>
              </div>
      </div>
    </section>
  );
}
