import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
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
        <WorkSection />
        <SkillsSection />
        <AboutSection />
      </main>

      <Footer />
    </div>
  );
}
