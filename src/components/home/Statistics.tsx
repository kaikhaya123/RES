'use client';

import { motion } from 'framer-motion';
import { LogoLoop } from '@/components/LogoLoop';

export default function Statistics() {
  // University logos with explicit dimensions to prevent layout shift and enable optimization
  // Heights are displayed dimensions (80px), widths vary based on aspect ratios
  const universityLogos = [
    { src: '/Images/university_of_cape_town_logo-freelogovectors.net_.png', alt: 'University of Cape Town', width: 1456, height: 213, priority: false },
    { src: '/Images/SU-Logo.png', alt: 'Stellenbosch University', width: 421, height: 155, priority: false },
    { src: '/Images/horizontal-logo-bg-removebg-preview.png', alt: 'Wits University', width: 468, height: 152, priority: false },
    { src: '/Images/UKZN_logo.svg.png', alt: 'University of KwaZulu-Natal', width: 1200, height: 438, priority: false },
    { src: '/Images/Rhodes%20University%20Logo.png', alt: 'Rhodes University', width: 512, height: 162, priority: false },
    { src: '/Images/logo_09_2020.png', alt: 'Nelson Mandela University', width: 2030, height: 696, priority: true },
    { src: '/Images/university-johannesburg.png', alt: 'University of Johannesburg', width: 745, height: 332, priority: false },
    { src: '/Images/unisa_logo_university_of_south_africa-freelogovectors.net_.png', alt: 'UNISA', width: 1280, height: 720, priority: false },
    { src: '/Images/TUT_Logo_Horisontal1080x1080px.png', alt: 'Tshwane University of Technology', width: 3563, height: 1080, priority: false },
    { src: '/Images/durban-university-of-technology-seeklogo.png', alt: 'Durban University of Technology', width: 2000, height: 458, priority: false },
    { src: '/Images/MUTNewLogo-436x211x6x0x424x211x1575796635-removebg-preview.png', alt: 'Mangosuthu University of Technology', width: 424, height: 211, priority: false },
  ];

  return (
    <section className="py-16 md:py-24 lg:py-28 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-16">
        {/* University Logos Loop */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black mb-6 md:mb-12 text-black">Participating South African Universities</h2>
          <LogoLoop 
            logos={universityLogos}
            speed={40}
            direction="left"
            logoHeight={100}
            gap={100}
            pauseOnHover={false}
            scaleOnHover={false}
            fadeOut
            fadeOutColor="rgb(249, 250, 251)"
            ariaLabel="Participating South African Universities"
          />
        </motion.div>
      </div>
    </section>
  );
}
