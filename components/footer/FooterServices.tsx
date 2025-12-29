/**
 * Footer Services Component
 * 
 * Component สำหรับแสดงรายการบริการใน Footer
 */

interface FooterServicesProps {
  services: string[];
}

export default function FooterServices({ services }: FooterServicesProps) {
  return (
    <div>
      <h4 className="text-sm font-bold text-white mb-4">บริการ</h4>
      <ul className="space-y-2">
        {services.map((service) => (
          <li key={service} className="flex items-center gap-1.5 text-slate-400 text-xs">
            <svg className="w-3 h-3 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {service}
          </li>
        ))}
      </ul>
    </div>
  );
}

