import { useState } from "react";
import { ChevronDown } from "lucide-react";

const EXPERIENCES = [
  {
    company: "Atlassian",
    role: "Senior Product Designer",
    period: "Aug 2021 – Present",
    logo: "https://logo.clearbit.com/atlassian.com",
    icon: "/icon-atlassian.png",
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
    logo: "https://logo.clearbit.com/amazon.com",
    icon: "/icon-amazon.png",
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
    logo: "https://logo.clearbit.com/xoriant.com",
    icon: "/icon-xoriant.png",
    achievements: [
      "Led design of comprehensive IoT platform for oil & gas operations, focusing on workflow management and incident tracking",
      "Designed predictive systems for equipment downtime and translated complex operational data into actionable insights"
    ]
  },
  {
    company: "Rolta Defence",
    role: "Product Designer",
    period: "Feb 2015 – Aug 2016",
    logo: null,
    icon: "/icon-rolta.png",
    achievements: [
      "Designed mission-critical battlefield management interfaces for the Indian Army",
      "Built real-time visualization systems for complex tactical sources and terrain data"
    ]
  }
];

function ExperienceRow({ company, role, period, logo, icon, achievements }: typeof EXPERIENCES[0]) {
  const [isExpanded, setIsExpanded] = useState(false);
  const year = period.split(" ").pop();
  
  return (
    <>
      <div 
        className="flex items-center gap-6 py-6 border-b border-border last:border-b-0 group cursor-pointer hover:bg-muted/50 px-4 -mx-4 transition-colors duration-200"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-lg overflow-hidden">
          <img src={icon} alt={company} className="h-full w-full object-cover" />
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-base font-bold text-foreground">{company}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
        
        <div className="text-base font-bold text-foreground flex-shrink-0 min-w-max">
          {year}
        </div>

        <ChevronDown 
          size={20} 
          className={`flex-shrink-0 text-muted-foreground transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
        />
      </div>

      {isExpanded && (
        <div className="bg-muted/30 border-b border-border px-4 py-6 pl-16">
          <ul className="space-y-3">
            {achievements.map((achievement, idx) => (
              <li key={idx} className="flex gap-3 text-sm text-foreground/80">
                <span className="text-muted-foreground flex-shrink-0 pt-1">•</span>
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default function WorkSection() {
  return (
    <section id="work" className="py-24 md:py-40 px-6 md:px-12 max-w-7xl mx-auto">
      <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-12">
        Experience
      </p>

      <div className="space-y-0 border-t border-border">
        {EXPERIENCES.map((exp, index) => (
          <ExperienceRow 
            key={index}
            company={exp.company}
            role={exp.role}
            period={exp.period}
            logo={exp.logo}
            icon={exp.icon}
            achievements={exp.achievements}
          />
        ))}
      </div>
    </section>
  );
}
