import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "红绿灯 - 网站导航",
  description:
    "红绿灯：一个炫酷的网站导航站，收录 AI 应用、开发工具、UI 组件与优秀开源项目。",
  keywords: ["导航", "网站导航", "AI", "开发工具", "UI组件", "开源项目"],
};

export const viewport: Viewport = {
  themeColor: "#08080f",
};

// 首帧前恢复主题，避免闪烁；默认深色
const themeInitScript = `
try {
  var t = localStorage.getItem("theme");
  if (t === "light") document.documentElement.classList.remove("dark");
  else document.documentElement.classList.add("dark");
} catch (e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
