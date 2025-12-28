'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { db } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Icons } from './Icons';
import { House } from '@/types';

interface HouseListProps {
  onEdit: (house: House) => void;
}

export default function HouseList({ onEdit }: HouseListProps) {
  const [houses, setHouses] = useState<House[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHouses = async () => {
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'houses'));
      const housesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as House));
      housesData.sort((a, b) => {
        const orderA = typeof a.order === 'number' ? a.order : (a.order ? parseInt(String(a.order), 10) : 999999);
        const orderB = typeof b.order === 'number' ? b.order : (b.order ? parseInt(String(b.order), 10) : 999999);
        if (orderA === orderB) {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          if (dateA !== dateB) return dateB - dateA;
          return (a.id || '').localeCompare(b.id || '');
        }
        return orderA - orderB;
      });
      setHouses(housesData);
    } catch (error) {
      console.error("Error fetching houses:", error);
      alert("เกิดข้อผิดพลาดในการดึงข้อมูล");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHouses();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?')) return;
    try {
      await deleteDoc(doc(db, 'houses', id));
      setHouses(prev => prev.filter(h => h.id !== id));
      alert('ลบข้อมูลสำเร็จ');
    } catch (error) {
      console.error("Error deleting house:", error);
      alert("เกิดข้อผิดพลาดในการลบข้อมูล");
    }
  };

  const toggleFeatured = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'houses', id), { isFeatured: !currentStatus });
      setHouses(prev => prev.map(h => 
        h.id === id ? { ...h, isFeatured: !currentStatus } : h
      ));
    } catch (error) {
      console.error("Error toggling featured:", error);
      alert("เกิดข้อผิดพลาด");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-gray-200 border-t-blue-600"></div>
        <p className="mt-4 text-gray-500 text-sm">กำลังโหลดข้อมูล...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">จัดการผลงาน</h1>
            <p className="text-gray-500 text-sm mt-1">ผลงานทั้งหมด {houses.length} รายการ</p>
          </div>
          <button 
            onClick={fetchHouses} 
            className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
              <path d="M3 3v5h5"/>
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
              <path d="M16 16h5v5"/>
            </svg>
            รีเฟรช
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{houses.length}</p>
            <p className="text-xs text-gray-500 mt-1">ผลงานทั้งหมด</p>
          </div>
          <div className="text-center border-x border-gray-100">
            <p className="text-2xl font-bold text-gray-900">
              {houses.reduce((acc, h) => acc + (h.images?.length || 0), 0)}
            </p>
            <p className="text-xs text-gray-500 mt-1">รูปภาพ</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {houses.filter(h => h.isFeatured).length}
            </p>
            <p className="text-xs text-gray-500 mt-1">แสดงใน Footer</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {houses.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
              <Icons.List />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">ยังไม่มีผลงาน</h3>
            <p className="text-gray-500 text-sm">เริ่มเพิ่มผลงานใหม่โดยคลิกที่ &quot;เพิ่มผลงาน&quot;</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase w-16">#</th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase w-20">รูป</th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase">ชื่อโครงการ</th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">ราคา</th>
                  <th className="py-3 px-4 text-center text-xs font-semibold text-gray-500 uppercase w-24">แสดง Footer</th>
                  <th className="py-3 px-4 text-right text-xs font-semibold text-gray-500 uppercase w-28">จัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {houses.map((house, index) => (
                  <tr key={house.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 text-gray-600 font-medium text-sm">
                        {house.order || index + 1}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-gray-100">
                        {house.mainImage ? (
                          <Image 
                            src={house.mainImage} 
                            alt={house.title} 
                            fill
                            className="object-cover" 
                            sizes="64px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <Icons.Photo />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900 text-sm">{house.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                        {house.description || 'ไม่มีคำอธิบาย'}
                      </div>
                    </td>
                    <td className="py-4 px-4 hidden md:table-cell">
                      <span className="text-sm text-gray-900 font-medium">
                        {house.price || '-'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex justify-center">
                        <button
                          onClick={() => house.id && toggleFeatured(house.id, house.isFeatured || false)}
                          className={`relative w-10 h-5 rounded-full transition-colors ${
                            house.isFeatured ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                            house.isFeatured ? 'translate-x-5' : 'translate-x-0'
                          }`}></span>
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => onEdit(house)}
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="แก้ไข"
                        >
                          <Icons.Pencil />
                        </button>
                        <button
                          onClick={() => house.id && handleDelete(house.id)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="ลบ"
                        >
                          <Icons.XMark />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
