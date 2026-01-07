'use client';

import { memo, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
// 1. นำเข้า Library สำหรับการซูม
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isHoveringMainImage, setIsHoveringMainImage] = useState(false); // เพิ่ม state เพื่อซ่อน/แสดงปุ่มซูม

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
      {/* Gallery Grid (ส่วนนี้เหมือนเดิม) */}
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
      {isClient && createPortal(
        <AnimatePresence>
          {selectedIndex !== null && (
            <motion.div 
              initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
              exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 bg-black/60" // เพิ่มความเข้มพื้นหลังเล็กน้อย
              style={{ 
                zIndex: 2147483647,
                // ... (styles เดิม)
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100dvh'
              }}
              onClick={closeModal}
            >
              {/* Header Bar (ส่วนนี้เหมือนเดิม) */}
              <motion.div 
                initial={{ y: -16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{ duration: 0.35, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 pt-[calc(0.75rem+env(safe-area-inset-top,0px))] pb-3 bg-gradient-to-b from-black/60 to-transparent"
                style={{ zIndex: 2147483647 }}
              >
                 {/* Counter */}
                 <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                    <span className="text-blue-400 font-bold text-lg">{selectedIndex + 1}</span>
                    <span className="text-white/40">/</span>
                    <span className="text-white/80">{images.length}</span>
                  </div>
                  <span className="text-white/60 text-sm font-medium hidden sm:block">ใช้ ← → เพื่อเปลี่ยนรูป, ดับเบิ้ลคลิกเพื่อซูม</span>
                </div>

                {/* Close Button */}
                <button 
                  onClick={closeModal}
                  className="flex items-center gap-2 bg-white/10 hover:bg-red-500/80 text-white px-4 py-2 rounded-full transition-all duration-300 backdrop-blur-md border border-white/20 hover:border-red-500/50"
                  aria-label="ปิด"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-sm font-medium hidden sm:block">ปิด</span>
                </button>
              </motion.div>

              {/* Main Image Container */}
              <motion.div 
                className="absolute flex items-center justify-center overflow-hidden" // เพิ่ม overflow-hidden
                style={{ 
                  top: '70px',
                  left: '0',
                  right: '0',
                  bottom: 'calc(120px + env(safe-area-inset-bottom, 0px))', // ปรับ bottom ให้มีที่ว่างมากขึ้น
                  zIndex: 2147483646
                }}
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={() => setIsHoveringMainImage(true)}
                onMouseLeave={() => setIsHoveringMainImage(false)}
              >
                 {/* Desktop Navigation - Left */}
                 <button 
                  onClick={showPrev}
                  className="hidden md:flex absolute left-4 lg:left-8 bg-white/5 hover:bg-white/20 text-white p-4 rounded-2xl transition-all duration-300 backdrop-blur-xl border border-white/10 hover:border-white/30 shadow-2xl items-center justify-center group"
                  style={{ zIndex: 2147483647 }}
                  aria-label="รูปก่อนหน้า"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7 group-active:scale-90 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>

                {/* 2. ส่วนแสดงผลรูปภาพพร้อมระบบซูม */}
                <motion.div 
                  initial={{ scale: 0.97, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.97, opacity: 0 }}
                  transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                  // นำ padding ออกจากตรงนี้เพื่อให้พื้นที่ซูมเต็มคอนเทนเนอร์
                  className="relative w-full h-full flex items-center justify-center"
                >
                  <TransformWrapper
                    initialScale={1}
                    minScale={1}
                    maxScale={4} // ซูมได้สูงสุด 4 เท่า
                    centerOnInit={true}
                    doubleClick={{ disabled: false, mode: "reset" }} // ดับเบิ้ลคลิกเพื่อรีเซ็ต
                    // 3. สำคัญ: ใช้ key เพื่อรีเซ็ตการซูมเมื่อเปลี่ยนรูป
                    key={selectedIndex}
                    wheel={{ step: 0.2 }} // ความเร็วในการใช้ลูกกลิ้งเมาส์ซูม
                  >
                    {({ zoomIn, zoomOut, resetTransform }) => (
                      <>
                        {/* Zoom Controls (Desktop) - แสดงเมื่อเอาเมาส์ไปชี้ */}
                        <div 
                            className={`hidden md:flex absolute bottom-6 right-6 flex-col gap-2 transition-opacity duration-300 ${isHoveringMainImage ? 'opacity-100' : 'opacity-0'}`} 
                            style={{ zIndex: 2147483648 }}
                        >
                            <button onClick={() => zoomIn()} className="bg-white/10 hover:bg-white/30 text-white p-2.5 rounded-xl backdrop-blur-md border border-white/20 shadow-sm active:scale-95 transition-all" aria-label="ซูมเข้า">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                            </button>
                            <button onClick={() => zoomOut()} className="bg-white/10 hover:bg-white/30 text-white p-2.5 rounded-xl backdrop-blur-md border border-white/20 shadow-sm active:scale-95 transition-all" aria-label="ซูมออก">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" /></svg>
                            </button>
                            <button onClick={() => resetTransform()} className="bg-white/10 hover:bg-white/30 text-white p-2.5 rounded-xl backdrop-blur-md border border-white/20 shadow-sm active:scale-95 transition-all" aria-label="รีเซ็ตการซูม">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 9l6 6m0-6l-6 6" /></svg>
                            </button>
                        </div>

                        <TransformComponent
                          wrapperStyle={{ width: "100%", height: "100%" }}
                          contentStyle={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
                        >
                           {/* จำเป็นต้องมี div หุ้ม next/image อีกชั้นเพื่อให้ fill ทำงานถูกต้องภายใน transform component */}
                           <div className="relative w-full h-full px-4 md:px-16 lg:px-24 py-4"> 
                              <Image
                                src={images[selectedIndex]}
                                alt={`${title} - ภาพที่ ${selectedIndex + 1}`}
                                fill
                                quality={95}
                                priority
                                // ลบ drop-shadow ออกเพื่อให้ประสิทธิภาพการซูมดีขึ้น
                                className="object-contain"
                                sizes="95vw"
                                draggable={false} // ป้องกันการลากรูปภาพของ browser
                              />
                          </div>
                        </TransformComponent>
                      </>
                    )}
                  </TransformWrapper>
                </motion.div>

                 {/* Desktop Navigation - Right */}
                 <button 
                  onClick={showNext}
                  className="hidden md:flex absolute right-4 lg:right-8 bg-white/5 hover:bg-white/20 text-white p-4 rounded-2xl transition-all duration-300 backdrop-blur-xl border border-white/10 hover:border-white/30 shadow-2xl items-center justify-center group"
                  style={{ zIndex: 2147483647 }}
                  aria-label="รูปถัดไป"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7 group-active:scale-90 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </motion.div>

              {/* Mobile Navigation - Below Image (ส่วนนี้เหมือนเดิม) */}
              <div 
                className="md:hidden absolute left-0 right-0 flex items-center justify-center gap-6"
                style={{ bottom: 'calc(90px + env(safe-area-inset-bottom, 0px))', zIndex: 2147483647 }}
              >
                <button 
                  onClick={showPrev}
                  className="bg-white/5 hover:bg-white/20 text-white p-4 rounded-2xl transition-all duration-300 backdrop-blur-xl border border-white/10 hover:border-white/30 active:scale-95 shadow-xl"
                  aria-label="รูปก่อนหน้า"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>

                {/* Image Info - Mobile */}
                <div className="flex flex-col items-center">
                  <span className="text-white font-bold text-lg">{selectedIndex + 1} / {images.length}</span>
                  <span className="text-white/50 text-xs">แตะเพื่อเปลี่ยน, จีบนิ้วเพื่อซูม</span>
                </div>

                <button 
                  onClick={showNext}
                  className="bg-white/5 hover:bg-white/20 text-white p-4 rounded-2xl transition-all duration-300 backdrop-blur-xl border border-white/10 hover:border-white/30 active:scale-95 shadow-xl"
                  aria-label="รูปถัดไป"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>

              {/* Thumbnail Strip (ส่วนนี้เหมือนเดิม) */}
              <motion.div 
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 80, opacity: 0 }}
                transition={{ duration: 0.35, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent"
                style={{ bottom: 0, zIndex: 2147483647 }}
              >
                <div className="px-4 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom,20px))]">
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
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

export default memo(ImageGallery);