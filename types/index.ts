export interface House {
    id?: string;
    title: string;
    price: string;
    description: string;
    fullDescription: string;
    mainImage: string;
    images: string[];
    specifications: {
        bedrooms: string;
        bathrooms: string;
        area: string;
        // งานเพิ่มเติม - สามารถแก้ไขชื่อหัวข้อได้
        work1Label?: string;      // ชื่อหัวข้องานที่ 1 (เช่น งานไฟฟ้า)
        work1Detail?: string;     // รายละเอียดงานที่ 1
        work2Label?: string;      // ชื่อหัวข้องานที่ 2 (เช่น งานประปา)
        work2Detail?: string;     // รายละเอียดงานที่ 2
        work3Label?: string;      // ชื่อหัวข้องานที่ 3 (เช่น งานอื่นๆ)
        work3Detail?: string;     // รายละเอียดงานที่ 3
    };
    features?: string[];
    order?: number; // ลำดับการแสดงผล (น้อย = แสดงก่อน)
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

// Hero Section Content - แก้ไขได้จาก Admin
export interface HeroContent {
    id?: string;
    title: string;           // หัวข้อหลัก เช่น "สร้างบ้านในฝันของคุณ"
    subtitle: string;        // คำอธิบาย เช่น "บริการก่อสร้างคุณภาพสูง..."
    button1Text: string;     // ข้อความปุ่มที่ 1
    button1Link: string;     // ลิงก์ปุ่มที่ 1
    button2Text: string;     // ข้อความปุ่มที่ 2
    button2Link: string;     // ลิงก์ปุ่มที่ 2
    updatedAt?: Date | string;
}
