/**
 * Work Type Section Component
 * 
 * Component สำหรับส่วนเลือกลักษณะงานในฟอร์มขอใบเสนอราคา
 */

import { useRef, useEffect } from 'react';
import { QuotationFormData } from '@/types';
import { WORK_TYPE_OPTIONS } from '@/app/constants/data';

interface WorkTypeSectionProps {
  formData: QuotationFormData;
  isDropdownOpen: boolean;
  onDropdownToggle: () => void;
  onWorkTypeChange: (workType: string) => void;
  onOtherWorkTypeChange: (value: string) => void;
  onDropdownClose: () => void;
}

export default function WorkTypeSection({
  formData,
  isDropdownOpen,
  onDropdownToggle,
  onWorkTypeChange,
  onOtherWorkTypeChange,
  onDropdownClose,
}: WorkTypeSectionProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onDropdownClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onDropdownClose]);

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
          onClick={onDropdownToggle}
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
            {WORK_TYPE_OPTIONS.map((workType) => (
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
                  onChange={() => onWorkTypeChange(workType)}
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
                onChange={() => onWorkTypeChange('อื่นๆ')}
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
              <button 
                title="ลบ"
                type="button"
                onClick={() => onWorkTypeChange(type)}
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
            onChange={(e) => onOtherWorkTypeChange(e.target.value)}
            placeholder="กรุณาระบุลักษณะงาน"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 text-sm sm:text-base"
            required={formData.workTypes.includes('อื่นๆ')}
          />
        </div>
      )}
    </div>
  );
}

