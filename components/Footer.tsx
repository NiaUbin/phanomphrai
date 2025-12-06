'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Icons
import {
  Facebook,
  MessageCircle,
  Instagram,
  Phone,
  Mail,
  MapPin,
  Home,
  Hammer,
  Ruler,
  Paintbrush,
  ShieldCheck,
  PenTool,
  Building2,
  ChevronRight,
  ClipboardList,
} from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();

  // Hide footer in admin area
  if (pathname?.startsWith('/admin-phanomphrai')) return null;

  return (
    <footer className="bg-white border-t border-gray-200 text-gray-700">
      
      {/* Main section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Home className="w-10 h-10 text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-900">พนมไพร</h3>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              รับเหมาก่อสร้าง ออกแบบบ้าน และตกแต่งภายใน  
              โดยทีมงานมืออาชีพ ประสบการณ์กว่า 10 ปี
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <a className="p-2.5 rounded-full border border-gray-300 hover:bg-blue-50 transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a className="p-2.5 rounded-full border border-gray-300 hover:bg-green-50 transition">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a className="p-2.5 rounded-full border border-gray-300 hover:bg-pink-50 transition">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Menu */}
          <div>
            <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
              <ClipboardList className="w-5 h-5 text-blue-600" />
              เมนูหลัก
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="flex items-center gap-2 hover:text-blue-600 transition"><ChevronRight size={16}/> หน้าหลัก</Link></li>
              <li><Link href="/#about" className="flex items-center gap-2 hover:text-blue-600 transition"><ChevronRight size={16}/> เกี่ยวกับเรา</Link></li>
              <li><Link href="/#services" className="flex items-center gap-2 hover:text-blue-600 transition"><ChevronRight size={16}/> บริการ</Link></li>
              <li><Link href="/#contact" className="flex items-center gap-2 hover:text-blue-600 transition"><ChevronRight size={16}/> ติดต่อเรา</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
              <Hammer className="w-5 h-5 text-blue-600" />
              บริการของเรา
            </h4>

            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><Building2 size={18}/> รับเหมาก่อสร้าง</li>
              <li className="flex items-center gap-2"><Ruler size={18}/> ออกแบบบ้าน</li>
              <li className="flex items-center gap-2"><Paintbrush size={18}/> ตกแต่งภายใน</li>
              <li className="flex items-center gap-2"><PenTool size={18}/> งานเขียนแบบ</li>
              <li className="flex items-center gap-2"><ShieldCheck size={18}/> ประเมินราคาก่อสร้าง</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
              <Phone className="w-5 h-5 text-blue-600" />
              ติดต่อเรา
            </h4>

            <ul className="space-y-4 text-sm">

              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-600" />
                <a href="tel:0922620227" className="hover:text-blue-600 transition">
                  092-262-0227
                </a>
              </li>

              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <a href="mailto:contact@phanomphrai.com" className="hover:text-blue-600 transition">
                  contact@phanomphrai.com
                </a>
              </li>

              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span>กรุงเทพมหานคร ประเทศไทย 10220</span>
              </li>

            </ul>
          </div>

        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-3">

          <p>© {new Date().getFullYear()} พนมไพร. All rights reserved.</p>

          <div className="flex gap-6">
            <a className="flex items-center gap-2 hover:text-blue-600 transition"><ShieldCheck size={16}/> Privacy Policy</a>
            <a className="flex items-center gap-2 hover:text-blue-600 transition"><ShieldCheck size={16}/> Terms of Service</a>
          </div>

        </div>
      </div>
    </footer>
  );
}
