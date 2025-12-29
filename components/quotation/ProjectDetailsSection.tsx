/**
 * Project Details Section Component
 * 
 * Component สำหรับส่วนรายละเอียดโครงการในฟอร์มขอใบเสนอราคา
 */

import { QuotationFormData } from '@/types';

interface ProjectDetailsSectionProps {
  formData: QuotationFormData;
  onChange: (field: keyof QuotationFormData, value: string) => void;
}

export default function ProjectDetailsSection({ formData, onChange }: ProjectDetailsSectionProps) {
  return (
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
            onChange={(e) => onChange('area', e.target.value)}
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
              onChange={(e) => onChange('subDistrict', e.target.value)}
              placeholder="ตำบล/แขวง"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 text-sm sm:text-base"
              required
            />
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <input
                type="text"
                value={formData.district}
                onChange={(e) => onChange('district', e.target.value)}
                placeholder="อำเภอ/เขต"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 text-sm sm:text-base"
                required
              />
              <input
                type="text"
                value={formData.province}
                onChange={(e) => onChange('province', e.target.value)}
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
            onChange={(e) => onChange('additionalDetails', e.target.value)}
            placeholder="อธิบายความต้องการเพิ่มเติม เช่น งบประมาณ, ระยะเวลาที่ต้องการ, รายละเอียดงานอื่นๆ"
            rows={4}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 text-sm sm:text-base resize-none"
          />
        </div>
      </div>
    </div>
  );
}

