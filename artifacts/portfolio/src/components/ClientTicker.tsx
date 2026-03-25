import { useEffect, useRef, useState } from "react";

const W = 920;
const H = 500;
const MAX_DIST = 210;
const PILL_H = 34;
const PILL_PAD = 14;
const CHAR_W = 7.2;
const pillW = (label: string) => label.length * CHAR_W + PILL_PAD * 2;

const PILL_LABELS = [
  "Jira Service Mgmt",
  "Atlassian Marketplace",
  "Customer Service",
  "Post Purchase",
  "IoT Platforms",
  "Defence C2",
  "Trust & Security",
  "Design Systems",
  "Healthcare Tech",
  "FinTech Platforms",
  "SaaS Scaling",
  "Blockchain Design",
];

// Initial positions spread across canvas
const PILL_INIT = [
  [160, 88], [430, 52], [718, 118], [648, 358],
  [272, 374], [68, 282], [790, 440], [418, 242],
  [556, 72], [310, 450], [820, 280], [82, 420],
];

const DOT_INIT = [
  [308, 128, 5], [548, 148, 4], [868, 75, 3],  [835, 248, 6],
  [520, 292, 4], [178, 238, 5], [358, 302, 3],  [602, 198, 4],
  [138, 390, 3], [448, 432, 5], [702, 472, 4],  [878, 352, 3],
  [238, 168, 4], [648, 98,  3], [350, 195, 5],  [480, 378, 4],
  [762, 290, 6], [98,  158, 3], [582, 472, 3],  [828, 162, 4],
  [192, 478, 3], [38,  178, 4], [748, 38,  3],  [490, 168, 3],
];

type Node = {
  id: string; x: number; y: number; vx: number; vy: number;
  type: "pill" | "dot"; label?: string; r?: number;
};

function initNodes(): Node[] {
  const pills: Node[] = PILL_LABELS.map((label, i) => ({
    id: `p${i}`, type: "pill", label,
    x: PILL_INIT[i][0], y: PILL_INIT[i][1],
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
  }));
  const dots: Node[] = DOT_INIT.map(([x, y, r], i) => ({
    id: `d${i}`, type: "dot", r,
    x, y,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
  }));
  return [...pills, ...dots];
}

const REPEL_RADIUS = 80;
const REPEL_STRENGTH = 0.06;
const DAMPING = 0.97;

