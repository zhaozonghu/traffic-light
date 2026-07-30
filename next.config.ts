import type { NextConfig } from "next";

// GitHub Pages 部署在 /<repo>/ 子路径，由 CI 注入；本地开发为空
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // 静态导出，部署 Vercel / GitHub Pages / 任意静态托管
  output: "export",
  basePath,
  images: {
    // 静态导出模式下无服务端图片优化
    unoptimized: true,
  },
};

export default nextConfig;
