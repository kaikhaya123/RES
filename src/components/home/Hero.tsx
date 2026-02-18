'use client';

import { motion } from 'framer-motion';
import RippleEffect from '@/components/ui/RippleEffect';

export default function Hero() {
  return (
    <section 
      className="relative min-h-screen flex items-end overflow-hidden"
      style={{
        paddingTop: 'env(safe-area-inset-top, 16px)',
        backgroundImage: "url('/Images/college-students-different-ethnicities-cramming-min.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background Image with Ripple Effect */}
      <RippleEffect
        imageUrl="/Images/college-students-different-ethnicities-cramming-min.jpg"
        intensity={0.4}
        rippleCount={2}
        rippleSize={120}
        rippleInterval={3000}
        interactive={true}
        className="absolute inset-0 z-0"
      />
      
      {/* Overlay for better text readability (increased contrast) */}
      <div className="absolute inset-0 bg-black/40 z-10" />
      {/* subtle left-to-right gradient for desktop readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-11 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 lg:px-0 py-24 lg:py-32 relative z-20">
        <div className="max-w-xl ml-4 md:ml-8 lg:ml-28">
          {/* Main Heading (force mobile break for improved readability) */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-yellow-500 mb-6 md:mb-8 leading-tight tracking-tight drop-shadow-lg overflow-hidden"
            style={{ WebkitLineClamp: 3, display: '-webkit-box', WebkitBoxOrient: 'vertical' as any }}
          >
            ROOMZA'S{" "}
            <br className="hidden md:block" />
            EDUCATED SECRET
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-lg lg:text-xl text-white/90 font-medium max-w-[90%] sm:max-w-[420px] md:max-w-[600px] leading-relaxed md:leading-loose tracking-tight drop-shadow-md"
          >
            This is R.E.S. — the game-changing reality show built to inspire, educate and reward. Join the movement and watch the youth tackle real challenges, rise, fall, and level up.
          </motion.p>

          {/* Apply CTA removed */}
        </div>
      </div>
    </section>
  );
}
