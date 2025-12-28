/**
 * ContactSection - ส่วนติดต่อเรา
 * SEO: ติดต่อบริษัทรับสร้างบ้าน, ปรึกษาฟรี
 * Design: สะอาด เรียบง่าย น่าเชื่อถือ สีน้อย
 */
export default function ContactSection() {
  const contactInfo = [
    {
      type: 'phone',
      title: 'โทรศัพท์',
      value: '092-262-0227',
      href: 'tel:0922620227',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      ),
    },
    {
      type: 'line',
      title: 'LINE',
      value: '@phanomphrai',
      href: 'https://line.me/ti/p/~@phanomphrai',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
        </svg>
      ),
    },
    {
      type: 'location',
      title: 'สำนักงาน',
      value: 'อ.พนมไพร จ.ร้อยเอ็ด',
      href: '#',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section 
      id="contact" 
      className="py-16 sm:py-20 lg:py-24 bg-gray-50"
      aria-label="ติดต่อบริษัทรับสร้างบ้าน PHANOMPHRAI"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-2">ติดต่อเรา</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            พร้อมเริ่มต้น<span className="text-blue-600">โครงการบ้านในฝัน</span>หรือยัง?
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            ติดต่อเราวันนี้เพื่อรับคำปรึกษาฟรี ไม่มีค่าใช้จ่าย 
            บริการรับสร้างบ้าน ออกแบบบ้าน รับเหมาก่อสร้าง ต่อเติมบ้าน รีโนเวทบ้าน
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactInfo.map((info) => (
            <a
              key={info.type}
              href={info.href}
              target={info.type === 'line' ? '_blank' : undefined}
              rel={info.type === 'line' ? 'noopener noreferrer' : undefined}
              className={`group flex flex-col items-center text-center p-6 sm:p-8 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 ${info.type === 'location' ? 'cursor-default' : ''}`}
            >
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-4 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {info.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{info.title}</h3>
              <p className="text-gray-600 font-medium group-hover:text-blue-600 transition-colors">
                {info.value}
              </p>
            </a>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <a
              href="tel:0922620227"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-xl hover:bg-blue-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              โทร 092-262-0227
            </a>

            <a
              href="https://line.me/ti/p/~@phanomphrai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#06C755] text-white text-lg font-bold rounded-xl hover:bg-[#05B34C] transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
              </svg>
              แชท LINE
            </a>
          </div>

          {/* Trust Message */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              ปรึกษาฟรี ไม่มีค่าใช้จ่าย
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              ตอบกลับภายใน 24 ชั่วโมง
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              บริการทั่วประเทศ
            </span>
          </div>
        </div>

        {/* SEO Hidden Content */}
        <div className="sr-only">
          <p>
            ติดต่อ PHANOMPHRAI บริษัทรับสร้างบ้าน ออกแบบบ้าน รับเหมาก่อสร้าง ต่อเติมบ้าน รีโนเวทบ้าน 
            โทร 092-262-0227 LINE @phanomphrai สำนักงานใหญ่ร้อยเอ็ด บริการทั่วประเทศไทย
          </p>
        </div>
      </div>
    </section>
  );
}
