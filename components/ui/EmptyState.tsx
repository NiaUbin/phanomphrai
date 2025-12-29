/**
 * Empty State Component
 * 
 * Component สำหรับแสดงสถานะเมื่อไม่มีข้อมูล
 */

import { ReactNode } from 'react';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export default function EmptyState({ 
  icon, 
  title, 
  description, 
  action,
  className = '' 
}: EmptyStateProps) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-200 p-12 shadow-sm ${className}`}>
      <div className="text-center">
        {icon && (
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            {icon}
          </div>
        )}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        {description && <p className="text-gray-500">{description}</p>}
        {action && <div className="mt-6">{action}</div>}
      </div>
    </div>
  );
}

