/**
 * Home Page Component
 * 
 * หน้าแรกของเว็บไซต์ ทำหน้าที่:
 * 1. แสดง Hero Section, Services, Portfolio, Promotion, About, Contact sections
 * 2. จัดการการแสดงผล House Detail page (เมื่ออยู่ใน /house/[id])
 * 3. จัดการ hash navigation (scroll to section เมื่อมี #hash)
 * 4. ใช้ Lazy Loading สำหรับ sections ที่ไม่จำเป็นต้องโหลดทันที (Performance optimization)
 * 
 * หมายเหตุ: ใช้ lazy loading เพื่อเพิ่มความเร็วในการโหลดหน้าแรก
 */

'use client';

import { useEffect, useState, lazy, Suspense } from 'react';
import { usePathname } from 'next/navigation';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import HouseDetailClient from '@/app/house/[id]/HouseDetailClient';

/**
 * Lazy Load Sections Below the Fold
 * 
 * โหลด sections เหล่านี้แบบ lazy เพื่อเพิ่มความเร็วในการโหลดหน้าแรก
 * Sections เหล่านี้จะถูกโหลดหลังจากที่หน้าแรก render เสร็จแล้ว
 */
const PortfolioSection = lazy(() => import('@/components/sections/PortfolioSection'));
const PromotionSection = lazy(() => import('@/components/sections/PromotionSection'));
const AboutSection = lazy(() => import('@/components/sections/AboutSection'));
const ContactSection = lazy(() => import('@/components/sections/ContactSection'));

/**
 * Loading Fallback Component
 * แสดง loading spinner ขณะที่ lazy loaded sections กำลังโหลด
 */
