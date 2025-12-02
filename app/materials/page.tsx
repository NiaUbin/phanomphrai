'use client';

import Image from 'next/image';
import Link from 'next/link';

const materials = [
  {
    id: 1,
    name: 'ปูนซีเมนต์',
    category: 'วัสดุก่อสร้าง',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80',
    description: 'ปูนซีเมนต์คุณภาพสูง สำหรับงานก่อสร้างทุกประเภท',
    price: 'เริ่มต้น 150 บาท/ถุง',
  },
  {
    id: 2,
    name: 'อิฐมอญ',
    category: 'วัสดุก่อสร้าง',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80',
    description: 'อิฐมอญมาตรฐาน สำหรับงานก่อสร้างผนัง',
    price: 'เริ่มต้น 3 บาท/ก้อน',
  },
  {
    id: 3,
    name: 'เหล็กเสริมคอนกรีต',
    category: 'วัสดุก่อสร้าง',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80',
    description: 'เหล็กเสริมคอนกรีตคุณภาพสูง มาตรฐาน TIS',
    price: 'เริ่มต้น 25,000 บาท/ตัน',
  },
  {
    id: 4,
    name: 'กระเบื้องหลังคา',
    category: 'วัสดุมุงหลังคา',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80',
    description: 'กระเบื้องหลังคาคุณภาพสูง ทนทานต่อสภาพอากาศ',
    price: 'เริ่มต้น 50 บาท/แผ่น',
  },
  {
    id: 5,
    name: 'ท่อ PVC',
    category: 'วัสดุประปา',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
    description: 'ท่อ PVC สำหรับงานประปาและระบายน้ำ',
    price: 'เริ่มต้น 100 บาท/เส้น',
  },
  {
    id: 6,
    name: 'สีทาบ้าน',
    category: 'วัสดุทาสี',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80',
    description: 'สีทาบ้านคุณภาพสูง ทนแดด ทนฝน',
    price: 'เริ่มต้น 500 บาท/แกลลอน',
  },
  {
    id: 7,
    name: 'ไม้แปรรูป',
    category: 'วัสดุไม้',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
    description: 'ไม้แปรรูปคุณภาพ สำหรับงานก่อสร้างและตกแต่ง',
    price: 'เริ่มต้น 200 บาท/แผ่น',
  },
  {
    id: 8,
    name: 'กระจก',
    category: 'วัสดุกระจก',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
    description: 'กระจกใสคุณภาพสูง สำหรับงานก่อสร้าง',
    price: 'เริ่มต้น 300 บาท/ตร.ม.',
  },
];

const categories = ['ทั้งหมด', 'วัสดุก่อสร้าง', 'วัสดุมุงหลังคา', 'วัสดุประปา', 'วัสดุทาสี', 'วัสดุไม้', 'วัสดุกระจก'];

export default function MaterialsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              วัสดุก่อสร้าง
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              จำหน่ายวัสดุก่อสร้างคุณภาพสูง ราคาเป็นธรรม พร้อมบริการส่งถึงที่
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-gray-200 sticky top-[88px] sm:top-[96px] z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-700 font-medium rounded-full whitespace-nowrap transition-all duration-300"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Materials Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {materials.map((material) => (
              <div
                key={material.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
              >
                {/* Image */}
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={material.image}
                    alt={material.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {material.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {material.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {material.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-bold text-lg">{material.price}</span>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                      สั่งซื้อ
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center px-6 sm:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ต้องการคำปรึกษาเกี่ยวกับวัสดุก่อสร้าง?
          </h2>
          <p className="text-blue-100 text-lg md:text-xl mb-8">
            ติดต่อเราวันนี้เพื่อรับคำแนะนำและราคาพิเศษ
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:0813433149"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.75 19.75 0 0 1-8.63-3.57 19.5 19.5 0 0 1-6-6A19.75 19.75 0 0 1 2.08 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72 13 13 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11l-1.3 1.3a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.11-.45 13 13 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>081-343-3149</span>
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" />
                <path d="M9 22V12H15V22" />
              </svg>
              <span>กลับหน้าหลัก</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

