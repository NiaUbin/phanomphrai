'use client';

import { useState, useEffect } from 'react';
import { useParams, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { db } from '@/lib/firebase'; 
import { doc, getDoc } from 'firebase/firestore';
import ImageGallery from '@/components/ImageGallery';
import PageLoadingOverlay from '@/components/PageLoadingOverlay';

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
    work1Label?: string;
    work1Detail?: string;
    work2Label?: string;
    work2Detail?: string;
    work3Label?: string;
    work3Detail?: string;
  };
}

export default function HouseDetailClient() {
  const params = useParams();
  const pathname = usePathname();
  const [id, setId] = useState<string | null>(null);
  const [house, setHouse] = useState<HouseData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    let houseId = params?.id as string;
    
    if (!houseId) {
      if (pathname) {
        const match = pathname.match(/\/house\/([^\/]+)/);
        if (match) {
          houseId = match[1];
        }
      }
      
      if (!houseId && typeof window !== 'undefined') {
        const pathParts = window.location.pathname.split('/');
        const houseIndex = pathParts.indexOf('house');
        if (houseIndex !== -1 && pathParts[houseIndex + 1]) {
          houseId = pathParts[houseIndex + 1];
        }
      }
    }
    
    // Decode URL encoded characters (สำคัญสำหรับ ID ที่เป็นภาษาไทย)
    if (houseId) {
      try {
        houseId = decodeURIComponent(houseId);
      } catch (e) {
        // ถ้า decode ไม่ได้ ใช้ค่าเดิม
        console.warn('Failed to decode house ID:', e);
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

  // Loading state - ใช้ PageLoadingOverlay component
  if (isLoading) {
    return <PageLoadingOverlay isVisible={true} />;
  }

  // Error state
  if (error || !house) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-28 h-28 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-8 rotate-3 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">ไม่พบข้อมูลบ้าน</h1>
          <p className="text-gray-600 mb-8">{error || 'ขออภัย ไม่พบข้อมูลที่คุณต้องการ'}</p>
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all hover:-translate-y-0.5"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      
      {/* Hero Section with Main Image */}
      <section className="relative pt-20 sm:pt-24">
        {/* Background Decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent h-96 pointer-events-none"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 pt-4">
            <Link 
              href="/" 
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/';
              }}
              className="flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              หน้าแรก
            </Link>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
            <Link 
              href="/#portfolio" 
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/#portfolio';
              }}
              className="hover:text-blue-600 transition-colors"
            >
              ผลงาน
            </Link>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
            <span className="text-gray-400 truncate max-w-[150px] sm:max-w-xs">{house.title}</span>
          </nav>

          {/* Title Section */}
          <div className="mb-8">
            <h1 className="text-xl text-center sm:text-2xl md:text-3xl font-bold text-blue-800 leading-tight mb-4">
              {house.title}
            </h1>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
              {house.price && house.price.trim() !== '' && (
                <div className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 rounded-xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="font-bold text-amber-700">{house.price}</span>
                </div>
              )}
              
              {house.specifications && (
                <>
                  {house.specifications.bedrooms && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-100 rounded-lg shadow-sm">
                      <span className="text-sm">🛏️</span>
                      <span className="text-gray-600 text-sm">{house.specifications.bedrooms} ห้องนอน</span>
                    </div>
                  )}
                  {house.specifications.bathrooms && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-100 rounded-lg shadow-sm">
                      <span className="text-sm">🚿</span>
                      <span className="text-gray-600 text-sm">{house.specifications.bathrooms} ห้องน้ำ</span>
                    </div>
                  )}
                  {house.specifications.area && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-100 rounded-lg shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                      </svg>
                      <span className="text-gray-600 text-sm">{house.specifications.area} ตร.ม.</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-12 sm:pb-16 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Left Column: Images & Details */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Main Image */}
              <div className="relative">
                <div className="relative w-full aspect-[16/10] rounded-2xl sm:rounded-2xl overflow-hidden shadow-2xl shadow-gray-300/50 group">
                  {house.mainImage && (
                    <Image
                      src={house.mainImage}
                      alt={house.title}
                      fill
                      className="object-cover transition-transform duration-700"
                      priority
                      sizes="(max-width: 1024px) 100vw, 66vw"
                    />
                  )}
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                {/* Gallery Hint */}
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">
                    <span className="text-blue-600 font-medium">👆 คลิกที่ภาพด้านล่าง</span> เพื่อดูรูปภาพขนาดใหญ่
                  </p>
                </div>
              </div>

              {/* Gallery Grid */}
              {house.images && house.images.length > 0 && (
                <div className="bg-white rounded-2xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                    </div>
                    รูปภาพผลงาน ({house.images.length} รูป)
                  </h2>
                  <ImageGallery images={house.images} title={house.title} />
                </div>
              )}

              {/* Description Card */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </div>
                  รายละเอียดโครงการ
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {house.fullDescription || house.description}
                  </p>
                </div>
              </div>

              {/* Work Details */}
              {house.specifications && (house.specifications.work1Detail || house.specifications.work2Detail || house.specifications.work3Detail) && (
                <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                      </svg>
                    </div>
                    รายละเอียดงานที่ทำ
                  </h2>
                  <div className="space-y-6">
                    {house.specifications.work1Detail && (
                      <div className="flex gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:shadow-md transition-shadow">
                        <div className="w-3 h-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mt-1.5 shrink-0"></div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{house.specifications.work1Label || 'งานไฟฟ้า'}</h3>
                          <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                            {house.specifications.work1Detail}
                          </p>
                        </div>
                      </div>
                    )}

                    {house.specifications.work2Detail && (
                      <div className="flex gap-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl hover:shadow-md transition-shadow">
                        <div className="w-3 h-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full mt-1.5 shrink-0"></div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{house.specifications.work2Label || 'งานประปา'}</h3>
                          <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                            {house.specifications.work2Detail}
                          </p>
                        </div>
                      </div>
                    )}

                    {house.specifications.work3Detail && (
                      <div className="flex gap-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl hover:shadow-md transition-shadow">
                        <div className="w-3 h-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full mt-1.5 shrink-0"></div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{house.specifications.work3Label || 'งานอื่นๆ'}</h3>
                          <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm sm:text-base">
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
                <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                      </svg>
                    </div>
                    จุดเด่นของโครงการ
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {house.features.map((feature, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 hover:from-emerald-50 hover:to-teal-50 rounded-xl transition-all duration-300 group cursor-default"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        </div>
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                {/* Contact Card */}
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                  {/* Header */}
                  <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 p-6 sm:p-8 text-white overflow-hidden">
                    {/* Decorative circles */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
                    
                    <div className="relative">
                      <h3 className="text-xl sm:text-2xl font-bold mb-2">สนใจโครงการนี้?</h3>
                      <p className="text-blue-100">ติดต่อเราเพื่อรับข้อมูลเพิ่มเติม</p>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8">
                    {/* Price */}
                    {house.price && house.price.trim() !== '' && (
                      <div className="mb-6 p-5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-100">
                        <span className="text-gray-600 text-sm">ราคาเริ่มต้น</span>
                        <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                          {house.price}
                        </p>
                      </div>
                    )}

                    {/* Specs Summary */}
                    {house.specifications && (
                      <div className="mb-6 space-y-4">
                        {house.specifications.bedrooms && (
                          <div className="flex items-center justify-between py-3 border-b border-gray-100">
                            <span className="text-gray-600 flex items-center gap-3">
                              <span className="text-xl">🛏️</span>
                              ห้องนอน
                            </span>
                            <span className="font-bold text-gray-900 text-lg">{house.specifications.bedrooms}</span>
                          </div>
                        )}
                        {house.specifications.bathrooms && (
                          <div className="flex items-center justify-between py-3 border-b border-gray-100">
                            <span className="text-gray-600 flex items-center gap-3">
                              <span className="text-xl">🚿</span>
                              ห้องน้ำ
                            </span>
                            <span className="font-bold text-gray-900 text-lg">{house.specifications.bathrooms}</span>
                          </div>
                        )}
                        {house.specifications.area && (
                          <div className="flex items-center justify-between py-3">
                            <span className="text-gray-600 flex items-center gap-3">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                              </svg>
                              พื้นที่ใช้สอย
                            </span>
                            <span className="font-bold text-gray-900 text-lg">{house.specifications.area} ตร.ม.</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* CTA Buttons */}
                    <div className="space-y-3">
                      <a 
                        href="tel:0922620227" 
                        className="flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all hover:-translate-y-0.5 active:scale-[0.98]"
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
                        className="flex items-center justify-center gap-3 w-full py-4 bg-[#06C755] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/30 transition-all hover:-translate-y-0.5 active:scale-[0.98]"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                        </svg>
                        แชท LINE
                      </a>
                      <Link 
                        href="/#contact" 
                        className="flex items-center justify-center gap-3 w-full py-4 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-blue-600 hover:text-blue-600 transition-all active:scale-[0.98]"
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
                  className="mt-6 flex items-center justify-center gap-2 w-full py-4 text-gray-500 hover:text-blue-600 transition-colors group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:-translate-x-1 transition-transform">
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
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl shadow-2xl shadow-blue-500/30 transition-all duration-500 hover:shadow-blue-500/50 hover:scale-110 active:scale-95 group ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="กลับขึ้นด้านบน"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={2.5} 
          stroke="currentColor" 
          className="w-6 h-6 group-hover:-translate-y-1 transition-transform"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
      </button>
    </div>
  );
}
