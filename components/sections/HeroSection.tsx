/**
 * HeroSection - ส่วนหัวของหน้าเว็บ (Hero Section)
 * SEO: รับสร้างบ้าน, ออกแบบบ้าน, รับเหมาก่อสร้าง
 */
'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { sliderImages } from '@/app/constants/data';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { HeroContent } from '@/types';

const defaultContent: HeroContent = {
  title: 'สร้างบ้านในฝันของคุณ',
  subtitle: 'บริการรับสร้างบ้าน ออกแบบบ้าน รับเหมาก่อสร้างครบวงจร ด้วยทีมช่างมืออาชีพ วัสดุคุณภาพ ราคายุติธรรม',
  button1Text: 'ปรึกษาฟรี',
  button1Link: '#contact',
  button2Text: 'ดูผลงาน',
  button2Link: '#portfolio',
};

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [content, setContent] = useState<HeroContent>(defaultContent);

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
      }
    };
    fetchContent();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => setCurrentIndex(index);
  const goToPrevious = () => setCurrentIndex((prevIndex) => (prevIndex - 1 + sliderImages.length) % sliderImages.length);
  const goToNext = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="รับสร้างบ้าน ออกแบบบ้าน รับเหมาก่อสร้าง"
    >
      {/* Background Slider */}
      {/* Background Slider - ครอบคลุมทั้งหน้าจอรวม Navbar */}
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
              alt={`ผลงานก่อสร้างบ้าน PHANOMPHRAI ${index + 1}`}
              fill
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              className="object-cover"
              sizes="100vw"
              quality={index === 0 ? 90 : 75}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
          </div>
        ))}
      </div>

      {/* Content */}
      {/* Content - เพิ่ม padding top สำหรับ Navbar */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 md:px-8 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-28 max-w-5xl mx-auto">
        
        {/* Badge */}
        <div className="text-fade-in mb-6 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
          <span className="text-white/90 text-sm font-medium">ประสบการณ์กว่า 10 ปี • 100+ โครงการสำเร็จ</span>
        </div>

        {/* Main Heading - SEO Optimized */}
        <h1 className="text-fade-in text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-4 sm:mb-6 px-4">
          <span className="block">{content.title}</span>
        </h1>

        {/* Subtitle - SEO Content */}
        <p className="text-fade-in-delay-1 text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 sm:mb-10 max-w-3xl leading-relaxed px-4">
          {content.subtitle}
        </p>

        {/* Trust Badges */}
        <div className="text-fade-in-delay-1 flex flex-wrap justify-center gap-4 sm:gap-6 mb-8 sm:mb-10">
          {[
            { icon: "✓", text: "ราคายุติธรรม" },
            { icon: "✓", text: "รับประกันผลงาน" },
            { icon: "✓", text: "ปรึกษาฟรี" },
          ].map((badge, idx) => (
            <div key={idx} className="flex items-center gap-2 text-white/90">
              <span className="w-5 h-5 bg-emerald-500/80 rounded-full flex items-center justify-center text-xs font-bold">{badge.icon}</span>
              <span className="text-sm sm:text-base">{badge.text}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="text-fade-in-delay-2 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4">
          <a
            href={content.button1Link}
            onClick={(e) => handleButtonClick(e, content.button1Link)}
            className="group w-full sm:w-auto min-w-[200px] px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-base sm:text-lg font-bold rounded-xl shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1 active:scale-95 transition-all duration-300 text-center flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            {content.button1Text}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
          <a
            href={content.button2Link}
            onClick={(e) => handleButtonClick(e, content.button2Link)}
            className="group w-full sm:w-auto min-w-[200px] px-8 sm:px-10 py-4 sm:py-5 bg-white/10 backdrop-blur-md text-white border-2 border-white/30 text-base sm:text-lg font-bold rounded-xl hover:bg-white hover:text-gray-900 hover:-translate-y-1 active:scale-95 transition-all duration-300 text-center flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            {content.button2Text}
          </a>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 sm:p-4 transition-all duration-300 hover:scale-110 border border-white/20"
        aria-label="รูปก่อนหน้า"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 sm:p-4 transition-all duration-300 hover:scale-110 border border-white/20"
        aria-label="รูปถัดไป"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {sliderImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'bg-white w-10 h-2.5'
                : 'bg-white/40 w-2.5 h-2.5 hover:bg-white/70'
            }`}
            aria-label={`ไปรูปที่ ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator
      <div className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 z-20 hidden sm:flex flex-col items-center gap-2">
        <span className="text-white/60 text-xs">เลื่อนลง</span>
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/60 rounded-full animate-bounce"></div>
        </div>
      </div> */}
    </section>
  );
}
