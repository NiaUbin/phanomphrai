/**
 * Loading Component
 * 
 * Component สำหรับแสดง loading spinner
 */

interface LoadingProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Loading({ message, size = 'md', className = '' }: LoadingProps) {
  const sizeClasses = {
    sm: 'w-6 h-6 border-3',
    md: 'w-8 h-8 border-4',
    lg: 'w-10 h-10 border-4',
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`${sizeClasses[size]} border-blue-500 border-t-transparent rounded-full animate-spin mb-4`} />
      {message && <p className="text-gray-500">{message}</p>}
    </div>
  );
}

