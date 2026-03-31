import React from "react";
import { 
  Banknote, Headphones, Zap, Brain, Settings2, ShoppingCart, Lock, TrendingUp,
  Shield
} from "lucide-react";

const ITEMS = [
  { id: 1, label: "AI Agents", icon: Brain },
  { id: 2, label: "Monetization", icon: TrendingUp },
  { id: 3, label: "Trust & Security", icon: Lock },
  { id: 4, label: "B2B & B2C Marketplaces", icon: ShoppingCart },
  { id: 5, label: "Customer Service", icon: Headphones },
  { id: 6, label: "IoT Platforms", icon: Zap },
  { id: 7, label: "Defence", icon: Shield },
  { id: 8, label: "Finance", icon: Banknote },
  { id: 9, label: "Design Systems", icon: Settings2 },
];

export default function ClientTicker() {

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
              return (
                <div
                  key={item.id}
                  className="flex flex-col gap-3 px-4 py-4 md:px-6 md:py-6 rounded-xl border bg-background border-border/40"
                >
                  <div className="flex items-start gap-2 md:gap-3">
                    <IconComponent 
                      size={20} 
                      className="flex-shrink-0 mt-0.5 text-foreground"
                    />
                    <h4 className="text-sm md:text-base font-semibold text-foreground">
                      {item.label}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
