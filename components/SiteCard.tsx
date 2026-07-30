"use client";

import { useCallback, useRef, useState } from "react";
import type { Accent, Site } from "@/lib/data";

const ACCENT = {
  red: {
    glow: "rgba(255, 77, 79, 0.9)",
    shadow: "hover:shadow-[0_0_28px_rgba(255,77,79,0.18)]",
    tag: "border-tl-red/30 bg-tl-red/10 text-tl-red",
    fallback: "from-tl-red/80 to-tl-red/40",
  },
  yellow: {
    glow: "rgba(250, 219, 20, 0.85)",
    shadow: "hover:shadow-[0_0_28px_rgba(250,219,20,0.15)]",
    tag: "border-tl-yellow/30 bg-tl-yellow/10 text-tl-yellow",
    fallback: "from-tl-yellow/80 to-tl-yellow/40",
  },
  green: {
    glow: "rgba(82, 196, 26, 0.9)",
    shadow: "hover:shadow-[0_0_28px_rgba(82,196,26,0.18)]",
    tag: "border-tl-green/30 bg-tl-green/10 text-tl-green",
    fallback: "from-tl-green/80 to-tl-green/40",
  },
} as const;

interface SiteCardProps {
  site: Site;
  accent: Accent;
}

export default function SiteCard({ site, accent }: SiteCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [logoFailed, setLogoFailed] = useState(false);
  const a = ACCENT[accent];

  // Border Glow：发光点沿边框追踪鼠标
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--glow-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--glow-y", `${e.clientY - rect.top}px`);
  }, []);

  const showFallback = logoFailed || !site.logo;

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      style={{ "--glow-color": a.glow } as React.CSSProperties}
      className={`border-glow-card group rounded-2xl border border-tl-border bg-tl-surface/80 p-4 backdrop-blur transition-all duration-300 hover:-translate-y-1 ${a.shadow}`}
    >
      <a
        href={site.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-wrap items-start gap-3"
      >
        {/* logo：缺图降级为首字母色块 */}
        <div className="size-11">
          {showFallback ? (
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-lg font-bold text-black/80 ${a.fallback}`}
            >
              {site.name.charAt(0).toUpperCase()}
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={site.logo}
              alt={site.name}
              className="h-11 w-11 shrink-0 rounded-xl bg-tl-fg/5 object-contain p-1"
              loading="lazy"
              onError={() => setLogoFailed(true)}
            />
          )}
        </div>
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-tl-fg">{site.name}</h3>
          {/* tags：纯展示 */}
          <div className="mt-1 flex flex-wrap gap-1.5">
            {site.tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-full border px-2 py-0.5 text-xs ${a.tag}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <p
          className="line-clamp-2 text-sm leading-snug text-tl-fg/50 w-full"
          title={site.desc}
        >
          {site.desc}
        </p>
      </a>
    </div>
  );
}
