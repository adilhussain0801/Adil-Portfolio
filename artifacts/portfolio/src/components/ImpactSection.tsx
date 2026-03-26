import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  {
    stat: "$1B+",
    statColor: "#C9A96E",
    description:
      "Designed post-purchase and seller experiences at Amazon that contributed to over $1 billion in annual platform revenue.",
  },
  {
    stat: "50M+",
    statColor: "#FFFFFF",
    description:
      "Shipped products used by over 50 million people across Atlassian and Amazon's global platforms.",
  },
  {
    stat: "89%",
    statColor: "#9B8FE8",
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
      className="flex-1 rounded-2xl p-8 md:p-10 flex flex-col justify-between min-h-[280px]"
      style={{ background: "#1C1C1E", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div
        className="text-5xl md:text-6xl font-bold leading-none mb-6"
        style={{
          fontFamily: "'Wotfard', sans-serif",
          color: stat.statColor,
          letterSpacing: "-0.02em",
        }}
      >
        {stat.stat}
      </div>
      <p
        className="text-[15px] leading-relaxed"
        style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Wotfard', sans-serif" }}
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
      className="py-24 md:py-32 px-6 md:px-24"
      style={{ background: "#111111" }}
    >
      <motion.p
        ref={headingRef}
        initial={{ opacity: 0, y: 20 }}
        animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-xs uppercase tracking-widest mb-12 md:mb-16"
        style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Wotfard', sans-serif" }}
      >
        Impact
      </motion.p>

      <div className="flex flex-col md:flex-row gap-4">
        {STATS.map((stat, i) => (
          <StatCard key={i} stat={stat} delay={i * 0.12} />
        ))}
      </div>
    </section>
  );
}
