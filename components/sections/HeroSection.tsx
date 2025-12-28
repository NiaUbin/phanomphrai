/**
 * HeroSection Component
 * 
 * ส่วนหัวของหน้าเว็บ (Hero Section)
 * SEO: รับสร้างบ้าน, ออกแบบบ้าน, รับเหมาก่อสร้าง
 * Design: สะอาด น่าเชื่อถือ เป็นมืออาชีพ
 */

'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { sliderImages } from '@/app/constants/data';
import { HeroContent } from '@/types';

/**
 * Hero Content - แก้ไขข้อมูลได้ที่นี่
 */
const heroContent: HeroContent = {
  title: 'สร้างบ้านในฝันของคุณ',
  subtitle: 'บริการรับสร้างบ้าน ออกแบบบ้าน รับเหมาก่อสร้างครบวงจร ด้วยทีมช่างมืออาชีพ วัสดุคุณภาพ ราคายุติธรรม',
  button1Text: 'ปรึกษาฟรี',
  button1Link: '#contact',
  button2Text: 'ดูผลงาน',
  button2Link: '#portfolio',
};

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const content = heroContent;

  // Auto-rotate Slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => setCurrentIndex(index);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleButtonClick = (e: React.MouseEvent, link: string) => {
    e.preventDefault();
    if (link.startsWith('#')) {
      scrollToSection(link.substring(1));
    } else {
      window.location.href = link;
    }
  };

  return (
    <section 
      className="relative min-h-[70vh] sm:min-h-[80vh] md:min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="รับสร้างบ้าน ออกแบบบ้าน รับเหมาก่อสร้าง"
    >
      {/* Background Slider */}
      <div className="absolute inset-0">
        {sliderImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentIndex ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'
            }`}
          >
            <Image
              src={image}
              alt={`ผลงานรับสร้างบ้าน PHANOMPHRAI - โครงการที่ ${index + 1}`}
              fill
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              className="object-cover"
              sizes="100vw"
              quality={index === 0 ? 90 : 75}
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 md:px-8 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-28 max-w-4xl mx-auto">
        
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span className="text-white/90 text-xs sm:text-sm font-medium">ประสบการณ์กว่า 10 ปี • 100+ โครงการสำเร็จ</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
          {content.title}
        </h1>
        
        {/* Sub Heading - SEO */}
        <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-medium mb-4">
          รับสร้างบ้าน ออกแบบบ้าน รับเหมาก่อสร้างครบวงจร
        </p>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-white/80 mb-8 max-w-2xl leading-relaxed">
          {content.subtitle}
        </p>
        
        {/* Trust Points */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[
            { text: 'ราคาโปร่งใส' },
            { text: 'รับประกันผลงาน' },
            { text: 'ปรึกษาฟรี' },
          ].map((badge, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-white/90">
              <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm">{badge.text}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <a
            href={content.button1Link}
            onClick={(e) => handleButtonClick(e, content.button1Link)}
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white text-base font-bold rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            {content.button1Text}
          </a>
          <a
            href={content.button2Link}
            onClick={(e) => handleButtonClick(e, content.button2Link)}
            className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/30 text-base font-bold rounded-xl hover:bg-white hover:text-gray-900 transition-all flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            {content.button2Text}
          </a>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {sliderImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'bg-white w-8 h-2'
                : 'bg-white/40 w-2 h-2 hover:bg-white/70'
            }`}
            aria-label={`ไปรูปที่ ${index + 1}`}
          />
        ))}
      </div>

      {/* SEO Hidden Content */}
      <div className="sr-only">
        <p>
          PHANOMPHRAI บริษัทรับสร้างบ้านครบวงจร บริการออกแบบบ้าน รับเหมาก่อสร้าง ต่อเติมบ้าน รีโนเวทบ้าน 
          ด้วยทีมสถาปนิกและวิศวกรมืออาชีพ ประสบการณ์กว่า 10 ปี บริการทั่วประเทศไทย 
          สำนักงานใหญ่ร้อยเอ็ด รับสร้างบ้านโมเดิร์น บ้านสองชั้น บ้านชั้นเดียว ราคาถูก คุณภาพดี
        </p>
      </div>
    </section>
  );
}
