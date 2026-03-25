import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center pt-24 pb-12 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8">

        {/* Left: Text Content */}
        <motion.div
          className="flex-1 max-w-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-sans font-bold text-[#2D2D2D] leading-tight mb-10"
            style={{ fontSize: "clamp(2.8rem, 6vw, 4.25rem)" }}>
            Hi, I'm Adil
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[#2D2D2D] font-sans font-normal leading-[1.6] mb-6"
              style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)" }}>
              I'm a product designer based in Mumbai, India. I've been creating digital products for organisations since 2012. I'm experienced in every step of the UX lifecycle, from strategy, to concept through to implementation.
            </p>
            <p className="text-[#2D2D2D] font-sans font-normal leading-[1.6]"
              style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)" }}>
              Welcome to my digital crib!
            </p>
          </motion.div>
        </motion.div>

        {/* Right: Photo */}
        <motion.div
          className="relative shrink-0 w-full md:w-auto"
          style={{ width: "min(420px, 90vw)", height: "min(560px, 80vw)" }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Pink oval background */}
          <div
            className="absolute overflow-hidden"
            style={{
              background: "#FFD3CE",
              borderRadius: "300px 300px 0 0",
              width: "75%",
              height: "88%",
              left: "12.5%",
              top: "6%",
            }}
          >
            <img
              src="/adil-photo.jpg"
              alt="Adil Hussain"
              className="absolute object-cover"
              style={{
                width: "125%",
                height: "115%",
                left: "-12%",
                top: "-5%",
                objectPosition: "center top",
              }}
            />
          </div>

          {/* Decorative badge — top right */}
          <div
            className="absolute flex items-center justify-center"
            style={{ width: 88, height: 88, right: 0, top: 10 }}
          >
            <div
              className="w-full h-full rounded-full border border-[#2D2D2D]/20 flex items-center justify-center"
              style={{ transform: "rotate(0.86deg)" }}
            >
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                <circle cx="22" cy="22" r="20" stroke="#2D2D2D" strokeWidth="1.5" />
                <text x="22" y="17" textAnchor="middle" fontSize="7" fill="#2D2D2D" fontFamily="sans-serif" fontWeight="500">PRODUCT</text>
                <text x="22" y="26" textAnchor="middle" fontSize="7" fill="#2D2D2D" fontFamily="sans-serif" fontWeight="500">DESIGN</text>
                <text x="22" y="35" textAnchor="middle" fontSize="7" fill="#2D2D2D" fontFamily="sans-serif" fontWeight="500">★ ★ ★</text>
              </svg>
            </div>
          </div>

          {/* Decorative badge — bottom left */}
          <div
            className="absolute flex items-center justify-center"
            style={{ width: 88, height: 88, left: 0, bottom: "24%"}}
          >
            <div className="w-full h-full rounded-full bg-[#FF6250] flex items-center justify-center shadow-sm">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <text x="20" y="15" textAnchor="middle" fontSize="7" fill="white" fontFamily="sans-serif" fontWeight="600">13+</text>
                <text x="20" y="24" textAnchor="middle" fontSize="6" fill="white" fontFamily="sans-serif">YEARS</text>
                <text x="20" y="33" textAnchor="middle" fontSize="5.5" fill="white" fontFamily="sans-serif">EXP.</text>
              </svg>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-6 md:left-12"
      >
        <a
          href="#work"
          className="w-11 h-11 rounded-full border border-[#2D2D2D]/30 flex items-center justify-center text-[#2D2D2D]/50 hover:text-[#2D2D2D] hover:border-[#2D2D2D] transition-all duration-300 group"
          aria-label="Scroll to work"
        >
          <ArrowDown size={16} strokeWidth={1.5} className="group-hover:translate-y-1 transition-transform" />
        </a>
      </motion.div>
    </section>
  );
}
