/**
 * Quotation Card Component
 * 
 * Component สำหรับแสดงรายการใบเสนอราคาในรูปแบบ card
 */

import { QuotationRequest } from '@/types';
import { formatDate } from '@/lib/utils';
import { getStatusBadge } from '@/app/constants/data';

interface QuotationCardProps {
  quotation: QuotationRequest;
  isSelected: boolean;
  onClick: () => void;
}

export default function QuotationCard({ quotation, isSelected, onClick }: QuotationCardProps) {
  const statusBadge = getStatusBadge(quotation.status);

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border-2 p-5 cursor-pointer transition-all hover:shadow-md ${
        isSelected
          ? 'border-emerald-500 shadow-md'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-gray-800 truncate">{quotation.name}</h3>
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${statusBadge.color}`}>
              {statusBadge.label}
            </span>
          </div>
          <div className="space-y-1 text-sm text-gray-600">
            <p className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              {quotation.phone}
            </p>
            <p className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              {quotation.email}
            </p>
          </div>
        </div>
        <div className="text-right text-xs text-gray-400">
          {formatDate(quotation.createdAt)}
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="flex flex-wrap gap-1.5">
          {quotation.workTypes.slice(0, 2).map((type, index) => (
            <span key={index} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded">
              {type}
            </span>
          ))}
          {quotation.workTypes.length > 2 && (
            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
              +{quotation.workTypes.length - 2} อื่นๆ
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

