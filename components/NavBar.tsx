"use client";

import { useCallback, useEffect, useState } from "react";
import TrafficLightLogo from "./TrafficLightLogo";

const GITHUB_URL = "https://github.com/zhaozonghu/traffic-light";

export default function NavBar() {
  // 与 layout 内联脚本约定：dark class + localStorage("theme")
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = useCallback(() => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-tl-border backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* 左侧 logo */}
        <a href="#" className="flex items-center gap-2.5">
          <TrafficLightLogo />
          <span className="text-base font-bold text-tl-fg">红绿灯</span>
        </a>

        {/* 右侧：主题切换 + GitHub */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="cursor-pointer rounded-full border border-tl-border p-2 text-tl-fg/70 transition-colors hover:bg-tl-surface hover:text-tl-fg"
            aria-label={isDark ? "切换到浅色主题" : "切换到深色主题"}
            title={isDark ? "切换到浅色主题" : "切换到深色主题"}
          >
            {isDark ? (
              /* 太阳：当前深色，点击切浅色 */
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2m0 14v2M5.2 5.2l1.4 1.4m10.8 10.8l1.4 1.4M3 12h2m14 0h2M5.2 18.8l1.4-1.4M17.4 6.6l1.4-1.4M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              /* 月亮：当前浅色，点击切深色 */
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-tl-border p-2 text-tl-fg/70 transition-colors hover:bg-tl-surface hover:text-tl-fg"
            aria-label="GitHub 仓库"
            title="GitHub 仓库"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.35.95.1-.74.4-1.25.72-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.25.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11.1 11.1 0 015.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.67.8.55C20.22 21.38 23.5 17.08 23.5 12c0-6.35-5.15-11.5-11.5-11.5z" />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
}
