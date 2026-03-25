export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-40 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        
        <div className="lg:col-span-4">
          <h2 className="text-4xl md:text-6xl font-serif text-foreground">About</h2>
        </div>
        
        <div className="lg:col-span-8 space-y-16">
          {/* Bio */}
          <div className="prose prose-lg md:prose-xl max-w-none text-foreground/80 font-light font-sans leading-relaxed">
            <p className="first-letter:text-5xl first-letter:font-serif first-letter:mr-1 first-letter:float-left first-letter:text-foreground">
              I'm a product designer with 13+ years of experience building at the intersection of AI, SaaS, and enterprise. 
              I've led design for Jira's AI-native experiences at Atlassian, shaped post-purchase journeys at Amazon, 
              and created interfaces for defense-grade systems. I care deeply about agentic systems, trust in AI, 
              and design that works at scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-border">
            {/* Education */}
            <div>
              <h3 className="text-xs font-sans uppercase tracking-widest text-muted-foreground mb-6">Education</h3>
              <ul className="space-y-6">
                <li>
                  <h4 className="font-serif text-xl text-foreground">Certified Usability Analyst</h4>
                  <p className="text-sm font-sans text-muted-foreground mt-1">Human Factors International (HFI) · 2016</p>
                </li>
                <li>
                  <h4 className="font-serif text-xl text-foreground">B.E. Chemical Engineering</h4>
                  <p className="text-sm font-sans text-muted-foreground mt-1">Mumbai University · 2012</p>
                </li>
              </ul>
            </div>

            {/* Awards */}
            <div>
              <h3 className="text-xs font-sans uppercase tracking-widest text-muted-foreground mb-6">Recognition</h3>
              <ul className="space-y-6">
                <li>
                  <h4 className="font-serif text-xl text-foreground">Door Desk Award</h4>
                  <p className="text-sm font-sans text-muted-foreground mt-1">Amazon · 2019</p>
                </li>
                <li>
                  <h4 className="font-serif text-xl text-foreground">Design X Award</h4>
                  <p className="text-sm font-sans text-muted-foreground mt-1">UX India · 2018</p>
                </li>
                <li>
                  <h4 className="font-serif text-xl text-foreground">UX Innovator</h4>
                  <p className="text-sm font-sans text-muted-foreground mt-1">Xoriant · 2016</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
