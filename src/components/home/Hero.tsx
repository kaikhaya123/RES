'use client';

import { motion } from 'framer-motion';
import RippleEffect from '@/components/ui/RippleEffect';

export default function Hero() {
  return (
    <section 
      className="relative min-h-screen flex items-center overflow-hidden"
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
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30 z-10"></div>

      <div className="container mx-auto px-4 md:px-6 lg:px-12 py-20 md:py-32 relative z-20">
        <div className="max-w-4xl">
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight tracking-tight drop-shadow-lg overflow-hidden"
            style={{ WebkitLineClamp: 3, display: '-webkit-box', WebkitBoxOrient: 'vertical' as any }}
          >
            ROOMZA'S EDUCATED SECRET
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-lg lg:text-xl text-white/90 font-medium max-w-xl leading-relaxed tracking-tight drop-shadow-md"
          >
            This is R.E.S. A student reality show that inspires, educates, and rewards. You watch students face real challenges. You see them rise.
          </motion.p>

          {/* Primary CTA */}
          <motion.a
            href="/apply"
            className="mt-6 inline-flex items-center justify-center w-full md:w-auto h-12 bg-brand-yellow text-black font-bold rounded-lg shadow-md px-6"
            whileHover={{ translateY: -2 }}
            aria-label="Apply to compete"
          >
            Apply Now
          </motion.a>
        </div>
      </div>
    </section>
  );
}
