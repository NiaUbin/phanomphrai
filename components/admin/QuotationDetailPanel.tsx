/**
 * Quotation Detail Panel Component
 * 
 * Component สำหรับแสดงรายละเอียดของใบเสนอราคา
 */

import { QuotationRequest } from '@/types';
import { formatDate, formatPhoneForLink } from '@/lib/utils';
import { QUOTATION_STATUS_OPTIONS } from '@/app/constants/data';

interface QuotationDetailPanelProps {
  quotation: QuotationRequest;
  updatingId: string | null;
  deletingId: string | null;
  onStatusChange: (quotationId: string, newStatus: string) => void;
  onDelete: (quotation: QuotationRequest) => void;
  onClose: () => void;
}

export default function QuotationDetailPanel({
  quotation,
  updatingId,
  deletingId,
  onStatusChange,
  onDelete,
  onClose,
}: QuotationDetailPanelProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-5 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold">{quotation.name}</h3>
            <p className="text-emerald-100 text-sm mt-1">
              {formatDate(quotation.createdAt)}
            </p>
          </div>
          <button
            title="ปิด"
            onClick={onClose}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6 max-h-[calc(100vh-300px)] overflow-y-auto">
        {/* Status Control */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">สถานะ</label>
          <select
            title="อัพเดทสถานะ"
            value={quotation.status}
            onChange={(e) => onStatusChange(quotation.id, e.target.value)}
            disabled={updatingId === quotation.id}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:opacity-50"
          >
            {QUOTATION_STATUS_OPTIONS.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-emerald-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            ข้อมูลผู้ติดต่อ
          </h4>
          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-gray-500">ชื่อ-นามสกุล</p>
                <p className="font-medium text-gray-800">{quotation.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">เบอร์โทรศัพท์</p>
                <a href={`tel:${formatPhoneForLink(quotation.phone)}`} className="font-medium text-emerald-600 hover:underline">
                  {quotation.phone}
                </a>
              </div>
              <div>
                <p className="text-xs text-gray-500">อีเมล</p>
                <a href={`mailto:${quotation.email}`} className="font-medium text-emerald-600 hover:underline break-all">
                  {quotation.email}
                </a>
              </div>
              <div>
                <p className="text-xs text-gray-500">Line ID</p>
                <p className="font-medium text-gray-800">{quotation.lineId}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Work Types */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
            </svg>
            ลักษณะงานที่สนใจ
          </h4>
          <div className="flex flex-wrap gap-2">
            {quotation.workTypes.map((type, index) => (
              <span key={index} className="px-3 py-1.5 bg-blue-100 text-blue-800 text-sm font-medium rounded-lg">
                {type}
              </span>
            ))}
          </div>
          {quotation.otherWorkType && (
            <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-xs text-amber-600 font-medium mb-1">งานอื่นๆ ที่ระบุ:</p>
              <p className="text-amber-800">{quotation.otherWorkType}</p>
            </div>
          )}
        </div>

        {/* Project Details */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-purple-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            รายละเอียดโครงการ
          </h4>
          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            <div>
              <p className="text-xs text-gray-500">ขนาดพื้นที่โดยประมาณ</p>
              <p className="font-medium text-gray-800">{quotation.area}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">สถานที่ตั้งโครงการ</p>
              <p className="font-medium text-gray-800">
                ตำบล{quotation.subDistrict} อำเภอ{quotation.district} จังหวัด{quotation.province}
              </p>
            </div>
          </div>
        </div>

        {/* Additional Details */}
        {quotation.additionalDetails && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
              รายละเอียดเพิ่มเติมจากลูกค้า
            </h4>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-700 whitespace-pre-wrap">{quotation.additionalDetails}</p>
            </div>
          </div>
        )}

        {/* PDPA Info */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-green-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            ยินยอม PDPA: {quotation.pdpaConsent ? '✓ ยอมรับ' : '✗ ไม่ยอมรับ'}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-gray-100 flex gap-3">
          <a
            href={`tel:${formatPhoneForLink(quotation.phone)}`}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            โทร
          </a>
          <a
            href={`mailto:${quotation.email}`}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            อีเมล
          </a>
          <button 
            title="ลบ"
            onClick={() => onDelete(quotation)}
            disabled={deletingId === quotation.id}
            className="px-4 py-3 bg-red-100 text-red-600 font-semibold rounded-xl hover:bg-red-200 transition-colors disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

