/**
 * Constants Data
 * 
 * ไฟล์นี้เก็บข้อมูล constants ที่ใช้ในแอปพลิเคชัน:
 * - รูปภาพสำหรับ Hero Section
 * - ข้อมูล Services Section
 * - ข้อมูล Portfolio Section
 * 
 * หมายเหตุ: ข้อมูลเหล่านี้เป็น fallback data
 * ข้อมูลจริงจะถูกโหลดจาก Firebase ในแต่ละ component
 */

/**
 * รูปภาพสำหรับ Hero Section (ส่วนหัวของหน้าเว็บ)
 * ใช้เป็น background images สำหรับ hero slider
 */
export const constructionImages: string[] = [
  'https://img.iproperty.com.my/angel/1110x624-crop/wp-content/uploads/sites/6/2023/07/Construction-residential-new-house-in-progress-at-building-site-budjet.jpg',
  'https://plus.unsplash.com/premium_photo-1683121330629-4a158551f37f?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1682141511588-b40e020dac54?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8',
  'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1920&q=80',
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80',
];

/**
 * รูปภาพสำหรับ Slider ใน Hero Section
 * ใช้ 4 รูปแรกจาก constructionImages
 */
export const sliderImages: string[] = constructionImages.slice(0, 4);

/**
 * Interface สำหรับ Service Item
 */
interface ServiceItem {
  id: number;
  title: string;
  image: string;
}

/**
 * ข้อมูลสำหรับ Services Section (ส่วนการันตีคุณภาพ - Carousel)
 * แสดงผลงานที่ผ่านมาเพื่อสร้างความน่าเชื่อถือ
 */
export const services: ServiceItem[] = [
  {
    id: 1,
    title: 'โครงการสร้างบ้านพักอาศัย 1 ชั้น บ้านสวย หมองงหม่า',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
  },
  {
    id: 2,
    title: 'งานต่อเติมห้องอเนกประสงค์และห้องสมุด ติดตั้งหลังคากันสาด หนุ่มบ้าน หนุ่มบ้าน เศรษฐสิริ วงแหวน ลำลูกทา',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
  },
  {
    id: 3,
    title: 'งานรีโนเวท ห้องอเนกประสงค์และห้องครัวหลังบ้าน หนุ่มบ้าน เดอะแทรกัส พระราม 9',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
  },
  {
    id: 4,
    title: 'งานต่อเติมหลังคากันสาดหน้าบ้าน บูกรอยซอมิดลงออดรีหนู้บ้าน หนุ่มบ้านนิรันดร์ วิลล์ 55 ศรีนครินทร์',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80',
  },
  {
    id: 5,
    title: 'งานหลังคา กันสาดไวนิล พร้อมระบบระบายอากาศ',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80',
  },
  {
    id: 6,
    title: 'งานประตูและหน้าต่าง กระจกอลูมิเนียม มุ้งลวดเหล็กดัด',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80',
  },
];

/**
 * Interface สำหรับ Portfolio Item
 */
interface PortfolioItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  description: string;
}

/**
 * ข้อมูลสำหรับ Portfolio Section (ส่วนผลงานของเรา - Image Gallery)
 * ใช้เป็น fallback data เมื่อยังไม่มีข้อมูลจาก Firebase
 */
export const portfolioItems: PortfolioItem[] = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    alt: 'Modern Office Building',
    title: 'บ้านชั้นเดียว',
    description: 'ออกแบบและก่อสร้างอาคารสำนักงานสมัยใหม่',
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    alt: 'Townhouses',
    title: 'บ้านสองชั้น',
    description: 'สร้างบ้านได้สไตล์แบบของคุณ',
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    alt: 'Luxury House with Pool',
    title: 'บ้านหรูพร้อมสระว่ายน้ำ',
    description: 'ออกแบบบ้านหรูพร้อมสระว่ายน้ำ',
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    alt: 'Apartment Complex',
    title: 'คอนโดมิเนียม',
    description: 'รับสร้างคอนโดมิเนียมคุณภาพสูง',
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    alt: 'Condominium Building',
    title: 'อาคารพักอาศัย',
    description: 'ก่อสร้างอาคารพักอาศัยมาตรฐาน',
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    alt: 'Commercial Building',
    title: 'อาคารพาณิชย์',
    description: 'รับสร้างอาคารพาณิชย์ครบวงจร',
  },
];

/**
 * Work Type Options
 * 
 * รายการลักษณะงานที่ลูกค้าสามารถเลือกได้ในฟอร์มขอใบเสนอราคา
 */
export const WORK_TYPE_OPTIONS = [
  'สร้างบ้าน',
  'ต่อเติมบ้าน อาคาร อื่นๆ',
  'รีโนเวทบ้าน อาคาร อื่นๆ',
  'ตกแต่งภายใน บิ้วอิน ผ้าม่าน วอลเปเปอร์',
  'งานหลังคา กันสาด',
  'งานมุ้งลวด เหล็กดัด',
] as const;

/**
 * Quotation Status Options
 * 
 * รายการสถานะของคำขอใบเสนอราคา พร้อม label และสี
 */
export interface StatusOption {
  value: string;
  label: string;
  color: string;
}

export const QUOTATION_STATUS_OPTIONS: StatusOption[] = [
  { value: 'pending', label: 'รอดำเนินการ', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'contacted', label: 'ติดต่อแล้ว', color: 'bg-blue-100 text-blue-800' },
  { value: 'quoted', label: 'ส่งใบเสนอราคาแล้ว', color: 'bg-purple-100 text-purple-800' },
  { value: 'completed', label: 'เสร็จสิ้น', color: 'bg-green-100 text-green-800' },
  { value: 'cancelled', label: 'ยกเลิก', color: 'bg-gray-100 text-gray-600' },
];

/**
 * Get Status Badge
 * 
 * หา status option จาก value
 * 
 * @param status - สถานะที่ต้องการหา
 * @returns StatusOption - ข้อมูลสถานะพร้อม label และสี
 */
export function getStatusBadge(status: string): StatusOption {
  const statusOption = QUOTATION_STATUS_OPTIONS.find(s => s.value === status);
  return statusOption || { value: status, label: status, color: 'bg-gray-100 text-gray-600' };
}

