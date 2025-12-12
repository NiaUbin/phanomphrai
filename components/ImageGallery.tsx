'use client';

import { memo, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';

interface ImageGalleryProps {
  images: string[];
  title: string;
}

function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const isClient = typeof window !== 'undefined';

  const openModal = (index: number) => setSelectedIndex(index);
  const closeModal = () => setSelectedIndex(null);

  const showNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => 
      prev === null ? null : (prev + 1) % images.length
    );
  }, [images.length]);

  const showPrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => 
      prev === null ? null : (prev - 1 + images.length) % images.length
    );
  }, [images.length]);

  useEffect(() => {
    if (selectedIndex === null) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // ป้องกัน error readonly property
    try {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'hidden';
      }
    } catch (e) {
      console.warn('Cannot set overflow hidden:', e);
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      try {
        if (typeof document !== 'undefined') {
          document.body.style.overflow = '';
        }
      } catch (e) {
        console.warn('Cannot reset overflow:', e);
      }
    };
  }, [selectedIndex, showNext, showPrev]);

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-2.5">
        {images.slice(0, 8).map((img, idx) => {
          const isLastVisible = idx === 7 && images.length > 8;
          const remainingCount = images.length - 8;

          return (
            <div
              key={idx}
              className="relative aspect-square overflow-hidden group cursor-pointer rounded-lg sm:rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
              onClick={() => openModal(idx)}
            >
              <Image
                src={img}
                alt={`${title} - ภาพที่ ${idx + 1}`}
                fill
                loading={idx < 8 ? "eager" : "lazy"}
                className={`object-cover transition-transform duration-500 ${isLastVisible ? 'group-hover:scale-105' : 'group-hover:scale-110'}`}
                sizes="(max-width: 640px) 25vw, (max-width: 768px) 20vw, (max-width: 1024px) 16vw, 12vw"
              />
              
              {/* Overlay */}
              {isLastVisible ? (
                <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/80 flex flex-col items-center justify-center transition-all duration-300 group-hover:from-blue-900/80 group-hover:to-indigo-900/80">
                  <span className="text-white font-bold text-xl sm:text-2xl md:text-lg drop-shadow-lg mb-0.5 flex items-center justify-center">+{remainingCount}</span>
                  <p className="text-white/90 text-xs sm:text-sm font-medium mt-0.5">ดูเพิ่มเติม</p>
                </div>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-800">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {isClient && selectedIndex !== null && createPortal(
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-lg"
          style={{ 
            zIndex: 2147483647,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh'
          }}
          onClick={closeModal}
        >
          {/* Header Bar */}
          <div 
            className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/60 to-transparent"
            style={{ zIndex: 2147483647 }}
          >
            {/* Counter */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <span className="text-blue-400 font-bold text-lg">{selectedIndex + 1}</span>
                <span className="text-white/40">/</span>
                <span className="text-white/80">{images.length}</span>
              </div>
              <span className="text-white/60 text-sm hidden sm:block">ใช้ ← → เพื่อเปลี่ยนรูป</span>
            </div>

            {/* Close Button */}
            <button 
              onClick={closeModal}
              className="flex items-center gap-2 bg-white/10 hover:bg-red-500 text-white px-4 py-2 rounded-full transition-all duration-300 backdrop-blur-md border border-white/20 hover:border-red-400 group"
              aria-label="ปิด"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="text-sm font-medium hidden sm:block">ปิด</span>
            </button>
          </div>

          {/* Main Image Container */}
          <div 
            className="absolute flex items-center justify-center"
            style={{ 
              top: '70px',
              left: '0',
              right: '0',
              bottom: '140px',
              zIndex: 2147483646
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Desktop Navigation - Left */}
            <button 
              onClick={showPrev}
              className="hidden md:flex absolute left-4 lg:left-8 bg-white/10 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 text-white p-4 rounded-2xl transition-all duration-300 backdrop-blur-md border border-white/20 hover:border-blue-400 hover:scale-110 shadow-2xl items-center justify-center group"
              style={{ zIndex: 2147483647 }}
              aria-label="รูปก่อนหน้า"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7 group-hover:-translate-x-0.5 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            {/* Image */}
            <div className="relative w-full h-full px-4 md:px-24 lg:px-32">
              <Image
                src={images[selectedIndex]}
                alt={`${title} - ภาพที่ ${selectedIndex + 1}`}
                fill
                quality={95}
                priority
                className="object-contain drop-shadow-2xl"
                sizes="95vw"
              />
            </div>

            {/* Desktop Navigation - Right */}
            <button 
              onClick={showNext}
              className="hidden md:flex absolute right-4 lg:right-8 bg-white/10 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 text-white p-4 rounded-2xl transition-all duration-300 backdrop-blur-md border border-white/20 hover:border-blue-400 hover:scale-110 shadow-2xl items-center justify-center group"
              style={{ zIndex: 2147483647 }}
              aria-label="รูปถัดไป"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7 group-hover:translate-x-0.5 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation - Below Image */}
          <div 
            className="md:hidden absolute left-0 right-0 flex items-center justify-center gap-6"
            style={{ bottom: '100px', zIndex: 2147483647 }}
          >
            <button 
              onClick={showPrev}
              className="bg-white/10 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 text-white p-4 rounded-2xl transition-all duration-300 backdrop-blur-md border border-white/20 hover:border-blue-400 active:scale-95 shadow-xl"
              aria-label="รูปก่อนหน้า"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            {/* Image Info - Mobile */}
            <div className="flex flex-col items-center">
              <span className="text-white font-bold text-lg">{selectedIndex + 1} / {images.length}</span>
              <span className="text-white/50 text-xs">แตะเพื่อเปลี่ยนรูป</span>
            </div>

            <button 
              onClick={showNext}
              className="bg-white/10 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 text-white p-4 rounded-2xl transition-all duration-300 backdrop-blur-md border border-white/20 hover:border-blue-400 active:scale-95 shadow-xl"
              aria-label="รูปถัดไป"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          {/* Thumbnail Strip */}
          <div 
            className="absolute left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent"
            style={{ bottom: 0, zIndex: 2147483647 }}
          >
            <div className="px-4 py-4">
              <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 scrollbar-hide">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedIndex(idx);
                    }}
                    className={`relative shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-lg overflow-hidden transition-all duration-300 ${
                      idx === selectedIndex 
                        ? 'ring-2 ring-blue-400 ring-offset-1 ring-offset-black shadow-lg shadow-blue-500/30' 
                        : 'ring-1 ring-white/20 opacity-50 hover:opacity-100 hover:ring-white/40'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                    {idx === selectedIndex && (
                      <div className="absolute inset-0 bg-blue-300/20"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

export default memo(ImageGallery);
