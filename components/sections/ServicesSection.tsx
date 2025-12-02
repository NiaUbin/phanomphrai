'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { services } from '@/app/constants/data';

export default function ServicesSection() {
  const serviceCarouselRef = useRef<HTMLDivElement>(null);

  const scrollServices = (direction: 'left' | 'right') => {
    const container = serviceCarouselRef.current;
    if (!container) return;

    const firstCard = container.querySelector<HTMLElement>('[data-service-card]');
    const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : 280;
    const gap = 16; 

    container.scrollBy({
      left: direction === 'left' ? -(cardWidth + gap) : cardWidth + gap,
      behavior: 'smooth',
    });
  };

  return (
    <section id="services" className="py-10 sm:py-12 md:py-16 lg:py-20 bg-gray-100">
      <div className="max-w-[1920px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20 md:mb-24 px-4"> {/* เพิ่ม margin-bottom เพื่อเผื่อพื้นที่ให้กล่องที่ยื่นออกมา */}
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
            การันตีคุณภาพ
          </h2>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl mb-3 sm:mb-4">
            ด้วยผลงานของเรา
          </p>
          <div className="flex justify-center">
            <div className="h-1 w-24 sm:w-28 md:w-32 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400" />
          </div>
        </div>

        {/* Service Carousel Wrapper */}
        <div className="relative w-full px-4"> {/* เพิ่ม px-4 เพื่อไม่ให้เงาด้านข้างโดนตัด */}
          {/* Navigation Buttons */}
          <button
            type="button"
            onClick={() => scrollServices('left')}
            aria-label="เลื่อนไปซ้าย"
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-30 h-12 w-12 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-md hover:bg-white transition-all duration-300"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 18L9 12L15 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollServices('right')}
            aria-label="เลื่อนไปขวา"
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-30 h-12 w-12 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-md hover:bg-white transition-all duration-300"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>

          {/* Carousel Container */}
          <div 
            ref={serviceCarouselRef}
            // เพิ่ม pb-20 เพื่อเผื่อพื้นที่ด้านล่างสำหรับส่วนที่ยื่นออกมา
            className="flex overflow-x-auto gap-6 pb-20 snap-x snap-mandatory scroll-smooth"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
            }}
          >
            {services.map((service, index) => (
              <div
                key={service.id}
                data-service-card
                className="shrink-0 snap-center pt-4" // เพิ่ม pt-4 เพื่อให้มีที่สำหรับ hover effect
              >
                {/* Card Container - สำคัญ: เอา overflow-hidden ออก */}
                <div className="relative w-[240px] sm:w-[280px] aspect-[4/5] bg-gray-200 group rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  
                  {/* Image - เพิ่ม rounded-lg */}
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 240px, 280px"
                  />

                  {/* Overlay Text Box - จุดที่แก้ไขหลัก */}
                  <div className="absolute bottom-0 left-4 right-4 translate-y-1/2 bg-white p-3 shadow-lg flex items-center justify-center h-[120px] z-20">
                    <p className="text-gray-900 text-xs sm:text-sm font-medium text-center leading-relaxed line-clamp-4">
                      {service.title}
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Scroll Indicator */}
        <div className="flex justify-center mt-8 lg:hidden gap-2">
          {services.map((_, index) => (
            <div key={index} className="h-1.5 w-1.5 rounded-full bg-gray-300" />
          ))}
        </div>
      </div>
    </section>
  );
}