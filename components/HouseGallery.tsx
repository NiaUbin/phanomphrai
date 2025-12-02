'use client';

import Image from 'next/image';
import { useState } from 'react';

type HouseGalleryProps = {
  mainImage: string;
  images: string[];
  title: string;
};

export default function HouseGallery({ mainImage, images, title }: HouseGalleryProps) {
  const allImages = [mainImage, ...images];
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % allImages.length);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartX;
    const threshold = 50; // ระยะขั้นต่ำในการปัด
    if (diffX > threshold) {
      goPrev();
    } else if (diffX < -threshold) {
      goNext();
    }
    setTouchStartX(null);
  };

  return (
    <div>
      {/* Main Image (click to open) */}
      <section className="mb-6 sm:mb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => openLightbox(0)}
            className="group relative block w-full focus:outline-none"
          >
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
              <Image
                src={mainImage}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="100vw"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* View Photos badge */}
              <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs sm:text-sm px-3 py-1.5 rounded-full flex items-center gap-2">
                <span>ดูรูปทั้งหมด</span>
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 border border-white/30">
                  {allImages.length}
                </span>
              </div>
            </div>
          </button>
        </div>
      </section>

      {/* Thumbnail Grid (clickable) */}
      <section className="mb-4 sm:mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
            ภาพโครงการ
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {allImages.map((image, index) => (
              <button
                key={index}
                type="button"
                onClick={() => openLightbox(index)}
                className="relative w-full h-[150px] sm:h-[190px] md:h-[210px] lg:h-[230px] overflow-hidden transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={`ดูรูปที่ ${index + 1}`}
              >
                <Image
                  src={image}
                  alt={`${title} ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 cursor-zoom-out"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={(e) => {
            // คลิกที่พื้นหลัง (นอกกรอบภาพ) ให้ปิดรูป
            if (e.target === e.currentTarget) {
              closeLightbox();
            }
          }}
        >
          <div className="relative z-10 w-full h-full overflow-hidden cursor-default">
            {/* Main image เต็มพื้นที่ สไลด์นุ่มๆ ตาม index */}
            {allImages.map((image, index) => (
              <div
                key={`${image}-${index}`}
                className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out ${
                  index === currentIndex
                    ? 'translate-x-0'
                    : index < currentIndex
                    ? '-translate-x-full'
                    : 'translate-x-full'
                }`}
              >
                <Image
                  src={image}
                  alt={`${title} ${index + 1}`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
            ))}

            {/* Top-right close button (เลื่อนลงมาให้กดง่ายขึ้น) */}
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-8 right-4 sm:top-10 sm:right-6 flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-900 shadow-lg hover:bg-gray-100 transition-colors"
              aria-label="ปิดรูปภาพ"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Prev / Next buttons */}
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-lg hover:bg-white transition-colors"
              aria-label="รูปก่อนหน้า"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-lg hover:bg-white transition-colors"
              aria-label="รูปถัดไป"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs sm:text-sm text-white/80">
              รูปที่ {currentIndex + 1} / {allImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


