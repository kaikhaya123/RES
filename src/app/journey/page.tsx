'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const steps = [
  {
    number: '01',
    title: 'Apply',
    description:
      'Students from campuses across South Africa apply to enter the competition.',
    icon: '/Images/accept.png',
    image: '/Images/back-view-young-people-walking-street.jpg'
  },
  {
    number: '02',
    title: 'Selection',
    description:
      'Twenty students are selected based on potential, drive, and diversity.',
    icon: '/Images/recruitment.png',
    image: '/Images/gender-fluid-people-posing.jpg'
  },
  {
    number: '03',
    title: 'Compete',
    description:
      'Weekly challenges test leadership, creativity, intelligence, and resilience.',
    icon: '/Images/compete.png',
    image: '/Images/college-students-different-ethnicities-cramming (8).jpg'
  },
  {
    number: '04',
    title: 'Public Voting',
    description:
      'The nation votes. Every vote shapes the journey and the outcome.',
    icon: '/Images/election.png',
    image: '/Images/woman-using-her-mobile-phone-city-skyline-night-light-background.jpg'
  },
  {
    number: '05',
    title: 'Victory',
    description:
      'Winners gain recognition, opportunities, and national exposure.',
    icon: '/Images/victory.png',
    image: '/Images/people-traveling-subway-winter-time.jpg'
  }
];

export default function JourneyPage() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-brand-yellow text-black">
      <Navbar />

      <main className="flex-1">
        {/* HERO WITH BACKGROUND IMAGE */}
        <section 
          className="relative min-h-screen flex items-center overflow-hidden"
          style={{
            backgroundImage: "url('/Images/6759.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'scroll',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60" />
          
          {/* Content */}
          <div className="absolute bottom-0 left-0 z-10 px-6 py-8 lg:px-12 lg:py-12 w-full">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white drop-shadow-xl m-0"
            >
              The Journey
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-white text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl drop-shadow-lg m-0"
            >
              From application to national recognition.  
              Every step is designed to unlock real opportunity.
            </motion.p>
          </div>
        </section>

        {/* STEPS */}
        <section className="space-y-28 px-6 lg:px-16 pt-20 lg:pt-32 pb-32 lg:pb-40 max-w-7xl mx-auto">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`flex flex-col lg:flex-row ${
                  isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } items-center gap-12`}
              >
                {/* IMAGE */}
                <div className="relative w-full lg:w-1/2 h-[350px] lg:h-[480px] overflow-hidden rounded-3xl shadow-lg">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                </div>

                {/* CONTENT */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="text-5xl font-black text-black">
                      {step.number}
                    </span>
                    <div className="relative w-12 h-12">
                      <Image
                        src={step.icon}
                        alt={step.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <h2 className="text-3xl lg:text-4xl font-bold text-black">
                    {step.title}
                  </h2>

                  <p className="text-black max-w-md text-lg leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </section>

        {/* FINAL CTA */}
        <section className="px-6 lg:px-16 py-32 lg:py-40 text-center bg-gradient-to-b from-brand-yellow to-brand-yellow/90">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-8">
              This is more than a show.
            </h3>
            <p className="mt-6 text-black max-w-2xl mx-auto text-lg md:text-xl lg:text-2xl leading-relaxed">
              It is a platform.  
              A test of character.  
              A launchpad for the future.
            </p>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
