import { motion, useAnimation, useAnimationFrame } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function SparkleGlyph() {
  return (
    <svg aria-hidden="true" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
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

function GesturalLineEyelash() {
  return (
    <svg aria-hidden="true" width="70.8" height="38.66" viewBox="0 0 70.8 38.66" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 8 Q15 5 25 12 T45 8 T65 15" stroke="#000000" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      <path d="M0 20 Q12 18 22 25 T42 20 T62 28" stroke="#000000" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      <path d="M5 32 Q16 30 26 37 T46 33 T65 38" stroke="#000000" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

function useFloatY(speed = 1, amplitude = 8, offset = 0) {
  const [y, setY] = useState(0);
  const t = useRef(offset);
  useAnimationFrame((_, delta) => {
    t.current += (delta / 1000) * speed;
    setY(Math.sin(t.current) * amplitude);
  });
  return y;
}

function FloatingShape({
  children, speed, amplitude, offset, className, style,
}: {
  children: React.ReactNode;
  speed?: number;
  amplitude?: number;
  offset?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const y = useFloatY(speed, amplitude, offset);
  const baseTransform = style?.transform ?? "";
  const transform = baseTransform
    ? `${baseTransform} translateY(${y}px)`
    : `translateY(${y}px)`;
  return (
    <div className={className} style={{ ...style, transform }}>
      {children}
    </div>
  );
}

function FloatingCard({
  src,
  alt,
  rotateDeg,
  isHovered,
  delay = 0,
  speed = 0.5,
  amplitude = 8,
  offset = 0,
  exitX = 0,
  exitY = 0,
  flipDir = "left",
  zIndex = 10,
  style,
}: {
  src: string;
  alt: string;
  rotateDeg: number;
  isHovered: boolean;
  delay?: number;
  speed?: number;
  amplitude?: number;
  offset?: number;
  exitX?: number;
  exitY?: number;
  flipDir?: "left" | "right";
  zIndex?: number;
  style?: React.CSSProperties;
}) {
  const y = useFloatY(speed, amplitude, offset);
  const exitRotateY = flipDir === "left" ? -90 : 90;
  const [cardHovered, setCardHovered] = useState(false);

  return (
    <div
      className="absolute"
      style={{
        ...style,
        transform: `translateY(${y}px)`,
        zIndex,
        perspective: "800px",
      }}
      onMouseEnter={() => setCardHovered(true)}
      onMouseLeave={() => setCardHovered(false)}
    >
      <motion.div
        initial={{ opacity: 0, x: exitX, y: exitY, rotateY: exitRotateY, rotate: rotateDeg }}
        animate={
          isHovered
            ? { opacity: 1, x: 0, y: 0, rotateY: 0, rotate: rotateDeg }
            : { opacity: 0, x: exitX, y: exitY, rotateY: exitRotateY, rotate: rotateDeg }
        }
        transition={{
          duration: 0.65,
          delay: isHovered ? delay : 0,
          ease: EASE,
        }}
        style={{ transformStyle: "preserve-3d", position: "relative" }}
      >
        <img
          src={src}
          alt={alt}
          className="w-[185px] h-[185px] object-contain"
          style={{ filter: "drop-shadow(0 14px 32px rgba(0,0,0,0.38))" }}
        />
        {/* Hover label chip */}
        <motion.div
          initial={false}
          animate={{ opacity: cardHovered && isHovered ? 1 : 0, y: cardHovered && isHovered ? 0 : 6 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          style={{
            position: "absolute",
            bottom: "8px",
            left: "50%",
            transform: "translateX(-50%) rotate(0deg)",
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          <span
            style={{
              display: "inline-block",
              background: "rgba(26,26,26,0.82)",
              color: "#fff",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.06em",
              padding: "4px 10px",
              borderRadius: 20,
              fontFamily: "'Wotfard', sans-serif",
              backdropFilter: "blur(8px)",
            }}
          >
            {alt}
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}

function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setFine(mq.matches);
    const handler = (e: MediaQueryListEvent) => setFine(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return fine;
}

export default function HeroSection() {
  const isFinePointer = useFinePointer();
  const [isHovered, setIsHovered] = useState(false);

  const coralAnim = useAnimation();
  const tealAnim = useAnimation();
  const sparkleAnim = useAnimation();
  const eyelashAnim = useAnimation();

  useEffect(() => {
    coralAnim.start({ opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.9, delay: 0.5, ease: EASE } });
    tealAnim.start({ opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.9, delay: 0.6, ease: EASE } });
    sparkleAnim.start({ opacity: 1, rotate: 0, transition: { duration: 0.8, delay: 0.7, ease: EASE } });
    eyelashAnim.start({ opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.75, ease: EASE } });
  }, [coralAnim, tealAnim, sparkleAnim, eyelashAnim]);

  const handleMouseEnter = () => {
    if (!isFinePointer) return;
    setIsHovered(true);
    coralAnim.start({ opacity: 0, scale: 0.7, transition: { duration: 0.32, ease: EASE } });
    tealAnim.start({ opacity: 0, scale: 0.7, transition: { duration: 0.32, delay: 0.05, ease: EASE } });
    sparkleAnim.start({ opacity: 0, scale: 0.7, transition: { duration: 0.32, delay: 0.02, ease: EASE } });
    eyelashAnim.start({ opacity: 0, scale: 0.7, transition: { duration: 0.32, delay: 0.08, ease: EASE } });
  };

  const handleMouseLeave = () => {
    if (!isFinePointer) return;
    setIsHovered(false);
    coralAnim.start({ opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.55, ease: EASE } });
    tealAnim.start({ opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.55, delay: 0.05, ease: EASE } });
    sparkleAnim.start({ opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.55, delay: 0.03, ease: EASE } });
    eyelashAnim.start({ opacity: 1, scale: 1, x: 0, transition: { duration: 0.55, delay: 0.1, ease: EASE } });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center pt-24 pb-12 px-6 md:px-24 relative overflow-hidden"
     
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8">

        {/* Left: Text Content */}
        <motion.div
          className="flex-1 max-w-2xl"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <motion.h1
            className="font-sans leading-[1.1] mb-6 md:mb-12"
            style={{ fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.15, ease: EASE }}
          >
            <span className="font-bold text-[#2D2D2D]">I'm Adil,</span>
            <span className="font-normal text-[#999999] mx-2">a multi-</span>
            <br />
            <span className="font-normal text-[#999999]">disciplinary</span>
            <span className="font-bold text-[#2D2D2D] mx-2">design</span>
            <br />
            <span className="font-normal text-[#999999]">leader based in</span>
            <span className="inline-block ml-1" style={{ verticalAlign: "text-bottom", marginTop: "-2px" }}>
              <img src="/mumbai-illustration.png" alt="Mumbai" style={{ height: "1.4em", width: "auto", display: "block" }} />
            </span>
            <br />
            <span className="font-bold text-[#2D2D2D]">Mumbai,</span>
            <span className="font-normal text-[#999999] ml-2">India.</span>
          </motion.h1>
        </motion.div>

        {/* Right: Photo collage - 680px wide hover zone, arch centred inside */}
        <motion.div
          className="relative shrink-0"
          style={{ width: "min(680px, 90vw)", height: "min(580px, 85vw)" }}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: EASE }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* ── LEFT cards: painting (top) & photography (mid) ── */}
          <FloatingCard
            src="/hobby-painting.png"
            alt="Painting"
            rotateDeg={-12}
            isHovered={isHovered}
            delay={0.06}
            speed={0.48}
            amplitude={7}
            offset={0.5}
            exitX={60}
            exitY={40}
            flipDir="left"
            zIndex={8}
            style={{ left: 88, top: "5%" }}
          />
          <FloatingCard
            src="/hobby-photography.png"
            alt="Photography"
            rotateDeg={-7}
            isHovered={isHovered}
            delay={0}
            speed={0.42}
            amplitude={9}
            offset={2.2}
            exitX={60}
            exitY={-30}
            flipDir="left"
            zIndex={8}
            style={{ left: 56, top: "42%" }}
          />

          {/* ── Arch inner container - z-index 5, sits between the two card layers ── */}
          <div
            className="absolute top-0 bottom-0"
            style={{
              width: "min(440px, 64.7%)",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 5,
              perspective: "1000px",
            }}
          >
            {/* Arch photo with 3D flip on hover */}
            <motion.div
              className="absolute overflow-hidden"
              style={{
                borderRadius: "220px 220px 0 0",
                width: "72%",
                height: "90%",
                left: "14%",
                top: "4%",
                background: "#FFFFFF",
                boxShadow: "0 4px 40px rgba(0,0,0,0.08)",
                transformStyle: "preserve-3d",
              }}
              animate={{ rotateY: isHovered ? 10 : 0 }}
              transition={{ duration: 0.65, ease: EASE }}
            >
              <img
                src="/adil-photo.jpg"
                alt="Adil Hussain"
                className="absolute object-cover w-full h-full"
                style={{ objectPosition: "center top" }}
              />
            </motion.div>

            {/* Coral quarter circle - hides on hover */}
            <FloatingShape speed={0.55} amplitude={7} offset={0} className="absolute" style={{ right: "6%", top: "2%" }}>
              <motion.div initial={{ opacity: 0, scale: 0.6, rotate: -20 }} animate={coralAnim}>
                <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
                  <path d="M110 0 A110 110 0 0 0 0 110 L110 110 Z" fill="#E8654B" />
                </svg>
              </motion.div>
            </FloatingShape>

            {/* Sparkle glyph - hides on hover */}
            <FloatingShape speed={0.7} amplitude={5} offset={1.2} className="absolute" style={{ right: "-2%", top: "14%" }}>
              <motion.div initial={{ opacity: 0, rotate: -45 }} animate={sparkleAnim}>
                <SparkleGlyph />
              </motion.div>
            </FloatingShape>

            {/* Teal rounded square - hides on hover */}
            <FloatingShape speed={0.5} amplitude={9} offset={2.1} className="absolute" style={{ left: "0%", bottom: "20%" }}>
              <motion.div initial={{ opacity: 0, scale: 0.6, rotate: 15 }} animate={tealAnim}>
                <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
                  <rect width="110" height="110" rx="22" fill="#3E9C7B" />
                </svg>
              </motion.div>
            </FloatingShape>

            {/* Gestural eyelash - hides on hover */}
            <FloatingShape speed={0.65} amplitude={6} offset={0.7} className="absolute" style={{ left: "-6%", bottom: "8%", transform: "rotate(-150deg)" }}>
              <motion.div initial={{ opacity: 0, x: -15 }} animate={eyelashAnim}>
                <GesturalLineEyelash />
              </motion.div>
            </FloatingShape>
          </div>

          {/* ── RIGHT cards: travel (top) & garden (mid) ── */}
          <FloatingCard
            src="/hobby-travel.png"
            alt="Travel"
            rotateDeg={11}
            isHovered={isHovered}
            delay={0.04}
            speed={0.52}
            amplitude={7}
            offset={1.1}
            exitX={-60}
            exitY={40}
            flipDir="right"
            zIndex={8}
            style={{ right: 68, top: "5%" }}
          />
          <FloatingCard
            src="/hobby-garden.png"
            alt="Gardening"
            rotateDeg={6}
            isHovered={isHovered}
            delay={0.1}
            speed={0.46}
            amplitude={9}
            offset={3.0}
            exitX={-60}
            exitY={-30}
            flipDir="right"
            zIndex={8}
            style={{ right: 42, bottom: "10%" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
