'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Trophy, Users, ArrowRight, Calendar } from 'lucide-react';

export default function Contestants() {
  const stats = [
    { value: '0', label: 'Active Contestants', sublabel: 'Spots Opening Soon' },
    { value: 'TBA', label: 'Competition Start', sublabel: 'Registration Coming Soon' },
    { value: 'R50K+', label: 'Prize Pool', sublabel: 'Scholarships & Rewards' }
  ];

  return (
    <section className="py-32 lg:py-40 bg-black text-white relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />
      </div>

      <div className="container mx-auto px-6 lg:px-12 max-w-5xl relative">
        {/* Header with decorative lines */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <div className="flex items-center justify-center gap-6 mb-10">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="h-[1px] w-20 lg:w-32 bg-white origin-right"
            />
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 150 }}
              className="w-2 h-2 bg-white rotate-45"
            />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="h-[1px] w-20 lg:w-32 bg-white origin-left"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="inline-block px-6 py-2 border border-white/20 mb-8"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-white/60 font-bold">Coming Soon</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-5xl lg:text-7xl font-black mb-6 tracking-tighter section-title"
          >
            Meet The <span className="">Contestants</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed"
          >
            Our platform is launching soon with South Africa's brightest students competing for scholarships and recognition.
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 1.1 + index * 0.15 }}
              className="border border-white/10 p-8 lg:p-10 text-center relative group hover:border-white/30 transition-colors duration-300"
            >
              {/* Corner decoration */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/40" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/40" />
              
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1.3 + index * 0.15 }}
              >
                <div className="text-6xl font-black mb-3 tracking-tight">{stat.value}</div>
                <div className="text-sm uppercase tracking-[0.2em] text-white/90 mb-2 font-bold">
                  {stat.label}
                </div>
                <div className="text-xs text-white/50">{stat.sublabel}</div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.8 }}
          className="flex items-center justify-center gap-6 mb-16"
        >
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-2 h-2 bg-white rotate-45 flex-shrink-0"
          />
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 2 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <Users className="w-8 h-8" strokeWidth={1.5} />
            <Trophy className="w-8 h-8" strokeWidth={1.5} />
            <Calendar className="w-8 h-8" strokeWidth={1.5} />
          </div>

          <h3 className="text-3xl font-black mb-4 tracking-tight">
            Be Part of the Journey
          </h3>
          
          <p className="text-white/70 mb-10 max-w-xl mx-auto">
            Register now to be notified when contestants are announced and voting opens.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/register"
              className="group/btn relative px-8 py-4 bg-white text-black font-black text-sm uppercase tracking-[0.15em] hover:bg-white/90 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">Register Interest</span>
              <motion.div
                className="absolute inset-0 bg-black"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 opacity-0 group-hover/btn:opacity-100 transition-opacity">Register Interest</span>
            </Link>
            
            <Link
              href="/about"
              className="group/link inline-flex items-center gap-3 px-8 py-4 border border-white/30 text-white font-black text-sm uppercase tracking-[0.15em] hover:border-white hover:bg-white/5 transition-all duration-300"
            >
              <span>Learn More</span>
              <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 2.3 }}
            className="text-white/40 text-sm mt-12"
          >
            Competition details and contestant announcements coming soon
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
