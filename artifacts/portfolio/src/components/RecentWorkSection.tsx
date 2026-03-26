import { ArrowUpRight, Zap } from "lucide-react";
import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const PROJECTS = [
  {
    id: 1,
    title: "Project Carrara",
    category: "Amazon Post-Purchase",
    description: "Led cross-functional team to redesign support workflows. Reduced resolution time by 42% through smart routing and self-serve options.",
    year: "2024",
    image: null,
    placeholderColor: "#D4C5F9",
    metrics: [
      { label: "SUCCESS", value: "65.2%" },
    ],
    colSpan: "md:col-span-1",
    type: "image",
  },
  {
    id: 2,
    title: "Foresight",
    category: "Native iOS/Android",
    description: "Designed AI-powered support automation that reduced support tickets by 32% and improved customer satisfaction across all demographics.",
    year: "2021",
    image: null,
    placeholderColor: "#B8D8C8",
    metrics: [
      { label: "ADOPTION", value: "89%" },
      { label: "MONTHLY ACTIONS", value: "1.5M" },
    ],
    colSpan: "md:col-span-2",
    type: "image",
  },
  {
    id: 3,
    title: "Improve Trust in Marketplace Apps",
    category: "Growth & Optimization",
    description: "Designed transparency features that surfaced security certifications and compliance details, building user confidence in third-party apps.",
    year: "2023",
    image: null,
    placeholderColor: "#F9C5C5",
    metrics: [
      { label: "LESSER TICKETS", value: "67%" },
      { label: "FEWER DETRACTORS", value: "16%" },
    ],
    colSpan: "md:col-span-2",
    type: "image",
  },
  {
    id: 4,
    title: "Rovo Service",
    category: "Atlassian AI Assistant",
    description: "Designed the service layer experience for Rovo, Atlassian's AI assistant — enabling agents to take action across tools, reducing manual workflows for enterprise teams.",
    year: "2024",
    image: null,
    placeholderColor: "#C5D9F9",
    metrics: [
      { label: "EFFICIENCY GAIN", value: "38%" },
      { label: "ACTIVE TEAMS", value: "2.1K" },
    ],
    colSpan: "md:col-span-1",
    type: "image",
  },
];

function ProjectCard({ project, hoveredId, setHoveredId }: { project: typeof PROJECTS[0]; hoveredId: number | null; setHoveredId: (id: number | null) => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const isHovered = hoveredId === project.id;

  return (
    <motion.div
      ref={ref}
      className="min-h-[85vh] flex items-center justify-center py-12"
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {project.type === "special" ? (
        <a
          key={project.id}
          href={`/work/${project.id}`}
          className={`group block rounded-2xl overflow-hidden relative cursor-pointer w-full`}
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
              {project.cta}
            </div>
          </div>
        </a>
      ) : (
        <a
          key={project.id}
          href={`/work/${project.id}`}
          className="group relative block rounded-2xl overflow-hidden cursor-pointer w-full h-full"
          onMouseEnter={() => setHoveredId(project.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          {/* Image fills the entire card */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: project.placeholderColor }}
          />

          {/* Arrow button on hover */}
          <div className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center transition-all duration-300 z-10 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
            <ArrowUpRight size={16} className="text-white" />
          </div>

          {/* Floating info panel — 12px margin, expands upward inside fixed card */}
          <div
            className="absolute left-3 right-3 bottom-3 bg-[#1a1a1a] rounded-xl overflow-hidden z-10"
          >
            {/* Always-visible top row: title + metrics */}
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
              <div className="flex gap-5 ml-4 flex-shrink-0">
                {project.metrics.map((metric, idx) => (
                  <div key={idx} className="text-right">
                    <p className="text-lg md:text-xl font-bold text-[#4ecdc4]">{metric.value}</p>
                    <p className="text-[10px] uppercase tracking-widest text-white/50">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Expandable description — grows upward within the card */}
            <div
              className="overflow-hidden"
              style={{
                maxHeight: isHovered ? "100px" : "0px",
                transition: "max-height 0.35s ease-in-out",
              }}
            >
              <div className="px-5 pb-4 border-t border-white/10 pt-3">
                <p className="text-sm text-white/70 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          </div>
        </a>
      )}
    </motion.div>
  );
}

export default function RecentWorkSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="work-showcase" className="py-24 md:py-40 px-6 md:px-24" style={{ background: "#FAF8F5" }}>
      <div className="flex flex-col md:flex-row gap-12 md:gap-24">
        {/* Left: Heading */}
        <div className="md:w-1/3 flex-shrink-0">
          <h2
            style={{ fontFamily: "'Wotfard', sans-serif", fontWeight: 700 }}
            className="text-3xl md:text-4xl leading-tight text-foreground md:sticky md:top-32"
          >
            Recent work
          </h2>
        </div>

        {/* Right: Projects Grid */}
        <div className="md:w-2/3">
          <div className="flex flex-col gap-0">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} hoveredId={hoveredId} setHoveredId={setHoveredId} />
          ))}

          </div>
        </div>
      </div>
    </section>
  );
}
