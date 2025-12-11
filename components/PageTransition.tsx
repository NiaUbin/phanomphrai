'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const [key, setKey] = useState(0);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    // Only animate if pathname actually changed (not on first render)
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      // Increment key to trigger CSS animation
      setKey(k => k + 1);
    }
  }, [pathname]);

  return (
    <div
      ref={containerRef}
      key={key}
      className="page-transition"
      style={{
        animation: key > 0 ? 'pageSlideIn 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none'
      }}
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
          will-change: opacity, transform;
        }
      `}</style>
    </div>
  );
}
