'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Award, Handshake, Sparkles, TrendingUp, Zap } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

export default function Sponsors() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax transforms
  const yTitle = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const ySponsors = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Auto-scroll carousel state
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Sponsor tiers
  const titleSponsor = {
    name: 'Title Sponsor',
    tier: 'PLATINUM PARTNER',
    description: 'Leading the charge in empowering South African students through education, innovation, and opportunity.',
    investment: 'R5M+ Investment',
    benefits: ['Prime Branding', 'Exclusive Access', 'Media Coverage']
  };

  const premiumSponsors = [
    { name: 'Premium Partner', tier: 'GOLD', industry: 'Technology' },
    { name: 'Premium Partner', tier: 'GOLD', industry: 'Finance' },
    { name: 'Premium Partner', tier: 'GOLD', industry: 'Telecommunications' },
    { name: 'Premium Partner', tier: 'GOLD', industry: 'Retail' }
  ];

  const supportingSponsors = [
    'Supporting Partner',
    'Supporting Partner',
    'Supporting Partner',
    'Supporting Partner',
    'Supporting Partner',
    'Supporting Partner',
    'Supporting Partner',
    'Supporting Partner'
  ];

  // Auto-scroll effect for supporting sponsors
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % supportingSponsors.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [supportingSponsors.length]);

  return (
    <section ref={sectionRef} className="py-32 lg:py-40 bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'linear-gradient(black 1px, transparent 1px), linear-gradient(90deg, black 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />
      </div>

      {/* Subtle abstract shapes for depth */}
      <motion.div style={{ y: yTitle }} className="absolute top-36 right-8 w-28 h-28 border-2 border-black/6 rounded-md rotate-12 opacity-40" />

      <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative">
        {/* Section Header with Parallax (clean and focused) */}
        <motion.div style={{ y: yTitle, opacity }} className="text-center mb-24">
          {/* Decorative Lines */}
          <div className="flex items-center justify-center gap-6 mb-10">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="h-[1px] w-20 lg:w-32 bg-black origin-right"
            />
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 150 }}
              className="w-2 h-2 bg-black rotate-45"
            />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="h-[1px] w-20 lg:w-32 bg-black origin-left"
            />
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }} className="inline-flex items-center gap-2 px-4 py-2 border border-black/10 rounded mb-6">
            <Handshake className="w-4 h-4 text-gray-600" />
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-gray-600">Powered By</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl lg:text-8xl font-black mb-6 tracking-tighter section-title"
          >
            Our <span className="font-light">Partners</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Building South Africa's future with visionary brands committed to student excellence.
          </motion.p>
        </motion.div>

        {/* Title Sponsor - Large Featured */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-24">
          <div className="relative group">
            <div className="bg-black p-12 lg:p-16 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-[0.03]">
                <div className="absolute inset-0" style={{ 
                  backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
                  backgroundSize: '40px 40px'
                }} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
                {/* Left: Logo */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="relative"
                >
                  <div className="aspect-[3/2] bg-white flex items-center justify-center relative overflow-hidden group-hover:shadow-lg transition-shadow duration-400">
                    {/* Placeholder logo (clean, centered) */}
                    <div className="w-40 h-40 flex items-center justify-center">
                      <Award className="w-20 h-20 text-gray-300" strokeWidth={1} />
                    </div>
                    
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-black" />
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-black" />
                  </div>

                  {/* Tier badge */}
                  <div className="absolute -top-4 -right-4 px-4 py-2 bg-white border-2 border-black">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-xs font-black uppercase tracking-wider">{titleSponsor.tier}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Right: Description */}
                <div className="text-white">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <div className="inline-block px-4 py-1 border border-white/30 mb-6">
                      <span className="text-xs uppercase tracking-[0.25em] font-bold">{titleSponsor.name}</span>
                    </div>

                    <h3 className="text-3xl lg:text-4xl font-black mb-6 tracking-tight">
                      Empowering <span className="font-light">Tomorrow's</span> Leaders
                    </h3>

                    <p className="text-white/70 mb-8 leading-relaxed">
                      {titleSponsor.description}
                    </p>

                    {/* Benefits */}
                    <div className="space-y-3 mb-8">
                      {titleSponsor.benefits.map((benefit, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <div className="w-1 h-1 bg-white rotate-45" />
                          <span className="text-sm font-bold">{benefit}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Investment */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm font-black">{titleSponsor.investment}</span>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-white/10" />
            </div>
          </div>
        </motion.div>

        {/* Premium Sponsors Grid */}
        <motion.div style={{ y: ySponsors }} className="mb-32">
          <div className="flex items-center gap-3 mb-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-2 h-2 bg-black rotate-45"
            />
            <h3 className="text-2xl font-black tracking-tight">Premium Partners</h3>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-black/20 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {premiumSponsors.map((sponsor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <div className="border-2 border-black p-8 relative bg-white hover:shadow-xl transition-all duration-500">
                  {/* Logo placeholder */}
                  <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 mb-6 flex items-center justify-center relative overflow-hidden">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      <Award className="w-16 h-16 text-gray-300" strokeWidth={1} />
                    </motion.div>

                    {/* Tier badge */}
                    <div className="absolute top-2 right-2 px-2 py-1 bg-black text-white text-xs font-black">
                      {sponsor.tier}
                    </div>
                  </div>

                  {/* Info */}
                  <h4 className="text-lg font-bold mb-2 tracking-tight">{sponsor.name}</h4>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-4">{sponsor.industry}</p>

                  {/* Hover indicator */}
                  <div className="flex items-center gap-2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>View Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>

                  {/* Corner accent */}
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-black" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Supporting Sponsors - Auto-scroll Carousel */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-20">
          <div className="flex items-center gap-3 mb-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-2 h-2 bg-black rotate-45"
            />
            <h3 className="text-2xl font-black tracking-tight">Supporting Partners</h3>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-black/20 to-transparent" />
          </div>

          {/* Carousel container */}
          <div className="relative overflow-hidden">
            <motion.div animate={{ x: `-${currentIndex * 20}%` }} transition={{ duration: 0.8, ease: "easeInOut" }} className="flex gap-6">
              {supportingSponsors.map((sponsor, index) => (
                <motion.div key={index} className="min-w-[200px] md:min-w-[220px] lg:min-w-[240px]" whileHover={{ scale: 1.03 }}>
                  <div className="aspect-square border border-gray-100 bg-white p-6 flex items-center justify-center hover:shadow-md transition-all duration-300 group">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center text-gray-400">
                        <Zap className="w-6 h-6" strokeWidth={1.5} />
                      </div>
                      <p className="text-xs font-semibold text-gray-600 transition-colors">{sponsor}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Gradient overlays */}
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none" />
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex items-center justify-center gap-6 mb-20"
        >
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-black to-transparent" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-2 h-2 bg-black rotate-45 flex-shrink-0"
          />
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-black to-transparent" />
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h3 className="text-4xl lg:text-5xl font-black mb-6 tracking-tight">
            Become a <span className="font-light">Partner</span>
          </h3>
          
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join South Africa's most innovative brands in shaping the future of student excellence.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/sponsors/partner"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-black text-white font-black text-sm uppercase tracking-[0.15em] hover:bg-gray-800 transition-all duration-300"
            >
              <span>Partner With Us</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </Link>
            
            <Link
              href="/sponsors/info"
              className="group inline-flex items-center gap-3 px-10 py-5 border-2 border-black text-black font-black text-sm uppercase tracking-[0.15em] hover:bg-black hover:text-white transition-all duration-300"
            >
              <span>View Packages</span>
            </Link>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-gray-400 text-sm mt-10"
          >
            Partnership opportunities from R500K • Multiple investment tiers available
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
