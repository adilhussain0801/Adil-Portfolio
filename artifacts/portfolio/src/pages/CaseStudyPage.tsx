import { useParams, Link } from "wouter";
import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getCaseStudy, getNextCaseStudy, type CaseStudy } from "@/data/caseStudies";
import NotFound from "@/pages/not-found";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const APPLE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 32 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, ease: EASE, delay },
  };
}

function SnapReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.15 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.72, ease: APPLE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CaseStudyHeroBg() {
  const hexPts = (cx: number, cy: number, r: number): string => {
    const a = r * 0.866;
    return [
      `${cx + r},${cy}`,
      `${cx + r / 2},${cy + a}`,
      `${cx - r / 2},${cy + a}`,
      `${cx - r},${cy}`,
      `${cx - r / 2},${cy - a}`,
      `${cx + r / 2},${cy - a}`,
    ].join(" ");
  };

  const gridHexes: [number, number][] = [];
  for (let row = 0; row < 8; row++) {
    const offset = row % 2 === 0 ? 0 : 40;
    for (let col = 0; col < 12; col++) {
      gridHexes.push([col * 80 + offset + 10, row * 68 + 24]);
    }
  }

  const flowLine = { stroke: "white", strokeWidth: 1.5, strokeOpacity: 0.18, strokeDasharray: "5 4" } as React.SVGProps<SVGPathElement>;

  return (
    <svg
      viewBox="0 0 860 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      preserveAspectRatio="xMidYMid slice"
    >
      {gridHexes.map(([cx, cy], i) => (
        <polygon key={i} points={hexPts(cx, cy, 34)} stroke="white" strokeOpacity={0.045} strokeWidth={1} fill="none" />
      ))}

      <path d="M 150 82 L 282 82 Q 312 82 332 128 L 380 214" {...flowLine} />
      <path d="M 150 240 L 380 240" {...flowLine} />
      <path d="M 150 398 L 282 398 Q 312 398 332 352 L 380 266" {...flowLine} />
      <path d="M 540 214 L 568 148 Q 582 88 616 82 L 710 82" {...flowLine} />
      <path d="M 540 240 L 710 240" {...flowLine} />
      <path d="M 540 266 L 568 332 Q 582 392 616 398 L 710 398" {...flowLine} />

      {([[282, 82], [282, 398], [616, 82], [616, 398]] as [number, number][]).map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={4} fill="white" fillOpacity={0.3} />
      ))}

      {([[55, 54], [55, 212], [55, 370]] as [number, number][]).map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y} width={95} height={56} rx={9} fill="white" fillOpacity={0.07} stroke="white" strokeOpacity={0.22} strokeWidth={1} />
          <line x1={x + 10} y1={y + 17} x2={x + 78} y2={y + 17} stroke="white" strokeOpacity={0.22} strokeWidth={1.4} strokeLinecap="round" />
          <line x1={x + 10} y1={y + 29} x2={x + 58} y2={y + 29} stroke="white" strokeOpacity={0.13} strokeWidth={1.4} strokeLinecap="round" />
          <line x1={x + 10} y1={y + 41} x2={x + 70} y2={y + 41} stroke="white" strokeOpacity={0.13} strokeWidth={1.4} strokeLinecap="round" />
        </g>
      ))}

      <rect x={380} y={183} width={160} height={114} rx={14} fill="white" fillOpacity={0.1} stroke="white" strokeOpacity={0.38} strokeWidth={1.5} />
      <text x={460} y={236} textAnchor="middle" fill="white" fillOpacity={0.9} fontSize={26} fontFamily="sans-serif">✦</text>
      <line x1={400} y1={254} x2={520} y2={254} stroke="white" strokeOpacity={0.13} strokeWidth={1} />
      <line x1={400} y1={264} x2={506} y2={264} stroke="white" strokeOpacity={0.09} strokeWidth={1} />
      <line x1={400} y1={274} x2={490} y2={274} stroke="white" strokeOpacity={0.09} strokeWidth={1} />
      <line x1={400} y1={284} x2={514} y2={284} stroke="white" strokeOpacity={0.07} strokeWidth={1} />

      {([[710, 54], [710, 212], [710, 370]] as [number, number][]).map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y} width={95} height={56} rx={9} fill="white" fillOpacity={0.07} stroke="white" strokeOpacity={0.22} strokeWidth={1} />
          <text x={x + 48} y={y + 35} textAnchor="middle" fill="white" fillOpacity={0.55} fontSize={18} fontFamily="sans-serif">✓</text>
        </g>
      ))}

      {[
        { cx: 310, cy: 82, fill: "#4ecdc4", op: 0.6 },
        { cx: 310, cy: 398, fill: "#E8654B", op: 0.6 },
        { cx: 614, cy: 82, fill: "#4ecdc4", op: 0.6 },
        { cx: 614, cy: 398, fill: "#E8654B", op: 0.6 },
        { cx: 460, cy: 152, fill: "white", op: 0.2 },
        { cx: 460, cy: 328, fill: "white", op: 0.2 },
      ].map(({ cx, cy, fill, op }, i) => (
        <polygon key={i} points={hexPts(cx, cy, 14)} fill={fill} fillOpacity={op} />
      ))}

      {([[102, 152], [102, 328], [757, 152], [757, 328], [460, 116]] as [number, number][]).map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={19} fill="white" fillOpacity={0.07} stroke="white" strokeOpacity={0.2} strokeWidth={1} />
          <circle cx={cx} cy={cy - 5} r={5} fill="white" fillOpacity={0.18} />
          <path d={`M ${cx - 7} ${cy + 12} Q ${cx} ${cy + 6} ${cx + 7} ${cy + 12}`} fill="white" fillOpacity={0.14} />
        </g>
      ))}

      <text x={812} y={58} fill="white" fillOpacity={0.28} fontSize={18} fontFamily="sans-serif">✦</text>
      <text x={36} y={168} fill="white" fillOpacity={0.17} fontSize={22} fontFamily="sans-serif">⊕</text>
      <text x={36} y={422} fill="white" fillOpacity={0.17} fontSize={22} fontFamily="sans-serif">⊕</text>
      <text x={822} y={422} fill="white" fillOpacity={0.17} fontSize={22} fontFamily="sans-serif">◇</text>
      <text x={258} y={245} fill="white" fillOpacity={0.4} fontSize={13} fontFamily="sans-serif">→</text>
      <text x={608} y={245} fill="white" fillOpacity={0.4} fontSize={13} fontFamily="sans-serif">→</text>

      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx={840} cy={180 + i * 42} r={3} fill="white" fillOpacity={Math.max(0.06, 0.16 - i * 0.025)} />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <circle key={i} cx={22} cy={100 + i * 74} r={3} fill="white" fillOpacity={0.2} />
      ))}
    </svg>
  );
}

