import { useState } from "react";

const NODES = [
  { id: "adil", label: "Adil Hussain", x: 450, y: 250, type: "center" },
  // Tech
  { id: "atlassian",  label: "Atlassian",           x: 160,  y: 80,  type: "tech"     },
  { id: "amazon",     label: "Amazon",               x: 360,  y: 55,  type: "tech"     },
  { id: "accenture",  label: "Accenture",            x: 600,  y: 70,  type: "tech"     },
  // Energy
  { id: "shell",      label: "Shell",                x: 790,  y: 155, type: "energy"   },
  { id: "petronas",   label: "Petronas",             x: 820,  y: 295, type: "energy"   },
  { id: "suncor",     label: "Suncor",               x: 730,  y: 420, type: "energy"   },
  { id: "statoil",    label: "Statoil Fuel & Retail",x: 560,  y: 460, type: "energy"   },
  // Logistics
  { id: "dpworld",    label: "DP World",             x: 340,  y: 450, type: "logistics"},
  // Finance
  { id: "absa",       label: "Absa Bank",            x: 130,  y: 370, type: "finance"  },
  // Defense
  { id: "armed",      label: "Armed Forces",         x: 80,   y: 210, type: "defense"  },
];

const COLORS: Record<string, { line: string; node: string; bg: string; text: string }> = {
  center:    { line: "",        node: "#2D2D2D",  bg: "#2D2D2D",  text: "#FAF8F5"  },
  tech:      { line: "#3E9C7B", node: "#3E9C7B",  bg: "#EAF6F1",  text: "#1a5e47"  },
  energy:    { line: "#E8654B", node: "#E8654B",  bg: "#FDF0EC",  text: "#8c2e15"  },
  logistics: { line: "#6C72CB", node: "#6C72CB",  bg: "#EEF0FF",  text: "#2f3480"  },
  finance:   { line: "#E2A829", node: "#E2A829",  bg: "#FEF8E7",  text: "#7a5500"  },
  defense:   { line: "#888",    node: "#555",     bg: "#F0F0F0",  text: "#222"     },
};

const LEGEND = [
  { type: "tech",      label: "Technology" },
  { type: "energy",    label: "Energy"     },
  { type: "logistics", label: "Logistics"  },
  { type: "finance",   label: "Finance"    },
  { type: "defense",   label: "Defense"    },
];

export default function ClientTicker() {
  const [hovered, setHovered] = useState<string | null>(null);
  const center = NODES[0];

  return (
    <section id="clients" className="py-24 md:py-32 px-6 md:px-12 bg-secondary/30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24">

        {/* Left: heading + legend */}
        <div className="w-full md:w-1/3 flex flex-col gap-8">
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground md:sticky md:top-32"
            style={{ fontFamily: "'Wotfard', sans-serif" }}
          >
            I've designed for
          </h2>
          <div className="flex flex-col gap-2 md:sticky md:top-52">
            {LEGEND.map((l) => (
              <div key={l.type} className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: COLORS[l.type].node }}
                />
                <span className="text-sm text-muted-foreground">{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: SVG node map */}
        <div className="w-full md:w-2/3">
          <svg
            viewBox="0 0 900 530"
            className="w-full"
            style={{ overflow: "visible" }}
          >
            {/* Connection lines */}
            {NODES.slice(1).map((node) => {
              const isHov = hovered === node.id;
              const color = COLORS[node.type].line;
              return (
                <line
                  key={`line-${node.id}`}
                  x1={center.x} y1={center.y}
                  x2={node.x}   y2={node.y}
                  stroke={color}
                  strokeWidth={isHov ? 2 : 1}
                  strokeOpacity={isHov ? 0.9 : hovered ? 0.15 : 0.35}
                  strokeDasharray={isHov ? "none" : "4 4"}
                  style={{ transition: "all 0.2s" }}
                />
              );
            })}

            {/* Company nodes */}
            {NODES.slice(1).map((node) => {
              const isHov = hovered === node.id;
              const c = COLORS[node.type];
              const r = 7;
              return (
                <g
                  key={node.id}
                  onMouseEnter={() => setHovered(node.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ cursor: "default" }}
                >
                  <circle
                    cx={node.x} cy={node.y} r={isHov ? r + 3 : r}
                    fill={c.node}
                    fillOpacity={hovered && !isHov ? 0.25 : 1}
                    style={{ transition: "all 0.2s" }}
                  />
                  {/* Label bg pill */}
                  <rect
                    x={node.x < center.x ? node.x - 110 : node.x + 14}
                    y={node.y - 11}
                    width={node.id === "statoil" ? 130 : 96}
                    height={22}
                    rx={11}
                    fill={isHov ? c.node : c.bg}
                    fillOpacity={hovered && !isHov ? 0.3 : 1}
                    style={{ transition: "all 0.2s" }}
                  />
                  <text
                    x={node.x < center.x
                      ? node.x - (node.id === "statoil" ? 175 : 59)
                      : node.x + (node.id === "statoil" ? 79 : 62)}
                    y={node.y + 4.5}
                    textAnchor="middle"
                    fontSize={11}
                    fontFamily="'Wotfard', sans-serif"
                    fontWeight={isHov ? 700 : 500}
                    fill={isHov ? "#fff" : c.text}
                    fillOpacity={hovered && !isHov ? 0.35 : 1}
                    style={{ transition: "all 0.2s" }}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}

            {/* Center node */}
            <g>
              <circle cx={center.x} cy={center.y} r={48} fill="#2D2D2D" />
              <circle cx={center.x} cy={center.y} r={54} fill="none" stroke="#2D2D2D" strokeWidth={1.5} strokeOpacity={0.2} />
              <text x={center.x} y={center.y - 7} textAnchor="middle" fontSize={11} fontFamily="'Wotfard', sans-serif" fontWeight={700} fill="#FAF8F5">
                Adil
              </text>
              <text x={center.x} y={center.y + 8} textAnchor="middle" fontSize={11} fontFamily="'Wotfard', sans-serif" fontWeight={700} fill="#FAF8F5">
                Hussain
              </text>
            </g>
          </svg>
        </div>

      </div>
    </section>
  );
}
