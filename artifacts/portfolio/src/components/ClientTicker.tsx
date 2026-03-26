import React, { useState } from "react";
import { 
  Banknote, Headphones, Zap, Brain, Settings2, ShoppingCart, Lock, TrendingUp,
  Shield
} from "lucide-react";

const INDUSTRIES = [
  { id: 1, label: "Finance", icon: Banknote, colSpan: 2, rowSpan: 2 },
  { id: 2, label: "Customer Service", icon: Headphones, colSpan: 1, rowSpan: 1 },
  { id: 3, label: "IoT Platforms", icon: Zap, colSpan: 1, rowSpan: 2 },
  { id: 4, label: "AI Agents", icon: Brain, colSpan: 1, rowSpan: 1 },
  { id: 5, label: "Design Systems", icon: Settings2, colSpan: 2, rowSpan: 1 },
  { id: 6, label: "Marketplace", icon: ShoppingCart, colSpan: 1, rowSpan: 1 },
  { id: 7, label: "Defence", icon: Shield, colSpan: 1, rowSpan: 1 },
  { id: 8, label: "Monetization", icon: TrendingUp, colSpan: 1, rowSpan: 1 },
  { id: 9, label: "Trust & Security", icon: Lock, colSpan: 2, rowSpan: 2 },
];

export default function ClientTicker() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="clients" className="py-24 md:py-32 px-6 md:px-24 bg-secondary/30">
      <div className="flex flex-col md:flex-row gap-12 md:gap-24">
        <div className="w-full md:w-1/3">
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground md:sticky md:top-32"
            style={{ fontFamily: "'Wotfard', sans-serif" }}
          >
            I've designed for
          </h2>
        </div>

        <div className="w-full md:w-2/3">
          <div className="grid grid-cols-4 gap-3 auto-rows-[110px]">
            {INDUSTRIES.map((item) => {
              const IconComponent = item.icon;
              const isHovered = hovered === item.id;
              const colSpanClass = item.colSpan === 2 ? "col-span-2" : "col-span-1";
              const rowSpanClass = item.rowSpan === 2 ? "row-span-2" : "row-span-1";
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setHovered(item.id)}
                  onMouseLeave={() => setHovered(null)}
                  className={`${colSpanClass} ${rowSpanClass} flex flex-col items-center justify-center gap-2 px-4 py-3 rounded-xl text-center text-xs font-medium transition-all duration-200 border cursor-default ${
                    isHovered
                      ? "bg-foreground text-background border-foreground scale-105"
                      : "bg-background border-border/40 text-foreground hover:border-border/80"
                  }`}
                >
                  <IconComponent 
                    size={item.rowSpan === 2 ? 24 : 20} 
                    className="flex-shrink-0"
                  />
                  <span className="line-clamp-2">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
