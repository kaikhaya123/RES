import Hero from "@/components/home/Hero";
import Intro from"@/components/home/Intro";

import AboutShow from "@/components/home/AboutShow";
import FeaturesSection from "@/components/home/FeaturesSection";
import { TextParallaxHowItWorks } from "@/components/home/TextParallaxHowItWorks";
import Contestants from "@/components/home/Contestants";
import LiveStream from "@/components/home/LiveStream";
import VotingSection from "@/components/home/VotingSection";
import Statistics from "@/components/home/Statistics";
import Sponsors from "@/components/home/Sponsors";
import MakingADifference from "@/components/home/MakingADifference";
import Merch from "@/components/home/Merchshowcase";
import CallToAction from "@/components/home/CallToAction";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Intro/>
      <Statistics />
      <AboutShow />
      <FeaturesSection />
      <TextParallaxHowItWorks />
      <Contestants />
      <LiveStream />
      <VotingSection />
      <Sponsors />
      <MakingADifference />
      <Merch />
      <CallToAction />
      <Footer />
    </main>
  );
}
