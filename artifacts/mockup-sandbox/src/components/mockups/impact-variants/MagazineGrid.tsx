import { useEffect, useState } from "react";

const FF = "'Inter', sans-serif";

function BigMetric({
  value,
  label,
  note,
  delay,
}: {
  value: string;
  label: string;
  note?: string;
  delay: number;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(14px)",
        transition: "opacity 0.55s ease, transform 0.55s ease",
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <p
        style={{
          fontFamily: FF,
          fontSize: "clamp(52px,6vw,80px)",
          fontWeight: 800,
          color: "#1a1a1a",
          margin: 0,
          lineHeight: 0.9,
          letterSpacing: "-0.04em",
        }}
      >
        {value}
      </p>
      <p style={{ fontFamily: FF, fontSize: 13, color: "rgba(26,26,26,0.55)", margin: "8px 0 0 0", lineHeight: 1.4, maxWidth: 220 }}>
        {label}
      </p>
      {note && (
        <p style={{ fontFamily: FF, fontSize: 10, color: "rgba(26,26,26,0.3)", margin: "4px 0 0 0", fontStyle: "italic" }}>
          {note}
        </p>
      )}
    </div>
  );
}

export function MagazineGrid() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F4F1EC",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 40px",
        fontFamily: FF,
      }}
    >
      <div style={{ maxWidth: 720, width: "100%", display: "flex", flexDirection: "column", gap: 0 }}>

        {/* Header */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.5s ease",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            paddingBottom: 20,
            borderBottom: "1.5px solid #1a1a1a",
            marginBottom: 36,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <p style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(26,26,26,0.45)", margin: 0 }}>
              Impact — Early Signals
            </p>
            <p style={{ fontFamily: FF, fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 700, color: "#1a1a1a", margin: 0, lineHeight: 1.1 }}>
              First 30 days post GA
            </p>
          </div>
          <p style={{ fontFamily: FF, fontSize: 12, color: "rgba(26,26,26,0.4)", margin: 0, maxWidth: 220, textAlign: "right", lineHeight: 1.5 }}>
            Executing work end-to-end with increasing accuracy.
          </p>
        </div>

        {/* Metrics grid — 3 across */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "32px 40px", marginBottom: 32 }}>
          {/* Execution label spans full width */}
          <div style={{ gridColumn: "span 3", display: "flex", alignItems: "center", gap: 12, marginBottom: -8 }}>
            <p style={{ fontFamily: FF, fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#E8654B", margin: 0 }}>
              Execution
            </p>
            <div style={{ flex: 1, height: 1, background: "#E8654B", opacity: 0.3 }} />
          </div>
          <BigMetric value="21%" label="Tickets fully resolved by AI" delay={100} />
          <BigMetric value="↓17%" label="Reduction in overall resolution time" delay={170} />
          <BigMetric value="48%" label="Requests with zero back-and-forth" delay={240} />

          {/* Quality label spans full width */}
          <div style={{ gridColumn: "span 3", display: "flex", alignItems: "center", gap: 12, marginBottom: -8, marginTop: 8 }}>
            <p style={{ fontFamily: FF, fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#6B8CDA", margin: 0 }}>
              Quality
            </p>
            <div style={{ flex: 1, height: 1, background: "#6B8CDA", opacity: 0.3 }} />
          </div>
          <BigMetric value="67%" label="Plans executed with minimal edits" delay={320} />
          <BigMetric value="1.4×" label="Avg edits per plan before execution" delay={390} />
          <div /> {/* empty cell */}
        </div>

        {/* Footer */}
        <div
          style={{
            borderTop: "1px solid rgba(26,26,26,0.12)",
            paddingTop: 16,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 600ms",
          }}
        >
          <p style={{ fontFamily: FF, fontSize: 12, color: "rgba(26,26,26,0.4)", margin: 0, fontStyle: "italic" }}>
            AI is shifting from assisting work → executing with increasing reliability.
          </p>
        </div>
      </div>
    </div>
  );
}
