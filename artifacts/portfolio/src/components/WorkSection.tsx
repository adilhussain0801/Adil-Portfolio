import ExperienceCard from "./ExperienceCard";

const EXPERIENCES = [
  {
    company: "Atlassian",
    role: "Senior Product Designer",
    period: "Aug 2021 – Present",
    achievements: [
      "Designed agentic AI workflows for Jira Service Management, reducing MTTRs by 80–90%",
      "Defined interaction patterns for AI-assisted vs autonomous behavior across the platform",
      "Led App Editions platform (usage-based pricing), driving 23% partner satisfaction increase and 12% revenue uplift",
      "Delivered Marketplace initiatives: privacy & security tabs, FedRAMP, and seamless partner publishing journeys"
    ]
  },
  {
    company: "Amazon",
    role: "Product Designer",
    period: "Feb 2019 – Jul 2021",
    achievements: [
      "Owned post-purchase design strategy for Amazon India: Contact Us, Your Orders, Message Us",
      "Reduced support dependency by significantly increasing self-serve flow adoption",
      "Partnered with data science and customer service teams for experience improvement based on predictive modeling"
    ]
  },
  {
    company: "Xoriant",
    role: "Senior Product Designer",
    period: "Sep 2016 – Feb 2019",
    achievements: [
      "Led design of comprehensive IoT platform for oil & gas operations, focusing on workflow management and incident tracking",
      "Designed predictive systems for equipment downtime and translated complex operational data into actionable insights"
    ]
  },
  {
    company: "Rolta Defence",
    role: "Product Designer",
    period: "Feb 2015 – Aug 2016",
    achievements: [
      "Designed mission-critical battlefield management interfaces for the Indian Army",
      "Built real-time visualization systems for complex tactical sources and terrain data"
    ]
  }
];

export default function WorkSection() {
  return (
    <section id="work" className="py-24 md:py-40 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <h2 className="text-4xl md:text-6xl font-serif text-foreground">Selected Work</h2>
        <p className="text-muted-foreground font-sans max-w-xs text-sm uppercase tracking-widest">
          A decade of shaping products at scale
        </p>
      </div>

      <div className="border-t border-border">
        {EXPERIENCES.map((exp, index) => (
          <ExperienceCard 
            key={index}
            id={`0${index + 1}`}
            company={exp.company}
            role={exp.role}
            period={exp.period}
            achievements={exp.achievements}
          />
        ))}
      </div>
    </section>
  );
}
