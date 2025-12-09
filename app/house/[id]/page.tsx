import { getDocs, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import HouseDetailClient from './HouseDetailClient';
import type { Metadata } from 'next';

// ฟังก์ชันนี้จะทำงานตอน Build - จำเป็นสำหรับ static export
// Generate static params สำหรับบ้านที่มีอยู่ตอน build
export async function generateStaticParams() {
  try {
    const querySnapshot = await getDocs(collection(db, "houses"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    // ถ้าเกิด error ให้ return empty array เพื่อให้ build ผ่าน
    // บ้านใหม่จะใช้ client-side rendering แทน (ผ่าน rewrites ใน firebase.json)
    return [];
  }
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'รายละเอียดบ้าน - PHANOMPHRAI',
    description: 'ดูรายละเอียดบ้านที่สร้างโดย PHANOMPHRAI',
  };
}

// Server Component wrapper ที่มี generateStaticParams
export default function HouseDetailPage() {
  return <HouseDetailClient />;
}
