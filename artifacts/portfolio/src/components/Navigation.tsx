import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Work", href: "#work-showcase" },
  { name: "Experience", href: "#work" },
  { name: "About", href: "#about" },
  { name: "Life", href: "#life" },
];

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
          className="text-lg font-serif font-medium tracking-wide z-50 relative hover:opacity-70 transition-opacity"
        >
          Adil Hussain
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors relative group overflow-hidden"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-foreground transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            </a>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-50 relative p-2 -mr-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 bg-background/98 backdrop-blur-xl z-40 flex flex-col items-center justify-center min-h-screen"
            >
              <nav className="flex flex-col items-center gap-8">
                {navLinks.map((link, i) => (
                  <motion.a
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 + 0.1 }}
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-4xl font-serif tracking-tight hover:italic transition-all"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
