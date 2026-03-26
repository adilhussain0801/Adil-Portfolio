import React, { useState } from "react";
import { 
  Banknote, Headphones, Zap, Brain, Settings2, ShoppingCart, Lock, TrendingUp,
  Shield
} from "lucide-react";

const INDUSTRIES = [
  { id: 1, label: "Finance", icon: Banknote },
  { id: 2, label: "Customer Service", icon: Headphones },
  { id: 3, label: "IoT Platforms", icon: Zap },
  { id: 4, label: "AI Agents", icon: Brain },
  { id: 5, label: "Design Systems", icon: Settings2 },
  { id: 6, label: "Marketplace", icon: ShoppingCart },
  { id: 7, label: "Defence", icon: Shield },
  { id: 8, label: "Monetization", icon: TrendingUp },
  { id: 9, label: "Trust & Security", icon: Lock },
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {INDUSTRIES.map((item) => {
              const IconComponent = item.icon;
              const isHovered = hovered === item.id;
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setHovered(item.id)}
                  onMouseLeave={() => setHovered(null)}
                  className={`flex items-center gap-4 px-6 py-4 rounded-full text-sm font-medium transition-all duration-200 border cursor-default ${
                    isHovered
                      ? "bg-foreground text-background border-foreground"
                      : "bg-background border-border/40 text-foreground hover:border-border/80"
                  }`}
                >
                  <IconComponent 
                    size={22} 
                    className="flex-shrink-0"
                  />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
