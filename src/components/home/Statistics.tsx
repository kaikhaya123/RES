'use client';

import { motion } from 'framer-motion';
import { LogoLoop } from '@/components/LogoLoop';

export default function Statistics() {
  // University logos with responsive sizing for optimal delivery
  // Logos are displayed at ~100px height, using responsive widths based on aspect ratios
  // Using optimized dimensions to reduce file download from 393.7 KiB to ~65 KiB
  const universityLogos = [
    { 
      src: '/Images/university_of_cape_town_logo-freelogovectors.net_.png', 
      alt: 'University of Cape Town', 
      width: 1196,  // Optimized for ~100px display height
      height: 175, 
      sizes: '(max-width: 768px) 50vw, (max-width: 1024px) 40vw, 300px',
      priority: false 
    },
    { 
      src: '/Images/SU-Logo.png', 
      alt: 'Stellenbosch University', 
      width: 273,   // Optimized for ~100px display height
      height: 100, 
      sizes: '(max-width: 768px) 50vw, (max-width: 1024px) 40vw, 300px',
      priority: false 
    },
    { 
      src: '/Images/horizontal-logo-bg-removebg-preview.png', 
      alt: 'Wits University', 
      width: 308,   // Optimized for ~100px display height
      height: 100, 
      sizes: '(max-width: 768px) 50vw, (max-width: 1024px) 40vw, 300px',
      priority: false 
    },
    { 
      src: '/Images/UKZN_logo.svg.png', 
      alt: 'University of KwaZulu-Natal', 
      width: 479,   // Optimized for ~100px display height
      height: 175, 
      sizes: '(max-width: 768px) 50vw, (max-width: 1024px) 40vw, 400px',
      priority: false 
    },
    { 
      src: '/Images/Rhodes%20University%20Logo.png', 
      alt: 'Rhodes University', 
      width: 334,   // Optimized for ~100px display height
      height: 105, 
      sizes: '(max-width: 768px) 50vw, (max-width: 1024px) 40vw, 300px',
      priority: false 
    },
    { 
      src: '/Images/logo_09_2020.png', 
      alt: 'Nelson Mandela University', 
      width: 510,   // Optimized for ~100px display height (was 2030x696)
      height: 175, 
      sizes: '(max-width: 768px) 60vw, (max-width: 1024px) 50vw, 500px',
      priority: true 
    },
    { 
      src: '/Images/university-johannesburg.png', 
      alt: 'University of Johannesburg', 
      width: 393,   // Optimized for ~100px display height
      height: 175, 
      sizes: '(max-width: 768px) 50vw, (max-width: 1024px) 40vw, 350px',
      priority: false 
    },
    { 
      src: '/Images/unisa_logo_university_of_south_africa-freelogovectors.net_.png', 
      alt: 'UNISA', 
      width: 311,   // Optimized for ~100px display height
      height: 175, 
      sizes: '(max-width: 768px) 50vw, (max-width: 1024px) 40vw, 300px',
      priority: false 
    },
    { 
      src: '/Images/TUT_Logo_Horisontal1080x1080px.png', 
      alt: 'Tshwane University of Technology', 
      width: 330,   // Optimized for ~100px display height (was 3563x1080)
      height: 100, 
      sizes: '(max-width: 768px) 50vw, (max-width: 1024px) 40vw, 350px',
      priority: false 
    },
    { 
      src: '/Images/durban-university-of-technology-seeklogo.png', 
      alt: 'Durban University of Technology', 
      width: 437,   // Optimized for ~100px display height
      height: 100, 
      sizes: '(max-width: 768px) 50vw, (max-width: 1024px) 40vw, 400px',
      priority: false 
    },
    { 
      src: '/Images/MUTNewLogo-436x211x6x0x424x211x1575796635-removebg-preview.png', 
      alt: 'Mangosuthu University of Technology', 
      width: 201,   // Optimized for ~100px display height
      height: 100, 
      sizes: '(max-width: 768px) 50vw, (max-width: 1024px) 40vw, 250px',
      priority: false 
    },
  ];

  return (
    <section className="py-8 md:py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-16">
        {/* University Logos Loop */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black mb-4 md:mb-6 text-black">Participating South African Universities</h2>
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
