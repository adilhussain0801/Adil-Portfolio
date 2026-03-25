import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto relative">
      <div className="max-w-4xl z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-[12vw] leading-[0.9] md:text-8xl lg:text-[140px] font-serif font-normal tracking-[-0.03em] text-foreground mb-6">
            Product <br />
            <span className="italic text-foreground/90">Designer</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-center gap-6 mt-12 md:mt-16"
        >
          <p className="text-xl md:text-2xl font-sans text-foreground/80 max-w-lg font-light leading-relaxed">
            13+ years shaping AI, SaaS & enterprise experiences.
          </p>
          <div className="hidden md:block w-12 h-[1px] bg-border mx-4"></div>
          <p className="text-sm font-sans text-muted-foreground uppercase tracking-widest font-medium">
            Currently at Atlassian, Mumbai.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 left-6 md:left-12 flex flex-col items-center gap-4"
      >
        <a 
          href="#work" 
          className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground hover:bg-secondary transition-all duration-300 group"
          aria-label="Scroll to work"
        >
          <ArrowDown size={18} strokeWidth={1.5} className="group-hover:translate-y-1 transition-transform" />
        </a>
      </motion.div>
    </section>
  );
}
