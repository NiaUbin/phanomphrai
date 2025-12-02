/**
 * AboutSection - ส่วนเกี่ยวกับเรา (About Us Section)
 * แสดงข้อมูลบริษัท PHANOMPHRAI พร้อมคุณสมบัติหลัก 4 ข้อ
 * และสถิติผลงาน (ปีประสบการณ์, โครงการสำเร็จ, ความพึงพอใจ, บริการดูแล)
 */
export default function AboutSection() {
  const features = [
    { title: 'ทีมงานมืออาชีพ', description: 'ทีมงานที่มีประสบการณ์และเชี่ยวชาญ' },
    { title: 'วัสดุคุณภาพ', description: 'ใช้เฉพาะวัสดุมาตรฐานคุณภาพสูง' },
    { title: 'รับประกันงาน', description: 'รับประกันคุณภาพงานทุกโครงการ' },
    { title: 'ราคาเป็นธรรม', description: 'ราคาโปร่งใสและแข่งขันได้' },
  ];

  const stats = [
    { value: '10+', label: 'ปีประสบการณ์' },
    { value: '500+', label: 'โครงการสำเร็จ' },
    { value: '100%', label: 'ความพึงพอใจ' },
    { value: '24/7', label: 'บริการดูแล' },
  ];

  return (
    <section id="about" className="py-10 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
            เกี่ยวกับเรา
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-3xl mx-auto px-4">
            บริษัทก่อสร้างและออกแบบที่เชื่อถือได้
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          {/* Left Side - Content */}
          <div>
            <div className="mb-6 sm:mb-8">
              <div className="inline-block bg-blue-100 rounded-lg p-3 sm:p-4 mb-4 sm:mb-5">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="sm:w-10 sm:h-10 text-blue-600"
                >
                  <path
                    d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 22V12H15V22"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-5">
                PHANOMPHRAI
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4 sm:mb-5 text-sm sm:text-base md:text-lg">
                เราเป็นบริษัทก่อสร้างและออกแบบที่มีประสบการณ์ยาวนาน 
                ให้บริการครบวงจรตั้งแต่การออกแบบ การก่อสร้าง ไปจนถึงการตกแต่งภายใน
                ด้วยทีมงานมืออาชีพที่มุ่งมั่นในการสร้างบ้านและอาคารคุณภาพสูง
              </p>
              <p className="text-gray-700 leading-relaxed mb-5 sm:mb-6 md:mb-8 text-sm sm:text-base md:text-lg">
                เรามุ่งเน้นการใช้วัสดุคุณภาพสูง ทำงานด้วยความละเอียดรอบคอบ
                และให้บริการด้วยใจ เพื่อให้ลูกค้าได้รับผลงานที่ดีที่สุด
                ตามความต้องการและงบประมาณที่เหมาะสม
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="bg-blue-600 rounded-lg p-2.5 sm:p-3 shrink-0">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="sm:w-5 sm:h-5 text-white"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1.5 text-sm sm:text-base">{feature.title}</h4>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Stats */}
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 sm:p-8 md:p-10 shadow-lg border-2 border-gray-100">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blue-600 mb-1.5 sm:mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-700 font-semibold text-xs sm:text-sm md:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

