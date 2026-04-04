import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";

// ... existing code ...

                  <div className="flex flex-col gap-2">
                    <h3 className="max-w-[10ch] text-2xl md:text-3xl font-bold leading-tight" style={{ color: "#1a1a1a", fontFamily: "'Wotfard', sans-serif" }}>{t.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(26,26,26,0.55)", fontFamily: "'Wotfard', sans-serif" }}>{t.description}</p>
                </div>
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
    { id: "section-solution", label: "Solution" },
    { id: "section-impact", label: "Impact" },
    { id: "section-next", label: "Next Project" },
  ], [study.id]);

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
        <SolutionSection study={study} />
        <ImpactSection study={study} />
        <NextProjectSection study={study} />
      </div>
    </div>
  );
}
