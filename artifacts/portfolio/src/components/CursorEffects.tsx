import { useEffect, useRef, useState } from "react";

export default function CursorEffects() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [dotVisible, setDotVisible] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const isTouchDevice =
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window;
    if (isTouchDevice) return;

    document.documentElement.style.cursor = "none";
    document.documentElement.style.setProperty("--cursor-none", "none");

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
      if (!dotVisible) setDotVisible(true);

      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
        }
      });
    };

    const onLeave = () => {
      setDotVisible(false);
      setVisible(false);
    };

    const onEnter = () => {
      setDotVisible(true);
      setVisible(true);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.documentElement.style.cursor = "";
      document.documentElement.style.removeProperty("--cursor-none");
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  useEffect(() => {
    const styleId = "cursor-none-global";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        *, *::before, *::after { cursor: none !important; }
      `;
      document.head.appendChild(style);
      return () => {
        document.head.removeChild(style);
      };
    }
  }, []);

  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 9998,
          backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.18) 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
          opacity: dotVisible ? 1 : 0,
          transition: "opacity 0.5s ease",
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
          opacity: visible ? 1 : 0,
          transition: "opacity 0.15s ease",
        }}
        aria-hidden="true"
      >
        <svg
          width="22"
          height="27"
          viewBox="0 0 22 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block", marginLeft: -1, marginTop: -1 }}
        >
          <path
            d="M1 1L1 22L6.5 16.5L10.5 26L13.5 24.5L9.5 14.5H17.5L1 1Z"
            fill="#F5A623"
            stroke="#1a1a1a"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </>
  );
}
