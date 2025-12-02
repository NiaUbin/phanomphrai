import Link from 'next/link';
import HouseGallery from '@/components/HouseGallery';

// ข้อมูลบ้านทั้งหมด
const houseData: Record<string, {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  mainImage: string;
  images: string[];
  features: string[];
  specifications: {
    area: string;
    bedrooms: string;
    bathrooms: string;
    floors: string;
    style: string;
  };
  price: string;
}> = {
  '1': {
    id: '1',
    title: 'บ้านชั้นเดียว',
    description: 'ออกแบบและก่อสร้างอาคารสำนักงานสมัยใหม่',
    fullDescription: 'บ้านชั้นเดียวสไตล์โมเดิร์น ออกแบบมาอย่างพิถีพิถันเพื่อความสะดวกสบายและฟังก์ชันการใช้งานที่ครบถ้วน เหมาะสำหรับครอบครัวที่ต้องการพื้นที่ใช้สอยที่กว้างขวางในชั้นเดียว พร้อมด้วยการออกแบบที่ทันสมัยและวัสดุคุณภาพสูง',
    mainImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    ],
    features: [
      'ออกแบบโดยสถาปนิกมืออาชีพ',
      'ใช้วัสดุคุณภาพสูง มาตรฐาน',
      'ระบบไฟฟ้าและประปามาตรฐาน',
      'รับประกันงานก่อสร้าง 5 ปี',
      'พร้อมระบบรักษาความปลอดภัย',
      'พื้นที่ใช้สอยกว้างขวาง',
    ],
    specifications: {
      area: '150-200 ตร.ม.',
      bedrooms: '3-4 ห้องนอน',
      bathrooms: '2-3 ห้องน้ำ',
      floors: '1 ชั้น',
      style: 'โมเดิร์น',
    },
    price: 'เริ่มต้น 3,500,000 บาท',
  },
  '2': {
    id: '2',
    title: 'บ้านแถว',
    description: 'สร้างบ้านแถวสไตล์โมเดิร์น',
    fullDescription: 'บ้านแถวสไตล์โมเดิร์นที่ออกแบบมาอย่างทันสมัย พร้อมด้วยพื้นที่ใช้สอยที่เหมาะสมและฟังก์ชันการใช้งานที่ครบถ้วน เหมาะสำหรับครอบครัวที่ต้องการบ้านในทำเลดี พร้อมด้วยการออกแบบที่สวยงามและวัสดุคุณภาพสูง',
    mainImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    ],
    features: [
      'ออกแบบโดยสถาปนิกมืออาชีพ',
      'ใช้วัสดุคุณภาพสูง มาตรฐาน',
      'ระบบไฟฟ้าและประปามาตรฐาน',
      'รับประกันงานก่อสร้าง 5 ปี',
      'พร้อมระบบรักษาความปลอดภัย',
    ],
    specifications: {
      area: '80-120 ตร.ม.',
      bedrooms: '2-3 ห้องนอน',
      bathrooms: '2 ห้องน้ำ',
      floors: '2-3 ชั้น',
      style: 'โมเดิร์น',
    },
    price: 'เริ่มต้น 2,500,000 บาท',
  },
  '3': {
    id: '3',
    title: 'บ้านหรูพร้อมสระว่ายน้ำ',
    description: 'ออกแบบบ้านหรูพร้อมสระว่ายน้ำ',
    fullDescription: 'บ้านหรูสไตล์ลักซ์ชูรี่พร้อมสระว่ายน้ำส่วนตัว ออกแบบมาอย่างหรูหราและทันสมัย พร้อมด้วยพื้นที่ใช้สอยที่กว้างขวางและฟังก์ชันการใช้งานที่ครบถ้วน เหมาะสำหรับครอบครัวที่ต้องการความสะดวกสบายและความเป็นส่วนตัวสูงสุด',
    mainImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    ],
    features: [
      'ออกแบบโดยสถาปนิกมืออาชีพ',
      'สระว่ายน้ำส่วนตัว',
      'ใช้วัสดุคุณภาพสูง มาตรฐาน',
      'ระบบไฟฟ้าและประปามาตรฐาน',
      'รับประกันงานก่อสร้าง 5 ปี',
      'พร้อมระบบรักษาความปลอดภัย',
      'สวนสวยงาม',
    ],
    specifications: {
      area: '300-500 ตร.ม.',
      bedrooms: '4-5 ห้องนอน',
      bathrooms: '4-5 ห้องน้ำ',
      floors: '2-3 ชั้น',
      style: 'ลักซ์ชูรี่',
    },
    price: 'เริ่มต้น 15,000,000 บาท',
  },
  '4': {
    id: '4',
    title: 'คอนโดมิเนียม',
    description: 'รับสร้างคอนโดมิเนียมคุณภาพสูง',
    fullDescription: 'คอนโดมิเนียมคุณภาพสูงที่ออกแบบมาอย่างทันสมัย พร้อมด้วยพื้นที่ใช้สอยที่เหมาะสมและฟังก์ชันการใช้งานที่ครบถ้วน เหมาะสำหรับผู้ที่ต้องการที่อยู่อาศัยในทำเลดี พร้อมด้วยสิ่งอำนวยความสะดวกครบครัน',
    mainImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
    ],
    features: [
      'ออกแบบโดยสถาปนิกมืออาชีพ',
      'ใช้วัสดุคุณภาพสูง มาตรฐาน',
      'ระบบไฟฟ้าและประปามาตรฐาน',
      'รับประกันงานก่อสร้าง 5 ปี',
      'พร้อมสิ่งอำนวยความสะดวก',
    ],
    specifications: {
      area: '30-60 ตร.ม.',
      bedrooms: '1-2 ห้องนอน',
      bathrooms: '1-2 ห้องน้ำ',
      floors: '1 ชั้น',
      style: 'โมเดิร์น',
    },
    price: 'เริ่มต้น 2,000,000 บาท',
  },
  '5': {
    id: '5',
    title: 'อาคารพักอาศัย',
    description: 'ก่อสร้างอาคารพักอาศัยมาตรฐาน',
    fullDescription: 'อาคารพักอาศัยมาตรฐานที่ออกแบบมาอย่างทันสมัย พร้อมด้วยพื้นที่ใช้สอยที่เหมาะสมและฟังก์ชันการใช้งานที่ครบถ้วน เหมาะสำหรับครอบครัวที่ต้องการที่อยู่อาศัยในทำเลดี',
    mainImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
    ],
    features: [
      'ออกแบบโดยสถาปนิกมืออาชีพ',
      'ใช้วัสดุคุณภาพสูง มาตรฐาน',
      'ระบบไฟฟ้าและประปามาตรฐาน',
      'รับประกันงานก่อสร้าง 5 ปี',
    ],
    specifications: {
      area: '100-150 ตร.ม.',
      bedrooms: '2-3 ห้องนอน',
      bathrooms: '2 ห้องน้ำ',
      floors: '2-3 ชั้น',
      style: 'โมเดิร์น',
    },
    price: 'เริ่มต้น 4,500,000 บาท',
  },
  '6': {
    id: '6',
    title: 'อาคารพาณิชย์',
    description: 'รับสร้างอาคารพาณิชย์ครบวงจร',
    fullDescription: 'อาคารพาณิชย์ครบวงจรที่ออกแบบมาอย่างทันสมัย พร้อมด้วยพื้นที่ใช้สอยที่เหมาะสมและฟังก์ชันการใช้งานที่ครบถ้วน เหมาะสำหรับธุรกิจที่ต้องการพื้นที่สำหรับการค้าและการบริการ',
    mainImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
    ],
    features: [
      'ออกแบบโดยสถาปนิกมืออาชีพ',
      'ใช้วัสดุคุณภาพสูง มาตรฐาน',
      'ระบบไฟฟ้าและประปามาตรฐาน',
      'รับประกันงานก่อสร้าง 5 ปี',
      'พร้อมระบบรักษาความปลอดภัย',
    ],
    specifications: {
      area: '200-500 ตร.ม.',
      bedrooms: '-',
      bathrooms: '2-4 ห้องน้ำ',
      floors: '2-4 ชั้น',
      style: 'พาณิชย์',
    },
    price: 'เริ่มต้น 8,000,000 บาท',
  },
};

