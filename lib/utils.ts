/**
 * Utility Functions
 * 
 * ฟังก์ชันช่วยเหลือที่ใช้ร่วมกันในแอปพลิเคชัน
 */

import { Timestamp } from 'firebase/firestore';

/**
 * Format Date
 * 
 * แปลงวันที่จาก Timestamp หรือ Date เป็น string ภาษาไทย
 * 
 * @param date - วันที่ที่ต้องการแปลง (Timestamp หรือ Date)
 * @returns string - วันที่ที่ format แล้ว (เช่น "1 ม.ค. 2567, 10:30")
 */
export function formatDate(date: Timestamp | Date): string {
  const d = date instanceof Timestamp ? date.toDate() : new Date(date);
  return d.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Validate Email
 * 
 * ตรวจสอบว่า email ถูกต้องหรือไม่
 * 
 * @param email - email ที่ต้องการตรวจสอบ
 * @returns boolean - true ถ้า email ถูกต้อง
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate Phone Number
 * 
 * ตรวจสอบว่าเบอร์โทรศัพท์ถูกต้องหรือไม่ (รองรับรูปแบบไทย)
 * 
 * @param phone - เบอร์โทรศัพท์ที่ต้องการตรวจสอบ
 * @returns boolean - true ถ้าเบอร์โทรศัพท์ถูกต้อง
 */
export function isValidPhone(phone: string): boolean {
  // รองรับรูปแบบ: 0XX-XXX-XXXX, 0XXXXXXXXX, +66XXXXXXXXX
  const phoneRegex = /^(\+66|0)[0-9]{9}$/;
  return phoneRegex.test(phone.replace(/-/g, ''));
}

/**
 * Format Phone Number for Link
 * 
 * แปลงเบอร์โทรศัพท์เป็นรูปแบบที่ใช้ใน tel: link
 * 
 * @param phone - เบอร์โทรศัพท์
 * @returns string - เบอร์โทรศัพท์ที่ format แล้ว (ลบ - ออก)
 */
export function formatPhoneForLink(phone: string): string {
  return phone.replace(/-/g, '');
}

