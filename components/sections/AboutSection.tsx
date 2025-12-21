/**
 * AboutSection - ส่วนเกี่ยวกับเรา (About Us Section)
 * SEO: บริษัทรับสร้างบ้าน, ออกแบบบ้าน, รับเหมาก่อสร้าง
 */
export default function AboutSection() {
  const features = [
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      ),
      title: 'ทีมช่างมืออาชีพ', 
      description: 'สถาปนิก วิศวกร ช่างฝีมือดี' 
    },
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
        </svg>
      ),
      title: 'วัสดุคุณภาพสูง', 
      description: 'เลือกใช้วัสดุมาตรฐานสูง' 
    },
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      title: 'รับประกันผลงาน', 
      description: 'มั่นใจได้ทุกโครงการ' 
    },
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'ราคายุติธรรม', 
      description: 'โปร่งใส ไม่มีบวกเพิ่ม' 
    },
  ];

  const stats = [
    { value: '10+', label: 'ปีประสบการณ์', color: 'from-blue-500 to-indigo-600' },
    { value: '100+', label: 'โครงการสำเร็จ', color: 'from-emerald-500 to-teal-600' },
    { value: '100%', label: 'ลูกค้าพึงพอใจ', color: 'from-amber-500 to-orange-600' },
    { value: '24/7', label: 'บริการดูแล', color: 'from-purple-500 to-pink-600' },
  ];

  return (
    <section 
      id="about" 
      className="py-16 sm:py-20 lg:py-28 bg-gradient-to-br from-white via-gray-50 to-blue-50 relative overflow-hidden"
      aria-label="เกี่ยวกับบริษัทรับสร้างบ้าน PHANOMPHRAI"
    >
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100/50 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            เกี่ยวกับเรา
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">PHANOMPHRAI</span>
            <span className="block text-lg sm:text-xl md:text-2xl lg:text-2xl mt-1.5 sm:mt-2 text-gray-700 font-semibold">
              บริษัทรับสร้างบ้าน ออกแบบบ้าน รับเหมาก่อสร้างครบวงจร
            </span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            บริการรับสร้างบ้าน ออกแบบบ้าน รับเหมาก่อสร้าง ต่อเติมบ้าน รีโนเวทบ้าน 
            ด้วยทีมสถาปนิกและวิศวกรมืออาชีพ ประสบการณ์กว่า 10 ปี มากกว่า 100+ โครงการสำเร็จ
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <div>
            {/* Description - Enhanced SEO Content */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                ผู้เชี่ยวชาญด้านการ<span className="text-blue-600">ออกแบบบ้าน</span>และ<span className="text-amber-600">รับเหมาก่อสร้าง</span>
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base md:text-lg">
                <strong className="text-gray-900">PHANOMPHRAI</strong> เป็น<strong className="text-gray-900">บริษัทรับสร้างบ้านครบวงจร</strong> 
                ให้บริการ<strong className="text-blue-600"> ออกแบบบ้าน</strong>, 
                <strong className="text-blue-600"> รับเหมาก่อสร้าง</strong>, 
                <strong className="text-blue-600"> ต่อเติมบ้าน</strong>, 
                <strong className="text-blue-600"> รีโนเวทบ้าน</strong> 
                และการตกแต่งภายใน ด้วยทีมสถาปนิกและวิศวกรมืออาชีพ ประสบการณ์กว่า 10 ปี
              </p>
              <p className="text-gray-700 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base md:text-lg">
                เรามุ่งเน้นการใช้วัสดุคุณภาพสูงระดับพรีเมียม ทำงานด้วยความละเอียดรอบคอบ 
                ราคายุติธรรม โปร่งใส ไม่มีค่าใช้จ่ายแอบแฝง และให้บริการด้วยใจ 
                เพื่อให้ลูกค้าได้รับผลงานที่ดีที่สุดตามความต้องการ พร้อมรับประกันผลงานทุกโครงการ
              </p>
              <p className="text-gray-600 leading-relaxed text-xs sm:text-sm md:text-base">
                บริการครอบคลุมทั่วประเทศไทย โดยเฉพาะพื้นที่อีสาน ร้อยเอ็ด พนมไพร 
                และจังหวัดใกล้เคียง พร้อมให้คำปรึกษาฟรี ไม่มีค่าใช้จ่าย
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="group flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300"
                >
                  <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-0.5 sm:mb-1 text-sm sm:text-base">{feature.title}</h4>
                    <p className="text-gray-500 text-xs sm:text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Stats */}
          <div className="relative">
            {/* Decorative Border */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-3xl opacity-10 blur-lg" />
            
            <div className="relative bg-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl border border-gray-100">
              <div className="text-center mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">ผลงานของเรา</h3>
                <p className="text-gray-500 text-sm">ตัวเลขที่พิสูจน์ความไว้วางใจ</p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div 
                    key={index} 
                    className="text-center p-4 rounded-xl bg-gray-50 hover:bg-white hover:shadow-md transition-all duration-300"
                  >
                    <div className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.color} mb-2`}>
                      {stat.value}
                    </div>
                    <div className="text-gray-600 font-medium text-sm sm:text-base">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-8 text-center">
                <a 
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span>ปรึกษาฟรี</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
