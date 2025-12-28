'use client';

import { useState, useRef, useEffect } from 'react';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, doc, updateDoc, setDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Icons } from './Icons';
import { House } from '@/types';

interface HouseFormProps {
  initialData?: House;
  onSuccess: () => void;
  onCancel?: () => void;
}

// Success Toast Component - แสดงกลางจอ
function SuccessToast({ 
  isOpen, 
  message,
  fadeOut 
}: { 
  isOpen: boolean; 
  message: string;
  fadeOut: boolean;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
      {/* Backdrop */}
      <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${fadeOut ? 'opacity-0' : 'opacity-100'}`} />
      
      {/* Toast Card */}
      <div className={`relative bg-white rounded-xl shadow-lg border border-gray-200 p-6 max-w-sm w-full pointer-events-auto transition-all duration-300 ${fadeOut ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        <div className="flex flex-col items-center text-center">
          {/* Icon Circle */}
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2.5} 
              stroke="currentColor" 
              className="w-8 h-8 text-gray-700"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          
          {/* Message */}
          <h3 className="text-xl font-semibold text-gray-800 mb-1">
            {message}
          </h3>
          <p className="text-gray-500 text-sm">
            โครงการถูกบันทึกเรียบร้อยแล้ว
          </p>
        </div>
      </div>
    </div>
  );
}

