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
        {/* H1: ปรับให้กว้างขึ้น ครอบคลุมทั่วประเทศ และเน้นคำว่า "มาตรฐานสากล" */}
        <h1>PHANOMPHRAI รับสร้างบ้านทั่วประเทศไทย - บริการออกแบบและรับเหมาก่อสร้างครบวงจร มาตรฐานสากล</h1>
        
        <p>
          PHANOMPHRAI (พนมไพร) บริษัทรับสร้างบ้านชั้นนำที่พร้อมดูแลคุณในทุกพื้นที่ทั่วไทย 
          เรามุ่งมั่นส่งมอบบ้านคุณภาพด้วยมาตรฐานก่อสร้างเดียวกัน ไม่ว่าคุณจะอยู่ที่จังหวัดไหน 
          ดำเนินการโดยทีมวิศวกรและสถาปนิกมืออาชีพที่มีใบประกอบวิชาชีพ ควบคุมงานด้วยระบบบริหารจัดการที่ทันสมัย 
          โปร่งใส ตรวจสอบได้ทุกขั้นตอน พร้อมสัญญาจ้างที่เป็นธรรม การันตีไม่ทิ้งงาน เพื่อให้คุณได้บ้านที่สมบูรณ์แบบที่สุดตามงบประมาณที่กำหนด
        </p>

        <h2>บริการของเรา (One-Stop Service)</h2>
        <ul>
          <li>
            <strong>รับสร้างบ้านทั่วประเทศ:</strong> บริการก่อสร้างบ้านพักอาศัย อาคารพาณิชย์ ในทุกภูมิภาค (กรุงเทพฯ, ปริมณฑล, และต่างจังหวัด) 
            ด้วยทีมช่างฝีมือมาตรฐาน
          </li>
          <li>
            <strong>บริการออกแบบบ้านครบวงจร:</strong> รับออกแบบสถาปัตยกรรม เขียนแบบก่อสร้าง ภาพ 3D 
            โดยคำนึงถึงทิศทางลม แสงแดด และบริบทของพื้นที่จริงในแต่ละจังหวัด
          </li>
          <li>
            <strong>ดำเนินการเอกสารราชการ:</strong> ดูแลเรื่องการยื่นขออนุญาตก่อสร้าง ขอมิเตอร์น้ำ-ไฟ และเลขที่บ้าน 
            กับหน่วยงานท้องถิ่นทั่วประเทศให้ฟรี
          </li>
          <li>
            <strong>ที่ปรึกษางานก่อสร้าง:</strong> บริการประเมินราคา (BOQ) และให้คำปรึกษาเรื่องสินเชื่อสร้างบ้านกับธนาคารชั้นนำ
          </li>
        </ul>

        <h2>ทำไมลูกค้าทั่วไทยถึงเลือก PHANOMPHRAI</h2>
        <ul>
          <li>
            <strong>ให้บริการครอบคลุมทุกพื้นที่:</strong> เรามีความพร้อมด้านทีมงานและเครือข่ายพันธมิตรวัสดุก่อสร้าง 
            ทำให้สามารถรับงานได้ทั่วประเทศโดยยังคงรักษาคุณภาพมาตรฐาน
          </li>
          <li>
            <strong>ระบบติดตามงานออนไลน์:</strong> หมดห่วงเรื่องระยะทาง ด้วยระบบอัปเดตความคืบหน้าหน้างานผ่าน Line/Online 
            ให้คุณเห็นทุกขั้นตอนการก่อสร้างเสมือนไปดูด้วยตัวเอง
          </li>
          <li>
            <strong>สัญญามาตรฐานและราคายุติธรรม:</strong> สัญญาจ้างชัดเจน ระบุสเปควัสดุตรงไปตรงมา ไม่มีการลดเกรดของ 
            และไม่มีงบประมาณบานปลาย
          </li>
          <li>
            <strong>มาตรฐานวิศวกรรม:</strong> ควบคุมงานโดยวิศวกรทุกขั้นตอน โครงสร้างแข็งแรง คำนวณตามหลักวิศวกรรม 
            รองรับสภาพดินและอากาศที่แตกต่างกันในแต่ละภูมิภาค
          </li>
          <li>
            <strong>รับประกันผลงานระยะยาว:</strong> มีใบรับประกันโครงสร้างและตัวบ้าน มั่นใจได้ในบริการหลังการขายที่ไม่ทอดทิ้งลูกค้า
          </li>
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
