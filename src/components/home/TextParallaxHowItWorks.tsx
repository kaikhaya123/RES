'use client';

import React, { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

interface StepProps {
  imgUrl: string;
  step: string;
  title: string;
  description: string;
  cta?: boolean;
}

const steps: StepProps[] = [
  {
    imgUrl: "/Images/vertical-shot-curly-haired-millennial-girl-sits-crossed-legs-uses-mobile-phone-laptop-computer-connected-wireless-min.jpg",
    step: "Step 1",
    title: "Register and Verify",
    description:
      "Create your account. Verify your identity. This ensures fair play, real people, and a trusted national platform."
  },
  {
    imgUrl: "/Images/person-pressing-buzzer-min.jpg",
    step: "Step 2",
    title: "Apply or Get Nominated",
    description:
      "Apply directly or get nominated by the public. Your story, ambition, and drive put you in the spotlight."
  },
  {
    imgUrl: "/Images/front-view-women-pressing-buzzer-min.jpg",
    step: "Step 3",
    title: "Vote and Play Daily",
    description:
      "Engage every day. Free votes, quizzes, and live rankings. Every action shapes the leaderboard."
  },
  {
    imgUrl: "/Images/african-american-woman-watching-streaming-service.jpg",
    step: "Step 4",
    title: "Watch Live. Vote Live.",
    description:
      "The show streams in real time. The nation votes in real time. Decisions happen live."
  },
  {
    imgUrl: "/Images/still-life-betrayal-concept-min.jpg",
    step: "Step 5",
    title: "Growth Beyond Elimination",
    description:
      "No one leaves empty-handed. Contestants transition into leadership development, mentorship, and skills training."
  },
  {
    imgUrl: "/Images/cheerful-women-holding-trophy-icon-min.jpg",
    step: "Step 6",
    title: "Win and Create Impact",
    description:
      "Finalists earn bursaries, exposure, and funding to launch projects that uplift communities.",
    cta: true
  }
];

export default function HowItWorksSection() {
  return (
    <div className="bg-black">
      {steps.map((item, index) => (
        <StepSection key={index} {...item} index={index} />
      ))}

      <TrustSection />
    </div>
  );
}

function StepSection({ imgUrl, step, title, description, cta, index }: StepProps & { index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <section ref={ref} className="relative min-h-screen px-4 py-20 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image Column */}
          <motion.div
            style={{ opacity, scale }}
            className="order-2 md:order-1 h-[400px] md:h-[500px] rounded-3xl overflow-hidden"
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${imgUrl})` }}
            />
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-1 md:order-2 space-y-6"
          >
            <div>
              <p className="text-brand-yellow font-bold tracking-widest text-sm md:text-base mb-2">
                {step}
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                {title}
              </h2>
            </div>

            <p className="text-lg md:text-xl text-white/80 leading-relaxed">
              {description}
            </p>

            {cta && (
              <motion.a
                href="/challenges"
                className="inline-flex items-center gap-3 bg-brand-yellow px-8 md:px-10 py-3 md:py-4 text-black font-bold rounded-lg hover:opacity-90 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Journey
                <FiArrowUpRight />
              </motion.a>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="bg-brand-yellow px-6 py-20 md:py-32">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-black mb-4">
            Built on Trust
          </h2>
          <div className="w-24 h-1 bg-black rounded-full" />
        </div>

        {/* Trust Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-20">
          {/* Feature 1 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-black text-black">
                Verified and Secure
              </h3>
              <p className="text-black text-lg leading-relaxed">
                Identity verification, fraud prevention, and transparent systems protect every vote and every participant.
              </p>
            </div>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-black text-black">
                Transparent by Design
              </h3>
              <p className="text-black text-lg leading-relaxed">
                Public rules. Public outcomes. No manipulation. Leadership earned in the open.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="w-full h-1 bg-black/30 my-16 rounded-full" />

        {/* Bottom Message Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl"
        >
          <h3 className="text-4xl md:text-5xl font-black text-black leading-tight mb-6">
            Your voice shapes the future.
          </h3>
          <p className="text-xl md:text-2xl text-black/90 font-semibold leading-relaxed">
            This is more than a show. It is a national movement.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
