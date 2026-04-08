export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 md:py-32 px-6 md:px-24"
     
    >
      <div className="flex flex-col md:flex-row gap-12 md:gap-24">
        {/* Left: Heading */}
        <div className="w-full md:w-1/3">
          <h2
            style={{ fontFamily: "'Wotfard', sans-serif", fontWeight: 700 }}
            className="text-3xl md:text-4xl leading-tight text-foreground md:sticky md:top-32"
          >
            About me
          </h2>
        </div>

        {/* Right: Paragraphs */}
        <div className="flex flex-col gap-6 w-full md:w-2/3">
          <p
            style={{ fontFamily: "'Wotfard', sans-serif" }}
            className="text-base md:text-lg leading-relaxed text-foreground"
          >
            I'm a design leader with 13+ years creating experiences across product design, strategy, design systems, and AI features. I've led design at Atlassian, Amazon, and other defining organizations, working across startups, scale-ups, and enterprise to ship thoughtful, user-centered products. I'm equally comfortable leading design teams and working hands-on with components, design systems, and cross-functional delivery.
          </p>
          <p
            style={{ fontFamily: "'Wotfard', sans-serif" }}
            className="text-base md:text-lg leading-relaxed text-foreground"
          >
            A natural curiosity keeps me at the intersection of design and emerging technology. I'm constantly exploring how tools - particularly AI - can raise the bar for both product experience and design practice itself. Beyond work, I travel to understand diverse perspectives, capture moments through photography, and create living systems in my garden. These experiences keep me grounded and fuel my belief that the best design comes from observation, empathy, and genuine human understanding.
          </p>
        </div>
      </div>
    </section>
  );
}
