import { useParams, Link } from "wouter";
import { useRef, useEffect, useState, useMemo, type RefObject } from "react";
import { motion, useInView, AnimatePresence, useMotionValue, useTransform, useSpring, animate } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Quote, Inbox, SearchCode, Clock, Repeat2, Search, Brain, Zap, FileText, Clock as ClockIcon, TrendingDown, AlertTriangle, Lightbulb, Sparkles, RefreshCw, Network, MessageSquare, ChevronLeft, ChevronRight, X, CheckCircle2, Settings, Banknote, Layers, Users, BookOpen, Bot, GraduationCap, Briefcase, Link2, ArrowLeftRight, BarChart2, Building2 } from "lucide-react";
import walkthroughScreenshot from "@assets/ExpWalkthrough_1775735219205.png";
import { getCaseStudy, getNextCaseStudy, getAllCaseStudies, type CaseStudy } from "@/data/caseStudies";
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
        role="slider"
        aria-label="Drag to compare before and after designs"
        aria-valuenow={Math.round(sliderPos)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onMouseDown={onMouseDown}
        onTouchStart={(e) => { e.preventDefault(); setDragging(true); }}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setSliderPos((p) => Math.max(0, p - 5));
          if (e.key === "ArrowRight") setSliderPos((p) => Math.min(100, p + 5));
          if (e.key === "Home") setSliderPos(0);
          if (e.key === "End") setSliderPos(100);
        }}
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
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none">
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

function CaseStudyHeroBg({
  bgColor,
  imageSrc,
  imageLeft = 80,
  imageWidth = "80%",
  imageBottom = 0,
}: {
  bgColor: string;
  imageSrc: string;
  imageLeft?: number | string;
  imageWidth?: string;
  imageBottom?: number | string;
}) {
  return (
    <div className="absolute inset-0" style={{ overflow: "visible" }}>

      {/* ── Background image ── */}
      <img
        src="/hero-bg.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full select-none pointer-events-none"
        style={{ objectFit: "cover", objectPosition: "center", zIndex: 0, opacity: 0.65 }}
      />

      {/* ── Product screenshot — anchored to bottom ── */}
      <img
        src={imageSrc}
        alt="Rovo Service Management interface"
        className="absolute select-none"
        data-no-dots="true"
        style={{
          left: imageLeft,
          bottom: imageBottom,
          width: imageWidth,
          height: "auto",
          display: "block",
          zIndex: 1,
          WebkitMaskImage: "radial-gradient(ellipse 50% 40% at 100% 0%, transparent 0%, black 65%), linear-gradient(to right, black 75%, rgba(0,0,0,0.6) 88%, transparent 98%)",
          maskImage: "radial-gradient(ellipse 50% 40% at 100% 0%, transparent 0%, black 65%), linear-gradient(to right, black 75%, rgba(0,0,0,0.6) 88%, transparent 98%)",
          WebkitMaskComposite: "destination-in",
          maskComposite: "intersect",
        }}
      />
    </div>
  );
}

