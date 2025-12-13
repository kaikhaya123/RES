'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Zap, Flame, Play } from 'lucide-react';
import { useEffect, useRef } from 'react';
import AnimatedTextReveal from '@/components/ui/animated-text-reveal';

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
    'South Africa\'s first large-scale, interactive student leadership reality platform',
    'Built on verified voting, daily challenges, quizzes, and live-streamed experiences',
    'Open to students from public universities, TVET colleges, and private institutions',
    'Designed to develop leadership, innovation, and social responsibility',
    'Inspired by the legacy of Robben Island and the journey toward freedom and growth',
    'Engaging millions of viewers across South Africa through web and social platforms'
  ];

  return (
    <section className="py-32 lg:py-40 bg-dark-bg-soft relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-8"
            >
              <span className="px-4 py-2 border-2 border-white text-xs uppercase tracking-[0.3em] font-black text-white">
                About the Show
              </span>
            </motion.div>

            {/* Title with Animated Reveal */}
            <AnimatedTextReveal 
              text="The Movement That's Changing Student Life"
              tag="h2"
              className="text-5xl lg:text-6xl font-black mb-6 tracking-tighter leading-[1.1]"
              fontSize={60}
              lineHeight={1.1}
              color="#FFFFFF"
              initialBlur={0}
              initialOpacity={0.2}
              fadeDelay={0.05}
              fadeDuration={0.6}
              fullRevealDistance={0.6}
            />

            {/* Subtitle with Animated Reveal */}
            <AnimatedTextReveal 
              text="South Africa's first digital student reality show celebrating talent, education, resilience, and youth empowerment."
              tag="p"
              className="text-xl text-gray-300 mb-8 leading-relaxed font-light"
              fontSize={20}
              lineHeight={1.6}
              color="#D1D5DB"
              initialBlur={0}
              initialOpacity={0.3}
              fadeDelay={0.04}
              fadeDuration={0.5}
              fullRevealDistance={0.5}
            />

            {/* Mission Statement with Animated Reveal */}
            <div className="space-y-6 mb-8">
              <AnimatedTextReveal 
                text="Roomza's Educated Secret (R.E.S.) is a national student-focused reality competition designed to uplift, empower, and celebrate young people through entertainment, education, and digital participation."
                tag="p"
                className="text-gray-300 text-lg leading-relaxed"
                fontSize={18}
                lineHeight={1.6}
                color="#D1D5DB"
                initialBlur={0}
                initialOpacity={0.3}
                fadeDelay={0.03}
                fadeDuration={0.5}
                fullRevealDistance={0.5}
              />
              <AnimatedTextReveal 
                text="Students across the country compete in challenges, the public votes, and millions join the journey through quizzes, livestreams, and social media."
                tag="p"
                className="text-gray-300 text-lg leading-relaxed"
                fontSize={18}
                lineHeight={1.6}
                color="#D1D5DB"
                initialBlur={0}
                initialOpacity={0.3}
                fadeDelay={0.03}
                fadeDuration={0.5}
                fullRevealDistance={0.5}
              />
            </div>

            {/* Inspiration with Animated Reveal */}
            <div className="border-l-4 border-white pl-6 mb-8">
              <AnimatedTextReveal 
                text="Inspired by the legacy of Robben Island and the values of Nelson Mandela's Long Walk to Freedom, R.E.S. stands as a modern movement that promotes unity, leadership, and transformation through digital storytelling."
                tag="p"
                className="text-gray-200 text-lg leading-relaxed"
                fontSize={18}
                lineHeight={1.6}
                color="#D1D5DB"
                initialBlur={0}
                initialOpacity={0.3}
                fadeDelay={0.03}
                fadeDuration={0.5}
                fullRevealDistance={0.5}
              />
            </div>

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
            className="relative"
          >
            <div className="relative aspect-[4/5] lg:aspect-[3/4]">
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
                    src="/Images/college-students-different-ethnicities-cramming (3).jpg"
                    alt="R.E.S. Students"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
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
          <div className="relative aspect-video lg:aspect-[3/1.5] overflow-hidden group">
            <Image
              src="/Images/college-students-different-ethnicities-cramming (4).jpg"
              alt="R.E.S. Students from across South Africa"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="100vw"
            />
            {/* Overlay for text readability */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/25 transition-colors" />
            
            {/* Text Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-center"
              >
                <p className="text-4xl lg:text-5xl font-black text-white mb-4">
                  The Movement Across South Africa
                </p>
                <p className="text-xl text-white/90">
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
            <h2 className="text-6xl lg:text-7xl font-black mb-6 tracking-tighter">
              What Makes
              <br />
              <span className="text-white">R.E.S.</span>
              <br />
              <span className="text-white/40">Unique</span>
            </h2>
          </div>
          
          <div className="space-y-24">
            {highlights.map((highlight, index) => {
              const imageMap: { [key: number]: string } = {
                0: '/Images/young-adults-meeting-up-study.jpg',
                1: '/Images/remote-employee-home-office-desk-editing-documents-tablet.jpg',
                2: '/Images/4183677.jpg',
                3: '/Images/person-pressing-buzzer.jpg',
                4: '/Images/still-life-betrayal-concept.jpg',
                5: '/Images/cheerful-women-holding-trophy-icon.jpg'
              };

              const isEven = index % 2 === 0;
              
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
                      <p className="text-2xl lg:text-3xl text-white font-black leading-tight pt-2">
                        {highlight}
                      </p>
                    </div>
                  </div>

                  {/* Image */}
                  <div className={`relative aspect-square lg:aspect-auto lg:h-96 overflow-hidden rounded-xl group ${!isEven ? 'lg:col-start-1' : ''}`}>
                    <Image
                      src={imageMap[index] || '/Images/college-students-different-ethnicities-cramming (3).jpg'}
                      alt={highlight}
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
            <h2 className="text-6xl lg:text-7xl font-black mb-12 tracking-tighter">
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
              <div className="p-3 bg-white/10 rounded-lg">
                <Zap className="w-8 h-8 text-white" strokeWidth={2.5} />
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
              <div className="p-3 bg-white/10 rounded-lg">
                <Flame className="w-8 h-8 text-white" strokeWidth={2.5} />
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

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center bg-black text-white p-12 lg:p-16 relative overflow-hidden"
        >
          {/* Background image */}
          <Image
            src="/Images/hipster-freedom-youth-teenager-graphic-word.jpg"
            alt="Join the Movement Background"
            fill
            className="object-cover object-center absolute inset-0 z-0 opacity-30 pointer-events-none"
            sizes="100vw"
            priority
          />
          <div className="relative z-10">
            <h3 className="text-4xl lg:text-5xl font-black mb-6 tracking-tight">
              Join the <span className="font-light">Movement</span>
            </h3>
            <div className="space-y-2 mb-8 max-w-2xl mx-auto">
              <p className="text-xl text-white/90">
                This is more than a show.
              </p>
              <p className="text-xl text-white/90">
                It is a national platform for growth, leadership, and opportunity.
              </p>
              <p className="text-xl text-white/80 mt-4">
                Register, participate, and shape the future of South Africa's next leaders.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/auth/register"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-brand-yellow text-black font-black text-sm uppercase tracking-[0.15em] hover:bg-yellow-400 transition-all duration-300"
            >
              <span>Register Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#contestants"
              className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-brand-yellow text-white font-black text-sm uppercase tracking-[0.15em] hover:bg-brand-yellow hover:text-black transition-all duration-300"
            >
              <span>Meet the Contestants</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
