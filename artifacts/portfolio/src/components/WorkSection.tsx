const EXPERIENCES = [
  {
    company: "Atlassian",
    role: "Senior Product Designer",
    period: "Aug 2021 – Present",
    logo: "https://logo.clearbit.com/atlassian.com"
  },
  {
    company: "Amazon",
    role: "Product Designer",
    period: "Feb 2019 – Jul 2021",
    logo: "https://logo.clearbit.com/amazon.com"
  },
  {
    company: "Xoriant",
    role: "Senior Product Designer",
    period: "Sep 2016 – Feb 2019",
    logo: "https://logo.clearbit.com/xoriant.com"
  },
  {
    company: "Rolta Defence",
    role: "Product Designer",
    period: "Feb 2015 – Aug 2016",
    logo: null
  }
];

function ExperienceRow({ company, role, period, logo }: typeof EXPERIENCES[0]) {
  const year = period.split(" ").pop();
  
  return (
    <div className="flex items-center gap-8 py-6 border-b border-border last:border-b-0 group">
      <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center">
        {logo ? (
          <img
            src={logo}
            alt={company}
            className="h-8 w-8 object-contain grayscale opacity-70 group-hover:opacity-100 transition-opacity duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div className="h-8 w-8 rounded bg-gradient-to-br from-slate-300 to-slate-400 opacity-50" />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-base font-bold text-foreground">{company}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
      
      <div className="text-base font-bold text-foreground flex-shrink-0 min-w-max">
        {year}
      </div>
    </div>
  );
}

export default function WorkSection() {
  return (
    <section id="work" className="py-24 md:py-40 px-6 md:px-12 max-w-7xl mx-auto">
      <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-12">
        Experience
      </p>

      <div>
        {EXPERIENCES.map((exp, index) => (
          <ExperienceRow 
            key={index}
            company={exp.company}
            role={exp.role}
            period={exp.period}
            logo={exp.logo}
          />
        ))}
      </div>
    </section>
  );
}
