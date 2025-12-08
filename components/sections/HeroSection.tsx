/**
 * HeroSection - ส่วนหัวของหน้าเว็บ (Hero Section)
 * แสดงภาพสไลด์อัตโนมัติ พร้อมข้อความต้อนรับและปุ่ม CTA
 * ดึงข้อความจาก Firebase - แก้ไขได้จาก Admin
 */
'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { sliderImages } from '@/app/constants/data';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { HeroContent } from '@/types';

// ค่าเริ่มต้น (ใช้เมื่อยังไม่มีข้อมูลใน Firebase)
const defaultContent: HeroContent = {
  title: 'สร้างบ้านในฝันของคุณ',
  subtitle: 'บริการก่อสร้างคุณภาพสูง ด้วยทีมงานมืออาชีพและวัสดุคุณภาพ',
  button1Text: 'ติดต่อเรา',
  button1Link: '#contact',
  button2Text: 'ดูบริการของเรา',
  button2Link: '#services',
};

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [content, setContent] = useState<HeroContent>(defaultContent);

  // ดึงข้อมูลจาก Firebase
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, 'heroContent', 'main');
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setContent(docSnap.data() as HeroContent);
        }
      } catch (error) {
        console.error('Error fetching hero content:', error);
        // ใช้ค่าเริ่มต้นถ้าเกิดข้อผิดพลาด
      }
    };

    fetchContent();
  }, []);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + sliderImages.length) % sliderImages.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
  };

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
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-16 sm:pt-20">
      {/* Background Slider */}
      <div className="absolute inset-0 top-16 sm:top-20">
        {sliderImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <Image
              src={image}
              alt={`Construction Background ${index + 1}`}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 md:pt-10 pb-12 sm:pb-14 md:pb-20">
        <h1 className="text-fade-in text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight drop-shadow-2xl mb-3 sm:mb-4 md:mb-5 px-4">
          {content.title}
        </h1>
        <p className="text-fade-in-delay-1 text-sm sm:text-base md:text-lg lg:text-xl text-white/95 mb-6 sm:mb-8 md:mb-10 max-w-3xl leading-relaxed drop-shadow-lg px-4">
          {content.subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4">
          <a
            href={content.button1Link}
            onClick={(e) => handleButtonClick(e, content.button1Link)}
            className="w-full sm:w-auto min-w-[180px] px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-blue-600 text-white text-sm sm:text-base md:text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-300 text-center"
          >
            {content.button1Text}
          </a>
          <a
            href={content.button2Link}
            onClick={(e) => handleButtonClick(e, content.button2Link)}
            className="w-full sm:w-auto min-w-[180px] px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-white text-blue-600 text-sm sm:text-base md:text-lg font-semibold rounded-lg shadow-lg hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all duration-300 text-center"
          >
            {content.button2Text}
          </a>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white"
        >
          <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white"
        >
          <path
            d="M9 18L15 12L9 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {sliderImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'bg-white w-8 h-2'
                : 'bg-white/50 w-2 h-2 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
