/**
 * AboutSection - ส่วนเกี่ยวกับเรา
 * SEO: บริษัทรับสร้างบ้าน, ออกแบบบ้าน, รับเหมาก่อสร้าง
 * Design: สะอาด เรียบง่าย น่าเชื่อถือ สีน้อย
 */
export default function AboutSection() {
  const features = [
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      ),
      title: 'ทีมช่างมืออาชีพ', 
      description: 'สถาปนิก วิศวกร ช่างฝีมือดี ประสบการณ์กว่า 10 ปี' 
    },
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
        </svg>
      ),
      title: 'วัสดุคุณภาพสูง', 
      description: 'เลือกใช้วัสดุมาตรฐาน มอก. รับประกันคุณภาพ' 
    },
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      title: 'รับประกันโครงสร้าง', 
      description: 'การันตีคุณภาพ รับประกันงานโครงสร้าง 10 ปี' 
    },
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'ราคาโปร่งใส', 
      description: 'ราคายุติธรรม ไม่มีค่าใช้จ่ายแอบแฝง สัญญาชัดเจน' 
    },
  ];

  const stats = [
    { value: '10+', label: 'ปีประสบการณ์' },
    { value: '100+', label: 'โครงการสำเร็จ' },
    { value: '100%', label: 'ลูกค้าพึงพอใจ' },
  ];

  return (
    <section 
      id="about" 
      className="py-16 sm:py-20 lg:py-24 bg-white"
      aria-label="เกี่ยวกับบริษัทรับสร้างบ้าน PHANOMPHRAI"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-2">เกี่ยวกับเรา</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            บริษัทรับสร้างบ้าน<span className="text-blue-600">ครบวงจร</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            PHANOMPHRAI ให้บริการรับสร้างบ้าน ออกแบบบ้าน รับเหมาก่อสร้าง ต่อเติมบ้าน รีโนเวทบ้าน 
            ด้วยทีมสถาปนิกและวิศวกรมืออาชีพ ประสบการณ์กว่า 10 ปี บริการทั่วประเทศ
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left - Content */}
          <div>
            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
                ทำไมต้องเลือก <span className="text-blue-600">PHANOMPHRAI</span>
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">
                เราคือผู้เชี่ยวชาญด้านการ<strong>รับสร้างบ้าน</strong>และ<strong>ออกแบบบ้าน</strong>ครบวงจร 
                มุ่งเน้นคุณภาพ ใช้วัสดุมาตรฐานสูง ทำงานด้วยความละเอียดรอบคอบ 
                พร้อมรับประกันผลงานทุกโครงการ เพื่อให้ลูกค้าได้รับบ้านที่ดีที่สุดตามความต้องการ
              </p>
              <p className="text-gray-500 text-sm">
                บริการครอบคลุมทั่วประเทศไทย โดยเฉพาะภาคอีสาน ร้อยเอ็ด และจังหวัดใกล้เคียง 
                พร้อมให้คำปรึกษาฟรี ไม่มีค่าใช้จ่าย
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors"
                >
                  <div className="shrink-0 w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm">{feature.title}</h4>
                    <p className="text-gray-500 text-xs leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Stats Card */}
          <div className="bg-gray-50 rounded-2xl p-8 lg:p-10 border border-gray-100">
            <div className="text-center mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">ผลงานที่พิสูจน์ความไว้วางใจ</h3>
              <p className="text-gray-500 text-sm">ตัวเลขจากประสบการณ์จริง</p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-600 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-xs sm:text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 pt-8">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-full border-2 border-blue-600 flex items-center justify-center shadow-sm">
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">รับประกันโครงสร้าง 10 ปี</p>
                    <p className="text-gray-500 text-xs">มั่นใจได้ทุกโครงการ</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 text-center">
              <a 
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors"
              >
                ปรึกษาฟรี
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
            สำนักงานใหญ่ร้อยเอ็ด รับงานก่อสร้างภาคอีสาน และทุกจังหวัดทั่วประเทศ
          </p>
        </div>
      </div>
    </section>
  );
}
