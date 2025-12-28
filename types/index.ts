/**
 * Type Definitions
 * 
 * ไฟล์นี้เก็บ TypeScript interfaces ที่ใช้ในแอปพลิเคชัน
 * ใช้สำหรับ type checking และ IntelliSense ใน IDE
 */

/**
 * House Interface
 * 
 * ข้อมูลบ้าน/ผลงานที่แสดงในเว็บไซต์
 * 
 * หมายเหตุ:
 * - ข้อมูลนี้ถูกเก็บใน Firebase Firestore (collection: 'houses')
 * - สามารถจัดการได้จาก Admin Panel
 */
export interface House {
    id?: string; // Document ID จาก Firestore
    title: string; // ชื่อโครงการ/บ้าน
    price: string; // ราคา (เป็น string เพื่อรองรับรูปแบบต่างๆ เช่น "2.5 ล้านบาท")
    description: string; // คำอธิบายสั้นๆ (ใช้แสดงใน card)
    fullDescription: string; // คำอธิบายเต็ม (ใช้แสดงในหน้า detail)
    mainImage: string; // รูปภาพหลัก (URL)
    images: string[]; // รูปภาพเพิ่มเติม (URL array)
    
    /**
     * Specifications
     * ข้อมูลรายละเอียดของบ้าน
     */
    specifications: {
        bedrooms: string; // จำนวนห้องนอน
        bathrooms: string; // จำนวนห้องน้ำ
        area: string; // พื้นที่ (ตร.ม.)
        
        /**
         * งานเพิ่มเติม - สามารถแก้ไขชื่อหัวข้อได้
         * ใช้สำหรับแสดงรายละเอียดงานเพิ่มเติม (เช่น งานไฟฟ้า, งานประปา, งานอื่นๆ)
         */
        work1Label?: string; // ชื่อหัวข้องานที่ 1 (เช่น "งานไฟฟ้า")
        work1Detail?: string; // รายละเอียดงานที่ 1
        work2Label?: string; // ชื่อหัวข้องานที่ 2 (เช่น "งานประปา")
        work2Detail?: string; // รายละเอียดงานที่ 2
        work3Label?: string; // ชื่อหัวข้องานที่ 3 (เช่น "งานอื่นๆ")
        work3Detail?: string; // รายละเอียดงานที่ 3
    };
    
    features?: string[]; // คุณสมบัติพิเศษ (array ของ string)
    order?: number; // ลำดับการแสดงผล (น้อย = แสดงก่อน, ใช้สำหรับเรียงลำดับ)
    isFeatured?: boolean; // แสดงใน "ผลงานล่าสุด" ที่ Footer (true = แสดง)
    createdAt?: Date | string; // วันที่สร้าง
    updatedAt?: Date | string; // วันที่อัปเดตล่าสุด
}

/**
 * HeroContent Interface
 * 
 * ข้อมูล Hero Section (ส่วนหัวของหน้าเว็บ)
 * 
 * หมายเหตุ:
 * - ข้อมูลนี้ถูกเก็บใน Firebase Firestore (collection: 'heroContent', document: 'main')
 * - สามารถแก้ไขได้จาก Admin Panel
 */
export interface HeroContent {
    id?: string; // Document ID จาก Firestore
    title: string; // หัวข้อหลัก (เช่น "สร้างบ้านในฝันของคุณ")
    subtitle: string; // คำอธิบาย (เช่น "บริการก่อสร้างคุณภาพสูง...")
    button1Text: string; // ข้อความปุ่มที่ 1 (เช่น "ปรึกษาฟรี")
    button1Link: string; // ลิงก์ปุ่มที่ 1 (เช่น "#contact" หรือ "/path")
    button2Text: string; // ข้อความปุ่มที่ 2 (เช่น "ดูผลงาน")
    button2Link: string; // ลิงก์ปุ่มที่ 2 (เช่น "#portfolio" หรือ "/path")
    updatedAt?: Date | string; // วันที่อัปเดตล่าสุด
}
