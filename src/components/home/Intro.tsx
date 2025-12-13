'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function IntroSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure muted + inline attributes for mobile autoplay reliability
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    let mounted = true;

    const tryPlay = async () => {
      if (!mounted || !video) return;
      try {
        await video.play();
      } catch (err) {
        // Autoplay blocked — we'll attempt again on the next user interaction.
      }
    };

    // Try to start autoplay immediately.
    tryPlay();

    const onUserInteraction = async () => {
      await tryPlay();
      document.removeEventListener('touchstart', onUserInteraction);
      document.removeEventListener('click', onUserInteraction);
    };

    // Some mobile browsers require a user gesture; listen for interaction as a fallback.
    document.addEventListener('touchstart', onUserInteraction, { passive: true });
    document.addEventListener('click', onUserInteraction);

    return () => {
      mounted = false;
      document.removeEventListener('touchstart', onUserInteraction);
      document.removeEventListener('click', onUserInteraction);
    };
  }, []);
  
  return (
    <section className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-black">
      
      {/* LEFT SIDE VISUAL */}
      <div className="relative h-[50vh] lg:h-screen overflow-hidden">
        
        {/* Background video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover scale-110 animate-slowZoom"
        >
          <source src="/Videos/14595546-hd_1920_1080_60fps.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* RIGHT SIDE CONTENT */}
      <div className="flex items-center justify-center px-8 py-16 lg:p-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-xl space-y-8 text-left"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
            The Future of Student Competition Starts Here
          </h1>

          <p className="text-lg text-white/80">
            This is South Africa’s first online student reality competition built for education, entertainment, and opportunity.
            Twenty students from campuses across the country compete, the public votes, and the entire nation watches their journey.
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-white">Purpose</h3>
              <p className="text-white/75">
                Give young people a platform to grow, compete, and be seen.
                Help students unlock opportunities through challenges, leadership tests, and national exposure.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white">Vision</h3>
              <p className="text-white/75">
                Create a movement that empowers students.
                Promote talent, innovation, and unity.
                Build something that inspires every young South African.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white">Why It Exists</h3>
              <p className="text-white/75">
                Students deserve a bigger stage. This show turns competition into real opportunities, real recognition, and real impact.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
