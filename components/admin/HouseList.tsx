/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
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

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div>
        <p className="mt-4 text-gray-500 font-medium">กำลังโหลดข้อมูล...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 sm:p-8 border border-blue-100/50 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm border border-blue-100">
              <div className="w-6 h-6 text-blue-600">
                <Icons.List />
              </div>
            </div>
        <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            รายการผลงานทั้งหมด
          </h1>
              <p className="text-sm text-gray-600 mt-1">
                จัดการข้อมูลผลงานที่คุณต้องการแสดงบนหน้าเว็บไซต์
              </p>
            </div>
        </div>
        <button 
          onClick={fetchHouses} 
            className="group flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-md hover:shadow-lg"
            aria-label="รีเฟรชข้อมูล"
        >
          <span className="group-hover:rotate-180 transition-transform duration-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                <path d="M3 3v5h5"/>
                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
                <path d="M16 16h5v5"/>
              </svg>
          </span>
          รีเฟรช
        </button>
      </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">ทั้งหมด</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{houses.length}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <Icons.List />
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">รูปภาพ</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {houses.reduce((acc, h) => acc + (h.images?.length || 0), 0)}
                </p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                <Icons.Photo />
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">อัปเดตล่าสุด</p>
                <p className="text-sm font-semibold text-gray-700 mt-1">วันนี้</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {houses.length === 0 ? (
          <div className="py-20 text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="p-6 bg-gray-50 rounded-full mb-4 text-gray-400">
                <Icons.List />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">ยังไม่มีข้อมูลผลงาน</h3>
              <p className="text-gray-500 max-w-md">
                เริ่มสร้างผลงานใหม่โดยคลิกที่ปุ่ม &quot;เพิ่มผลงาน&quot; ในเมนูด้านซ้าย
              </p>
            </div>
          </div>
        ) : (
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-50/50 border-b-2 border-gray-200">
                  <th className="py-4 px-6 text-xs font-bold text-gray-600 uppercase tracking-wider w-32">รูปภาพ</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-600 uppercase tracking-wider min-w-[200px]">ชื่อโครงการ</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-600 uppercase tracking-wider">รายละเอียด</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-600 uppercase tracking-wider">ราคา</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-600 uppercase tracking-wider text-right">จัดการ</th>
            </tr>
          </thead>
              <tbody className="divide-y divide-gray-100">
            {houses.map((house) => (
                  <tr 
                    key={house.id} 
                    className="group hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/30 transition-all duration-200"
                  >
                    <td className="py-5 px-6">
                      <div className="w-24 h-16 sm:w-28 sm:h-20 rounded-lg overflow-hidden bg-gray-100 shadow-sm border border-gray-200 group-hover:shadow-md group-hover:border-blue-200 transition-all">
                    {house.mainImage ? (
                          <img 
                            src={house.mainImage} 
                            alt={house.title} 
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                          />
                    ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50">
                            <div className="w-8 h-8">
                        <Icons.Photo />
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors text-base">
                        {house.title}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {house.description || 'ไม่มีคำอธิบาย'}
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="space-y-1">
                        {house.specifications?.bedrooms && (
                          <div className="text-xs text-gray-600 flex items-center gap-1">
                            <span className="font-medium">ห้องนอน:</span>
                            <span>{house.specifications.bedrooms}</span>
                          </div>
                        )}
                        {house.specifications?.bathrooms && (
                          <div className="text-xs text-gray-600 flex items-center gap-1">
                            <span className="font-medium">ห้องน้ำ:</span>
                            <span>{house.specifications.bathrooms}</span>
                          </div>
                        )}
                        {house.specifications?.area && (
                          <div className="text-xs text-gray-600 flex items-center gap-1">
                            <span className="font-medium">พื้นที่:</span>
                            <span>{house.specifications.area} ตร.ม.</span>
                          </div>
                        )}
                        {!house.specifications?.bedrooms && !house.specifications?.bathrooms && !house.specifications?.area && (
                          <span className="text-xs text-gray-400">-</span>
                    )}
                  </div>
                </td>
                    <td className="py-5 px-6">
                      <div className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200 shadow-sm">
                        {house.price || '-'}
                  </div>
                </td>
                    <td className="py-5 px-6">
                      <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(house)}
                          className="p-2.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all shadow-sm hover:shadow-md hover:scale-105"
                          aria-label={`แก้ไข ${house.title}`}
                      title="แก้ไข"
                    >
                      <Icons.Pencil />
                    </button>
                    <button
                      onClick={() => house.id && handleDelete(house.id)}
                          className="p-2.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-all shadow-sm hover:shadow-md hover:scale-105"
                          aria-label={`ลบ ${house.title}`}
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
