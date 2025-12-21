'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { services as fallbackServices } from '@/app/constants/data';

interface GalleryItem {
  id: string;
  description: string;
  imageUrl: string;
  order?: number;
  houseId?: string; // ID ของ house ที่เชื่อมโยง
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
        
        // Sort data
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

  // Memoize sorted items to prevent unnecessary re-renders
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [items]);

  // Track scroll position to update active dot
  const handleScroll = useCallback(() => {
    const container = serviceCarouselRef.current;
    if (!container || sortedItems.length === 0) return;

    const firstCard = container.querySelector<HTMLElement>('[data-service-card]');
    if (!firstCard) return;

    const cardWidth = firstCard.getBoundingClientRect().width;
    const gap = 16;
    const scrollLeft = container.scrollLeft;
    const newIndex = Math.round(scrollLeft / (cardWidth + gap));
    
    setActiveIndex(Math.min(Math.max(0, newIndex), sortedItems.length - 1));
  }, [sortedItems.length]);

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
        {/* Header - SEO Optimized */}
        <div className="text-center mb-5 sm:mb-6 md:mb-8 px-4">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
            ผลงานรับสร้างบ้านและการันตีคุณภาพ
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-3 sm:mb-4 max-w-3xl mx-auto">
            ตัวอย่างผลงานการออกแบบบ้านและรับเหมาก่อสร้างที่ผ่านมา 
            ด้วยทีมช่างมืออาชีพ วัสดุคุณภาพสูง ราคายุติธรรม
          </p>
          <div className="flex justify-center">
            <div className="h-1 w-20 sm:w-24 md:w-28 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400" />
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
                {sortedItems.map((item) => {
                  const CardContent = (
                    <div className="relative w-[200px] sm:w-[240px] md:w-[260px] aspect-[4/5] bg-gray-200 group rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
                      
                      {/* Image */}
                      <Image
                        src={item.imageUrl}
                        alt={`${item.description} - ผลงานรับสร้างบ้าน ออกแบบบ้าน รับเหมาก่อสร้าง PHANOMPHRAI`}
                        fill
                        loading="lazy"
                        className="object-cover transition-transform duration-700 ease-out hover:drop-shadow-lg"
                        sizes="(max-width: 640px) 200px, (max-width: 768px) 240px, 260px"
                        title={`${item.description} - บริการรับสร้างบ้านครบวงจร`}
                      />

                      {/* Overlay Text Box */}
                      <div className="absolute bottom-0 left-3 right-3 sm:left-4 sm:right-4 translate-y-1/2 bg-white p-2 sm:p-3 shadow-lg flex items-center justify-center h-[90px] sm:h-[110px] z-20">
                        <p className="text-blue-800 text-xs sm:text-sm font-medium text-center leading-relaxed line-clamp-3 sm:line-clamp-4">
                          {item.description}
                        </p>
                      </div>

                      {/* View More Indicator */}
                      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-gray-800"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>

                    </div>
                  );

                  return (
                    <div
                      key={item.id}
                      data-service-card
                      className="shrink-0 snap-center pt-2 sm:pt-4"
                    >
                      <Link href={`/gallery/${item.id}`} prefetch={true} className="block">
                        {CardContent}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Scroll Indicator Dots - Clickable */}
            <div className="flex justify-center mt-4 gap-1.5">
              {sortedItems.map((_, index) => (
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
