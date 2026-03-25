import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    id: 1,
    title: "Project Carrara",
    description: "Improving the customer satisfaction in the post purchase support experience for the customer by minimized friction in the high touch resolution journey",
    year: "2024",
    image: "/project-jira-ai.png",
    bgColor: "bg-yellow-100",
    span: "col-span-1 row-span-1",
  },
  {
    id: 2,
    title: "Foresight",
    description: "Reimagining the post-purchase experience by introducing enhanced self-serve and automation capabilities by reducing reliance on support teams and improving overall efficiency and satisfaction through a seamless self serve experience",
    year: "2021",
    image: "/project-amazon-orders.png",
    bgColor: "bg-blue-100",
    span: "col-span-1 md:col-span-1 row-span-1",
  },
  {
    id: 3,
    title: "Improve Trust in Marketplace Apps",
    description: "Privacy and Security details on Marketplace app listings page to highlight the security postures of cloud apps, improving transparency and helping users make informed, trust-based decisions.",
    year: "2023",
    image: "/project-iot-platform.png",
    bgColor: "bg-emerald-100",
    span: "col-span-1 row-span-1",
  },
  {
    id: 4,
    title: "Monetization Pathways for Marketplace Partners",
    description: "A new monetization strategy for Marketplace partners to package their apps. These plans offer flexible pricing options, enabling partners to tailor offerings to different customer needs, driving revenue growth and enhancing customer acquisition.",
    year: "2022",
    image: "/project-defense-system.png",
    bgColor: "bg-rose-100",
    span: "col-span-1 row-span-1",
  },
  {
    id: 5,
    title: "Design Systems & Component Library",
    description: "Built modular UI framework reducing development cycles by 40%. Standardized design patterns across enterprise applications and platforms.",
    year: "2023",
    image: "/project-design-system.png",
    bgColor: "bg-purple-100",
    span: "col-span-1 md:col-span-1 row-span-1",
  },
];

export default function RecentWorkSection() {
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
            // Create bento grid pattern: 1st and 3rd wider, 2nd and 4th span 1, 5th wider
            let gridClass = "col-span-1";
            if (index === 1) gridClass = "col-span-1 md:col-span-2 md:row-span-1 auto-rows-[400px]";
            if (index === 4) gridClass = "col-span-1 md:col-span-2 auto-rows-[400px]";

            return (
              <a
                key={project.id}
                href={`/work/${project.id}`}
                className={`group block rounded-lg overflow-hidden ${gridClass}`}
              >
                <div className="relative h-full">
                  {/* Image with overlay */}
                  <div className={`relative h-full rounded-lg overflow-hidden ${project.bgColor} group-hover:shadow-lg transition-shadow duration-300`}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Overlay content */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex flex-col justify-end p-6">
                      <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:opacity-100 opacity-100 transition-opacity">
                        {project.title}
                      </h3>
                      
                      <p className="text-sm text-white/90 leading-relaxed mb-4 line-clamp-3">
                        {project.description}
                      </p>

                      <div className="flex items-center gap-2">
                        <span className="text-xs uppercase tracking-widest font-semibold text-white group-hover:opacity-100 opacity-90 transition-opacity">
                          View Work
                        </span>
                        <ArrowUpRight 
                          size={16} 
                          className="text-white group-hover:opacity-100 opacity-90 transition-opacity"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
