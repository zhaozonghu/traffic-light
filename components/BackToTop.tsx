"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** 圆环参数：半径与周长（viewBox 48x48，描边 3） */
const R = 21;
const CIRCUMFERENCE = 2 * Math.PI * R;

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const update = () => {
      ticking.current = false;
      const scrollTop = window.scrollY;
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(scrollTop / max, 1) : 0);
      setVisible(scrollTop > 300);
    };
    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="返回顶部"
      title="返回顶部"
      className={`fixed bottom-8 right-6 z-50 h-12 w-12 cursor-pointer rounded-full border border-tl-border bg-tl-surface/80 text-tl-fg/70 shadow-lg backdrop-blur-md transition-all duration-300 hover:text-tl-fg sm:right-8 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      {/* 滚动进度圆环（边框） */}
      <svg
        className="absolute inset-0 h-full w-full -rotate-90"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="24"
          cy="24"
          r={R}
          stroke="currentColor"
          strokeOpacity="0.15"
          strokeWidth="3"
        />
        <circle
          cx="24"
          cy="24"
          r={R}
          className="stroke-tl-green"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
        />
      </svg>
      {/* 向上箭头 */}
      <svg
        className="relative mx-auto h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-6 6m6-6l6 6" />
      </svg>
    </button>
  );
}
