import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ClientTicker from "@/components/ClientTicker";
import WorkSection from "@/components/WorkSection";
import RecentWorkSection from "@/components/RecentWorkSection";
import SkillsSection from "@/components/SkillsSection";
import LifeSection from "@/components/LifeSection";
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
        <RecentWorkSection />
        <LifeSection />
        <SkillsSection />
      </main>

      <Footer />
    </div>
  );
}
