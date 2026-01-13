'use client';

import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import Link from 'next/link';
import { QuotationFormData } from '@/types';
import PersonalInfoSection from '@/components/quotation/PersonalInfoSection';
import WorkTypeSection from '@/components/quotation/WorkTypeSection';
import ProjectDetailsSection from '@/components/quotation/ProjectDetailsSection';

/**
 * Quotation Page - หน้าใบเสนอราคา
 * 
 * ฟอร์มสำหรับลูกค้าขอใบเสนอราคา - ดีไซน์มืออาชีพ
 */

export default function QuotationPage() {
  const [formData, setFormData] = useState<QuotationFormData>({
    name: '',
    phone: '',
    email: '',
    lineId: '',
    workTypes: [],
    otherWorkType: '',
    area: '',
    subDistrict: '',
    district: '',
    province: '',
    additionalDetails: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [pdpaConsent, setPdpaConsent] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleFieldChange = (field: keyof QuotationFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleWorkTypeChange = (workType: string) => {
    setFormData((prev) => {
      if (prev.workTypes.includes(workType)) {
        return {
          ...prev,
          workTypes: prev.workTypes.filter((type) => type !== workType),
          otherWorkType: workType === 'อื่นๆ' ? '' : prev.otherWorkType,
        };
      } else {
        return {
          ...prev,
          workTypes: [...prev.workTypes, workType],
        };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.email || !formData.lineId) {
      alert('กรุณากรอกข้อมูลส่วนตัวให้ครบถ้วน');
      return;
    }

    if (formData.workTypes.length === 0) {
      alert('กรุณาเลือกลักษณะงานที่สนใจอย่างน้อย 1 ข้อ');
      return;
    }

    if (formData.workTypes.includes('อื่นๆ') && !formData.otherWorkType.trim()) {
      alert('กรุณากรอกรายละเอียดลักษณะงาน "อื่นๆ"');
      return;
    }

    if (!formData.area || !formData.subDistrict || !formData.district || !formData.province) {
      alert('กรุณากรอกข้อมูลขนาดพื้นที่และสถานที่ตั้งให้ครบถ้วน');
      return;
    }

    if (!pdpaConsent) {
      alert('กรุณายอมรับนโยบายความเป็นส่วนตัวก่อนส่งข้อมูล');
      return;
    }

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'quotationRequests'), {
        ...formData,
        pdpaConsent: true,
        pdpaConsentDate: new Date(),
        status: 'pending',
        createdAt: new Date(),
      });

      setShowSuccess(true);
      
      setTimeout(() => {
        setFormData({
          name: '',
          phone: '',
          email: '',
          lineId: '',
          workTypes: [],
          otherWorkType: '',
          area: '',
          subDistrict: '',
          district: '',
          province: '',
          additionalDetails: '',
        });
        setPdpaConsent(false);
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error saving quotation request:', error);
      alert('เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-slate-100 pt-18 sm:pt-22 pb-8 sm:pb-12">
      <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 mt-2 sm:mt-4">
        
        {/* Company Header */}
        <div className="bg-white border-b-4 border-blue-800 shadow-sm">
          <div className="px-4 sm:px-8 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
              <div className="text-center sm:text-left">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
                  Phanomphrai Home
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5 sm:mt-1">
                  รับเหมาก่อสร้าง ต่อเติม รีโนเวท ครบวงจร
                </p>
              </div>
              <div className="text-center sm:text-right text-xs sm:text-sm text-slate-600">
                <p>โทร: 092-262-0227</p>
                <p>Line: <a href="https://line.me/ti/p/@phanomphrai">@phanomphrai</a></p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Title */}
        <div className="bg-blue-800 text-white px-4 sm:px-8 py-4 sm:py-5 shadow-sm">
          <h2 className="text-base sm:text-xl font-semibold text-center">
            แบบฟอร์มขอใบเสนอราคา
          </h2>
          <p className="text-blue-200 text-xs sm:text-sm text-center mt-1 sm:mt-2">
            กรุณากรอกข้อมูลให้ครบถ้วน เพื่อให้เราประเมินราคาได้อย่างแม่นยำ
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white shadow-sm border border-slate-200 border-t-0">
          {showSuccess ? (
            <div className="text-center py-10 sm:py-16 px-4 sm:px-8">
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 bg-green-100 rounded-full mb-4 sm:mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7 sm:w-10 sm:h-10 text-green-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-slate-800 mb-2">ส่งข้อมูลสำเร็จ</h3>
              <p className="text-sm sm:text-base text-slate-600 mb-6">
                ทางเราได้รับข้อมูลของท่านเรียบร้อยแล้ว<br />
                จะติดต่อกลับภายใน 24 ชั่วโมง
              </p>
              <div className="border-t border-slate-200 pt-6">
                <p className="text-xs sm:text-sm text-slate-500 mb-4">หมายเลขอ้างอิง: QT-{Date.now()}</p>
                <Link
                  href="/"
                  className="inline-block px-5 sm:px-8 py-2.5 sm:py-3 bg-blue-800 text-white text-sm sm:text-base font-medium rounded hover:bg-blue-900 transition-colors"
                >
                  กลับหน้าหลัก
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <PersonalInfoSection 
                formData={formData} 
                onChange={handleFieldChange} 
              />
              
              <WorkTypeSection
                formData={formData}
                isDropdownOpen={isDropdownOpen}
                onDropdownToggle={() => setIsDropdownOpen(!isDropdownOpen)}
                onWorkTypeChange={handleWorkTypeChange}
                onOtherWorkTypeChange={(value) => handleFieldChange('otherWorkType', value)}
                onDropdownClose={() => setIsDropdownOpen(false)}
              />

              <ProjectDetailsSection 
                formData={formData} 
                onChange={handleFieldChange} 
              />

              {/* PDPA Consent & Submit */}
              <div className="px-4 sm:px-8 py-5 sm:py-7 bg-slate-50">
                <label className="flex items-start gap-2.5 sm:gap-3 p-3 sm:p-4 bg-white border border-slate-200 rounded cursor-pointer mb-4 sm:mb-5">
                  <input
                    type="checkbox"
                    checked={pdpaConsent}
                    onChange={(e) => setPdpaConsent(e.target.checked)}
                    className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 text-blue-600 border-slate-300 rounded focus:ring-blue-500 flex-shrink-0"
                    required
                  />
                  <span className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    ข้าพเจ้ายินยอมให้เก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคลของข้าพเจ้า เพื่อวัตถุประสงค์ในการติดต่อกลับและเสนอราคา ตาม{' '}
                    <span className="text-blue-600 underline">นโยบายความเป็นส่วนตัว</span>
                    <span className="text-red-500 ml-1">*</span>
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 sm:py-4 bg-blue-800 text-white text-sm sm:text-base font-semibold rounded hover:bg-blue-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      กำลังส่งข้อมูล...
                    </span>
                  ) : (
                    'ส่งแบบฟอร์มขอใบเสนอราคา'
                  )}
                </button>

                <p className="text-[10px] sm:text-xs text-slate-500 text-center mt-3 sm:mt-4">
                  ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง ในวันและเวลาทำการ
                </p>
              </div>

            </form>
          )}
        </div>

        {/* Footer Note */}
        <div className="mt-4 sm:mt-6 text-center">
          <Link href="/" className="text-xs sm:text-sm text-slate-600 hover:text-blue-800 transition-colors">
            ← กลับหน้าหลัก
          </Link>
        </div>

      </div>
    </div>
  );
}
