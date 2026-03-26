import { useParams, useLocation } from "wouter";
import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getCaseStudy, getNextCaseStudy, type CaseStudy } from "@/data/caseStudies";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 32 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, ease: EASE, delay },
  };
}

function SectionReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.65, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function HeroSection({ study }: { study: CaseStudy }) {
  return (
    <section
      className="relative min-h-[70vh] flex flex-col justify-end px-6 md:px-24 pt-32 pb-0 overflow-hidden"
      style={{ backgroundColor: study.heroColor }}
    >
      <motion.div className="max-w-5xl" {...fadeUp(0.1)}>
        <p
          className="text-xs uppercase tracking-widest font-semibold text-black/50 mb-4"
          style={{ fontFamily: "'Wotfard', sans-serif" }}
        >
          {study.category} · {study.year}
        </p>
        <h1
          className="text-4xl md:text-6xl leading-[1.05] text-[#1a1a1a] mb-10 md:mb-14"
          style={{ fontFamily: "'Wotfard', sans-serif", fontWeight: 700 }}
        >
          {study.title}
        </h1>
      </motion.div>

      <motion.div
        className="rounded-t-2xl bg-[#1a1a1a] px-6 md:px-10 py-6 flex flex-wrap items-center justify-between gap-6"
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
              <p className="text-2xl md:text-3xl font-bold text-[#4ecdc4]" style={{ fontFamily: "'Wotfard', sans-serif" }}>{m.value}</p>
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
    <SectionReveal>
      <section className="py-20 md:py-28 px-6 md:px-24" style={{ background: "#FAF8F5" }}>
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 max-w-5xl">
          <div className="md:w-1/3 flex-shrink-0">
            <h2
              className="text-2xl md:text-3xl leading-tight text-foreground"
              style={{ fontFamily: "'Wotfard', sans-serif", fontWeight: 700 }}
            >
              Overview
            </h2>
          </div>
          <div className="md:w-2/3">
            <p
              className="text-base md:text-lg leading-relaxed text-foreground/80"
              style={{ fontFamily: "'Wotfard', sans-serif" }}
            >
              {study.overview}
            </p>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}

function ChallengeSection({ study }: { study: CaseStudy }) {
  return (
    <SectionReveal>
      <section className="py-20 md:py-28 px-6 md:px-24 border-t border-[#e8e4de]" style={{ background: "#FAF8F5" }}>
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 max-w-5xl">
          <div className="md:w-1/3 flex-shrink-0">
            <h2
              className="text-2xl md:text-3xl leading-tight text-foreground md:sticky md:top-32"
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
            <ul className="flex flex-col gap-3 mt-2">
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
      </section>
    </SectionReveal>
  );
}

function ProcessSection({ study }: { study: CaseStudy }) {
  return (
    <SectionReveal>
      <section className="py-20 md:py-28 px-6 md:px-24 border-t border-[#e8e4de]" style={{ background: "#FAF8F5" }}>
        <div className="max-w-5xl">
          <h2
            className="text-2xl md:text-3xl leading-tight text-foreground mb-12"
            style={{ fontFamily: "'Wotfard', sans-serif", fontWeight: 700 }}
          >
            Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {study.process.map((step, i) => (
              <motion.div
                key={i}
                className="rounded-2xl bg-[#F0EDE8] px-6 py-7 flex flex-col gap-3"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: EASE, delay: i * 0.08 }}
              >
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}

function SolutionSection({ study }: { study: CaseStudy }) {
  return (
    <SectionReveal>
      <section className="py-20 md:py-28 px-6 md:px-24 border-t border-[#e8e4de]" style={{ background: "#FAF8F5" }}>
        <div className="max-w-5xl flex flex-col gap-12">
          <div className="flex flex-col md:flex-row gap-12 md:gap-24">
            <div className="md:w-1/3 flex-shrink-0">
              <h2
                className="text-2xl md:text-3xl leading-tight text-foreground md:sticky md:top-32"
                style={{ fontFamily: "'Wotfard', sans-serif", fontWeight: 700 }}
              >
                The solution
              </h2>
            </div>
            <div className="md:w-2/3 flex flex-col gap-4">
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
            className="w-full rounded-2xl overflow-hidden"
            style={{ backgroundColor: study.heroColor, minHeight: "340px" }}
          >
            <img
              src={study.image}
              alt={study.imageAlt}
              className="w-full h-full object-cover"
              style={{ maxHeight: "480px" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {study.solution.features.map((feature, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="w-5 h-[2px] bg-[#4ecdc4] rounded-full mb-1" />
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
      </section>
    </SectionReveal>
  );
}

function ImpactSection({ study }: { study: CaseStudy }) {
  return (
    <SectionReveal>
      <section className="py-20 md:py-28 px-6 md:px-24 border-t border-[#e8e4de]" style={{ background: "#FAF8F5" }}>
        <div className="max-w-5xl">
          <h2
            className="text-2xl md:text-3xl leading-tight text-foreground mb-12"
            style={{ fontFamily: "'Wotfard', sans-serif", fontWeight: 700 }}
          >
            Impact
          </h2>
          <div className="flex flex-col md:flex-row gap-0 divide-y md:divide-y-0 md:divide-x divide-[#e8e4de]">
            {study.impact.map((item, i) => (
              <motion.div
                key={i}
                className="flex-1 px-0 md:px-10 py-8 md:py-0 first:pl-0 last:pr-0 flex flex-col gap-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <p
                  className="text-4xl md:text-5xl font-bold text-[#4ecdc4]"
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}

function NextProjectSection({ study }: { study: CaseStudy }) {
  const next = getNextCaseStudy(study.id);
  if (!next) return null;

  return (
    <SectionReveal>
      <section className="py-20 md:py-28 px-6 md:px-24 border-t border-[#e8e4de]" style={{ background: "#FAF8F5" }}>
        <div className="max-w-5xl">
          <p
            className="text-xs uppercase tracking-widest font-semibold text-[#2D2D2D]/40 mb-6"
            style={{ fontFamily: "'Wotfard', sans-serif" }}
          >
            Next project
          </p>
          <a
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
          </a>
        </div>
      </section>
    </SectionReveal>
  );
}

export default function CaseStudyPage() {
  const params = useParams<{ id: string }>();
  const [, navigate] = useLocation();

  const id = parseInt(params.id ?? "", 10);
  const study = getCaseStudy(id);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [id]);

  if (!study) {
    navigate("/404");
    return null;
  }

  return (
    <div className="min-h-screen relative selection:bg-foreground selection:text-background" style={{ background: "#FAF8F5" }}>
      <header className="fixed top-0 left-0 right-0 z-50 py-5 px-6 md:px-24 flex items-center justify-between bg-transparent">
        <a
          href="/"
          className="flex items-center gap-2 text-sm font-medium text-[#2D2D2D]/70 hover:text-[#2D2D2D] transition-colors group"
          style={{ fontFamily: "'Wotfard', sans-serif" }}
        >
          <div className="w-8 h-8 rounded-full border border-[#2D2D2D]/20 flex items-center justify-center group-hover:border-[#2D2D2D]/50 transition-colors">
            <ArrowLeft size={14} strokeWidth={1.5} />
          </div>
          <span>Back</span>
        </a>
        <a
          href="/"
          className="text-lg font-serif font-medium tracking-wide hover:opacity-70 transition-opacity text-[#2D2D2D]"
        >
          Adil Hussain
        </a>
      </header>

      <main>
        <HeroSection study={study} />
        <OverviewSection study={study} />
        <ChallengeSection study={study} />
        <ProcessSection study={study} />
        <SolutionSection study={study} />
        <ImpactSection study={study} />
        <NextProjectSection study={study} />
      </main>
    </div>
  );
}
