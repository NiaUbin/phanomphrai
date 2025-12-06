'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { HeroContent } from '@/types';

const HERO_DOC_ID = 'main';

const defaultContent: HeroContent = {
  title: 'สร้างบ้านในฝันของคุณ',
  subtitle: 'บริการก่อสร้างคุณภาพสูง ด้วยทีมงานมืออาชีพและวัสดุคุณภาพ',
  button1Text: 'ติดต่อเรา',
  button1Link: '#contact',
  button2Text: 'ดูบริการของเรา',
  button2Link: '#services',
};

export default function HeroForm() {
  const [content, setContent] = useState<HeroContent>(defaultContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // โหลดข้อมูล
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, 'heroContent', HERO_DOC_ID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setContent(docSnap.data() as HeroContent);
        }
      } catch (error) {
        console.error('Error fetching hero content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  // บันทึกข้อมูล
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const docRef = doc(db, 'heroContent', HERO_DOC_ID);
      await setDoc(docRef, {
        ...content,
        updatedAt: new Date().toISOString(),
      });

      setMessage({ type: 'success', text: 'บันทึกสำเร็จ!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Error saving hero content:', error);
      setMessage({ type: 'error', text: 'เกิดข้อผิดพลาดในการบันทึก' });
    } finally {
      setSaving(false);
    }
  };

  // reset
  const handleReset = () => {
    if (confirm('คุณต้องการรีเซ็ตเป็นค่าเริ่มต้นหรือไม่?')) {
      setContent(defaultContent);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">กำลังโหลด...</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">ตั้งค่า Hero Section</h2>
        <p className="text-sm text-gray-500 mt-1">แก้ไขข้อความและปุ่มบนหน้าแรก</p>
      </div>

      {/* Preview */}
      <div className="mb-6 p-6 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl text-white">
        <p className="text-xs uppercase tracking-wider text-blue-200 mb-2">ตัวอย่าง</p>
        <h3 className="text-2xl font-bold mb-2">{content.title || 'หัวข้อหลัก'}</h3>
        <p className="text-blue-100 mb-4">{content.subtitle || 'คำอธิบาย'}</p>
        <div className="flex gap-3">
          <span className="px-4 py-2 bg-white text-blue-600 rounded-lg text-sm font-medium">
            {content.button1Text || 'ปุ่ม 1'}
          </span>
          <span className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium">
            {content.button2Text || 'ปุ่ม 2'}
          </span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            หัวข้อหลัก <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={content.title}
            onChange={(e) => setContent({ ...content, title: e.target.value })}
            placeholder="สร้างบ้านในฝันของคุณ"
            className="
              w-full px-4 py-2.5 
              border border-gray-300 rounded-lg 
              text-gray-900 text-base font-medium
              placeholder:text-gray-400
              focus:ring-2 focus:ring-blue-500 focus:border-transparent 
              transition-all
            "
            required
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            คำอธิบาย <span className="text-red-500">*</span>
          </label>
          <textarea
            value={content.subtitle}
            onChange={(e) => setContent({ ...content, subtitle: e.target.value })}
            placeholder="บริการก่อสร้างคุณภาพสูง ด้วยทีมงานมืออาชีพและวัสดุคุณภาพ"
            rows={3}
            className="
              w-full px-4 py-2.5 
              border border-gray-300 rounded-lg 
              text-gray-900 text-base font-medium
              placeholder:text-gray-400
              focus:ring-2 focus:ring-blue-500 focus:border-transparent 
              transition-all resize-none
            "
            required
          />
        </div>

        {/* Button 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              ข้อความปุ่มที่ 1
            </label>
            <input
              type="text"
              value={content.button1Text}
              onChange={(e) => setContent({ ...content, button1Text: e.target.value })}
              placeholder="ติดต่อเรา"
              className="
                w-full px-4 py-2.5 
                border border-gray-300 rounded-lg 
                text-gray-900 text-base font-medium
                placeholder:text-gray-400
                focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                transition-all
              "
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              ลิงก์ปุ่มที่ 1
            </label>
            <input
              type="text"
              value={content.button1Link}
              onChange={(e) => setContent({ ...content, button1Link: e.target.value })}
              placeholder="#contact"
              className="
                w-full px-4 py-2.5 
                border border-gray-300 rounded-lg 
                text-gray-900 text-base font-medium
                placeholder:text-gray-400
                focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                transition-all
              "
            />
          </div>
        </div>

        {/* Button 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              ข้อความปุ่มที่ 2
            </label>
            <input
              type="text"
              value={content.button2Text}
              onChange={(e) => setContent({ ...content, button2Text: e.target.value })}
              placeholder="ดูบริการของเรา"
              className="
                w-full px-4 py-2.5 
                border border-gray-300 rounded-lg 
                text-gray-900 text-base font-medium
                placeholder:text-gray-400
                focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                transition-all
              "
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              ลิงก์ปุ่มที่ 2
            </label>
            <input
              type="text"
              value={content.button2Link}
              onChange={(e) => setContent({ ...content, button2Link: e.target.value })}
              placeholder="#services"
              className="
                w-full px-4 py-2.5 
                border border-gray-300 rounded-lg 
                text-gray-900 text-base font-medium
                placeholder:text-gray-400
                focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                transition-all
              "
            />
          </div>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                กำลังบันทึก...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                บันทึก
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            รีเซ็ต
          </button>
        </div>

      </form>
    </div>
  );
}
