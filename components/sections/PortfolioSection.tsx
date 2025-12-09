'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { House } from '@/types';

// รับ props ชื่อ works มาจากหน้าหลัก (Optional)
export default function PortfolioSection({ works: initialWorks }: { works?: House[] }) {
  const [works, setWorks] = useState<House[]>(initialWorks || []);
  const [loading, setLoading] = useState<boolean>(!initialWorks);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // ถ้ามีข้อมูลจาก props แล้ว ไม่ต้อง fetch ใหม่
    if (initialWorks) {
      // เรียงลำดับตาม order (1, 2, 3, ... ถ้าไม่มี order = แสดงท้ายสุด)
      const sortedWorks = [...initialWorks].sort((a, b) => {
        // แปลง order เป็น number ถ้ายังเป็น string
        const orderA = typeof a.order === 'number' ? a.order : (a.order ? parseInt(String(a.order), 10) : 999999);
        const orderB = typeof b.order === 'number' ? b.order : (b.order ? parseInt(String(b.order), 10) : 999999);
        
        // ถ้า order เท่ากัน ให้เรียงตาม createdAt (ถ้ามี) หรือ id
        if (orderA === orderB) {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          if (dateA !== dateB) {
            return dateB - dateA; // ใหม่ก่อน
          }
          return (a.id || '').localeCompare(b.id || '');
        }
        
        return orderA - orderB;
      });
      setWorks(sortedWorks);
      setLoading(false);
      return;
    }

    const fetchWorks = async () => {
      try {
        // ดึงข้อมูลทั้งหมดจาก houses
        const q = collection(db, 'houses');
        const querySnapshot = await getDocs(q);
        const fetchedWorks = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as House));
        // เรียงลำดับตาม order (1, 2, 3, ... ถ้าไม่มี order = แสดงท้ายสุด)
        fetchedWorks.sort((a, b) => {
          // แปลง order เป็น number ถ้ายังเป็น string
          const orderA = typeof a.order === 'number' ? a.order : (a.order ? parseInt(String(a.order), 10) : 999999);
          const orderB = typeof b.order === 'number' ? b.order : (b.order ? parseInt(String(b.order), 10) : 999999);
          
          // ถ้า order เท่ากัน ให้เรียงตาม createdAt (ถ้ามี) หรือ id
          if (orderA === orderB) {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            if (dateA !== dateB) {
              return dateB - dateA; // ใหม่ก่อน
            }
            return (a.id || '').localeCompare(b.id || '');
          }
          
          return orderA - orderB;
        });
        setWorks(fetchedWorks);
      } catch (err) {
        console.error("Error fetching portfolio items:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
  }, [initialWorks]);

  if (error) {
    return (
      <section id="portfolio" className="py-10 bg-gray-100 text-center text-red-600">
        <p>Error loading portfolio: {error}</p>
        <p className="text-sm text-gray-500 mt-2">Please check your Firestore Security Rules.</p>
      </section>
    );
  }

  // ถ้าโหลดเสร็จแล้วและไม่มีข้อมูลเลย ให้แสดงข้อความว่าไม่มีข้อมูล
  if (!loading && (!works || works.length === 0)) {
    return (
      <section id="portfolio" className="pt-6 sm:pt-8 md:pt-10 pb-10 sm:pb-12 md:pb-16 lg:pb-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
              ผลงานของเรา
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-3 sm:mb-4">
              ยังไม่มีข้อมูลผลงานในขณะนี้
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="pt-6 sm:pt-8 md:pt-10 pb-10 sm:pb-12 md:pb-16 lg:pb-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
            ผลงานของเรา
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-3 sm:mb-4">
            ตัวอย่างผลงานที่ผ่านมา
          </p>
          <div className="flex justify-center">
            <div className="h-1 w-20 sm:w-24 md:w-28 rounded-full bg-yellow-400" />
          </div>
        </div>

        {/* Image Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-1 md:gap-1">
          {works.map((item) => (
            <Link
              key={item.id}
              href={`/house/${item.id}`}
              prefetch={true}
              className="group relative w-full h-[200px] sm:h-[220px] md:h-[240px] lg:h-[260px] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-500 border border-gray-200 hover:border-yellow-400 block cursor-pointer bg-white active:scale-[0.98]"
            >
              <Image
                src={item.mainImage || '/placeholder.jpg'} // ใช้รูปหลักจาก DB
                alt={item.title}
                fill
                loading="lazy"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 group-hover:from-black/95 group-hover:via-black/60 transition-all duration-500" />
              
              {/* Decorative Border on Hover */}
              <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/30 rounded-xl transition-all duration-500" />
              
              {/* Text Description Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5 transform translate-y-0 group-hover:translate-y-[-2px] transition-all duration-500">
                <div className="mb-1">
                  <div className="h-0.5 w-10 sm:w-12 bg-yellow-400 mb-2 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100" />
                </div>
                <h3 className="text-white font-bold text-base sm:text-lg md:text-xl mb-1 sm:mb-2 drop-shadow-2xl group-hover:text-yellow-400 transition-colors duration-300 leading-tight">
                  {item.title}
                </h3>
                <p className="text-white/95 text-xs sm:text-sm md:text-base leading-relaxed drop-shadow-lg line-clamp-2">
                  {item.description}
                </p>
                
                {/* View More Indicator */}
                <div className="mt-2 sm:mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-yellow-400 text-xs sm:text-sm font-semibold">ดูรายละเอียด</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="sm:w-5 sm:h-5 text-yellow-400 transform group-hover:translate-x-1 transition-transform duration-300"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Top Corner Badge */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                >
                  <path d="M7 17L17 7M7 7h10v10" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}