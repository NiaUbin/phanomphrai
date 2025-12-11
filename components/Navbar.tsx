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
      if (scrolled) {
        setIsMobileMenuOpen(false);
      }

      const sections = ['services', 'about', 'portfolio', 'contact'];
      let current = '';
      
      if (window.scrollY < 100) {
        current = 'home';
      } else {
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
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
    handleScroll();
    
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          const offset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pathname = usePathname();
  const router = useRouter();
  
  if (pathname?.startsWith('/admin-phanomphrai')) {
    return null;
  }

  const navLinks = [
    { href: '/', id: 'home', label: 'หน้าหลัก', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    )},
    { href: '/#services', id: 'services', label: 'การันตีคุณภาพ', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.746 3.746 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    )},
    { href: '/#portfolio', id: 'portfolio', label: 'ผลงาน', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    )},
    { href: '/#about', id: 'about', label: 'เกี่ยวกับเรา', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    )},
    { href: '/#contact', id: 'contact', label: 'ติดต่อเรา', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    )},
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === '/' && pathname !== '/') {
      e.preventDefault();
      router.push('/');
      return;
    }
    
    if (href.includes('#')) {
      e.preventDefault();
      const hash = href.split('#')[1];
      
      if (pathname !== '/') {
        router.push(href);
      } else {
        const element = document.getElementById(hash);
        if (element) {
          const offset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        } else {
          router.push(href);
        }
      }
    }
  };

  const isActive = (linkId: string) => {
    if (pathname !== '/') {
      return false; 
    }
    return activeSection === linkId;
  };

  // ตรวจสอบว่าอยู่หน้าแรกหรือไม่
  const isHomePage = pathname === '/';
  
  // แสดง Navbar แบบสีเข้มเมื่อ: scroll แล้ว หรือ ไม่ได้อยู่หน้าแรก
  const shouldShowSolid = isScrolled || !isHomePage;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          shouldShowSolid 
            ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-gray-200/50 border-b border-gray-100' 
            : 'bg-gradient-to-b from-black/20 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-300 ${shouldShowSolid ? 'py-3' : 'py-4'}`}>
            
            {/* Logo Section */}
            <Link 
              href="/" 
              onClick={(e) => {
                if (pathname !== '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setTimeout(() => router.push('/'), 300);
                }
              }}
              className="flex items-center gap-3 group"
            >
              {/* Logo Icon */}
              <div className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                shouldShowSolid 
                  ? 'bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30' 
                  : 'bg-white/20 backdrop-blur-md border border-white/30'
              }`}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transition-colors duration-300 ${shouldShowSolid ? 'text-white' : 'text-white'}`}
                >
                  <path
                    d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="currentColor"
                    fillOpacity="0.2"
                  />
                  <path
                    d="M9 22V12H15V22"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              
              {/* Logo Text */}
              <div className="flex flex-col">
                <span className={`font-bold text-lg sm:text-xl tracking-tight transition-colors duration-300 ${
                  shouldShowSolid ? 'text-gray-900' : 'text-white drop-shadow-lg'
                }`}>
                  PHANOMPHRAI
                </span>
                <span className={`text-xs font-medium hidden sm:block transition-colors duration-300 ${
                  shouldShowSolid ? 'text-gray-500' : 'text-white/70'
                }`}>
                  รับสร้างบ้านครบวงจร
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.id);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative px-4 py-2.5 text-sm font-medium transition-all duration-300 rounded-xl group ${
                      active 
                        ? shouldShowSolid 
                          ? 'text-blue-600 bg-blue-50' 
                          : 'text-white bg-white/20 backdrop-blur-md'
                        : shouldShowSolid
                          ? 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.label}
                    {/* Active Indicator */}
                    {active && (
                      <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                        shouldShowSolid ? 'bg-blue-600' : 'bg-white'
                      }`} />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Section: CTA + Hamburger */}
            <div className="flex items-center gap-3">
              {/* Phone CTA Button */}
              <a
                href="tel:0922620227"
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-lg active:scale-95 ${
                  shouldShowSolid
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5'
                    : 'bg-white text-blue-600 shadow-white/30 hover:shadow-white/50 hover:-translate-y-0.5'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <span className="hidden sm:inline text-sm">โทรเลย</span>
              </a>

              {/* Hamburger Menu Button - Mobile/Tablet */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2.5 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  shouldShowSolid 
                    ? 'hover:bg-gray-100 text-gray-700' 
                    : 'hover:bg-white/10 text-white'
                }`}
                aria-label="Toggle menu"
              >
                <div className="relative w-5 h-4">
                  <span 
                    className={`absolute left-0 w-full h-0.5 rounded-full transition-all duration-300 ${
                      shouldShowSolid ? 'bg-gray-700' : 'bg-white'
                    } ${isMobileMenuOpen ? 'top-1.5 rotate-45' : 'top-0'}`}
                  />
                  <span 
                    className={`absolute left-0 w-full h-0.5 rounded-full transition-all duration-300 ${
                      shouldShowSolid ? 'bg-gray-700' : 'bg-white'
                    } ${isMobileMenuOpen ? 'opacity-0' : 'top-1.5'}`}
                  />
                  <span 
                    className={`absolute left-0 w-full h-0.5 rounded-full transition-all duration-300 ${
                      shouldShowSolid ? 'bg-gray-700' : 'bg-white'
                    } ${isMobileMenuOpen ? 'top-1.5 -rotate-45' : 'top-3'}`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className={`border-t ${shouldShowSolid ? 'border-gray-100 bg-white' : 'border-white/10 bg-black/40 backdrop-blur-xl'}`}>
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
                    className={`flex items-center gap-3 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                      active 
                        ? shouldShowSolid 
                          ? 'text-blue-600 bg-blue-50' 
                          : 'text-white bg-white/20'
                        : shouldShowSolid
                          ? 'text-gray-700 hover:bg-gray-50'
                          : 'text-white/80 hover:bg-white/10'
                    }`}
                  >
                    <span className={`p-2 rounded-lg ${
                      active 
                        ? shouldShowSolid ? 'bg-blue-100 text-blue-600' : 'bg-white/20 text-white'
                        : shouldShowSolid ? 'bg-gray-100 text-gray-500' : 'bg-white/10 text-white/60'
                    }`}>
                      {link.icon}
                    </span>
                    {link.label}
                  </Link>
                );
              })}
              
              {/* Mobile CTA */}
              <div className="pt-4 border-t border-gray-100 mt-2">
                <a
                  href="tel:0922620227"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  โทรเลย: 092-262-0227
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay when mobile menu is open */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
