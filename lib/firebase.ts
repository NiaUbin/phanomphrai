/**
 * Firebase Configuration & Initialization
 * 
 * ไฟล์นี้ทำหน้าที่:
 * 1. กำหนดค่า Firebase Configuration
 * 2. Initialize Firebase App
 * 3. Export Firestore Database และ Storage instances สำหรับใช้ในไฟล์อื่น
 * 
 * หมายเหตุ: ไฟล์นี้เป็นไฟล์สำคัญที่ต้องมี db และ storage exports
 * ไม่งั้นไฟล์อื่นจะไม่สามารถเชื่อมต่อ Firebase ได้
 */

import { initializeApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

/**
 * Firebase Configuration
 * ข้อมูลการตั้งค่า Firebase Project
 * 
 * หมายเหตุ: ควรย้าย API Key ไปไว้ใน environment variables (.env.local)
 * เพื่อความปลอดภัยในการ production
 */
/**
 * Firebase Configuration
 * 
 * หมายเหตุ: สำหรับ production ควรย้าย API Key ไปไว้ใน environment variables
 * 
 * วิธีใช้:
 * 1. สร้างไฟล์ .env.local ใน root directory
 * 2. เพิ่ม NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
 * 3. เปลี่ยน apiKey เป็น process.env.NEXT_PUBLIC_FIREBASE_API_KEY
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDZ8...", // ใช้ env variable ถ้ามี
  authDomain: "phanomphrai-c99bd.firebaseapp.com",
  projectId: "phanomphrai-c99bd",
  storageBucket: "phanomphrai-c99bd.firebasestorage.app",
  messagingSenderId: "834321094692",
  appId: "1:834321094692:web:d2ca69b8063c5153f5e0b1"
};

/**
 * Initialize Firebase App
 * สร้าง Firebase App instance สำหรับใช้ในแอปพลิเคชัน
 */
const app: FirebaseApp = initializeApp(firebaseConfig);

/**
 * Firestore Database Instance
 * ใช้สำหรับอ่าน/เขียนข้อมูลใน Firestore Database
 * 
 * ตัวอย่างการใช้งาน:
 * import { db } from '@/lib/firebase';
 * import { collection, getDocs } from 'firebase/firestore';
 * const snapshot = await getDocs(collection(db, 'houses'));
 */
export const db: Firestore = getFirestore(app);

/**
 * Firebase Storage Instance
 * ใช้สำหรับอัปโหลด/ดาวน์โหลดไฟล์ (รูปภาพ, เอกสาร, etc.)
 * 
 * ตัวอย่างการใช้งาน:
 * import { storage } from '@/lib/firebase';
 * import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
 * const storageRef = ref(storage, 'house-images/main/image.jpg');
 */
export const storage: FirebaseStorage = getStorage(app);