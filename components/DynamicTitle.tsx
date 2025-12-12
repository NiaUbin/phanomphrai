'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Mapping สำหรับ hash sections - SEO Friendly titles
const hashTitleMap: Record<string, string> = {
  'portfolio': 'ผลงานบ้านสร้างเสร็จ | รับสร้างบ้าน - PHANOMPHRAI',
  'services': 'การันตีคุณภาพงานก่อสร้าง | รับประกันผลงาน - PHANOMPHRAI',
  'about': 'เกี่ยวกับเรา | ทีมช่างมืออาชีพ - PHANOMPHRAI',
  'contact': 'ติดต่อเรา | สอบถามราคาสร้างบ้าน - PHANOMPHRAI',
};

// Mapping สำหรับ routes
const routeTitleMap: Record<string, string> = {
  '/admin-phanomphrai': 'หน้าจัดการ - PHANOMPHRAI',
};

// ตรวจสอบว่า pathname ตรงกับ pattern หรือไม่
const isHouseDetail = (pathname: string) => /^\/house\/[^\/]+$/.test(pathname);
const isGalleryDetail = (pathname: string) => /^\/gallery\/[^\/]+$/.test(pathname);

export default function DynamicTitle() {
  const pathname = usePathname();

  useEffect(() => {
    // ตรวจสอบว่าเป็น route-based page หรือไม่
    if (pathname && routeTitleMap[pathname]) {
      document.title = routeTitleMap[pathname];
      return;
    }

    // ตรวจสอบหน้า house detail - ข้ามไม่ต้องจัดการ
    // ให้ HouseDetailClient.tsx จัดการ title ด้วยชื่อจริงของผลงาน
    if (isHouseDetail(pathname)) {
      return; // ไม่ต้องทำอะไร ปล่อยให้ HouseDetailClient จัดการ
    }

    // ตรวจสอบหน้า gallery detail - ข้ามไม่ต้องจัดการ
    // ให้ GalleryDetailClient.tsx จัดการ title ด้วยชื่อจริงของ gallery
    if (isGalleryDetail(pathname)) {
      return; // ไม่ต้องทำอะไร ปล่อยให้ GalleryDetailClient จัดการ
    }

    // สำหรับหน้าแรก (/) ให้ตรวจสอบ hash
    if (pathname === '/') {
      const updateTitleFromHash = () => {
        const hash = window.location.hash.substring(1); // ลบ # ออก
        if (hash && hashTitleMap[hash]) {
          document.title = hashTitleMap[hash];
        } else {
          document.title = 'PHANOMPHRAI - สร้างบ้านในฝันของคุณ';
        }
      };

      // ตรวจสอบ hash ตอนโหลดหน้า
      updateTitleFromHash();

      // ฟัง hashchange event
      window.addEventListener('hashchange', updateTitleFromHash);

      return () => {
        window.removeEventListener('hashchange', updateTitleFromHash);
      };
    } else {
      // สำหรับหน้าแรก default
      document.title = 'PHANOMPHRAI - สร้างบ้านในฝันของคุณ';
    }
  }, [pathname]);

  return null; // Component นี้ไม่ render อะไร
}
