'use client';

import { Suspense } from 'react';
import HouseDetailClient from '../[id]/HouseDetailClient';
import PageLoadingOverlay from '@/components/PageLoadingOverlay';

/**
 * Fallback page สำหรับ house IDs ที่ไม่ได้ถูก generate ตอน build time
 * ใช้ร่วมกับ Firebase Hosting rewrites
 * 
 * เมื่อ user เข้า /house/new-id ที่ไม่มีใน static files:
 * 1. Firebase rewrite ไป /house/fallback
 * 2. Page นี้จะ render HouseDetailClient ซึ่งใช้ client-side fetching
 * 
 * HouseDetailClient จะอ่าน house ID จาก URL path โดยตรง 
 * (ใช้ window.location.pathname)
 */

export default function HouseFallbackPage() {
  return (
    <Suspense fallback={<PageLoadingOverlay isVisible={true} />}>
      <HouseDetailClient />
    </Suspense>
  );
}

