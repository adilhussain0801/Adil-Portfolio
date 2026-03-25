import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    id: 1,
    title: "Project Carrara",
    description: "Improving the customer satisfaction in the post purchase support experience for the customer by minimized friction in the high touch resolution journey",
    year: "2024",
    image: "/project-jira-ai.png",
    bgColor: "bg-yellow-100",
  },
  {
    id: 2,
    title: "Foresight",
    description: "Reimagining the post-purchase experience by introducing enhanced self-serve and automation capabilities by reducing reliance on support teams and improving overall efficiency and satisfaction through a seamless self serve experience",
    year: "2021",
    image: "/project-amazon-orders.png",
    bgColor: "bg-blue-100",
  },
  {
    id: 3,
    title: "Improve Trust in Marketplace Apps",
    description: "Privacy and Security details on Marketplace app listings page to highlight the security postures of cloud apps, improving transparency and helping users make informed, trust-based decisions.",
    year: "2023",
    image: "/project-iot-platform.png",
    bgColor: "bg-emerald-100",
  },
  {
    id: 4,
    title: "Monetization Pathways for Marketplace Partners",
    description: "A new monetization strategy for Marketplace partners to package their apps. These plans offer flexible pricing options, enabling partners to tailor offerings to different customer needs, driving revenue growth and enhancing customer acquisition.",
    year: "2022",
    image: "/project-defense-system.png",
    bgColor: "bg-rose-100",
  },
  {
    id: 5,
    title: "Design Systems & Component Library",
    description: "Built modular UI framework reducing development cycles by 40%. Standardized design patterns across enterprise applications and platforms.",
    year: "2023",
    image: "/project-design-system.png",
    bgColor: "bg-purple-100",
  },
];

export default function RecentWorkSection() {
  return (
    <section id="work-showcase" className="py-24 md:py-40 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <h2
          style={{ fontFamily: "'Wotfard', sans-serif", fontWeight: 700 }}
          className="text-3xl md:text-4xl leading-tight text-foreground mb-12"
        >
          Recent work
        </h2>

        <div className="space-y-16">
          {PROJECTS.map((project) => (
            <a
              key={project.id}
              href={`/work/${project.id}`}
              className="group block"
            >
              {/* Image container */}
              <div className={`relative h-64 md:h-80 rounded-lg overflow-hidden ${project.bgColor} mb-4 group-hover:shadow-lg transition-shadow duration-300`}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content container */}
              <div className="flex flex-col">
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:opacity-70 transition-opacity">
                  {project.title}
                </h3>

                <p className="text-sm md:text-base text-foreground/70 leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-widest font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                    View Work
                  </span>
                  <ArrowUpRight 
                    size={16} 
                    className="text-muted-foreground group-hover:text-foreground transition-colors"
                  />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
