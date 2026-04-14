import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const TESTIMONIALS = [
  {
    title: "A rare design thinker",
    quote:
      "Adil brings a rare combination of systems thinking and empathy to every problem. He doesn't just design interfaces - he shapes how entire teams think about the user. Working with him at Atlassian was a masterclass in craft.",
    name: "Priya M.",
    location: "London, UK",
    icon: "/icon-heart.png",
    iconPosition: "top-left",
    rotate: -5,
  },
  {
    title: "Truly one of a kind ✨",
    quote:
      "Adil's ability to navigate ambiguity and turn complex, agentic workflows into delightful, intuitive experiences is unmatched. He drove the Rovo design vision with clarity and conviction - and made everyone around him better.",
    name: "James T.",
    location: "Sydney, Australia",
    icon: "/icon-okhand.png",
    iconPosition: "bottom-right",
    rotate: 0,
  },
  {
    title: "All you need in a design leader",
    quote:
      "From 0→1 product thinking to shipping at scale, Adil does it all. His work on Amazon's post-purchase experience was both strategically sharp and beautifully executed. Easy to work with and deeply inspiring.",
    name: "Sarah K.",
    location: "Seattle, USA",
    icon: "/icon-star.png",
    iconPosition: "top-right",
    rotate: 5,
  },
];

function StarRating() {
  return (
    <div className="flex gap-1 text-white text-base">
      {"★★★★★".split("").map((star, i) => (
        <span key={i}>{star}</span>
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  delay,
}: {
  testimonial: (typeof TESTIMONIALS)[0];
  delay: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const iconClasses: Record<string, string> = {
    "top-left": "-top-8 -left-6",
    "top-right": "-top-8 -right-6",
    "bottom-right": "-bottom-8 -right-6",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className="relative flex-1 min-w-[260px] max-w-sm"
      style={{ transform: `rotate(${testimonial.rotate}deg)` }}
    >
      {/* Decorative icon */}
      <img
        src={testimonial.icon}
        alt=""
        aria-hidden="true"
        className={`absolute ${iconClasses[testimonial.iconPosition]} w-20 h-20 object-contain z-10 pointer-events-none select-none`}
      />

      {/* Card */}
      <div
        className="rounded-2xl p-7 flex flex-col gap-4 h-full"
        style={{
          background: "#1c1c22",
          boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
        }}
      >
        <StarRating />

        <h3
          className="text-white text-lg font-medium italic leading-snug"
          style={{ fontFamily: "'Wotfard', sans-serif" }}
        >
          {testimonial.title}
        </h3>

        <p
          className="text-sm leading-relaxed flex-1"
          style={{
            color: "rgba(255,255,255,0.7)",
            fontFamily: "'Wotfard', sans-serif",
          }}
        >
          "{testimonial.quote}"
        </p>

        <div style={{ fontFamily: "'Wotfard', sans-serif" }}>
          <p className="text-white text-sm font-medium italic">{testimonial.name}</p>
          <p className="text-sm italic" style={{ color: "rgba(255,255,255,0.45)" }}>
            {testimonial.location}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.5 });

  return (
    <section
      className="py-24 md:py-40 px-6 md:px-24 overflow-hidden"
      style={{ background: "#0e0e12" }}
    >
      {/* Section heading */}
      <motion.div
        ref={headingRef}
        initial={{ opacity: 0, y: 20 }}
        animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-20 md:mb-24"
      >
        <h2
          className="text-3xl md:text-4xl font-bold text-white"
          style={{ fontFamily: "'Wotfard', sans-serif" }}
        >
          What colleagues say
        </h2>
        <p
          className="mt-3 text-sm"
          style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Wotfard', sans-serif" }}
        >
          Kind words from people I've had the pleasure of working with.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="flex flex-col md:flex-row gap-14 md:gap-10 items-start justify-center py-10">
        {TESTIMONIALS.map((t, i) => (
          <TestimonialCard key={i} testimonial={t} delay={i * 0.15} />
        ))}
      </div>
    </section>
  );
}
