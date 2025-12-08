'use client';

import { useState, useEffect } from 'react';
import { useParams, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { db } from '@/lib/firebase'; 
import { doc, getDoc } from 'firebase/firestore';
import ImageGallery from '@/components/ImageGallery';

// กำหนดหน้าตาข้อมูลให้ตรงกับที่คุณใช้
interface HouseData {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  mainImage: string;
  images: string[];
  features: string[];
  price: string;
  specifications?: {
    area: string;
    bedrooms: string;
    bathrooms: string;
    floors?: string;
    style?: string;
    // งานเพิ่มเติม - สามารถแก้ไขชื่อหัวข้อได้
    work1Label?: string;
    work1Detail?: string;
    work2Label?: string;
    work2Detail?: string;
    work3Label?: string;
    work3Detail?: string;
  };
}

// Client Component สำหรับแสดงผล
export default function HouseDetailClient() {
  const params = useParams();
  const pathname = usePathname();
  const [id, setId] = useState<string | null>(null);
  const [house, setHouse] = useState<HouseData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // ดึง ID จาก params หรือ URL (สำหรับ static export)
  useEffect(() => {
    // ลองดึงจาก useParams ก่อน
    let houseId = params?.id as string;
    
    // ถ้าไม่มี ให้ดึงจาก pathname หรือ URL โดยตรง (สำหรับ static export)
    if (!houseId) {
      if (pathname) {
        const match = pathname.match(/\/house\/([^\/]+)/);
        if (match) {
          houseId = match[1];
        }
      }
      
      // ถ้ายังไม่มี ให้ดึงจาก window.location (fallback)
      if (!houseId && typeof window !== 'undefined') {
        const pathParts = window.location.pathname.split('/');
        const houseIndex = pathParts.indexOf('house');
        if (houseIndex !== -1 && pathParts[houseIndex + 1]) {
          houseId = pathParts[houseIndex + 1];
        }
      }
    }
    
    setId(houseId || null);
  }, [params, pathname]);

  useEffect(() => {
    const fetchHouseData = async () => {
      if (!id) {
        setError('ไม่พบ ID');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const docRef = doc(db, "houses", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setHouse({ id: docSnap.id, ...docSnap.data() } as HouseData);
          setError(null);
        } else {
          setError('ไม่พบข้อมูล');
        }
      } catch (err) {
        console.error('Error fetching house data:', err);
        setError('เกิดข้อผิดพลาดในการโหลดข้อมูล');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHouseData();
  }, [id]);

  // ตรวจสอบ scroll position เพื่อแสดง/ซ่อนปุ่ม scroll to top
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const scrollY = window.scrollY;
        setShowScrollTop(scrollY > 300); // แสดงปุ่มเมื่อ scroll ลงมา 300px
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // ตรวจสอบครั้งแรก

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ฟังก์ชัน scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

  // Error state หรือไม่พบข้อมูล
  if (error || !house) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 pt-20">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">ไม่พบข้อมูลบ้าน</h1>
          <p className="text-gray-600 mb-6">{error || 'ขออภัย ไม่พบข้อมูลที่คุณต้องการ'}</p>
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
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
            {house.title}
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
              href="/#portfolio" 
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/#portfolio';
              }}
              className="hover:text-amber-600 transition-colors"
            >
              Project
            </Link>
            <span>/</span>
            <span className="text-gray-400 truncate max-w-[200px] sm:max-w-xs">{house.title}</span>
          </nav>
        </div>

        {/* Main Image */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="relative w-full aspect-[3/2] overflow-hidden shadow-xl border border-gray-200">
            {house.mainImage && (
              <Image
                src={house.mainImage}
                alt={house.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 768px"
              />
            )}
          </div>
          <div>
            <p className="text-black-500 text-sm font-bold mt-4">
              <span className="text-blue-500">คลิกเพื่อดูภาพผลงาน</span> 
            </p>
          </div>

          {/* Gallery - ใต้รูปหลัก */}
          {house.images && house.images.length > 0 && (
            <div className="mt-4">
              <ImageGallery images={house.images} title={house.title} />
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {/* Price */}
            {house.price && house.price.trim() !== '' && (
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-amber-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-bold text-gray-900">{house.price}</span>
              </div>
            )}
            
            {house.specifications && (
              <>
                {house.specifications.bedrooms && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="test-xl">🛏️</span>
                    <span className="text-sm">{house.specifications.bedrooms} ห้องนอน</span>
                  </div>
                )}
                {house.specifications.bathrooms && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-xl">🚽</span>
                    <span className="text-sm">{house.specifications.bathrooms} ห้องน้ำ</span>
                  </div>
                )}
                {house.specifications.area && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                    </svg>
                    <span className="text-sm">{house.specifications.area} ตร.ม.</span>
                  </div>
                )}
              </>
            )}
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
                  รายละเอียดโครงการ
                </h2>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                  {house.fullDescription || house.description}
                </p>
              </div>

              {/* รายละเอียดงาน - Work Details */}
              {house.specifications && (house.specifications.work1Detail || house.specifications.work2Detail || house.specifications.work3Detail) && (
                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                  <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-blue-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                      </svg>
                    </div>
                    รายละเอียดงานที่ทำ
                  </h2>
                  <div className="space-y-3">
                    {/* งานที่ 1 */}
                    {house.specifications.work1Detail && (
                      <div className="flex items-start gap-2.5 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0"></div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm mb-0.5">{house.specifications.work1Label || 'งานไฟฟ้า'}</h3>
                          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                            {house.specifications.work1Detail}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* งานที่ 2 */}
                    {house.specifications.work2Detail && (
                      <div className="flex items-start gap-2.5 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 shrink-0"></div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm mb-0.5">{house.specifications.work2Label || 'งานประปา'}</h3>
                          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                            {house.specifications.work2Detail}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* งานที่ 3 */}
                    {house.specifications.work3Detail && (
                      <div className="flex items-start gap-2.5 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 shrink-0"></div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm mb-0.5">{house.specifications.work3Label || 'งานอื่นๆ'}</h3>
                          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                            {house.specifications.work3Detail}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Features */}
              {house.features && house.features.length > 0 && (
                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                  <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-emerald-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.746 3.746 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                      </svg>
                    </div>
                    จุดเด่นของโครงการ
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {house.features.map((feature, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center gap-2 p-2 sm:p-3 bg-gray-50 hover:bg-emerald-50 rounded-lg transition-colors group"
                      >
                        <div className="w-6 h-6 bg-emerald-100 rounded flex items-center justify-center shrink-0 group-hover:bg-emerald-200 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 text-emerald-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-xs sm:text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
                    {/* Price Summary */}
                    {house.price && house.price.trim() !== '' && (
                      <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-600 text-sm sm:text-base">ราคาเริ่มต้น</span>
                        </div>
                        <p className="text-2xl sm:text-3xl font-bold text-gray-900">{house.price}</p>
                      </div>
                    )}

                    {/* Specs Summary */}
                    {house.specifications && (
                      <div className="mb-6 space-y-3">
                        {house.specifications.bedrooms && (
                          <div className="flex items-center justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600 text-sm sm:text-base flex items-center gap-2">
                              <span className="text-lg">🛏️</span>
                              ห้องนอน
                            </span>
                            <span className="font-semibold text-gray-900">{house.specifications.bedrooms}</span>
                          </div>
                        )}
                        {house.specifications.bathrooms && (
                          <div className="flex items-center justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600 text-sm sm:text-base flex items-center gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                              </svg>
                              ห้องน้ำ
                            </span>
                            <span className="font-semibold text-gray-900">{house.specifications.bathrooms}</span>
                          </div>
                        )}
                        {house.specifications.area && (
                          <div className="flex items-center justify-between py-2">
                            <span className="text-gray-600 text-sm sm:text-base flex items-center gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                              </svg>
                              พื้นที่ใช้สอย
                            </span>
                            <span className="font-semibold text-gray-900">{house.specifications.area} ตร.ม.</span>
                          </div>
                        )}
                      </div>
                    )}

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
                        href="https://line.me/ti/p/~"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 sm:py-4 bg-[#06C755] text-white rounded-xl font-semibold hover:bg-[#05b04d] transition-all active:scale-[0.98] text-sm sm:text-base"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                        </svg>
                        แชท LINE
                      </a>
                      <Link 
                        href="/#contact" 
                        className="flex items-center justify-center gap-2 w-full py-3 sm:py-4 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-blue-600 hover:text-blue-600 transition-all active:scale-[0.98] text-sm sm:text-base"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                        ส่งข้อความ
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Back Button */}
                <Link 
                  href="/#portfolio" 
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = '/#portfolio';
                  }}
                  className="mt-4 flex items-center justify-center gap-2 w-full py-3 text-gray-600 hover:text-blue-600 transition-colors text-sm sm:text-base"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                  ดูผลงานทั้งหมด
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-110 active:scale-95 group"
          aria-label="กลับขึ้นด้านบน"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2.5} 
            stroke="currentColor" 
            className="w-6 h-6 group-hover:translate-y-[-2px] transition-transform duration-300"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M4.5 15.75l7.5-7.5 7.5 7.5" 
            />
          </svg>
          <span className="absolute -top-2 -right-2 w-3 h-3 bg-amber-400 rounded-full animate-pulse"></span>
        </button>
      )}
    </div>
  );
}

