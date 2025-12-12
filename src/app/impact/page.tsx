'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { StaggeredText } from '@/components/ui/staggered-text';

export default function ImpactPage() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative w-full h-[80vh] flex mt-24">
        <div className="absolute inset-0">
          <Image
            src="/Images/friendlylooking-sociable-stylish-woman-with-curly-hair-red-beanie-winking-joyfully-pointi.jpg"
            alt="Impact Hero"
            fill
            className="object-cover"
            priority
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full h-full bg-black bg-opacity-60 flex items-center px-6 md:px-16"
        >
          <div>
            <StaggeredText
              text="Your Story. Your Voice. Your Impact."
              className="text-white text-4xl md:text-6xl font-black leading-tight"
              staggerDirection="top"
              staggerDelay={0.05}
              distance={20}
              duration={0.5}
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-300 text-sm md:text-lg mt-4 max-w-xl"
            >
              See how the platform gives students and communities real opportunities.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="py-16 px-6 md:px-16 bg-dark-bg-soft text-white\">
        <h2 className="text-3xl md:text-4xl font-black mb-10">OUR REACH</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Students Empowered', value: '4 200+' },
            { label: 'Communities Reached', value: '130+' },
            { label: 'Events Hosted', value: '52+' },
            { label: 'Social Engagement', value: '1.8M+' }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              className="bg-warm-stone-secondary rounded-xl p-6 text-center shadow-sm border border-warm-stone-border"
            >
              <p className="text-3xl md:text-4xl font-black">{item.value}</p>
              <p className="text-gray-600 text-sm mt-2">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* STORIES */}
      <section className="py-16 px-6 md:px-16 bg-dark-bg-soft text-white\">
        <h2 className="text-3xl md:text-4xl font-black mb-10">STUDENT STORIES</h2>

        <div className="space-y-16">

          {/* STORY 1 */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row gap-8"
          >
            <div className="relative w-full md:w-1/2 h-64 rounded-xl overflow-hidden">
              <Image
                src="/Images/photo-attractive-young-woman-makes-heart-shape-gesture-face.jpg"
                fill
                className="object-cover"
                alt="Story One"
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-xl md:text-2xl font-bold">EXPOSURE & CONFINDENCE</h3>
              <p className="text-gray-300 text-sm md:text-base mt-3 leading-relaxed\">
                Students gained real visibility through voting, challenges, and live events.
              </p>
            </div>
          </motion.div>

          {/* STORY 2 */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row-reverse gap-8"
          >
            <div className="relative w-full md:w-1/2 h-64 rounded-xl overflow-hidden">
              <Image
                src="/Images/college-students-different-ethnicities-cramming (1).jpg"
                fill
                className="object-cover"
                alt="Story Two"
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-xl md:text-2xl font-bold">COMMUNITY GROWTH</h3>
              <p className="text-gray-600 text-sm md:text-base mt-3 leading-relaxed">
                Students created real influence and connected with followers across campuses.
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* GALLERY */}
      <section className="py-16 px-6 md:px-16 bg-dark-bg-soft text-white\">
        <h2 className="text-3xl md:text-4xl font-black mb-10">GALLERY STUDENT WALL</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            '/Images/stylish-african-american-model-glasses-hat-jeans-jacket-black-skirt-posed-outdoor.jpg',
            '/Images/front-view-smiley-woman-with-pizza.jpg',
            '/Images/women-having-fun-food-festival.jpg',
            '/Images/high-angle-underground-hip-hop-musician.jpg',
            '/Images/divaris-shirichena-GG2t77avvBY-unsplash.jpg',
            '/Images/keira-burton-6146978.jpg'
          ].map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="relative w-full h-48 rounded-lg overflow-hidden"
            >
              <Image src={img} fill className="object-cover" alt="Gallery" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-black px-6 md:px-16 text-center">
        <h2 className="text-white text-3xl md:text-4xl font-black">Be Part of the Change</h2>
        <p className="text-gray-400 text-sm md:text-base mt-2">
          Join and take part in the experience.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <button className="px-6 py-3 bg-black text-white font-semibold rounded-lg">
            Join as Student
          </button>
          <button className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg">
            Join as Public
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
