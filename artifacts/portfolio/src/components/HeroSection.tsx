import { motion, useAnimationFrame } from "framer-motion";
import { useRef, useState } from "react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const ROUGH_FILTER_ID = "rough-sketch";

function RoughSketchDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }}>
      <defs>
        <filter id={ROUGH_FILTER_ID} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="4" seed="8" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}

function AsteriskGlyph({ size = 52 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 130 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: `url(#${ROUGH_FILTER_ID})` }}
    >
      {/* Bold diagonal: top-left → bottom-right */}
      <path d="M18 14 Q62 60 112 108" stroke="#111" strokeWidth="3" strokeLinecap="round"/>
      {/* Bold diagonal: top-right → bottom-left */}
      <path d="M108 12 Q66 58 22 106" stroke="#111" strokeWidth="3" strokeLinecap="round"/>
      {/* Roughly horizontal, angled slightly */}
      <path d="M8 72 Q52 52 118 58" stroke="#111" strokeWidth="3" strokeLinecap="round"/>
      {/* Near-vertical, offset left of centre */}
      <path d="M48 8 Q56 56 60 118" stroke="#111" strokeWidth="3" strokeLinecap="round"/>
      {/* Extra slash: upper-right to lower-left, short */}
      <path d="M90 22 Q72 60 38 98" stroke="#111" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  );
}

function ScribbleCurve() {
  return (
    <svg
      aria-hidden="true"
      width="90"
      height="66"
      viewBox="0 0 90 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: `url(#${ROUGH_FILTER_ID})` }}
    >
      <path d="M4 10 Q20 6 34 16 Q50 26 66 12 Q78 4 88 18" stroke="#1a1a1a" strokeWidth="2.4" strokeLinecap="round" fill="none"/>
      <path d="M2 28 Q18 22 32 34 Q48 44 64 30 Q76 20 88 36" stroke="#1a1a1a" strokeWidth="2.4" strokeLinecap="round" fill="none"/>
      <path d="M6 46 Q22 40 36 50 Q52 58 68 46 Q78 38 88 50" stroke="#1a1a1a" strokeWidth="2.4" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

function ScribbleLoop() {
  return (
    <svg
      aria-hidden="true"
      width="72"
      height="72"
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: `url(#${ROUGH_FILTER_ID})` }}
    >
      <path
        d="M36 8 C52 8 64 20 64 36 C64 52 52 64 36 64 C20 64 8 52 8 36 C8 22 18 12 30 10"
        stroke="#1a1a1a"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M36 16 C48 16 56 26 56 36 C56 46 48 56 36 56 C24 56 16 46 16 36 C16 28 22 20 30 17"
        stroke="#1a1a1a"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        strokeOpacity="0.35"
      />
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

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center pt-24 pb-12 px-6 md:px-24 relative"
    >
      <RoughSketchDefs />

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

        {/* Right: Arch photo + floating decorative shapes */}
        <motion.div
          className="relative shrink-0"
          style={{ width: "min(500px, 90vw)", height: "min(560px, 80vw)", overflow: "visible" }}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: EASE }}
        >
          {/* Arch photo - centred */}
          <div
            className="absolute overflow-hidden"
            style={{
              borderRadius: "220px 220px 16px 16px",
              width: "62%",
              height: "88%",
              left: "50%",
              top: "6%",
              transform: "translateX(-50%)",
              background: "#FFFFFF",
              boxShadow: "0 4px 40px rgba(0,0,0,0.08)",
              zIndex: 5,
            }}
          >
            <img
              src="/adil-photo.jpg"
              alt="Adil Hussain"
              className="w-full h-full object-cover"
              style={{ objectPosition: "center top", transform: "scale(1.3) translateY(-8%) translateX(10%)", transformOrigin: "top center" }}
            />
          </div>

          {/* Coral quarter circle - top-left */}
          <FloatingShape speed={0.55} amplitude={7} offset={0} className="absolute" style={{ left: "13%", top: "4%", zIndex: 6 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
            >
              <svg width="100" height="100" viewBox="0 0 110 110" fill="none">
                <path d="M110 0 A110 110 0 0 0 0 110 L110 110 Z" fill="#E8654B" />
              </svg>
            </motion.div>
          </FloatingShape>

          {/* Asterisk - upper-right, large and prominent */}
          <FloatingShape speed={0.6} amplitude={6} offset={0.8} className="absolute" style={{ right: "3%", top: "10%", zIndex: 6 }}>
            <motion.div
              initial={{ opacity: 0, rotate: -60, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 15, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.65, ease: EASE }}
            >
              <AsteriskGlyph size={64} />
            </motion.div>
          </FloatingShape>

          {/* Teal shape - right side mid */}
          <FloatingShape speed={0.48} amplitude={9} offset={2.1} className="absolute" style={{ right: "7%", bottom: "24%", zIndex: 6 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: 15 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
            >
              <div style={{
                width: 112,
                height: 112,
                background: "#3E9C7B",
                borderRadius: "8px 56px 8px 56px",
              }} />
            </motion.div>
          </FloatingShape>

          {/* Scribble curve - bottom-left */}
          <FloatingShape speed={0.62} amplitude={6} offset={1.4} className="absolute" style={{ left: "1%", bottom: "18%", transform: "rotate(-20deg)", zIndex: 6 }}>
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.75, ease: EASE }}
            >
              <ScribbleCurve />
            </motion.div>
          </FloatingShape>

          {/* Scribble loop - bottom-right of photo */}
          <FloatingShape speed={0.5} amplitude={8} offset={3.2} className="absolute" style={{ right: "26%", bottom: "-4%", zIndex: 7 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.7, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
            >
              <ScribbleLoop />
            </motion.div>
          </FloatingShape>
        </motion.div>
      </div>
    </section>
  );
}
