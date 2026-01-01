/**
 * Footer Contact Component
 * 
 * Component สำหรับแสดงข้อมูลติดต่อใน Footer
 */

import { formatPhoneForLink } from '@/lib/utils';

interface FooterContactProps {
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  lineId: string;
  lineUrl: string;
  isMobile?: boolean;
}

export default function FooterContact({
  address,
  city,
  postalCode,
  phone,
  lineId,
  lineUrl,
  isMobile = false,
}: FooterContactProps) {
  const phoneForLink = formatPhoneForLink(phone);

  return (
    <div>
      <h4 className="text-sm font-bold text-white mb-4">ติดต่อเรา</h4>
      <div className={isMobile ? "space-y-2 text-xs" : "space-y-2.5 text-xs"} itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
        <div className="text-slate-400">
          <span className={isMobile ? "block text-white font-medium text-[11px]" : "block text-white font-medium"} itemProp="streetAddress">
            {address}
          </span>
          <span itemProp="addressLocality">{city}</span> <span itemProp="postalCode">{postalCode}</span>
        </div>
        <a 
          href={`tel:${phoneForLink}`} 
          className={isMobile ? "flex items-center gap-1.5 text-slate-300" : "flex items-center gap-2 text-slate-300 hover:text-white transition-colors"}
          itemProp="telephone"
        >
          <svg className={isMobile ? "w-3.5 h-3.5 text-blue-500" : "w-4 h-4 text-blue-500"} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {phone}
        </a>
        <a 
          href={lineUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={isMobile ? "flex items-center gap-1.5 text-slate-300" : "flex items-center gap-2 text-slate-300 hover:text-white transition-colors"}
        >
          <svg className={isMobile ? "w-3.5 h-3.5 text-green-500" : "w-4 h-4 text-green-500"} viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
          </svg>
          {lineId}
        </a>
      </div>
    </div>
  );
}

