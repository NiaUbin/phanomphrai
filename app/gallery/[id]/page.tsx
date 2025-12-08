import { getDocs, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import GalleryDetailClient from './GalleryDetailClient';

// Generate static params สำหรับ gallery items ที่มีอยู่ตอน build
export async function generateStaticParams() {
  try {
    const querySnapshot = await getDocs(collection(db, "gallery"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Server Component wrapper ที่มี generateStaticParams
export default function GalleryDetailPage() {
  return <GalleryDetailClient />;
}

