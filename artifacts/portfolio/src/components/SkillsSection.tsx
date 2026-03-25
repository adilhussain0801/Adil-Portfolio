const SKILLS = [
  "Design Leadership & Strategy",
  "Systems Thinking",
  "Agentic UX",
  "Platform Design",
  "0→1 Problem Solving",
  "Cross-functional Leadership",
  "Trust & Transparency in AI",
  "User-Centered Design",
  "Vibe Coding",
  "Accessibility",
  "Design Mentorship"
];

export default function SkillsSection() {
  return (
    <section id="expertise" className="py-24 md:py-32 px-6 md:px-12 bg-secondary/30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24">
        <div className="w-full md:w-1/3">
          <h2 className="text-3xl md:text-5xl font-serif text-foreground sticky top-32">
            Expertise
          </h2>
        </div>
        
        <div className="w-full md:w-2/3">
          <div className="flex flex-wrap gap-3 md:gap-4">
            {SKILLS.map((skill, index) => (
              <div 
                key={index}
                className="px-5 py-3 rounded-full border border-border/60 bg-background text-foreground/80 font-sans text-sm md:text-base hover:border-foreground/30 hover:bg-foreground hover:text-background transition-all duration-300 cursor-default shadow-sm shadow-black/5"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
