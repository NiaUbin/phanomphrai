/**
 * Footer Component
 * Responsive Footer - สวยทั้งบน Desktop และ Mobile
 */

'use client';

import React, { memo, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, query, where, limit, getDocs } from 'firebase/firestore';
import { House } from '@/types';

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

  const phoneForLink = footerData.phone.replace(/-/g, '');

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
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold" itemProp="name">{footerData.companyName}</h3>
                <p className="text-blue-400 text-xs">{footerData.tagline}</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
              <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              {footerData.warranty}
            </div>
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
                  <Link 
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
                  </Link>
                ))}
              </div>
            ) : null}
            <div className="text-center mt-3">
              <Link 
                href="/#portfolio" 
                className="inline-flex items-center gap-1 text-xs font-medium text-amber-400"
              >
                ดูผลงานทั้งหมด →
              </Link>
            </div>
          </div>

          {/* 2 Columns: บริการ + ติดต่อ */}
          <div className="grid grid-cols-2 gap-6 py-6 border-y border-slate-800">
            {/* บริการ */}
            <div>
              <h4 className="text-sm font-bold text-white mb-3">บริการ</h4>
              <ul className="space-y-1.5">
                {footerData.services.map((service) => (
                  <li key={service} className="flex items-center gap-1.5 text-slate-400 text-xs">
                    <svg className="w-3 h-3 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            {/* ติดต่อ */}
            <div>
              <h4 className="text-sm font-bold text-white mb-3">ติดต่อเรา</h4>
              <div className="space-y-2 text-xs">
                <div className="text-slate-400">
                  <span className="block text-white font-medium text-[11px]">{footerData.address}</span>
                  {footerData.city} {footerData.postalCode}
                </div>
                <a href={`tel:${phoneForLink}`} className="flex items-center gap-1.5 text-slate-300">
                  <svg className="w-3.5 h-3.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {footerData.phone}
                </a>
                <a href={footerData.lineUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-slate-300">
                  <svg className="w-3.5 h-3.5 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                  </svg>
                  {footerData.lineId}
                </a>
              </div>
            </div>
          </div>

          {/* CTA + Social - Full Width */}
          <div className="text-center space-y-4">
            <a 
              href={footerData.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-green-500 text-white text-sm font-bold rounded-lg"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
              </svg>
              แชท LINE ปรึกษาฟรี
            </a>
            
            <div className="flex justify-center gap-3">
              <a href={footerData.facebookUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href={footerData.instagramUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href={footerData.lineUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800 hover:bg-green-500 rounded-lg flex items-center justify-center transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Tablet & Desktop Layout */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold" itemProp="name">{footerData.companyName}</h3>
                <p className="text-blue-400 text-xs">{footerData.tagline}</p>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed mb-4 hidden lg:block" itemProp="description">
              {footerData.description}
            </p>
            <div className="text-xs text-slate-400 flex items-center gap-1">
              <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              {footerData.warranty}
            </div>
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
                  <Link 
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
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-xs">ยังไม่มีผลงาน</p>
            )}
            <Link href="/#portfolio" className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-amber-400 hover:text-amber-300">
              ดูทั้งหมด →
            </Link>
          </div>

          {/* บริการ */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">บริการ</h4>
            <ul className="space-y-2">
              {footerData.services.map((service) => (
                <li key={service} className="flex items-center gap-1.5 text-slate-400 text-xs">
                  <svg className="w-3 h-3 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* ติดต่อ */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">ติดต่อเรา</h4>
            <div className="space-y-2.5 text-xs" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <div className="text-slate-400">
                <span className="block text-white font-medium" itemProp="streetAddress">{footerData.address}</span>
                <span itemProp="addressLocality">{footerData.city}</span> <span itemProp="postalCode">{footerData.postalCode}</span>
              </div>
              <a href={`tel:${phoneForLink}`} className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors" itemProp="telephone">
                <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {footerData.phone}
              </a>
              <a href={footerData.lineUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
                <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
                {footerData.lineId}
              </a>
            </div>
          </div>

          {/* Social & CTA */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">ติดตามเรา</h4>
            <div className="flex gap-2 mb-4">
              <a href={footerData.facebookUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href={footerData.instagramUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-slate-800 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href={footerData.lineUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-slate-800 hover:bg-green-500 rounded-lg flex items-center justify-center transition-all">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
              </a>
            </div>
            <a 
              href={footerData.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white text-xs font-bold rounded-lg hover:bg-green-600 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
              </svg>
              ปรึกษาฟรี
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] sm:text-xs text-slate-500">
            <p>© {new Date().getFullYear()} {footerData.companyName} - รับสร้างบ้าน ออกแบบบ้าน ทั่วประเทศ</p>
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