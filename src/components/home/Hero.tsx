'use client';

import { motion } from 'framer-motion';
import RippleEffect from '@/components/ui/RippleEffect';

export default function Hero() {
  return (
    <section 
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: "url('/Images/360_F_452934931_bGlXLhU6zcsxwHhLC98VJ9vbgYKBViUi.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background Image with Ripple Effect */}
      <RippleEffect
        imageUrl="/Images/360_F_452934931_bGlXLhU6zcsxwHhLC98VJ9vbgYKBViUi.jpg"
        intensity={0.4}
        rippleCount={2}
        rippleSize={120}
        rippleInterval={3000}
        interactive={true}
        className="absolute inset-0 z-0"
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30 z-10"></div>

      <div className="container mx-auto px-6 lg:px-12 py-32 relative z-20">
        <div className="max-w-4xl">
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-lg"
          >
            ROOMZA'S EDUCATED SECRET
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl lg:text-2xl text-white/90 font-medium max-w-2xl leading-snug tracking-tight drop-shadow-md"
          >
            South Africa's first student reality show empowering 20 students over 6 weeks to transform lives through education and leadership
          </motion.p>
        </div>
      </div>
    </section>
  );
}