function HeroSection({
  study,
  sectionId = "section-hero",
  imageSrc,
  imageLeft,
  imageWidth,
  imageBottom,
}: {
  study: CaseStudy;
  sectionId?: string;
  imageSrc?: string;
  imageLeft?: number | string;
  imageWidth?: string;
  imageBottom?: number | string;
}) {
  const resolvedImage = imageSrc ?? (study.id === 4 ? "/rovo-screens.png" : "/rovo-banner.png");
  return (
    <section
      id={sectionId}
      className="relative h-screen snap-start snap-always flex flex-col pb-0 overflow-hidden"
      style={{ backgroundColor: study.heroColor }}
    >
      {/* Background + screenshot — fills entire section */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
      >
        <CaseStudyHeroBg
          bgColor={study.heroColor}
          imageSrc={resolvedImage}
          imageLeft={imageLeft}
          imageWidth={imageWidth}
          imageBottom={imageBottom}
        />
      </motion.div>
      {/* Title + description — top left, above image */}
      <motion.div
        className="relative z-10 px-8 md:px-20 pt-48 md:pt-56 pb-0 max-w-xl"
        {...fadeUp(0.1)}
      >
        <p
          className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 mb-3 font-medium"
          style={{ fontFamily: "'Wotfard', sans-serif" }}
        >
          {study.timeline}
        </p>
        <h1
          className="text-5xl md:text-[3.6rem] leading-[1.05] text-[#1a1a1a] mb-4 font-black"
          style={{ fontFamily: "'Wotfard', sans-serif", fontWeight: 700 }}
        >
          {study.title}
        </h1>
        {study.subtitle && (
          <p
            className="text-sm md:text-[15px] leading-relaxed text-[#1a1a1a]/65 max-w-sm"
            style={{ fontFamily: "'Wotfard', sans-serif" }}
          >
            {study.subtitle}
          </p>
        )}
        {study.id === 4 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {[
              { label: "AI-powered triage", icon: <Sparkles size={11} strokeWidth={1.8} /> },
              { label: "Autonomous workflows", icon: <Zap size={11} strokeWidth={1.8} /> },
              { label: "Real-time insights", icon: <Network size={11} strokeWidth={1.8} /> },
            ].map(({ label, icon }) => (
              <span key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#5b8def]/12 border border-[#4a7de8]/20 text-[#4a7de8]">
                {icon}
                <span className="text-xs text-[#1a1a1a]/65" style={{ fontFamily: "'Wotfard', sans-serif" }}>{label}</span>
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}

function OverviewSection({ study }: { study: CaseStudy }) {
  return (
    <section
      id="section-overview"
      className="relative h-screen snap-start snap-always flex flex-col justify-center overflow-hidden"
      style={{ background: "#F7F7F5" }}
    >
      <SnapReveal>
        <div className="max-w-3xl mx-auto w-full px-6">
          {/* Quote card - skewed parallelogram style */}
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
                      {" "}- shifting from{" "}
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
                      , enabling them to understand requests, generate resolution plans, and execute actions across tools - while{" "}
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

function JourneyFocusDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, { once: false, amount: 0.3 });
  const FF = "'Wotfard', sans-serif";
  const MONO = "'Courier New', Courier, monospace";

  const nodeAnim = (delay: number) => ({
    initial: { opacity: 0, scale: 0.86 },
    animate: isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.86 },
    transition: { duration: 0.45, ease: EASE, delay },
  });

  const arrowAnim = (delay: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: isVisible ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 },
    transition: {
      pathLength: { duration: 0.48, delay, ease: "easeInOut" },
      opacity: { duration: 0.01, delay },
    },
    fill: "none" as const,
    strokeWidth: 2,
    strokeLinecap: "round" as const,
  });

  const lblAnim = (delay: number) => ({
    initial: { opacity: 0 },
    animate: isVisible ? { opacity: 1 } : { opacity: 0 },
    transition: { duration: 0.3, delay },
  });

  /*
   * Orthogonal layout — ViewBox "0 0 1200 500"
   * Row 1 (y=155): Customer ─── Help portal ─── Work item ─── Service Agent
   * Row 2 (y=375): Virtual service agent    Help articles
   *
   * All connectors are strictly horizontal or vertical (no diagonals).
   * HP→Row2 uses an elbow-tree: vertical trunk → horizontal branch → vertical drop.
   * Row2→WI uses L-shaped paths sharing a horizontal lane at y=468.
   */

  // Row 1 node positions
  const CX = 85,  CY = 155;
  const HPX = 310, HPY = 122, HPW = 252, HPH = 66;
  const WIX = 680, WIY = 122, WIW = 220, WIH = 66;
  const SAX = 1115, SAY = 155;

  // Row 2 node positions
  const VX = 320, VY = 375;
  const HAX = 490, HAY = 375;

  const R_LG = 55;          // inner coloured circle (avatar background)
  const R_RING = 69;        // outer bounding ring radius
  const R_SM = 52;
  const R_SM_INNER = 38;

  // Pill icon circles
  const HPcx = 348, HPcy = HPY + HPH / 2;
  const WIcx = 718, WIcy = WIY + WIH / 2;
  const R_ICON = 26;

  // Row 1 arrow endpoints — arrows start/end at outer ring edge
  const arr1x1 = CX + R_RING + 2, arr1x2 = HPX - 2;          // Customer → HP
  const arr2x1 = HPX + HPW + 2, arr2x2 = WIX - 2;             // HP → WI
  const arr3x1 = SAX - R_RING - 2, arr3x2 = WIX + WIW + 2;   // SA → WI (reversed)

  // HP → Row 2 elbow tree (exact spec values)
  const HP_BX = 405;     // trunk x — midpoint of VX(320) and HAX(490) for equal arms
  const HP_BY = 190;     // trunk y — HP bottom (spec, +2 from stroke edge)
  const SPLIT_Y = 242;   // y where trunk splits into branches

  // Row 2 → WI L-shape (exact spec values)
  const LANE_Y = 468;
  const WI_BCX = 790;    // WI bottom center x (spec)
  const WI_BY  = 190;    // WI bottom y (spec, +2 from stroke edge)

  return (
    <div ref={ref} className="w-full">
      <svg
        viewBox="0 0 1200 500"
        style={{ width: "100%", height: "auto" }}
        aria-label="Journey focus: service management workflow diagram"
        role="img"
      >
        <defs>
          <clipPath id="jf-c-cust"><circle cx={CX} cy={CY} r={R_LG - 2}/></clipPath>
          <clipPath id="jf-c-agent"><circle cx={SAX} cy={SAY} r={R_LG - 2}/></clipPath>
          <clipPath id="jf-c-hp"><circle cx={HPcx} cy={HPcy} r={R_ICON}/></clipPath>
          <clipPath id="jf-c-wi"><circle cx={WIcx} cy={WIcy} r={R_ICON}/></clipPath>

          <marker id="jf-m-gray" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#9CA3AF"/>
          </marker>
          <marker id="jf-m-blue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#357de8"/>
          </marker>
          <marker id="jf-m-lime" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#6a9a23"/>
          </marker>
          <marker id="jf-m-orange" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#e06c00"/>
          </marker>
        </defs>

        {/* ── ARROWS (rendered first, so nodes sit on top) ── */}

        {/* 1. Customer → Help portal (horizontal) */}
        <motion.line x1={arr1x1} y1={CY} x2={arr1x2} y2={CY}
          stroke="#9CA3AF" strokeWidth="1.5" markerEnd="url(#jf-m-gray)" {...arrowAnim(0.15)} />
        <motion.text x={232} y={CY - 14}
          textAnchor="middle" fontSize="15" fill="#803fa5" fontFamily={MONO} {...lblAnim(0.32)}>
          needs IT help
        </motion.text>

        {/* 2. Help portal → Work item (horizontal) */}
        <motion.line x1={arr2x1} y1={CY} x2={arr2x2} y2={CY}
          stroke="#9CA3AF" strokeWidth="1.5" markerEnd="url(#jf-m-gray)" {...arrowAnim(0.68)} />

        {/* 3. Service Agent → Work item (horizontal, arrow points left) */}
        <motion.line x1={arr3x1} y1={SAY} x2={arr3x2} y2={SAY}
          stroke="#e06c00" strokeWidth="1.5" markerEnd="url(#jf-m-orange)" {...arrowAnim(1.55)} />
        <motion.text x={980} y={SAY - 14}
          textAnchor="middle" fontSize="15" fill="#e06c00" fontFamily={MONO} {...lblAnim(1.72)}>
          assigned
        </motion.text>

        {/* 4. HP → Virtual: vertical trunk (436,190)→(436,242), left to 328, Q corner, drop to Virtual top (320,323) */}
        <motion.path
          d={`M ${HP_BX} ${HP_BY} V ${SPLIT_Y} H ${VX + 8} Q ${VX} ${SPLIT_Y} ${VX} ${SPLIT_Y + 8} V 323`}
          stroke="#357de8" strokeWidth="1.5" fill="none"
          markerEnd="url(#jf-m-blue)" {...arrowAnim(0.74)} />
        <motion.text x={292} y={287}
          textAnchor="end" fontSize="15" fill="#1558bc" fontFamily={MONO} {...lblAnim(0.92)}>
          deflection
        </motion.text>

        {/* 5. HP → Help articles: vertical trunk (436,190)→(436,242), right to 482, Q corner at (490,242), drop to HA top (490,323) */}
        <motion.path
          d={`M ${HP_BX} ${HP_BY} V ${SPLIT_Y} H ${HAX - 8} Q ${HAX} ${SPLIT_Y} ${HAX} ${SPLIT_Y + 8} V 323`}
          stroke="#357de8" strokeWidth="1.5" fill="none"
          markerEnd="url(#jf-m-blue)" {...arrowAnim(0.80)} />
        <motion.text x={518} y={287}
          textAnchor="start" fontSize="15" fill="#1558bc" fontFamily={MONO} {...lblAnim(0.96)}>
          self serve
        </motion.text>

        {/* 6. Virtual → WI: down to lane y=468, right to 776, up to WI bottom (790,190) */}
        <motion.path
          d="M 320 427 V 454 Q 320 468 334 468 H 776 Q 790 468 790 454 V 190"
          stroke="#6a9a23" strokeWidth="1.5" fill="none"
          markerEnd="url(#jf-m-lime)" {...arrowAnim(1.15)} />

        {/* 7. Help articles → WI: down to lane y=468, right to 776, up to WI bottom (790,190) */}
        <motion.path
          d="M 490 427 V 454 Q 490 468 504 468 H 776 Q 790 468 790 454 V 190"
          stroke="#6a9a23" strokeWidth="1.5" fill="none"
          markerEnd="url(#jf-m-lime)" {...arrowAnim(1.22)} />

        {/* "could not resolve" label */}
        <motion.text x={520} y={484}
          textAnchor="middle" fontSize="15" fill="#4c6b1f"
          fontFamily={MONO} {...lblAnim(1.4)}>could not resolve</motion.text>

        {/* ── NODES ── */}

        {/* Customer */}
        <motion.g {...nodeAnim(0)}>
          <circle cx={CX} cy={CY} r={R_RING} fill="white" stroke="#af59e1" strokeWidth="2"/>
          <circle cx={CX} cy={CY} r={R_LG} fill="#c07adf" stroke="none"/>
          <image href="/journey-focus/customer-overlay.png"
            x={CX - (R_LG - 2)} y={CY - (R_LG - 2)}
            width={(R_LG - 2) * 2} height={(R_LG - 2) * 2}
            clipPath="url(#jf-c-cust)" preserveAspectRatio="xMidYMid slice"/>
          <text x={CX} y={CY + R_RING + 22} textAnchor="middle" fontSize="20" fill="#803fa5"
            fontFamily={FF} fontWeight="600">Customer</text>
        </motion.g>

        {/* Help portal pill */}
        <motion.g {...nodeAnim(0.5)}>
          <rect x={HPX} y={HPY} width={HPW} height={HPH} rx="33"
            fill="white" stroke="#357de8" strokeWidth="2"/>
          <image href="/journey-focus/hp-icon.png"
            x={HPcx - R_ICON} y={HPcy - R_ICON} width={R_ICON * 2} height={R_ICON * 2}
            clipPath="url(#jf-c-hp)" preserveAspectRatio="xMidYMid slice"/>
          <text x={HPcx + R_ICON + 12} y={HPcy + 7}
            textAnchor="start" fontSize="19" fill="#172b4d"
            fontFamily={FF} fontWeight="700">Help portal</text>
        </motion.g>

        {/* Work item pill */}
        <motion.g {...nodeAnim(1.28)}>
          <rect x={WIX} y={WIY} width={WIW} height={WIH} rx="33"
            fill="white" stroke="#cf9f02" strokeWidth="2"/>
          <image href="/journey-focus/jsm-avatar.png"
            x={WIcx - R_ICON} y={WIcy - R_ICON} width={R_ICON * 2} height={R_ICON * 2}
            clipPath="url(#jf-c-wi)" preserveAspectRatio="xMidYMid slice"/>
          <text x={WIcx + R_ICON + 12} y={WIcy + 7}
            textAnchor="start" fontSize="19" fill="#172b4d"
            fontFamily={FF} fontWeight="700">Work item</text>
        </motion.g>

        {/* Service Agent */}
        <motion.g {...nodeAnim(1.72)}>
          <circle cx={SAX} cy={SAY} r={R_RING} fill="white" stroke="#fca700" strokeWidth="2"/>
          <circle cx={SAX} cy={SAY} r={R_LG} fill="#f5a623" stroke="none"/>
          <image href="/journey-focus/agent-overlay.png"
            x={SAX - (R_LG - 2)} y={SAY - (R_LG - 2)}
            width={(R_LG - 2) * 2} height={(R_LG - 2) * 2}
            clipPath="url(#jf-c-agent)" preserveAspectRatio="xMidYMid slice"/>
          <text x={SAX} y={SAY + R_RING + 22} textAnchor="middle" fontSize="20" fill="#e06c00"
            fontFamily={FF} fontWeight="600">Service Agent</text>
        </motion.g>

        {/* Virtual service agent */}
        <motion.g {...nodeAnim(0.92)}>
          <circle cx={VX} cy={VY} r={R_SM} fill="#efffd6" stroke="#6a9a23" strokeWidth="2"/>
          <circle cx={VX} cy={VY} r={R_SM_INNER} fill="#6a9a23"/>
          <g transform={`translate(${VX - R_SM_INNER * 0.49} ${VY - R_SM_INNER * 0.55}) scale(${R_SM_INNER * 0.99 / 31.5})`}>
            <path fillRule="evenodd" clipRule="evenodd" d="M13.4348 0.641282C14.8598 -0.213761 16.6402 -0.21376 18.0652 0.641282L29.3152 7.39128C30.6707 8.20454 31.5 9.66932 31.5 11.25V23.8152C31.5 25.3959 30.6707 26.8606 29.3152 27.6739L18.0652 34.4239C16.6402 35.2789 14.8598 35.2789 13.4348 34.4239L2.18477 27.6739C0.829342 26.8606 0 25.3959 0 23.8152V11.25C0 9.66932 0.829345 8.20454 2.18477 7.39128L13.4348 0.641282ZM16.3288 3.53532C15.9725 3.32156 15.5275 3.32156 15.1712 3.53532L3.92119 10.2853C3.58234 10.4886 3.375 10.8548 3.375 11.25V23.8152C3.375 24.2104 3.58234 24.5765 3.92119 24.7799L6.39279 26.2628C6.25825 25.6239 6.1875 24.9615 6.1875 24.2826C6.1875 19.0014 10.4688 14.7201 15.75 14.7201C21.0312 14.7201 25.3125 19.0014 25.3125 24.2826C25.3125 24.9615 25.2417 25.6239 25.1072 26.2628L27.5788 24.7799C27.9177 24.5765 28.125 24.2104 28.125 23.8152V11.25C28.125 10.8548 27.9177 10.4886 27.5788 10.2853L16.3288 3.53532ZM15.75 18.0951C12.3327 18.0951 9.5625 20.8653 9.5625 24.2826C9.5625 27.6999 12.3327 30.4701 15.75 30.4701C19.1673 30.4701 21.9375 27.6999 21.9375 24.2826C21.9375 20.8653 19.1673 18.0951 15.75 18.0951Z"
              fill="white"/>
          </g>
          <text x={VX} y={VY + R_SM + 22} textAnchor="middle" fontSize="18" fill="#4c6b1f"
            fontFamily={FF} fontWeight="600">Virtual service agent</text>
        </motion.g>

        {/* Help articles */}
        <motion.g {...nodeAnim(0.97)}>
          <circle cx={HAX} cy={HAY} r={R_SM} fill="#ffecf8" stroke="#cd519d" strokeWidth="2"/>
          <circle cx={HAX} cy={HAY} r={R_SM_INNER} fill="#cd519d"/>
          <g transform={`translate(${HAX - R_SM_INNER * 0.39} ${HAY - R_SM_INNER * 0.55}) scale(${R_SM_INNER * 1.09 / 35.58})`}>
            <path fillRule="evenodd" clipRule="evenodd" d="M0 6.46875C0 2.89616 2.89616 0 6.46875 0H25.3125C26.2445 0 27 0.755519 27 1.6875V21.375C27 22.307 26.2445 23.0625 25.3125 23.0625V29.25H27V32.625H19.125V29.25H21.9375V23.0625H6.46875C4.76012 23.0625 3.375 24.4476 3.375 26.1562C3.375 27.8649 4.76012 29.25 6.46875 29.25H7.875V32.625H6.46875C2.89616 32.625 0 29.7288 0 26.1562V6.46875ZM3.375 20.4739C4.29402 19.9725 5.34811 19.6875 6.46875 19.6875H23.625V3.375H6.46875C4.76012 3.375 3.375 4.76012 3.375 6.46875V20.4739Z"
              fill="white"/>
            <path d="M10.125 35.0183V25.875H16.875V35.0183C16.875 35.5433 16.2195 35.7821 15.8818 35.3801L13.5 32.5446L11.1182 35.3801C10.7805 35.7821 10.125 35.5433 10.125 35.0183Z"
              fill="white"/>
          </g>
          <text x={HAX} y={HAY + R_SM + 22} textAnchor="middle" fontSize="18" fill="#943d73"
            fontFamily={FF} fontWeight="600">Help articles</text>
        </motion.g>
      </svg>
    </div>
  );
}

const CHALLENGE_PALETTE = [
  { cardBg: "#FFFFFF", cardBorder: "#E8E4DE", numColor: "rgba(0,0,0,0.15)", accentColor: "#E8654B" },
  { cardBg: "#FFFFFF", cardBorder: "#E8E4DE", numColor: "rgba(0,0,0,0.15)", accentColor: "#3B82F6" },
  { cardBg: "#FFFFFF", cardBorder: "#E8E4DE", numColor: "rgba(0,0,0,0.15)", accentColor: "#EC4899" },
];

const CHALLENGE_ICONS = [
  (color: string) => <Inbox size={20} color={color} strokeWidth={1.5} />,
  (color: string) => <SearchCode size={20} color={color} strokeWidth={1.5} />,
  (color: string) => <Clock size={20} color={color} strokeWidth={1.5} />,
];

function FrictionSlide({
  group,
  gi,
  prevProgress,
  p,
}: {
  group: NonNullable<ReturnType<typeof Array.prototype.at>>;
  gi: number;
  prevProgress: number;
  p: { cardBg: string; cardBorder: string; numColor: string; accentColor: string };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  const totalProgress = useMotionValue(prevProgress);
  const normalWidth = useTransform(totalProgress, v => `${Math.min(v, 65)}%`);
  const breachWidth = useTransform(totalProgress, v => `${Math.max(v - 65, 0)}%`);

  useEffect(() => {
    if (isInView) {
      animate(totalProgress, group.timelineProgress, { duration: 1.2, ease: EASE, delay: 0.3 });
    } else {
      animate(totalProgress, prevProgress, { duration: 0 });
    }
  }, [isInView]);

  return (
    <div
      ref={ref}
      className="h-screen snap-start snap-always flex flex-col justify-center py-20"
    >
      <SnapReveal>
        <div className="max-w-2xl mx-auto w-full px-6 flex flex-col gap-6">
          <p
            className="text-7xl font-bold tabular-nums leading-none"
            style={{ color: p.numColor, fontFamily: "'Wotfard', sans-serif" }}
          >
            {String(gi + 1).padStart(2, "0")}
          </p>
          <p
            className="text-xs font-bold tracking-widest uppercase"
            style={{ color: p.accentColor, fontFamily: "'Wotfard', sans-serif" }}
          >
            Stage {gi + 1} friction
          </p>
          <h3
            className="text-2xl md:text-3xl font-bold leading-tight text-[#1a1a1a] -mt-3"
            style={{ fontFamily: "'Wotfard', sans-serif" }}
          >
            {group.phase}
          </h3>
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
                Ticket received
              </span>
              <span
                className="text-[10px] font-bold tracking-widest uppercase"
                style={{ color: p.accentColor, fontFamily: "'Wotfard', sans-serif" }}
              >
                Ticket resolved
              </span>
            </div>
            <div className="relative">
              {/* SLA breach marker — label above bar, line drops to bar top */}
              <div
                className="absolute z-10 flex flex-col items-center"
                style={{ left: "65%", bottom: "100%", paddingBottom: 2, transform: "translateX(-50%)" }}
              >
                <span
                  className="text-[9px] font-bold tracking-widest uppercase whitespace-nowrap"
                  style={{ color: "#ef4444", fontFamily: "'Wotfard', sans-serif", opacity: 0.75, lineHeight: 1, marginBottom: 3 }}
                >
                  SLA breach
                </span>
                <div style={{ width: 1, height: 10, background: "#ef4444", opacity: 0.45 }} />
              </div>

              <div className="relative h-2 rounded-full overflow-hidden bg-[#E8E4DE]">
                {/* Normal zone: driven by shared motion value */}
                <motion.div
                  className="absolute left-0 top-0 h-full"
                  style={{
                    width: normalWidth,
                    background: "linear-gradient(to right, #22c55e 0%, #eab308 65%, #f97316 100%)",
                  }}
                />
                {/* Breach zone: same motion value, starts at 65% */}
                <motion.div
                  className="absolute top-0 h-full"
                  style={{
                    left: "65%",
                    width: breachWidth,
                    background: "repeating-linear-gradient(-45deg, rgba(239,68,68,0.7) 0px, rgba(239,68,68,0.7) 2px, rgba(239,68,68,0.2) 2px, rgba(239,68,68,0.2) 6px)",
                  }}
                />
              </div>
            </div>
            <div className="relative h-4">
              {[
                { label: "0h",                  pct: 0   },
                { label: "Clarification loop",  pct: 25  },
                { label: "Context gathering",   pct: 50  },
                { label: "48H",                 pct: 65  },
                { label: "Resolution planning", pct: 75  },
                { label: "72H–96H",             pct: 100 },
              ].map(({ label, pct }) => (
                <span
                  key={label}
                  className="absolute text-[10px] whitespace-nowrap"
                  style={{
                    fontFamily: "'Wotfard', sans-serif",
                    color: pct === 65 ? "rgba(239,68,68,0.65)" : "rgba(26,26,26,0.4)",
                    fontWeight: pct === 65 ? 700 : 400,
                    left: `${pct}%`,
                    transform: pct === 0 ? "none" : pct === 100 ? "translateX(-100%)" : "translateX(-50%)",
                  }}
                >
                  {label}
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

          {/* Business impact */}
          {group.businessImpact && (
            <div className="flex items-start gap-2.5 rounded-xl px-4 py-3" style={{ background: "rgba(232,101,75,0.07)" }}>
              <TrendingDown size={14} className="flex-shrink-0 mt-0.5" style={{ color: "#C05437" }} />
              <p
                className="text-xs leading-relaxed"
                style={{ color: "#C05437", fontFamily: "'Wotfard', sans-serif" }}
              >
                {group.businessImpact}
              </p>
            </div>
          )}
        </div>
      </SnapReveal>
    </div>
  );
}

function ChallengeSection({ study }: { study: CaseStudy }) {
  const groups = study.challenge.timelineGroups;

  const heroStatement =
    "Service agents spend more time understanding requests than resolving them. A single request requires navigating fragmented tools, clarifying missing information, and manually stitching together a resolution plan resulting in delays, inefficiencies, and high cognitive load.";

  if (groups && groups.length > 0) {
    return (
      <section
        id="section-challenge"
        className="relative min-h-screen snap-start snap-always"
        style={{ background: "#F7F7F5" }}
      >
        {/* Slide 1: Hero Statement */}
        <div className="h-screen snap-start snap-always flex flex-col justify-center py-16">
          <div className="max-w-3xl mx-auto w-full px-6 flex flex-col gap-8">

            {/* Title */}
            <SnapReveal>
              <h2
                className="text-3xl md:text-4xl font-bold text-[#1a1a1a] leading-tight"
                style={{ fontFamily: "'Wotfard', sans-serif" }}
              >Context</h2>
            </SnapReveal>

            {/* Bullets */}
            <SnapReveal>
              <ul className="flex flex-col gap-5">
                {[
                  <>Enterprise support operates at massive scale, where even small inefficiencies compound into significant <strong className="text-[#1a1a1a] font-semibold">operational cost.</strong></>,
                  <>Agents spend up to <strong className="text-[#1a1a1a] font-semibold">40–60%</strong> of their time not resolving issues, but <strong className="text-[#1a1a1a] font-semibold">understanding</strong> them — navigating fragmented tools, clarifying incomplete requests, and manually assembling context.</>,
                  <>This results in <strong className="text-[#1a1a1a] font-semibold">slower resolution times</strong>, higher <strong className="text-[#1a1a1a] font-semibold">cognitive load</strong>, and a model that <strong className="text-[#1a1a1a] font-semibold">scales linearly with headcount</strong> — making it increasingly <strong className="text-[#1a1a1a] font-semibold">unsustainable</strong> as demand grows.</>,
                ].map((content, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-2 flex-shrink-0" style={{ width: 6, height: 6, background: "rgba(232,101,75,0.55)", borderRadius: 1 }} />
                    <span className="text-sm md:text-base leading-relaxed text-[#1a1a1a]/70" style={{ fontFamily: "'Wotfard', sans-serif" }}>
                      {content}
                    </span>
                  </li>
                ))}
              </ul>
            </SnapReveal>

            {/* Metrics row */}
            <SnapReveal delay={0.15} className="flex gap-4">
              {[
                { value: "$15–$50", label: "Average cost per ticket", color: "#E8654B", bg: "#FEF0EC", border: "rgba(232,101,75,0.18)", icon: <Banknote size={18} strokeWidth={1.5} /> },
                { value: "3–6 tools", label: "Used per request", color: "#16a34a", bg: "#F0FDF4", border: "rgba(22,163,74,0.18)", icon: <Layers size={16} strokeWidth={1.5} /> },
                { value: "40–60%", label: "Time spent on understanding, not resolving", color: "#6366F1", bg: "#F0F0FE", border: "rgba(99,102,241,0.18)", icon: <Clock size={16} strokeWidth={1.5} /> },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-2xl px-5 py-4 flex flex-col gap-1"
                  style={{ background: stat.bg, border: `1px solid ${stat.border}` }}
                >
                  <div className="mb-2" style={{ color: stat.color, opacity: 0.7 }}>{stat.icon}</div>
                  <p className="text-xl font-bold leading-tight" style={{ color: stat.color, fontFamily: "'Wotfard', sans-serif" }}>
                    {stat.value}
                  </p>
                  <p className="text-xs leading-relaxed text-[#1a1a1a]/70" style={{ fontFamily: "'Wotfard', sans-serif" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </SnapReveal>


          </div>
        </div>
        {/* Service Management Journey slide */}
        <div className="h-screen snap-start snap-always flex flex-col justify-center py-10" style={{ background: "#f8f8f8" }}>
          <div className="max-w-5xl mx-auto w-full px-6 flex flex-col gap-5">
            <SnapReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] leading-tight text-center"
                style={{ fontFamily: "'Wotfard', sans-serif" }}>
                Service management journey
              </h2>
            </SnapReveal>
            <SnapReveal delay={0.15}>
              <img
                src="/journey-focus/service-management-journey.png"
                alt="Service management journey diagram"
                className="w-full h-auto rounded-xl"
                style={{ maxHeight: "60vh", objectFit: "contain", objectPosition: "left center" }}
              />
            </SnapReveal>
          </div>
        </div>
        {/* Why Resolution Breaks Down slide */}
        <div className="h-screen snap-start snap-always flex flex-col justify-center py-16">
          <div className="w-full flex flex-col gap-14" style={{ paddingLeft: 144, paddingRight: 144 }}>

            <SnapReveal>
              <h2
                className="text-3xl md:text-4xl font-bold text-[#1a1a1a] leading-tight text-center"
                style={{ fontFamily: "'Wotfard', sans-serif" }}
              >Breakdown of the service agent journey</h2>
            </SnapReveal>

            {/* Flow diagram */}
            <SnapReveal delay={0.1}>
              {(() => {
                const steps = [
                  { label: "Request",        color: "#2563EB", headerBg: "rgba(37,99,235,0.12)",   icon: <Inbox size={22} />,        question: "What is the user asking for?",       description: "A request comes in via email, portal, or chat - often incomplete or unclear.",                                                              friction: "Often missing key details - triggers back-and-forth",        issueColor: "#2563EB" },
                  { label: "Understand",     color: "#7C3AED", headerBg: "rgba(124,58,237,0.12)", icon: <Network size={22} />,       question: "What exactly needs to be done?",     description: "The agent interprets the request, clarifies intent, and identifies the actual problem to solve.",                                            friction: "Ambiguity leads to misinterpretation",                       issueColor: "#7C3AED" },
                  { label: "Gather context", color: "#B45309", headerBg: "rgba(180,83,9,0.12)",   icon: <Brain size={22} />,         question: "What information do I need?",        description: "The agent pulls data from Jira, Confluence, internal tools, logs, and past tickets to build a complete picture.",                            friction: "Information is fragmented across tools",                     issueColor: "#B45309" },
                  { label: "Execute",        color: "#0F766E", headerBg: "rgba(15,118,110,0.12)", icon: <Settings size={22} />,      question: "How do I resolve this?",             description: "The agent performs actions across systems - approvals, access changes, configurations, or escalations.",                                      friction: "Manual coordination slows things down",                      issueColor: "#0F766E" },
                  { label: "Resolve",        color: "#4338CA", headerBg: "rgba(67,56,202,0.12)",  icon: <CheckCircle2 size={22} />,  question: "Is the issue fully addressed?",      description: "The request is completed, validated, and communicated back to the user.",                                                                    friction: "Outcomes depend on human stitching everything together",     issueColor: "#4338CA" },
                ];
                return (
                  <div className="flex flex-col gap-5">

                    {/* Row 1: icon (with dotted connector) then label below */}
                    <div className="flex flex-col gap-3">
                      {/* Icon row with dotted line running through */}
                      <div className="relative grid grid-cols-5">
                        {/* Dotted connector line behind icons */}
                        <div
                          className="absolute border-t border-dashed border-[#C8C2BB]"
                          style={{ top: 32, left: "10%", right: "10%" }}
                        />
                        {/* Filled chevrons between steps - top=26 so center (26+6)=32 aligns with line */}
                        {[20, 40, 60, 80].map((pct, ci) => (
                          <div
                            key={ci}
                            className="absolute z-20"
                            style={{ left: `calc(${pct}% - 4px)`, top: 26 }}
                          >
                            <svg width="8" height="12" viewBox="0 0 8 12">
                              <polygon points="0,0 8,6 0,12" fill="#C8C2BB" />
                            </svg>
                          </div>
                        ))}
                        {steps.map((step, i) => (
                          <div key={i} className="flex justify-center relative z-10">
                            {/* Page-color buffer hides the dotted line behind the icon */}
                            <div className="rounded-full p-2" style={{ background: "#F7F7F5" }}>
                              <div
                                className="w-12 h-12 rounded-full flex items-center justify-center"
                                style={{ background: step.headerBg, color: step.color }}
                              >
                                {step.icon}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* Label row below icons */}
                      <div className="grid grid-cols-5 mt-1">
                        {steps.map((step, i) => (
                          <p
                            key={i}
                            className="text-base font-bold text-center whitespace-nowrap"
                            style={{ color: step.color, fontFamily: "'Wotfard', sans-serif" }}
                          >
                            {step.label}
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* Row 2: questions - all on same line */}
                    <div className="grid grid-cols-5 gap-4">
                      {steps.map((step, i) => (
                        <p key={i} className="text-sm font-semibold italic text-center leading-snug px-2" style={{ color: step.color, fontFamily: "'Wotfard', sans-serif" }}>
                          "{step.question}"
                        </p>
                      ))}
                    </div>

                    {/* Row 3: descriptions - all on same line */}
                    <div className="grid grid-cols-5 gap-4">
                      {steps.map((step, i) => (
                        <p key={i} className="text-sm leading-relaxed text-center text-[#1a1a1a]/50 px-2" style={{ fontFamily: "'Wotfard', sans-serif" }}>
                          {step.description}
                        </p>
                      ))}
                    </div>

                  </div>
                );
              })()}
            </SnapReveal>


          </div>
        </div>
        {/* Transition: 3 stages of friction */}
        <div className="h-screen snap-start snap-always flex flex-col items-center justify-center" style={{ background: "#F7F7F5" }}>
          <SnapReveal>
            <div className="flex flex-col items-center gap-2 text-center px-6">
              <p
                className="text-[10px] uppercase tracking-widest font-bold"
                style={{ color: "#E8654B", fontFamily: "'Wotfard', sans-serif" }}
              >
                Current journey breakdown
              </p>
              <h2
                className="text-4xl md:text-5xl font-bold text-[#1a1a1a] leading-tight"
                style={{ fontFamily: "'Wotfard', sans-serif" }}
              >
                3 stages of friction
              </h2>
            </div>
          </SnapReveal>
        </div>
        {/* Slides 2–4: One slide per challenge group */}
        {groups.map((group, gi) => (
          <FrictionSlide
            key={gi}
            group={group}
            gi={gi}
            prevProgress={gi > 0 ? groups[gi - 1].timelineProgress : 0}
            p={CHALLENGE_PALETTE[gi % CHALLENGE_PALETTE.length]}
          />
        ))}
        {/* Final slide: Pain Points */}
        <div className="h-screen snap-start snap-always flex flex-col justify-center py-20">
          <div className="max-w-3xl mx-auto w-full px-6">
            <SnapReveal>
              <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h2
                  className="text-2xl md:text-3xl leading-tight text-[#1a1a1a]"
                  style={{ fontFamily: "'Wotfard', sans-serif", fontWeight: 700 }}
                >
                  Where the System Breaks Down
                </h2>
                <p
                  className="text-sm leading-relaxed text-[#1a1a1a]/70"
                  style={{ fontFamily: "'Wotfard', sans-serif" }}
                >
                  While friction appears across different stages, the root cause is consistent - the system offloads complexity onto the agent.
                </p>
              </div>
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
                              className="text-xs leading-relaxed text-[#1a1a1a]/70"
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
                      <span className="mt-1.5 flex-shrink-0" style={{ width: 6, height: 6, background: "rgba(232,101,75,0.5)", borderRadius: 1 }} />
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
              </div>
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
      style={{ background: "#F7F7F5" }}
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
                <span className="mt-1.5 flex-shrink-0" style={{ width: 6, height: 6, background: "rgba(45,45,45,0.4)", borderRadius: 1 }} />
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
      name: "Salesforce",
      nameColor: "#00A1E0",
      descriptor: "Enterprise-grade service platform integrating Einstein AI to deliver predictive insights, automated case handling, and real-time agent assistance across a unified CRM ecosystem.",
      tag: "ENTERPRISE ECOSYSTEM",
      cardBg: "#E6F6FF",
      borderColor: "rgba(0,161,224,0.25)",
      image: "/salesforce-screenshot.png",
      logo: "/salesforce-logo.png",
    },
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
      style={{ background: "#F7F7F5" }}
    >
      <div className="max-w-7xl mx-auto w-full px-4 flex flex-col gap-6">
        <SnapReveal>
          <div className="flex flex-col gap-2">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#1a1a1a] leading-tight mb-2"
              style={{ fontFamily: "'Wotfard', sans-serif" }}
            >
              Top competitors
            </h2>
            <p className="text-sm text-[#1a1a1a]/70 w-full" style={{ fontFamily: "'Wotfard', sans-serif" }}>
              The competitive landscape is witnessing a seismic shift from traditional ticketing systems toward{" "}
              <strong className="text-[#1a1a1a] font-semibold">AI-powered autonomous agents</strong>
              {" "}capable of resolving complex enterprise workflows.
            </p>
          </div>
        </SnapReveal>

        <div className="grid grid-cols-6 gap-2">
          {competitors.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE, delay: 0.1 + i * 0.07 }}
              className="rounded-2xl overflow-hidden flex flex-col"
              style={{ background: c.cardBg, border: `1px solid ${c.borderColor}` }}
            >
              {c.logo ? (
                <div className="mx-3 mt-3 rounded-xl overflow-hidden flex-shrink-0 flex flex-col" style={{ height: "200px" }}>
                  <div
                    className="flex-1 overflow-hidden"
                    style={{
                      backgroundImage: `url(${c.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center top",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                  <div className="flex items-center justify-center py-2 px-3 flex-shrink-0 bg-[#fbf7f8]" style={{ background: "#ffffff" }}>
                    <img src={c.logo} alt={c.name} style={{ height: 28, width: "auto", objectFit: "contain" }} />
                  </div>
                </div>
              ) : (
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
              )}
              <div className="px-4 pt-3 pb-4 flex flex-col gap-3 flex-1">
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
                'The market is converging toward AI agents - yet only a few players combines deep workflow context with autonomous execution.'
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
      style={{ background: "#F7F7F5" }}
    >
      <div className="max-w-5xl mx-auto w-full px-8 md:px-20 flex flex-col gap-10">
        {/* Header */}
        <SnapReveal>
          <div className="flex flex-col gap-3">
            <p
              className="text-[10px] uppercase tracking-widest font-bold text-[#E8654B]"
              style={{ fontFamily: "'Wotfard', sans-serif" }}
            >Insights from the study and competitive analysis</p>
            <h2
              className="text-2xl md:text-3xl leading-tight text-[#1a1a1a]"
              style={{ fontFamily: "'Wotfard', sans-serif", fontWeight: 700 }}
            >
              Patterns that shaped the direction
            </h2>
            <p
              className="text-sm leading-relaxed text-[#1a1a1a]/70 w-full"
              style={{ fontFamily: "'Wotfard', sans-serif" }}
            >Through early research and competitive studies, we recognized three key patterns in how service tools were evolving.</p>
          </div>
        </SnapReveal>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {themes.map((t, i) => (
            <SnapReveal key={i} delay={0.1 + i * 0.1}>
              <div
                className="rounded-2xl flex flex-col p-7"
                style={{ background: "#FFFFFF", border: "1px solid #E8E4DE" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(232,101,75,0.12)", color: "#E8654B" }}
                >
                  {t.icon}
                </div>
                <h3
                  className="text-base font-bold leading-tight mb-3 whitespace-nowrap"
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
      style={{ background: "#F7F7F5" }}
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
            <div className="rounded-2xl bg-white border border-[#E8E4DE] px-6 py-6 flex flex-col gap-2">
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
    description: "Service Agents can refine AI-generated plans before assigning Rovo to execute - maintaining human oversight at every step.",
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
    description: "Configure how Rovo operates per space - with resolution management, onboarding journeys, and self-service setup in one place.",
  },
  {
    src: "/concept-v2-it-general.webp",
    alt: "IT Execution Settings",
    area: "h",
    delay: 0.19,
    title: "IT Execution Settings",
    description: "Fine-grained controls that map request types to execution modes - Auto, Supervised, or Assistive - across the team.",
  },
];

const DESIGN_PRINCIPLES = [
  {
    num: "01",
    icon: () => <Lightbulb size={20} color="#6366F1" strokeWidth={1.5} />,
    iconBg: "rgba(99,102,241,0.10)",
    title: "Make AI trustworthy, not just visible",
    description: "AI should communicate intent, confidence, and outcomes in a way that builds trust before action is taken — without exposing unnecessary complexity.",
    insight: "Showing AI as 'thinking' exposed the real gap — invisible reasoning erodes trust before action is even taken.",
  },
  {
    num: "02",
    icon: () => <TrendingDown size={20} color="#E8654B" strokeWidth={1.5} />,
    iconBg: "rgba(232,101,75,0.10)",
    title: "Design for outcomes, not interactions",
    description: "AI systems should collapse multi-step workflows into outcome-driven actions, removing the need for users to orchestrate the process.",
    insight: "Early designs exposed logic — plans, trees, steps. But users care about resolution, not how the system gets there.",
  },
  {
    num: "03",
    icon: () => <Brain size={20} color="#06B6D4" strokeWidth={1.5} />,
    iconBg: "rgba(6,182,212,0.10)",
    title: "Reduce decisions, not just effort",
    description: "AI should eliminate unnecessary decisions by acting with context, not defer them back to the user for validation.",
    insight: "Users were asked to interpret, validate, and fix flows — AI added work instead of removing it.",
  },
];

function PrincipleCard({ p, i }: { p: (typeof DESIGN_PRINCIPLES)[0]; i: number }) {
  const [hovered, setHovered] = useState(false);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springCfg = { stiffness: 180, damping: 22, mass: 0.5 };
  const springX = useSpring(rawX, springCfg);
  const springY = useSpring(rawY, springCfg);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-7, 7]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width - 0.5);
    rawY.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { rawX.set(0); rawY.set(0); setHovered(false); };

  return (
    <div style={{ perspective: 900 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: APPLE, delay: 0.1 + i * 0.1 }}
        className="flex flex-col gap-3 rounded-2xl p-5"
        style={{
          background: "#FFFFFF",
          border: "1px solid #E8E4DE",
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          willChange: "transform",
          boxShadow: hovered
            ? "0 0 0 1.5px rgba(129,140,248,0.45), 0 0 28px rgba(129,140,248,0.16), 0 0 56px rgba(6,182,212,0.09), 0 8px 32px rgba(0,0,0,0.07)"
            : "0 1px 3px rgba(0,0,0,0.03)",
          transition: "box-shadow 0.28s ease",
        }}
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onLeave}
      >
        <div className="rounded-lg p-2 self-start" style={{ background: p.iconBg }}>
          {p.icon()}
        </div>
        <h3 className="text-base font-bold leading-snug text-[#1a1a1a]" style={{ fontFamily: "'Wotfard', sans-serif" }}>
          {p.title}
        </h3>
        <p className="text-sm leading-relaxed text-[#1a1a1a]/55" style={{ fontFamily: "'Wotfard', sans-serif" }}>
          {p.description}
        </p>
        <div className="mt-auto rounded-xl px-4 py-3" style={{ background: "rgba(0,0,0,0.05)" }}>
          <p className="text-[12px] leading-relaxed italic" style={{ color: "rgba(26,26,26,0.45)", fontFamily: "'Wotfard', sans-serif" }}>
            {p.insight}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function DesignPrinciplesSection() {
  return (
    <section
      id="section-principles"
      className="relative h-screen snap-start snap-always flex flex-col justify-center overflow-hidden"
      style={{ background: "#F7F7F5" }}
    >
      <SnapReveal>
        <div className="max-w-6xl mx-auto w-full px-8 md:px-20 flex flex-col gap-10">
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
              className="text-sm leading-relaxed text-[#1a1a1a]/70 mt-2"
              style={{ fontFamily: "'Wotfard', sans-serif" }}
            >AI in workflows wasn’t failing because of capability - it was failing because it didn’t reduce work in a way agents could trust.</p>
          </div>

          {/* Principles grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {DESIGN_PRINCIPLES.map((p, i) => (
              <PrincipleCard key={i} p={p} i={i} />
            ))}
          </div>
        </div>
      </SnapReveal>
    </section>
  );
}

function RovoServiceOverviewSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [toggled, setToggled] = useState(false);

  const IMGS = ["/rovo-service-diagram.png", "/rovo-service-diagram-2.png"];

  return (
    <section
      ref={sectionRef}
      id="section-rovo-overview"
      className="relative h-screen snap-start snap-always overflow-hidden flex flex-col"
      style={{ background: "#F7F7F5" }}
    >
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE }}
        className="flex-shrink-0 px-10 md:px-20 pt-14 pb-2"
      >
        <p
          className="text-[10px] uppercase tracking-widest font-bold mb-1"
          style={{ color: "#E8654B", fontFamily: "'Wotfard', sans-serif" }}
        >
          Solution architecture
        </p>
        <h2
          className="text-2xl md:text-3xl leading-tight text-[#1a1a1a]"
          style={{ fontFamily: "'Wotfard', sans-serif", fontWeight: 700 }}
        >
          Rovo Service Capability Evolution
        </h2>
      </motion.div>

      {/* Diagram — click to toggle */}
      <div className="flex-1 flex items-end justify-center overflow-hidden px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          style={{ position: "relative", width: "90%", cursor: "pointer" }}
          onClick={() => setToggled(t => !t)}
        >
          {/* Base image — always visible */}
          <img
            src={IMGS[0]}
            alt="Rovo Service capability orbit diagram"
            style={{ width: "100%", display: "block", objectFit: "contain" }}
          />
          {/* Overlay image — fades in on top */}
          <img
            src={IMGS[1]}
            alt="Rovo Service capability orbit diagram — highlighted"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              display: "block",
              objectFit: "contain",
              opacity: toggled ? 1 : 0,
              transition: "opacity 0.35s ease",
              pointerEvents: "none",
            }}
          />
        </motion.div>
      </div>
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
              Exploring multiple approaches - exposing context, surfacing AI reasoning, and reducing operator effort.
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

      {/* Lightbox - always in DOM, CSS-only visibility */}
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

function AIConsolidationSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, { once: true, amount: 0.3 });
  const FF = "'Wotfard', sans-serif";

  return (
    <section
      id="section-consolidation"
      className="relative snap-start snap-always"
      style={{ background: "#F7F7F5" }}
    >
      {/* ── Slide 1 ── */}
      <div className="relative h-screen flex flex-col overflow-hidden">

        {/* ── Text — top ── */}
        <motion.div
          ref={ref}
          className="w-full flex flex-col gap-4 pt-12 md:pt-16"
          style={{ paddingLeft: 80, paddingRight: 80 }}
          initial={{ opacity: 0, y: -16 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="flex flex-col gap-2">
            <p
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "#E8654B", fontFamily: FF }}
            >AI strategy</p>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#1a1a1a] leading-tight"
              style={{ fontFamily: FF }}
            >
              Beyond UX Friction: A Deeper System Gap
            </h2>
          </div>
          <p
            className="text-base leading-relaxed text-[#1a1a1a]/65"
            style={{ fontFamily: FF }}
          >
            As we mapped breakdowns across the service journey, a deeper pattern emerged.
          </p>
          <p
            className="text-base leading-relaxed text-[#1a1a1a]/65"
            style={{ fontFamily: FF }}
          >
            Jira Service Management already included multiple AI capabilities — similar requests, comments summary, suggestions, and a service request helper agent. However, these evolved independently across different workflows.
          </p>

          {/* As a result bullets */}
          <div className="flex flex-col gap-2" style={{ marginTop: 8 }}>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#1a1a1a]/40" style={{ fontFamily: FF }}>
              As a result
            </p>
            <ul className="flex flex-col gap-1.5">
              {[
                "AI capabilities operated in silos with limited visibility",
                "Experiences were inconsistent across touchpoints",
                "Agents had to manually piece together capabilities",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2 flex-shrink-0" style={{ width: 6, height: 6, background: "rgba(232,101,75,0.55)", borderRadius: 1 }} />
                  <span className="text-sm leading-relaxed text-[#1a1a1a]/60" style={{ fontFamily: FF }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* ── Image — bottom ── */}
        <motion.img
          src="/ai-features.png"
          alt="AI features scattered across Jira Service Management"
          className="select-none pointer-events-none"
          style={{ width: "calc(100% - 160px)", marginLeft: 80, marginRight: 80, marginTop: -16, zIndex: 1, display: "block" }}
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
        />
      </div>{/* end slide 1 */}

      {/* ── Slide 2: Reframe ── */}
      <div className="h-screen snap-start snap-always flex flex-col justify-center overflow-hidden">
        <SnapReveal>
          <div className="w-full max-w-6xl mx-auto flex items-center gap-14" style={{ paddingLeft: 32, paddingRight: 32 }}>

            {/* ── Left: narrative ── */}
            <div className="flex-1 flex flex-col gap-6 min-w-0">
              <p className="text-xl md:text-2xl font-semibold leading-snug text-[#1a1a1a]" style={{ fontFamily: FF }}>
                Service agents aren't looking for features — they're trying to{" "}
                <mark style={{ background: "rgba(99,102,241,0.13)", color: "#4338CA", borderRadius: "5px", padding: "2px 6px", fontWeight: 700 }}>
                  resolve work faster
                </mark>
                .
              </p>

              <div className="flex flex-col gap-2">
                <p className="text-sm text-[#1a1a1a]/60" style={{ fontFamily: FF }}>This lays the foundation for Rovo Service:</p>
                <ul className="flex flex-col gap-2">
                  {[
                    "Seamless integration across workflows",
                    "Clear visibility into AI capabilities",
                    "A consistent, scalable experience",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="mt-2 flex-shrink-0" style={{ width: 6, height: 6, background: "rgba(232,101,75,0.55)", borderRadius: 1 }} />
                      <span className="text-sm leading-relaxed text-[#1a1a1a]/60" style={{ fontFamily: FF }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ── Right: visual diagram ── */}
            <div className="flex-1 flex flex-col items-center justify-center min-w-0">

              {/* Label */}
              <p className="text-[10px] font-bold tracking-widest uppercase text-[#1a1a1a]/35 mb-5 self-center" style={{ fontFamily: FF }}>
                Previously — Isolated AI Features
              </p>

              {/* Pills — centered, in container */}
              <div
                className="flex flex-col items-center gap-3 px-4 py-5 mb-5 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.5)", border: "1px solid rgba(26,26,26,0.08)", maxWidth: 460, width: "100%" }}
              >
                {/* Row 1 */}
                <div className="flex items-center justify-center gap-2 flex-nowrap">
                  {[
                    { label: "Similar requests",       accent: false },
                    { label: "Comments summary",       accent: false },
                    { label: "Comment AI summary",     accent: false },
                  ].map(({ label, accent }, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-medium px-3.5 py-2 rounded-full whitespace-nowrap"
                      style={{
                        fontFamily: FF,
                        color: "rgba(26,26,26,0.55)",
                        background: "rgba(255,255,255,0.9)",
                        border: "1px solid rgba(26,26,26,0.12)",
                      }}
                    >{label}</span>
                  ))}
                </div>
                {/* Row 2 */}
                <div className="flex items-center justify-center gap-2 flex-nowrap">
                  {[
                    { label: "Virtual agent",          accent: false },
                    { label: "Suggestions",            accent: false },
                    { label: "Service request helper", accent: false },
                  ].map(({ label, accent }, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-medium px-3.5 py-2 rounded-full whitespace-nowrap"
                      style={{
                        fontFamily: FF,
                        color: "rgba(26,26,26,0.55)",
                        background: "rgba(255,255,255,0.9)",
                        border: "1px solid rgba(26,26,26,0.12)",
                      }}
                    >{label}</span>
                  ))}
                </div>
              </div>

              {/* Top connector line */}
              <div className="w-px h-6 bg-[#1a1a1a]/15 mb-3" />

              {/* Unified label */}
              <p className="text-lg font-medium text-[#1a1a1a]/70 text-center mb-3" style={{ fontFamily: FF }}>
                Unified into a <strong className="font-bold text-[#1a1a1a]">single AI system</strong>
              </p>

              {/* Bottom connector line + arrow */}
              <div className="flex flex-col items-center mb-4">
                <div className="w-px h-6 bg-[#1a1a1a]/15" />
                <svg width="8" height="6" viewBox="0 0 8 6" className="mt-0.5">
                  <path d="M4 6L0 0h8z" fill="rgba(26,26,26,0.3)" />
                </svg>
              </div>

              {/* Rovo Service card with AI gradient border */}
              <div className="relative" style={{ maxWidth: 420, width: "100%" }}>
                {/* Outer glow */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 50% 80%, rgba(129,140,248,0.22) 0%, transparent 70%)", transform: "scale(1.4)", transformOrigin: "bottom center" }}
                />
                {/* Gradient border wrapper */}
                <div
                  style={{
                    background: "linear-gradient(135deg, #818CF8 0%, #8B5CF6 45%, #06B6D4 100%)",
                    borderRadius: 18,
                    padding: 1,
                    position: "relative",
                  }}
                >
                  <div
                    className="relative flex flex-col items-center gap-2 rounded-2xl px-5 py-4 w-full text-center"
                    style={{ background: "rgba(255,252,249,0.97)", borderRadius: 17 }}
                  >
                    <img src="/rovo-service-icon-new.png" alt="Rovo Service" className="w-10 h-10 flex-shrink-0 object-contain" />
                    <div className="flex flex-col gap-1 items-center">
                      <p className="text-base font-bold text-[#1a1a1a]" style={{ fontFamily: FF }}>Rovo Service</p>
                      <p className="text-sm leading-relaxed text-[#1a1a1a]/60 text-center" style={{ fontFamily: FF }}>
                        One AI system — connected, contextual, and embedded across the service lifecycle
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </SnapReveal>
      </div>
    </section>
  );
}

function StampHeroBanner({ study }: { study: CaseStudy }) {
  const bannerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(bannerRef, { once: true, amount: 0.4 });

  const bg = study.heroColor ?? "#3A4CE8";
  const N = 9;   // notch radius px
  const S = 20;  // notch spacing px

  // CSS mask that cuts semicircular perforations on all 4 edges
  const maskVal = [
    `radial-gradient(circle at 50% 0, transparent ${N}px, black ${N + 1}px)`,
    `radial-gradient(circle at 50% 100%, transparent ${N}px, black ${N + 1}px)`,
    `radial-gradient(circle at 0 50%, transparent ${N}px, black ${N + 1}px)`,
    `radial-gradient(circle at 100% 50%, transparent ${N}px, black ${N + 1}px)`,
  ].join(", ");
  const maskSize = `${S}px 100%, ${S}px 100%, 100% ${S}px, 100% ${S}px`;
  const maskPos  = "top left, bottom left, top left, top right";
  const maskRep  = "repeat-x, repeat-x, repeat-y, repeat-y";

  const RINGS = [160, 120, 84, 50];

  return (
    <div
      ref={bannerRef}
      style={{
        position: "relative",
        width: "100%",
        height: 200,
        background: bg,
        overflow: "hidden",
        flexShrink: 0,
        // Standard
        maskImage: maskVal,
        maskSize,
        maskPosition: maskPos,
        maskRepeat: maskRep,
        maskComposite: "intersect",
        // WebKit
        WebkitMaskImage: maskVal,
        WebkitMaskSize: maskSize,
        WebkitMaskPosition: maskPos,
        WebkitMaskRepeat: maskRep,
        WebkitMaskComposite: "source-in, source-in, source-in",
      } as React.CSSProperties}
    >
      {/* Concentric rings growing from center */}
      {RINGS.map((r, i) => (
        <motion.div
          key={r}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.05 + i * 0.14 }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: r * 2,
            height: r * 2,
            marginLeft: -r,
            marginTop: -r,
            borderRadius: "50%",
            border: `1.5px solid rgba(255,255,255,${0.22 - i * 0.04})`,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* App screenshot */}
      <img
        src={study.image}
        alt={study.imageAlt}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "top center",
        }}
      />
    </div>
  );
}


const WAVE_OFFSETS = [-160, -80, 0, 80, 160];
const WAVE_W = 1440, WAVE_H = 900, WAVE_PERIODS = 3.5, WAVE_STEPS = 120, WAVE_AMP = 52;
const WAVE_LEN = Math.sqrt(WAVE_W * WAVE_W + WAVE_H * WAVE_H);
const WAVE_PX = WAVE_H / WAVE_LEN, WAVE_PY = WAVE_W / WAVE_LEN;

function buildWavePath(off: number, phase: number): string {
  const pts: string[] = [];
  for (let i = 0; i <= WAVE_STEPS; i++) {
    const t = i / WAVE_STEPS;
    const wave = Math.sin(t * WAVE_PERIODS * Math.PI * 2 + phase) * WAVE_AMP + off;
    const x = (t * WAVE_W + WAVE_PX * wave).toFixed(1);
    const y = (WAVE_H * (1 - t) + WAVE_PY * wave).toFixed(1);
    pts.push(i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`);
  }
  return pts.join(" ");
}

function CosmicWaveBackground() {
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    let raf: number;
    const tick = (t: number) => {
      const phase = (t / 7000) * Math.PI * 2;
      pathRefs.current.forEach((el, i) => {
        if (el) el.setAttribute("d", buildWavePath(WAVE_OFFSETS[i], phase + i * 0.4));
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      aria-hidden
      style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}
    >
      {/* ── Indigo blob – top-left ── */}
      <motion.div
        animate={{ x: [0, 130, -70, 50, 0], y: [0, -90, 70, -30, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute", left: "0%", top: "0%",
          width: "62vw", height: "62vw", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.28) 0%, rgba(59,130,246,0.14) 45%, transparent 70%)",
          filter: "blur(55px)",
        }}
      />
      {/* ── Violet/magenta blob – right ── */}
      <motion.div
        animate={{ x: [0, -90, 55, -25, 0], y: [0, 75, -55, 95, 0] }}
        transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute", right: "-5%", top: "15%",
          width: "58vw", height: "58vw", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.26) 0%, rgba(217,70,239,0.12) 45%, transparent 70%)",
          filter: "blur(65px)",
        }}
      />
      {/* ── Cyan blob – bottom ── */}
      <motion.div
        animate={{ x: [0, 70, -110, 35, 0], y: [0, 55, 110, -65, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute", left: "15%", bottom: "-10%",
          width: "54vw", height: "54vw", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6,182,212,0.20) 0%, rgba(59,130,246,0.10) 45%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      {/* ── Pink accent blob – centre ── */}
      <motion.div
        animate={{ x: [0, -55, 80, -35, 0], y: [0, -65, 35, 75, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute", left: "40%", top: "35%",
          width: "42vw", height: "42vw", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(236,72,153,0.14) 0%, transparent 70%)",
          filter: "blur(75px)",
        }}
      />

      {/* ── Animated diagonal wave lines ── */}
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <linearGradient id="cwg1" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#3B82F6" stopOpacity="0" />
            <stop offset="35%"  stopColor="#8B5CF6" stopOpacity="0.55" />
            <stop offset="65%"  stopColor="#06B6D4" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="cwg2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#EC4899" stopOpacity="0" />
            <stop offset="50%"  stopColor="#8B5CF6" stopOpacity="0.40" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
          </linearGradient>
        </defs>
        {WAVE_OFFSETS.map((off, i) => (
          <path
            key={i}
            ref={el => { pathRefs.current[i] = el; }}
            d={buildWavePath(off, i * 0.4)}
            stroke={i % 2 === 0 ? "url(#cwg1)" : "url(#cwg2)"}
            strokeWidth={i === 2 ? 1.6 : 1}
            strokeOpacity={0.65 - Math.abs(i - 2) * 0.12}
            fill="none"
          />
        ))}
      </svg>
    </div>
  );
}

const CUSTOMER_ANECDOTES = [
  {
    title: "Handling trivial tickets",
    quote: "A big chunk of my day used to go into repetitive tickets — password resets, VPN access, basic troubleshooting. With Rovo in place, most of that just gets handled or pre-resolved before it even reaches me.\n\nWhat's changed is I can now focus on the tickets that actually need investigation, instead of constantly clearing the queue.",
    name: "IT Support Specialist",
    role: "Enterprise SaaS",
    rotate: -6,
    bgColor: "#D6E8F5",
    bgRotate: -11,
    bgScale: 1.04,
    icon: "/icon-heart-new.png",
    iconRotate: -10,
    iconSize: 60,
    iconCorner: { top: -22, right: -22 },
  },
  {
    title: "Guided resolution & confidence",
    quote: "Earlier, resolving complex tickets meant jumping between Jira, Confluence, and internal docs just to piece together context. Now, I get relevant information and next steps surfaced directly in the workflow.\n\nIt feels like there's always guidance available — I don't have to second-guess if I'm missing something.",
    name: "Senior Service Desk Agent",
    role: "Fintech",
    rotate: 2,
    bgColor: "#F5DEC8",
    bgRotate: 7,
    bgScale: 1.06,
    icon: "/icon-okhand-new.png",
    iconRotate: 0,
    iconSize: 60,
    iconCorner: { bottom: -22, right: -22 },
  },
  {
    title: "Efficiency & team bandwidth",
    quote: "Before Rovo, our team was spending a lot of time managing workflows, routing tickets, and ensuring agents had the right context. It was a constant operational overhead.\n\nNow, a lot of that is automated or handled proactively. We've seen a noticeable drop in manual intervention, and the team has more bandwidth to focus on improving service quality instead of just maintaining it.",
    name: "ITSM Administrator",
    role: "Mid-size Enterprise",
    rotate: 5,
    bgColor: "#D4EDDA",
    bgRotate: 3,
    bgScale: 1.03,
    icon: "/icon-star-new.png",
    iconRotate: -8,
    iconSize: 74,
    iconCorner: { top: -26, right: -26 },
  },
];

function AnecdoteCard({ a }: { a: (typeof CUSTOMER_ANECDOTES)[0] }) {
  const FF = "'Wotfard', sans-serif";
  const [hovered, setHovered] = useState(false);

  const rotate = hovered ? 0 : a.rotate;
  const translateY = hovered ? -8 : 0;

  return (
    <div style={{ position: "relative" }}>
      {/* Tilted colour backing — peeks behind the white card */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 22,
          background: a.bgColor,
          transform: `rotate(${hovered ? a.bgRotate * 0.5 : a.bgRotate}deg) scale(${hovered ? 1 + (a.bgScale - 1) * 0.5 : a.bgScale}) translateY(${hovered ? 3 : 7}px)`,
          transition: "transform 0.38s cubic-bezier(0.34,1.2,0.64,1)",
          zIndex: 0,
        }}
      />

      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "#FFFFFF",
          border: "1px solid #E8E4DE",
          borderRadius: 20,
          padding: "24px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          position: "relative",
          boxShadow: hovered
            ? "0 16px 48px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)"
            : "0 4px 20px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)",
          transform: `rotate(${rotate}deg) translateY(${translateY}px)`,
          transition: "transform 0.38s cubic-bezier(0.34,1.2,0.64,1), box-shadow 0.28s ease",
          cursor: "default",
          willChange: "transform",
          zIndex: hovered ? 10 : 1,
        }}
      >
        {/* Icon — absolute at corner of the white card */}
        <img
          src={a.icon}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            ...a.iconCorner,
            width: a.iconSize,
            height: a.iconSize,
            objectFit: "contain",
            transform: `rotate(${a.iconRotate}deg)`,
            pointerEvents: "none",
            zIndex: 20,
            filter: "drop-shadow(0 3px 8px rgba(0,0,0,0.2))",
          }}
        />

        {/* Title */}
        <p style={{ fontFamily: FF, fontWeight: 700, fontSize: 14, color: "#1a1a1a", margin: 0, lineHeight: 1.3, fontStyle: "italic", paddingRight: 44 }}>
          "{a.title}"
        </p>

        {/* Quote */}
        <p style={{ fontFamily: FF, fontSize: 13, lineHeight: 1.7, color: "rgba(26,26,26,0.6)", margin: 0, flex: 1, whiteSpace: "pre-line" }}>
          {a.quote}
        </p>

        {/* Attribution */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 4, borderTop: "1px solid #F0ECE6", paddingTop: 12 }}>
          <p style={{ fontFamily: FF, fontWeight: 700, fontSize: 12.5, color: "#1a1a1a", margin: 0 }}>{a.name}</p>
          <p style={{ fontFamily: FF, fontSize: 12, color: "rgba(26,26,26,0.45)", margin: 0, fontStyle: "italic" }}>{a.role}</p>
        </div>
      </div>
    </div>
  );
}

function CustomerAnecdotesSection() {
  const FF = "'Wotfard', sans-serif";
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section
      id="section-anecdotes"
      ref={ref}
      className="relative h-screen snap-start snap-always flex flex-col justify-center overflow-hidden"
      style={{ background: "#F7F7F5" }}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(900px, calc(100% - 80px))",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 8 }}
        >
          <p style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#E8654B", margin: 0 }}>
            Customer anecdotes
          </p>
          <h2 style={{ fontFamily: FF, fontWeight: 700, fontSize: "clamp(22px,3vw,32px)", color: "#1a1a1a", margin: 0, lineHeight: 1.2 }}>Heard from agents and admins</h2>
          <p style={{ fontFamily: FF, fontSize: 14, color: "rgba(26,26,26,0.55)", margin: 0 }}>What our customers said when Rovo Service quietly took work off their plate.</p>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE, delay: 0.15 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 48,
            width: "100%",
            alignItems: "start",
            paddingTop: 52,
            paddingBottom: 52,
            paddingLeft: 32,
            paddingRight: 32,
          }}
        >
          {CUSTOMER_ANECDOTES.map((a, i) => (
            <AnecdoteCard key={i} a={a} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ExperienceWalkthroughSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.35 });

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springConfig = { stiffness: 120, damping: 22, mass: 0.6 };
  const springX = useSpring(rawX, springConfig);
  const springY = useSpring(rawY, springConfig);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <section
      id="section-walkthrough"
      ref={ref}
      className="relative h-screen snap-start snap-always flex items-center justify-center overflow-hidden"
      style={{ background: "#F7F7F5" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <CosmicWaveBackground />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(1188px, calc(100% - 112px))",
          zIndex: 5,
          perspective: 1400,
        }}
      >
        <motion.div
          initial={{ scale: 0.04, borderRadius: "50%", opacity: 1 }}
          animate={
            isInView
              ? { scale: 1, borderRadius: "18px", opacity: 1 }
              : { scale: 0.04, borderRadius: "50%", opacity: 1 }
          }
          transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
          style={{
            overflow: "hidden",
            background: "#fff",
            boxShadow: "0 24px 80px rgba(0,0,0,0.22), 0 4px 16px rgba(0,0,0,0.10)",
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          {/* Browser chrome */}
          <div
            style={{
              height: 38,
              background: "#F8FAFC",
              borderBottom: "1px solid rgba(15,23,42,0.08)",
              display: "flex",
              alignItems: "center",
              padding: "0 14px",
              gap: 8,
            }}
          >
            <div style={{ display: "flex", gap: 7 }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }} />
            </div>
          </div>

          <img
            src={walkthroughScreenshot}
            alt="Experience walkthrough"
            style={{ display: "block", width: "100%", height: "auto" }}
          />

          {/* Prototype CTA */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "14px 20px",
              background: "#F8FAFC",
              borderTop: "1px solid rgba(15,23,42,0.07)",
            }}
          >
            <a
              href="https://ainwi-services-v-2.replit.app/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                background: "#1a1a1a",
                color: "#fff",
                borderRadius: 10,
                padding: "9px 18px",
                fontFamily: "'Wotfard', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
                letterSpacing: "0.01em",
                transition: "background 0.18s ease, transform 0.18s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#333"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#1a1a1a"; }}
            >
              View interactive prototype
              <ArrowUpRight size={14} strokeWidth={2} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SolutionSection({ study }: { study: CaseStudy }) {
  return (
    <section
      id="section-solution"
      className="relative h-screen snap-start snap-always flex flex-col justify-center overflow-hidden"
      style={{ background: "#F7F7F5" }}
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

          <StampHeroBanner study={study} />

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

function ImpactCard({
  value,
  label,
  category,
  categoryColor,
  delay = 0,
}: {
  value: string;
  label: string;
  category: string;
  categoryColor: string;
  delay?: number;
}) {
  const FF = "'Wotfard', sans-serif";
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: EASE, delay }}
      style={{
        background: "#FFFFFF",
        border: "1px solid rgba(26,26,26,0.08)",
        borderRadius: 16,
        padding: "28px 28px 26px",
        display: "flex",
        flexDirection: "column",
        gap: 0,
      }}
    >
      {/* Category tag */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: categoryColor, flexShrink: 0 }} />
        <p style={{ fontFamily: FF, fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: categoryColor, margin: 0 }}>
          {category}
        </p>
      </div>
      {/* Value */}
      <p
        style={{
          fontFamily: FF,
          fontSize: "clamp(24px,2.6vw,36px)",
          fontWeight: 800,
          color: "#1a1a1a",
          margin: "0 0 12px 0",
          lineHeight: 1,
          letterSpacing: "-0.03em",
        }}
      >
        {value}
      </p>
      {/* Label */}
      <p style={{ fontFamily: FF, fontSize: 13, color: "rgba(26,26,26,0.5)", margin: 0, lineHeight: 1.45 }}>
        {label}
      </p>
    </motion.div>
  );
}

function ImpactSection({ study: _study }: { study: CaseStudy }) {
  const FF = "'Wotfard', sans-serif";
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      id="section-impact"
      ref={ref}
      className="relative h-screen snap-start snap-always flex flex-col justify-center overflow-hidden"
      style={{ background: "#F7F7F5" }}
    >
      <div style={{ maxWidth: 880, margin: "0 auto", width: "100%", padding: "0 40px", display: "flex", flexDirection: "column", gap: 0 }}>

        {/* Header row — title left, tagline right, thick border bottom */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            marginBottom: 36,
          }}
        >
          <p style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(26,26,26,0.45)", margin: 0 }}>
            Impact — Early Signals
          </p>
          <p style={{ fontFamily: FF, fontSize: "clamp(22px,2.5vw,30px)", fontWeight: 700, color: "#1a1a1a", margin: 0, lineHeight: 1.1 }}>
            First 30 days post GA
          </p>
          <p style={{ fontFamily: FF, fontSize: 13, color: "rgba(26,26,26,0.45)", margin: 0, lineHeight: 1.55 }}>
            Early signals show Rovo Service is beginning to execute work end-to-end with increasing accuracy and reduced need for intervention.
          </p>
        </motion.div>

        {/* Cards — 3 columns */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 28 }}>
          <ImpactCard value="21%" label="Tickets fully resolved by AI (early adopter cohort)" category="Execution" categoryColor="#E8654B" delay={0.1} />
          <ImpactCard value="~1,200 hrs" label="1 in 5 tickets handled end-to-end by AI" category="Execution" categoryColor="#E8654B" delay={0.18} />
          <ImpactCard value="82%" label="Plans executed without major changes" category="Quality" categoryColor="#6B8CDA" delay={0.26} />
        </div>

        {/* Footer statement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: EASE, delay: 0.5 }}
          style={{ borderTop: "1px solid rgba(26,26,26,0.12)", paddingTop: 16 }}
        >
          <p style={{ fontFamily: FF, fontSize: 12, color: "rgba(26,26,26,0.4)", margin: 0, fontStyle: "italic", lineHeight: 1.5 }}>
            AI is shifting from assisting work → executing with increasing reliability.
          </p>
        </motion.div>
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
      style={{ background: "#F7F7F5" }}
    >
      <SnapReveal>
        <div className="max-w-3xl mx-auto w-full px-6">
          <p
            className="text-xs uppercase tracking-widest font-semibold text-[#2D2D2D]/55 mb-6"
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
    ...(study.id === 4 ? [{ id: "section-consolidation", label: "AI Strategy" }] : []),
    { id: "section-process", label: study.id === 4 ? "Competitors" : "Process" },
    ...(study.id === 4 ? [{ id: "section-principles", label: "Principles" }] : []),
    ...(study.id === 4 ? [{ id: "section-concepts", label: "Concepts" }] : []),
    { id: "section-solution", label: "Solution" },
    { id: "section-walkthrough", label: "Walkthrough" },
    ...(study.id === 4 ? [{ id: "section-anecdotes", label: "Anecdotes" }] : []),
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
            <button
              key={id}
              className="relative flex items-center pointer-events-auto bg-transparent border-0 p-0"
              style={{ gap: 14, cursor: "pointer" }}
              aria-label={`Navigate to ${label} section`}
              aria-current={isActive ? "true" : undefined}
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
                style={{ fontFamily: "'Wotfard', sans-serif", color: "rgba(45,45,45,0.65)" }}
                initial={false}
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -6 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                {label}
              </motion.span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

export default function CaseStudyPage() {
  const params = useParams<{ id: string }>();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [headerHovered, setHeaderHovered] = useState(false);
  const [switchWorkOpen, setSwitchWorkOpen] = useState(false);

  const id = parseInt(params.id ?? "", 10);
  const study = getCaseStudy(id);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
    setHeaderScrolled(false);
    setHeaderHovered(false);
    setSwitchWorkOpen(false);
  }, [id]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => setHeaderScrolled(el.scrollTop > 60);
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [study]);

  useEffect(() => {
    if (!switchWorkOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSwitchWorkOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [switchWorkOpen]);

  if (!study) {
    return <NotFound />;
  }

  return (
    <div
      className="h-screen overflow-hidden relative selection:bg-foreground selection:text-background"
      style={{ background: "#F7F7F5" }}
    >
      {/* Click-outside backdrop to close switch work panel */}
      {switchWorkOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setSwitchWorkOpen(false)}
        />
      )}

      {/* Invisible hover zone — only active after scrolling past hero */}
      {headerScrolled && (
        <div
          className="fixed top-0 left-0 right-0 z-40 h-16 pointer-events-auto"
          onMouseEnter={() => setHeaderHovered(true)}
          onMouseLeave={() => setHeaderHovered(false)}
        />
      )}

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 px-6 md:px-24 flex items-center justify-between ${
          headerScrolled && headerHovered
            ? "py-4 opacity-100 translate-y-0 bg-[#F7F7F5]/80 backdrop-blur-md border-b border-[#2D2D2D]/10 shadow-sm pointer-events-auto"
            : "py-5 opacity-0 -translate-y-2 pointer-events-none bg-transparent border-b border-transparent"
        }`}
        onMouseEnter={() => setHeaderHovered(true)}
        onMouseLeave={() => setHeaderHovered(false)}
      >
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

        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
          <span
            className="text-xs font-bold tracking-widest uppercase text-[#2D2D2D]/55"
            style={{ fontFamily: "'Wotfard', sans-serif" }}
          >
            {study.company}
          </span>
          <span
            className="text-sm font-semibold text-[#2D2D2D] leading-tight"
            style={{ fontFamily: "'Wotfard', sans-serif" }}
          >
            {study.title}
          </span>
        </div>

        <div className="relative">
          <button
            onClick={() => setSwitchWorkOpen((o) => !o)}
            aria-haspopup="listbox"
            aria-expanded={switchWorkOpen}
            aria-label="Switch to another case study"
            className="flex items-center gap-2 text-sm font-medium text-[#2D2D2D]/70 hover:text-[#2D2D2D] transition-colors group"
            style={{ fontFamily: "'Wotfard', sans-serif" }}
          >
            <span>Switch Work</span>
            <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${switchWorkOpen ? "border-[#2D2D2D]/60 bg-[#2D2D2D]/5 rotate-90" : "border-[#2D2D2D]/20 group-hover:border-[#2D2D2D]/50"}`}>
              <ArrowRight size={14} strokeWidth={1.5} className="transition-transform" />
            </div>
          </button>

          <AnimatePresence>
            {switchWorkOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.2, ease: EASE }}
                className="absolute top-full right-0 mt-3 w-96 rounded-2xl overflow-hidden shadow-xl border border-[#2D2D2D]/8"
                style={{ background: "rgba(250,248,245,0.95)", backdropFilter: "blur(16px)" }}
              >
                <div className="px-4 pt-4 pb-2">
                  <span
                    className="text-[10px] font-bold tracking-widest uppercase text-[#2D2D2D]/55"
                    style={{ fontFamily: "'Wotfard', sans-serif" }}
                  >
                    Case Studies
                  </span>
                </div>
                <div className="flex flex-col pb-2">
                  {getAllCaseStudies()
                    .filter((cs) => cs.id !== study.id)
                    .map((cs) => (
                      <Link
                        key={cs.id}
                        href={`/work/${cs.id}`}
                        onClick={() => setSwitchWorkOpen(false)}
                        className="flex items-center justify-between px-4 py-3 hover:bg-[#2D2D2D]/5 transition-colors group/item"
                      >
                        <div className="flex flex-col gap-0.5">
                          <span
                            className="text-[10px] font-bold tracking-widest uppercase text-[#2D2D2D]/55"
                            style={{ fontFamily: "'Wotfard', sans-serif" }}
                          >
                            {cs.company}
                          </span>
                          <span
                            className="text-sm font-medium text-[#2D2D2D] leading-tight"
                            style={{ fontFamily: "'Wotfard', sans-serif" }}
                          >
                            {cs.title}
                          </span>
                        </div>
                        <ArrowRight size={13} strokeWidth={1.5} className="text-[#2D2D2D]/30 group-hover/item:text-[#2D2D2D]/70 transition-colors flex-shrink-0 ml-3" />
                      </Link>
                    ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <SectionNav study={study} scrollRef={scrollRef} />

      <div
        ref={scrollRef}
        className="h-screen overflow-y-scroll"
        style={{ scrollSnapType: "y mandatory", scrollbarWidth: "none" }}
      >
        <HeroSection
          study={study}
          imageSrc={study.id === 4 ? "/rovo-screens-2.png" : undefined}
          imageLeft={study.id === 4 ? 80 : undefined}
          imageWidth={study.id === 4 ? "96%" : undefined}
          imageBottom={study.id === 4 ? 0 : undefined}
        />
        <OverviewSection study={study} />
        <ChallengeSection study={study} />
        {study.id === 4 && <AIConsolidationSection />}
        <ProcessSection study={study} />
        {study.id === 4 && <EmergingThemesSection />}
        {study.id === 4 && <DesignPrinciplesSection />}
        {study.id === 4 && <RovoServiceOverviewSection />}
        {study.id === 4 && <EarlyStageConceptsSection />}
        <SolutionSection study={study} />
        <ExperienceWalkthroughSection />
        {study.id === 4 && <CustomerAnecdotesSection />}
        <ImpactSection study={study} />
        <NextProjectSection study={study} />
      </div>
    </div>
  );
}
