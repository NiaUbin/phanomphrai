/**
 * PromotionSection - ส่วนโปรโมชั่นและจุดเด่นของบริษัท
 * SEO: รับสร้างบ้าน, ออกแบบบ้าน, รับเหมาก่อสร้าง
 * Design: สะอาด เรียบง่าย น่าเชื่อถือ
 */
import Image from 'next/image';

export default function PromotionSection() {
  const services = [
    {
      title: 'สร้างบ้านใหม่',
      desc: 'ออกแบบและก่อสร้างบ้านตามความต้องการ',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
    },
    {
      title: 'ต่อเติม-รีโนเวท',
      desc: 'ต่อเติมพื้นที่ ปรับปรุงบ้านเก่าให้ดูใหม่',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
        </svg>
      ),
    },
    {
      title: 'ออกแบบบ้าน',
      desc: 'ออกแบบแปลนบ้าน 3D ตามสไตล์ที่ชอบ',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
        </svg>
      ),
    },
    {
      title: 'รับเหมาก่อสร้าง',
      desc: 'รับเหมางานก่อสร้างทุกประเภท',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
        </svg>
      ),
    },
  ];

  return (
    <section 
      id="promotion"
      className="py-16 sm:py-20 lg:py-24 bg-gray-50"
      aria-label="บริการรับสร้างบ้าน ออกแบบบ้าน"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left - Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative w-full h-[300px] sm:h-[360px] lg:h-[440px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1704821341745-c38ff405d052?w=900&auto=format&fit=crop&q=60"
                alt="ทีมวิศวกรและช่างมืออาชีพควบคุมงานก่อสร้างบ้าน - PHANOMPHRAI บริการรับสร้างบ้าน ออกแบบบ้าน รับเหมาก่อสร้างครบวงจร"
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            
            {/* Stats Card */}
            <div className="absolute -bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:w-auto bg-white rounded-xl shadow-lg p-4 border border-gray-100">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-blue-600">10+</p>
                  <p className="text-gray-500 text-xs">ปีประสบการณ์</p>
                </div>
                <div className="w-px h-10 bg-gray-200"></div>
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-blue-600">100+</p>
                  <p className="text-gray-500 text-xs">โครงการสำเร็จ</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="order-1 lg:order-2">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-2">บริการของเรา</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              รับสร้างบ้าน<span className="text-blue-600">ครบวงจร</span>
            </h2>
            
            <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base">
              <strong className="text-gray-900">PHANOMPHRAI</strong> ให้บริการ
              <strong> รับสร้างบ้าน</strong>, <strong>ออกแบบบ้าน</strong>, 
              <strong> รับเหมาก่อสร้าง</strong>, <strong>ต่อเติมบ้าน</strong>, 
              <strong> รีโนเวทบ้าน </strong> 
              ด้วยทีมสถาปนิกและวิศวกรมืออาชีพ ใช้วัสดุคุณภาพสูง ราคายุติธรรม 
              พร้อมรับประกันผลงานทุกโครงการ
            </p>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {services.map((service, idx) => (
                <div 
                  key={idx}
                  className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="shrink-0 w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{service.title}</h3>
                    <p className="text-gray-500 text-xs">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <a 
                href="tel:0922620227"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                โทรปรึกษาฟรี
              </a>
              <a 
                href="#portfolio"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg font-semibold text-sm hover:border-blue-500 hover:text-blue-600 transition-colors"
              >
                ดูผลงานของเรา
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* SEO Hidden Content */}
        <div className="sr-only">
          <p>
            PHANOMPHRAI บริษัทรับสร้างบ้านครบวงจร บริการออกแบบบ้าน รับเหมาก่อสร้าง ต่อเติมบ้าน รีโนเวทบ้าน 
            ด้วยทีมสถาปนิกและวิศวกรมืออาชีพ ประสบการณ์กว่า 10 ปี บริการทั่วประเทศไทย 
            สำนักงานใหญ่ร้อยเอ็ด รับงานก่อสร้าง สร้างบ้านโมเดิร์น บ้านสองชั้น บ้านชั้นเดียว ราคาถูก
          </p>
        </div>
      </div>
    </section>
  );
}
