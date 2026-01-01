/**
 * Footer Component
 * Responsive Footer - สวยทั้งบน Desktop และ Mobile
 */

'use client';

import React, { memo, useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, query, where, limit, getDocs } from 'firebase/firestore';
import { House } from '@/types';
import FooterBrand from './footer/FooterBrand';
import FooterContact from './footer/FooterContact';
import FooterServices from './footer/FooterServices';
import FooterSocial from './footer/FooterSocial';

interface FooterData {
  companyName: string;
  tagline: string;
  description: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  lineId: string;
  lineUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  keywords: string[];
  services: string[];
  experience: string;
  warranty: string;
  seoText: string;
}

const defaultFooterData: FooterData = {
  companyName: 'PHANOMPHRAI',
  tagline: 'รับสร้างบ้านทั่วประเทศ',
  description: 'บริษัทรับสร้างบ้านและออกแบบครบวงจร โดยทีมวิศวกรและสถาปนิกมืออาชีพ การันตีไม่ทิ้งงาน สัญญาชัดเจน',
  address: 'สำนักงานใหญ่: อ.พนมไพร',
  city: 'ร้อยเอ็ด',
  postalCode: '45140',
  phone: '092-262-0227',
  lineId: '@phanomphrai',
  lineUrl: 'https://line.me/ti/p/~@phanomphrai',
  facebookUrl: 'https://facebook.com',
  instagramUrl: 'https://instagram.com',
  keywords: [
    'รับสร้างบ้าน',
    'ออกแบบบ้าน', 
    'รับเหมาก่อสร้าง',
    'แบบบ้านโมเดิร์น',
    'สร้างบ้านร้อยเอ็ด',
    'ต่อเติมบ้าน',
    'รีโนเวทบ้าน',
  ],
  services: [
    'สร้างบ้านใหม่',
    'ต่อเติม-รีโนเวท',
    'ออกแบบบ้าน',
    'ปรึกษาฟรี',
  ],
  experience: '10+',
  warranty: 'รับประกันโครงสร้าง 10 ปี',
  seoText: 'บริการรับสร้างบ้านทั่วประเทศไทย ด้วยทีมช่างมืออาชีพจากร้อยเอ็ด ออกแบบบ้านโมเดิร์น บ้านสไตล์ลอฟท์ บ้านสองชั้น ราคาเริ่มต้น คุณภาพคุ้มค่า ไม่ทิ้งงาน',
};

function Footer() {
  const pathname = usePathname();
  const footerData = defaultFooterData;
  
  const [featuredHouses, setFeaturedHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedHouses = async () => {
      try {
        const housesRef = collection(db, 'houses');
        const q = query(
          housesRef,
          where('isFeatured', '==', true),
          limit(6)
        );
        const snapshot = await getDocs(q);
        const houses = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as House[];
        houses.sort((a, b) => (a.order || 0) - (b.order || 0));
        setFeaturedHouses(houses.slice(0, 6));
      } catch (error) {
        console.error('Error fetching featured houses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedHouses();
  }, []);

  if (pathname !== '/') return null;

  return (
    <footer className="bg-slate-900 text-white" itemScope itemType="https://schema.org/Organization">
      
      {/* SEO Section */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3">
              รับสร้างบ้าน<span className="text-blue-400">ทั่วประเทศ</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              {footerData.seoText}
            </p>
          </div>
          
          {/* Keywords */}
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {footerData.keywords.map((keyword) => (
              <span 
                key={keyword} 
                className="px-2.5 py-1 bg-slate-800 border border-slate-700 text-slate-400 text-[10px] sm:text-xs rounded-full"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer - Responsive Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        
        {/* Mobile Layout: Stack vertically */}
        <div className="space-y-8 sm:hidden">
          
          {/* Brand - Full Width on Mobile */}
          <div className="text-center pb-6 border-b border-slate-800">
            <FooterBrand
              companyName={footerData.companyName}
              tagline={footerData.tagline}
              warranty={footerData.warranty}
            />
          </div>

          {/* ผลงานล่าสุด - Full Width on Mobile */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 text-center">ผลงานล่าสุด</h4>
            {loading ? (
              <div className="grid grid-cols-6 gap-1.5">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-square bg-slate-800 rounded animate-pulse" />
                ))}
              </div>
            ) : featuredHouses.length > 0 ? (
              <div className="grid grid-cols-6 gap-1.5">
                {featuredHouses.map((house) => (
                  <a 
                    key={house.id} 
                    href={`/house/${house.id}`}
                    className="group relative aspect-square rounded overflow-hidden bg-slate-800"
                  >
                    <Image
                      src={house.mainImage}
                      alt={house.title}
                      fill
                      className="object-cover"
                      sizes="50px"
                    />
                  </a>
                ))}
              </div>
            ) : null}
            <div className="text-center mt-3">
              <a 
                href={`/#portfolio`}
                className="inline-flex items-center gap-1 text-xs font-medium text-amber-400"
              >
                ดูผลงานทั้งหมด →
              </a>
            </div>
          </div>

          {/* 2 Columns: บริการ + ติดต่อ */}
          <div className="grid grid-cols-2 gap-6 py-6 border-y border-slate-800">
            <FooterServices services={footerData.services} />
            <FooterContact
              address={footerData.address}
              city={footerData.city}
              postalCode={footerData.postalCode}
              phone={footerData.phone}
              lineId={footerData.lineId}
              lineUrl={footerData.lineUrl}
              isMobile={true}
            />
          </div>

          {/* CTA + Social - Full Width */}
          <FooterSocial
            lineUrl={footerData.lineUrl}
            facebookUrl={footerData.facebookUrl}
            instagramUrl={footerData.instagramUrl}
            isMobile={true}
          />
        </div>

        {/* Tablet & Desktop Layout */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <FooterBrand
              companyName={footerData.companyName}
              tagline={footerData.tagline}
              description={footerData.description}
              warranty={footerData.warranty}
              showDescription={true}
            />
          </div>

          {/* ผลงานล่าสุด */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">ผลงานล่าสุด</h4>
            {loading ? (
              <div className="grid grid-cols-3 gap-1.5">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-square bg-slate-800 rounded animate-pulse" />
                ))}
              </div>
            ) : featuredHouses.length > 0 ? (
              <div className="grid grid-cols-3 gap-1.5">
                {featuredHouses.map((house) => (
                  <a 
                    key={house.id} 
                    href={`/house/${house.id}`}
                    className="group relative aspect-square rounded overflow-hidden bg-slate-800"
                  >
                    <Image
                      src={house.mainImage}
                      alt={house.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="60px"
                    />
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-xs">ยังไม่มีผลงาน</p>
            )}
            <a href={`/#portfolio`} className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-amber-400 hover:text-amber-300">
              ดูทั้งหมด →
            </a>
          </div>

          <FooterServices services={footerData.services} />
          <FooterContact
            address={footerData.address}
            city={footerData.city}
            postalCode={footerData.postalCode}
            phone={footerData.phone}
            lineId={footerData.lineId}
            lineUrl={footerData.lineUrl}
            isMobile={false}
          />
          <FooterSocial
            lineUrl={footerData.lineUrl}
            facebookUrl={footerData.facebookUrl}
            instagramUrl={footerData.instagramUrl}
            isMobile={false}
          />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] sm:text-xs text-slate-500">
            <p>© 2025 {footerData.companyName} - รับสร้างบ้าน ออกแบบบ้าน ทั่วประเทศ</p>
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                ไม่ทิ้งงาน
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                ประสบการณ์ {footerData.experience} ปี
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);