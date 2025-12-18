/**
 * ContactSection - ส่วนติดต่อเรา (Contact Section)
 * SEO: ติดต่อบริษัทรับสร้างบ้าน, ปรึกษาฟรี
 */
export default function ContactSection() {
  const contactInfo = [
    {
      type: 'phone',
      title: 'โทรศัพท์',
      value: '092-262-0227',
      href: 'tel:0922620227',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      ),
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
    },
    {
      type: 'line',
      title: 'LINE',
      value: '@phanomphrai',
      href: 'https://line.me/ti/p/~@phanomphrai',
      icon: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
        </svg>
      ),
      color: 'from-emerald-500 to-green-600',
      bgColor: 'bg-emerald-50',
    },
    {
      type: 'email',
      title: 'อีเมล',
      value: 'contact@phanomphrai.com',
      href: 'mailto:contact@phanomphrai.com',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50',
    },
  ];

  return (
<section 
  id="contact" 
  className="py-16 sm:py-20 lg:py-28 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 relative overflow-hidden"
  aria-label="ติดต่อบริษัทรับสร้างบ้าน PHANOMPHRAI"
>
  {/* Background Decorations */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/25 rounded-full blur-3xl" />
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-blue-100/25 rounded-full blur-3xl" />
  </div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    
    {/* Header */}
    <div className="text-center mb-12 sm:mb-16">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/40 backdrop-blur-lg text-blue-800 rounded-full text-sm font-semibold mb-6 border border-blue-200/50 shadow-sm">
        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
        พร้อมให้บริการ
      </div>

      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-4 leading-tight">
        เริ่มต้นโครงการ
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
          บ้านในฝัน
        </span>
        ของคุณ
      </h2>

      <p className="text-blue-700/90 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
        ติดต่อเราวันนี้เพื่อรับคำปรึกษาฟรี ไม่มีค่าใช้จ่าย พร้อมประเมินราคาเบื้องต้น
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
          className="group bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-blue-200/40 hover:bg-white/90 hover:border-blue-300/70 transition-all duration-300 hover:-translate-y-1 shadow-sm"
        >
          <div className="flex flex-col items-center text-center">
            <div
              className={`w-16 h-16 ${info.bgColor} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow`}
            >
              <div className={`text-transparent bg-clip-text bg-gradient-to-r ${info.color}`}>
                <div className="text-blue-700">{info.icon}</div>
              </div>
            </div>

            <h3 className="text-lg font-bold text-blue-900 mb-2">{info.title}</h3>
            <p className="text-blue-700 font-medium group-hover:text-blue-900 transition-colors">
              {info.value}
            </p>
          </div>
        </a>
      ))}
    </div>

    {/* CTA */}
    <div className="text-center">
      <div className="inline-flex flex-col sm:flex-row gap-4">
        <a
          href="tel:0922620227"
          className="group inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-lg font-bold rounded-xl shadow-lg hover:-translate-y-1 active:scale-95 transition-all duration-300"
        >
          โทรเลย: 092-262-0227
        </a>

        <a
          href="https://line.me/ti/p/~@phanomphrai"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-[#06C755] text-white text-lg font-bold rounded-xl shadow-lg hover:-translate-y-1 active:scale-95 transition-all duration-300"
        >
          แชท LINE
        </a>
      </div>

      <p className="mt-8 text-blue-700/80 text-sm flex items-center justify-center gap-2">
        ปรึกษาฟรี ไม่มีค่าใช้จ่าย • ตอบกลับภายใน 24 ชั่วโมง
      </p>
    </div>
  </div>
</section>


  );
}
