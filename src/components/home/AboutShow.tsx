'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Users, Trophy, Play } from 'lucide-react';
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
    { value: '500', label: 'Campuses Engaged' },
    { value: '2M', label: 'Students to be Reached' }
  ];

  const highlights = [
    'First nationwide online student reality show',
    'Powered by interactive voting, daily quizzes, and live streaming',
    'Open to students from universities, TVET colleges, and private institutions',
    'A platform that amplifies youth voices',
    'Built on education, empowerment, and opportunity',
    'Reaches millions of viewers across South Africa'
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

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24 max-w-2xl mx-auto"
        >
          {stats.map((stat, index) => {
            // Extract numeric value and optional suffix (e.g. "2M", "1.5K", "500")
            const match = stat.value.match(/^([\d,\.]+)([a-zA-Z%]*)$/);
            const numericStr = match ? match[1] : '';
            const suffix = match && match[2] ? match[2] : '';
            const numericValue = numericStr ? parseFloat(numericStr.replace(/,/g, '')) : NaN;
            const hasNumber = !isNaN(numericValue);
             return (
               <motion.div
                 key={index}
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                 className="text-center"
               >
                 <div className="text-4xl lg:text-5xl font-black mb-2 tracking-tight text-white">
                  {hasNumber ? (
                    <span className="flex items-baseline justify-center gap-1">
                      <NumberTicker value={numericValue} duration={2.5} />
                      {suffix && <span className="text-2xl lg:text-3xl font-bold ml-1">{suffix}</span>}
                    </span>
                  ) : (
                    stat.value
                  )}
                 </div>
                 <div className="text-sm text-gray-200 uppercase tracking-wider">{stat.label}</div>
               </motion.div>
             );
           })}
         </motion.div>

        {/* What Makes R.E.S. Unique */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <h3 className="text-white lg:text-4xl font-black mb-12 text-center tracking-tight">
            What Makes R.E.S. <span className="font-light">Unique</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start gap-4 group"
              >
                <div className="w-2 h-2 bg-white rotate-45 mt-2 flex-shrink-0 group-hover:scale-125 transition-transform" />
                <p className="text-white leading-relaxed">{highlight}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Impact Statement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <h3 className="text-3xl lg:text-4xl font-black mb-6 tracking-tight">
            <span className="text-white">Why It <span className="font-light">Matters</span></span>
          </h3>
          <p className="text-xl text-gray-100 leading-relaxed">
            R.E.S. creates opportunities for young people, supports student bursaries, improves campus safety, grows youth entrepreneurship, and brings South Africans together through a shared digital experience.
          </p>
        </motion.div>

        {/* The Experience - Two Column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Students Can */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="border-2 border-white p-8 lg:p-10"
          >
            <div className="flex items-center gap-4 mb-6">
              <Trophy className="w-8 h-8 text-white" strokeWidth={2} />
              <h4 className="text-2xl font-black tracking-tight text-white">Students Can</h4>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-white rotate-45 mt-2 flex-shrink-0" />
                <span className="text-white">Compete in weekly challenges</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-white rotate-45 mt-2 flex-shrink-0" />
                <span className="text-white">Build their profile</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-white rotate-45 mt-2 flex-shrink-0" />
                <span className="text-white">Gain supporters</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-white rotate-45 mt-2 flex-shrink-0" />
                <span className="text-white">Win prizes and opportunities</span>
              </li>
            </ul>
          </motion.div>

          {/* Public Can */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="border-2 border-white p-8 lg:p-10"
          >
            <div className="flex items-center gap-4 mb-6">
              <Users className="w-8 h-8 text-white" strokeWidth={2} />
              <h4 className="text-2xl font-black tracking-tight text-white">Public Can</h4>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-white rotate-45 mt-2 flex-shrink-0" />
                <span className="text-white">Vote daily (free & premium)</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-white rotate-45 mt-2 flex-shrink-0" />
                <span className="text-white">Join livestreams</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-white rotate-45 mt-2 flex-shrink-0" />
                <span className="text-white">Play daily quizzes</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-white rotate-45 mt-2 flex-shrink-0" />
                <span className="text-white">Support their favourite contestant</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-white rotate-45 mt-2 flex-shrink-0" />
                <span className="text-white"><span className="font-bold">Participate in weekly competitions and win prizes</span></span>
              </li>
            </ul>
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
            <h3 className="text-4xl lg:text-5xl font-black mb-4 tracking-tight">
              Join the <span className="font-light">Movement</span>
            </h3>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Register, vote, and become part of South Africa's biggest student show.
            </p>
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
              <span>Meet Contestants</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
