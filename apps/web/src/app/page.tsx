import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ComponentsSection from "@/components/ComponentsSection";
import MotionPhilosophy from "@/components/MotionPhilosophy";
import PeaceOut from "@/components/PeaceOut";


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ComponentsSection />
        <MotionPhilosophy />
         <div style={{ padding: "4rem", fontFamily: "sans-serif" }}>
   </div>
      
      </main>
      <PeaceOut />
    </div>
  );
}
