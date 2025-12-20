'use client';

import Image from 'next/image';

export default function SimpleLogoLoop() {
  const logos = [
    '/Images/university_of_cape_town_logo-freelogovectors.net_.png',
    '/Images/SU-Logo.png',
    '/Images/horizontal-logo-bg-removebg-preview.png',
    '/Images/UKZN_logo.svg.png',
    '/Images/Rhodes%20University%20Logo.png',
    '/Images/logo_09_2020.png',
    '/Images/university-johannesburg.png',
    '/Images/unisa_logo_university_of_south_africa-freelogovectors.net_.png',
    '/Images/TUT_Logo_Horisontal1080x1080px.png',
    '/Images/durban-university-of-technology-seeklogo.png',
    '/Images/MUTNewLogo-436x211x6x0x424x211x1575796635-removebg-preview.png',
  ];

  return (
    <div className="w-full overflow-hidden bg-dark-bg-soft py-20">
      <div className="relative flex">
        {/* Original set */}
        <div className="flex animate-scroll items-center gap-16">
          {logos.map((src, i) => (
            <div key={`original-${i}`} className="flex-shrink-0">
              <img
                src={src}
                alt="University Logo"
                className="h-20 w-auto object-contain"
                loading="eager"
              />
            </div>
          ))}
        </div>
        {/* Duplicate set for seamless loop */}
        <div className="flex animate-scroll items-center gap-16" aria-hidden="true">
          {logos.map((src, i) => (
            <div key={`duplicate-${i}`} className="flex-shrink-0">
              <img
                src={src}
                alt="University Logo"
                className="h-20 w-auto object-contain"
                loading="eager"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-scroll {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
