/**
 * Admin Page Component
 * 
 * หน้า Admin Panel สำหรับจัดการเนื้อหาเว็บไซต์ ทำหน้าที่:
 * 1. จัดการผลงาน (เพิ่ม, แก้ไข, ลบ houses)
 * 2. จัดการการันตีคุณภาพ (เพิ่ม, แก้ไข, ลบ gallery items)
 * 3. จัดการใบเสนอราคา (ดูคำขอจากลูกค้า)
 * 
 * Structure:
 * - Sidebar: Navigation menu (Desktop)
 * - Mobile Header: Navigation tabs (Mobile)
 * - Main Content: Form หรือ List ตาม active tab
 * 
 * หมายเหตุ: หน้า Admin ใช้ full-screen layout
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Icons } from '@/components/admin/Icons';
import HouseForm from '@/components/admin/HouseForm';
import HouseList from '@/components/admin/HouseList';
import GalleryForm from '@/components/admin/GalleryForm';
import GalleryList from '@/components/admin/GalleryList';
import QuotationList from '@/components/admin/QuotationList';
import { House, GalleryItem } from '@/types';

/**
 * AdminPage Component
 * 
 * Component หลักของหน้า Admin
 */
export default function AdminPage() {
  // State สำหรับจัดการ active tab และ editing state
  const [activeTab, setActiveTab] = useState<'add' | 'edit' | 'gallery' | 'quotations'>('add');
  const [editingHouse, setEditingHouse] = useState<House | null>(null); // บ้านที่กำลังแก้ไข
  const [editingGallery, setEditingGallery] = useState<GalleryItem | null>(null); // gallery item ที่กำลังแก้ไข
  const [galleryMode, setGalleryMode] = useState<'list' | 'add' | 'edit'>('list'); // mode ของ gallery (list/add/edit)

  /**
   * Handle Edit House
   * 
   * เมื่อคลิกแก้ไขบ้าน ให้เปลี่ยนไปที่ tab 'edit' และ set editingHouse
   * 
   * @param house - ข้อมูลบ้านที่ต้องการแก้ไข
   */
  const handleEdit = (house: House) => {
    setEditingHouse(house);
    setActiveTab('edit');
  };

  /**
   * Handle Edit Gallery
   * 
   * เมื่อคลิกแก้ไข gallery item ให้เปลี่ยนไปที่ galleryMode 'edit' และ set editingGallery
   * 
   * @param item - ข้อมูล gallery item ที่ต้องการแก้ไข
   */
  const handleEditGallery = (item: GalleryItem) => {
    setEditingGallery(item);
    setGalleryMode('edit');
  };

  /**
   * Handle Success (House)
   * 
   * เมื่อบันทึกบ้านสำเร็จ ให้ reset editingHouse
   */
  const handleSuccess = () => {
    if (activeTab === 'edit') {
      setEditingHouse(null);
    }
  };

  /**
   * Handle Gallery Success
   * 
   * เมื่อบันทึก gallery item สำเร็จ ให้ reset editingGallery และกลับไปที่ list mode
   */
  const handleGallerySuccess = () => {
    setEditingGallery(null);
    setGalleryMode('list');
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-100 via-gray-50 to-slate-100">
      {/* Sidebar - Fixed on Desktop */}
      <aside className="hidden md:flex fixed left-0 top-0 w-72 h-screen flex-col bg-white border-r border-gray-200 shadow-sm z-40">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-xs text-gray-500">ระบบจัดการเว็บไซต์</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <p className="px-3 mb-3 text-xs font-bold text-gray-400 uppercase tracking-wider">ผลงาน</p>
          
          <button
            onClick={() => { setActiveTab('add'); setEditingHouse(null); }}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 ${
              activeTab === 'add' 
                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <div className={`p-2 rounded-lg ${activeTab === 'add' ? 'bg-white/20' : 'bg-gray-100'}`}>
              <Icons.Plus />
            </div>
            <div className="flex-1 text-left">
              <span className="font-semibold block text-sm">เพิ่มผลงาน</span>
              <span className={`text-xs ${activeTab === 'add' ? 'text-blue-100' : 'text-gray-400'}`}>สร้างโครงการใหม่</span>
            </div>
          </button>
          
          <button
            onClick={() => { setActiveTab('edit'); setEditingHouse(null); }}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 ${
              activeTab === 'edit' 
                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <div className={`p-2 rounded-lg ${activeTab === 'edit' ? 'bg-white/20' : 'bg-gray-100'}`}>
              <Icons.List />
            </div>
            <div className="flex-1 text-left">
              <span className="font-semibold block text-sm">จัดการผลงาน</span>
              <span className={`text-xs ${activeTab === 'edit' ? 'text-blue-100' : 'text-gray-400'}`}>แก้ไข / ลบ รายการ</span>
            </div>
          </button>

          <div className="pt-4 mt-2 border-t border-gray-100">
            <p className="px-3 mb-3 text-xs font-bold text-gray-400 uppercase tracking-wider">การันตีคุณภาพ</p>
          </div>

          <button
            onClick={() => { setActiveTab('gallery'); setEditingGallery(null); setGalleryMode('list'); }}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 ${
              activeTab === 'gallery' 
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <div className={`p-2 rounded-lg ${activeTab === 'gallery' ? 'bg-white/20' : 'bg-gray-100'}`}>
              <Icons.Star />
            </div>
            <div className="flex-1 text-left">
              <span className="font-semibold block text-sm">การันตีคุณภาพ</span>
              <span className={`text-xs ${activeTab === 'gallery' ? 'text-amber-100' : 'text-gray-400'}`}>จัดการรูปภาพการันตี</span>
            </div>
          </button>

          <div className="pt-4 mt-2 border-t border-gray-100">
            <p className="px-3 mb-3 text-xs font-bold text-gray-400 uppercase tracking-wider">ข้อมูลลูกค้า</p>
          </div>

          <button
            onClick={() => setActiveTab('quotations')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 ${
              activeTab === 'quotations' 
                ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-500/30' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <div className={`p-2 rounded-lg ${activeTab === 'quotations' ? 'bg-white/20' : 'bg-gray-100'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <span className="font-semibold block text-sm">ใบเสนอราคา</span>
              <span className={`text-xs ${activeTab === 'quotations' ? 'text-emerald-100' : 'text-gray-400'}`}>คำขอจากลูกค้า</span>
            </div>
          </button>

          <div className="pt-4 mt-4 border-t border-gray-100">
            <p className="px-3 mb-3 text-xs font-bold text-gray-400 uppercase tracking-wider">ลิงก์</p>
            
            <Link
              href="/"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200 group"
            >
              <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-emerald-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              </div>
              <div className="flex-1 text-left">
                <span className="font-medium block text-sm">กลับหน้าเว็บ</span>
                <span className="text-xs text-gray-400">ดูหน้าเว็บไซต์หลัก</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm">
              A
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800">ผู้ดูแลระบบ</p>
              <p className="text-xs text-gray-400">Admin Access</p>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-emerald-600 font-medium">Online</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="font-bold text-gray-900">Admin Panel</span>
          </div>
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            หน้าเว็บ
          </Link>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
          <button
            onClick={() => { setActiveTab('add'); setEditingHouse(null); }}
            className={`flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'add' 
                ? 'bg-blue-500 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            <Icons.Plus />
            เพิ่มผลงาน
          </button>
          
          <button
            onClick={() => { setActiveTab('edit'); setEditingHouse(null); }}
            className={`flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'edit' 
                ? 'bg-blue-500 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            <Icons.List />
            จัดการผลงาน
          </button>

          <button
            onClick={() => { setActiveTab('gallery'); setEditingGallery(null); setGalleryMode('list'); }}
            className={`flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'gallery' 
                ? 'bg-amber-500 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            <Icons.Star />
            การันตีคุณภาพ
          </button>

          <button
            onClick={() => setActiveTab('quotations')}
            className={`flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'quotations' 
                ? 'bg-emerald-500 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            ใบเสนอราคา
          </button>
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <main className="md:ml-72 h-screen overflow-y-auto admin-scrollbar">
        <div className="pt-32 md:pt-8 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {activeTab === 'add' && (
              <HouseForm onSuccess={handleSuccess} />
            )}

            {activeTab === 'edit' && !editingHouse && (
              <HouseList onEdit={handleEdit} />
            )}

            {activeTab === 'edit' && editingHouse && (
              <HouseForm 
                initialData={editingHouse} 
                onSuccess={handleSuccess} 
                onCancel={() => setEditingHouse(null)}
              />
            )}

            {activeTab === 'gallery' && (
              <div className="space-y-6">
                {/* Sub-navigation for Gallery */}
                <div className="flex gap-3">
                  <button
                    onClick={() => { setGalleryMode('add'); setEditingGallery(null); }}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all ${
                      galleryMode === 'add' || galleryMode === 'edit'
                        ? 'bg-amber-500 text-white shadow-lg'
                        : 'bg-white text-gray-600 border border-gray-200 hover:border-amber-300 hover:bg-amber-50'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    {galleryMode === 'edit' ? '✏️ กำลังแก้ไข' : 'เพิ่มใหม่'}
                  </button>
                  <button
                    onClick={() => { setGalleryMode('list'); setEditingGallery(null); }}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all ${
                      galleryMode === 'list'
                        ? 'bg-amber-500 text-white shadow-lg'
                        : 'bg-white text-gray-600 border border-gray-200 hover:border-amber-300 hover:bg-amber-50'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                    </svg>
                    📋 ดูทั้งหมด
                  </button>
                </div>

                {/* Content based on mode */}
                {galleryMode === 'list' && (
                  <GalleryList onEdit={handleEditGallery} />
                )}

                {galleryMode === 'add' && (
                  <GalleryForm onSuccess={handleGallerySuccess} />
                )}

                {galleryMode === 'edit' && editingGallery && (
                  <GalleryForm 
                    initialData={editingGallery}
                    onSuccess={handleGallerySuccess}
                    onCancel={() => { setEditingGallery(null); setGalleryMode('list'); }}
                  />
                )}
              </div>
            )}



            {activeTab === 'quotations' && (
              <QuotationList />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
