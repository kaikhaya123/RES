'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function HowItWorks() {
  const steps = [
    {
      title: 'Student Registration',
      subtitle: 'EDUCATIONAL OPPORTUNITIES',
      description: 'Students register for the competition to showcase their talents and compete for educational scholarships and prizes.',
      image: '/Images/intercultural-friends-looking-map-together.jpg',
      link: '/auth/register',
      linkText: 'Our platform',
    },
    {
      title: 'Voting System',
      subtitle: 'PUBLIC ENGAGEMENT',
      description: 'Public votes for their favorite contestants up to 100 times daily. Vote counts determine weekly eliminations and final winners.',
      image: '/Images/download (8).jpg',
      link: '/vote',
      linkText: 'Vote now',
    },
    {
      title: 'Live Streaming',
      subtitle: 'REAL-TIME VIEWING',
      description: 'Live streaming across multiple social platforms allows viewers to follow contestant journeys and daily activities in real-time.',
      image: '/Images/play-2935460_1280.png',
      link: '/stream',
      linkText: 'Watch live',
    },
  ];

  return (
    <section className="bg-white-50 py-16 lg:py-20">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
            How RES works
          </h2>
          <p className="text-lg text-gray-500 font-light max-w-2xl">
            One platform that guides student competition and informs leadership decisions
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="flex flex-col"
            >
              {/* Single Large Image */}
              <div className="relative w-full h-80 lg:h-96 mb-8 rounded-xl overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow">
                <h3 className="text-xl font-normal text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-xs font-medium text-blue-500 uppercase tracking-wider mb-4">
                  {step.subtitle}
                </p>
                <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
                  {step.description}
                </p>
                
                {/* Button Link */}
                <Link 
                  href={step.link}
                  className="inline-block w-fit px-6 py-3 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
                >
                  {step.linkText}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
