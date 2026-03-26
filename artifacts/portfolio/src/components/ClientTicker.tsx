import React, { useState } from "react";
import { 
  Banknote, Headphones, Zap, Brain, Settings2, ShoppingCart, Lock, TrendingUp,
  Shield
} from "lucide-react";

const ITEMS = [
  { id: 1, label: "AI Agents", icon: Brain, description: "Exploring intelligent agent interfaces" },
  { id: 2, label: "Monetization", icon: TrendingUp, description: "Building pricing and revenue models" },
  { id: 3, label: "Trust & Security", icon: Lock, description: "Fortifying security across platforms" },
  { id: 4, label: "Marketplace", icon: ShoppingCart, description: "Enhancing digital commerce for SaaS" },
  { id: 5, label: "Customer Service", icon: Headphones, description: "Empowering support experiences" },
  { id: 6, label: "IoT Platforms", icon: Zap, description: "Crafting IoT solutions for connectivity" },
  { id: 7, label: "Defence", icon: Shield, description: "Ensuring robust defensetech" },
  { id: 8, label: "Finance", icon: Banknote, description: "Optimizing financial workflows" },
  { id: 9, label: "Design Systems", icon: Settings2, description: "Creating scalable design architecture" },
];

export default function ClientTicker() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="clients" className="py-24 md:py-32 px-6 md:px-24" style={{ background: "#FAF8F5" }}>
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {ITEMS.map((item) => {
              const IconComponent = item.icon;
              const isHovered = hovered === item.id;
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setHovered(item.id)}
                  onMouseLeave={() => setHovered(null)}
                  className={`relative flex flex-col gap-3 px-4 py-4 md:px-6 md:py-6 rounded-xl transition-all duration-200 border cursor-default ${
                    isHovered
                      ? "bg-foreground border-foreground"
                      : "bg-background border-border/40 hover:border-border/80"
                  }`}
                >
                  <div className="flex items-start gap-2 md:gap-3">
                    <IconComponent 
                      size={20} 
                      className={`flex-shrink-0 mt-0.5 ${isHovered ? "text-background" : "text-foreground"}`}
                    />
                    <h4 className={`text-sm md:text-base font-semibold ${isHovered ? "text-background" : "text-foreground"}`}>
                      {item.label}
                    </h4>
                  </div>
                  {isHovered && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-foreground text-background text-xs rounded-lg whitespace-nowrap shadow-lg z-50">
                      {item.description}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-foreground" />
                    </div>
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
