import React, { useState } from "react";
import { 
  Banknote, Headphones, Zap, Brain, Settings2, ShoppingCart, Lock, TrendingUp,
  Shield
} from "lucide-react";

const ITEMS = [
  { id: 1, label: "AI Agents", icon: Brain, description: "Exploring intelligent agent interfaces", colSpan: 2 },
  { id: 2, label: "Monetization", icon: TrendingUp, description: "Building pricing and revenue models", colSpan: 1 },
  { id: 3, label: "Trust & Security", icon: Lock, description: "Fortifying security across platforms", colSpan: 2 },
  { id: 4, label: "Marketplace", icon: ShoppingCart, description: "Enhancing digital commerce for SaaS", colSpan: 1 },
  { id: 5, label: "Customer Service", icon: Headphones, description: "Empowering support experiences", colSpan: 2 },
  { id: 6, label: "IoT Platforms", icon: Zap, description: "Crafting IoT solutions for connectivity", colSpan: 1 },
  { id: 7, label: "Defence", icon: Shield, description: "Ensuring robust defensetech", colSpan: 1 },
  { id: 8, label: "Finance", icon: Banknote, description: "Optimizing financial workflows", colSpan: 1 },
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
          <div className="grid grid-cols-3 gap-4">
            {ITEMS.map((item) => {
              const IconComponent = item.icon;
              const isHovered = hovered === item.id;
              const colSpanClass = item.colSpan === 2 ? "col-span-2" : "col-span-1";
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setHovered(item.id)}
                  onMouseLeave={() => setHovered(null)}
                  className={`${colSpanClass} flex flex-col gap-4 px-6 py-6 rounded-xl transition-all duration-200 border cursor-default ${
                    isHovered
                      ? "bg-foreground border-foreground scale-105"
                      : "bg-background border-border/40 hover:border-border/80"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <IconComponent 
                      size={24} 
                      className={`flex-shrink-0 mt-1 ${isHovered ? "text-background" : "text-foreground"}`}
                    />
                    <h4 className={`text-base font-semibold ${isHovered ? "text-background" : "text-foreground"}`}>
                      {item.label}
                    </h4>
                  </div>
                  {isHovered && (
                    <p className="text-sm text-background">
                      {item.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
