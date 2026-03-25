import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    id: 1,
    title: "Jira AI-Powered Workflows",
    description: "Designed intuitive interfaces for AI-native task automation in Jira Service Management. Led cross-functional team to ship agentic features that reduced MTTR by 85%.",
    type: "Product Design",
    year: "2024",
  },
  {
    id: 2,
    title: "Amazon Post-Purchase Experience Redesign",
    description: "Rebuilt order tracking and customer support journeys. Designed self-serve solutions that reduced support tickets by 32% and improved CSAT by 18%.",
    type: "UX Strategy",
    year: "2021",
  },
  {
    id: 3,
    title: "Enterprise IoT Platform Design",
    description: "Created mission-critical interfaces for real-time operations monitoring. Designed data visualization systems that reduced time-to-insight from 30 mins to <2 mins.",
    type: "Systems Design",
    year: "2018",
  },
  {
    id: 4,
    title: "Defence Command & Control System",
    description: "Designed battlefield management interfaces for high-stress military operations. Established human-factors protocols adopted across defense portfolio.",
    type: "Defense Tech",
    year: "2015",
  },
  {
    id: 5,
    title: "Design Systems & Component Library",
    description: "Built modular UI framework reducing development cycles by 40%. Standardized design patterns across enterprise applications and platforms.",
    type: "Design Systems",
    year: "2023",
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project) => (
            <a
              key={project.id}
              href={`/work/${project.id}`}
              className="group p-6 rounded-lg border border-border/60 hover:border-foreground/30 hover:bg-foreground/5 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-foreground transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mt-2">
                    {project.type}
                  </p>
                </div>
                <ArrowUpRight 
                  size={20} 
                  className="text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0 ml-3"
                />
              </div>

              <p className="text-sm text-foreground/70 leading-relaxed mb-4">
                {project.description}
              </p>

              <p className="text-xs text-muted-foreground">
                {project.year}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
