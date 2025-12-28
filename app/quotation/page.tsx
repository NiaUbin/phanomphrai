'use client';

import { useState, useRef, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import Link from 'next/link';

/**
 * Quotation Page - หน้าใบเสนอราคา
 * 
 * ฟอร์มสำหรับลูกค้าขอใบเสนอราคา - ดีไซน์มืออาชีพ
 */

interface QuotationFormData {
  name: string;
  phone: string;
  email: string;
  lineId: string;
  workTypes: string[];
  otherWorkType: string;
  area: string;
  subDistrict: string;
  district: string;
  province: string;
  additionalDetails: string;
}

const workTypeOptions = [
  'สร้างบ้าน',
  'ต่อเติมบ้าน อาคาร อื่นๆ',
  'รีโนเวทบ้าน อาคาร อื่นๆ',
  'ตกแต่งภายใน บิ้วอิน ผ้าม่าน วอลเปเปอร์',
  'งานหลังคา กันสาด',
  'งานมุ้งลวด เหล็กดัด',
];

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
  
  // Dropdown state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  // Get display text for selected work types
  const getSelectedWorkTypesText = () => {
    if (formData.workTypes.length === 0) {
      return 'เลือกลักษณะงานที่สนใจ';
    }
    if (formData.workTypes.length === 1) {
      return formData.workTypes[0];
    }
    return `เลือกแล้ว ${formData.workTypes.length} รายการ`;
  };

  return (
    <div className="min-h-screen bg-slate-100 pt-16 sm:pt-20 pb-8 sm:pb-12">
      <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 mt-2">
        
        {/* Company Header */}
        <div className="bg-white border-b-4 border-blue-800 shadow-sm">
          <div className="px-4 sm:px-8 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
              <div className="text-center sm:text-left">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
                  พนมไพร โฮม
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5 sm:mt-1">
                  รับเหมาก่อสร้าง ต่อเติม รีโนเวท ครบวงจร
                </p>
              </div>
              <div className="text-center sm:text-right text-xs sm:text-sm text-slate-600">
                <p>โทร: 092-262-0227</p>
                <p>Line: @phanomphrai</p>
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
              
              {/* Section 1: Personal Information */}
              <div className="px-4 sm:px-8 py-5 sm:py-7 border-b border-slate-200">
                <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-5">
                  <span className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-blue-800 text-white text-xs sm:text-sm font-bold rounded-full flex items-center justify-center">
                    1
                  </span>
                  <h3 className="font-semibold text-sm sm:text-base text-slate-800">ข้อมูลผู้ติดต่อ</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
                      ชื่อ-นามสกุล <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="ระบุชื่อ-นามสกุล"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 text-sm sm:text-base"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
                      เบอร์โทรศัพท์ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0XX-XXX-XXXX"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 text-sm sm:text-base"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
                      อีเมล <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="example@email.com"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 text-sm sm:text-base"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
                      Line ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.lineId}
                      onChange={(e) => setFormData({ ...formData, lineId: e.target.value })}
                      placeholder="ระบุ Line ID"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 text-sm sm:text-base"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Work Type - Dropdown */}
              <div className="px-4 sm:px-8 py-5 sm:py-7 border-b border-slate-200">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                  <span className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-blue-800 text-white text-xs sm:text-sm font-bold rounded-full flex items-center justify-center">
                    2
                  </span>
                  <h3 className="font-semibold text-sm sm:text-base text-slate-800">ลักษณะงานที่สนใจ</h3>
                  <span className="text-[10px] sm:text-xs text-slate-500">(เลือกได้มากกว่า 1 ข้อ)</span>
                </div>
                
                {/* Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded text-left flex items-center justify-between transition-colors text-sm sm:text-base ${
                      formData.workTypes.length > 0 
                        ? 'border-blue-500 bg-blue-50 text-slate-800' 
                        : 'border-slate-300 text-slate-500 hover:border-slate-400'
                    } ${isDropdownOpen ? 'ring-2 ring-blue-500' : ''}`}
                  >
                    <span className={formData.workTypes.length > 0 ? 'text-slate-800' : ''}>
                      {getSelectedWorkTypesText()}
                    </span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={2} 
                      stroke="currentColor" 
                      className={`w-4 h-4 sm:w-5 sm:h-5 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute z-20 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                      {workTypeOptions.map((workType) => (
                        <label
                          key={workType}
                          className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
                            formData.workTypes.includes(workType)
                              ? 'bg-blue-50'
                              : 'hover:bg-slate-50'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={formData.workTypes.includes(workType)}
                            onChange={() => handleWorkTypeChange(workType)}
                            className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm sm:text-base text-slate-700">{workType}</span>
                        </label>
                      ))}
                      
                      {/* อื่นๆ */}
                      <label
                        className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors border-t border-slate-100 ${
                          formData.workTypes.includes('อื่นๆ')
                            ? 'bg-blue-50'
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.workTypes.includes('อื่นๆ')}
                          onChange={() => handleWorkTypeChange('อื่นๆ')}
                          className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm sm:text-base text-slate-700">อื่นๆ (โปรดระบุ)</span>
                      </label>
                    </div>
                  )}
                </div>

                {/* Show selected items as tags */}
                {formData.workTypes.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.workTypes.map((type) => (
                      <span
                        key={type}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-100 text-blue-800 text-xs sm:text-sm rounded-full"
                      >
                        {type}
                        <button title="ลบ"
                          type="button"
                          onClick={() => handleWorkTypeChange(type)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Input for "อื่นๆ" */}
                {formData.workTypes.includes('อื่นๆ') && (
                  <div className="mt-3">
                    <input
                      type="text"
                      value={formData.otherWorkType}
                      onChange={(e) => setFormData({ ...formData, otherWorkType: e.target.value })}
                      placeholder="กรุณาระบุลักษณะงาน"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 text-sm sm:text-base"
                      required={formData.workTypes.includes('อื่นๆ')}
                    />
                  </div>
                )}
              </div>

              {/* Section 3: Project Details */}
              <div className="px-4 sm:px-8 py-5 sm:py-7 border-b border-slate-200">
                <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-5">
                  <span className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-blue-800 text-white text-xs sm:text-sm font-bold rounded-full flex items-center justify-center">
                    3
                  </span>
                  <h3 className="font-semibold text-sm sm:text-base text-slate-800">รายละเอียดโครงการ</h3>
                </div>
                
                <div className="space-y-4 sm:space-y-5">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
                      ขนาดพื้นที่โดยประมาณ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      placeholder="เช่น 50 ตร.ม., 100 ตร.วา"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 text-sm sm:text-base"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
                      สถานที่ตั้งโครงการ <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 gap-2 sm:gap-4">
                      <input
                        type="text"
                        value={formData.subDistrict}
                        onChange={(e) => setFormData({ ...formData, subDistrict: e.target.value })}
                        placeholder="ตำบล/แขวง"
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 text-sm sm:text-base"
                        required
                      />
                      <div className="grid grid-cols-2 gap-2 sm:gap-4">
                        <input
                          type="text"
                          value={formData.district}
                          onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                          placeholder="อำเภอ/เขต"
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 text-sm sm:text-base"
                          required
                        />
                        <input
                          type="text"
                          value={formData.province}
                          onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                          placeholder="จังหวัด"
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 text-sm sm:text-base"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
                      รายละเอียดเพิ่มเติม <span className="text-slate-400 text-[10px] sm:text-xs">(ถ้ามี)</span>
                    </label>
                    <textarea
                      value={formData.additionalDetails}
                      onChange={(e) => setFormData({ ...formData, additionalDetails: e.target.value })}
                      placeholder="อธิบายความต้องการเพิ่มเติม เช่น งบประมาณ, ระยะเวลาที่ต้องการ, รายละเอียดงานอื่นๆ"
                      rows={4}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 text-sm sm:text-base resize-none"
                    />
                  </div>
                </div>
              </div>

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
