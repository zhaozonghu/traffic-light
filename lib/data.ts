import sitesData from "@/data/sites.json";

export interface Site {
  name: string;
  logo: string;
  desc: string;
  tags: string[];
  url: string;
}

export interface Category {
  name: string;
  sites: Site[];
}

export const categories: Category[] = sitesData;

/** 红绿灯三色循环：分类按序着色 */
export type Accent = "red" | "yellow" | "green";

export const ACCENTS: Accent[] = ["red", "yellow", "green"];

export function accentOf(index: number): Accent {
  return ACCENTS[index % ACCENTS.length];
}
