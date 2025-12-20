'use client';

import { motion } from 'framer-motion';
import RippleEffect from '@/components/ui/RippleEffect';

export default function Hero() {
  return (
    <section 
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: "url('/Images/college-students-different-ethnicities-cramming-min.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
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
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20 z-10"></div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-12 sm:py-16 md:py-32 lg:py-48 relative z-20">
        <div className="max-w-5xl">
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xl sm:text-2xl md:text-4xl lg:text-7xl font-bold text-white mb-2 sm:mb-3 md:mb-6 leading-tight tracking-tight drop-shadow-lg"
          >
            ROOMZA'S EDUCATED SECRET
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xs sm:text-sm md:text-lg lg:text-3xl text-white/90 font-medium max-w-3xl leading-tight sm:leading-snug tracking-tight drop-shadow-md"
          >
            This is R.E.S. A student reality show that inspires, educates, and rewards. You watch students face real challenges. You see them rise. You see them fall. You see them grow.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
