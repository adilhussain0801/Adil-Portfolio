import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

const PROJECTS = [
  {
    id: 1,
    title: "Project Carrara",
    description: "Improving the customer satisfaction in the post purchase support experience for the customer by minimized friction in the high touch resolution journey",
    year: "2024",
    image: "/project-jira-ai.png",
    bgColor: "bg-yellow-100",
    span: "col-span-1 row-span-1",
    details: "Led cross-functional team to redesign support workflows. Reduced resolution time by 42% through smart routing and self-serve options.",
    metrics: [
      { label: "CSAT Improvement", value: "34%" },
      { label: "Tickets Resolved", value: "89%" }
    ]
  },
  {
    id: 2,
    title: "Foresight",
    description: "Reimagining the post-purchase experience by introducing enhanced self-serve and automation capabilities by reducing reliance on support teams and improving overall efficiency and satisfaction through a seamless self serve experience",
    year: "2021",
    image: "/project-amazon-orders.png",
    bgColor: "bg-blue-100",
    span: "col-span-1 md:col-span-1 row-span-1",
    details: "Designed AI-powered support automation that reduced support tickets by 32% and improved customer satisfaction across all demographics.",
    metrics: [
      { label: "Adoption Rate", value: "76%" },
      { label: "Support Reduction", value: "32%" }
    ]
  },
  {
    id: 3,
    title: "Improve Trust in Marketplace Apps",
    description: "Privacy and Security details on Marketplace app listings page to highlight the security postures of cloud apps, improving transparency and helping users make informed, trust-based decisions.",
    year: "2023",
    image: "/project-iot-platform.png",
    bgColor: "bg-emerald-100",
    span: "col-span-1 row-span-1",
    details: "Designed transparency features that surfaced security certifications and compliance details, building user confidence in third-party apps.",
    metrics: [
      { label: "User Confidence", value: "+28%" },
      { label: "Trust Signals", value: "12" }
    ]
  },
  {
    id: 4,
    title: "Monetization Pathways for Marketplace Partners",
    description: "A new monetization strategy for Marketplace partners to package their apps. These plans offer flexible pricing options, enabling partners to tailor offerings to different customer needs, driving revenue growth and enhancing customer acquisition.",
    year: "2022",
    image: "/project-defense-system.png",
    bgColor: "bg-rose-100",
    span: "col-span-1 row-span-1",
    details: "Created flexible pricing tier system that increased app partner revenue by 145% and reduced churn significantly.",
    metrics: [
      { label: "Revenue Growth", value: "+145%" },
      { label: "Partner Retention", value: "94%" }
    ]
  },
  {
    id: 5,
    title: "Design Systems & Component Library",
    description: "Built modular UI framework reducing development cycles by 40%. Standardized design patterns across enterprise applications and platforms.",
    year: "2023",
    image: "/project-design-system.png",
    bgColor: "bg-purple-100",
    span: "col-span-1 md:col-span-1 row-span-1",
    details: "Established scalable design system with 200+ components, reducing design-to-dev handoff time and improving consistency.",
    metrics: [
      { label: "Dev Time Saved", value: "40%" },
      { label: "Component Library", value: "200+" }
    ]
  },
];

export default function RecentWorkSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="work-showcase" className="py-24 md:py-40 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h2
          style={{ fontFamily: "'Wotfard', sans-serif", fontWeight: 700 }}
          className="text-3xl md:text-4xl leading-tight text-foreground mb-12"
        >
          Recent work
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
          {PROJECTS.map((project, index) => {
            let gridClass = "col-span-1";
            if (index === 1) gridClass = "col-span-1 md:col-span-2 md:row-span-1 auto-rows-[400px]";
            if (index === 4) gridClass = "col-span-1 md:col-span-2 auto-rows-[400px]";

            const isHovered = hoveredId === project.id;

            return (
              <a
                key={project.id}
                href={`/work/${project.id}`}
                className={`group block rounded-lg overflow-hidden ${gridClass} relative cursor-pointer`}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Base card with image */}
                <div className="relative h-full rounded-lg overflow-hidden bg-black">
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-full object-cover transition-all duration-300 ${
                      isHovered ? "scale-110 blur-sm" : "scale-100"
                    }`}
                  />

                  {/* Default state - minimal overlay */}
                  <div className={`absolute inset-0 bg-black/40 transition-all duration-300 ${
                    isHovered ? "bg-black/90" : ""
                  } flex flex-col justify-end p-6`}>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                      {project.title}
                    </h3>

                    {!isHovered && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs uppercase tracking-widest font-semibold text-white">
                          View Work
                        </span>
                        <ArrowUpRight size={16} className="text-white" />
                      </div>
                    )}
                  </div>

                  {/* Expanded state - detailed overlay */}
                  {isHovered && (
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black flex flex-col justify-between p-6 animate-in fade-in duration-300">
                      {/* Top section */}
                      <div>
                        <p className="text-xs uppercase tracking-widest text-white/60 font-semibold mb-2">
                          {project.year}
                        </p>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                          {project.title}
                        </h3>
                      </div>

                      {/* Middle section - details */}
                      <div>
                        <p className="text-sm md:text-base text-white/90 leading-relaxed mb-6">
                          {project.details}
                        </p>

                        {/* Metrics */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          {project.metrics.map((metric, idx) => (
                            <div key={idx}>
                              <p className="text-2xl md:text-3xl font-bold text-teal-400">
                                {metric.value}
                              </p>
                              <p className="text-xs uppercase tracking-widest text-white/60 font-semibold mt-1">
                                {metric.label}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom section - CTA */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs uppercase tracking-widest font-semibold text-white">
                          View Work
                        </span>
                        <ArrowUpRight size={16} className="text-white" />
                      </div>
                    </div>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
