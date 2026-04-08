import { useEffect, useRef } from "react";

const SPOTLIGHT_RADIUS = 160;

export default function CursorEffects() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const raf = useRef<number | null>(null);
  const inHero = useRef(false);
  const cursorVisible = useRef(false);

  useEffect(() => {
    const isTouchDevice =
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window;
    if (isTouchDevice) return;

    const styleId = "cursor-none-global";
    let style: HTMLStyleElement | null = null;
    if (!document.getElementById(styleId)) {
      style = document.createElement("style");
      style.id = styleId;
      style.textContent = "*, *::before, *::after { cursor: none !important; }";
      document.head.appendChild(style);
    }

    const showCursor = () => {
      if (!cursorVisible.current && cursorRef.current) {
        cursorVisible.current = true;
        cursorRef.current.style.opacity = "1";
      }
    };

    const hideCursor = () => {
      if (cursorVisible.current && cursorRef.current) {
        cursorVisible.current = false;
        cursorRef.current.style.opacity = "0";
      }
    };

    const showDots = (x: number, y: number) => {
      if (dotRef.current) {
        dotRef.current.style.opacity = "1";
        dotRef.current.style.maskImage = `radial-gradient(circle ${SPOTLIGHT_RADIUS}px at ${x}px ${y}px, black 30%, transparent 100%)`;
        dotRef.current.style.webkitMaskImage = `radial-gradient(circle ${SPOTLIGHT_RADIUS}px at ${x}px ${y}px, black 30%, transparent 100%)`;
      }
    };

    const hideDots = () => {
      if (dotRef.current) {
        dotRef.current.style.opacity = "0";
      }
    };

    const onMove = (e: MouseEvent) => {
      showCursor();

      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        }
        if (inHero.current) {
          const target = document.elementFromPoint(e.clientX, e.clientY);
          const overNoDots = target?.closest("[data-no-dots]") !== null;
          if (overNoDots) {
            hideDots();
          } else {
            showDots(e.clientX, e.clientY);
          }
        }
      });
    };

    const onLeaveViewport = () => {
      hideCursor();
      hideDots();
    };

    const onHeroEnter = () => {
      inHero.current = true;
    };

    const onHeroLeave = () => {
      inHero.current = false;
      hideDots();
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeaveViewport);

    const HERO_IDS = ["hero", "section-hero"];

    const attachHero = (id: string) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("mouseenter", onHeroEnter);
        el.addEventListener("mouseleave", onHeroLeave);
      }
    };

    const waitForHero = () => {
      const found = HERO_IDS.some(id => document.getElementById(id));
      if (found) {
        HERO_IDS.forEach(attachHero);
      } else {
        requestAnimationFrame(waitForHero);
      }
    };
    waitForHero();

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeaveViewport);
      HERO_IDS.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          el.removeEventListener("mouseenter", onHeroEnter);
          el.removeEventListener("mouseleave", onHeroLeave);
        }
      });
      if (style && document.head.contains(style)) {
        document.head.removeChild(style);
      }
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 9998,
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.22) 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
          opacity: 0,
          transition: "opacity 0.3s ease",
          mixBlendMode: "multiply",
        }}
        aria-hidden="true"
      />

      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 99999,
          willChange: "transform",
          opacity: 0,
          transition: "opacity 0.15s ease",
        }}
        aria-hidden="true"
      >
        <img
          src={`${import.meta.env.BASE_URL}cursor.png`}
          alt=""
          width={16}
          height={16}
          style={{ display: "block", pointerEvents: "none", userSelect: "none" }}
        />
      </div>
    </>
  );
}