// ฟังก์ชันสำคัญ! สำหรับบอก Next.js ว่ามี ID อะไรบ้าง
export async function generateStaticParams() {
  return Object.keys(houseData).map((id) => ({
    id: id,
  }));
}

// เปลี่ยนเป็น async function และรับ params ผ่าน props
export default async function HouseDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const houseId = params.id;
  const house = houseData[houseId];
  
  // ไม่มี useState แล้ว

  if (!house) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">ไม่พบข้อมูลบ้าน</h1>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            กลับหน้าหลัก
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20 sm:pt-24">
      {/* Header Section */}
      <section className="relative pb-8 sm:pb-12 bg-gradient-to-b from-gray-50 to-white pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 sm:mb-8">
            <ol className="flex items-center gap-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-blue-600 transition-colors">
                  หน้าหลัก
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/#services" className="hover:text-blue-600 transition-colors">
                  บริการของเรา
                </Link>
              </li>
              <li>/</li>
              <li className="text-gray-900 font-medium">{house.title}</li>
            </ol>
          </nav>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            {house.title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl">
            {house.description}
          </p>
        </div>
      </section>

      {/* Gallery + Lightbox (client) */}
      <HouseGallery mainImage={house.mainImage} images={house.images} title={house.title} />

      {/* Content Section */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Description */}
              <div className="mb-8 sm:mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                  รายละเอียดโครงการ
                </h2>
                <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                  {house.fullDescription}
                </p>
              </div>

              {/* Features */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                  จุดเด่นของโครงการ
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {house.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-600 shrink-0 mt-0.5"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
                {/* Price */}
                <div className="mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-gray-200">
                  <h3 className="text-sm sm:text-base text-gray-600 mb-2">ราคาเริ่มต้น</h3>
                  <p className="text-2xl sm:text-3xl font-bold text-blue-600">{house.price}</p>
                </div>

                {/* Specifications */}
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                    ข้อมูลโครงการ
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm sm:text-base">พื้นที่ใช้สอย</span>
                      <span className="text-gray-900 font-semibold text-sm sm:text-base">{house.specifications.area}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm sm:text-base">ห้องนอน</span>
                      <span className="text-gray-900 font-semibold text-sm sm:text-base">{house.specifications.bedrooms}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm sm:text-base">ห้องน้ำ</span>
                      <span className="text-gray-900 font-semibold text-sm sm:text-base">{house.specifications.bathrooms}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm sm:text-base">จำนวนชั้น</span>
                      <span className="text-gray-900 font-semibold text-sm sm:text-base">{house.specifications.floors}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm sm:text-base">สไตล์</span>
                      <span className="text-gray-900 font-semibold text-sm sm:text-base">{house.specifications.style}</span>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3 sm:space-y-4">
                  <a
                    href="tel:0922620227"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.75 19.75 0 0 1-8.63-3.57 19.5 19.5 0 0 1-6-6A19.75 19.75 0 0 1 2.08 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72 13 13 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11l-1.3 1.3a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.11-.45 13 13 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    โทรสอบถาม
                  </a>
                  <Link
                    href="/#contact"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-4 bg-white text-blue-600 font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300 text-sm sm:text-base"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    ติดต่อเรา
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back Button */}
      <section className="py-8 sm:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors text-sm sm:text-base"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            กลับไปยังบริการของเรา
          </Link>
        </div>
      </section>
    </div>
  );
}