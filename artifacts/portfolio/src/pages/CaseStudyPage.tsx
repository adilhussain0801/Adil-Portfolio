import { useParams, Link } from "wouter";
import { useRef, useEffect, useState, useMemo, type RefObject } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Quote, Inbox, SearchCode, Clock, Repeat2, Search, Brain, Zap, FileText, Clock as ClockIcon, TrendingDown, AlertTriangle, Lightbulb, Sparkles, RefreshCw, Network, MessageSquare, ChevronLeft, ChevronRight, X, CheckCircle2, Settings } from "lucide-react";
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

function BeforeAfterSlider({ before, after, bgColor }: { before: string; after: string; bgColor: string }) {
  const [sliderPos, setSliderPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const getPos = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  const onMouseDown = (e: React.MouseEvent) => { e.preventDefault(); setDragging(true); };
  const onMouseMove = (e: React.MouseEvent) => { if (dragging) getPos(e.clientX); };
  const onMouseUp = () => setDragging(false);
  const onTouchMove = (e: React.TouchEvent) => { getPos(e.touches[0].clientX); };

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchMove={onTouchMove}
      onTouchEnd={onMouseUp}
      style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", userSelect: "none", cursor: dragging ? "ew-resize" : "default" }}
    >
      {/* After image (full width, base layer) */}
      <img
        src={after}
        alt="After"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top left", display: "block" }}
        draggable={false}
      />

      {/* Before image clipped to left portion */}
      <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
        <img
          src={before}
          alt="Before"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top left", display: "block" }}
          draggable={false}
        />
      </div>

      {/* Labels */}
      <div style={{ position: "absolute", top: 14, left: 16, background: "rgba(0,0,0,0.55)", color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", padding: "4px 10px", borderRadius: 20, fontFamily: "'Wotfard', sans-serif", pointerEvents: "none", opacity: sliderPos > 12 ? 1 : 0, transition: "opacity 0.2s" }}>BEFORE</div>
      <div style={{ position: "absolute", top: 14, right: 16, background: "rgba(0,0,0,0.55)", color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", padding: "4px 10px", borderRadius: 20, fontFamily: "'Wotfard', sans-serif", pointerEvents: "none", opacity: sliderPos < 88 ? 1 : 0, transition: "opacity 0.2s" }}>AFTER</div>

      {/* Divider line */}
      <div style={{ position: "absolute", top: 0, bottom: 0, left: `${sliderPos}%`, transform: "translateX(-50%)", width: 2, background: "rgba(255,255,255,0.9)", boxShadow: "0 0 8px rgba(0,0,0,0.3)", pointerEvents: "none" }} />

      {/* Handle */}
      <div
        onMouseDown={onMouseDown}
        onTouchStart={(e) => { e.preventDefault(); setDragging(true); }}
        style={{
          position: "absolute",
          top: "50%",
          left: `${sliderPos}%`,
          transform: "translate(-50%, -50%)",
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "#fff",
          boxShadow: "0 2px 12px rgba(0,0,0,0.22), 0 0 0 2px rgba(255,255,255,0.6)",
          cursor: "ew-resize",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M7 5L3 10L7 15M13 5L17 10L13 15" stroke="#555" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Fade overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "65%",
          background: `linear-gradient(to top, ${bgColor} 0%, ${bgColor}f5 20%, ${bgColor}cc 40%, ${bgColor}66 60%, transparent 100%)`,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

function CaseStudyHeroBg({ bgColor }: { bgColor: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ perspective: "1200px" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 75% at 70% 46%, rgba(255,255,255,0.38) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute select-none flex items-center justify-center"
        style={{
          inset: 0,
          paddingTop: "100px",
          paddingBottom: "40px",
        }}
      >
        <div
          style={{
            width: "calc(100% - 192px)",
            height: "100%",
            borderRadius: "16px",
            overflow: "hidden",
            position: "relative",
            border: "4px solid rgba(255, 255, 255, 0.45)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
          }}
        >
          <BeforeAfterSlider
            before="/rovo-before.png"
            after="/rovo-after.png"
            bgColor={bgColor}
          />
        </div>
      </div>
    </div>
  );
}

function HeroSection({ study }: { study: CaseStudy }) {
  return (
    <section
      id="section-hero"
      className="relative h-screen snap-start snap-always flex flex-col pb-0 overflow-hidden"
      style={{ backgroundColor: study.heroColor }}
    >
      {/* Center video */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 flex items-center justify-center relative z-10"
      >
        <CaseStudyHeroBg bgColor={study.heroColor} />
      </motion.div>

      {/* Title & Subtitle at bottom */}
      <div className="relative z-10 w-full pb-12">
        <motion.div
          className="flex flex-col gap-5 px-8 md:px-20"
          {...fadeUp(0.1)}
        >
          <h1
            className="text-5xl md:text-[3.75rem] leading-[1.02] text-[#1a1a1a]"
            style={{ fontFamily: "'Wotfard', sans-serif", fontWeight: 700 }}
          >
            {study.title}
          </h1>
          <div className="w-10 h-[3px] rounded-full" style={{ background: "#E8654B" }} />
          {study.subtitle && (
            <p
              className="text-sm md:text-[15px] leading-relaxed text-[#1a1a1a]/58"
              style={{ fontFamily: "'Wotfard', sans-serif" }}
            >
              {study.subtitle}
            </p>
          )}
        </motion.div>
      </div>

      <motion.div
        className="relative z-10 w-full px-6 md:px-20"
        {...fadeUp(0.25)}
      >
        <div className="rounded-t-2xl bg-[#1a1a1a] px-6 md:px-10 py-6 flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap gap-8">
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
                <p className="md:text-sm font-bold text-[#E8654B] text-[14px]" style={{ fontFamily: "'Wotfard', sans-serif" }}>{m.value}</p>
                <p className="text-[10px] uppercase tracking-widest text-white/40">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function OverviewSection({ study }: { study: CaseStudy }) {
  return (
    <section
      id="section-overview"
      className="relative h-screen snap-start snap-always flex flex-col justify-center overflow-hidden"
      style={{ background: "#FAF8F5" }}
    >
      <SnapReveal>
        <div className="max-w-3xl mx-auto w-full px-6">
          <h2
            className="text-2xl md:text-3xl leading-tight text-foreground mb-8"
            style={{ fontFamily: "'Wotfard', sans-serif", fontWeight: 700 }}
          >
            Overview
          </h2>

          {/* Quote card — skewed parallelogram style */}
          <div className="relative pl-10">
            <img
              src="/quote-mark.png"
              alt=""
              className="absolute left-0 top-6 w-14 h-auto z-10 select-none pointer-events-none"
            />
            <div
              className="rounded-xl px-8 pt-14 pb-8 relative overflow-hidden"
              style={{
                background: "#FCE8E4",
                transform: "skewY(-3deg)",
              }}
            >
              <div style={{ transform: "skewY(3deg)" }}>
                {study.id === 4 ? (
                  <div className="flex flex-col gap-4">
                    <p className="text-base md:text-lg leading-relaxed text-[#1a1a1a]" style={{ fontFamily: "'Wotfard', sans-serif" }}>
                      Rovo Service is an AI-powered system designed to{" "}
                      <mark style={{ background: "rgba(99,102,241,0.14)", color: "#4338CA", borderRadius: "5px", padding: "2px 7px", fontWeight: 700 }}>
                        transform how enterprise support works
                      </mark>
                      {" "}— shifting from{" "}
                      <mark style={{ background: "rgba(232,101,75,0.14)", color: "#C05437", borderRadius: "5px", padding: "2px 7px", fontWeight: 700 }}>
                        reactive ticket handling
                      </mark>
                      {" "}to{" "}
                      <mark style={{ background: "rgba(99,102,241,0.14)", color: "#4338CA", borderRadius: "5px", padding: "2px 7px", fontWeight: 700 }}>
                        proactive, autonomous issue resolution
                      </mark>
                      .
                    </p>
                    <p className="text-base md:text-lg leading-relaxed text-[#1a1a1a]" style={{ fontFamily: "'Wotfard', sans-serif" }}>
                      Built within Jira Service Management, the system{" "}
                      <mark style={{ background: "rgba(99,102,241,0.14)", color: "#4338CA", borderRadius: "5px", padding: "2px 7px", fontWeight: 700 }}>
                        embeds AI agents directly into service workflows
                      </mark>
                      , enabling them to understand requests, generate resolution plans, and execute actions across tools — while{" "}
                      <mark style={{ background: "rgba(99,102,241,0.14)", color: "#4338CA", borderRadius: "5px", padding: "2px 7px", fontWeight: 700 }}>
                        keeping humans in control
                      </mark>
                      .
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {study.overview.split("\n\n").map((para, i) => (
                      <p
                        key={i}
                        className="text-base md:text-lg leading-relaxed text-[#1a1a1a]"
                        style={{ fontFamily: "'Wotfard', sans-serif" }}
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </SnapReveal>
    </section>
  );
}

const STEP_DELAY = 0.45;
const STEP_FIRST = 0.3;

const TAYLOR_MOODS = [
  { label: "Trying to make sense of it…", tint: "rgba(0,0,0,0)", scale: 1.0 },
  { label: "Messaging the requester again…", tint: "rgba(200,120,60,0.06)", scale: 1.01 },
  { label: "Jumping between tools…", tint: "rgba(200,100,40,0.12)", scale: 1.02 },
  { label: "Overwhelmed by documents…", tint: "rgba(180,70,30,0.18)", scale: 1.03 },
  { label: "Manually collating everything…", tint: "rgba(160,50,20,0.22)", scale: 1.03 },
  { label: "Finally done. Until the next one.", tint: "rgba(120,40,20,0.28)", scale: 1.04 },
];

function TaylorAvatar({ activeStep }: { activeStep: number }) {
  const mood = activeStep >= 0 ? TAYLOR_MOODS[Math.min(activeStep, TAYLOR_MOODS.length - 1)] : null;

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden flex-1 min-h-0"
      style={{ background: "#e8e4de" }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.25 }}
    >
      <div
        className="w-full h-full"
        style={{
          backgroundImage: "url('/taylor-storyboard.png')",
          backgroundSize: "510% auto",
          backgroundPosition: "0% 88%",
          backgroundRepeat: "no-repeat",
        }}
      />
      <motion.div
        className="absolute inset-0"
        animate={{ backgroundColor: mood?.tint ?? "rgba(0,0,0,0)" }}
        transition={{ duration: 0.7, ease: APPLE }}
      />
      <div className="absolute bottom-0 left-0 right-0 px-4 py-3" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 100%)" }}>
        <p
          className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-0.5"
          style={{ fontFamily: "'Wotfard', sans-serif" }}
        >
          Taylor · Service Agent
        </p>
        <motion.p
          key={activeStep}
          className="text-sm text-white/90 leading-snug"
          style={{ fontFamily: "'Wotfard', sans-serif" }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          {mood?.label ?? "Starting a new ticket…"}
        </motion.p>
      </div>
    </motion.div>
  );
}

const CHALLENGE_PALETTE = [
  { cardBg: "#F5F3F0", cardBorder: "#E8DFD7", numColor: "#D4C4B0", accentColor: "#E8654B" },
  { cardBg: "#F0F4F8", cardBorder: "#D6E4F0", numColor: "#B8CDD9", accentColor: "#3B82F6" },
  { cardBg: "#F5F0F3", cardBorder: "#EFDBEB", numColor: "#D4B8C8", accentColor: "#EC4899" },
];

const CHALLENGE_ICONS = [
  (color: string) => <Inbox size={20} color={color} strokeWidth={1.5} />,
  (color: string) => <SearchCode size={20} color={color} strokeWidth={1.5} />,
  (color: string) => <Clock size={20} color={color} strokeWidth={1.5} />,
];

function ChallengeSection({ study }: { study: CaseStudy }) {
  const groups = study.challenge.timelineGroups;

  const heroStatement =
    "Service agents spend more time understanding requests than resolving them. A single request requires navigating fragmented tools, clarifying missing information, and manually stitching together a resolution plan resulting in delays, inefficiencies, and high cognitive load.";

  if (groups && groups.length > 0) {
    return (
      <section
        id="section-challenge"
        className="relative min-h-screen snap-start snap-always"
        style={{ background: "#FAF8F5" }}
      >
        {/* Slide 1: Hero Statement */}
        <div className="h-screen snap-start snap-always flex flex-col justify-center py-16">
          <div className="max-w-5xl mx-auto w-full px-6 flex flex-col gap-8">

            {/* Title */}
            <SnapReveal>
              <h2
                className="text-3xl md:text-4xl font-bold text-[#1a1a1a] leading-tight"
                style={{ fontFamily: "'Wotfard', sans-serif" }}
              >
                The system doesn't scale
              </h2>
            </SnapReveal>

            {/* Two-column: text left, metrics right */}
            <div className="flex gap-10 items-start">

              {/* Left: paragraphs */}
              <SnapReveal className="flex-1">
                <div className="flex flex-col gap-5">
                  <p className="text-sm md:text-base leading-relaxed text-[#1a1a1a]/70" style={{ fontFamily: "'Wotfard', sans-serif" }}>
                    Enterprise support operates at massive scale, where even small inefficiencies compound into significant{" "}
                    <strong className="text-[#1a1a1a] font-semibold">operational cost.</strong>
                  </p>
                  <p className="text-sm md:text-base leading-relaxed text-[#1a1a1a]/70" style={{ fontFamily: "'Wotfard', sans-serif" }}>
                    Agents spend up to <strong className="text-[#1a1a1a] font-semibold">40–60%</strong> of their time not resolving issues, but{" "}
                    <strong className="text-[#1a1a1a] font-semibold">understanding</strong> them — navigating fragmented tools, clarifying incomplete requests, and manually assembling context.
                  </p>
                  <p className="text-sm md:text-base leading-relaxed text-[#1a1a1a]/70" style={{ fontFamily: "'Wotfard', sans-serif" }}>
                    This results in <strong className="text-[#1a1a1a] font-semibold">slower resolution times</strong>, higher{" "}
                    <strong className="text-[#1a1a1a] font-semibold">cognitive load</strong>, and a model that{" "}
                    <strong className="text-[#1a1a1a] font-semibold">scales linearly with headcount</strong> — making it increasingly{" "}
                    <strong className="text-[#1a1a1a] font-semibold">unsustainable</strong> as demand grows.
                  </p>
                </div>
              </SnapReveal>

              {/* Right: metrics stacked */}
              <SnapReveal delay={0.15} className="flex-shrink-0 w-52 flex flex-col gap-3">
                {[
                  { value: "$15–$50", label: "Average cost per ticket", color: "#E8654B", bg: "#FEF0EC", border: "rgba(232,101,75,0.18)" },
                  { value: "3–6 tools", label: "Used per request", color: "#16a34a", bg: "#F0FDF4", border: "rgba(22,163,74,0.18)" },
                  { value: "40–60%", label: "Time spent on understanding, not resolving", color: "#6366F1", bg: "#F0F0FE", border: "rgba(99,102,241,0.18)" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="rounded-2xl px-5 py-4 flex flex-col gap-1"
                    style={{ background: stat.bg, border: `1px solid ${stat.border}` }}
                  >
                    <p className="text-xl font-bold leading-tight" style={{ color: stat.color, fontFamily: "'Wotfard', sans-serif" }}>
                      {stat.value}
                    </p>
                    <p className="text-xs leading-relaxed text-[#1a1a1a]/55" style={{ fontFamily: "'Wotfard', sans-serif" }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </SnapReveal>
            </div>

            {/* Callout */}
            <SnapReveal delay={0.3}>
              <div
                className="rounded-2xl px-8 py-6"
                style={{ background: "#F5F1EB", border: "1px solid #E8E4DE" }}
              >
                <p
                  className="text-xl md:text-2xl font-bold leading-snug"
                  style={{ color: "#E8654B", fontFamily: "'Wotfard', sans-serif" }}
                >
                  The problem wasn't just{" "}
                  <span style={{ color: "#5B8A72" }}>inefficiency</span>
                  {" "}— it was a system that fundamentally didn't scale.
                </p>
              </div>
            </SnapReveal>

          </div>
        </div>

        {/* Why Resolution Breaks Down slide */}
        <div className="h-screen snap-start snap-always flex flex-col justify-center py-16">
          <div className="max-w-5xl mx-auto w-full px-6 flex flex-col gap-12">

            <SnapReveal>
              <h2
                className="text-3xl md:text-4xl font-bold text-[#1a1a1a] leading-tight text-center"
                style={{ fontFamily: "'Wotfard', sans-serif" }}
              >
                Why resolution breaks down
              </h2>
            </SnapReveal>

            {/* Flow diagram */}
            <SnapReveal delay={0.1}>
              <div className="flex items-start">
                {[
                  { label: "Request",       color: "#2563EB", headerBg: "rgba(37,99,235,0.12)",   icon: <Inbox size={32} />,        issue: "Latency",            issueColor: "#2563EB" },
                  { label: "Understand",    color: "#7C3AED", headerBg: "rgba(124,58,237,0.12)", icon: <Network size={32} />,       issue: "Fragmentation",      issueColor: "#7C3AED" },
                  { label: "Gather context",color: "#B45309", headerBg: "rgba(180,83,9,0.12)",   icon: <Brain size={32} />,         issue: "Cognitive overload", issueColor: "#B45309" },
                  { label: "Execute",       color: "#0F766E", headerBg: "rgba(15,118,110,0.12)", icon: <Settings size={32} />,      issue: "Execution gap",      issueColor: "#0F766E" },
                  { label: "Resolve",       color: "#4338CA", headerBg: "rgba(67,56,202,0.12)",  icon: <CheckCircle2 size={32} />,  issue: "Execution gap",      issueColor: "#4338CA" },
                ].flatMap((step, i, arr) => {
                  const items: JSX.Element[] = [
                    <div key={`step-${i}`} className="flex flex-col items-center gap-3 flex-1 min-w-0">
                      {/* Label pill */}
                      <div
                        className="rounded-full px-4 py-1.5"
                        style={{ background: step.headerBg }}
                      >
                        <span
                          className="text-sm font-bold whitespace-nowrap"
                          style={{ color: step.color, fontFamily: "'Wotfard', sans-serif" }}
                        >
                          {step.label}
                        </span>
                      </div>

                      {/* Icon */}
                      <div style={{ color: step.color, opacity: 0.8 }}>
                        {step.icon}
                      </div>

                      {/* Warning label */}
                      <div className="flex items-center gap-1">
                        <AlertTriangle size={11} style={{ color: step.issueColor }} />
                        <span
                          className="text-[9px] font-bold tracking-[0.14em] uppercase"
                          style={{ color: step.issueColor, fontFamily: "'Wotfard', sans-serif" }}
                        >
                          {step.issue}
                        </span>
                      </div>
                    </div>,
                  ];
                  if (i < arr.length - 1) {
                    items.push(
                      <div key={`arrow-${i}`} className="flex-shrink-0 flex items-start" style={{ paddingTop: "9px" }}>
                        <svg width="36" height="16" viewBox="0 0 36 16" fill="none">
                          <defs>
                            <linearGradient id={`ag-${i}`} x1="0" y1="0" x2="36" y2="0" gradientUnits="userSpaceOnUse">
                              <stop offset="0%" stopColor={arr[i].color} stopOpacity="0.55" />
                              <stop offset="100%" stopColor={arr[i + 1].color} stopOpacity="0.55" />
                            </linearGradient>
                          </defs>
                          <path d="M2 8H28" stroke={`url(#ag-${i})`} strokeWidth="2" strokeLinecap="round" />
                          <path d="M22 3L30 8L22 13" stroke={`url(#ag-${i})`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    );
                  }
                  return items;
                })}
              </div>
            </SnapReveal>

            {/* Callout */}
            <SnapReveal delay={0.35}>
              <div
                className="rounded-2xl px-8 py-6"
                style={{ background: "#FEF0EC", border: "1px solid rgba(232,101,75,0.2)" }}
              >
                <p
                  className="text-base font-bold mb-1"
                  style={{ color: "#E8654B", fontFamily: "'Wotfard', sans-serif" }}
                >
                  The system doesn't fail at one step — it fails at every transition.
                </p>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "#E8654B", fontFamily: "'Wotfard', sans-serif" }}
                >
                  Understanding, context gathering, and execution are all{" "}
                  <strong>disconnected</strong> — forcing humans to bridge the gaps.
                </p>
              </div>
            </SnapReveal>

          </div>
        </div>

        {/* Slides 2–4: One slide per challenge group */}
        {groups.map((group, gi) => {
          const p = CHALLENGE_PALETTE[gi % CHALLENGE_PALETTE.length];
          return (
            <div
              key={gi}
              className="h-screen snap-start snap-always flex flex-col justify-center py-20"
            >
              <SnapReveal>
                <div className="max-w-2xl mx-auto w-full px-6 flex flex-col gap-6">
                      {/* Number */}
                      <p
                        className="text-7xl font-bold tabular-nums leading-none"
                        style={{ color: p.numColor, fontFamily: "'Wotfard', sans-serif" }}
                      >
                        {String(gi + 1).padStart(2, "0")}
                      </p>

                      {/* Stage label */}
                      <p
                        className="text-xs font-bold tracking-widest uppercase"
                        style={{ color: p.accentColor, fontFamily: "'Wotfard', sans-serif" }}
                      >
                        Stage {gi + 1} friction
                      </p>

                      {/* Phase title */}
                      <h3
                        className="text-2xl md:text-3xl font-bold leading-tight text-[#1a1a1a] -mt-3"
                        style={{ fontFamily: "'Wotfard', sans-serif" }}
                      >
                        {group.phase}
                      </h3>

                      {/* Description */}
                      <p
                        className="text-sm leading-relaxed text-[#1a1a1a]/60"
                        style={{ fontFamily: "'Wotfard', sans-serif" }}
                      >
                        {group.description}
                      </p>

                      {/* Progress bar */}
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span
                            className="text-[10px] font-bold tracking-widest uppercase text-[#1a1a1a]/40"
                            style={{ fontFamily: "'Wotfard', sans-serif" }}
                          >
                            Intake
                          </span>
                          <span
                            className="text-[10px] font-bold tracking-widest uppercase"
                            style={{ color: p.accentColor, fontFamily: "'Wotfard', sans-serif" }}
                          >
                            {group.timelineEndLabel}
                          </span>
                        </div>
                        <div className="relative h-2 rounded-full overflow-hidden bg-[#E8E4DE]">
                          <motion.div
                            className="absolute left-0 top-0 h-full rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${group.timelineProgress}%` }}
                            transition={{ duration: 1, ease: EASE, delay: 0.3 }}
                            style={{
                              background: "linear-gradient(to right, #22c55e 0%, #eab308 50%, #ef4444 100%)",
                            }}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          {group.timelineMarkers.map((m, mi) => (
                            <span
                              key={mi}
                              className="text-[10px] text-[#1a1a1a]/40"
                              style={{ fontFamily: "'Wotfard', sans-serif" }}
                            >
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Metric callout */}
                      <div
                        className="rounded-2xl px-6 py-5 text-center"
                        style={{ backgroundColor: p.cardBg, border: `1.5px solid ${p.cardBorder}` }}
                      >
                        <p
                          className="text-4xl font-bold mb-1"
                          style={{ color: p.accentColor, fontFamily: "'Wotfard', sans-serif" }}
                        >
                          {group.metric.value}
                        </p>
                        <p
                          className="text-[10px] font-bold tracking-widest uppercase text-[#1a1a1a]/50"
                          style={{ fontFamily: "'Wotfard', sans-serif" }}
                        >
                          {group.metric.label}
                        </p>
                      </div>
                </div>
              </SnapReveal>
            </div>
          );
        })}

        {/* Final slide: Pain Points */}
        <div className="h-screen snap-start snap-always flex flex-col justify-center py-20">
          <div className="max-w-3xl mx-auto w-full px-6">
            <SnapReveal>
              {study.challenge.painPoints ? (
                <div className="flex flex-col gap-4">
                  {study.challenge.painPoints.map((pt, i) => {
                    const BADGE_STYLES: Record<string, { bg: string; color: string }> = {
                      "HIGH FRICTION":    { bg: "#FEE2E2", color: "#B91C1C" },
                      "SYSTEMIC WASTE":   { bg: "#CCFBF1", color: "#0F766E" },
                      "CRITICAL BARRIER": { bg: "#FFE4E6", color: "#BE123C" },
                      "PROCESS LAG":      { bg: "#DBEAFE", color: "#1D4ED8" },
                    };
                    const ICON_MAP: Record<string, { icon: JSX.Element; bg: string; color: string }> = {
                      repeat: { icon: <Repeat2 size={18} />, bg: "#FEE2E2", color: "#B91C1C" },
                      search: { icon: <Search size={18} />, bg: "#CCFBF1", color: "#0F766E" },
                      brain:  { icon: <Brain size={18} />, bg: "#FFE4E6", color: "#BE123C" },
                      zap:    { icon: <Zap size={18} />, bg: "#DBEAFE", color: "#1D4ED8" },
                    };
                    const badge = BADGE_STYLES[pt.badge] ?? { bg: "#F3F4F6", color: "#6B7280" };
                    const iconDef = ICON_MAP[pt.icon] ?? ICON_MAP["zap"];
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: EASE, delay: 0.08 + i * 0.08 }}
                        className="bg-white rounded-2xl border border-[#E8E4DE] px-5 py-5 flex flex-col gap-3"
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className="rounded-xl p-2.5 flex-shrink-0"
                            style={{ background: iconDef.bg, color: iconDef.color }}
                          >
                            {iconDef.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3 mb-1.5">
                              <h3
                                className="text-sm font-bold text-[#1a1a1a] leading-snug"
                                style={{ fontFamily: "'Wotfard', sans-serif" }}
                              >
                                {pt.title}
                              </h3>
                              <span
                                className="text-[8px] font-bold tracking-widest uppercase px-2 py-1 rounded flex-shrink-0 whitespace-nowrap"
                                style={{ background: badge.bg, color: badge.color }}
                              >
                                {pt.badge}
                              </span>
                            </div>
                            <p
                              className="text-xs leading-relaxed text-[#1a1a1a]/55"
                              style={{ fontFamily: "'Wotfard', sans-serif" }}
                            >
                              {pt.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 flex-wrap pl-[52px]">
                          {pt.stats.map((s, si) => (
                            <span
                              key={si}
                              className="text-[10px] text-[#1a1a1a]/50 bg-[#F5F3EF] px-3 py-1 rounded-full"
                              style={{ fontFamily: "'Wotfard', sans-serif" }}
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <ul className="flex flex-col gap-5">
                  {study.challenge.bullets.map((b, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, ease: EASE, delay: 0.1 + i * 0.1 }}
                      className="flex items-start gap-3 p-4 rounded-xl transition-colors hover:bg-[#E8654B]/5"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#E8654B]/40 flex-shrink-0" />
                      <span
                        className="text-sm leading-relaxed text-foreground/80"
                        style={{ fontFamily: "'Wotfard', sans-serif" }}
                      >
                        {b}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              )}
            </SnapReveal>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="section-challenge"
      className="relative h-screen snap-start snap-always flex flex-col justify-center overflow-hidden"
      style={{ background: "#FAF8F5" }}
    >
      <SnapReveal>
        <div className="max-w-3xl mx-auto w-full px-6 flex flex-col gap-6">
          <h2
            className="text-2xl md:text-3xl leading-tight text-foreground"
            style={{ fontFamily: "'Wotfard', sans-serif", fontWeight: 700 }}
          >
            The challenge
          </h2>
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
      </SnapReveal>
    </section>
  );
}

function IndustryTrendsSection() {
  const BG_SIZE = "930px auto";
  const BG_Y = -200;

  const competitors = [
    {
      name: "servicenow.",
      nameColor: "#62D84E",
      descriptor: "Workflow-heavy platform with newly integrated AI layers for enterprise automation.",
      tag: "LEGACY CONTEXT",
      cardBg: "#EDFAE5",
      borderColor: "rgba(98,216,78,0.25)",
      bgX: 22,
    },
    {
      name: "zendesk",
      nameColor: "#D97706",
      descriptor: "CX-centric approach focusing on agent productivity and omnichannel AI assistance.",
      tag: "CX DOMINANCE",
      cardBg: "#FDF5E6",
      borderColor: "rgba(217,119,6,0.25)",
      bgX: 201,
    },
    {
      name: "freshservice",
      nameColor: "#00A751",
      descriptor: "Intuitive ITSM solution leveraging Freddy AI for predictive service management.",
      tag: "MID-MARKET KING",
      cardBg: "#E6F6EE",
      borderColor: "rgba(0,167,81,0.25)",
      bgX: 379,
    },
    {
      name: "INTERCOM",
      nameColor: "#1F8DED",
      descriptor: "Fin AI agent leader, moving aggressively into autonomous resolution for support.",
      tag: "RESOLUTION FAST",
      cardBg: "#E9F4FE",
      borderColor: "rgba(31,141,237,0.25)",
      bgX: 557,
    },
    {
      name: "Moveworks",
      nameColor: "#6366F1",
      descriptor: "AI-native resolution engine built to automate enterprise support across all departments.",
      tag: "PURE AUTONOMOUS",
      cardBg: "#F5F4FF",
      borderColor: "rgba(99,102,241,0.25)",
      bgX: 735,
    },
  ];

  return (
    <section
      id="section-process"
      className="relative h-screen snap-start snap-always flex flex-col justify-center overflow-hidden"
      style={{ background: "#FAF8F5" }}
    >
      <div className="max-w-5xl mx-auto w-full px-6 flex flex-col gap-6">
        <SnapReveal>
          <div className="flex flex-col gap-2">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#1a1a1a] leading-tight mb-2"
              style={{ fontFamily: "'Wotfard', sans-serif" }}
            >
              Top competitors
            </h2>
            <p className="text-sm text-[#1a1a1a]/55 w-full" style={{ fontFamily: "'Wotfard', sans-serif" }}>
              The competitive landscape is witnessing a seismic shift from traditional ticketing systems toward{" "}
              <strong className="text-[#1a1a1a] font-semibold">AI-powered autonomous agents</strong>
              {" "}capable of resolving complex enterprise workflows.
            </p>
          </div>
        </SnapReveal>

        <div className="grid grid-cols-5 gap-3">
          {competitors.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE, delay: 0.1 + i * 0.07 }}
              className="rounded-2xl overflow-hidden flex flex-col"
              style={{ background: c.cardBg, border: `1px solid ${c.borderColor}` }}
            >
              <div
                className="mx-3 mt-3 rounded-xl overflow-hidden flex-shrink-0"
                style={{
                  height: "200px",
                  backgroundImage: "url(/competitor-overview.png)",
                  backgroundSize: BG_SIZE,
                  backgroundPosition: `-${c.bgX}px ${BG_Y}px`,
                  backgroundRepeat: "no-repeat",
                }}
              />
              <div className="px-4 pt-3 pb-4 flex flex-col gap-3">
                <p className="text-xs leading-relaxed text-[#1a1a1a]/65" style={{ fontFamily: "'Wotfard', sans-serif" }}>{c.descriptor}</p>
                <p className="text-[9px] font-bold tracking-[0.12em] uppercase mt-auto" style={{ color: c.nameColor, fontFamily: "'Wotfard', sans-serif" }}>{c.tag}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <SnapReveal delay={0.5}>
          <div
            className="w-full rounded-2xl px-8 py-6 flex items-center gap-10 mt-4"
            style={{ background: "#F0EDE8", border: "1px solid #E8E4DE" }}
          >
            <div className="flex-1 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Sparkles size={13} style={{ color: "#E8654B" }} />
                <span className="text-[9px] font-bold tracking-[0.18em] uppercase" style={{ color: "#E8654B", fontFamily: "'Wotfard', sans-serif" }}>
                  Strategic Observation
                </span>
              </div>
              <p className="text-base font-medium leading-snug text-[#1a1a1a]" style={{ fontFamily: "'Wotfard', sans-serif" }}>
                'The market is converging toward AI agents — yet no player combines deep workflow context with autonomous execution.'
              </p>
            </div>
            <div className="flex flex-col gap-0.5 flex-shrink-0 pl-8 border-l border-[#E8E4DE]">
              <p className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/35" style={{ fontFamily: "'Wotfard', sans-serif" }}>Market Gap Index</p>
              <p className="text-3xl font-bold text-[#E8654B] leading-none" style={{ fontFamily: "'Wotfard', sans-serif" }}>84.2<span className="text-lg">%</span></p>
            </div>
          </div>
        </SnapReveal>
      </div>
    </section>
  );
}

function EmergingThemesSection() {
  const themes = [
    {
      icon: <RefreshCw size={20} />,
      title: "Autonomous Resolution",
      description: "Service tools are evolving from ticketing facilitators into active agents capable of resolving complex, high-volume requests end-to-end without human intervention.",
    },
    {
      icon: <Network size={20} />,
      title: "Cross-system Orchestration",
      description: "Intelligent agents now navigate the entire enterprise stack, seamlessly executing workflows across IT infrastructure, HR systems, Identity providers, and SaaS applications.",
    },
    {
      icon: <MessageSquare size={20} />,
      title: "Conversational Interfaces",
      description: "The interface of the future is natural language. Users and operators command complex planning and execution through sophisticated dialogue, bypassing traditional UIs.",
    },
  ];

  return (
    <section
      id="section-emerging"
      className="relative h-screen snap-start snap-always flex flex-col justify-center overflow-hidden"
      style={{ background: "#FAF8F5" }}
    >
      <div className="w-full px-8 md:px-20 flex flex-col gap-10">
        {/* Header */}
        <SnapReveal>
          <div className="flex flex-col gap-3">
            <p
              className="text-[10px] uppercase tracking-widest font-bold text-[#E8654B]"
              style={{ fontFamily: "'Wotfard', sans-serif" }}
            >
              Insights from exploration
            </p>
            <h2
              className="text-2xl md:text-3xl leading-tight text-[#1a1a1a]"
              style={{ fontFamily: "'Wotfard', sans-serif", fontWeight: 700 }}
            >
              Patterns that shaped the direction
            </h2>
            <p
              className="text-sm leading-relaxed text-[#1a1a1a]/58 w-full"
              style={{ fontFamily: "'Wotfard', sans-serif" }}
            >Through early research and competitive studies, we recognized three key patterns in how service tools were evolving.</p>
          </div>
        </SnapReveal>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {themes.map((t, i) => (
            <SnapReveal key={i} delay={0.1 + i * 0.1}>
              <div
                className="rounded-2xl flex flex-col p-6"
                style={{ background: "#F0EDE8", border: "1px solid #E8E4DE" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: "rgba(232,101,75,0.12)", color: "#E8654B" }}
                >
                  {t.icon}
                </div>
                <h3
                  className="text-lg md:text-xl font-bold leading-tight mb-3"
                  style={{ color: "#1a1a1a", fontFamily: "'Wotfard', sans-serif" }}
                >
                  {t.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(26,26,26,0.58)", fontFamily: "'Wotfard', sans-serif" }}
                >
                  {t.description}
                </p>
              </div>
            </SnapReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection({ study }: { study: CaseStudy }) {
  if (study.id === 4) {
    return <IndustryTrendsSection />;
  }
  return (
    <section
      className="relative h-screen snap-start snap-always flex flex-col justify-center overflow-hidden"
      style={{ background: "#FAF8F5" }}
    >
      <div className="max-w-3xl mx-auto w-full px-6">
        <SnapReveal>
          <h2
            className="text-2xl md:text-3xl leading-tight text-foreground mb-10"
            style={{ fontFamily: "'Wotfard', sans-serif", fontWeight: 700 }}
          >
            Process
          </h2>
        </SnapReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </div>
    </section>
  );
}

function ScreenCard({
  src,
  alt,
  style,
  delay = 0,
  isInView,
}: {
  src: string;
  alt: string;
  style: React.CSSProperties;
  delay?: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 22, scale: 0.97 }}
      transition={{ duration: 0.65, ease: EASE, delay }}
      style={{
        position: "absolute",
        borderRadius: 6,
        overflow: "hidden",
        boxShadow: "0 8px 28px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.07)",
        background: "#fff",
        ...style,
      }}
    >
      <img src={src} alt={alt} style={{ width: "100%", display: "block", height: "auto" }} />
    </motion.div>
  );
}

function StickyNote({
  text,
  rotate,
  color = "#FEFCE8",
  delay = 0,
  isInView,
  style,
}: {
  text: string;
  rotate: number;
  color?: string;
  delay?: number;
  isInView: boolean;
  style: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
      transition={{ duration: 0.5, ease: EASE, delay }}
      style={{
        position: "absolute",
        background: color,
        padding: "9px 13px",
        borderRadius: 3,
        transform: `rotate(${rotate}deg)`,
        boxShadow: "0 3px 10px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.06)",
        fontFamily: "'Wotfard', sans-serif",
        fontSize: 11.5,
        fontWeight: 600,
        color: "#2D2D2D",
        maxWidth: 148,
        lineHeight: 1.45,
        zIndex: 20,
        pointerEvents: "none",
        ...style,
      }}
    >
      {text}
    </motion.div>
  );
}

const CONCEPT_SCREENS = [
  {
    src: "/concept-v2-queue-list.webp",
    alt: "Queue List View",
    area: "a",
    delay: 0,
    title: "Queue List View",
    description: "At-a-glance status across all open requests, with Rovo's resolution state and assignment surfaced directly in the list.",
  },
  {
    src: "/concept-v2-thinking.webp",
    alt: "AI Thinking State",
    area: "b",
    delay: 0.04,
    title: "AI Thinking State",
    description: "Rovo surfaces its reasoning in real-time as it analyses each service request, making the process transparent to Service Agents.",
  },
  {
    src: "/concept-v2-plan-preview.webp",
    alt: "Resolution Plan Preview",
    area: "c",
    delay: 0.08,
    title: "Resolution Plan Preview",
    description: "Structured plan surfaces context and recommended actions before any action is taken, keeping Service Agents in control.",
  },
  {
    src: "/concept-v2-plan-detail.webp",
    alt: "Plan Detail View",
    area: "d",
    delay: 0.11,
    title: "Plan Detail View",
    description: "Step-by-step resolution plan with conditional branching for complex, multi-path work items.",
  },
  {
    src: "/concept-v2-plan-editing.webp",
    alt: "Plan Editing",
    area: "e",
    delay: 0.13,
    title: "Plan Editing",
    description: "Service Agents can refine AI-generated plans before assigning Rovo to execute — maintaining human oversight at every step.",
  },
  {
    src: "/concept-v2-plan-executing.webp",
    alt: "Plan Executing",
    area: "f",
    delay: 0.15,
    title: "Plan Executing",
    description: "Live execution state showing Rovo's progress in real-time as it completes each step and updates the work item.",
  },
  {
    src: "/concept-v2-landing.webp",
    alt: "Rovo Service Landing",
    area: "g",
    delay: 0.17,
    title: "Rovo Service Landing",
    description: "Configure how Rovo operates per space — with resolution management, onboarding journeys, and self-service setup in one place.",
  },
  {
    src: "/concept-v2-it-general.webp",
    alt: "IT Execution Settings",
    area: "h",
    delay: 0.19,
    title: "IT Execution Settings",
    description: "Fine-grained controls that map request types to execution modes — Auto, Supervised, or Assistive — across the team.",
  },
];

const DESIGN_PRINCIPLES = [
  {
    num: "01",
    icon: (color: string) => <Lightbulb size={22} color={color} strokeWidth={1.6} />,
    accentColor: "#6366F1",
    cardBg: "#F0F0FE",
    borderColor: "rgba(99,102,241,0.2)",
    numColor: "#C7C8F8",
    title: "Make AI intent visible",
    description: "AI should clearly communicate what it is doing, why it is doing it, and what happens next.",
    insight: "Showing AI as \u2018thinking\u2026\u2019 exposes the biggest gap \u2014 invisible reasoning erodes trust before action is even taken.",
  },
  {
    num: "02",
    icon: (color: string) => <TrendingDown size={22} color={color} strokeWidth={1.6} />,
    accentColor: "#E8654B",
    cardBg: "#FEF0EC",
    borderColor: "rgba(232,101,75,0.2)",
    numColor: "#F9C5B8",
    title: "Prioritize outcomes over process visibility",
    description: "Design for outcomes, not for process visibility.",
    insight: "Early designs exposed logic — plans, trees, steps. But users care about resolution, not how the machine thinks.",
  },
  {
    num: "03",
    icon: (color: string) => <Brain size={22} color={color} strokeWidth={1.6} />,
    accentColor: "#3B82F6",
    cardBg: "#EFF6FF",
    borderColor: "rgba(59,130,246,0.2)",
    numColor: "#BFDBFE",
    title: "Reduce cognitive load, don't shift it",
    description: "AI should eliminate decisions, not create new ones.",
    insight: "Users had to interpret plans, validate steps, and fix flows. AI added work instead of removing it — the opposite of the promise.",
  },
];

function DesignPrinciplesSection() {
  return (
    <section
      id="section-principles"
      className="relative h-screen snap-start snap-always flex flex-col justify-center overflow-hidden"
      style={{ background: "#FAF8F5" }}
    >
      <SnapReveal>
        <div className="w-full px-8 md:px-20 flex flex-col gap-10">
          {/* Header */}
          <div className="flex flex-col gap-2">
            <p
              className="text-[10px] uppercase tracking-widest font-bold text-[#E8654B]"
              style={{ fontFamily: "'Wotfard', sans-serif" }}
            >
              Design philosophy
            </p>
            <h2
              className="text-2xl md:text-3xl leading-tight text-[#1a1a1a]"
              style={{ fontFamily: "'Wotfard', sans-serif", fontWeight: 700 }}
            >
              Principles guiding the product direction
            </h2>
            <p
              className="text-sm leading-relaxed text-[#1a1a1a]/58 mt-2"
              style={{ fontFamily: "'Wotfard', sans-serif" }}
            >
              These principles emerged from identifying that AI was present in the workflow, but not meaningfully improving how users think or act.
            </p>
          </div>

          {/* Principles grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {DESIGN_PRINCIPLES.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: APPLE, delay: 0.1 + i * 0.1 }}
                className="flex flex-col gap-4 rounded-2xl p-6"
                style={{
                  background: p.cardBg,
                  border: `1.5px solid ${p.borderColor}`,
                }}
              >
                {/* Number + icon row */}
                <div className="flex items-start justify-between">
                  <span
                    className="text-5xl font-bold tabular-nums leading-none"
                    style={{ color: p.numColor, fontFamily: "'Wotfard', sans-serif" }}
                  >
                    {p.num}
                  </span>
                  <div
                    className="rounded-xl p-2.5"
                    style={{ background: `${p.accentColor}18` }}
                  >
                    {p.icon(p.accentColor)}
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="text-base font-bold leading-snug text-[#1a1a1a]"
                  style={{ fontFamily: "'Wotfard', sans-serif" }}
                >
                  {p.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed text-[#1a1a1a]/60"
                  style={{ fontFamily: "'Wotfard', sans-serif" }}
                >
                  {p.description}
                </p>

                {/* Insight callout */}
                <div
                  className="mt-auto rounded-xl px-4 py-3"
                  style={{ background: "rgba(0,0,0,0.04)" }}
                >
                  <p
                    className="text-[12px] leading-relaxed"
                    style={{ color: `${p.accentColor}`, fontFamily: "'Wotfard', sans-serif", fontWeight: 600 }}
                  >
                    {p.insight}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SnapReveal>
    </section>
  );
}

function EarlyStageConceptsSection() {
  const wallRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(wallRef, { once: true, amount: 0.1 });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lastIndex, setLastIndex] = useState(0);

  const openLightbox = (i: number) => { setLastIndex(i); setLightboxIndex(i); };
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => { const n = (lastIndex - 1 + CONCEPT_SCREENS.length) % CONCEPT_SCREENS.length; setLastIndex(n); setLightboxIndex(n); };
  const next = () => { const n = (lastIndex + 1) % CONCEPT_SCREENS.length; setLastIndex(n); setLightboxIndex(n); };

  return (
    <section
      id="section-concepts"
      className="relative h-screen snap-start snap-always overflow-hidden"
      style={{ background: "#F6F4F0" }}
    >
      {/* Subtle paper noise texture */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="concepts-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch" />
          </filter>
        </defs>
      </svg>
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          filter: "url(#concepts-noise)",
          opacity: 0.028,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Main layout: top-left header + full-bleed wall */}
      <div className="relative z-10 h-full flex flex-col">

        {/* Header row */}
        <div className="flex-shrink-0 px-10 md:px-20 pt-20 pb-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p
              className="text-[11px] uppercase tracking-widest font-semibold mb-2"
              style={{ color: "#E8654B", fontFamily: "'Wotfard', sans-serif" }}
            >
              Design Process
            </p>
            <h2
              className="text-2xl md:text-[1.75rem] leading-tight text-[#1a1a1a] mb-3"
              style={{ fontFamily: "'Wotfard', sans-serif", fontWeight: 700 }}
            >
              Early stage concepts
            </h2>
            <p
              className="text-[13px] leading-relaxed"
              style={{ color: "rgba(26,26,26,0.48)", fontFamily: "'Wotfard', sans-serif" }}
            >
              Exploring multiple approaches — exposing context, surfacing AI reasoning, and reducing operator effort.
            </p>
          </motion.div>
        </div>

        {/* Bento grid */}
        <div
          ref={wallRef}
          className="flex-1 px-8 md:px-14 pb-8 overflow-hidden"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gridTemplateRows: "repeat(3, 1fr)",
            gridTemplateAreas: `
              "a a a b c"
              "d e e e f"
              "g g g h h"
            `,
            gap: 7,
          }}
        >
          {CONCEPT_SCREENS.map((screen, i) => (
            <div
              key={i}
              onClick={() => openLightbox(i)}
              className="bento-cell"
              style={{
                gridArea: screen.area,
                borderRadius: 8,
                overflow: "hidden",
                boxShadow: "0 4px 16px rgba(0,0,0,0.09), 0 1px 4px rgba(0,0,0,0.05)",
                background: "#fff",
                cursor: "pointer",
              }}
            >
              <img
                src={screen.src}
                alt={screen.alt}
                loading="eager"
                decoding="async"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top left", display: "block" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox — always in DOM, CSS-only visibility */}
      {(() => {
        const screen = CONCEPT_SCREENS[lastIndex];
        const open = lightboxIndex !== null;
        return (
          <div
            onClick={closeLightbox}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 999,
              background: "rgba(10,10,10,0.88)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "32px",
              opacity: open ? 1 : 0,
              pointerEvents: open ? "auto" : "none",
              transition: "opacity 0.14s ease",
              willChange: "opacity",
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "#fff",
                borderRadius: 14,
                overflow: "hidden",
                maxWidth: 1200,
                width: "100%",
                boxShadow: "0 32px 80px rgba(0,0,0,0.4)",
                display: "flex",
                flexDirection: "column",
                transform: open ? "scale(1) translateY(0)" : "scale(0.97) translateY(10px)",
                opacity: open ? 1 : 0,
                transition: "transform 0.14s ease, opacity 0.14s ease",
                willChange: "transform, opacity",
              }}
            >
              {/* Modal header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 22px",
                  borderBottom: "1px solid rgba(0,0,0,0.07)",
                  gap: 16,
                  minWidth: 0,
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 0, flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <h3
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "#1a1a1a",
                        fontFamily: "'Wotfard', sans-serif",
                        margin: 0,
                      }}
                    >
                      {screen.title}
                    </h3>
                  </div>
                  <p
                    style={{
                      fontSize: 12.5,
                      color: "rgba(26,26,26,0.52)",
                      fontFamily: "'Wotfard', sans-serif",
                      margin: 0,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {screen.description}
                  </p>
                </div>
                <button
                  onClick={closeLightbox}
                  className="modal-close-btn"
                  style={{
                    background: "rgba(0,0,0,0.06)",
                    border: "none",
                    borderRadius: "50%",
                    width: 32,
                    height: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    flexShrink: 0,
                    transition: "background 0.18s ease, transform 0.18s ease",
                  }}
                >
                  <X size={16} color="#2D2D2D" />
                </button>
              </div>

              {/* Image */}
              <div style={{ background: "#F6F4F0" }}>
                <img
                  src={screen.src}
                  alt={screen.alt}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>

              {/* Nav footer */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 18px",
                  borderTop: "1px solid rgba(0,0,0,0.07)",
                }}
              >
                <button
                  onClick={prev}
                  className="modal-nav-btn"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    background: "rgba(0,0,0,0)",
                    border: "none",
                    cursor: "pointer",
                    color: "#2D2D2D",
                    fontFamily: "'Wotfard', sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    padding: "6px 10px",
                    borderRadius: 6,
                    transition: "background 0.18s ease",
                  }}
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>
                {/* Dots */}
                <div style={{ display: "flex", gap: 6 }}>
                  {CONCEPT_SCREENS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => openLightbox(idx)}
                      className="modal-dot-btn"
                      style={{
                        width: idx === lastIndex ? 18 : 7,
                        height: 7,
                        borderRadius: 4,
                        border: "none",
                        cursor: "pointer",
                        background: idx === lastIndex ? "#E8654B" : "rgba(45,45,45,0.18)",
                        padding: 0,
                        transition: "width 0.15s ease, background 0.15s ease, opacity 0.15s ease",
                      }}
                    />
                  ))}
                </div>
                <button
                  onClick={next}
                  className="modal-nav-btn"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    background: "rgba(0,0,0,0)",
                    border: "none",
                    cursor: "pointer",
                    color: "#2D2D2D",
                    fontFamily: "'Wotfard', sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    padding: "6px 10px",
                    borderRadius: 6,
                    transition: "background 0.18s ease",
                  }}
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </section>
  );
}

function SolutionSection({ study }: { study: CaseStudy }) {
  return (
    <section
      id="section-solution"
      className="relative h-screen snap-start snap-always flex flex-col justify-center overflow-hidden"
      style={{ background: "#FAF8F5" }}
    >
      <SnapReveal>
        <div className="max-w-3xl mx-auto w-full px-6 flex flex-col gap-8">
          <div>
            <h2
              className="text-2xl md:text-3xl leading-tight text-foreground mb-3"
              style={{ fontFamily: "'Wotfard', sans-serif", fontWeight: 700 }}
            >
              The solution
            </h2>
            <h3
              className="text-lg md:text-xl font-bold text-foreground mb-2"
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

          <div
            className="w-full rounded-2xl overflow-hidden flex-shrink-0"
            style={{ backgroundColor: study.heroColor, height: "160px" }}
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
      id="section-impact"
      className="relative h-screen snap-start snap-always flex flex-col justify-center overflow-hidden"
      style={{ background: "#FAF8F5" }}
    >
      <div className="max-w-3xl mx-auto w-full px-6">
        <SnapReveal>
          <h2
            className="text-2xl md:text-3xl leading-tight text-foreground mb-14"
            style={{ fontFamily: "'Wotfard', sans-serif", fontWeight: 700 }}
          >
            Impact
          </h2>
        </SnapReveal>
        <div className="flex flex-col md:flex-row gap-0 divide-y md:divide-y-0 md:divide-x divide-[#e8e4de]">
          {study.impact.map((item, i) => (
            <SnapReveal
              key={i}
              delay={0.08 + i * 0.1}
              className="flex-1 px-0 md:px-8 py-8 md:py-0 first:pl-0 last:pr-0 flex flex-col gap-2"
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
      </div>
    </section>
  );
}

function NextProjectSection({ study }: { study: CaseStudy }) {
  const next = getNextCaseStudy(study.id);
  if (!next) return null;

  return (
    <section
      id="section-next"
      className="relative h-screen snap-start snap-always flex flex-col justify-center overflow-hidden"
      style={{ background: "#FAF8F5" }}
    >
      <SnapReveal>
        <div className="max-w-3xl mx-auto w-full px-6">
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

const DOT_SIZE = 10;
const DOT_GAP = 14;

function SectionNav({ study, scrollRef }: { study: CaseStudy; scrollRef: RefObject<HTMLDivElement> }) {
  const [active, setActive] = useState("section-hero");
  const [hovered, setHovered] = useState<string | null>(null);

  const sections = useMemo(() => [
    { id: "section-overview", label: "Overview" },
    { id: "section-challenge", label: "Challenge" },
    { id: "section-process", label: study.id === 4 ? "Competitors" : "Process" },
    ...(study.id === 4 ? [{ id: "section-principles", label: "Principles" }] : []),
    ...(study.id === 4 ? [{ id: "section-concepts", label: "Concepts" }] : []),
    { id: "section-solution", label: "Solution" },
    { id: "section-impact", label: "Impact" },
    { id: "section-next", label: "Next Project" },
  ], [study.id]);

  // Sections that should activate a different dot (alias → canonical dot id)
  const aliases: Record<string, string> = useMemo(() => (
    study.id === 4 ? { "section-emerging": "section-process" } : {}
  ), [study.id]);

  const observeIds = useMemo(() => [
    "section-hero",
    ...sections.map((s) => s.id),
    ...Object.keys(aliases),
  ], [sections, aliases]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActive(aliases[id] ?? id);
          }
        });
      },
      { root: container, threshold: 0, rootMargin: "-50% 0px -50% 0px" }
    );
    observeIds.forEach((id) => {
      const el = container.querySelector(`#${id}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [scrollRef, observeIds, aliases]);

  const scrollTo = (id: string) => {
    const container = scrollRef.current;
    if (!container) return;
    const el = container.querySelector(`#${id}`);
    if (el) (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
  };

  const visible = active !== "section-hero";

  return (
    <motion.div
      className="fixed left-6 top-1/2 -translate-y-1/2 z-50 pointer-events-none"
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -16 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex flex-col items-start" style={{ gap: DOT_GAP }}>
        {sections.map(({ id, label }) => {
          const isActive = id === active;
          const isHovered = hovered === id;
          return (
            <div
              key={id}
              className="relative flex items-center pointer-events-auto"
              style={{ gap: 14, cursor: "pointer" }}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => scrollTo(id)}
            >
              <motion.div
                className="flex-shrink-0 rounded-full"
                style={{ width: DOT_SIZE, height: DOT_SIZE }}
                animate={{ backgroundColor: isActive ? "rgba(45,45,45,0.7)" : "rgba(45,45,45,0.18)" }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="text-sm font-semibold whitespace-nowrap"
                style={{ fontFamily: "'Wotfard', sans-serif", color: "rgba(45,45,45,0.6)" }}
                initial={false}
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -6 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                {label}
              </motion.span>
            </div>
          );
        })}
      </div>
    </motion.div>
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

      <SectionNav study={study} scrollRef={scrollRef} />

      <div
        ref={scrollRef}
        className="h-screen overflow-y-scroll"
        style={{ scrollSnapType: "y mandatory", scrollbarWidth: "none" }}
      >
        <HeroSection study={study} />
        <OverviewSection study={study} />
        <ChallengeSection study={study} />
        <ProcessSection study={study} />
        {study.id === 4 && <EmergingThemesSection />}
        {study.id === 4 && <DesignPrinciplesSection />}
        {study.id === 4 && <EarlyStageConceptsSection />}
        <SolutionSection study={study} />
        <ImpactSection study={study} />
        <NextProjectSection study={study} />
      </div>
    </div>
  );
}
