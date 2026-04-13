import { ArrowUpRight, Zap } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const PROJECTS = [
  {
    id: 4,
    title: "Rovo Service",
    category: "Atlassian AI Assistant",
    description: "Designed the service layer experience for Rovo, Atlassian's AI assistant - enabling agents to take action across tools, reducing manual workflows for enterprise teams.",
    timeline: "2023 – 2024",
    image: "/rovo-service-bg.png",
    placeholderColor: "#C5D9F9",
    colSpan: "md:col-span-1",
    type: "image",
  },
  {
    id: 3,
    title: "App Editions",
    category: "Growth & Optimization",
    description: "Designed transparency features that surfaced security certifications and compliance details, building user confidence in third-party apps.",
    timeline: "APR 2024 — JUN 2025",
    image: "/marketplace-cover.png",
    backgroundPosition: "140% -35%",
    placeholderColor: "#0D0D0D",
    colSpan: "md:col-span-2",
    type: "image",
  },
  {
    id: 2,
    title: "Foresight",
    category: "Native iOS/Android",
    description: "Designed AI-powered support automation that reduced support tickets by 32% and improved customer satisfaction across all demographics.",
    timeline: "2020 – 2021",
    image: null,
    placeholderColor: "#B8D8C8",
    colSpan: "md:col-span-2",
    type: "image",
  },
  {
    id: 1,
    title: "Project Carrara",
    category: "Amazon Post-Purchase",
    description: "Led cross-functional team to redesign support workflows. Reduced resolution time by 42% through smart routing and self-serve options.",
    timeline: "2023 – 2024",
    image: null,
    placeholderColor: "#D4C5F9",
    colSpan: "md:col-span-1",
    type: "image",
  },
];

function ProjectCard({
  project,
  index,
  hoveredId,
  setHoveredId,
  onVisible,
  activeIndex,
}: {
  project: typeof PROJECTS[0];
  index: number;
  hoveredId: number | null;
  setHoveredId: (id: number | null) => void;
  onVisible: (index: number) => void;
  activeIndex: number;
}) {
  const animRef = useRef(null);
  const trackRef = useRef(null);
  const isInView = useInView(animRef, { once: true, amount: 0.3 });
  const isActive = useInView(trackRef, { once: false, amount: 0.5 });
  const isHovered = hoveredId === project.id;

  useEffect(() => {
    if (isActive) {
      onVisible(index);
    }
  }, [isActive, index, onVisible]);

  return (
    <motion.div
      ref={animRef}
      id={`project-${project.id}`}
      className="w-full py-6 relative"
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div ref={trackRef} className="absolute inset-0 pointer-events-none" />

      {project.type === "special" ? (
        <a
          href={`/work/${project.id}`}
          className="group block rounded-2xl overflow-hidden relative cursor-pointer w-full h-[78vh] hover:shadow-2xl transition-shadow duration-300"
          style={{ background: "linear-gradient(135deg, #3d1f6b 0%, #1a1040 50%, #0d0824 100%)" }}
          onMouseEnter={() => setHoveredId(project.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <div className="h-full flex flex-col items-center justify-center p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors">
              <Zap size={24} className="text-white" />
            </div>
            <h3
              style={{ fontFamily: "'Wotfard', sans-serif", fontWeight: 700 }}
              className="text-2xl text-white mb-3"
            >
              {project.title}
            </h3>
            <p className="text-sm text-white/70 leading-relaxed mb-8">
              {project.description}
            </p>
            <div className="border border-white/30 rounded-full px-5 py-2 text-xs uppercase tracking-widest font-semibold text-white group-hover:bg-white/10 transition-colors">
              View project
            </div>
          </div>
        </a>
      ) : (
        <a
          href={`/work/${project.id}`}
          aria-label={`View case study: ${project.title} — ${project.category}`}
          className="group relative block rounded-2xl overflow-hidden cursor-pointer w-full h-[78vh] hover:shadow-2xl transition-shadow duration-300"
          onMouseEnter={() => setHoveredId(project.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: project.placeholderColor,
              ...(project.image
                ? {
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: (project as any).backgroundPosition ?? "center",
                  }
                : {}),
            }}
          />

          <div className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center transition-all duration-300 z-10 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
            <ArrowUpRight size={16} className="text-white" />
          </div>

          <div className="absolute left-3 right-3 bottom-3 bg-[#1a1a1a] rounded-xl overflow-hidden z-10">
            <div className="flex items-start justify-between px-5 py-4">
              <div>
                <h3
                  style={{ fontFamily: "'Wotfard', sans-serif", fontWeight: 700 }}
                  className="text-base md:text-lg text-white leading-tight"
                >
                  {project.title}
                </h3>
                <p className="text-xs text-white/50 mt-1">{project.category}</p>
              </div>
              <div className="ml-4 flex-shrink-0 flex items-center">
                <p className="text-sm text-white/40" style={{ fontFamily: "'Wotfard', sans-serif" }}>{project.timeline}</p>
              </div>
            </div>

            <AnimatePresence>
              {(isHovered || index === activeIndex) && (
                <motion.div
                  className="overflow-hidden"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut", delay: 0.08 }}
                >
                  <div className="px-5 pb-4 border-t border-white/10 pt-3">
                    <p className="text-sm text-white/70 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </a>
      )}
    </motion.div>
  );
}

export default function RecentWorkSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="work-showcase" className="py-24 md:py-40 px-6 md:px-24">
      <div className="flex flex-col md:flex-row gap-12 md:gap-24">
        <div className="md:w-1/3 flex-shrink-0">
          <div className="md:sticky md:top-32 flex flex-col gap-8">
            <h2
              style={{ fontFamily: "'Wotfard', sans-serif", fontWeight: 700 }}
              className="text-3xl md:text-4xl leading-tight text-foreground"
            >
              Recent work
            </h2>

            <div className="flex items-center gap-3">
              <span
                style={{ fontFamily: "'Wotfard', sans-serif", fontWeight: 600 }}
                className="text-sm tabular-nums text-[#2D2D2D]"
                aria-live="polite"
                aria-atomic="true"
                aria-label={`Project ${activeIndex + 1} of ${PROJECTS.length}`}
              >
                {String(activeIndex + 1).padStart(2, "0")}
                <span className="text-[#2D2D2D]/40 mx-1" aria-hidden="true">/</span>
                {String(PROJECTS.length).padStart(2, "0")}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {PROJECTS.map((project, i) => (
                <button
                  key={project.id}
                  onClick={() => {
                    const element = document.getElementById(`project-${project.id}`);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth", block: "center" });
                      setActiveIndex(i);
                    }
                  }}
                  aria-label={`Go to project: ${project.title}`}
                  aria-current={i === activeIndex ? "true" : undefined}
                  className="flex items-center gap-3 group cursor-pointer text-left hover:opacity-70 transition-opacity"
                >
                  <motion.div
                    animate={{
                      width: i === activeIndex ? 28 : 6,
                      backgroundColor: i === activeIndex ? "#2D2D2D" : "#2D2D2D33",
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="h-1.5 rounded-full flex-shrink-0"
                  />
                  <motion.span
                    animate={{
                      opacity: i === activeIndex ? 1 : 0,
                      x: i === activeIndex ? 0 : -4,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="text-xs text-[#2D2D2D]/60 whitespace-nowrap overflow-hidden"
                    style={{ fontFamily: "'Wotfard', sans-serif" }}
                  >
                    {project.title}
                  </motion.span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="md:w-2/3">
          <div className="flex flex-col gap-0">
            {PROJECTS.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
                onVisible={setActiveIndex}
                activeIndex={activeIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
