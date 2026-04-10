import { useEffect, useState } from "react";

const FF = "'Inter', sans-serif";

const METRICS = {
  execution: [
    { value: "21%", label: "Tickets fully resolved by AI" },
    { value: "↓17%", label: "Reduction in resolution time" },
    { value: "48%", label: "Requests with zero back-and-forth" },
  ],
  quality: [
    { value: "67%", label: "Plans executed with minimal edits" },
    { value: "1.4×", label: "Average edits per plan before execution" },
  ],
};

function Tile({
  value,
  label,
  accent = false,
  wide = false,
  tall = false,
  delay = 0,
}: {
  value: string;
  label: string;
  accent?: boolean;
  wide?: boolean;
  tall?: boolean;
  delay?: number;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      style={{
        background: accent ? "#E8654B" : "#1c1c24",
        borderRadius: 16,
        padding: "28px 24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gridColumn: wide ? "span 2" : "span 1",
        gridRow: tall ? "span 2" : "span 1",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
        minHeight: tall ? 220 : 140,
      }}
    >
      <p
        style={{
          fontFamily: FF,
          fontSize: "clamp(36px,4vw,52px)",
          fontWeight: 700,
          color: accent ? "#fff" : "#E8654B",
          margin: 0,
          lineHeight: 1,
          letterSpacing: "-0.03em",
        }}
      >
        {value}
      </p>
      <p
        style={{
          fontFamily: FF,
          fontSize: 12,
          color: accent ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.45)",
          margin: 0,
          lineHeight: 1.4,
          maxWidth: 160,
        }}
      >
        {label}
      </p>
    </div>
  );
}

export function BentoGrid() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0e0e12",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 32px",
        fontFamily: FF,
      }}
    >
      <div style={{ maxWidth: 720, width: "100%", display: "flex", flexDirection: "column", gap: 32 }}>

        {/* Header */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <p style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#E8654B", margin: 0 }}>
            Impact — Early Signals
          </p>
          <p style={{ fontFamily: FF, fontSize: 11, color: "rgba(255,255,255,0.3)", margin: 0 }}>First 30 days post GA</p>
          <p style={{ fontFamily: FF, fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.6, maxWidth: 480, marginTop: 4 }}>
            Rovo Service is executing work end-to-end, with increasing accuracy and reduced intervention.
          </p>
        </div>

        {/* Bento grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          <Tile value="21%" label="Tickets fully resolved by AI" accent delay={100} />
          <Tile value="↓17%" label="Reduction in resolution time" delay={160} />
          <Tile value="48%" label="Requests with zero back-and-forth" delay={220} />
          <Tile value="67%" label="Plans executed with minimal edits" wide delay={280} />
          <Tile value="1.4×" label="Average edits per plan" delay={340} />
        </div>

        {/* Footer */}
        <p
          style={{
            fontFamily: FF,
            fontSize: 12,
            color: "rgba(255,255,255,0.25)",
            margin: 0,
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 500ms",
          }}
        >
          AI is shifting from assisting work → executing with increasing reliability.
        </p>
      </div>
    </div>
  );
}
