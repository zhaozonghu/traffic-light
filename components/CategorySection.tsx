"use client";

import { accentOf, type Category } from "@/lib/data";
import SiteCard from "./SiteCard";

const DOT = {
  red: "bg-tl-red shadow-[0_0_12px_rgba(255,77,79,0.7)]",
  yellow: "bg-tl-yellow shadow-[0_0_12px_rgba(250,219,20,0.7)]",
  green: "bg-tl-green shadow-[0_0_12px_rgba(82,196,26,0.7)]",
} as const;

interface CategorySectionProps {
  category: Category;
  index: number;
}

export default function CategorySection({
  category,
  index,
}: CategorySectionProps) {
  const accent = accentOf(index);
  return (
    <section id={category.name} className="scroll-mt-24">
      <div className="mb-5 flex items-center gap-3">
        <span className={`h-3 w-3 rounded-full ${DOT[accent]}`} />
        <h2 className="text-xl font-bold text-tl-fg sm:text-2xl">
          {category.name}
        </h2>
        <span className="rounded-full border border-tl-border px-2 py-0.5 text-xs text-tl-fg/40">
          {category.sites.length}
        </span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {category.sites.map((site) => (
          <SiteCard key={site.name} site={site} accent={accent} />
        ))}
      </div>
    </section>
  );
}
