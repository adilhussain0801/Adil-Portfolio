import { useMemo, useState } from "react";

// Named "pill" nodes — teams designed for
const PILL_NODES = [
  { id: "p1",  label: "Jira Service Mgmt",      x: 158,  y: 88  },
  { id: "p2",  label: "Atlassian Marketplace",   x: 430,  y: 52  },
  { id: "p3",  label: "Customer Service",        x: 718,  y: 118 },
  { id: "p4",  label: "Post Purchase",           x: 648,  y: 358 },
  { id: "p5",  label: "IoT Platforms",           x: 272,  y: 374 },
  { id: "p6",  label: "Defence C2",              x: 68,   y: 282 },
  { id: "p7",  label: "Trust & Security",        x: 790,  y: 440 },
  { id: "p8",  label: "Design Systems",          x: 418,  y: 242 },
];

// Background dot nodes — structural, unlabeled, varying sizes
const DOT_NODES = [
  { id: "d1",  x: 308,  y: 128, r: 5  },
  { id: "d2",  x: 548,  y: 148, r: 4  },
  { id: "d3",  x: 868,  y: 75,  r: 3  },
  { id: "d4",  x: 835,  y: 248, r: 6  },
  { id: "d5",  x: 520,  y: 292, r: 4  },
  { id: "d6",  x: 178,  y: 238, r: 5  },
  { id: "d7",  x: 358,  y: 302, r: 3  },
  { id: "d8",  x: 602,  y: 198, r: 4  },
  { id: "d9",  x: 138,  y: 390, r: 3  },
  { id: "d10", x: 448,  y: 432, r: 5  },
  { id: "d11", x: 702,  y: 472, r: 4  },
  { id: "d12", x: 878,  y: 352, r: 3  },
  { id: "d13", x: 238,  y: 168, r: 4  },
  { id: "d14", x: 648,  y: 98,  r: 3  },
  { id: "d15", x: 350,  y: 195, r: 5  },
  { id: "d16", x: 480,  y: 378, r: 4  },
  { id: "d17", x: 762,  y: 290, r: 6  },
  { id: "d18", x: 98,   y: 158, r: 3  },
  { id: "d19", x: 582,  y: 472, r: 3  },
  { id: "d20", x: 828,  y: 162, r: 4  },
  { id: "d21", x: 192,  y: 478, r: 3  },
  { id: "d22", x: 38,   y: 178, r: 4  },
  { id: "d23", x: 748,  y: 38,  r: 3  },
  { id: "d24", x: 490,  y: 168, r: 3  },
];

// All nodes combined for edge generation
const ALL_NODES = [
  ...PILL_NODES.map((n) => ({ ...n, r: 0 })),
  ...DOT_NODES,
];

// Generate edges: connect each node to its N nearest neighbors
function buildEdges(nodes: typeof ALL_NODES, maxNeighbors = 4, maxDist = 260) {
  const edges: [string, string][] = [];
  const added = new Set<string>();
  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i];
    const distances = nodes
      .filter((_, j) => j !== i)
      .map((b) => ({ b, dist: Math.hypot(b.x - a.x, b.y - a.y) }))
      .filter(({ dist }) => dist < maxDist)
      .sort((x, y) => x.dist - y.dist)
      .slice(0, maxNeighbors);
    for (const { b } of distances) {
      const key = [a.id, b.id].sort().join("-");
      if (!added.has(key)) {
        added.add(key);
        edges.push([a.id, b.id]);
      }
    }
  }
  return edges;
}

const NODE_MAP = Object.fromEntries(ALL_NODES.map((n) => [n.id, n]));
const EDGES = buildEdges(ALL_NODES, 4, 240);

// Pill dimensions
const PILL_H = 26;
const PILL_PAD = 12;
const CHAR_W = 6.8;
function pillW(label: string) { return label.length * CHAR_W + PILL_PAD * 2; }

export default function ClientTicker() {
  const [hovered, setHovered] = useState<string | null>(null);

  const connectedIds = useMemo(() => {
    if (!hovered) return new Set<string>();
    const s = new Set<string>();
    EDGES.forEach(([a, b]) => {
      if (a === hovered) s.add(b);
      if (b === hovered) s.add(a);
    });
    return s;
  }, [hovered]);

  const dimNode = (id: string) => hovered && id !== hovered && !connectedIds.has(id);
  const dimEdge = (a: string, b: string) => hovered && a !== hovered && b !== hovered;

  return (
    <section id="clients" className="py-24 md:py-32 px-6 md:px-12 bg-secondary/30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24">

        {/* Left */}
        <div className="w-full md:w-1/3">
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground md:sticky md:top-32"
            style={{ fontFamily: "'Wotfard', sans-serif" }}
          >
            I've designed for
          </h2>
        </div>

        {/* Right: network */}
        <div className="w-full md:w-2/3">
          <svg viewBox="0 0 920 510" className="w-full" style={{ overflow: "visible" }}>

            {/* Edges */}
            {EDGES.map(([a, b]) => {
              const na = NODE_MAP[a], nb = NODE_MAP[b];
              const dim = dimEdge(a, b);
              return (
                <line
                  key={`${a}-${b}`}
                  x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                  stroke="#2D2D2D"
                  strokeWidth={1}
                  strokeOpacity={dim ? 0.04 : 0.18}
                  style={{ transition: "stroke-opacity 0.2s" }}
                />
              );
            })}

            {/* Dot nodes */}
            {DOT_NODES.map((node) => {
              const dim = dimNode(node.id);
              const hov = hovered === node.id;
              return (
                <circle
                  key={node.id}
                  cx={node.x} cy={node.y}
                  r={hov ? node.r + 2 : node.r}
                  fill="#2D2D2D"
                  fillOpacity={dim ? 0.08 : hov ? 1 : 0.45}
                  onMouseEnter={() => setHovered(node.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ cursor: "default", transition: "all 0.2s" }}
                />
              );
            })}

            {/* Pill nodes */}
            {PILL_NODES.map((node) => {
              const dim = dimNode(node.id);
              const hov = hovered === node.id;
              const w = pillW(node.label);
              const x = node.x - w / 2;
              const y = node.y - PILL_H / 2;
              return (
                <g
                  key={node.id}
                  onMouseEnter={() => setHovered(node.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ cursor: "default" }}
                >
                  <rect
                    x={x} y={y} width={w} height={PILL_H} rx={PILL_H / 2}
                    fill={hov ? "#2D2D2D" : "#2D2D2D"}
                    fillOpacity={dim ? 0.06 : hov ? 1 : 0.85}
                    style={{ transition: "all 0.2s" }}
                  />
                  <text
                    x={node.x} y={node.y + 4.5}
                    textAnchor="middle"
                    fontSize={10.5}
                    fontFamily="'Wotfard', sans-serif"
                    fontWeight={600}
                    fill={dim ? "#2D2D2D" : "#FAF8F5"}
                    fillOpacity={dim ? 0.15 : 1}
                    style={{ transition: "all 0.2s" }}
                    pointerEvents="none"
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
