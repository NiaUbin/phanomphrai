'use client';

import { useState, useEffect } from 'react';
import { useParams, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { db } from '@/lib/firebase'; 
import { doc, getDoc } from 'firebase/firestore';

interface GalleryData {
  id: string;
  title?: string;
  description: string;
  imageUrl: string;
  order?: number;
  houseId?: string;
}

export default function GalleryDetailClient() {
  const params = useParams();
  const pathname = usePathname();
  const [id, setId] = useState<string | null>(null);
  const [gallery, setGallery] = useState<GalleryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // ดึง ID จาก params หรือ URL
  useEffect(() => {
    let galleryId = params?.id as string;
    
    if (!galleryId) {
      if (pathname) {
        const match = pathname.match(/\/gallery\/([^\/]+)/);
        if (match) {
          galleryId = match[1];
        }
      }
      
      if (!galleryId && typeof window !== 'undefined') {
        const pathParts = window.location.pathname.split('/');
        const galleryIndex = pathParts.indexOf('gallery');
        if (galleryIndex !== -1 && pathParts[galleryIndex + 1]) {
          galleryId = pathParts[galleryIndex + 1];
        }
      }
    }
    
    setId(galleryId || null);
  }, [params, pathname]);

  useEffect(() => {
    const fetchGalleryData = async () => {
      if (!id) {
        setError('ไม่พบ ID');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const docRef = doc(db, "gallery", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setGallery({ id: docSnap.id, ...docSnap.data() } as GalleryData);
          setError(null);
        } else {
          setError('ไม่พบข้อมูล');
        }
      } catch (err) {
        console.error('Error fetching gallery data:', err);
        setError('เกิดข้อผิดพลาดในการโหลดข้อมูล');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGalleryData();
  }, [id]);

  // ตรวจสอบ scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const scrollY = window.scrollY;
        setShowScrollTop(scrollY > 300);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

  if (error || !gallery) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">ไม่พบข้อมูล</h1>
          <p className="text-gray-600 mb-6">{error || 'ไม่พบข้อมูลการันตีคุณภาพนี้'}</p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            กลับหน้าหลัก
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Title Section */}
      <section className="pt-20 sm:pt-24 pb-6 sm:pb-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Title */}
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-amber-700 mb-3 leading-tight">
            {gallery.title || 'การันตีคุณภาพ'}
          </h1>
          
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-8">
            <Link 
              href="/" 
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/';
              }}
              className="hover:text-amber-600 transition-colors"
            >
              Home
            </Link>
            <span>/</span>
            <Link 
              href="/#services" 
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/#services';
              }}
              className="hover:text-amber-600 transition-colors"
            >
              การันตีคุณภาพ
            </Link>
            {gallery.title && (
              <>
                <span>/</span>
                <span className="text-gray-400 truncate max-w-[200px] sm:max-w-xs">{gallery.title}</span>
              </>
            )}
          </nav>
        </div>

        {/* Main Image */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="relative w-full aspect-[718/418] overflow-hidden shadow-xl border border-gray-200">
            <Image
              src={gallery.imageUrl}
              alt={gallery.title || gallery.description}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-6 sm:py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-5 sm:space-y-6">
              
              {/* Description */}
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-blue-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </div>
                  รายละเอียด
                </h2>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                  {gallery.description}
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 sm:top-24">
                {/* Contact Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-5 sm:p-6 text-white">
                    <h3 className="text-lg sm:text-xl font-bold mb-1">สนใจโครงการนี้?</h3>
                    <p className="text-blue-100 text-sm sm:text-base">ติดต่อเราเพื่อรับข้อมูลเพิ่มเติม</p>
                  </div>

                  <div className="p-5 sm:p-6">
                    {/* CTA Buttons */}
                    <div className="space-y-3">
                      <a 
                        href="tel:0922620227" 
                        className="flex items-center justify-center gap-2 w-full py-3 sm:py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all active:scale-[0.98] text-sm sm:text-base"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                        โทรสอบถาม
                      </a>
                      <a 
                        href="#contact" 
                        className="flex items-center justify-center gap-2 w-full py-3 sm:py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all active:scale-[0.98] text-sm sm:text-base"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                        ส่งข้อความ
                      </a>
                    </div>
                  </div>
                </div>

                {/* Link to House Detail (if linked) */}
                {gallery.houseId && (
                  <div className="mt-5 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="p-5 sm:p-6">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">ผลงานที่เกี่ยวข้อง</h3>
                      <Link
                        href={`/house/${gallery.houseId}`}
                        className="flex items-center justify-center gap-2 w-full py-3 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition-all active:scale-[0.98] text-sm sm:text-base"
                      >
                        <span>ดูรายละเอียดผลงาน</span>
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
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-amber-600 text-white p-3 rounded-full shadow-lg hover:bg-amber-700 transition-all duration-300 hover:scale-110"
          aria-label="Scroll to top"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
      )}
    </div>
  );
}

