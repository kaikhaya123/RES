import Hero from "@/components/home/Hero";
import AboutShow from "@/components/home/AboutShow";
import FeaturesSection from "@/components/home/FeaturesSection";
import HowItWorks from "@/components/home/HowItWorks";
import Contestants from "@/components/home/Contestants";
import LiveStream from "@/components/home/LiveStream";
import Statistics from "@/components/home/Statistics";
import Sponsors from "@/components/home/Sponsors";
import CallToAction from "@/components/home/CallToAction";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Statistics />
      <AboutShow />
      <FeaturesSection />
      <HowItWorks />
      <Contestants />
      <LiveStream />
      <Sponsors />
      <CallToAction />
      <Footer />
    </main>
  );
}
