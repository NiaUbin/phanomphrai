'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Scroll to top when pathname changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div
      key={pathname}
      className="page-transition"
    >
      {children}
      <style jsx global>{`
        @keyframes pageSlideIn {
          0% {
            opacity: 0;
            transform: translateY(12px);
          }
          50% {
            opacity: 0.7;
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .page-transition {
          animation: pageSlideIn 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: opacity, transform;
        }
      `}</style>
    </div>
  );
}
