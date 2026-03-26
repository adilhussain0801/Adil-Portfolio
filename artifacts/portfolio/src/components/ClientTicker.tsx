import React, { useState } from "react";
import { 
  Banknote, Headphones, Zap, Brain, Settings2, ShoppingCart, Lock, TrendingUp,
  Shield
} from "lucide-react";

const CATEGORIES = [
  {
    name: "Core Strengths",
    items: [
      { id: 1, label: "Design Systems", icon: Settings2, description: "Creating scalable design architecture" },
      { id: 2, label: "Marketplace", icon: ShoppingCart, description: "Enhancing digital commerce for SaaS" },
      { id: 3, label: "Monetization", icon: TrendingUp, description: "Building pricing and revenue models" },
    ]
  },
  {
    name: "Applied Domains",
    items: [
      { id: 4, label: "Finance", icon: Banknote, description: "Optimizing financial workflows" },
      { id: 5, label: "Customer Service", icon: Headphones, description: "Empowering support experiences" },
      { id: 6, label: "IoT Platforms", icon: Zap, description: "Crafting IoT solutions for connectivity" },
    ]
  },
  {
    name: "Emerging / Advanced",
    items: [
      { id: 7, label: "AI Agents", icon: Brain, description: "Exploring intelligent agent interfaces" },
      { id: 8, label: "Trust & Security", icon: Lock, description: "Fortifying security across platforms" },
      { id: 9, label: "Defence", icon: Shield, description: "Ensuring robust defensetech" },
    ]
  }
];

export default function ClientTicker() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="clients" className="py-24 md:py-32 px-6 md:px-24 bg-secondary/30">
      <div className="space-y-16">
        {CATEGORIES.map((category) => (
          <div key={category.name}>
            <h3 className="text-sm font-medium text-muted-foreground mb-6">{category.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {category.items.map((item) => {
                const IconComponent = item.icon;
                const isHovered = hovered === item.id;
                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setHovered(item.id)}
                    onMouseLeave={() => setHovered(null)}
                    className={`flex flex-col gap-4 px-6 py-6 rounded-xl transition-all duration-200 border cursor-default ${
                      isHovered
                        ? "bg-foreground text-background border-foreground scale-105"
                        : "bg-background border-border/40 text-foreground hover:border-border/80"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <IconComponent size={24} className="flex-shrink-0 mt-1" />
                      <h4 className="text-base font-semibold">{item.label}</h4>
                    </div>
                    <p className="text-sm opacity-80">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
