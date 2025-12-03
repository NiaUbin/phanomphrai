import Image from 'next/image';
import Link from 'next/link';
// เรียกใช้ Database จากไฟล์ที่คุณเพิ่งสร้าง
import { db } from '@/lib/firebase'; 
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';

// กำหนดหน้าตาข้อมูลให้ตรงกับที่คุณใช้ (เผื่อไว้)
interface HouseData {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  mainImage: string;
  images: string[];
  features: string[];
  price: string;
  // ข้อมูลสเปคบ้าน (ถ้าใน Database ยังไม่ใส่ ให้มันเป็น optional ไปก่อน)
  specifications?: {
    area: string;
    bedrooms: string;
    bathrooms: string;
    floors: string;
    style: string;
  };
}

// 1. ฟังก์ชันนี้จะทำงานตอน Build: ไปดูว่ามีบ้าน ID อะไรบ้างใน Database
export async function generateStaticParams() {
  // ดึงข้อมูลบ้านทั้งหมดจาก Collection 'houses'
  const querySnapshot = await getDocs(collection(db, "houses"));
  
  // ส่งกลับรายการ ID ทั้งหมดเพื่อให้ Next.js รู้ว่าต้องสร้างหน้าไหนบ้าง
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
  }));
}

// ฟังก์ชันช่วยดึงข้อมูลทีละหลัง
async function getHouseData(id: string) {
  const docRef = doc(db, "houses", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as HouseData;
  } else {
    return null;
  }
}

// 2. ส่วนหน้าเว็บหลัก
export default async function HouseDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const house = await getHouseData(params.id);

  // ถ้าหาข้อมูลไม่เจอ (เช่น ใส่ ID มั่ว)
  if (!house) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">ไม่พบข้อมูลบ้าน</h1>
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
            กลับหน้าหลัก
          </Link>
        </div>
      </div>
    );
  }

  // เตรียมรูปภาพ (ถ้ามีแค่ mainImage ก็ใช้อันเดียว ถ้ามี images ด้วยก็เอามาต่อกัน)
  const allImages = house.images ? [house.mainImage, ...house.images] : [house.mainImage];

  return (
    <div className="min-h-screen bg-white pt-20 sm:pt-24">
      {/* Header Section */}
      <section className="relative pb-8 sm:pb-12 bg-gradient-to-b from-gray-50 to-white pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 sm:mb-8">
            <ol className="flex items-center gap-2 text-sm text-gray-600">
              <li><Link href="/" className="hover:text-blue-600">หน้าหลัก</Link></li>
              <li>/</li>
              <li><Link href="/#services" className="hover:text-blue-600">บริการของเรา</Link></li>
              <li>/</li>
              <li className="text-gray-900 font-medium">{house.title}</li>
            </ol>
          </nav>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            {house.title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl">
            {house.description}
          </p>
        </div>
      </section>

      {/* Main Image */}
      <section className="mb-8 sm:mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden shadow-xl rounded-lg">
            {house.mainImage && (
              <Image
                src={house.mainImage}
                alt={house.title}
                fill
                className="object-cover"
                priority
              />
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
            
            {/* Left Column */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">รายละเอียดโครงการ</h2>
                <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                  {house.fullDescription || house.description}
                </p>
              </div>

              {/* Gallery Grid */}
              {house.images && house.images.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">ภาพเพิ่มเติม</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {house.images.map((img, idx) => (
                      <div key={idx} className="relative w-full h-[150px] sm:h-[200px] overflow-hidden rounded-lg">
                        <Image src={img} alt={`Gallery ${idx}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Features List */}
              {house.features && house.features.length > 0 && (
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">จุดเด่น</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {house.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                         <div className="w-2 h-2 bg-blue-600 rounded-full" />
                         <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column (Sidebar) */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <div className="mb-6 border-b border-gray-200 pb-6">
                  <h3 className="text-gray-600 mb-2">ราคาเริ่มต้น</h3>
                  <p className="text-2xl font-bold text-blue-600">{house.price}</p>
                </div>

                {/* แสดงข้อมูล Specifications (ถ้ามีใน DB) */}
                {house.specifications && (
                  <div className="mb-6 space-y-3">
                     <h3 className="font-bold text-gray-900">ข้อมูลโครงการ</h3>
                     <div className="flex justify-between"><span>พื้นที่</span><span className="font-semibold">{house.specifications.area}</span></div>
                     <div className="flex justify-between"><span>ห้องนอน</span><span className="font-semibold">{house.specifications.bedrooms}</span></div>
                     <div className="flex justify-between"><span>ห้องน้ำ</span><span className="font-semibold">{house.specifications.bathrooms}</span></div>
                  </div>
                )}

                <div className="space-y-3">
                  <a href="tel:0922620227" className="block w-full py-3 bg-blue-600 text-white text-center rounded-lg font-semibold hover:bg-blue-700 transition">
                    โทรสอบถาม
                  </a>
                  <Link href="/#contact" className="block w-full py-3 border-2 border-blue-600 text-blue-600 text-center rounded-lg font-semibold hover:bg-blue-50 transition">
                    ติดต่อเรา
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}