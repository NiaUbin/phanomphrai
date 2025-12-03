/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useRef, useEffect } from 'react';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Icons } from './Icons';
import { House } from '@/types';

interface HouseFormProps {
  initialData?: House;
  onSuccess: () => void;
  onCancel?: () => void;
}

export default function HouseForm({ initialData, onSuccess, onCancel }: HouseFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  // Refs for clearing file inputs
  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // Form Data
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    fullDescription: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
  });

  // Images
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [existingGallery, setExistingGallery] = useState<string[]>([]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        price: initialData.price || '',
        description: initialData.description || '',
        fullDescription: initialData.fullDescription || '',
        bedrooms: initialData.specifications?.bedrooms || '',
        bathrooms: initialData.specifications?.bathrooms || '',
        area: initialData.specifications?.area || '',
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
    }
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
      let mainImageUrl = mainImagePreview || '';
      if (imageFile) {
        const storageRef = ref(storage, `house-images/main/${Date.now()}-${imageFile.name}`);
        const snapshot = await uploadBytes(storageRef, imageFile);
        mainImageUrl = await getDownloadURL(snapshot.ref);
      }

      const newGalleryUrls: string[] = [];
      if (galleryFiles.length > 0) {
        const uploadPromises = galleryFiles.map(async (file) => {
          const storageRef = ref(storage, `house-images/gallery/${Date.now()}-${file.name}`);
          const snapshot = await uploadBytes(storageRef, file);
          return getDownloadURL(snapshot.ref);
        });
        const uploadedUrls = await Promise.all(uploadPromises);
        newGalleryUrls.push(...uploadedUrls);
      }

      const finalGalleryUrls = [...existingGallery, ...newGalleryUrls];
      const allImagesArray = mainImageUrl ? [mainImageUrl, ...finalGalleryUrls] : [...finalGalleryUrls];

      const houseData = {
        ...formData,
        mainImage: mainImageUrl,
        images: allImagesArray,
        specifications: {
          bedrooms: formData.bedrooms,
          bathrooms: formData.bathrooms,
          area: formData.area
        },
        updatedAt: new Date()
      };

      if (initialData?.id) {
        await updateDoc(doc(db, 'houses', initialData.id), houseData);
        alert('✅ แก้ไขข้อมูลสำเร็จ!');
      } else {
        await addDoc(collection(db, 'houses'), {
          ...houseData,
          features: [],
          createdAt: new Date()
        });
        alert('✅ บันทึกข้อมูลสำเร็จ!');
      }
      
      onSuccess();

    } catch (error) {
      console.error('Error:', error);
      alert('❌ เกิดข้อผิดพลาด: ' + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className={`rounded-2xl p-6 sm:p-8 border shadow-sm ${
        initialData 
          ? 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-100/50' 
          : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100/50'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className={`p-4 rounded-2xl shadow-sm border ${
            initialData 
              ? 'bg-white border-amber-100 text-amber-600' 
              : 'bg-white border-blue-100 text-blue-600'
          }`}>
            {initialData ? <Icons.Pencil /> : <Icons.Plus />}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {initialData ? 'แก้ไขข้อมูลบ้าน' : 'เพิ่มผลงานใหม่'}
            </h1>
            <p className="text-gray-600 mt-1">
              {initialData 
                ? `กำลังแก้ไข: ${initialData.title}` 
                : 'กรอกข้อมูลโครงการใหม่เพื่อนำขึ้นเว็บไซต์'}
            </p>
          </div>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white hover:bg-gray-50 rounded-xl border border-gray-200 transition-all shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
              </svg>
              ย้อนกลับ
            </button>
          )}
        </div>

      </div>

      {/* Progress Steps - 3 Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Step 1 */}
        <div className="bg-white rounded-xl p-4 border-2 border-blue-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-105 transition-transform">
              1
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900">ข้อมูลทั่วไป</h3>
              <p className="text-xs text-gray-500">ชื่อ, ราคา, คำอธิบาย</p>
            </div>
            <div className="text-blue-500">
              <Icons.Doc />
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white rounded-xl p-4 border-2 border-emerald-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all group">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-105 transition-transform">
              2
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900">สเปคบ้าน</h3>
              <p className="text-xs text-gray-500">ห้องนอน, ห้องน้ำ, พื้นที่</p>
            </div>
            <div className="text-emerald-500">
              <Icons.Stack />
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-white rounded-xl p-4 border-2 border-purple-200 shadow-sm hover:shadow-md hover:border-purple-300 transition-all group">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-105 transition-transform">
              3
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900">รูปภาพ</h3>
              <p className="text-xs text-gray-500">รูปหลัก, Gallery</p>
            </div>
            <div className="text-purple-500">
              <Icons.Photo />
            </div>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <form onSubmit={handleSubmit}>
          
          {/* Section 1: ข้อมูลทั่วไป */}
          <div className="p-6 sm:p-8 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-blue-100 rounded-xl text-blue-600">
                <Icons.Doc />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">ข้อมูลทั่วไป</h2>
                <p className="text-sm text-gray-500">ชื่อโครงการและรายละเอียด</p>
              </div>
            </div>
            
            <div className="space-y-5">
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
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                    ราคา
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                      <Icons.Money />
                    </span>
                    <input 
                      id="price" 
                      type="text" 
                      required 
                      placeholder="เช่น เริ่มต้น 3.5 ล้านบาท"
                      className="w-full rounded-xl border-gray-200 p-3.5 pl-11 border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all text-gray-900 placeholder:text-gray-400"
                      value={formData.price} 
                      onChange={(e) => setFormData({...formData, price: e.target.value})} 
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
          <div className="p-6 sm:p-8 border-b border-gray-100 bg-gradient-to-r from-emerald-50/30 to-green-50/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-emerald-100 rounded-xl text-emerald-600">
                <Icons.Stack />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">สเปคบ้าน</h2>
                <p className="text-sm text-gray-500">รายละเอียดห้องและพื้นที่ใช้สอย</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {/* ห้องนอน */}
              <div className="bg-white rounded-xl p-4 border border-emerald-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-emerald-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M4.5 10.5H18V15H4.5v-4.5zM3.75 18h15A2.25 2.25 0 0021 15.75v-6a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 001.5 9.75v6A2.25 2.25 0 003.75 18z" />
                    </svg>
                  </div>
                  <label htmlFor="bedrooms" className="text-sm font-bold text-gray-700">ห้องนอน</label>
                </div>
                <input 
                  id="bedrooms" 
                  type="text" 
                  placeholder="เช่น 3"
                  className="w-full rounded-lg border-gray-200 p-3 border-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition-all text-gray-900 text-center text-lg font-semibold"
                  value={formData.bedrooms} 
                  onChange={(e) => setFormData({...formData, bedrooms: e.target.value})} 
                />
              </div>

              {/* ห้องน้ำ */}
              <div className="bg-white rounded-xl p-4 border border-emerald-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <label htmlFor="bathrooms" className="text-sm font-bold text-gray-700">ห้องน้ำ</label>
                </div>
                <input 
                  id="bathrooms" 
                  type="text" 
                  placeholder="เช่น 2"
                  className="w-full rounded-lg border-gray-200 p-3 border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all text-gray-900 text-center text-lg font-semibold"
                  value={formData.bathrooms} 
                  onChange={(e) => setFormData({...formData, bathrooms: e.target.value})} 
                />
              </div>

              {/* พื้นที่ */}
              <div className="bg-white rounded-xl p-4 border border-emerald-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-amber-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                    </svg>
                  </div>
                  <label htmlFor="area" className="text-sm font-bold text-gray-700">พื้นที่</label>
                </div>
                <div className="relative">
                  <input 
                    id="area" 
                    type="text" 
                    placeholder="เช่น 150"
                    className="w-full rounded-lg border-gray-200 p-3 pr-16 border-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:outline-none transition-all text-gray-900 text-center text-lg font-semibold"
                    value={formData.area} 
                    onChange={(e) => setFormData({...formData, area: e.target.value})} 
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">ตร.ม.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: รูปภาพ */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-purple-50/30 to-pink-50/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-purple-100 rounded-xl text-purple-600">
                <Icons.Photo />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">รูปภาพ</h2>
                <p className="text-sm text-gray-500">อัปโหลดรูปภาพโครงการ</p>
              </div>
            </div>

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
                    {existingGallery.length + galleryFiles.length} รูป
                  </span>
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
          <div className="p-6 sm:p-8 bg-gray-50 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row gap-4">
              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="flex-1 sm:flex-none px-8 py-4 rounded-xl text-gray-700 font-bold border-2 border-gray-300 hover:bg-white hover:border-gray-400 transition-all flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  ยกเลิก
                </button>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className={`flex-1 py-4 px-8 rounded-xl text-white font-bold text-lg shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 ${
                  isLoading 
                    ? 'bg-gray-400 cursor-not-allowed shadow-none' 
                    : initialData
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    กำลังบันทึก...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {initialData ? 'บันทึกการแก้ไข' : 'บันทึกข้อมูลโครงการ'}
                  </>
                )}
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
