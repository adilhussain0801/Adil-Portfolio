import { useState } from "react";

const NODES = [
  { id: "atlassian", label: "Atlassian",            x: 115,  y: 72,  type: "tech"      },
  { id: "amazon",    label: "Amazon",               x: 310,  y: 42,  type: "tech"      },
  { id: "accenture", label: "Accenture",            x: 500,  y: 95,  type: "tech"      },
  { id: "shell",     label: "Shell",                x: 720,  y: 55,  type: "energy"    },
  { id: "petronas",  label: "Petronas",             x: 840,  y: 190, type: "energy"    },
  { id: "suncor",    label: "Suncor",               x: 790,  y: 345, type: "energy"    },
  { id: "statoil",   label: "Statoil F&R",          x: 630,  y: 450, type: "energy"    },
  { id: "dpworld",   label: "DP World",             x: 415,  y: 400, type: "logistics" },
  { id: "absa",      label: "Absa Bank",            x: 185,  y: 380, type: "finance"   },
  { id: "armed",     label: "Armed Forces",         x: 68,   y: 248, type: "defense"   },
];

const EDGES = [
  // Tech cluster
  ["atlassian", "amazon"],
  ["amazon", "accenture"],
  ["atlassian", "accenture"],
  // Energy cluster
  ["shell", "petronas"],
  ["petronas", "suncor"],
  ["suncor", "statoil"],
  ["shell", "suncor"],
  // Cross-cluster
  ["accenture", "shell"],
  ["accenture", "absa"],
  ["accenture", "dpworld"],
  ["amazon", "dpworld"],
  ["dpworld", "petronas"],
  ["dpworld", "statoil"],
  ["absa", "armed"],
  ["armed", "atlassian"],
  ["armed", "accenture"],
];

const COLORS: Record<string, { node: string; text: string }> = {
  tech:      { node: "#3E9C7B", text: "#1a5e47"  },
  energy:    { node: "#E8654B", text: "#8c2e15"  },
  logistics: { node: "#6C72CB", text: "#2f3480"  },
  finance:   { node: "#E2A829", text: "#7a5500"  },
  defense:   { node: "#777777", text: "#222222"  },
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

  const nodeMap = Object.fromEntries(NODES.map((n) => [n.id, n]));

  const connectedTo = (id: string) =>
    EDGES.filter((e) => e.includes(id)).flatMap((e) => e.filter((n) => n !== id));

  const isHighlighted = (id: string) =>
    !hovered || id === hovered || connectedTo(hovered).includes(id);

  const isEdgeHighlighted = (a: string, b: string) =>
    !hovered || (a === hovered || b === hovered);

  return (
    <section id="clients" className="py-24 md:py-32 px-6 md:px-12 bg-secondary/30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24">

        {/* Left */}
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
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[l.type].node }} />
                <span className="text-sm text-muted-foreground">{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: network graph */}
        <div className="w-full md:w-2/3">
          <svg viewBox="0 0 920 520" className="w-full" style={{ overflow: "visible" }}>
            {/* Edges */}
            {EDGES.map(([a, b]) => {
              const na = nodeMap[a], nb = nodeMap[b];
              const hi = isEdgeHighlighted(a, b);
              const bothSameType = na.type === nb.type;
              const color = bothSameType ? COLORS[na.type].node : "#aaaaaa";
              return (
                <line
                  key={`${a}-${b}`}
                  x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                  stroke={color}
                  strokeWidth={hi ? 1.5 : 1}
                  strokeOpacity={hi ? 0.5 : 0.08}
                  style={{ transition: "all 0.2s" }}
                />
              );
            })}

            {/* Nodes */}
            {NODES.map((node) => {
              const hi = isHighlighted(node.id);
              const c = COLORS[node.type];
              const r = hovered === node.id ? 10 : 7;
              // Label on left if node is on right half
              const labelLeft = node.x > 460;

              return (
                <g
                  key={node.id}
                  onMouseEnter={() => setHovered(node.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ cursor: "default" }}
                >
                  {/* Glow ring on hover */}
                  {hovered === node.id && (
                    <circle cx={node.x} cy={node.y} r={18} fill={c.node} fillOpacity={0.15} />
                  )}
                  <circle
                    cx={node.x} cy={node.y} r={r}
                    fill={c.node}
                    fillOpacity={hi ? 1 : 0.2}
                    style={{ transition: "all 0.2s" }}
                  />
                  <text
                    x={labelLeft ? node.x - 14 : node.x + 14}
                    y={node.y + 4}
                    textAnchor={labelLeft ? "end" : "start"}
                    fontSize={11}
                    fontFamily="'Wotfard', sans-serif"
                    fontWeight={hovered === node.id ? 700 : 500}
                    fill={c.text}
                    fillOpacity={hi ? 1 : 0.2}
                    style={{ transition: "all 0.2s" }}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

      </div>
    </section>
  );
}