function HeroSection({ study }: { study: CaseStudy }) {
  return (
    <section
      className="relative h-screen snap-start snap-always flex flex-col justify-end px-6 md:px-24 pt-32 pb-0 overflow-hidden"
      style={{ backgroundColor: study.heroColor }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <CaseStudyHeroBg />
      </motion.div>

      <motion.div className="relative z-10 max-w-5xl" {...fadeUp(0.1)}>
        <p
          className="text-xs uppercase tracking-widest font-semibold text-black/50 mb-4"
          style={{ fontFamily: "'Wotfard', sans-serif" }}
        >
          {study.category} · {study.year}
        </p>
        <h1
          className="text-4xl md:text-6xl leading-[1.05] text-[#1a1a1a] mb-4"
          style={{ fontFamily: "'Wotfard', sans-serif", fontWeight: 700 }}
        >
          {study.title}
        </h1>
        {study.subtitle && (
          <p
            className="text-sm md:text-base leading-relaxed text-[#1a1a1a]/55 mb-10 md:mb-14"
            style={{ fontFamily: "'Wotfard', sans-serif" }}
          >
            {study.subtitle}
          </p>
        )}
        {!study.subtitle && <div className="mb-10 md:mb-14" />}
      </motion.div>

      <motion.div
        className="relative z-10 rounded-t-2xl bg-[#1a1a1a] px-6 md:px-10 py-6 flex flex-wrap items-center justify-between gap-6"
        {...fadeUp(0.25)}
      >
        <div className="flex flex-wrap gap-8">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Company</p>
            <p className="text-sm font-semibold text-white" style={{ fontFamily: "'Wotfard', sans-serif" }}>{study.company}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Role</p>
            <p className="text-sm font-semibold text-white" style={{ fontFamily: "'Wotfard', sans-serif" }}>{study.role}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Platform</p>
            <p className="text-sm font-semibold text-white" style={{ fontFamily: "'Wotfard', sans-serif" }}>{study.platform}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Timeline</p>
            <p className="text-sm font-semibold text-white" style={{ fontFamily: "'Wotfard', sans-serif" }}>{study.timeline}</p>
          </div>
        </div>
        <div className="flex gap-8">
          {study.metrics.map((m, i) => (
            <div key={i} className="text-right">
              <p className="text-2xl md:text-3xl font-bold text-[#E8654B]" style={{ fontFamily: "'Wotfard', sans-serif" }}>{m.value}</p>
              <p className="text-[10px] uppercase tracking-widest text-white/40">{m.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function OverviewSection({ study }: { study: CaseStudy }) {
  return (
    <section
      className="relative h-screen snap-start snap-always flex flex-col justify-center px-6 md:px-24 overflow-hidden"
      style={{ background: "#FAF8F5" }}
    >
      <SnapReveal>
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 max-w-5xl">
          <div className="md:w-1/3 flex-shrink-0">
            <h2
              className="text-2xl md:text-3xl leading-tight text-foreground"
              style={{ fontFamily: "'Wotfard', sans-serif", fontWeight: 700 }}
            >
              Overview
            </h2>
          </div>
          <div className="md:w-2/3 flex flex-col gap-5">
            {study.overview.split("\n\n").map((para, i) => (
              <p
                key={i}
                className="text-base md:text-lg leading-relaxed text-foreground/80"
                style={{ fontFamily: "'Wotfard', sans-serif" }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </SnapReveal>
    </section>
  );
}

function ChallengeSection({ study }: { study: CaseStudy }) {
  return (
    <section
      className="relative h-screen snap-start snap-always flex flex-col justify-center px-6 md:px-24 overflow-hidden"
      style={{ background: "#FAF8F5" }}
    >
      <SnapReveal>
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 max-w-5xl">
          <div className="md:w-1/3 flex-shrink-0">
            <h2
              className="text-2xl md:text-3xl leading-tight text-foreground"
              style={{ fontFamily: "'Wotfard', sans-serif", fontWeight: 700 }}
            >
              The challenge
            </h2>
          </div>
          <div className="md:w-2/3 flex flex-col gap-6">
            <p
              className="text-base md:text-lg leading-relaxed text-foreground/80"
              style={{ fontFamily: "'Wotfard', sans-serif" }}
            >
              {study.challenge.text}
            </p>
            <ul className="flex flex-col gap-3">
              {study.challenge.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#2D2D2D]/40 flex-shrink-0" />
                  <span
                    className="text-sm leading-relaxed text-foreground/70"
                    style={{ fontFamily: "'Wotfard', sans-serif" }}
                  >
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SnapReveal>
    </section>
  );
}

function ProcessSection({ study }: { study: CaseStudy }) {
  return (
    <section
      className="relative h-screen snap-start snap-always flex flex-col justify-center px-6 md:px-24 overflow-hidden"
      style={{ background: "#FAF8F5" }}
    >
      <SnapReveal>
        <h2
          className="text-2xl md:text-3xl leading-tight text-foreground mb-10 max-w-5xl"
          style={{ fontFamily: "'Wotfard', sans-serif", fontWeight: 700 }}
        >
          Process
        </h2>
      </SnapReveal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl">
        {study.process.map((step, i) => (
          <SnapReveal key={i} delay={0.06 + i * 0.07}>
            <div className="rounded-2xl bg-[#F0EDE8] px-6 py-6 flex flex-col gap-2">
              <p
                className="text-xs font-bold text-[#2D2D2D]/30 tabular-nums"
                style={{ fontFamily: "'Wotfard', sans-serif" }}
              >
                {step.number}
              </p>
              <h3
                className="text-base md:text-lg font-bold text-[#2D2D2D]"
                style={{ fontFamily: "'Wotfard', sans-serif" }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm leading-relaxed text-[#2D2D2D]/70"
                style={{ fontFamily: "'Wotfard', sans-serif" }}
              >
                {step.description}
              </p>
            </div>
          </SnapReveal>
        ))}
      </div>
    </section>
  );
}

function SolutionSection({ study }: { study: CaseStudy }) {
  return (
    <section
      className="relative h-screen snap-start snap-always flex flex-col justify-center px-6 md:px-24 overflow-hidden"
      style={{ background: "#FAF8F5" }}
    >
      <SnapReveal>
        <div className="max-w-5xl flex flex-col gap-8">
          <div className="flex flex-col md:flex-row gap-10 md:gap-24">
            <div className="md:w-1/3 flex-shrink-0">
              <h2
                className="text-2xl md:text-3xl leading-tight text-foreground"
                style={{ fontFamily: "'Wotfard', sans-serif", fontWeight: 700 }}
              >
                The solution
              </h2>
            </div>
            <div className="md:w-2/3 flex flex-col gap-3">
              <h3
                className="text-xl md:text-2xl font-bold text-foreground"
                style={{ fontFamily: "'Wotfard', sans-serif" }}
              >
                {study.solution.title}
              </h3>
              <p
                className="text-base leading-relaxed text-foreground/70"
                style={{ fontFamily: "'Wotfard', sans-serif" }}
              >
                {study.solution.description}
              </p>
            </div>
          </div>

          <div
            className="w-full rounded-2xl overflow-hidden flex-shrink-0"
            style={{ backgroundColor: study.heroColor, height: "180px" }}
          >
            <img
              src={study.image}
              alt={study.imageAlt}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {study.solution.features.map((feature, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="w-5 h-[2px] bg-[#E8654B] rounded-full mb-1" />
                <h4
                  className="text-sm font-bold text-foreground"
                  style={{ fontFamily: "'Wotfard', sans-serif" }}
                >
                  {feature.title}
                </h4>
                <p
                  className="text-sm leading-relaxed text-foreground/60"
                  style={{ fontFamily: "'Wotfard', sans-serif" }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SnapReveal>
    </section>
  );
}

function ImpactSection({ study }: { study: CaseStudy }) {
  return (
    <section
      className="relative h-screen snap-start snap-always flex flex-col justify-center px-6 md:px-24 overflow-hidden"
      style={{ background: "#FAF8F5" }}
    >
      <SnapReveal>
        <h2
          className="text-2xl md:text-3xl leading-tight text-foreground mb-14 max-w-5xl"
          style={{ fontFamily: "'Wotfard', sans-serif", fontWeight: 700 }}
        >
          Impact
        </h2>
      </SnapReveal>
      <div className="flex flex-col md:flex-row gap-0 divide-y md:divide-y-0 md:divide-x divide-[#e8e4de] max-w-5xl">
        {study.impact.map((item, i) => (
          <SnapReveal
            key={i}
            delay={0.08 + i * 0.1}
            className="flex-1 px-0 md:px-10 py-8 md:py-0 first:pl-0 last:pr-0 flex flex-col gap-2"
          >
            <p
              className="text-4xl md:text-5xl font-bold text-[#E8654B]"
              style={{ fontFamily: "'Wotfard', sans-serif" }}
            >
              {item.value}
            </p>
            <p
              className="text-xs uppercase tracking-widest font-semibold text-[#2D2D2D]/50"
              style={{ fontFamily: "'Wotfard', sans-serif" }}
            >
              {item.label}
            </p>
            <p
              className="text-sm leading-relaxed text-foreground/60 mt-1"
              style={{ fontFamily: "'Wotfard', sans-serif" }}
            >
              {item.description}
            </p>
          </SnapReveal>
        ))}
      </div>
    </section>
  );
}

function NextProjectSection({ study }: { study: CaseStudy }) {
  const next = getNextCaseStudy(study.id);
  if (!next) return null;

  return (
    <section
      className="relative h-screen snap-start snap-always flex flex-col justify-center px-6 md:px-24 overflow-hidden"
      style={{ background: "#FAF8F5" }}
    >
      <SnapReveal>
        <div className="max-w-5xl">
          <p
            className="text-xs uppercase tracking-widest font-semibold text-[#2D2D2D]/40 mb-6"
            style={{ fontFamily: "'Wotfard', sans-serif" }}
          >
            Next project
          </p>
          <Link
            href={`/work/${next.id}`}
            className="group flex items-center justify-between rounded-2xl bg-[#1a1a1a] px-8 py-7 hover:bg-[#252525] transition-colors"
          >
            <div className="flex flex-col gap-1">
              <p
                className="text-xs text-white/40 uppercase tracking-widest"
                style={{ fontFamily: "'Wotfard', sans-serif" }}
              >
                {next.category}
              </p>
              <h3
                className="text-xl md:text-2xl font-bold text-white"
                style={{ fontFamily: "'Wotfard', sans-serif" }}
              >
                {next.title}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors flex-shrink-0 ml-6">
              <ArrowUpRight size={18} className="text-white" />
            </div>
          </Link>
        </div>
      </SnapReveal>
    </section>
  );
}

export default function CaseStudyPage() {
  const params = useParams<{ id: string }>();
  const scrollRef = useRef<HTMLDivElement>(null);

  const id = parseInt(params.id ?? "", 10);
  const study = getCaseStudy(id);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [id]);

  if (!study) {
    return <NotFound />;
  }

  return (
    <div
      className="h-screen overflow-hidden relative selection:bg-foreground selection:text-background"
      style={{ background: "#FAF8F5" }}
    >
      <header className="fixed top-0 left-0 right-0 z-50 py-5 px-6 md:px-24 flex items-center justify-between bg-transparent">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium text-[#2D2D2D]/70 hover:text-[#2D2D2D] transition-colors group"
          style={{ fontFamily: "'Wotfard', sans-serif" }}
        >
          <div className="w-8 h-8 rounded-full border border-[#2D2D2D]/20 flex items-center justify-center group-hover:border-[#2D2D2D]/50 transition-colors">
            <ArrowLeft size={14} strokeWidth={1.5} />
          </div>
          <span>Back</span>
        </Link>
        <Link
          href="/"
          className="text-lg font-serif font-medium tracking-wide hover:opacity-70 transition-opacity text-[#2D2D2D]"
        >
          Adil Hussain
        </Link>
      </header>

      <div
        ref={scrollRef}
        className="h-screen overflow-y-scroll"
        style={{ scrollSnapType: "y mandatory", scrollbarWidth: "none" }}
      >
        <HeroSection study={study} />
        <OverviewSection study={study} />
        <ChallengeSection study={study} />
        <ProcessSection study={study} />
        <SolutionSection study={study} />
        <ImpactSection study={study} />
        <NextProjectSection study={study} />
      </div>
    </div>
  );
}
