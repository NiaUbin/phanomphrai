'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, updateDoc, doc, serverTimestamp, getDocs, deleteField, setDoc, getDoc, FieldValue } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { House } from '@/types';

interface GalleryItem {
  id?: string;
  title?: string;
  description: string;
  imageUrl: string;
  order?: number;
  houseId?: string;
}

interface GalleryFormProps {
  initialData?: GalleryItem;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function GalleryForm({ initialData, onSuccess, onCancel }: GalleryFormProps) {
  const isEdit = !!initialData;
  const [isLoading, setIsLoading] = useState(false);
  const [houses, setHouses] = useState<House[]>([]);
  const [isLoadingHouses, setIsLoadingHouses] = useState(true);
  const [idError, setIdError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    customId: initialData?.id || '',
    title: initialData?.title || '',
    description: initialData?.description || '',
    imageUrl: initialData?.imageUrl || '',
    order: initialData?.order || 0,
    houseId: initialData?.houseId || '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(initialData?.imageUrl || '');
  const [imageUrlInput, setImageUrlInput] = useState<string>(''); // สำหรับใส่ URL โดยตรง
  const [confirmedImageUrl, setConfirmedImageUrl] = useState<string>(''); // URL ที่ยืนยันแล้ว
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ดึงข้อมูล houses
  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'houses'));
        const housesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as House));
        housesData.sort((a, b) => {
          const orderA = typeof a.order === 'number' ? a.order : (a.order ? parseInt(String(a.order), 10) : 999999);
          const orderB = typeof b.order === 'number' ? b.order : (b.order ? parseInt(String(b.order), 10) : 999999);
          if (orderA === orderB) {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateB - dateA;
          }
          return orderA - orderB;
        });
        setHouses(housesData);
      } catch (error) {
        console.error('Error fetching houses:', error);
      } finally {
        setIsLoadingHouses(false);
      }
    };

    fetchHouses();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      // ล้าง URL เมื่อเลือกไฟล์
      setImageUrlInput('');
      setConfirmedImageUrl('');
    }
  };

  const handleImageUrlChange = (url: string) => {
    setImageUrlInput(url);
  };

  const confirmImageUrl = () => {
    const url = imageUrlInput.trim();
    if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
      setConfirmedImageUrl(url);
      setImagePreview(url);
      setImageFile(null); // ล้างไฟล์เมื่อใส่ URL
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } else {
      alert('กรุณาใส่ URL ที่ถูกต้อง (ต้องขึ้นต้นด้วย http:// หรือ https://)');
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
    setImageUrlInput('');
    setConfirmedImageUrl('');
    setFormData(prev => ({ ...prev, imageUrl: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const timestamp = Date.now();
    const storageRef = ref(storage, `gallery/${timestamp}_${file.name}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.description.trim()) {
      alert('กรุณากรอกคำอธิบาย');
      return;
    }

    if (!imagePreview && !formData.imageUrl) {
      alert('กรุณาเลือกรูปภาพ');
      return;
    }

    setIsLoading(true);
    setIdError(null);

    try {
      let imageUrl = '';

      if (imageFile) {
        // ถ้ามีไฟล์ให้อัปโหลด
        imageUrl = await uploadImage(imageFile);
      } else if (confirmedImageUrl) {
        // ถ้ามี URL ที่ยืนยันแล้วให้ใช้
        imageUrl = confirmedImageUrl;
      } else if (imagePreview) {
        // ถ้ามี preview (กรณีแก้ไข) ให้ใช้
        imageUrl = imagePreview;
      } else {
        alert('กรุณาเลือกรูปภาพหรือใส่ URL');
        setIsLoading(false);
        return;
      }

      const galleryData: {
        title?: string;
        description: string;
        imageUrl: string;
        order: number;
        updatedAt: FieldValue;
        houseId?: string | FieldValue;
      } = {
        description: formData.description.trim(),
        imageUrl: imageUrl,
        order: formData.order || 0,
        updatedAt: serverTimestamp(),
      };

      // เพิ่ม title เฉพาะเมื่อมีค่า
      if (formData.title && formData.title.trim() !== '') {
        galleryData.title = formData.title.trim();
      }

      // จัดการ houseId
      if (formData.houseId && formData.houseId.trim() !== '') {
        // ถ้ามีค่า ให้เพิ่ม houseId
        galleryData.houseId = formData.houseId.trim();
      } else if (isEdit && initialData?.houseId) {
        // ถ้าแก้ไขและเลือก "-- ไม่เชื่อมโยง --" ให้ลบ houseId ออก
        galleryData.houseId = deleteField();
      }

      if (isEdit && initialData?.id) {
        // แก้ไขข้อมูล
        const docRef = doc(db, 'gallery', initialData.id);
        await updateDoc(docRef, galleryData);
      } else if (formData.customId && formData.customId.trim() !== '') {
        // บันทึกด้วย Custom ID - เช็คซ้ำก่อน
        const cleanId = formData.customId.trim().replace(/\s+/g, '-').toLowerCase();
        
        // ตรวจสอบว่า ID นี้มีอยู่แล้วหรือไม่
        const existingDoc = await getDoc(doc(db, 'gallery', cleanId));
        if (existingDoc.exists()) {
          setIsLoading(false);
          setIdError(`ID "${cleanId}" มีอยู่ในระบบแล้ว กรุณาใช้ ID อื่น`);
          return;
        }
        
        const newGalleryData: {
          title?: string;
          description: string;
          imageUrl: string;
          order: number;
          updatedAt: FieldValue;
          createdAt: FieldValue;
          houseId?: string | FieldValue;
        } = {
          ...galleryData,
          createdAt: serverTimestamp(),
        };
        
        // เพิ่ม houseId เฉพาะเมื่อมีค่า (ถ้าเป็น string)
        if (formData.houseId && formData.houseId.trim() !== '') {
          newGalleryData.houseId = formData.houseId.trim();
        }
        
        await setDoc(doc(db, 'gallery', cleanId), newGalleryData);
      } else {
        // บันทึกด้วย Auto ID
        const newGalleryData: {
          title?: string;
          description: string;
          imageUrl: string;
          order: number;
          updatedAt: FieldValue;
          createdAt: FieldValue;
          houseId?: string | FieldValue;
        } = {
          ...galleryData,
          createdAt: serverTimestamp(),
        };
        
        // เพิ่ม houseId เฉพาะเมื่อมีค่า (ถ้าเป็น string)
        if (formData.houseId && formData.houseId.trim() !== '') {
          newGalleryData.houseId = formData.houseId.trim();
        }
        
        await addDoc(collection(db, 'gallery'), newGalleryData);
      }

      alert(isEdit ? 'แก้ไขสำเร็จ!' : 'บันทึกสำเร็จ!');
      
      if (!isEdit) {
        setFormData({ customId: '', title: '', description: '', imageUrl: '', order: 0, houseId: '' });
        setImageFile(null);
        setImagePreview('');
        setImageUrlInput('');
        setConfirmedImageUrl('');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }

      onSuccess?.();
    } catch (error) {
      console.error('Error saving gallery item:', error);
      alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-800">
          {isEdit ? 'แก้ไขรายการ' : 'เพิ่มการันตีคุณภาพ'}
        </h2>
        {isEdit && initialData?.id && (
          <p className="text-sm text-gray-500 mt-1">
            ID: <code className="bg-gray-200 px-1.5 py-0.5 rounded text-xs">{initialData.id}</code>
          </p>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-5 space-y-5">
        {/* Custom ID - แสดงเฉพาะตอนเพิ่มใหม่ */}
        {!isEdit && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ID (ไม่บังคับ)
            </label>
            <input
              type="text"
              value={formData.customId}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, customId: e.target.value }));
                setIdError(null);
              }}
              placeholder="เช่น: service-1 (ถ้าไม่กรอก ระบบจะสร้างให้อัตโนมัติ)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 text-sm"
            />
            {idError && (
              <p className="text-xs text-red-500 mt-1">{idError}</p>
            )}
            <p className="text-xs text-gray-400 mt-1">ใช้ตัวอักษรภาษาอังกฤษ ตัวเลข และ - เท่านั้น</p>
          </div>
        )}

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            รูปภาพ <span className="text-red-500">*</span>
          </label>
          
          {imagePreview ? (
            <div className="space-y-3">
              <div className="relative w-48 aspect-[4/5] rounded-lg overflow-hidden border border-gray-200 group">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
                <button
                  title="ลบรูปภาพ"
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full text-gray-600 hover:text-red-600 hover:bg-white transition-colors shadow-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <label className="flex flex-col items-center justify-center w-48 aspect-[4/5] border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-400 mb-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                </svg>
                <span className="text-sm text-gray-500">คลิกเพื่ออัปโหลด</span>
                <span className="text-xs text-gray-400 mt-1">PNG, JPG</span>
                <input
                  title="อัปโหลดรูปภาพ"
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
              
              {/* URL Input */}
              <div className="space-y-2">
                <p className="text-sm text-gray-600">หรือใส่ URL รูปภาพ</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={imageUrlInput}
                    onChange={(e) => handleImageUrlChange(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 text-sm"
                  />
                  <button
                    type="button"
                    onClick={confirmImageUrl}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    ยืนยัน
                  </button>
                </div>
                <p className="text-xs text-gray-400">กดยืนยันเพื่อดูรูปภาพ</p>
              </div>
            </div>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            หัวข้อ (ไม่บังคับ)
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="เช่น: โครงการบ้านพักอาศัย"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 text-sm"
          />
          <p className="text-xs text-gray-400 mt-1">หัวข้อที่จะแสดงในหน้ารายละเอียด</p>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            คำอธิบาย <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="เช่น: โครงการสร้างบ้านพักอาศัย 1 ชั้น"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none text-gray-900 text-sm"
          />
        </div>

        {/* House Link */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            เชื่อมโยงกับผลงาน (ไม่บังคับ)
          </label>
          {isLoadingHouses ? (
            <div className="text-sm text-gray-500">กำลังโหลด...</div>
          ) : (
            <select
              value={formData.houseId}
              onChange={(e) => setFormData(prev => ({ ...prev, houseId: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 text-sm"
              aria-label="เลือกผลงานที่จะเชื่อมโยง"
            >
              <option value="">-- ไม่เชื่อมโยง --</option>
              {houses.map((house) => (
                <option key={house.id} value={house.id}>
                  {house.title}
                </option>
              ))}
            </select>
          )}
          <p className="text-xs text-gray-400 mt-1">เลือกผลงานที่จะเชื่อมโยง เมื่อคลิกที่การ์ดจะไปหน้ารายละเอียดผลงาน</p>
        </div>

        {/* Order */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ลำดับการแสดงผล
          </label>
          <input
            type="number"
            value={formData.order}
            onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
            placeholder="0"
            className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 text-sm"
          />
          <p className="text-xs text-gray-400 mt-1">ตัวเลขน้อยจะแสดงก่อน</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-3 border-t border-gray-100">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ยกเลิก
            </button>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className={`px-5 py-2 text-sm font-medium rounded-lg transition-all ${
              isLoading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isLoading ? 'กำลังบันทึก...' : (isEdit ? 'บันทึกการแก้ไข' : 'เพิ่มรายการ')}
          </button>
        </div>
      </form>
    </div>
  );
}
