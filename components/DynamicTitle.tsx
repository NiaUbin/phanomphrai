'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Mapping สำหรับ hash sections
const hashTitleMap: Record<string, string> = {
  'portfolio': 'หน้าผลงาน - PHANOMPHRAI',
  'services': 'หน้าการันตี - PHANOMPHRAI',
  'about': 'เกี่ยวกับเรา - PHANOMPHRAI',
  'contact': 'ติดต่อเรา - PHANOMPHRAI',
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

    // ตรวจสอบหน้า house detail
    if (isHouseDetail(pathname)) {
      document.title = 'รายละเอียดบ้าน - PHANOMPHRAI';
      return;
    }

    // ตรวจสอบหน้า gallery detail
    if (isGalleryDetail(pathname)) {
      document.title = 'แกลเลอรี่ - PHANOMPHRAI';
      return;
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
