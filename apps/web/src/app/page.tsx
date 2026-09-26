import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BentoFeatures from "@/components/BentoFeatures";
import BentoFeaturesTwo from "@/components/BentoFeaturesTwo";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import InputMic from "@/components/InputMic";
import Button from "@/components/Buttons";
import TextReveal from "@/components/TextReveal";
import Background from "@/components/HeroSectionTwo";


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <BentoFeatures />
        <BentoFeaturesTwo />
        <FAQ />
        <CTA />
         <div style={{ padding: "4rem", fontFamily: "sans-serif" }}>
   </div>
      
      </main>
      <Footer />
    </div>
  );
}