const SectionLoader = () => (
  <div className="flex justify-center items-center py-20">
    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

/**
 * Home Component
 * 
 * Component หลักของหน้าแรก
 */
export default function Home() {
  const pathname = usePathname();
  
  // State สำหรับจัดการการแสดงผล House Detail page
  const [shouldShowHouseDetail, setShouldShowHouseDetail] = useState(false);
  const [isFading, setIsFading] = useState(false);

  /**
   * ตรวจสอบว่าเป็นหน้า house detail หรือไม่
   * 
   * Logic:
   * - ตรวจสอบ pathname ว่าตรงกับ pattern /house/[id] หรือไม่
   * - ถ้าใช่ ให้แสดง HouseDetailClient
   * - ถ้าเปลี่ยนจาก house detail ไปหน้าแรก ให้ทำ fade transition
   * 
   * หมายเหตุ: ใช้ setTimeout เพื่อหลีกเลี่ยง synchronous setState issues
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      // ตรวจสอบว่าเป็น browser environment หรือไม่
      if (typeof window === 'undefined') {
        setShouldShowHouseDetail(false);
        return;
      }
      
      // ตรวจสอบ pathname ว่าตรงกับ pattern /house/[id] หรือไม่
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

  /**
   * จัดการ Hash Navigation
   * 
   * เมื่อมี hash ใน URL (เช่น /#contact) ให้ scroll ไปที่ section นั้น
   * 
   * Logic:
   * - ตรวจสอบว่ามี hash ใน URL หรือไม่
   * - ถ้ามี ให้ scroll ไปที่ element ที่มี id ตรงกับ hash
   * - Retry mechanism: ถ้า element ยังไม่พร้อม (lazy loading) ให้ retry อีกครั้ง
   * 
   * หมายเหตุ: ใช้สำหรับกรณี redirect จากหน้า house detail กลับมาหน้าแรกพร้อม hash
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (pathname !== '/' && window.location.pathname !== '/') return;
    
    const hash = window.location.hash;
    if (hash) {
      /**
       * Scroll to Element Function
       * 
       * @param attempts - จำนวนครั้งที่ retry แล้ว (max 10 ครั้ง)
       */
      const scrollToElement = (attempts = 0) => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          // คำนวณตำแหน่งที่ต้องการ scroll (offset สำหรับ navbar)
          const offset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        } else if (attempts < 10) {
          // Retry if element not found (lazy loading may take time)
          setTimeout(() => scrollToElement(attempts + 1), 200);
        }
      };
      
      // รอให้ page render เสร็จก่อน - เพิ่มเวลารอสำหรับ lazy loaded components
      const timer = setTimeout(() => scrollToElement(), 300);
      
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  /**
   * Render House Detail Page
   * 
   * ถ้าเป็นหน้า house detail ให้แสดง HouseDetailClient
   * พร้อม fade transition effect
   */
  if (shouldShowHouseDetail) {
    return (
      <div className={`transition-opacity duration-200 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}>
        <HouseDetailClient />
      </div>
    );
  }

  /**
   * Render Home Page
   * 
   * หน้าแรกปกติ - แสดง sections ต่างๆ:
   * - HeroSection: ส่วนหัวของหน้าเว็บ
   * - ServicesSection: ส่วนการันตีคุณภาพ
   * - PortfolioSection: ส่วนผลงาน (lazy loaded)
   * - PromotionSection: ส่วนโปรโมชั่น (lazy loaded)
   * - AboutSection: ส่วนเกี่ยวกับเรา (lazy loaded)
   * - ContactSection: ส่วนติดต่อเรา (lazy loaded)
   * 
   * หมายเหตุ: มี SEO-optimized structure (sr-only content) สำหรับ search engines
   */
  return (
    <main className={`min-h-screen bg-white text-gray-900 transition-opacity duration-200 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}>
      {/* 
        Hidden SEO Content 
        
        เนื้อหานี้ถูกซ่อนด้วย sr-only class แต่ยังคง:
        - อ่านได้โดย screen readers (สำหรับ accessibility)
        - อ่านได้โดย search engines (สำหรับ SEO)
        
        หมายเหตุ: ใช้สำหรับเพิ่ม SEO keywords และข้อมูลที่สำคัญ
      */}
      <div className="sr-only">
        <h1>PHANOMPHRAI - บริการรับสร้างบ้าน ออกแบบบ้าน รับเหมาก่อสร้างครบวงจร</h1>
        <p>
          PHANOMPHRAI บริษัทรับสร้างบ้านและออกแบบบ้านครบวงจร ให้บริการรับเหมาก่อสร้าง 
          ออกแบบบ้าน ต่อเติมบ้าน รีโนเวทบ้าน ด้วยทีมสถาปนิกและวิศวกรมืออาชีพ 
          ประสบการณ์กว่า 10 ปี มากกว่า 100+ โครงการสำเร็จ ใช้วัสดุคุณภาพสูง 
          ราคายุติธรรม รับประกันผลงาน บริการทั่วประเทศไทย โดยเฉพาะอีสาน ร้อยเอ็ด พนมไพร
        </p>
        <h2>บริการของเรา</h2>
        <ul>
          <li>รับออกแบบบ้าน - ออกแบบบ้านสวย ตามความต้องการของคุณ</li>
          <li>รับสร้างบ้าน - สร้างบ้านใหม่ ครบวงจร ราคายุติธรรม</li>
          <li>รับเหมาก่อสร้าง - รับเหมาก่อสร้างบ้าน ต่อเติมบ้าน รีโนเวทบ้าน</li>
          <li>ต่อเติมบ้าน - ต่อเติมบ้าน เพิ่มพื้นที่ใช้สอย</li>
          <li>รีโนเวทบ้าน - ปรับปรุงบ้านใหม่ ให้สวยงามทันสมัย</li>
        </ul>
        <h2>ทำไมต้องเลือก PHANOMPHRAI</h2>
        <ul>
          <li>ประสบการณ์กว่า 10 ปี ในวงการก่อสร้าง</li>
          <li>มากกว่า 100+ โครงการสำเร็จ</li>
          <li>ทีมช่างมืออาชีพ สถาปนิกและวิศวกร</li>
          <li>วัสดุคุณภาพสูง มาตรฐานสูง</li>
          <li>ราคายุติธรรม โปร่งใส ไม่มีค่าใช้จ่ายแอบแฝง</li>
          <li>รับประกันผลงาน ทุกโครงการ</li>
          <li>บริการทั่วประเทศไทย โดยเฉพาะอีสาน ร้อยเอ็ด พนมไพร</li>
        </ul>
      </div>

      <HeroSection />
      <ServicesSection />
      <Suspense fallback={<SectionLoader />}>
        <PortfolioSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <PromotionSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <ContactSection />
      </Suspense>
    </main>
  );
}
