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
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background Image with subtle Ripple Effect (kept subtle to avoid distraction) */}
      <RippleEffect
        imageUrl="/Images/college-students-different-ethnicities-cramming-min.jpg"
        intensity={0.18}
        rippleCount={1}
        rippleSize={90}
        rippleInterval={4000}
        interactive={false}
        className="absolute inset-0 z-0"
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30 z-10"></div>

      <div className="container mx-auto px-6 lg:px-12 py-32 relative z-20">
        <div className="max-w-4xl">
          {/* Main Heading (short and powerful) */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight tracking-tight drop-shadow-lg"
          >
            Roomza's Educated Secret
          </motion.h1>

          {/* Short punchy subtitle + CTA */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="text-lg md:text-xl text-white/95 font-medium max-w-xl leading-snug"
          >
            Vote. Compete. Win. Support students — real prizes, real impact.
          </motion.p>

          <div className="mt-6 flex flex-wrap gap-3 items-center">
            <a href="/vote" className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg">Vote Now</a>
            <a href="/about" className="inline-block border border-white/20 text-white/90 px-5 py-3 rounded-lg">Learn How</a>
            <div className="text-sm text-white/80 ml-3">Join thousands — live shows & prizes</div>
          </div>
        </div>
      </div>
    </section>
  );
}