// Success Modal Component - Clean & Minimal (สำหรับการแก้ไข)
function SuccessModal({ 
  isOpen, 
  onClose, 
  data
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  data: { id: string; title: string; mainImage: string } | null;
}) {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose} 
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl max-w-sm w-full overflow-hidden">
        
        {/* Header */}
        <div className="p-6 text-center border-b border-gray-100">
          {/* Icon */}
          <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 bg-orange-100">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2.5} 
              stroke="currentColor" 
              className="w-8 h-8 text-orange-600"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          
          <h2 className="text-xl font-bold text-gray-900">แก้ไขสำเร็จ</h2>
          <p className="text-gray-500 text-sm mt-1">ข้อมูลถูกอัปเดตเรียบร้อยแล้ว</p>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Preview */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-4">
            {data.mainImage && (
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <img src={data.mainImage} alt={data.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate text-sm">{data.title}</p>
              <code className="text-xs text-gray-500 font-mono truncate block">
                {data.id}
              </code>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl font-semibold text-white transition-colors bg-orange-500 hover:bg-orange-600"
            >
              เสร็จสิ้น
            </button>
            <a
              href={`/house/${data.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
              ดู
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HouseForm({ initialData, onSuccess, onCancel }: HouseFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [savedData, setSavedData] = useState<{ id: string; title: string; mainImage: string } | null>(null);
  const [idError, setIdError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastFadeOut, setToastFadeOut] = useState(false);
  
  // Refs for clearing file inputs
  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // Form Data
  const [formData, setFormData] = useState({
    customId: '',
    title: '',
    price: '',
    description: '',
    fullDescription: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    order: '', // ลำดับการแสดงผล
    // งานเพิ่มเติม - สามารถแก้ไขชื่อหัวข้อได้
    work1Label: 'งานไฟฟ้า',
    work1Detail: '',
    work2Label: 'งานประปา',
    work2Detail: '',
    work3Label: 'งานอื่นๆ',
    work3Detail: '',
  });

  // Images
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [mainImageUrl, setMainImageUrl] = useState<string>(''); // สำหรับใส่ URL โดยตรง
  const [mainImageUrlInput, setMainImageUrlInput] = useState<string>(''); // สำหรับ input field
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryUrlsInput, setGalleryUrlsInput] = useState<string>(''); // สำหรับ input field
  const [confirmedGalleryUrls, setConfirmedGalleryUrls] = useState<string[]>([]); // URL ที่ยืนยันแล้ว
  const [existingGallery, setExistingGallery] = useState<string[]>([]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        customId: initialData.id || '',
        title: initialData.title || '',
        price: initialData.price || '',
        description: initialData.description || '',
        fullDescription: initialData.fullDescription || '',
        bedrooms: initialData.specifications?.bedrooms || '',
        bathrooms: initialData.specifications?.bathrooms || '',
        area: initialData.specifications?.area || '',
        order: initialData.order?.toString() || '',
        work1Label: initialData.specifications?.work1Label || 'งานไฟฟ้า',
        work1Detail: initialData.specifications?.work1Detail || '',
        work2Label: initialData.specifications?.work2Label || 'งานประปา',
        work2Detail: initialData.specifications?.work2Detail || '',
        work3Label: initialData.specifications?.work3Label || 'งานอื่นๆ',
        work3Detail: initialData.specifications?.work3Detail || '',
      });
      setMainImagePreview(initialData.mainImage || null);
      if (initialData.images && Array.isArray(initialData.images)) {
         const gallery = initialData.images.filter((url: string) => url !== initialData.mainImage);
         setExistingGallery(gallery);
      }
    }
  }, [initialData]);

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setMainImagePreview(URL.createObjectURL(file));
      setMainImageUrl(''); // ล้าง URL เมื่อเลือกไฟล์
    }
  };

  const handleMainImageUrlChange = (url: string) => {
    setMainImageUrlInput(url);
  };

  const confirmMainImageUrl = () => {
    const url = mainImageUrlInput.trim();
    if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
      setMainImageUrl(url);
      setMainImagePreview(url);
      setImageFile(null); // ล้างไฟล์เมื่อใส่ URL
      if (mainImageInputRef.current) {
        mainImageInputRef.current.value = '';
      }
    } else {
      alert('กรุณาใส่ URL ที่ถูกต้อง (ต้องขึ้นต้นด้วย http:// หรือ https://)');
    }
  };

  const confirmGalleryUrls = () => {
    const urls = galleryUrlsInput
      .split(/[,\n]/)
      .map(url => url.trim())
      .filter(url => url.length > 0 && (url.startsWith('http://') || url.startsWith('https://')));
    
    if (urls.length > 0) {
      setConfirmedGalleryUrls(prev => [...prev, ...urls]);
      setGalleryUrlsInput(''); // ล้าง input
    } else {
      alert('กรุณาใส่ URL ที่ถูกต้อง (ต้องขึ้นต้นด้วย http:// หรือ https://)');
    }
  };

  const removeConfirmedGalleryUrl = (index: number) => {
    setConfirmedGalleryUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setGalleryFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeGalleryImage = (index: number) => {
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingGalleryImage = (index: number) => {
    setExistingGallery((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let finalMainImageUrl = mainImagePreview || '';
      
      // ถ้ามีไฟล์ให้อัปโหลด (ถ้ามี Firebase Storage)
      if (imageFile && storage) {
        try {
          const storageRef = ref(storage, `house-images/main/${Date.now()}-${imageFile.name}`);
          const snapshot = await uploadBytes(storageRef, imageFile);
          finalMainImageUrl = await getDownloadURL(snapshot.ref);
        } catch {
          // Firebase Storage ไม่พร้อมใช้งาน - ใช้ URL แทน
          console.warn('Firebase Storage not available, using URL instead');
          // ถ้าไม่มี Storage ให้ใช้ URL ที่ใส่เข้ามา
          finalMainImageUrl = mainImageUrl || mainImagePreview || '';
        }
      } else {
        // ใช้ URL ที่ใส่เข้ามาโดยตรง
        finalMainImageUrl = mainImageUrl || mainImagePreview || '';
      }

      const newGalleryUrls: string[] = [];
      
      // อัปโหลดไฟล์ Gallery (ถ้ามี Firebase Storage)
      if (galleryFiles.length > 0 && storage) {
        try {
          const uploadPromises = galleryFiles.map(async (file) => {
            const storageRef = ref(storage, `house-images/gallery/${Date.now()}-${file.name}`);
            const snapshot = await uploadBytes(storageRef, file);
            return getDownloadURL(snapshot.ref);
          });
          const uploadedUrls = await Promise.all(uploadPromises);
          newGalleryUrls.push(...uploadedUrls);
        } catch {
          // Firebase Storage ไม่พร้อมใช้งานสำหรับภาพ Gallery
          console.warn('Firebase Storage not available for gallery images');
        }
      }
      
      // เพิ่ม URL Gallery ที่ยืนยันแล้ว
      newGalleryUrls.push(...confirmedGalleryUrls);

      const finalGalleryUrls = [...existingGallery, ...newGalleryUrls];
      const allImagesArray = finalMainImageUrl ? [finalMainImageUrl, ...finalGalleryUrls] : [...finalGalleryUrls];

      // Remove customId from data before saving
      // แยก customId และ order ออกจาก formData ก่อนบันทึก
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { customId, order, ...restFormData } = formData;

      // สร้าง houseData โดยไม่รวม order ถ้าไม่มีค่า
      const houseData: {
        title: string;
        price: string;
        description: string;
        fullDescription: string;
        bedrooms: string;
        bathrooms: string;
        area: string;
        work1Label: string;
        work1Detail: string;
        work2Label: string;
        work2Detail: string;
        work3Label: string;
        work3Detail: string;
        mainImage: string;
        images: string[];
        specifications: {
          bedrooms: string;
          bathrooms: string;
          area: string;
          work1Label: string;
          work1Detail: string;
          work2Label: string;
          work2Detail: string;
          work3Label: string;
          work3Detail: string;
        };
        updatedAt: Date;
        order?: number;
      } = {
        ...restFormData,
        mainImage: finalMainImageUrl,
        images: allImagesArray,
        specifications: {
          bedrooms: formData.bedrooms,
          bathrooms: formData.bathrooms,
          area: formData.area,
          work1Label: formData.work1Label,
          work1Detail: formData.work1Detail,
          work2Label: formData.work2Label,
          work2Detail: formData.work2Detail,
          work3Label: formData.work3Label,
          work3Detail: formData.work3Detail,
        },
        updatedAt: new Date()
      };

      // เพิ่ม order เฉพาะเมื่อมีค่า (ไม่ใช่ empty string)
      if (order && order.trim() !== '') {
        const orderNum = parseInt(order);
        if (!isNaN(orderNum)) {
          houseData.order = orderNum;
        }
      }

      let savedId = '';

      if (initialData?.id) {
        // แก้ไขข้อมูล
        await updateDoc(doc(db, 'houses', initialData.id), houseData);
        savedId = initialData.id;
      } else if (formData.customId && formData.customId.trim() !== '') {
        // บันทึกด้วย Custom ID - เช็คซ้ำก่อน
        const cleanId = formData.customId.trim().replace(/\s+/g, '-').toLowerCase();
        
        // ตรวจสอบว่า ID นี้มีอยู่แล้วหรือไม่
        const existingDoc = await getDoc(doc(db, 'houses', cleanId));
        if (existingDoc.exists()) {
          setIsLoading(false);
          setIdError(`ID "${cleanId}" มีอยู่ในระบบแล้ว กรุณาใช้ ID อื่น`);
          return;
        }
        
        await setDoc(doc(db, 'houses', cleanId), {
          ...houseData,
          features: [],
          createdAt: new Date()
        });
        savedId = cleanId;
      } else {
        // บันทึกด้วย Auto ID
        const docRef = await addDoc(collection(db, 'houses'), {
          ...houseData,
          features: [],
          createdAt: new Date()
        });
        savedId = docRef.id;
      }
      
      // Show success notification
      if (initialData?.id) {
        // แก้ไขข้อมูล - แสดง modal
      setSavedData({
        id: savedId,
        title: formData.title,
        mainImage: finalMainImageUrl
      });
      setShowSuccess(true);
      } else {
        // เพิ่มผลงานใหม่ - แสดง toast และรีเซ็ตฟอร์ม
        setToastMessage('บันทึกสำเร็จ');
        setShowToast(true);
        setToastFadeOut(false);
        
        // รีเซ็ตฟอร์ม
        resetForm();
        
        // เริ่ม fade out หลังจาก 1 วินาที
        setTimeout(() => {
          setToastFadeOut(true);
          // ซ่อน toast หลังจาก fade out เสร็จ
          setTimeout(() => {
            setShowToast(false);
            setToastFadeOut(false);
          }, 300);
        }, 1000);
        
        // เรียก onSuccess callback
        onSuccess();
      }

    } catch (error) {
      console.error('Error:', error);
      alert('❌ เกิดข้อผิดพลาด: ' + error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setSavedData(null);
    onSuccess();
  };

  // Reset form function
  const resetForm = () => {
    setFormData({
      customId: '',
      title: '',
      price: '',
      description: '',
      fullDescription: '',
      bedrooms: '',
      bathrooms: '',
      area: '',
      order: '',
      work1Label: 'งานไฟฟ้า',
      work1Detail: '',
      work2Label: 'งานประปา',
      work2Detail: '',
      work3Label: 'งานอื่นๆ',
      work3Detail: '',
    });
    setImageFile(null);
    setMainImagePreview(null);
    setMainImageUrl('');
    setMainImageUrlInput('');
    setGalleryFiles([]);
    setGalleryUrlsInput('');
    setConfirmedGalleryUrls([]);
    setExistingGallery([]);
    setIdError(null);
    
    // Clear file inputs
    if (mainImageInputRef.current) {
      mainImageInputRef.current.value = '';
    }
    if (galleryInputRef.current) {
      galleryInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
            {initialData ? <Icons.Pencil /> : <Icons.Plus />}
          </div>
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              {initialData ? 'แก้ไขผลงาน' : 'เพิ่มผลงานใหม่'}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {initialData 
                ? `กำลังแก้ไข: ${initialData.title}` 
                : 'กรอกข้อมูลโครงการใหม่'}
            </p>
          </div>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
              </svg>
              ย้อนกลับ
            </button>
          )}
        </div>
      </div>



      {/* Form Card */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <form onSubmit={handleSubmit}>
          
          {/* Section 1: ข้อมูลทั่วไป */}
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-base font-bold text-gray-900 mb-1">ข้อมูลทั่วไป</h2>
            <p className="text-sm text-gray-500 mb-6">ชื่อโครงการและรายละเอียด</p> 
            
            <div className="space-y-5">
              {/* ID ผลงาน - แสดงเฉพาะตอนสร้างใหม่ */}
              {!initialData && (
                <div className={`p-4 rounded-xl border transition-all ${
                  idError 
                    ? 'bg-red-50 border-red-200' 
                    : 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-100'
                }`}>
                  <div className="space-y-2">
                    <label htmlFor="customId" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-4 h-4 ${idError ? 'text-red-500' : 'text-indigo-500'}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" />
                      </svg>
                      ID ผลงาน
                      <span className="text-xs text-gray-400 font-normal">(ไม่บังคับ)</span>
                    </label>
                    <div className="relative">
                      <input 
                        id="customId" 
                        type="text" 
                        placeholder="เช่น house-001, modern-villa-2024"
                        className={`w-full rounded-xl p-3.5 border-2 focus:ring-2 focus:outline-none transition-all text-gray-900 placeholder:text-gray-400 font-mono ${
                          idError 
                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-white' 
                            : 'border-indigo-200 focus:ring-indigo-500 focus:border-indigo-500'
                        }`}
                        value={formData.customId} 
                        onChange={(e) => {
                          setFormData({...formData, customId: e.target.value});
                          setIdError(null); // ล้าง error เมื่อมีการพิมพ์
                        }} 
                      />
                      {idError && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-red-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    
                    {/* Error Message */}
                    {idError && (
                      <div className="flex items-center gap-2 p-3 bg-red-100 rounded-lg border border-red-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-red-600 flex-shrink-0">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                        <span className="text-sm font-medium text-red-700">{idError}</span>
                      </div>
                    )}
                    
                    {!idError && (
                      <p className="text-xs text-gray-500 flex items-start gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 mt-0.5 text-indigo-400 shrink-0">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                        </svg>
                        ถ้าไม่ระบุ ระบบจะสร้าง ID อัตโนมัติ • ID จะถูกใช้เป็น URL: /house/<span className="font-mono text-indigo-600">{formData.customId || 'auto-id'}</span>
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* แสดง ID ถ้าเป็นการแก้ไข */}
              {initialData && (
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" />
                    </svg>
                    <div>
                      <span className="text-xs text-gray-500">Document ID:</span>
                      <code className="ml-2 bg-gray-200 px-2 py-0.5 rounded text-sm font-mono text-gray-700">
                        {initialData.id}
                      </code>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* ชื่อโครงการ */}
                <div className="space-y-2">
                  <label htmlFor="title" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                    ชื่อโครงการ
                  </label>
                  <input 
                    id="title" 
                    type="text" 
                    required 
                    placeholder="เช่น บ้านเดี่ยว 2 ชั้น โครงการ ABC"
                    className="w-full rounded-xl border-gray-200 p-3.5 border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all text-gray-900 placeholder:text-gray-400"
                    value={formData.title} 
                    onChange={(e) => setFormData({...formData, title: e.target.value})} 
                  />
                </div>

                {/* ราคา */}
                <div className="space-y-2">
                  <label htmlFor="price" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    ราคา <span className="text-gray-400 text-xs font-normal">(ไม่บังคับ)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                      <Icons.Money />
                    </span>
                    <input 
                      id="price" 
                      type="text" 
                      placeholder="เช่น เริ่มต้น 3.5 ล้านบาท"
                      className="w-full rounded-xl border-gray-200 p-3.5 pl-11 border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all text-gray-900 placeholder:text-gray-400"
                      value={formData.price} 
                      onChange={(e) => setFormData({...formData, price: e.target.value})} 
                    />
                  </div>
                </div>

                {/* ลำดับการแสดงผล */}
                <div className="space-y-2">
                  <label htmlFor="order" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    ลำดับการแสดงผล <span className="text-gray-400 text-xs font-normal">(น้อย = แสดงก่อน)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75m-9.75 3h9.75m-9.75 3h9.75m5.25-4.5V21m0 0l-4.5-4.5m4.5 4.5l-4.5-4.5" />
                      </svg>
                    </span>
                    <input 
                      id="order" 
                      type="number" 
                      placeholder="เช่น 1, 2, 3 (ว่าง = แสดงท้ายสุด)"
                      className="w-full rounded-xl border-gray-200 p-3.5 pl-11 border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all text-gray-900 placeholder:text-gray-400"
                      value={formData.order} 
                      onChange={(e) => setFormData({...formData, order: e.target.value})} 
                    />
                  </div>
                </div>
              </div>

              {/* คำอธิบายสั้น */}
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-semibold text-gray-700">
                  คำอธิบายสั้น <span className="text-gray-400 font-normal">(แสดงในหน้าแรก)</span>
                </label>
                <textarea 
                  id="description" 
                  rows={2} 
                  placeholder="เขียนคำอธิบายสั้นๆ ที่จะแสดงในการ์ดหน้าแรก..."
                  className="w-full rounded-xl border-gray-200 p-3.5 border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all text-gray-900 placeholder:text-gray-400 resize-none"
                  value={formData.description} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})} 
                />
              </div>

              {/* รายละเอียดเต็ม */}
              <div className="space-y-2">
                <label htmlFor="fullDescription" className="text-sm font-semibold text-gray-700">
                  รายละเอียดเต็ม <span className="text-gray-400 font-normal">(แสดงในหน้ารายละเอียด)</span>
                </label>
                <textarea 
                  id="fullDescription" 
                  rows={5} 
                  placeholder="เขียนรายละเอียดทั้งหมดของโครงการ เช่น จุดเด่น, สิ่งอำนวยความสะดวก, ทำเลที่ตั้ง..."
                  className="w-full rounded-xl border-gray-200 p-3.5 border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all text-gray-900 placeholder:text-gray-400 resize-none"
                  value={formData.fullDescription} 
                  onChange={(e) => setFormData({...formData, fullDescription: e.target.value})} 
                />
              </div>
            </div>
          </div>

          {/* Section 2: สเปคบ้าน */}
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-base font-bold text-gray-900 mb-1">สเปคบ้าน</h2>
            <p className="text-sm text-gray-500 mb-6">รายละเอียดห้อง พื้นที่ และงานเพิ่มเติม</p>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              {/* ห้องนอน */}
              <div>
                <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-2">ห้องนอน</label>
                <input 
                  id="bedrooms" 
                  type="text" 
                  placeholder="เช่น 3"
                  className="w-full rounded-lg border-gray-200 p-3 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all text-gray-900 text-center font-medium"
                  value={formData.bedrooms} 
                  onChange={(e) => setFormData({...formData, bedrooms: e.target.value})} 
                />
              </div>

              {/* ห้องน้ำ */}
              <div>
                <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-2">ห้องน้ำ</label>
                <input 
                  id="bathrooms" 
                  type="text" 
                  placeholder="เช่น 2"
                  className="w-full rounded-lg border-gray-200 p-3 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all text-gray-900 text-center font-medium"
                  value={formData.bathrooms} 
                  onChange={(e) => setFormData({...formData, bathrooms: e.target.value})} 
                />
              </div>

              {/* พื้นที่ */}
              <div>
                <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-2">พื้นที่ (ตร.ม.)</label>
                <input 
                  id="area" 
                  type="text" 
                  placeholder="เช่น 150"
                  className="w-full rounded-lg border-gray-200 p-3 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all text-gray-900 text-center font-medium"
                  value={formData.area} 
                  onChange={(e) => setFormData({...formData, area: e.target.value})} 
                />
              </div>
            </div>

            {/* รายละเอียดงานเพิ่มเติม */}
            <div className="border-t border-gray-100 pt-6">
              <p className="text-sm font-medium text-gray-700 mb-4">รายละเอียดงานเพิ่มเติม <span className="text-gray-400 font-normal">(ไม่บังคับ)</span></p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* งานที่ 1 */}
                <div className="space-y-2">
                  <input 
                    type="text"
                    placeholder="หัวข้อ เช่น งานไฟฟ้า"
                    className="w-full rounded-lg border-gray-200 p-2.5 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none text-gray-900 text-sm font-medium"
                    value={formData.work1Label} 
                    onChange={(e) => setFormData({...formData, work1Label: e.target.value})} 
                  />
                  <textarea 
                    rows={2}
                    placeholder="รายละเอียด..."
                    className="w-full rounded-lg border-gray-200 p-2.5 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none text-gray-900 text-sm resize-none"
                    value={formData.work1Detail} 
                    onChange={(e) => setFormData({...formData, work1Detail: e.target.value})} 
                  />
                </div>

                {/* งานที่ 2 */}
                <div className="space-y-2">
                  <input 
                    type="text"
                    placeholder="หัวข้อ เช่น งานประปา"
                    className="w-full rounded-lg border-gray-200 p-2.5 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none text-gray-900 text-sm font-medium"
                    value={formData.work2Label} 
                    onChange={(e) => setFormData({...formData, work2Label: e.target.value})} 
                  />
                  <textarea 
                    rows={2}
                    placeholder="รายละเอียด..."
                    className="w-full rounded-lg border-gray-200 p-2.5 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none text-gray-900 text-sm resize-none"
                    value={formData.work2Detail} 
                    onChange={(e) => setFormData({...formData, work2Detail: e.target.value})} 
                  />
                </div>

                {/* งานที่ 3 */}
                <div className="space-y-2">
                  <input 
                    type="text"
                    placeholder="หัวข้อ เช่น งานอื่นๆ"
                    className="w-full rounded-lg border-gray-200 p-2.5 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none text-gray-900 text-sm font-medium"
                    value={formData.work3Label} 
                    onChange={(e) => setFormData({...formData, work3Label: e.target.value})} 
                  />
                  <textarea 
                    rows={2}
                    placeholder="รายละเอียด..."
                    className="w-full rounded-lg border-gray-200 p-2.5 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none text-gray-900 text-sm resize-none"
                    value={formData.work3Detail} 
                    onChange={(e) => setFormData({...formData, work3Detail: e.target.value})} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: รูปภาพ */}
          <div className="p-6 border-t border-gray-100">
            <h2 className="text-base font-bold text-gray-900 mb-1">รูปภาพ</h2>
            <p className="text-sm text-gray-500 mb-6">อัปโหลดรูปภาพโครงการ</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Main Image */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    รูปภาพหลัก (Cover)
                  </label>
                  {mainImagePreview && (
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-200">
                      ✓ มีรูปภาพ
                    </span>
                  )}
                </div>
                
                {/* ใส่ URL รูปภาพ */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                    </svg>
                    หรือใส่ URL รูปภาพ
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={mainImageUrlInput}
                      onChange={(e) => handleMainImageUrlChange(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          confirmMainImageUrl();
                        }
                      }}
                      className="flex-1 rounded-lg border-gray-200 p-2.5 border-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all text-gray-900 text-sm"
                    />
                    <button
                      type="button"
                      onClick={confirmMainImageUrl}
                      className="px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold text-sm whitespace-nowrap"
                    >
                      ตกลง
                    </button>
                  </div>
                </div>
                
                <div className="relative border-2 border-dashed border-purple-200 rounded-2xl overflow-hidden hover:border-purple-400 transition-all bg-white group">
                  <input 
                    id="mainImage" 
                    type="file" 
                    accept="image/*" 
                    ref={mainImageInputRef}
                    title="อัปโหลดรูปภาพหลัก"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={handleMainImageChange}
                  />
                  
                  {mainImagePreview ? (
                    <div className="relative h-56 w-full">
                      <img src={mainImagePreview} alt="Preview" className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                        <div className="text-white mb-2">
                          <Icons.Cloud />
                        </div>
                        <span className="text-white font-semibold">เปลี่ยนรูปภาพ</span>
                      </div>
                    </div>
                  ) : (
                    <div className="py-12 flex flex-col items-center justify-center text-center">
                      <div className="text-purple-400 mb-3">
                        <Icons.Cloud />
                      </div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">คลิกเพื่ออัปโหลดรูปหลัก</p>
                      <p className="text-xs text-gray-400">PNG, JPG, WEBP (แนะนำ 16:9)</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Gallery */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                    รูปภาพเพิ่มเติม (Gallery)
                  </label>
                  <span className="text-xs text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200 font-semibold">
                    {existingGallery.length + galleryFiles.length + confirmedGalleryUrls.length} รูป
                  </span>
                </div>
                
                {/* ใส่ URL รูปภาพ Gallery */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                    </svg>
                    หรือใส่ URL รูปภาพ (คั่นด้วย comma หรือขึ้นบรรทัดใหม่)
                  </label>
                  <div className="space-y-2">
                    <textarea
                      rows={3}
                      placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg&#10;หรือคั่นด้วย comma: url1, url2, url3"
                      value={galleryUrlsInput}
                      onChange={(e) => setGalleryUrlsInput(e.target.value)}
                      className="w-full rounded-lg border-gray-200 p-2.5 border-2 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 focus:outline-none transition-all text-gray-900 text-sm resize-none"
                    />
                    <button
                      type="button"
                      onClick={confirmGalleryUrls}
                      className="w-full px-4 py-2.5 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors font-semibold text-sm"
                    >
                      ยืนยัน
                    </button>
                  </div>
                  
                  {/* แสดง URL ที่ยืนยันแล้ว */}
                  {confirmedGalleryUrls.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-3">
                      {confirmedGalleryUrls.map((url, idx) => (
                        <div key={`confirmed-${idx}`} className="relative aspect-square rounded-xl overflow-hidden border-2 border-green-200 group hover:border-green-400 transition-all shadow-sm">
                          <img src={url} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                          <div className="absolute top-1.5 left-1.5 bg-green-500 text-white text-[10px] px-1.5 py-0.5 rounded-md font-semibold">
                            URL
                          </div>
                          <button 
                            type="button" 
                            onClick={() => removeConfirmedGalleryUrl(idx)}
                            aria-label={`ลบรูปภาพที่ ${idx + 1}`}
                            className="absolute top-1.5 right-1.5 bg-red-500 text-white rounded-full p-1.5 shadow-lg opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all transform hover:scale-110"
                          >
                            <Icons.XMark />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="relative border-2 border-dashed border-pink-200 rounded-2xl overflow-hidden hover:border-pink-400 transition-all bg-white cursor-pointer">
                  <input 
                    id="galleryImages" 
                    type="file" 
                    accept="image/*" 
                    multiple 
                    ref={galleryInputRef}
                    title="อัปโหลดรูปภาพ Gallery"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleGalleryChange}
                  />
                  <div className="py-8 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center text-pink-500 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">เพิ่มรูปภาพ</p>
                    <p className="text-xs text-gray-400">เลือกได้หลายไฟล์พร้อมกัน</p>
                  </div>
                </div>

                {/* Gallery Preview Grid */}
                {(existingGallery.length > 0 || galleryFiles.length > 0) && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-4">
                    {existingGallery.map((url, idx) => (
                      <div key={`existing-${idx}`} className="relative aspect-square rounded-xl overflow-hidden border-2 border-gray-100 group hover:border-purple-300 transition-all shadow-sm">
                        <img src={url} alt="gallery" className="w-full h-full object-cover" />
                        <button 
                          type="button" 
                          onClick={() => removeExistingGalleryImage(idx)}
                          aria-label={`ลบรูปภาพที่ ${idx + 1}`}
                          className="absolute top-1.5 right-1.5 bg-red-500 text-white rounded-full p-1.5 shadow-lg opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all transform hover:scale-110"
                        >
                          <Icons.XMark />
                        </button>
                      </div>
                    ))}
                    
                    {galleryFiles.map((file, idx) => (
                      <div key={`new-${idx}`} className="relative aspect-square rounded-xl overflow-hidden border-2 border-blue-200 group hover:border-blue-400 transition-all shadow-sm">
                        <img src={URL.createObjectURL(file)} alt="gallery" className="w-full h-full object-cover" />
                        <div className="absolute top-1.5 left-1.5 bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded-md font-semibold">
                          ใหม่
                        </div>
                        <button 
                          type="button" 
                          onClick={() => removeGalleryImage(idx)}
                          aria-label={`ลบรูปภาพใหม่ที่ ${idx + 1}`}
                          className="absolute top-1.5 right-1.5 bg-red-500 text-white rounded-full p-1.5 shadow-lg opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all transform hover:scale-110"
                        >
                          <Icons.XMark />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Section */}
          <div className="p-6 bg-gray-50 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row gap-3">
              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-6 py-3 rounded-lg text-gray-700 font-medium border border-gray-300 hover:bg-gray-100 transition-colors"
                >
                  ยกเลิก
                </button>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className={`flex-1 py-3 px-6 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2 ${
                  isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    กำลังบันทึก...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {initialData ? 'บันทึกการแก้ไข' : 'บันทึกผลงาน'}
                  </>
                )}
              </button>
            </div>
          </div>

        </form>
      </div>

      {/* Success Toast */}
      <SuccessToast 
        isOpen={showToast} 
        message={toastMessage}
        fadeOut={toastFadeOut}
      />

      {/* Success Modal */}
      <SuccessModal 
        isOpen={showSuccess} 
        onClose={handleSuccessClose} 
        data={savedData}
      />
    </div>
  );
}
