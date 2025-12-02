/**
 * PromotionSection - ส่วนโปรโมชั่น (Promotion Section)
 * แสดงข้อมูลโปรโมชั่นและข้อความเกี่ยวกับบริษัท
 * มีรูปภาพประกอบด้านขวา
 */
import Image from 'next/image';

export default function PromotionSection() {
  return (
    <section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-center">
          {/* Left Side - Text Content */}
          <div className="order-2 lg:order-1">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-5 sm:mb-6 leading-tight">
              เรามีโปรโมชั่นให้ ราคาคุ้มค่าที่สุด คุณภาพทุกงาน บริการสุดประทับใจ
            </h2>
            
            <div className="space-y-3 sm:space-y-4">
              <p className="text-gray-800 leading-relaxed text-sm sm:text-base md:text-lg font-normal">
                บริษัทของเราให้บริการด้านงานออกแบบสถาปัตยกรรมและงานตกแต่งภายใน รวมถึงงานก่อสร้างซึ่งมีความชำนาญ
                มีประสบการณ์ทำงานมายาวนานกว่า 10 ปี มีผลงานการออกแบบที่หลากหลายสไตล์ สามารถควบคุมค่าใช้จ่าย
                เพื่อให้ตรงใจ กับความต้องการของทุกท่านมากที่สุด
              </p>
              <p className="text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base font-normal">
                เว็บไซต์จัดทำขึ้นเพื่อเป็นตัวอย่างการให้บริการในธุรกิจรับเหมาก่อสร้าง ไม่มีการ
                ดำเนินการจริงแต่อย่างใด ข้อความ และรูปภาพต่างๆ นำมาจากใน internet และ
                ได้อ้างอิงถึงเนื้อหาไว้เรียบร้อยแล้ว และขอบคุณสำหรับรูปภาพ และเนื้อหา
                บทความต่างๆ
              </p>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="relative w-full h-[220px] sm:h-[260px] md:h-[300px] lg:h-[340px] rounded-xl overflow-hidden shadow-lg order-1 lg:order-2">
            <Image
              src="http://p-construction.samplebigbang.com/user_file/p1hfls0k2j1keu1alu16bc1hd019td16.png"
              alt="Construction Site"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

