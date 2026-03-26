const ROW_ONE = [
  { id: 1, color: "#D4C5F9", w: "w-48", h: "h-56" },
  { id: 2, color: "#B8D8C8", w: "w-64", h: "h-56" },
  { id: 3, color: "#F9C5C5", w: "w-80", h: "h-56" },
  { id: 4, color: "#FAD9A1", w: "w-52", h: "h-56" },
  { id: 5, color: "#C8D8F0", w: "w-44", h: "h-56" },
  { id: 6, color: "#D9F0C8", w: "w-72", h: "h-56" },
  { id: 7, color: "#F0C8D9", w: "w-56", h: "h-56" },
  { id: 8, color: "#C8F0EE", w: "w-60", h: "h-56" },
];

const ROW_TWO = [
  { id: 9,  color: "#FAD9A1", w: "w-56", h: "h-56" },
  { id: 10, color: "#C8D8F0", w: "w-44", h: "h-56" },
  { id: 11, color: "#D4C5F9", w: "w-72", h: "h-56" },
  { id: 12, color: "#D9F0C8", w: "w-64", h: "h-56" },
  { id: 13, color: "#F9C5C5", w: "w-48", h: "h-56" },
  { id: 14, color: "#C8F0EE", w: "w-80", h: "h-56" },
  { id: 15, color: "#B8D8C8", w: "w-52", h: "h-56" },
  { id: 16, color: "#F0C8D9", w: "w-60", h: "h-56" },
];

function TickerRow({ items, reverse }: { items: typeof ROW_ONE; reverse?: boolean }) {
  const duplicated = [...items, ...items];

  return (
    <div className="overflow-hidden w-full">
      <div
        className={`flex gap-3 w-max ${reverse ? "animate-ticker-reverse" : "animate-ticker"}`}
      >
        {duplicated.map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            className={`${item.w} ${item.h} rounded-xl flex-shrink-0`}
            style={{ backgroundColor: item.color }}
          />
        ))}
      </div>
    </div>
  );
}

export default function LifeSection() {
  return (
    <section id="life" className="py-24 md:py-32 px-6 md:px-24 overflow-hidden">
      <div className="flex flex-col md:flex-row gap-12 md:gap-24">
        {/* Left: Heading */}
        <div className="md:w-1/3 flex-shrink-0">
          <h2
            style={{ fontFamily: "'Wotfard', sans-serif", fontWeight: 700 }}
            className="text-3xl md:text-4xl text-foreground md:sticky md:top-32"
          >
            Life outside the box
          </h2>
        </div>

        {/* Right: Ticker */}
        <div className="md:w-2/3 flex flex-col gap-6">
          <div 
            className="flex flex-col gap-3 overflow-hidden"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            }}
          >
            <TickerRow items={ROW_ONE} />
            <TickerRow items={ROW_TWO} reverse />
          </div>
        </div>
      </div>
    </section>
  );
}
