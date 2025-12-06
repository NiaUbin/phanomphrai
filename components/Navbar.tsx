'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 80;
      setIsScrolled(scrolled);
      // ปิด mobile menu เมื่อ scroll ลง
      if (scrolled) {
        setIsMobileMenuOpen(false);
      }

      // Active section logic
      const sections = ['services', 'about', 'portfolio', 'contact'];
      let current = '';
      
      // Check if scrolled to top (Hero section)
      if (window.scrollY < 100) {
        current = 'home';
      } else {
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            // Check if element is roughly in view (with some offset for navbar)
            if (rect.top <= 150 && rect.bottom >= 150) {
              current = section;
              break;
            }
          }
        }
      }
      setActiveSection(current || 'home');
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pathname = usePathname();
  const router = useRouter();
  
  // ไม่แสดง Navbar ในหน้า Admin
  if (pathname?.startsWith('/admin-phanomphrai')) {
    return null;
  }

  const navLinks = [
    { href: '/', id: 'home', label: 'หน้าหลัก' },
    { href: '/#services', id: 'services', label: 'บริการของเรา' },
    { href: '/#about', id: 'about', label: 'เกี่ยวกับเรา' },
    { href: '/#portfolio', id: 'portfolio', label: 'ผลงาน' },
    { href: '/#contact', id: 'contact', label: 'ติดต่อเรา' },
  ];

  // ฟังก์ชันสำหรับจัดการ navigation ที่ทำงานได้ทั้งในหน้าแรกและหน้า house detail
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // ถ้าเป็น home link (href="/") และไม่ได้อยู่หน้าแรก
    if (href === '/' && pathname !== '/') {
      e.preventDefault();
      // ใช้ router.push เพื่อ navigate ไปหน้าแรก
      router.push('/');
      return;
    }
    
    // ถ้าเป็น hash link
    if (href.includes('#')) {
      e.preventDefault();
      const hash = href.split('#')[1];
      
      // ถ้าไม่ได้อยู่หน้าแรก ต้องไปหน้าแรกก่อน
      if (pathname !== '/') {
        // ไปหน้าแรกพร้อม hash แล้วให้ browser จัดการ scroll
        router.push(href);
      } else {
        // ถ้าอยู่หน้าแรกแล้ว ให้ใช้ smooth scroll
        const element = document.getElementById(hash);
        if (element) {
          const offset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        } else {
          // ถ้าไม่เจอ element ให้ใช้ router.push เป็น fallback
          router.push(href);
        }
      }
    }
    // ถ้าไม่ใช่ hash link และเป็น home link อยู่แล้ว ให้ทำงานปกติ (ไม่ต้องทำอะไร)
  };

  const isActive = (linkId: string) => {
    // ถ้าไม่ได้อยู่หน้า home ให้ active เฉพาะลิงก์ที่ตรงกับ pathname
    if (pathname !== '/') {
      return false; 
    }
    return activeSection === linkId;
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white shadow-sm'
        }`}
      >
        {/* Main Navbar Container */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className={`flex items-center justify-between ${isScrolled ? 'py-2' : 'py-3'}`}>
            {/* Logo Section */}
            <div className="flex items-center gap-2">
              {/* House Icon */}
              <svg
                width="36"
                height="36"
                viewBox="0 0 42 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-blue-600"
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
                  x="17" y="24" width="8" height="10" rx="1"
                  fill="currentColor" fillOpacity="0.2"
                  stroke="currentColor" strokeWidth="2"
                />
                <circle cx="22" cy="29" r="0.8" fill="currentColor" />
                <rect
                  x="11" y="18" width="5" height="5" rx="0.5"
                  fill="currentColor" fillOpacity="0.2"
                  stroke="currentColor" strokeWidth="1.5"
                />
                <rect
                  x="26" y="18" width="5" height="5" rx="0.5"
                  fill="currentColor" fillOpacity="0.2"
                  stroke="currentColor" strokeWidth="1.5"
                />
              </svg>
              <Link 
                href="/" 
                onClick={(e) => {
                  if (pathname !== '/') {
                    e.preventDefault();
                    // Scroll ไปด้านบนก่อน แล้วค่อย navigate
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth'
                    });
                    // รอให้ scroll เสร็จก่อน navigate
                    setTimeout(() => {
                      router.push('/');
                    }, 300);
                  }
                }}
                className="font-bold text-blue-600 text-lg sm:text-xl transition-opacity hover:opacity-80"
              >
                PHANOMPHRAI
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.id);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full ${
                      active 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    {link.label}
                    {/* Animated Underline for non-active items on hover */}
                    {!active && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-1/2 opacity-0 group-hover:opacity-100" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Section: Phone + Hamburger */}
            <div className="flex items-center gap-3">
              {/* Phone Button */}
              <a
                href="tel:0922620227"
                className="flex items-center gap-1.5 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-white hover:text-green-500 transition-all duration-200 text-xs sm:text-sm shadow-md hover:shadow-lg active:scale-95"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7292C21.7209 20.9842 21.5573 21.2126 21.3522 21.3979C21.1472 21.5832 20.9053 21.7212 20.6441 21.8022C20.3829 21.8832 20.1086 21.9053 19.84 21.8669C16.7428 21.4862 13.787 20.4171 11.19 18.7399C8.77382 17.212 6.72533 15.1635 5.19738 12.7473C3.51296 10.1311 2.43426 7.15737 2.0531 4.05995C2.01469 3.79136 2.03681 3.51707 2.11781 3.25589C2.19881 2.9947 2.33679 2.75277 2.52208 2.54773C2.70737 2.34268 2.93581 2.17912 3.19081 2.06751C3.44581 1.9559 3.72149 1.89893 4 1.89995H7C7.53026 1.89995 8.03897 2.11066 8.41404 2.48573C8.78911 2.8608 8.99982 3.36951 8.99982 3.89995C8.99982 5.11895 9.30782 6.31595 9.89782 7.38795C10.0248 7.62695 10.1018 7.88895 10.1238 8.15795C10.1458 8.42695 10.1128 8.69795 10.0268 8.95395C9.94082 9.20995 9.80382 9.44495 9.62382 9.64395L8.29382 10.9739C9.69782 13.4739 11.5238 15.2999 14.0238 16.7039L15.3538 15.3739C15.5528 15.1939 15.7878 15.0569 16.0438 14.9709C16.2998 14.8849 16.5708 14.8519 16.8398 14.8739C17.1088 14.8959 17.3708 14.9729 17.6098 15.0999C18.6818 15.6899 19.8788 15.9979 21.0978 15.9979C21.6283 15.9979 22.137 16.2086 22.512 16.5837C22.8871 16.9588 23.0978 17.4675 23.0978 17.9979L22 16.92Z"
                    fill="currentColor"
                  />
                </svg>
                <span className="hidden sm:inline font-medium">โทรสอบถาม</span>
              </a>

              {/* Hamburger Menu Button - Mobile/Tablet */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Toggle menu"
              >
                <div className="relative w-6 h-5">
                  <span 
                    className={`absolute left-0 w-full h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${
                      isMobileMenuOpen ? 'top-2 rotate-45' : 'top-0'
                    }`}
                  />
                  <span 
                    className={`absolute left-0 w-full h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${
                      isMobileMenuOpen ? 'opacity-0' : 'top-2'
                    }`}
                  />
                  <span 
                    className={`absolute left-0 w-full h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${
                      isMobileMenuOpen ? 'top-2 -rotate-45' : 'top-4'
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-[500px] opacity-100 shadow-xl' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="border-t border-gray-100 bg-white rounded-b-2xl">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navLinks.map((link) => {
                const active = isActive(link.id);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      handleNavClick(e, link.href);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`block py-3 px-4 rounded-xl font-medium transition-colors ${
                      active 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay when mobile menu is open */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
