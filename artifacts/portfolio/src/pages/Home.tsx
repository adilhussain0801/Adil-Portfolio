import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ClientTicker from "@/components/ClientTicker";
import WorkSection from "@/components/WorkSection";
import SkillsSection from "@/components/SkillsSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative selection:bg-foreground selection:text-background">
      <Navigation />
      
      <main>
        <HeroSection />
        <AboutSection />
        <ClientTicker />
        <WorkSection />
        <SkillsSection />
      </main>

      <Footer />
    </div>
  );
}
