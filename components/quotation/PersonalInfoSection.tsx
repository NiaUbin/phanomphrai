/**
 * Personal Information Section Component
 * 
 * Component สำหรับส่วนข้อมูลผู้ติดต่อในฟอร์มขอใบเสนอราคา
 */

import { QuotationFormData } from '@/types';

interface PersonalInfoSectionProps {
  formData: QuotationFormData;
  onChange: (field: keyof QuotationFormData, value: string) => void;
}

export default function PersonalInfoSection({ formData, onChange }: PersonalInfoSectionProps) {
  return (
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
            onChange={(e) => onChange('name', e.target.value)}
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
            onChange={(e) => onChange('phone', e.target.value)}
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
            onChange={(e) => onChange('email', e.target.value)}
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
            onChange={(e) => onChange('lineId', e.target.value)}
            placeholder="ระบุ Line ID"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 text-sm sm:text-base"
            required
          />
        </div>
      </div>
    </div>
  );
}

