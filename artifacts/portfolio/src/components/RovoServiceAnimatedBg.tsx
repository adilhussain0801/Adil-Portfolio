export default function RovoServiceAnimatedBg() {
  const CX = 300;
  const CY = 385;

  const panels = [
    {
      id: "tickets-top",
      px: 130, py: 148,
      w: 138, h: 82,
      label: "Tickets",
      lines: [70, 95, 80, 60],
      accent: "#a78ae6",
      delay: "0s",
      floatDur: "3.2s",
    },
    {
      id: "jobs-queue",
      px: 448, py: 120,
      w: 132, h: 84,
      label: "Jobs Queue",
      lines: [85, 60, 75],
      accent: "#7ec8e3",
      delay: "0.6s",
      floatDur: "3.8s",
    },
    {
      id: "database-right",
      px: 524, py: 338,
      w: 128, h: 78,
      label: "Database",
      lines: [90, 70, 50, 80],
      accent: "#a78ae6",
      delay: "1.1s",
      floatDur: "2.9s",
    },
    {
      id: "automation",
      px: 432, py: 562,
      w: 144, h: 80,
      label: "Automation Rules",
      lines: [75, 95, 60],
      accent: "#7ec8e3",
      delay: "0.3s",
      floatDur: "3.5s",
    },
    {
      id: "knowledge",
      px: 100, py: 558,
      w: 130, h: 74,
      label: "Knowledge",
      lines: [85, 70, 90, 55],
      accent: "#a78ae6",
      delay: "0.9s",
      floatDur: "4.1s",
    },
    {
      id: "left-panel",
      px: 52, py: 378,
      w: 118, h: 76,
      label: "Tickets",
      lines: [65, 90, 75],
      accent: "#7ec8e3",
      delay: "0.5s",
      floatDur: "3.4s",
    },
  ];

  // Spoke paths: quadratic bezier from hub center to each panel center
  const spokePaths = [
    `M ${CX} ${CY} Q 195 255 130 148`,
    `M ${CX} ${CY} Q 385 238 448 120`,
    `M ${CX} ${CY} Q 438 358 524 338`,
    `M ${CX} ${CY} Q 388 496 432 562`,
    `M ${CX} ${CY} Q 178 496 100 558`,
    `M ${CX} ${CY} Q 162 382 52 378`,
  ];

  // Packet durations (staggered so they don't all move together)
  const packetDurs = ["2.4s", "2.1s", "1.9s", "2.3s", "2.6s", "2.0s"];
  const packetBegins = ["0s", "0.7s", "1.3s", "0.4s", "1.0s", "1.7s"];

  // Hexagon points (pointy-top, r=42, center CX,CY)
  const hexR = 42;
  const hexPoints = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    return `${CX + hexR * Math.cos(angle)},${CY + hexR * Math.sin(angle)}`;
  }).join(" ");

  const hexInnerR = 30;
  const hexInnerPoints = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    return `${CX + hexInnerR * Math.cos(angle)},${CY + hexInnerR * Math.sin(angle)}`;
  }).join(" ");

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background: "linear-gradient(145deg, #b8a4e8 0%, #91bde8 45%, #a8ccf0 75%, #cdb8f0 100%)",
      }}
    >
      <svg
        viewBox="0 0 600 780"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Hub glow gradient */}
          <radialGradient id="hubGrad" cx="50%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#f5c842" />
            <stop offset="60%" stopColor="#e8963a" />
            <stop offset="100%" stopColor="#c97820" />
          </radialGradient>
          {/* Hub outer pulse gradient */}
          <radialGradient id="hubPulse" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f5c842" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#f5c842" stopOpacity="0" />
          </radialGradient>
          {/* Spoke glow filter */}
          <filter id="spokeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Packet glow */}
          <filter id="packetGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Panel glass blur */}
          <filter id="panelGlass">
            <feGaussianBlur stdDeviation="0.5" />
          </filter>
          {/* Path definitions for animateMotion */}
          {spokePaths.map((d, i) => (
            <path key={i} id={`spoke-path-${i}`} d={d} />
          ))}
        </defs>

        {/* Subtle grid */}
        <g opacity="0.05" stroke="white" strokeWidth="0.5">
          {Array.from({ length: 13 }, (_, i) => (
            <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="780" />
          ))}
          {Array.from({ length: 16 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 52} x2="600" y2={i * 52} />
          ))}
        </g>

        {/* Hub pulse rings */}
        <circle cx={CX} cy={CY} r="70" fill="url(#hubPulse)">
          <animate attributeName="r" values="60;85;60" dur="2.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0;0.5" dur="2.8s" repeatCount="indefinite" />
        </circle>
        <circle cx={CX} cy={CY} r="58" fill="none" stroke="#f5c842" strokeWidth="1" opacity="0.3">
          <animate attributeName="r" values="52;68;52" dur="2.8s" repeatCount="indefinite" begin="0.4s" />
          <animate attributeName="opacity" values="0.4;0;0.4" dur="2.8s" repeatCount="indefinite" begin="0.4s" />
        </circle>

        {/* Spoke base lines (static, dim) */}
        {spokePaths.map((d, i) => (
          <path
            key={`base-${i}`}
            d={d}
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            opacity="0.18"
          />
        ))}

        {/* Spoke animated flowing dashes */}
        {spokePaths.map((d, i) => (
          <path
            key={`flow-${i}`}
            d={d}
            fill="none"
            stroke="white"
            strokeWidth="1.8"
            strokeDasharray="7 20"
            opacity="0.55"
            filter="url(#spokeGlow)"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-135"
              dur={`${1.6 + i * 0.15}s`}
              repeatCount="indefinite"
            />
          </path>
        ))}

        {/* Energy packets traveling outward */}
        {spokePaths.map((_, i) => (
          <circle key={`packet-${i}`} r="4" fill="white" opacity="0.92" filter="url(#packetGlow)">
            <animateMotion
              dur={packetDurs[i]}
              repeatCount="indefinite"
              begin={packetBegins[i]}
              calcMode="spline"
              keySplines="0.4 0 0.6 1"
            >
              <mpath href={`#spoke-path-${i}`} />
            </animateMotion>
            <animate
              attributeName="opacity"
              values="0;0.95;0.95;0"
              keyTimes="0;0.1;0.85;1"
              dur={packetDurs[i]}
              repeatCount="indefinite"
              begin={packetBegins[i]}
            />
            <animate
              attributeName="r"
              values="2;4;4;2"
              keyTimes="0;0.1;0.85;1"
              dur={packetDurs[i]}
              repeatCount="indefinite"
              begin={packetBegins[i]}
            />
          </circle>
        ))}

        {/* Energy packets traveling inward (every other spoke) */}
        {[0, 2, 4].map((i) => (
          <circle key={`packet-in-${i}`} r="3" fill="#f5c842" opacity="0.8" filter="url(#packetGlow)">
            <animateMotion
              dur={`${packetDurs[i]}`}
              repeatCount="indefinite"
              begin={`${parseFloat(packetBegins[i]) + parseFloat(packetDurs[i]) / 2}s`}
              calcMode="spline"
              keySplines="0.4 0 0.6 1"
              keyPoints="1;0"
              keyTimes="0;1"
            >
              <mpath href={`#spoke-path-${i}`} />
            </animateMotion>
            <animate
              attributeName="opacity"
              values="0;0.8;0.8;0"
              keyTimes="0;0.1;0.85;1"
              dur={packetDurs[i]}
              repeatCount="indefinite"
              begin={`${parseFloat(packetBegins[i]) + parseFloat(packetDurs[i]) / 2}s`}
            />
          </circle>
        ))}

        {/* Panels */}
        {panels.map((panel) => {
          const x = panel.px - panel.w / 2;
          const y = panel.py - panel.h / 2;
          return (
            <g key={panel.id} transform={`translate(${panel.px}, ${panel.py})`}>
              <animateTransform
                attributeName="transform"
                type="translate"
                values={`${panel.px},${panel.py}; ${panel.px},${panel.py - 5}; ${panel.px},${panel.py}`}
                dur={panel.floatDur}
                repeatCount="indefinite"
                begin={panel.delay}
                calcMode="spline"
                keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
              />
              {/* Panel shadow */}
              <rect
                x={-panel.w / 2 + 3}
                y={-panel.h / 2 + 6}
                width={panel.w}
                height={panel.h}
                rx="10"
                fill="black"
                opacity="0.12"
              />
              {/* Panel glass body */}
              <rect
                x={-panel.w / 2}
                y={-panel.h / 2}
                width={panel.w}
                height={panel.h}
                rx="10"
                fill="white"
                fillOpacity="0.14"
                stroke="white"
                strokeOpacity="0.28"
                strokeWidth="1"
              />
              {/* Panel header bar */}
              <rect
                x={-panel.w / 2}
                y={-panel.h / 2}
                width={panel.w}
                height={22}
                rx="10"
                fill="white"
                fillOpacity="0.1"
              />
              <rect
                x={-panel.w / 2 + 10}
                y={-panel.h / 2 + 7}
                width={panel.w * 0.45}
                height={7}
                rx="3"
                fill="white"
                fillOpacity="0.45"
              />
              {/* Accent dot */}
              <circle
                cx={-panel.w / 2 + panel.w * 0.72}
                cy={-panel.h / 2 + 11}
                r="5"
                fill={panel.accent}
                fillOpacity="0.7"
              />
              {/* Content lines */}
              {panel.lines.map((lineW, li) => (
                <rect
                  key={li}
                  x={-panel.w / 2 + 10}
                  y={-panel.h / 2 + 30 + li * 12}
                  width={(panel.w - 20) * (lineW / 100)}
                  height={5}
                  rx="2.5"
                  fill="white"
                  fillOpacity="0.2"
                />
              ))}
            </g>
          );
        })}

        {/* Hub hexagon outer */}
        <polygon
          points={hexPoints}
          fill="url(#hubGrad)"
          stroke="#f0b830"
          strokeWidth="1.5"
          strokeOpacity="0.6"
          filter="url(#spokeGlow)"
        />
        {/* Hub hexagon inner highlight */}
        <polygon
          points={hexInnerPoints}
          fill="none"
          stroke="white"
          strokeWidth="1"
          strokeOpacity="0.25"
        />
        {/* Hub logo "S" shape */}
        <text
          x={CX}
          y={CY + 11}
          textAnchor="middle"
          fontSize="32"
          fontWeight="900"
          fontFamily="system-ui, sans-serif"
          fill="#1a0a00"
          fillOpacity="0.85"
        >
          S
        </text>
        {/* Hub shimmer pulse */}
        <polygon points={hexPoints} fill="white" opacity="0">
          <animate attributeName="opacity" values="0;0.18;0" dur="2s" repeatCount="indefinite" begin="1s" />
        </polygon>
      </svg>
    </div>
  );
}
