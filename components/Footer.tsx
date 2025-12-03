'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  
  // ไม่แสดง Footer ในหน้า Admin
  if (pathname?.startsWith('/admin-phanomphrai')) {
    return null;
  }

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              {/* House Icon */}
              <svg
                width="48"
                height="48"
                viewBox="0 0 42 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-blue-400"
              >
                <path
                  d="M21 8L8 15V32C8 33.1046 8.89543 34 10 34H32C33.1046 34 34 33.1046 34 32V15L21 8Z"
                  fill="currentColor"
                  fillOpacity="0.1"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 8L8 15H34L21 8Z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="17"
                  y="24"
                  width="8"
                  height="10"
                  rx="1"
                  fill="currentColor"
                  fillOpacity="0.2"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle
                  cx="22"
                  cy="29"
                  r="0.8"
                  fill="currentColor"
                />
                <rect
                  x="10"
                  y="18"
                  width="6"
                  height="6"
                  rx="1"
                  fill="currentColor"
                  fillOpacity="0.2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <rect
                  x="26"
                  y="18"
                  width="6"
                  height="6"
                  rx="1"
                  fill="currentColor"
                  fillOpacity="0.2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              <h3 className="text-2xl font-bold text-white">พนมไพร</h3>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4 text-sm md:text-base">
              บริการรับเหมาก่อสร้าง บ้าน อาคาร สำนักงาน 
              ออกแบบและตกแต่งภายในด้วยทีมงานมืออาชีพ
            </p>
            <div className="flex gap-4 mt-6">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/oegabtk"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-blue-600 rounded-full p-3 transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="text-white"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              {/* Line */}
              <a
                href="https://line.me/R/ti/p/@yourID"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-green-500 rounded-full p-3 transition-all duration-300 hover:scale-110"
                aria-label="Line"
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="text-white"
                >
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.63-.63.63h-2.386c-.345 0-.627-.285-.627-.63V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.63-.63.63M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.058 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-pink-600 rounded-full p-3 transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="text-white"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">เมนูหลัก</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  onClick={(e) => handleSmoothScroll(e, 'home')}
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm md:text-base"
                >
                  หน้าหลัก
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  onClick={(e) => handleSmoothScroll(e, 'about')}
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm md:text-base"
                >
                  เกี่ยวกับเรา
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  onClick={(e) => handleSmoothScroll(e, 'services')}
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm md:text-base"
                >
                  บริการของเรา
                </Link>
              </li>
              <li>
                <Link
                  href="/materials"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm md:text-base"
                >
                  วัสดุก่อสร้าง
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  onClick={(e) => handleSmoothScroll(e, 'contact')}
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm md:text-base"
                >
                  ติดต่อเรา
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">บริการของเรา</h4>
            <ul className="space-y-3">
              <li>
                <span className="text-gray-300 text-sm md:text-base">รับเหมาก่อสร้าง</span>
              </li>
              <li>
                <span className="text-gray-300 text-sm md:text-base">ออกแบบบ้าน</span>
              </li>
              <li>
                <span className="text-gray-300 text-sm md:text-base">ตกแต่งภายใน</span>
              </li>
              <li>
                <span className="text-gray-300 text-sm md:text-base">เดินสายไฟ</span>
              </li>
              <li>
                <span className="text-gray-300 text-sm md:text-base">วัสดุก่อสร้าง</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">ติดต่อเรา</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                  className="text-blue-400 mt-1 shrink-0"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.75 19.75 0 0 1-8.63-3.57 19.5 19.5 0 0 1-6-6A19.75 19.75 0 0 1 2.08 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72 13 13 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11l-1.3 1.3a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.11-.45 13 13 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <a
                  href="tel:0922620227"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm md:text-base"
                >
                  092-262-0227
                </a>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                  className="text-blue-400 mt-1 shrink-0"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <a
                  href="mailto:contact@phanomphrai.com"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm md:text-base break-all"
                >
                  contact@phanomphrai.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                  className="text-blue-400 mt-1 shrink-0"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-gray-300 text-sm md:text-base leading-relaxed">
                  กรุงเทพมหานคร, ประเทศไทย 10220
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} พนมไพร. สงวนลิขสิทธิ์ทุกประการ
            </p>
            <div className="flex gap-6 text-sm">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
              >
                นโยบายความเป็นส่วนตัว
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
              >
                เงื่อนไขการใช้งาน
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
