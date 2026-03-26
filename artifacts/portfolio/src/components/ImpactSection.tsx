import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  {
    stat: "$1B+",
    description:
      "Designed post-purchase and seller experiences at Amazon that contributed to over $1 billion in annual platform revenue.",
  },
  {
    stat: "50M+",
    description:
      "Shipped products used by over 50 million people across Atlassian and Amazon's global platforms.",
  },
  {
    stat: "89%",
    description:
      "Average adoption rate across key product launches, measured 90 days post-release across multiple teams.",
  },
];

function StatCard({ stat, delay }: { stat: typeof STATS[0]; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className="flex-1 rounded-2xl p-8 md:p-10 flex flex-col justify-between min-h-[260px]"
      style={{ background: "#F0EDE8", border: "1px solid rgba(45,45,45,0.08)" }}
    >
      <div
        className="text-5xl md:text-6xl font-bold leading-none mb-6"
        style={{
          fontFamily: "'Wotfard', sans-serif",
          color: "#2D2D2D",
          letterSpacing: "-0.02em",
        }}
      >
        {stat.stat}
      </div>
      <p
        className="text-[15px] leading-relaxed"
        style={{ color: "rgba(45,45,45,0.6)", fontFamily: "'Wotfard', sans-serif" }}
      >
        {stat.description}
      </p>
    </motion.div>
  );
}

export default function ImpactSection() {
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.5 });

  return (
    <section
      className="py-24 md:py-40 px-6 md:px-24"
      style={{ background: "#FAF8F5" }}
    >
      <div className="flex flex-col md:flex-row gap-12 md:gap-24">
        {/* Left: Title */}
        <div className="md:w-1/3 flex-shrink-0">
          <motion.h2
            ref={headingRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-3xl md:text-4xl leading-tight md:sticky md:top-32"
            style={{ fontFamily: "'Wotfard', sans-serif", fontWeight: 700, color: "#2D2D2D" }}
          >
            Impact
          </motion.h2>
        </div>

        {/* Right: Stat cards */}
        <div className="md:w-2/3 flex flex-col gap-4">
          {STATS.map((stat, i) => (
            <StatCard key={i} stat={stat} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
}
