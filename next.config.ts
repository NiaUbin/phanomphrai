import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  
  images: {
    unoptimized: true, // <--- สำคัญมาก: ต้องใส่บรรทัดนี้เมื่อใช้ output: 'export'
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lirp.cdn-website.com',
      },
      {
        protocol: 'https',
        hostname: 'images.lirp.cdn-website.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'p-construction.samplebigbang.com',
      },
    ],
  },
};

export default nextConfig;