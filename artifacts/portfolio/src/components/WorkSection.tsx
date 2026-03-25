import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const EXPERIENCES = [
  {
    company: "Atlassian",
    role: "Senior Product Designer",
    period: "Aug 2021 – Present",
    logo: "https://logo.clearbit.com/atlassian.com",
    icon: "/icon-atlassian.png",
    achievements: [
      "Led the design strategy for agentic AI workflows in Jira Service Management, architecting multi-state interaction models that reduced mean time to resolution by 80–90%. Established design principles for AI-assisted vs autonomous behavior patterns, creating system-wide guidelines adopted across engineering teams.",
      "Spearheaded the UX overhaul for the App Editions platform, introducing usage-based pricing models. Designed intuitive consumption dashboards and clarity-focused billing interfaces that drove 23% partner satisfaction increase and 12% revenue uplift for the marketplace.",
      "Directed the design process for Marketplace expansion initiatives including privacy & security frameworks, FedRAMP compliance workflows, and seamless app publishing journeys. Collaborated cross-functionally with legal, security, and product teams to translate compliance into intuitive user experiences.",
      "Mentored 3+ junior designers on design systems thinking, accessibility standards, and customer-centric research methodologies. Established design critiques and feedback loops that elevated team quality across Jira's platform portfolio."
    ]
  },
  {
    company: "Amazon",
    role: "Product Designer",
    period: "Feb 2019 – Jul 2021",
    logo: "https://logo.clearbit.com/amazon.com",
    icon: "/icon-amazon.png",
    achievements: [
      "Owned the end-to-end post-purchase design strategy for Amazon India, redesigning critical journeys including Contact Us, Your Orders, and Message Center. Conducted extensive user research across 8 Indian cities, uncovering unique pain points in order tracking and seller communication.",
      "Reduced support ticket volume by 32% through intelligent self-serve design, implementing proactive notifications, dynamic FAQ systems, and resolution-focused ordering interfaces. Validated designs through A/B testing with 2M+ users, achieving sustained engagement improvements.",
      "Partnered closely with data science and customer service operations to embed predictive modeling into design. Created personalized order status pages that surfaced issues before customers encountered them, driving 18% increase in first-contact resolution rates.",
      "Advocated for India-specific design considerations across Amazon's global design system, influencing global pattern library updates used by 200+ designers. Published case studies on localization strategy that became reference material for regional UX teams."
    ]
  },
  {
    company: "Xoriant",
    role: "Senior Product Designer",
    period: "Sep 2016 – Feb 2019",
    logo: "https://logo.clearbit.com/xoriant.com",
    icon: "/icon-xoriant.png",
    achievements: [
      "Led the product design strategy for an enterprise IoT platform serving oil & gas operations across 15+ sites. Designed complex workflow management systems handling equipment monitoring, incident tracking, and real-time asset visibility—enabling 24/7 operations with minimal downtime.",
      "Architected predictive analytics interfaces translating ML-driven equipment downtime forecasts into actionable maintenance schedules. Designed data visualization dashboards that reduced time-to-insight from 30 minutes to <2 minutes, enabling field teams to prioritize critical interventions.",
      "Managed cross-disciplinary design team of 2 designers and 4 developers, establishing design standards for industrial UX. Created modular UI component library reducing development cycles by 40% and improving consistency across client deployments.",
      "Conducted extensive domain research with operators and maintenance crews, translating industrial workflows into intuitive digital interfaces. Trained 50+ field operators on new system, achieving 98% adoption rate despite significant workflow changes."
    ]
  },
  {
    company: "Rolta Defence",
    role: "Product Designer",
    period: "Feb 2015 – Aug 2016",
    logo: null,
    icon: "/icon-rolta.png",
    achievements: [
      "Designed mission-critical battlefield management interfaces for the Indian Army, creating intuitive controls for command-and-control operations in high-stress environments. Worked with military leadership and field commanders to ensure designs met operational doctrine while maintaining cognitive load standards.",
      "Built real-time visualization systems integrating complex tactical data sources: satellite imagery, sensor networks, and intelligence feeds. Designed layered map interfaces and data fusion dashboards enabling commanders to maintain situational awareness across 500+ km operational areas.",
      "Established human-factors research protocols for defense systems, conducting cognitive load testing and workload assessments with active military personnel. Influenced design standards adopted across Rolta Defence's portfolio, improving usability for systems serving 10,000+ users.",
      "Led design quality assurance for field deployments, identifying critical usability issues during pre-launch testing. Iterated on 47+ design changes to meet zero-error requirements, ensuring system reliability in mission-critical scenarios."
    ]
  }
];

function ExperienceRow({ company, role, period, logo, icon, achievements, isFirst }: typeof EXPERIENCES[0] & { isFirst?: boolean }) {
  const [isExpanded, setIsExpanded] = useState(isFirst ?? false);
  const extractYearRange = () => {
    const parts = period.split(" ");
    const start = parts[parts.length - 3];
    const end = parts[parts.length - 1];
    if (end === "Present") return `${start} - Present`;
    return `${start} - ${end}`;
  };
  const isActive = period.includes("Present");
  
  return (
    <>
      <motion.div 
        className={`flex items-center gap-6 py-6 ${!isExpanded ? "border-b border-border" : ""} last:border-b-0 group cursor-pointer hover:bg-muted/50 px-4 -mx-4 transition-colors duration-200`}
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
      >
        <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-lg overflow-hidden">
          <img src={icon} alt={company} className="h-full w-full object-cover" />
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-base font-bold text-foreground">{company}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
        
        <div className={`px-3 py-1.5 rounded-full text-sm font-medium flex-shrink-0 min-w-max flex items-center gap-2 ${isActive ? "bg-green-100 text-green-900" : "bg-muted text-foreground"}`}>
          {isActive && <div className="w-2 h-2 rounded-full bg-green-500" />}
          {extractYearRange()}
        </div>

        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown 
            size={20} 
            className="flex-shrink-0 text-muted-foreground"
          />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden px-4 border-b border-border"
          >
            <div className="py-6 pl-12 space-y-4">
              {achievements.map((achievement, idx) => (
                <motion.p 
                  key={idx} 
                  className="text-sm leading-relaxed text-foreground/80"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                >
                  {achievement}
                </motion.p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
            isFirst={index === 0}
          />
        ))}
      </div>
    </section>
  );
}
