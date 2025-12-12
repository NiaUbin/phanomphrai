'use client';

import { Suspense } from 'react';
import GalleryDetailClient from '../[id]/GalleryDetailClient';

/**
 * Fallback page สำหรับ gallery IDs ที่ไม่ได้ถูก generate ตอน build time
 * ใช้ร่วมกับ Firebase Hosting rewrites
 * 
 * เมื่อ user เข้า /gallery/new-id ที่ไม่มีใน static files:
 * 1. Firebase rewrite ไป /gallery/fallback
 * 2. Page นี้จะ render GalleryDetailClient ซึ่งใช้ client-side fetching
 * 
 * GalleryDetailClient จะอ่าน gallery ID จาก URL path โดยตรง 
 * (ใช้ window.location.pathname)
 */

// Loading component
function LoadingFallback() {
  return (
    <div className="fixed inset-0 z-50 min-h-screen bg-gradient-to-br from-gray-100 via-amber-50/50 to-gray-100 flex items-center justify-center px-4">
      <div className="relative bg-white/40 backdrop-blur-2xl rounded-3xl border border-white/60 shadow-2xl shadow-white/20 p-8 sm:p-12 max-w-md w-full">
        <div className="relative text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-white/30 backdrop-blur-sm"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-white/80 border-r-white/60 animate-spin" style={{ animationDuration: '1s' }}></div>
            <div className="absolute inset-4 rounded-full bg-white/50 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/40">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8 text-gray-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-gray-700 font-semibold text-lg sm:text-xl backdrop-blur-sm">กำลังโหลดข้อมูล...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GalleryFallbackPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <GalleryDetailClient />
    </Suspense>
  );
}
