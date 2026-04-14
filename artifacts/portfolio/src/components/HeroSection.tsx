import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function HeroSection() {
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

        {/* Right: Arch photo */}
        <motion.div
          className="relative shrink-0 flex items-end justify-center"
          style={{ width: "min(340px, 80vw)", height: "min(520px, 75vw)" }}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: EASE }}
        >
          <div
            className="w-full h-full overflow-hidden"
            style={{
              borderRadius: "220px 220px 0 0",
              background: "#FFFFFF",
              boxShadow: "0 4px 40px rgba(0,0,0,0.08)",
            }}
          >
            <img
              src="/adil-photo.jpg"
              alt="Adil Hussain"
              className="w-full h-full object-cover"
              style={{ objectPosition: "center top" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
