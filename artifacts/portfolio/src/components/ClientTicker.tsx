const CLIENTS = [
  "Atlassian",
  "Amazon",
  "Shell",
  "Petronas",
  "Suncor",
  "DP World",
  "Accenture",
  "Armed Forces",
  "Statoil Fuel & Retail",
  "Absa Bank",
];

export default function ClientTicker() {
  return (
    <section id="clients" className="py-24 md:py-32 px-6 md:px-12 bg-secondary/30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24">
        <div className="w-full md:w-1/3">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground sticky top-32" style={{ fontFamily: "'Wotfard', sans-serif" }}>
            I've designed for
          </h2>
        </div>

        <div className="w-full md:w-2/3">
          <div className="flex flex-wrap gap-3 md:gap-4">
            {CLIENTS.map((client, index) => (
              <div 
                key={index}
                className="px-5 py-3 rounded-full border border-border/60 bg-background text-foreground/80 font-sans text-sm md:text-base hover:border-foreground/30 hover:bg-foreground hover:text-background transition-all duration-300 cursor-default shadow-sm shadow-black/5"
              >
                {client}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
