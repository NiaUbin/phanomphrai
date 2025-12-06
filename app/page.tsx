'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import PromotionSection from '@/components/sections/PromotionSection';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import HouseDetailClient from '@/app/house/[id]/HouseDetailClient';

export default function Home() {
  const pathname = usePathname();
  const [shouldShowHouseDetail, setShouldShowHouseDetail] = useState(false);
  const [isFading, setIsFading] = useState(false);

  // ตรวจสอบว่าเป็นหน้า house detail หรือไม่ (update เมื่อ pathname เปลี่ยน)
  useEffect(() => {
    // ใช้ setTimeout เพื่อหลีกเลี่ยง synchronous setState
    const timer = setTimeout(() => {
      if (typeof window === 'undefined') {
        setShouldShowHouseDetail(false);
        return;
      }
      
      const currentPath = window.location.pathname;
      const houseMatch = currentPath.match(/^\/house\/([^\/]+)$/);
      const isHousePage = !!(houseMatch && houseMatch[1]);
      
      // ถ้ากำลังเปลี่ยนจากหน้า house detail ไปหน้าแรก ให้ทำ fade transition
      if (shouldShowHouseDetail && !isHousePage) {
        setIsFading(true);
        // Fade out หน้า house detail
        setTimeout(() => {
          setShouldShowHouseDetail(false);
          // Fade in หน้าแรก
          setTimeout(() => {
            setIsFading(false);
          }, 150);
        }, 200);
      } else {
        setShouldShowHouseDetail(isHousePage);
        setIsFading(false);
      }
    }, 0);
    
    return () => clearTimeout(timer);
  }, [pathname, shouldShowHouseDetail]);

  // จัดการ hash เมื่อโหลดหน้าแรกเสร็จ (สำหรับกรณี redirect จากหน้า house detail)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (pathname !== '/' && window.location.pathname !== '/') return;
    
    const hash = window.location.hash;
    if (hash) {
      // รอให้ page render เสร็จก่อน
      const timer = setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          const offset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  // ถ้าเป็นหน้า house detail ให้แสดง HouseDetailClient
  if (shouldShowHouseDetail) {
    return (
      <div className={`transition-opacity duration-200 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}>
        <HouseDetailClient />
      </div>
    );
  }

  // หน้าแรกปกติ
  return (
    <div className={`min-h-screen bg-white text-gray-900 transition-opacity duration-200 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}>
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <PromotionSection />
      <AboutSection />
      <ContactSection />
    </div>
  );
}
