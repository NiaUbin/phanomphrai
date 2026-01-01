'use client';

import { createPortal } from 'react-dom';
import { useState, useEffect } from 'react';

interface PageLoadingOverlayProps {
  isVisible: boolean;
}

export default function PageLoadingOverlay({ isVisible }: PageLoadingOverlayProps) {
  // ใช้ state เพื่อให้ initial render บน server และ client ตรงกัน (ทั้งคู่ return null)
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // ใช้ requestAnimationFrame เพื่อหลีกเลี่ยง cascading renders
    const id = requestAnimationFrame(() => {
      setIsMounted(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  // ไม่แสดงถ้ายังไม่ได้ mount หรือ isVisible = false
  if (!isMounted || !isVisible) return null;

  // ใช้ createPortal เพื่อ render ที่ document.body โดยตรง
  // ทำให้ position: fixed ทำงานถูกต้องเสมอ
  return createPortal(
    <div
      className="fixed top-0 left-0 right-0 bottom-0 z-[9999] overflow-hidden"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background - สีขาวเต็มพื้นที่ */}
      <div 
        className="absolute top-0 left-0 right-0 bottom-0"
        style={{ 
          background: 'linear-gradient(135deg, #EFF6FF 0%, #FFFFFF 50%, #EEF2FF 100%)',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }} 
      />
      
      {/* Animated background circles */}
      <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-200/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div 
          className="absolute w-64 h-64 bg-amber-100/30 rounded-full blur-3xl animate-pulse" 
          style={{ 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            animationDelay: '1s' 
          }} 
        />
      </div>

      {/* Main Loading Content - อยู่กลางจอ */}
      <div 
        className="relative z-10 text-center"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* House Icon Container with Spinning Ring */}
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 mb-8">
          {/* Outer Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-indigo-500/30 rounded-full blur-xl animate-pulse" />
          
          {/* Outer Ring - Slow Spin */}
          <div className="absolute inset-0 rounded-full animate-spin-slow">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="1" />
                  <stop offset="50%" stopColor="#6366F1" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <circle
                cx="50"
                cy="50"
                r="48"
                fill="none"
                stroke="url(#ring-gradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="100 200"
              />
            </svg>
          </div>

          {/* Second Ring - Counter Spin */}
          <div className="absolute inset-3 rounded-full animate-spin-reverse">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="ring-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity="1" />
                  <stop offset="50%" stopColor="#F97316" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="url(#ring-gradient-2)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="80 180"
              />
            </svg>
          </div>

          {/* Third Ring - Dots */}
          <div className="absolute inset-5 rounded-full animate-spin-very-slow">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-blue-400 rounded-full"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${i * 45}deg) translateY(-50px)`,
                  opacity: 0.3 + (i * 0.1),
                }}
              />
            ))}
          </div>

          {/* Inner Circle with House Icon */}
          <div className="absolute inset-6 sm:inset-8 rounded-full bg-white shadow-2xl shadow-blue-500/20 flex items-center justify-center border-2 border-blue-100/50">
            {/* House SVG Icon */}
            <div className="relative">
              {/* House Body Animation */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none"
                className="w-14 h-14 sm:w-16 sm:h-16 animate-bounce-subtle"
                style={{ animationDuration: '2s' }}
              >
                {/* Roof */}
                <path 
                  d="M3 12L12 4L21 12" 
                  stroke="url(#house-gradient)" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="animate-draw-line"
                />
                {/* House body */}
                <path 
                  d="M5 10V19C5 19.5523 5.44772 20 6 20H9V15C9 14.4477 9.44772 14 10 14H14C14.5523 14 15 14.4477 15 15V20H18C18.5523 20 19 19.5523 19 19V10" 
                  stroke="url(#house-gradient)" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="animate-draw-line"
                  style={{ animationDelay: '0.3s' }}
                />
                {/* Window */}
                <rect 
                  x="10" 
                  y="8" 
                  width="4" 
                  height="3" 
                  rx="0.5"
                  fill="#FCD34D"
                  className="animate-pulse"
                  style={{ animationDuration: '1.5s' }}
                />
                {/* Chimney */}
                <path 
                  d="M16 7V5C16 4.44772 16.4477 4 17 4H18C18.5523 4 19 4.44772 19 5V9" 
                  stroke="url(#house-gradient)" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                {/* Smoke */}
                <path 
                  d="M17.5 3C17.5 2 18 1.5 18.5 1.5"
                  stroke="#94A3B8"
                  strokeWidth="1"
                  strokeLinecap="round"
                  className="animate-smoke"
                />
                <defs>
                  <linearGradient id="house-gradient" x1="3" y1="4" x2="21" y2="20" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#3B82F6" />
                    <stop offset="1" stopColor="#6366F1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Floating Sparkles */}
          <div className="absolute top-0 left-1/4 w-3 h-3 bg-amber-400 rounded-full animate-float" style={{ animationDelay: '0s' }} />
          <div className="absolute top-1/4 right-0 w-2 h-2 bg-blue-400 rounded-full animate-float" style={{ animationDelay: '0.3s' }} />
          <div className="absolute bottom-1/4 left-0 w-2.5 h-2.5 bg-indigo-400 rounded-full animate-float" style={{ animationDelay: '0.6s' }} />
          <div className="absolute bottom-0 right-1/4 w-2 h-2 bg-amber-300 rounded-full animate-float" style={{ animationDelay: '0.9s' }} />
        </div>

        {/* Loading Text */}
        <div className="space-y-3">
          <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent animate-shimmer-text bg-[length:200%_auto]">
            กำลังโหลดข้อมูลผลงาน
          </h3>
          <p className="text-gray-500 text-sm sm:text-base">
            กรุณารอสักครู่...
          </p>
          
          {/* Animated Dots */}
          <div className="flex justify-center gap-2 pt-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 animate-bounce"
                style={{ 
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: '0.8s'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes spin-very-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) scale(1);
            opacity: 0.7;
          }
          50% { 
            transform: translateY(-10px) scale(1.2);
            opacity: 1;
          }
        }
        
        @keyframes smoke {
          0% { 
            opacity: 0.5;
            transform: translateY(0);
          }
          50% { 
            opacity: 0.3;
            transform: translateY(-3px) translateX(2px);
          }
          100% { 
            opacity: 0;
            transform: translateY(-6px) translateX(4px);
          }
        }
        
        @keyframes shimmer-text {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        
        @keyframes draw-line {
          from { 
            stroke-dasharray: 0 100;
            opacity: 0;
          }
          to { 
            stroke-dasharray: 100 0;
            opacity: 1;
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 3s linear infinite;
        }
        
        .animate-spin-very-slow {
          animation: spin-very-slow 8s linear infinite;
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 2s ease-in-out infinite;
        }
        
        .animate-smoke {
          animation: smoke 2s ease-out infinite;
        }
        
        .animate-shimmer-text {
          animation: shimmer-text 3s linear infinite;
        }
        
        .animate-draw-line {
          animation: draw-line 1s ease-out forwards;
        }
      `}</style>
    </div>,
    document.body
  );
}
