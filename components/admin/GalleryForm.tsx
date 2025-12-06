'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface GalleryItem {
  id?: string;
  description: string;
  imageUrl: string;
  order?: number;
}

interface GalleryFormProps {
  initialData?: GalleryItem;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function GalleryForm({ initialData, onSuccess, onCancel }: GalleryFormProps) {
  const isEdit = !!initialData;
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    description: initialData?.description || '',
    imageUrl: initialData?.imageUrl || '',
    order: initialData?.order || 0,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(initialData?.imageUrl || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
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

    try {
      let imageUrl = formData.imageUrl;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const galleryData = {
        description: formData.description.trim(),
        imageUrl: imageUrl,
        order: formData.order || 0,
        updatedAt: serverTimestamp(),
      };

      if (isEdit && initialData?.id) {
        const docRef = doc(db, 'gallery', initialData.id);
        await updateDoc(docRef, galleryData);
      } else {
        await addDoc(collection(db, 'gallery'), {
          ...galleryData,
          createdAt: serverTimestamp(),
        });
      }

      alert(isEdit ? 'แก้ไขสำเร็จ!' : 'บันทึกสำเร็จ!');
      
      if (!isEdit) {
        setFormData({ description: '', imageUrl: '', order: 0 });
        setImageFile(null);
        setImagePreview('');
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
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            รูปภาพ <span className="text-red-500">*</span>
          </label>
          
          {imagePreview ? (
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
          ) : (
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
          )}
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
