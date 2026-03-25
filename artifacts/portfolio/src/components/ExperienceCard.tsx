import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ExperienceProps {
  id: string;
  company: string;
  role: string;
  period: string;
  achievements: string[];
}

export default function ExperienceCard({ id, company, role, period, achievements }: ExperienceProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className="border-b border-border group"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div 
        className="py-8 md:py-12 cursor-pointer relative"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Hover Highlight background */}
        <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/50 transition-colors duration-500 -z-10" />
        
        <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8 relative z-10 px-4 md:px-0">
          <span className="text-xs font-mono text-muted-foreground/60 w-8">{id}</span>
          
          <h3 className="text-3xl md:text-5xl font-serif text-foreground transition-all duration-300 group-hover:italic w-full md:w-1/3">
            {company}
          </h3>
          
          <div className="flex flex-col md:flex-row md:justify-between w-full md:w-2/3 gap-2 md:gap-4">
            <span className="text-lg md:text-xl font-medium text-foreground/90">{role}</span>
            <span className="text-sm font-sans text-muted-foreground tracking-wide">{period}</span>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden px-4 md:px-0"
            >
              <div className="pt-8 pb-4 md:ml-[calc(2rem+33.333%)] md:pl-8">
                <ul className="space-y-4">
                  {achievements.map((item, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <span className="block w-1.5 h-1.5 rounded-full bg-foreground/20 mt-2 shrink-0" />
                      <p className="text-foreground/80 font-light leading-relaxed font-sans text-base">
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
