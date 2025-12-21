/**
 * PromotionSection - ส่วนโปรโมชั่นและจุดเด่นของบริษัท
 * SEO-friendly content สำหรับ keywords: รับสร้างบ้าน, ออกแบบบ้าน, รับเหมาก่อสร้าง
 */
import Image from 'next/image';

export default function PromotionSection() {
  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.746 3.746 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      ),
      title: "ประสบการณ์กว่า 10 ปี",
      desc: "ทีมช่างมืออาชีพ",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "ราคายุติธรรม",
      desc: "ควบคุมงบประมาณได้",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
        </svg>
      ),
      title: "วัสดุคุณภาพ",
      desc: "มาตรฐานสูง",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      title: "รับประกันผลงาน",
      desc: "มั่นใจได้ 100%",
    },
  ];

  return (
    <section 
      id="promotion"
      className="py-16 sm:py-20 lg:py-28 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden"
      aria-label="โปรโมชั่นและบริการรับสร้างบ้าน"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-100/30 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Left Side - Text Content */}
          <div className="order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-sm font-semibold mb-6 shadow-lg shadow-blue-500/25">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
              </svg>
              บริการครบวงจร
            </div>

            {/* Main Heading - SEO Optimized */}
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                รับออกแบบบ้าน
              </span>
              {" "}และ{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                รับเหมาก่อสร้าง
              </span>
              <br />
              <span className="text-gray-800 text-lg sm:text-xl md:text-2xl">คุณภาพระดับพรีเมียม ราคายุติธรรม</span>
            </h2>
            
            {/* Description - Enhanced SEO Content */}
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
                <strong className="text-gray-900">PHANOMPHRAI</strong> เป็น<strong className="text-gray-900">บริษัทรับสร้างบ้านครบวงจร</strong> 
                ให้บริการ<strong className="text-blue-600"> ออกแบบบ้าน</strong>, 
                <strong className="text-blue-600"> รับเหมาก่อสร้าง</strong>, 
                <strong className="text-blue-600"> ต่อเติมบ้าน</strong>, 
                <strong className="text-blue-600"> รีโนเวทบ้าน</strong> และการตกแต่งภายใน 
                ด้วยทีมสถาปนิกและวิศวกรมืออาชีพ ประสบการณ์กว่า <strong>10 ปี</strong> 
                พร้อมผลงานมากกว่า <strong>100+ โครงการสำเร็จ</strong>
              </p>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
                เรามุ่งเน้นคุณภาพงานก่อสร้าง ใช้วัสดุมาตรฐานสูง ราคายุติธรรม โปร่งใส 
                ไม่มีค่าใช้จ่ายแอบแฝง ส่งมอบงานตรงเวลา พร้อมการรับประกันผลงาน 
                ให้คุณมั่นใจในทุกขั้นตอนการก่อสร้าง
              </p>
              <p className="text-gray-600 leading-relaxed text-xs sm:text-sm md:text-base">
                บริการครอบคลุมทั่วประเทศไทย โดยเฉพาะพื้นที่อีสาน ร้อยเอ็ด พนมไพร 
                และจังหวัดใกล้เคียง พร้อมให้คำปรึกษาฟรี ไม่มีค่าใช้จ่าย ตอบกลับภายใน 24 ชั่วโมง
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
              {features.map((feature, idx) => (
                <div 
                  key={idx}
                  className="group flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 md:p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300"
                >
                  <div className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-xs sm:text-sm md:text-base">{feature.title}</h3>
                    <p className="text-gray-500 text-xs sm:text-sm">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-2.5 sm:gap-3 md:gap-4">
              <a 
                href="tel:0922620227"
                className="inline-flex items-center gap-1.5 sm:gap-2 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                โทรปรึกษาฟรี
              </a>
              <a 
                href="#portfolio"
                className="inline-flex items-center gap-1.5 sm:gap-2 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-white text-gray-700 border-2 border-gray-200 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-600 hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                ดูผลงานของเรา
              </a>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="relative order-1 lg:order-2">
            {/* Main Image Container */}
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl opacity-20 blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl opacity-20 blur-xl" />
              
              {/* Main Image */}
              <div className="relative w-full h-[280px] sm:h-[320px] md:h-[380px] lg:h-[440px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1704821341745-c38ff405d052?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8JUUwJUI4JUFBJUUwJUI4JUEzJUUwJUI5JTg5JUUwJUI4JUIyJUUwJUI4JTg3JUUwJUI4JTlBJUUwJUI5JTg5JUUwJUI4JUIyJUUwJUI4JTk5fGVufDB8fDB8fHww"
                  alt="ทีมวิศวกรและช่างมืออาชีพควบคุมงานก่อสร้างบ้าน - PHANOMPHRAI บริการรับสร้างบ้าน ออกแบบบ้าน รับเหมาก่อสร้างครบวงจร"
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  unoptimized
                  title="ทีมช่างมืออาชีพ PHANOMPHRAI - บริการรับสร้างบ้านครบวงจร"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 sm:left-6 bg-white rounded-2xl shadow-xl p-4 sm:p-5 border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 sm:w-7 sm:h-7 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">100+</p>
                    <p className="text-gray-500 text-xs sm:text-sm">โครงการสำเร็จ</p>
                  </div>
                </div>
              </div>

              {/* Floating Review Card */}
              <div className="absolute -top-4 -right-4 sm:right-4 bg-white rounded-2xl shadow-xl p-3 sm:p-4 border border-gray-100 hidden sm:block">
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 text-xs sm:text-sm font-medium">ลูกค้าพึงพอใจ 100%</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
