import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ClientTicker from "@/components/ClientTicker";
import WorkSection from "@/components/WorkSection";
import RecentWorkSection from "@/components/RecentWorkSection";
import ImpactSection from "@/components/ImpactSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import LifeSection from "@/components/LifeSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen relative selection:bg-foreground selection:text-background">
      <Navigation />
      
      <main>
        <HeroSection />
        <AboutSection />
        <ClientTicker />
        <RecentWorkSection />
        <ImpactSection />
        <TestimonialsSection />
        <WorkSection />
        <LifeSection />
      </main>

      <Footer />
    </div>
  );
}