export default function ClientTicker() {
  const nodesRef = useRef<Node[]>(initNodes());
  const [, setTick] = useState(0);
  const [hovered, setHovered] = useState<string | null>(null);
  const hoveredRef = useRef<string | null>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Convert DOM mouse coords → SVG viewBox coords
  const toSVGCoords = (clientX: number, clientY: number) => {
    const el = svgRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const scaleX = W / rect.width;
    const scaleY = H / rect.height;
    return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
  };

  useEffect(() => {
    let raf: number;
    const step = () => {
      const mouse = mouseRef.current;
      nodesRef.current = nodesRef.current.map((n) => {
        let { x, y, vx, vy } = n;
        const margin = n.type === "pill" ? pillW(n.label!) / 2 + 4 : (n.r ?? 4) + 4;

        // Cursor repulsion
        if (mouse) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < REPEL_RADIUS && dist > 0) {
            const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
            vx += (dx / dist) * force;
            vy += (dy / dist) * force;
          }
        }

        // Dampen velocity
        vx *= DAMPING;
        vy *= DAMPING;

        x += vx;
        y += vy;
        if (x < margin)              { x = margin;              vx = Math.abs(vx) * 0.6; }
        if (x > W - margin)          { x = W - margin;          vx = -Math.abs(vx) * 0.6; }
        if (y < PILL_H / 2 + 4)     { y = PILL_H / 2 + 4;     vy = Math.abs(vy) * 0.6; }
        if (y > H - PILL_H / 2 - 4) { y = H - PILL_H / 2 - 4; vy = -Math.abs(vy) * 0.6; }
        return { ...n, x, y, vx, vy };
      });
      setTick((t) => t + 1);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const nodes = nodesRef.current;

  // Build edges from proximity
  const edges: { a: Node; b: Node; opacity: number }[] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
      if (dist < MAX_DIST) {
        edges.push({ a: nodes[i], b: nodes[j], opacity: 1 - dist / MAX_DIST });
      }
    }
  }

  // Connected set for hover
  const connected = new Set<string>();
  if (hovered) {
    edges.forEach(({ a, b }) => {
      if (a.id === hovered) connected.add(b.id);
      if (b.id === hovered) connected.add(a.id);
    });
  }

  const dim = (id: string) => hovered && id !== hovered && !connected.has(id);
  const dimEdge = (a: string, b: string) => hovered && a !== hovered && b !== hovered;

  return (
    <section id="clients" className="py-24 md:py-32 px-6 md:px-12 bg-secondary/30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24">
        <div className="w-full md:w-1/3">
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground md:sticky md:top-32"
            style={{ fontFamily: "'Wotfard', sans-serif" }}
          >
            I've designed for
          </h2>
        </div>

        <div className="w-full md:w-2/3">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${W} ${H}`}
            className="w-full"
            style={{ overflow: "hidden" }}
            onMouseMove={(e) => { mouseRef.current = toSVGCoords(e.clientX, e.clientY); }}
            onMouseLeave={() => { mouseRef.current = null; }}
          >

            {/* Edges */}
            {edges.map(({ a, b, opacity }) => {
              const de = dimEdge(a.id, b.id);
              return (
                <line
                  key={`${a.id}-${b.id}`}
                  x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke="#2D2D2D"
                  strokeWidth={1}
                  strokeOpacity={de ? opacity * 0.08 : opacity * 0.22}
                />
              );
            })}

            {/* Dot nodes */}
            {nodes.filter((n) => n.type === "dot").map((n) => {
              let scale = 1;
              if (mouseRef.current) {
                const dist = Math.hypot(n.x - mouseRef.current.x, n.y - mouseRef.current.y);
                scale = 1 + Math.max(0, (1 - dist / 200)) * 0.8; // Grow up to 1.8x closer to cursor
              }
              return (
                <circle
                  key={n.id}
                  cx={n.x} cy={n.y} r={(n.r ?? 4) * scale}
                  fill="#2D2D2D"
                  fillOpacity={dim(n.id) ? 0.2 : hovered === n.id ? 1 : 0.45}
                  onMouseEnter={() => { setHovered(n.id); hoveredRef.current = n.id; }}
                  onMouseLeave={() => { setHovered(null); hoveredRef.current = null; }}
                  style={{ cursor: "default" }}
                />
              );
            })}

            {/* Pill nodes */}
            {nodes.filter((n) => n.type === "pill").map((n) => {
              const w = pillW(n.label!);
              const isHov = hovered === n.id;
              let scale = 1;
              if (mouseRef.current) {
                const dist = Math.hypot(n.x - mouseRef.current.x, n.y - mouseRef.current.y);
                scale = 1 + Math.max(0, (1 - dist / 180)) * 0.25; // Grow up to 1.25x closer to cursor
              }
              scale *= isHov ? 1.12 : 1; // Add hover pop on top
              return (
                <g
                  key={n.id}
                  transform={`translate(${n.x},${n.y}) scale(${scale}) translate(${-n.x},${-n.y})`}
                  onMouseEnter={() => { setHovered(n.id); hoveredRef.current = n.id; }}
                  onMouseLeave={() => { setHovered(null); hoveredRef.current = null; }}
                  style={{ cursor: "default", transition: "transform 0.15s ease" }}
                >
                  <rect
                    x={n.x - w / 2} y={n.y - PILL_H / 2}
                    width={w} height={PILL_H} rx={PILL_H / 2}
                    fill="#2D2D2D"
                    fillOpacity={dim(n.id) ? 0.1 : 1}
                  />
                  <text
                    x={n.x} y={n.y + 5}
                    textAnchor="middle"
                    fontSize={12}
                    fontFamily="'Wotfard', sans-serif"
                    fontWeight={600}
                    fill="#FAF8F5"
                    fillOpacity={dim(n.id) ? 0.1 : 1}
                    pointerEvents="none"
                  >
                    {n.label}
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
