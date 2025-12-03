// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // <--- 1. ต้องเพิ่มบรรทัดนี้
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDZ8...", // (ค่าเดิมของคุณ)
  authDomain: "phanomphrai-c99bd.firebaseapp.com",
  projectId: "phanomphrai-c99bd",
  storageBucket: "phanomphrai-c99bd.firebasestorage.app",
  messagingSenderId: "834321094692",
  appId: "1:834321094692:web:d2ca69b8063c5153f5e0b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// <--- 2. ต้องเพิ่มบรรทัดนี้สำคัญที่สุดครับ ไม่งั้นไฟล์อื่นจะหา db ไม่เจอ
export const db = getFirestore(app);
export const storage = getStorage(app);