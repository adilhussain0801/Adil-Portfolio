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
            className="text-[56px] md:text-[68px] leading-tight text-foreground"
          >
            About me
          </h2>

          <div className="flex flex-col gap-6">
            <p
              style={{ fontFamily: "'Wotfard', sans-serif" }}
              className="text-[20px] md:text-[24px] leading-[1.6] text-foreground"
            >
              I'm Adil Hussain, a product designer with over 13 years of
              experience, based in Mumbai, India. I'm passionate about solving
              problems through design, always advocating for the end user, and
              collaborating with different crafts to create intuitive, impactful
              solutions.
            </p>
            <p
              style={{ fontFamily: "'Wotfard', sans-serif" }}
              className="text-[20px] md:text-[24px] leading-[1.6] text-foreground"
            >
              In my free time, you'll find me exploring new travel destinations,
              capturing moments through photography, painting or nurturing my
              home garden and creating terrariums and vivariums. These hobbies
              inspire me and fuel my creativity in design.
            </p>
          </div>
        </div>

        {/* Right: Photo collage */}
        <div className="flex gap-6 items-center shrink-0">
          {/* Large portrait photo */}
          <div
            className="relative rounded-[40px] overflow-hidden shrink-0"
            style={{ width: 280, height: 560 }}
          >
            <img
              src="/about-photo-1.jpg"
              alt="Adil Hussain"
              className="absolute w-full h-full object-cover object-center"
            />
          </div>

          {/* Two stacked photos */}
          <div className="flex flex-col gap-5 shrink-0" style={{ width: 210 }}>
            <div
              className="relative rounded-[40px] overflow-hidden"
              style={{ height: 270 }}
            >
              <img
                src="/about-photo-2.jpg"
                alt="Adil — travel"
                className="absolute w-full h-full object-cover object-center"
              />
            </div>
            <div
              className="relative rounded-[40px] overflow-hidden"
              style={{ height: 270 }}
            >
              <img
                src="/about-photo-3.jpg"
                alt="Adil — hobby"
                className="absolute w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
