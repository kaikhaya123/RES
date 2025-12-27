import Hero from "@/components/home/Hero";
import Intro from "@/components/home/Intro";

import AboutShow from "@/components/home/AboutShow";
import FeaturesSection from "@/components/home/FeaturesSection";
import { TextParallaxHowItWorks } from "@/components/home/TextParallaxHowItWorks";
import LiveStream from "@/components/home/LiveStream";
import VotingSection from "@/components/home/VotingSection";
import Statistics from "@/components/home/Statistics";
import Merch from "@/components/home/Merchshowcase";
import CallToAction from "@/components/home/CallToAction";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ZoomParallax } from '@/components/ui/zoom-parallax';

export default function Home() {
  const parallaxImages = [
    { src: '/Images/college-students-different-ethnicities-cramming-min.jpg', alt: 'Students collaborating' },
    { src: '/Images/portrait-young-woman-with-curly-hair-min.jpg', alt: 'Student portrait' },
    { src: '/Images/front-view-friends-posing-together-min.jpg', alt: 'Friends posing' },
    { src: '/Images/modern-loose-fit-hoodie-mockup-for-fashion-brands-and-online-stores-promo-use-01452.png', alt: 'Hoodie mockup' },
    { src: '/Images/portrait-young-beautiful-woman-min.jpg', alt: 'Portrait' },
    { src: '/Images/young-people-creating-new-project.jpg', alt: 'Students creating project' },
    { src: '/Images/cheerful-women-holding-trophy-icon-min.jpg', alt: 'Victory' },
  ];

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />

      {/* Zoom Parallax — placed under Hero (now visible on mobile with a mobile-friendly layout) */}
      <div>
        <ZoomParallax images={parallaxImages} />
      </div>

      <Intro/>
      <Statistics />
      <AboutShow />
      <FeaturesSection />
      <TextParallaxHowItWorks />
      <LiveStream />
      <VotingSection />
      <Merch />
      <CallToAction />
      <Footer />
    </main>
  );
}
