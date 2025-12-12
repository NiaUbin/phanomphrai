'use client';

import React, { memo, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, limit, doc, getDoc } from 'firebase/firestore';

interface FeaturedHouse {
  id: string;
  title: string;
  mainImage: string;
}

interface FooterData {
  companyName: string;
  tagline: string;
  description: string;
  address: string;
  district: string;
  city: string;
  postalCode: string;
  phone: string;
  lineId: string;
  lineUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  keywords: string[];
  services: string;
  experience: string;
  warranty: string;
}

const defaultFooterData: FooterData = {
  companyName: 'PHANOMPHRAI รับสร้างบ้าน',
  tagline: 'บริษัทรับเหมาก่อสร้างครบวงจร',
  description: 'รับสร้างบ้าน ต่อเติมบ้าน รีโนเวทบ้าน ออกแบบบ้าน งานเหมาก่อสร้าง สร้างบ้านราคาถูก คุณภาพดี ประสบการณ์กว่า 10 ปี รับงานทั่วประเทศ กรุงเทพ ปริมณฑล และต่างจังหวัด',
  address: '57/11 ถ.เฉลิมพระเกียรติ 72 ต.บางปะกอก',
  district: 'บางปะกอก',
  city: 'กรุงเทพมหานคร',
  postalCode: '10540',
  phone: '092-262-0227',
  lineId: '@phanomphrai',
  lineUrl: 'https://line.me/ti/p/~@phanomphrai',
  facebookUrl: 'https://facebook.com',
  instagramUrl: 'https://instagram.com',
  keywords: ['รับสร้างบ้าน', 'ต่อเติมบ้าน', 'รีโนเวท', 'ออกแบบบ้าน'],
  services: 'สร้างบ้านใหม่ | ต่อเติมบ้าน | รีโนเวทบ้าน | ออกแบบบ้าน | งานโครงสร้าง',
  experience: '10+',
  warranty: 'รับประกันผลงาน',
};

// Document ID สำหรับ Footer (เหมือน heroContent)
const FOOTER_DOC_ID = 'main';

function Footer() {
  const pathname = usePathname();
  const [featuredHouses, setFeaturedHouses] = useState<FeaturedHouse[]>([]);
  const [footerData, setFooterData] = useState<FooterData>(defaultFooterData);

  // โหลดข้อมูล Footer จาก Firebase
  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const docRef = doc(db, 'footerContent', FOOTER_DOC_ID);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setFooterData({ ...defaultFooterData, ...docSnap.data() as FooterData });
        }
      } catch (error) {
        console.error('Error fetching footer data:', error);
      }
    };

    fetchFooterData();
  }, []);

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
          title: doc.data().title,
          mainImage: doc.data().mainImage
        }));
        setFeaturedHouses(houses);
      } catch (error) {
        console.error('Error fetching featured houses:', error);
      }
    };

    fetchFeaturedHouses();
  }, []);

  if (pathname !== '/') return null;

  // Format phone number for tel: link
  const phoneForLink = footerData.phone.replace(/-/g, '');

  return (
    <footer className="bg-slate-900 text-white" itemScope itemType="https://schema.org/Organization">
      
      {/* Main section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">

          {/* Brand & Description */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold" itemProp="name">{footerData.companyName}</h3>
                <p className="text-slate-400 text-xs">{footerData.tagline}</p>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed mb-4" itemProp="description">
              {footerData.description}
            </p>

            {/* SEO Keywords */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {footerData.keywords.map((tag) => (
                <span key={tag} className="px-2 py-0.5 bg-slate-800 text-slate-400 text-xs rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">ติดต่อเรา</h4>

            <address className="not-italic space-y-2.5 text-xs" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <p className="text-slate-400" itemProp="streetAddress">{footerData.address}</p>
              <p className="text-slate-400">
                <span itemProp="addressLocality">{footerData.city}</span> <span itemProp="postalCode">{footerData.postalCode}</span>
              </p>

              <div className="pt-2 space-y-2">
                <a href={`tel:${phoneForLink}`} className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors" itemProp="telephone">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-blue-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  {footerData.phone}
                </a>
                <a href={footerData.lineUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:text-green-400 transition-colors">
                  <svg className="w-4 h-4 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                  </svg>
                  {footerData.lineId}
                </a>
              </div>
            </address>

            {/* Social Icons */}
            <div className="flex gap-2 mt-4">
              <a href={footerData.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-8 h-8 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href={footerData.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-8 h-8 bg-slate-800 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Latest Projects */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">ผลงานล่าสุด</h4>

            {featuredHouses.length > 0 ? (
              <div className="grid grid-cols-3 gap-1.5 max-w-[150px]">
                {featuredHouses.slice(0, 6).map((house) => (
                  <Link 
                    key={house.id} 
                    href={`/house/${house.id}`}
                    className="relative w-12 h-12 rounded overflow-hidden group"
                    title={house.title}
                  >
                    <Image
                      src={house.mainImage}
                      alt={`ผลงานสร้างบ้าน - ${house.title}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform"
                      sizes="48px"
                    />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-1.5 max-w-[150px]">
                {[1,2,3,4,5,6].map((i) => (
                  <div key={i} className="w-12 h-12 bg-slate-800 rounded animate-pulse"></div>
                ))}
              </div>
            )}

            <Link href="/#portfolio" className="inline-flex items-center gap-1.5 mt-3 text-xs text-slate-400 hover:text-white transition-colors">
              ดูผลงานทั้งหมด →
            </Link>

            {/* Services SEO */}
            <div className="mt-4 pt-4 border-t border-slate-800">
              <p className="text-xs text-slate-500 leading-relaxed">
                บริการ: {footerData.services}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} {footerData.companyName} - {footerData.tagline}</p>
          <div className="flex items-center gap-4">
            <span>✓ {footerData.warranty}</span>
            <span>✓ ประสบการณ์ {footerData.experience} ปี</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
