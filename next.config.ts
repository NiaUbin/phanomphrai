import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  
  images: {
    unoptimized: true, // จำเป็นสำหรับ Static Export
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
      // --- ส่วนที่เพิ่ม/แก้ไข ---
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
      },
      {
        protocol: 'http',
        hostname: '*.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'img.iproperty.com.my',
      }
    ],
  },
};

export default nextConfig;