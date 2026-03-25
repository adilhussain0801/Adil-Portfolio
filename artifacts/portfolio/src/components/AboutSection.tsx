export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 md:py-32 px-6 md:px-16 max-w-[1440px] mx-auto"
    >
      <div className="flex flex-wrap gap-y-16 items-center justify-between">
        {/* Left: Text content */}
        <div className="flex-1 min-w-[320px] max-w-[820px] flex flex-col gap-12">
          <h2
            style={{ fontFamily: "'Wotfard', sans-serif", fontWeight: 700 }}
            className="text-3xl md:text-4xl leading-tight text-foreground"
          >
            About me
          </h2>

          <div className="flex flex-col gap-6 mr-[36px]">
            <p
              style={{ fontFamily: "'Wotfard', sans-serif" }}
              className="text-base md:text-lg leading-relaxed text-foreground"
            >I'm a design leader with 13+ years creating experiences across product design, strategy, design systems, and AI features. I've led design at Atlassian, Amazon, and other defining organizations, working across startups, scale-ups, and enterprise to ship thoughtful, user-centered products. I'm equally comfortable leading design teams and working hands-on with components, design systems, and cross-functional delivery.</p>
            <p
              style={{ fontFamily: "'Wotfard', sans-serif" }}
              className="text-base md:text-lg leading-relaxed text-foreground"
            >
              A natural curiosity keeps me at the intersection of design and emerging technology. I'm constantly exploring how tools - particularly AI - can raise the bar for both product experience and design practice itself. Beyond work, I travel to understand diverse perspectives, capture moments through photography, and create living systems in my garden. These experiences keep me grounded and fuel my belief that the best design comes from observation, empathy, and genuine human understanding.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
