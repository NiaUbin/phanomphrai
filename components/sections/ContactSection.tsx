/**
 * ContactSection - ส่วนติดต่อเรา (Contact Section)
 * แสดงข้อมูลการติดต่อ: โทรศัพท์, อีเมล, ที่อยู่
 * พร้อมปุ่ม CTA สำหรับโทรศัพท์
 */
export default function ContactSection() {
  const contactInfo = [
    {
      type: 'phone',
      title: 'โทรศัพท์',
      value: '092-262-0227',
      href: 'tel:0922620227',
      icon: (
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.75 19.75 0 0 1-8.63-3.57 19.5 19.5 0 0 1-6-6A19.75 19.75 0 0 1 2.08 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72 13 13 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11l-1.3 1.3a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.11-.45 13 13 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      ),
      textSize: 'text-sm sm:text-base md:text-lg',
    },
    {
      type: 'email',
      title: 'อีเมล',
      value: 'contact@phanomphrai.com',
      href: 'mailto:contact@phanomphrai.com',
      icon: (
        <>
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </>
      ),
      textSize: 'text-xs sm:text-sm md:text-base',
      colSpan: '',
    },
    {
      type: 'address',
      title: 'ที่อยู่',
      value: 'กรุงเทพมหานคร, ประเทศไทย',
      href: '#',
      icon: (
        <>
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </>
      ),
      textSize: 'text-xs sm:text-sm md:text-base',
      colSpan: 'md:col-span-2 lg:col-span-1',
    },
  ];

  return (
    <section id="contact" className="py-10 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight text-gray-900 px-4">
            พร้อมเริ่มต้นโครงการของคุณแล้วหรือยัง?
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed px-4">
            ติดต่อเราวันนี้เพื่อรับคำปรึกษาฟรี ไม่มีค่าใช้จ่าย
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-7 mb-8 sm:mb-10 md:mb-12">
          {contactInfo.map((info) => (
            <div
              key={info.type}
              className={`bg-white rounded-xl p-5 sm:p-6 md:p-7 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-400 text-center ${info.colSpan}`}
            >
              <div className="mb-3 sm:mb-4 flex justify-center">
                <div className="bg-blue-100 rounded-full p-3 sm:p-4">
                  <svg
                    width="28"
                    height="28"
                    className="sm:w-8 sm:h-8 md:w-10 md:h-10 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    {info.icon}
                  </svg>
                </div>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                {info.title}
              </h3>
              {info.type === 'address' ? (
                <p className="text-gray-600 leading-relaxed">{info.value}</p>
              ) : (
                <a
                  href={info.href}
                  className={`text-blue-600 hover:text-blue-700 font-semibold transition-colors ${info.textSize} ${info.type === 'email' ? 'break-all' : ''}`}
                >
                  {info.value}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <a
            href="tel:0922620227"
            className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-10 py-4 sm:py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm sm:text-base md:text-lg font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transform"
          >
            <svg
              width="20"
              height="20"
              className="sm:w-6 sm:h-6 md:w-7 md:h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.75 19.75 0 0 1-8.63-3.57 19.5 19.5 0 0 1-6-6A19.75 19.75 0 0 1 2.08 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72 13 13 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11l-1.3 1.3a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.11-.45 13 13 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span className="whitespace-nowrap">โทรเลย: 092-262-0227</span>
          </a>
        </div>
      </div>
    </section>
  );
}

