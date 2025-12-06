'use client';

import { motion } from 'framer-motion';
import { LogoLoop } from '@/components/LogoLoop';

export default function Statistics() {
  // University logos - only logo images will be displayed
  const universityLogos = [
    { src: '/Images/university_of_cape_town_logo-freelogovectors.net_.png', alt: 'University of Cape Town' },
    { src: '/Images/SU-Logo.png', alt: 'Stellenbosch University' },
    { src: '/Images/horizontal-logo-bg-removebg-preview.png', alt: 'Wits University' },
    { src: '/Images/UKZN_logo.svg.png', alt: 'University of KwaZulu-Natal' },
    { src: '/Images/Rhodes University Logo.png', alt: 'Rhodes University' },
    { src: '/Images/logo_09_2020.png', alt: 'Nelson Mandela University' },
    { src: '/Images/university-johannesburg.png', alt: 'University of Johannesburg' },
    { src: '/Images/unisa_logo_university_of_south_africa-freelogovectors.net_.png', alt: 'UNISA' },
    { src: '/Images/TUT_Logo_Horisontal1080x1080px.png', alt: 'Tshwane University of Technology' },
    { src: '/Images/durban-university-of-technology-seeklogo.png', alt: 'Durban University of Technology' },
    { src: '/Images/MUTNewLogo-436x211x6x0x424x211x1575796635-removebg-preview.png', alt: 'Mangosuthu University of Technology' },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* University Logos Loop */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <LogoLoop 
            logos={universityLogos}
            speed={40}
            direction="left"
            logoHeight={80}
            gap={80}
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
