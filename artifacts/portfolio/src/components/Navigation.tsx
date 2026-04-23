import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "About Me", sectionId: "about" },
  { name: "Work", sectionId: "work-showcase" },
  { name: "Experience", sectionId: "experience" },
  { name: "Contact", sectionId: "contact" },
];

function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top, behavior: "instant" });
  }
}

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "py-4 bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm" 
          : "py-6 md:py-10 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-full px-6 md:px-24 flex items-center justify-between">
        <a 
          href="#" 
          onClick={scrollToTop}
          className="text-lg font-serif font-medium tracking-wide z-50 relative hover:opacity-70 transition-opacity no-underline"
          style={{ textDecoration: "none" }}
        >
          Adil Hussain
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.sectionId)}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-300 relative group rounded-sm bg-transparent border-none cursor-pointer p-0"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#1a1a1a] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center" />
            </button>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-50 relative p-2 -mr-2 text-foreground rounded-md"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 bg-background/98 backdrop-blur-xl z-40 flex flex-col items-center justify-center min-h-screen"
            >
              <nav className="flex flex-col items-center gap-8" aria-label="Mobile navigation">
                {navLinks.map((link, i) => (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 + 0.1 }}
                    key={link.name}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setTimeout(() => scrollToSection(link.sectionId), 300);
                    }}
                    className="text-4xl font-serif tracking-tight hover:italic transition-all rounded-sm bg-transparent border-none cursor-pointer"
                  >
                    {link.name}
                  </motion.button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
