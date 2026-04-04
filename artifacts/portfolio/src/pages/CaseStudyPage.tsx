import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";

// ... existing code ...

                  <div className="flex flex-col gap-2">
                    <h3 className="max-w-[8ch] text-2xl md:text-3xl font-bold leading-tight" style={{ color: "#1a1a1a", fontFamily: "'Wotfard', sans-serif" }}>{t.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(26,26,26,0.55)", fontFamily: "'Wotfard', sans-serif" }}>{t.description}</p>
                </div>
              </div>
            </SnapReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
