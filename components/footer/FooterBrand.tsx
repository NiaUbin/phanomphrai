/**
 * Footer Brand Component
 * 
 * Component สำหรับแสดงโลโก้และข้อมูลบริษัทใน Footer
 */

interface FooterBrandProps {
  companyName: string;
  tagline: string;
  description?: string;
  warranty: string;
  showDescription?: boolean;
}

export default function FooterBrand({ 
  companyName, 
  tagline, 
  description, 
  warranty,
  showDescription = false 
}: FooterBrandProps) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-bold" itemProp="name">{companyName}</h3>
          <p className="text-blue-400 text-xs">{tagline}</p>
        </div>
      </div>
      {showDescription && description && (
        <p className="text-slate-400 text-xs leading-relaxed mb-4" itemProp="description">
          {description}
        </p>
      )}
      <div className="text-xs text-slate-400 flex items-center gap-1">
        <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.959 11.959 0 0112 2.944a11.959 11.959 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        {warranty}
      </div>
    </div>
  );
}

