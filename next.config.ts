import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',

  // Enable compression for better performance
  // เปิดใช้การบีบอัดเพื่อประสิทธิภาพที่ดีขึ้น
  compress: true,

  // NOTE: swcMinify ถูกลบออกเพราะเป็น default ใน Next.js 15 แล้ว
  // SWC minification is now enabled by default in Next.js 15

  // Optimize images - การตั้งค่ารูปภาพ
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

  // Optimize bundle size
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;