'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pathname = usePathname();
  
  // ไม่แสดง Navbar ในหน้า Admin
  if (pathname?.startsWith('/admin-phanomphrai')) {
    return null;
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-white shadow-sm'
      }`}
    >
      {/* Top Header Section - Logo and Phone */}
      {!isScrolled && (
        <div className="overflow-hidden">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-2 sm:py-3 flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* House Icon */}
            <svg
              width="42"
              height="42"
              viewBox="0 0 42 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-blue-600"
            >
              {/* House Base */}
              <path
                d="M21 8L8 15V32C8 33.1046 8.89543 34 10 34H32C33.1046 34 34 33.1046 34 32V15L21 8Z"
                fill="currentColor"
                fillOpacity="0.1"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Roof */}
              <path
                d="M21 8L8 15H34L21 8Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Door */}
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
              {/* Door Handle */}
              <circle
                cx="22"
                cy="29"
                r="0.8"
                fill="currentColor"
              />
              {/* Windows */}
              <rect
                x="11"
                y="18"
                width="5"
                height="5"
                rx="0.5"
                fill="currentColor"
                fillOpacity="0.2"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <rect
                x="26"
                y="18"
                width="5"
                height="5"
                rx="0.5"
                fill="currentColor"
                fillOpacity="0.2"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              {/* Window Cross */}
              <line
                x1="13.5"
                y1="18"
                x2="13.5"
                y2="23"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="11"
                y1="20.5"
                x2="16"
                y2="20.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="28.5"
                y1="18"
                x2="28.5"
                y2="23"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="26"
                y1="20.5"
                x2="31"
                y2="20.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <Link href="/" className="font-bold text-blue-600 text-xl sm:text-2xl">
              PHANOMPHRAI
            </Link>
          </div>

          {/* Phone Button */}
          <a
            href="tel:0922620227"
            className="flex items-center gap-1.5 sm:gap-2 bg-blue-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 text-xs sm:text-sm"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7292C21.7209 20.9842 21.5573 21.2126 21.3522 21.3979C21.1472 21.5832 20.9053 21.7212 20.6441 21.8022C20.3829 21.8832 20.1086 21.9053 19.84 21.8669C16.7428 21.4862 13.787 20.4171 11.19 18.7399C8.77382 17.212 6.72533 15.1635 5.19738 12.7473C3.51296 10.1311 2.43426 7.15737 2.0531 4.05995C2.01469 3.79136 2.03681 3.51707 2.11781 3.25589C2.19881 2.9947 2.33679 2.75277 2.52208 2.54773C2.70737 2.34268 2.93581 2.17912 3.19081 2.06751C3.44581 1.9559 3.72149 1.89893 4 1.89995H7C7.53026 1.89995 8.03897 2.11066 8.41404 2.48573C8.78911 2.8608 8.99982 3.36951 8.99982 3.89995C8.99982 5.11895 9.30782 6.31595 9.89782 7.38795C10.0248 7.62695 10.1018 7.88895 10.1238 8.15795C10.1458 8.42695 10.1128 8.69795 10.0268 8.95395C9.94082 9.20995 9.80382 9.44495 9.62382 9.64395L8.29382 10.9739C9.69782 13.4739 11.5238 15.2999 14.0238 16.7039L15.3538 15.3739C15.5528 15.1939 15.7878 15.0569 16.0438 14.9709C16.2998 14.8849 16.5708 14.8519 16.8398 14.8739C17.1088 14.8959 17.3708 14.9729 17.6098 15.0999C18.6818 15.6899 19.8788 15.9979 21.0978 15.9979C21.6283 15.9979 22.137 16.2086 22.512 16.5837C22.8871 16.9588 23.0978 17.4675 23.0978 17.9979L22 16.92Z"
                fill="currentColor"
              />
            </svg>
            <span className="font-medium hidden xs:inline">092-262-0227</span>
            <span className="font-medium xs:hidden">โทรสอบถาม</span>
          </a>
        </div>
      </div>
      )}

      {/* Divider Line */}
      {!isScrolled && <div className="h-px bg-gray-300" />}

      {/* Navigation Menu Bar */}
      <div
        className={`max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 ${
          isScrolled ? 'py-2 sm:py-3' : 'py-3 sm:py-4'
        }`}
      >
        <div className="flex items-center justify-center">
          {/* Navigation Links */}
          <div className="flex items-center gap-3 sm:gap-5 lg:gap-7 flex-wrap justify-center">
            <Link
              href="/"
              className="text-black hover:text-blue-600 font-medium transition-colors duration-200 whitespace-nowrap text-sm sm:text-base"
            >
              หน้าหลัก
            </Link>

            {/* Categories Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-black hover:text-blue-600 font-medium transition-colors duration-200 whitespace-nowrap text-sm sm:text-base">
                หมวดหมู่
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transition-transform duration-200 ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-50">
                  <Link
                    href="/materials"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
                  >
                    วัสดุก่อสร้าง
                  </Link>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
                  >
                    เครื่องมือช่าง
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
                  >
                    อุปกรณ์ไฟฟ้า
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
                  >
                    สีและทาสี
                  </a>
                </div>
              )}
            </div>

            <Link
              href="/#services"
              className="text-black hover:text-blue-600 font-medium transition-colors duration-200 whitespace-nowrap text-sm sm:text-base"
            >
              บริการของเรา
            </Link>
            <Link
              href="/#about"
              className="text-black hover:text-blue-600 font-medium transition-colors duration-200 whitespace-nowrap text-sm sm:text-base"
            >
              เกี่ยวกับเรา
            </Link>
            <Link
              href="/#services"
              className="text-black hover:text-blue-600 font-medium transition-colors duration-200 whitespace-nowrap text-sm sm:text-base"
            >
              รายการทั้งหมด
            </Link>
            <Link
              href="/#services"
              className="text-black hover:text-blue-600 font-medium transition-colors duration-200 whitespace-nowrap text-sm sm:text-base"
            >
              ข่าวสาร
            </Link>
            <Link
              href="/#about"
              className="text-black hover:text-blue-600 font-medium transition-colors duration-200 whitespace-nowrap text-sm sm:text-base"
            >
              รีวิวลูกค้าจริง
            </Link>
            <Link
              href="/#contact"
              className="text-black hover:text-blue-600 font-medium transition-colors duration-200 whitespace-nowrap text-sm sm:text-base"
            >
              ติดต่อเรา
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

