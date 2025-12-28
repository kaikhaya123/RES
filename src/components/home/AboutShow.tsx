'use client';

import { motion, useMotionValue, useTransform, animate, useScroll, useMotionTemplate } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Zap, Flame, Play } from 'lucide-react';
import { useEffect, useRef } from 'react';

function NumberTicker({ value, duration = 2 }: { value: number; duration?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(motionValue, value, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        node.textContent = Math.floor(latest).toString();
      }
    });

    return controls.stop;
  }, [motionValue, value, duration]);

  return <span ref={nodeRef}>0</span>;
}

export default function AboutShow() {
  const stats = [
    { value: '500', label: 'Campuses Engaged Nationwide' },
    { value: '2M', label: 'Students and Youth Reached' }
  ];

  const highlights = [
    { title: 'South Africa\'s first large-scale, interactive student leadership reality platform', description: 'Bringing 20 exceptional students to a national stage where every voice counts.' },
    { title: 'Built on verified voting, daily challenges, quizzes, and live-streamed experiences', description: 'Engagement that rewards participation, knowledge, and community involvement.' },
    { title: 'Open to students from public universities, TVET colleges, and private institutions', description: 'Inclusive by design. Opportunity is not reserved for the few.' },
    { title: 'Designed to develop leadership, innovation, and social responsibility', description: 'Competition that builds character, not just entertainment value.' },
    { title: 'Inspired by the legacy of Robben Island and the journey toward freedom and growth', description: 'Rooted in South African values. Purpose-driven from the start.' },
    { title: 'Engaging millions of viewers across South Africa through web and social platforms', description: 'A digital movement that reaches every corner of the nation.' }
  ];

  return (
    <section className="py-16 md:py-28 lg:py-48 bg-dark-bg-soft relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-12 max-w-7xl relative">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 lg:gap-20 items-stretch mb-12 md:mb-16 lg:mb-20">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 flex flex-col justify-start"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-3 md:mb-4 lg:mb-6"
            >
              <span className="px-3 md:px-5 py-1.5 md:py-2 border-2 border-white text-[10px] md:text-xs uppercase tracking-[0.3em] font-black text-white">
                About the Show
              </span>
            </motion.div>

            {/* Title - Simple animation for LCP optimization */}
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-4xl lg:text-5xl font-black mb-5 tracking-tighter leading-[1.1] text-white"
            >
              The Movement That's Changing Student Life
            </motion.h2>

            {/* Subtitle - Simple animation for better performance */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-lg text-gray-300 mb-6 leading-relaxed font-light"
            >
              South Africa's first digital student reality show celebrating talent, education, resilience, and youth empowerment.
            </motion.p>

            {/* Mission Statement - Optimized animations */}
            <div className="space-y-4 mb-5">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="text-gray-300 text-lg leading-relaxed"
              >
                Roomza's Educated Secret (R.E.S.) is a national student-focused reality competition designed to uplift, empower, and celebrate young people through entertainment, education, and digital participation.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-gray-300 text-lg leading-relaxed"
              >
                Students across the country compete in challenges, the public votes, and millions join the journey through quizzes, livestreams, and social media.
              </motion.p>
            </div>

            {/* Inspiration - Optimized animation */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="border-l-4 border-white pl-6 mb-8"
            >
              <p className="text-gray-200 text-lg leading-relaxed">
                Inspired by the legacy of Robben Island and the values of Nelson Mandela's Long Walk to Freedom, R.E.S. stands as a modern movement that promotes unity, leadership, and transformation through digital storytelling.
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/auth/register"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-brand-yellow text-black font-black text-sm uppercase tracking-[0.15em] hover:bg-yellow-400 transition-all duration-300"
              >
                <span>Register Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/journey"
                className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-brand-yellow text-white font-black text-sm uppercase tracking-[0.15em] hover:bg-brand-yellow hover:text-black transition-all duration-300"
              >
                <span>The Journey</span>
                <Play className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Image with Motion Blur Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative z-0 flex items-center justify-center w-full h-full"
          >
            <div className="relative w-full h-full max-h-[600px] lg:max-h-[700px]">
              {/* Main Image Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.4 }}
                className="relative w-full h-full"
              >
                {/* Placeholder for your image - replace src with actual image path */}
                <div className="relative w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  {/* Uncomment and use this when you add your image */}
                  <Image
                    src="/Images/college-students-different-ethnicities-cramming%20(3)-min.jpg"
                    alt="R.E.S. Students"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={true}
                  />
                  
                  {/* Energy effect overlay */}
                  <motion.div
                    animate={{
                      background: [
                        'radial-gradient(circle at 20% 30%, rgba(0,0,0,0.1) 0%, transparent 50%)',
                        'radial-gradient(circle at 80% 70%, rgba(0,0,0,0.1) 0%, transparent 50%)',
                        'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.1) 0%, transparent 50%)',
                        'radial-gradient(circle at 20% 30%, rgba(0,0,0,0.1) 0%, transparent 50%)',
                      ]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 z-10"
                  />
                </div>

                {/* Motion blur effect frame */}
                <motion.div
                  animate={{
                    x: [0, 10, -10, 0],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 border-4 border-black/20 pointer-events-none"
                  style={{ filter: 'blur(2px)' }}
                />
              </motion.div>

              {/* Decorative corner elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 border-t-4 border-l-4 border-black" />
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-4 border-r-4 border-black" />
            </div>
          </motion.div>
        </div>

        {/* STATS HERO - MASSIVE AND UNAVOIDABLE */}
        <div className="mb-40 relative">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
          >
            {/* Stat 1 - 500 Campuses */}
            <div className="relative overflow-hidden group cursor-default">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative p-12 lg:p-20 bg-gradient-to-br from-white via-white/95 to-white/90 border-2 border-white"
              >
                {/* Animated background elements */}
                <motion.div
                  animate={{ 
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -right-20 -top-20 w-40 h-40 bg-black/5 rounded-full blur-3xl"
                />
                
                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-8xl lg:text-9xl font-black text-black mb-2 leading-none"
                  >
                    500
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-xl lg:text-2xl font-black text-black/70 uppercase tracking-widest"
                  >
                    Campuses Engaged Nationwide
                  </motion.p>
                </div>
              </motion.div>
            </div>

            {/* Stat 2 - 2M Students */}
            <div className="relative overflow-hidden group cursor-default">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative p-12 lg:p-20 bg-gradient-to-br from-white via-white/95 to-white/90 border-2 border-white"
              >
                {/* Animated background elements */}
                <motion.div
                  animate={{ 
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                  className="absolute -left-20 -bottom-20 w-40 h-40 bg-black/5 rounded-full blur-3xl"
                />
                
                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-8xl lg:text-9xl font-black text-black mb-2 leading-none flex items-baseline gap-3"
                  >
                    <span>2</span>
                    <span className="text-5xl lg:text-7xl">M</span>
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-xl lg:text-2xl font-black text-black/70 uppercase tracking-widest"
                  >
                    Students and Youth Reached
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* HERO IMAGE - Scale & Diversity */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-40 relative overflow-hidden rounded-2xl"
        >
          <div className="relative aspect-[4/3] sm:aspect-video lg:aspect-[3/1.5] overflow-hidden group">
            <Image
              src="/Images/college-students-different-ethnicities-cramming%20(4)-min.jpg"
              alt="R.E.S. Students from across South Africa"
              fill
              className="object-cover object-center sm:object-top group-hover:scale-105 transition-transform duration-700"
              sizes="100vw"
              priority={true}
            />
            {/* Overlay for text readability - lighter on mobile */}
            <div className="absolute inset-0 bg-black/40 sm:bg-black/35 lg:bg-black/30 group-hover:bg-black/25 transition-colors" />
            
            {/* Text Overlay - positioned at bottom on mobile */}
            <div className="absolute inset-0 flex items-end sm:items-center justify-center px-3 sm:px-6 pb-8 sm:pb-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-center max-w-3xl"
              >
                <p className="text-2xl sm:text-4xl lg:text-7xl font-black text-white mb-2 sm:mb-6 tracking-tight drop-shadow-2xl leading-tight">
                  THE MOVEMENT ACROSS SOUTH AFRICA
                </p>
                <p className="text-sm sm:text-xl lg:text-3xl text-white/95 drop-shadow-xl font-semibold">
                  From campuses to communities, millions are rising
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* WHAT MAKES R.E.S. UNIQUE - With Integrated Images */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-40"
        >
          <div className="mb-24">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block text-xs font-bold uppercase tracking-widest text-white/60 mb-6"
            >
              The Platform Edge
            </motion.span>
            <h2 className="text-6xl lg:text-7xl font-black mb-6 tracking-tighter text-white">
              What Makes
              <br />
              <span className="text-white">R.E.S.</span>
              <br />
              <span className="text-white/40">Unique</span>
            </h2>
          </div>
          
          <div className="space-y-24">
            {highlights.map((item, index) => {
              const imageMap: { [key: number]: string } = {
                0: '/Images/young-adults-meeting-up-study.jpg',
                1: '/Images/medium-shot-women-holding-smartphones-min.jpg',
                2: '/Images/joy-armani-KAK0jPmDLt8-unsplash-min.jpg',
                3: '/Images/concentrated-young-multiethnic-friends-students-outdoors-studying.jpg',
                4: '/Images/JEMA SVA 005-01.jpg',
                5: '/Images/people-connected-social-media-min.jpg',
                6: '/Images/people-connected-social-media-min.jpg'
              };

              const isEven = index % 2 === 0;
              
              // Vary image aspect ratios: 0,2,4 = portrait (taller), 1,3,5 = square
              const getImageAspect = (idx: number) => {
                if ([0, 2, 4].includes(idx)) return 'lg:aspect-[3/4]'; // Portrait
                return 'lg:aspect-square'; // Square
              };

              // Vary height subtly
              const getImageHeight = (idx: number) => {
                if ([0, 2, 4].includes(idx)) return 'lg:h-[480px]'; // Taller
                return 'lg:h-[400px]'; // Standard
              };
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}
                >
                  {/* Content */}
                  <div className={`${!isEven ? 'lg:col-start-2' : ''}`}>
                    <div className="flex items-start gap-6 mb-6">
                      <div className="text-5xl lg:text-6xl font-black text-white/20">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div>
                        <p className="text-2xl lg:text-3xl text-white font-black leading-tight pt-2 mb-4">
                          {item.title}
                        </p>
                        <motion.p
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                          className="text-base lg:text-lg text-white/50 leading-relaxed max-w-sm"
                        >
                          {item.description}
                        </motion.p>
                      </div>
                    </div>
                  </div>

                  {/* Image with Varied Aspect */}
                  <div className={`relative aspect-square ${getImageAspect(index)} ${getImageHeight(index)} overflow-hidden rounded-xl group ${!isEven ? 'lg:col-start-1' : ''}`}>
                    <Image
                      src={imageMap[index] || '/Images/college-students-different-ethnicities-cramming (3).jpg'}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* WHY IT MATTERS - Bold, Unavoidable Statement */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-40 relative"
        >
          <div className="max-w-4xl">
            <h2 className="text-6xl lg:text-7xl font-black mb-12 tracking-tighter text-white">
              Why It
              <br />
              <span className="text-white/30">Matters</span>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl lg:text-4xl font-black text-white mb-16 leading-tight"
            >
              R.E.S. exists to address real student challenges.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white/[0.03] border border-white/10 p-8 backdrop-blur-sm"
              >
                <div className="text-6xl font-black text-white/20 mb-4">01</div>
                <p className="text-xl text-white font-medium leading-relaxed">
                  Creates access to opportunity
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/[0.03] border border-white/10 p-8 backdrop-blur-sm"
              >
                <div className="text-6xl font-black text-white/20 mb-4">02</div>
                <p className="text-xl text-white font-medium leading-relaxed">
                  Supports bursaries and student development initiatives
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white/[0.03] border border-white/10 p-8 backdrop-blur-sm"
              >
                <div className="text-6xl font-black text-white/20 mb-4">03</div>
                <p className="text-xl text-white font-medium leading-relaxed">
                  Highlights campus safety and accommodation challenges
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white/[0.03] border border-white/10 p-8 backdrop-blur-sm"
              >
                <div className="text-6xl font-black text-white/20 mb-4">04</div>
                <p className="text-xl text-white font-medium leading-relaxed">
                  Promotes entrepreneurship, leadership, and community impact
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="border-l-4 border-white pl-8 py-8"
            >
              <p className="text-2xl text-white font-black leading-tight">
                R.E.S. brings South Africans together through a shared digital experience rooted in 
                <span className="text-white/50"> purpose, not spectacle.</span>
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* THE EXPERIENCE - Dual Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-40">
          {/* FOR STUDENTS - Energetic, Growth Focused */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-12">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <Image
                  src="/Images/classmates.png"
                  alt="Student icon"
                  width={32}
                  height={32}
                  className="object-contain filter brightness-0 invert"
                />
              </div>
              <h3 className="text-5xl lg:text-6xl font-black tracking-tight text-white">
                For
                <br />
                <span className="text-white/40">Students</span>
              </h3>
            </div>

            <div className="space-y-4">
              {[
                "Apply or be nominated to participate",
                "Compete in structured weekly challenges",
                "Develop leadership and innovation skills",
                "Build national visibility and public support",
                "Access mentorship, rewards, and future opportunities"
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex gap-4 items-start p-4 border-l-4 border-white hover:border-white hover:bg-white/5 transition-all group"
                >
                  <span className="text-2xl font-black text-white/40 flex-shrink-0 group-hover:text-white transition-colors">▸</span>
                  <span className="text-lg text-white/80 group-hover:text-white transition-colors font-medium">{item}</span>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-white/60 italic text-sm mt-8 pt-8 border-t border-white/10"
            >
              Participation is designed to grow character, confidence, and impact beyond the show.
            </motion.p>
          </motion.div>

          {/* FOR PUBLIC - Community Driven */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="flex items-center gap-4 mb-12">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <Image
                  src="/Images/queue.png"
                  alt="Public community icon"
                  width={32}
                  height={32}
                  className="object-contain filter brightness-0 invert"
                />
              </div>
              <h3 className="text-5xl lg:text-6xl font-black tracking-tight text-white">
                For
                <br />
                <span className="text-white/40">Public</span>
              </h3>
            </div>

            <div className="space-y-4">
              {[
                "Register and vote daily using verified accounts",
                "Participate in quizzes and weekly competitions",
                "Join live streams and real-time decision moments",
                "Support contestants and community projects",
                "Win rewards through platform engagement"
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex gap-4 items-start p-4 border-r-4 border-white hover:border-white hover:bg-white/5 transition-all group text-right"
                >
                  <span className="text-lg text-white/80 group-hover:text-white transition-colors font-medium">{item}</span>
                  <span className="text-2xl font-black text-white/40 flex-shrink-0 group-hover:text-white transition-colors">◂</span>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-white/60 italic text-sm mt-8 pt-8 border-t border-white/10"
            >
              Every action contributes to the direction and outcome of the show.
            </motion.p>
          </motion.div>
        </div>

        {/* Final CTA with Smooth Scroll Hero Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center bg-black text-white p-12 lg:p-24 relative overflow-hidden min-h-96 flex flex-col justify-center"
        >
          {/* Smooth Scroll Hero Background Effect */}
          <CTAScrollBackground />
          
          <div className="relative z-10">
            <motion.div
              initial={{ y: 48, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ ease: "easeInOut", duration: 0.75 }}
              className="mb-6"
            >
              <h3 className="text-5xl lg:text-7xl font-black mb-6 tracking-tight">
                Join the <span className="font-light">Movement</span>
              </h3>
            </motion.div>
            
            <motion.div
              initial={{ y: 48, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ ease: "easeInOut", duration: 0.75, delay: 0.1 }}
              className="space-y-3 mb-12 max-w-3xl mx-auto"
            >
              <p className="text-2xl lg:text-3xl text-white/95 font-semibold">
                This is more than a show.
              </p>
              <p className="text-2xl lg:text-3xl text-white/95 font-semibold">
                It is a national platform for growth, leadership, and opportunity.
              </p>
              <p className="text-xl lg:text-2xl text-white/80 mt-6">
                Register, participate, and shape the future of South Africa's next leaders.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 48, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.75, delay: 0.2 }}
            className="flex flex-wrap gap-4 justify-center relative z-20"
          >
            <Link
              href="/auth/register"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-brand-yellow text-black font-black text-sm uppercase tracking-[0.15em] hover:bg-yellow-400 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <span>Register Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link
              href="#contestants"
              className="group inline-flex items-center gap-3 px-10 py-5 border-2 border-brand-yellow text-white font-black text-sm uppercase tracking-[0.15em] hover:bg-brand-yellow hover:text-black transition-all duration-300 hover:scale-105"
            >
              <span>Meet the Contestants</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Smooth Scroll Background Component with Parallax
const CTAScrollBackground = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.3, 0.3, 0]);

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        opacity,
        backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="absolute inset-0 z-0 blur-sm"
    />
  );
};
