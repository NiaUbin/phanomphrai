import { getDocs, collection, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import HouseDetailClient from './HouseDetailClient';
import type { Metadata, Viewport } from 'next';

// Viewport แยกออกมาตาม Next.js 16
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ฟังก์ชันนี้จะทำงานตอน Build - จำเป็นสำหรับ static export
export async function generateStaticParams() {
  try {
    const querySnapshot = await getDocs(collection(db, "houses"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Dynamic Metadata สำหรับ SEO แต่ละหน้าบ้าน
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const docRef = doc(db, "houses", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const house = docSnap.data();
      const title = house.title || 'รายละเอียดบ้าน';
      const description = house.description || house.fullDescription || 'ดูรายละเอียดบ้านที่สร้างโดย PHANOMPHRAI';
      const mainImage = house.mainImage || '/og-image.jpg';
      
      return {
        title: `${title} | ผลงานสร้างบ้าน`,
        description: `${description.slice(0, 150)}... ออกแบบและก่อสร้างโดย PHANOMPHRAI ทีมช่างมืออาชีพ`,
        keywords: [
          title,
          "ผลงานสร้างบ้าน",
          "ออกแบบบ้าน",
          "รับสร้างบ้าน",
          "แบบบ้านสวย",
          "PHANOMPHRAI",
          house.specifications?.style || "บ้านโมเดิร์น",
        ],
        openGraph: {
          title: `${title} | PHANOMPHRAI`,
          description: description.slice(0, 200),
          type: "article",
          url: `https://phanomphrai-c99bd.web.app/house/${id}`,
          images: [
            {
              url: mainImage,
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
        },
        twitter: {
          card: "summary_large_image",
          title: `${title} | PHANOMPHRAI`,
          description: description.slice(0, 150),
          images: [mainImage],
        },
        alternates: {
          canonical: `https://phanomphrai-c99bd.web.app/house/${id}`,
        },
      };
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
  }
  
  // Fallback metadata
  return {
    title: 'รายละเอียดบ้าน | PHANOMPHRAI',
    description: 'ดูรายละเอียดบ้านที่ออกแบบและก่อสร้างโดย PHANOMPHRAI ด้วยทีมช่างมืออาชีพ วัสดุคุณภาพ',
  };
}

// Server Component wrapper ที่มี generateStaticParams
export default function HouseDetailPage() {
  return <HouseDetailClient />;
}
