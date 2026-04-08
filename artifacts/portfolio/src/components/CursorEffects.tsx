import { useEffect, useRef } from "react";

export default function CursorEffects() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const raf = useRef<number | null>(null);
  const isVisible = useRef(false);
  const isDotsVisible = useRef(false);

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
      if (!isVisible.current && cursorRef.current) {
        isVisible.current = true;
        cursorRef.current.style.opacity = "1";
      }
    };

    const hideCursor = () => {
      if (isVisible.current && cursorRef.current) {
        isVisible.current = false;
        cursorRef.current.style.opacity = "0";
      }
    };

    const showDots = () => {
      if (!isDotsVisible.current && dotRef.current) {
        isDotsVisible.current = true;
        dotRef.current.style.opacity = "1";
      }
    };

    const hideDots = () => {
      if (isDotsVisible.current && dotRef.current) {
        isDotsVisible.current = false;
        dotRef.current.style.opacity = "0";
      }
    };

    const onMove = (e: MouseEvent) => {
      showCursor();
      showDots();

      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        }
      });
    };

    const onLeave = () => {
      hideCursor();
      hideDots();
    };

    const onEnter = () => {
      showDots();
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
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
            "radial-gradient(circle, rgba(0,0,0,0.15) 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
          opacity: 0,
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
          opacity: 0,
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
