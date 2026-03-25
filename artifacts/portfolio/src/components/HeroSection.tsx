import { motion, useAnimationFrame } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowDown } from "lucide-react";

// Hand-drawn sparkle asterisk (top-right corner)
function SparkleGlyph() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 4 C18 4 17.5 11 18 18" stroke="#1a1a1a" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M18 18 C18 18 18.5 25 18 32" stroke="#1a1a1a" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M4 18 C4 18 11 17.5 18 18" stroke="#1a1a1a" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M18 18 C18 18 25 18.5 32 18" stroke="#1a1a1a" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M8 8 C8 8 12.5 12.5 18 18" stroke="#1a1a1a" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M18 18 C18 18 23.5 23.5 28 28" stroke="#1a1a1a" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M28 8 C28 8 23.5 12.5 18 18" stroke="#1a1a1a" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M18 18 C18 18 12.5 23.5 8 28" stroke="#1a1a1a" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

// Hand-drawn dash lines (bottom-left corner)
function DashLines() {
  return (
    <svg width="42" height="36" viewBox="0 0 42 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 30 C4 28 7 29 8 27" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M10 26 C12 24 15 25 16 23" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M18 22 C20 20 24 21 25 19" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

// Floating bob animation hook
function useFloatY(speed = 1, amplitude = 8, offset = 0) {
  const [y, setY] = useState(0);
  const t = useRef(offset);
  useAnimationFrame((_, delta) => {
    t.current += (delta / 1000) * speed;
    setY(Math.sin(t.current) * amplitude);
  });
  return y;
}

function FloatingShape({ children, speed, amplitude, offset, className, style }: {
  children: React.ReactNode;
  speed?: number;
  amplitude?: number;
  offset?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const y = useFloatY(speed, amplitude, offset);
  return (
    <div className={className} style={{ ...style, transform: `translateY(${y}px)` }}>
      {children}
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      className="min-h-screen flex flex-col justify-center pt-24 pb-12 px-6 md:px-12 lg:px-24 relative overflow-hidden"
      style={{ background: "#FAF8F5" }}
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8">

        {/* Left: Text Content */}
        <motion.div
          className="flex-1 max-w-xl"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            className="font-sans font-bold text-[#2D2D2D] leading-tight mb-10"
            style={{ fontSize: "clamp(2.8rem, 6vw, 4.25rem)" }}
          >
            Hi, I'm Adil
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="text-[#2D2D2D] font-sans font-normal leading-[1.65] mb-6"
              style={{ fontSize: "clamp(1rem, 1.8vw, 1.175rem)" }}
            >
              I'm a product designer based in Mumbai, India. I've been creating
              digital products for organisations since 2012. I'm experienced in
              every step of the UX lifecycle, from strategy, to concept through
              to implementation.
            </p>
            <p
              className="text-[#2D2D2D] font-sans font-normal leading-[1.65]"
              style={{ fontSize: "clamp(1rem, 1.8vw, 1.175rem)" }}
            >
              Welcome to my digital crib!
            </p>
          </motion.div>
        </motion.div>

        {/* Right: Photo collage */}
        <motion.div
          className="relative shrink-0"
          style={{ width: "min(440px, 90vw)", height: "min(580px, 85vw)" }}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Arch photo container — white arch */}
          <div
            className="absolute overflow-hidden"
            style={{
              borderRadius: "220px 220px 0 0",
              width: "72%",
              height: "90%",
              left: "14%",
              top: "4%",
              background: "#FFFFFF",
              boxShadow: "0 4px 40px rgba(0,0,0,0.08)",
            }}
          >
            <img
              src="/adil-photo.jpg"
              alt="Adil Hussain"
              className="absolute object-cover w-full h-full"
              style={{ objectPosition: "center top" }}
            />
          </div>

          {/* Coral quarter circle — top right, overlapping arch */}
          <FloatingShape
            speed={0.55}
            amplitude={7}
            offset={0}
            className="absolute"
            style={{ right: "6%", top: "2%" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
                <path d="M110 0 A110 110 0 0 0 0 110 L110 110 Z" fill="#E8654B" />
              </svg>
            </motion.div>
          </FloatingShape>

          {/* Sparkle glyph — top far right */}
          <FloatingShape
            speed={0.7}
            amplitude={5}
            offset={1.2}
            className="absolute"
            style={{ right: "-2%", top: "14%" }}
          >
            <motion.div
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <SparkleGlyph />
            </motion.div>
          </FloatingShape>

          {/* Teal rounded square — bottom left, overlapping arch */}
          <FloatingShape
            speed={0.5}
            amplitude={9}
            offset={2.1}
            className="absolute"
            style={{ left: "0%", bottom: "20%" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: 15 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
                <rect width="110" height="110" rx="22" fill="#3E9C7B" />
              </svg>
            </motion.div>
          </FloatingShape>

          {/* Dash lines glyph — bottom far left */}
          <FloatingShape
            speed={0.65}
            amplitude={6}
            offset={0.7}
            className="absolute"
            style={{ left: "-4%", bottom: "12%" }}
          >
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              <DashLines />
            </motion.div>
          </FloatingShape>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-10 left-6 md:left-12"
      >
        <a
          href="#work"
          className="w-11 h-11 rounded-full border border-[#2D2D2D]/25 flex items-center justify-center text-[#2D2D2D]/40 hover:text-[#2D2D2D] hover:border-[#2D2D2D] transition-all duration-300 group"
          aria-label="Scroll to work"
        >
          <ArrowDown
            size={16}
            strokeWidth={1.5}
            className="group-hover:translate-y-1 transition-transform"
          />
        </a>
      </motion.div>
    </section>
  );
}
