import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 静态导出，部署 Vercel / 任意静态托管
  output: "export",
  images: {
    // 静态导出模式下无服务端图片优化
    unoptimized: true,
  },
};

export default nextConfig;
