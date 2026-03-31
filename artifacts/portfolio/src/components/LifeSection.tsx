type TickerItem = {
  id: number;
  src: string;
  alt: string;
  w: string;
};

const ROW_ONE: TickerItem[] = [
  { id: 1,  src: "/life/img_2322.jpg",       alt: "Life photo", w: "w-40" },
  { id: 2,  src: "/life/img_2166.jpg",       alt: "Life photo", w: "w-48" },
  { id: 3,  src: "/life/img_5596.jpg",       alt: "Life photo", w: "w-52" },
  { id: 4,  src: "/life/img_2716.jpg",       alt: "Life photo", w: "w-40" },
  { id: 5,  src: "/life/img_7888.jpg",       alt: "Life photo", w: "w-48" },
  { id: 6,  src: "/life/img_6908.jpg",       alt: "Life photo", w: "w-48" },
  { id: 7,  src: "/life/img_2918.jpg",       alt: "Life photo", w: "w-40" },
  { id: 8,  src: "/life/img_2258.jpg",       alt: "Life photo", w: "w-64" },
  { id: 9,  src: "/life/img_5307.jpg",       alt: "Life photo", w: "w-36" },
  { id: 10, src: "/life/img_2310.jpg",       alt: "Life photo", w: "w-48" },
  { id: 11, src: "/life/fullsizerender.jpg", alt: "Life photo", w: "w-60" },
  { id: 12, src: "/life/img_2888.jpg",       alt: "Life photo", w: "w-52" },
  { id: 13, src: "/life/img_6794.jpg",       alt: "Life photo", w: "w-64" },
  { id: 14, src: "/life/img_5839.jpg",       alt: "Life photo", w: "w-40" },
  { id: 16, src: "/life/img_0450.jpg",       alt: "Life photo", w: "w-44" },
  { id: 17, src: "/life/img_6912.jpg",       alt: "Life photo", w: "w-40" },
  { id: 18, src: "/life/img_3934.jpg",       alt: "Life photo", w: "w-48" },
  { id: 19, src: "/life/img_7329.jpg",       alt: "Life photo", w: "w-36" },
  { id: 20, src: "/life/img_7499.jpg",       alt: "Life photo", w: "w-48" },
];

const ROW_TWO: TickerItem[] = [
  { id: 21, src: "/life/img_2324.jpg",   alt: "Life photo", w: "w-40" },
  { id: 22, src: "/life/img_2307.jpg",   alt: "Life photo", w: "w-48" },
  { id: 23, src: "/life/img_2578.jpg",   alt: "Life photo", w: "w-40" },
  { id: 24, src: "/life/img_5596_2.jpg", alt: "Life photo", w: "w-64" },
  { id: 25, src: "/life/img_7889.jpg",   alt: "Life photo", w: "w-64" },
  { id: 26, src: "/life/img_2558.jpg",   alt: "Life photo", w: "w-36" },
  { id: 27, src: "/life/img_6967.jpg",   alt: "Life photo", w: "w-48" },
  { id: 28, src: "/life/img_2593.jpg",   alt: "Life photo", w: "w-80" },
  { id: 29, src: "/life/img_1823.jpg",   alt: "Life photo", w: "w-40" },
  { id: 30, src: "/life/img_5441.jpg",   alt: "Life photo", w: "w-40" },
  { id: 31, src: "/life/img_1015.jpg",   alt: "Life photo", w: "w-64" },
  { id: 32, src: "/life/img_7138.jpg",   alt: "Life photo", w: "w-64" },
  { id: 33, src: "/life/img_6563.jpg",   alt: "Life photo", w: "w-40" },
  { id: 34, src: "/life/img_3936.jpg",   alt: "Life photo", w: "w-48" },
  { id: 35, src: "/life/img_6589.jpg",   alt: "Life photo", w: "w-36" },
  { id: 36, src: "/life/img_1873.jpg",   alt: "Life photo", w: "w-40" },
  { id: 37, src: "/life/img_7506.jpg",   alt: "Life photo", w: "w-44" },
];

function TickerRow({ items, reverse }: { items: TickerItem[]; reverse?: boolean }) {
  const duplicated = [...items, ...items];

  return (
    <div className="ticker-container overflow-hidden w-full">
      <div
        className={`flex gap-3 w-max ${reverse ? "animate-ticker-reverse" : "animate-ticker"}`}
      >
        {duplicated.map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            className={`${item.w} h-56 rounded-xl flex-shrink-0 overflow-hidden`}
          >
            <img
              src={item.src}
              alt={item.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LifeSection() {
  return (
    <section id="life" className="py-24 md:py-32 px-6 md:px-24 overflow-hidden" style={{ background: "#FAF8F5" }}>
      <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
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
        <div className="md:w-2/3 flex flex-col gap-3">
          <div className="ticker-mask flex flex-col gap-3 overflow-hidden">
            <TickerRow items={ROW_ONE} />
            <TickerRow items={ROW_TWO} reverse />
          </div>
        </div>
      </div>
    </section>
  );
}
