import { useEffect, useState } from "react";

const FF = "'Inter', sans-serif";

const EXECUTION = [
  { value: "21%", fill: 21, label: "Tickets fully resolved by AI" },
  { value: "↓17%", fill: 17, label: "Reduction in overall resolution time" },
  { value: "48%", fill: 48, label: "Requests completed without back-and-forth" },
];

const QUALITY = [
  { value: "67%", fill: 67, label: "Plans executed with minimal or no edits" },
  { value: "1.4×", fill: 56, label: "Average edits per plan before execution" },
];

function MetricRow({
  value,
  fill,
  label,
  delay,
  color,
}: {
  value: string;
  fill: number;
  label: string;
  delay: number;
  color: string;
}) {
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), delay + 200);
    return () => clearTimeout(t);
  }, [delay]);

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(10px)",
        transition: `opacity 0.45s ease, transform 0.45s ease`,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <p style={{ fontFamily: FF, fontSize: "clamp(36px,4vw,52px)", fontWeight: 700, color: "#1a1a1a", margin: 0, lineHeight: 1, letterSpacing: "-0.03em" }}>
          {value}
        </p>
        <p style={{ fontFamily: FF, fontSize: 12, color: "rgba(26,26,26,0.45)", margin: 0, maxWidth: 200, textAlign: "right", lineHeight: 1.4 }}>
          {label}
        </p>
      </div>
      {/* Bar */}
      <div style={{ height: 3, background: "rgba(26,26,26,0.08)", borderRadius: 4, overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: animated ? `${fill}%` : "0%",
            background: color,
            borderRadius: 4,
            transition: "width 0.9s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </div>
    </div>
  );
}

export function ProgressBars() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FAFAF8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 32px",
        fontFamily: FF,
      }}
    >
      <div style={{ maxWidth: 640, width: "100%", display: "flex", flexDirection: "column", gap: 44 }}>

        {/* Header */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.5s ease",
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <p style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(26,26,26,0.4)", margin: 0 }}>
            Impact — Early Signals
          </p>
          <p style={{ fontFamily: FF, fontSize: 11, color: "rgba(26,26,26,0.3)", margin: 0 }}>First 30 days post GA</p>
          <p style={{ fontFamily: FF, fontSize: 13, color: "rgba(26,26,26,0.55)", margin: 0, lineHeight: 1.6, maxWidth: 520, marginTop: 4 }}>
            Early signals show Rovo Service is executing work end-to-end with increasing accuracy and reduced need for intervention.
          </p>
        </div>

        {/* Execution */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <p style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#E8654B", margin: 0 }}>
            Execution
          </p>
          {EXECUTION.map((m, i) => (
            <MetricRow key={i} {...m} delay={100 + i * 80} color="#E8654B" />
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(26,26,26,0.07)" }} />

        {/* Quality */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <p style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6B8CDA", margin: 0 }}>
            Quality
          </p>
          {QUALITY.map((m, i) => (
            <MetricRow key={i} {...m} delay={400 + i * 80} color="#6B8CDA" />
          ))}
        </div>

        {/* Footer */}
        <p
          style={{
            fontFamily: FF,
            fontSize: 12,
            color: "rgba(26,26,26,0.35)",
            margin: 0,
            borderTop: "1px solid rgba(26,26,26,0.07)",
            paddingTop: 18,
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 600ms",
          }}
        >
          AI is shifting from assisting work → executing with increasing reliability.
        </p>
      </div>
    </div>
  );
}
