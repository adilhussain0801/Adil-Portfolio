import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    id: 1,
    title: "Jira AI-Powered Workflows",
    description: "Designed intuitive interfaces for AI-native task automation in Jira Service Management. Led cross-functional team to ship agentic features that reduced MTTR by 85%.",
    type: "Product Design",
    year: "2024",
    image: "/project-jira-ai.png",
  },
  {
    id: 2,
    title: "Amazon Post-Purchase Experience Redesign",
    description: "Rebuilt order tracking and customer support journeys. Designed self-serve solutions that reduced support tickets by 32% and improved CSAT by 18%.",
    type: "UX Strategy",
    year: "2021",
    image: "/project-amazon-orders.png",
  },
  {
    id: 3,
    title: "Enterprise IoT Platform Design",
    description: "Created mission-critical interfaces for real-time operations monitoring. Designed data visualization systems that reduced time-to-insight from 30 mins to <2 mins.",
    type: "Systems Design",
    year: "2018",
    image: "/project-iot-platform.png",
  },
  {
    id: 4,
    title: "Defence Command & Control System",
    description: "Designed battlefield management interfaces for high-stress military operations. Established human-factors protocols adopted across defense portfolio.",
    type: "Defense Tech",
    year: "2015",
    image: "/project-defense-system.png",
  },
  {
    id: 5,
    title: "Design Systems & Component Library",
    description: "Built modular UI framework reducing development cycles by 40%. Standardized design patterns across enterprise applications and platforms.",
    type: "Design Systems",
    year: "2023",
    image: "/project-design-system.png",
  },
];

export default function RecentWorkSection() {
  return (
    <section id="work-showcase" className="py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h2
          style={{ fontFamily: "'Wotfard', sans-serif", fontWeight: 700 }}
          className="text-3xl md:text-4xl leading-tight text-foreground mb-12"
        >
          Recent work
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project) => (
            <a
              key={project.id}
              href={`/work/${project.id}`}
              className="group flex flex-col overflow-hidden rounded-lg border border-border/60 hover:border-foreground/30 transition-all duration-300"
            >
              {/* Image container */}
              <div className="relative h-48 md:h-56 overflow-hidden bg-muted">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content container */}
              <div className="flex-1 p-6 bg-background hover:bg-foreground/5 transition-colors duration-300 flex flex-col">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-foreground transition-colors flex-1">
                    {project.title}
                  </h3>
                  <ArrowUpRight 
                    size={20} 
                    className="text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0"
                  />
                </div>

                <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-3">
                  {project.type}
                </p>

                <p className="text-sm text-foreground/70 leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>

                <p className="text-xs text-muted-foreground">
                  {project.year}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
