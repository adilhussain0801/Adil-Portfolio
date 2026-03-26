import React, { useState } from "react";

const INDUSTRIES = [
  "Design Leadership & Strategy",
  "Systems Thinking",
  "Agentic UX",
  "Platform Design",
  "0→1 Problem Solving",
  "Cross-functional Leadership",
  "Trust & Transparency in AI",
  "User-Centered Design",
  "Vibe Coding",
  "Accessibility",
  "Design Mentorship",
];

export default function ClientTicker() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="clients" className="py-24 md:py-32 px-6 md:px-24 bg-secondary/30">
      <div className="flex flex-col md:flex-row gap-12 md:gap-24">
        <div className="w-full md:w-1/3">
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground md:sticky md:top-32"
            style={{ fontFamily: "'Wotfard', sans-serif" }}
          >
            I've designed for
          </h2>
        </div>

        <div className="w-full md:w-2/3">
          <div className="flex flex-wrap gap-3">
            {INDUSTRIES.map((label) => (
              <button
                key={label}
                onMouseEnter={() => setHovered(label)}
                onMouseLeave={() => setHovered(null)}
                className={`px-5 py-3 rounded-full text-sm font-medium transition-all duration-200 border ${
                  hovered === label
                    ? "bg-foreground text-background border-foreground"
                    : "bg-background border-border/40 text-foreground hover:border-border/80"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
