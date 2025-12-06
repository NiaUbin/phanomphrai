'use client';

import Image from 'next/image';
import { useRef, useState, useEffect, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { services as fallbackServices } from '@/app/constants/data';

interface GalleryItem {
  id: string;
  description: string;
  imageUrl: string;
  order?: number;
}

export default function ServicesSection() {
  const serviceCarouselRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'gallery'));
        const data: GalleryItem[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() } as GalleryItem);
        });
        
        data.sort((a, b) => (a.order || 0) - (b.order || 0));
        
        if (data.length > 0) {
          setItems(data);
        } else {
          setItems(fallbackServices.map((s, i) => ({
            id: String(s.id),
            description: s.title,
            imageUrl: s.image,
            order: i
          })));
        }
      } catch (error) {
        console.error('Error fetching gallery:', error);
        setItems(fallbackServices.map((s, i) => ({
          id: String(s.id),
          description: s.title,
          imageUrl: s.image,
          order: i
        })));
      } finally {
        setIsLoading(false);
      }
    };

    fetchGallery();
  }, []);

  // Track scroll position to update active dot
  const handleScroll = useCallback(() => {
    const container = serviceCarouselRef.current;
    if (!container || items.length === 0) return;

    const firstCard = container.querySelector<HTMLElement>('[data-service-card]');
    if (!firstCard) return;

    const cardWidth = firstCard.getBoundingClientRect().width;
    const gap = 16;
    const scrollLeft = container.scrollLeft;
    const newIndex = Math.round(scrollLeft / (cardWidth + gap));
    
    setActiveIndex(Math.min(Math.max(0, newIndex), items.length - 1));
  }, [items.length]);

  useEffect(() => {
    const container = serviceCarouselRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

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

  const scrollToIndex = (index: number) => {
    const container = serviceCarouselRef.current;
    if (!container) return;

    const firstCard = container.querySelector<HTMLElement>('[data-service-card]');
    const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : 280;
    const gap = 16;

    container.scrollTo({
      left: index * (cardWidth + gap),
      behavior: 'smooth',
    });
  };

  return (
    <section id="services" className="py-8 sm:py-10 md:py-12 lg:py-16 bg-gray-100">
      <div className="max-w-[1920px] mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10 px-4">
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

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Service Carousel Wrapper */}
            <div className="relative w-full px-4">
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
                className="flex overflow-x-auto gap-4 sm:gap-6 pb-16 sm:pb-20 snap-x snap-mandatory scroll-smooth px-2 sm:px-0"
                style={{ 
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none',
                }}
              >
                {items.map((item) => (
                  <div
                    key={item.id}
                    data-service-card
                    className="shrink-0 snap-center pt-2 sm:pt-4"
                  >
                    {/* Card Container */}
                    <div className="relative w-[200px] sm:w-[240px] md:w-[260px] aspect-[4/5] bg-gray-200 group rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                      
                      {/* Image */}
                      <Image
                        src={item.imageUrl}
                        alt={item.description}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 200px, (max-width: 768px) 240px, 260px"
                      />

                      {/* Overlay Text Box */}
                      <div className="absolute bottom-0 left-3 right-3 sm:left-4 sm:right-4 translate-y-1/2 bg-white p-2 sm:p-3 shadow-lg flex items-center justify-center h-[90px] sm:h-[110px] z-20">
                        <p className="text-gray-900 text-xs sm:text-sm font-medium text-center leading-relaxed line-clamp-3 sm:line-clamp-4">
                          {item.description}
                        </p>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scroll Indicator Dots - Clickable */}
            <div className="flex justify-center mt-4 gap-1.5">
              {items.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  aria-label={`ไปที่รูปที่ ${index + 1}`}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeIndex === index 
                      ? 'bg-gray-800 scale-125' 
                      : 'bg-gray-400 hover:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
