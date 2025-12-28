'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc, orderBy, query, Timestamp } from 'firebase/firestore';

/**
 * Interface สำหรับข้อมูลใบเสนอราคา
 * ข้อมูลทุกฟิลด์ตรงกับที่ลูกค้ากรอกในฟอร์ม quotation/page.tsx
 */
interface QuotationRequest {
  id: string;
  // ข้อมูลผู้ติดต่อ
  name: string;
  phone: string;
  email: string;
  lineId: string;
  // ลักษณะงาน
  workTypes: string[];
  otherWorkType: string;
  // รายละเอียดโครงการ
  area: string;
  subDistrict: string;
  district: string;
  province: string;
  additionalDetails: string;
  // ข้อมูลระบบ
  pdpaConsent: boolean;
  pdpaConsentDate: Timestamp | Date;
  status: 'pending' | 'contacted' | 'quoted' | 'completed' | 'cancelled';
  createdAt: Timestamp | Date;
  notes?: string;
}

const statusOptions = [
  { value: 'pending', label: 'รอดำเนินการ', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'contacted', label: 'ติดต่อแล้ว', color: 'bg-blue-100 text-blue-800' },
  { value: 'quoted', label: 'ส่งใบเสนอราคาแล้ว', color: 'bg-purple-100 text-purple-800' },
  { value: 'completed', label: 'เสร็จสิ้น', color: 'bg-green-100 text-green-800' },
  { value: 'cancelled', label: 'ยกเลิก', color: 'bg-gray-100 text-gray-600' },
];

export default function QuotationList() {
  const [quotations, setQuotations] = useState<QuotationRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedQuotation, setSelectedQuotation] = useState<QuotationRequest | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // ดึงข้อมูลใบเสนอราคาจาก Firestore
  const fetchQuotations = async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, 'quotationRequests'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const data: QuotationRequest[] = [];
      querySnapshot.forEach((docSnap) => {
        data.push({ id: docSnap.id, ...docSnap.data() } as QuotationRequest);
      });
      setQuotations(data);
    } catch (error) {
      console.error('Error fetching quotations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotations();
  }, []);

  // อัพเดทสถานะ
  const handleStatusChange = async (quotationId: string, newStatus: string) => {
    setUpdatingId(quotationId);
    try {
      await updateDoc(doc(db, 'quotationRequests', quotationId), {
        status: newStatus,
      });
      await fetchQuotations();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('เกิดข้อผิดพลาดในการอัพเดทสถานะ');
    } finally {
      setUpdatingId(null);
    }
  };

  // ลบใบเสนอราคา
  const handleDelete = async (quotation: QuotationRequest) => {
    const confirmed = confirm(`ต้องการลบข้อมูลใบเสนอราคาของ "${quotation.name}" หรือไม่?`);
    if (!confirmed) return;

    setDeletingId(quotation.id);
    try {
      await deleteDoc(doc(db, 'quotationRequests', quotation.id));
      await fetchQuotations();
      if (selectedQuotation?.id === quotation.id) {
        setSelectedQuotation(null);
      }
      alert('ลบข้อมูลสำเร็จ!');
    } catch (error) {
      console.error('Error deleting quotation:', error);
      alert('เกิดข้อผิดพลาดในการลบข้อมูล');
    } finally {
      setDeletingId(null);
    }
  };

  // แปลงวันที่
  const formatDate = (date: Timestamp | Date) => {
    const d = date instanceof Timestamp ? date.toDate() : new Date(date);
    return d.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // กรองตามสถานะ
  const filteredQuotations = filterStatus === 'all' 
    ? quotations 
    : quotations.filter(q => q.status === filterStatus);

  // Get status badge
  const getStatusBadge = (status: string) => {
    const statusOption = statusOptions.find(s => s.value === status);
    return statusOption || { value: status, label: status, color: 'bg-gray-100 text-gray-600' };
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <div className="flex flex-col items-center justify-center">
          <div className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-500">กำลังโหลดข้อมูลใบเสนอราคา...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-emerald-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              คำขอใบเสนอราคา
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              ทั้งหมด {quotations.length} รายการ • แสดง {filteredQuotations.length} รายการ
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="all">ทั้งหมด</option>
              {statusOptions.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
            <button
              onClick={fetchQuotations}
              className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
              title="รีเฟรช"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {filteredQuotations.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 shadow-sm">
          <div className="text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">ยังไม่มีคำขอใบเสนอราคา</h3>
            <p className="text-gray-500">เมื่อลูกค้ากรอกแบบฟอร์มขอใบเสนอราคา จะแสดงที่นี่</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quotation List */}
          <div className="space-y-4">
            {filteredQuotations.map((quotation) => {
              const statusBadge = getStatusBadge(quotation.status);
              return (
                <div
                  key={quotation.id}
                  onClick={() => setSelectedQuotation(quotation)}
                  className={`bg-white rounded-xl border-2 p-5 cursor-pointer transition-all hover:shadow-md ${
                    selectedQuotation?.id === quotation.id
                      ? 'border-emerald-500 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-800 truncate">{quotation.name}</h3>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${statusBadge.color}`}>
                          {statusBadge.label}
                        </span>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                          </svg>
                          {quotation.phone}
                        </p>
                        <p className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                          </svg>
                          {quotation.email}
                        </p>
                      </div>
                    </div>
                    <div className="text-right text-xs text-gray-400">
                      {formatDate(quotation.createdAt)}
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex flex-wrap gap-1.5">
                      {quotation.workTypes.slice(0, 2).map((type, index) => (
                        <span key={index} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded">
                          {type}
                        </span>
                      ))}
                      {quotation.workTypes.length > 2 && (
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                          +{quotation.workTypes.length - 2} อื่นๆ
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detail Panel */}
          <div className="lg:sticky lg:top-8 self-start">
            {selectedQuotation ? (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-5 text-white">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold">{selectedQuotation.name}</h3>
                      <p className="text-emerald-100 text-sm mt-1">
                        {formatDate(selectedQuotation.createdAt)}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedQuotation(null)}
                      className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-6 max-h-[calc(100vh-300px)] overflow-y-auto">
                  {/* Status Control */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">สถานะ</label>
                    <select
                      value={selectedQuotation.status}
                      onChange={(e) => handleStatusChange(selectedQuotation.id, e.target.value)}
                      disabled={updatingId === selectedQuotation.id}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:opacity-50"
                    >
                      {statusOptions.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Contact Info */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-emerald-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                      ข้อมูลผู้ติดต่อ
                    </h4>
                    <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-gray-500">ชื่อ-นามสกุล</p>
                          <p className="font-medium text-gray-800">{selectedQuotation.name}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">เบอร์โทรศัพท์</p>
                          <a href={`tel:${selectedQuotation.phone}`} className="font-medium text-emerald-600 hover:underline">
                            {selectedQuotation.phone}
                          </a>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">อีเมล</p>
                          <a href={`mailto:${selectedQuotation.email}`} className="font-medium text-emerald-600 hover:underline break-all">
                            {selectedQuotation.email}
                          </a>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Line ID</p>
                          <p className="font-medium text-gray-800">{selectedQuotation.lineId}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Work Types */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                      </svg>
                      ลักษณะงานที่สนใจ
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedQuotation.workTypes.map((type, index) => (
                        <span key={index} className="px-3 py-1.5 bg-blue-100 text-blue-800 text-sm font-medium rounded-lg">
                          {type}
                        </span>
                      ))}
                    </div>
                    {selectedQuotation.otherWorkType && (
                      <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                        <p className="text-xs text-amber-600 font-medium mb-1">งานอื่นๆ ที่ระบุ:</p>
                        <p className="text-amber-800">{selectedQuotation.otherWorkType}</p>
                      </div>
                    )}
                  </div>

                  {/* Project Details */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-purple-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                      รายละเอียดโครงการ
                    </h4>
                    <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                      <div>
                        <p className="text-xs text-gray-500">ขนาดพื้นที่โดยประมาณ</p>
                        <p className="font-medium text-gray-800">{selectedQuotation.area}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">สถานที่ตั้งโครงการ</p>
                        <p className="font-medium text-gray-800">
                          ตำบล{selectedQuotation.subDistrict} อำเภอ{selectedQuotation.district} จังหวัด{selectedQuotation.province}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Additional Details */}
                  {selectedQuotation.additionalDetails && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                        </svg>
                        รายละเอียดเพิ่มเติมจากลูกค้า
                      </h4>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-gray-700 whitespace-pre-wrap">{selectedQuotation.additionalDetails}</p>
                      </div>
                    </div>
                  )}

                  {/* PDPA Info */}
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-green-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                      </svg>
                      ยินยอม PDPA: {selectedQuotation.pdpaConsent ? '✓ ยอมรับ' : '✗ ไม่ยอมรับ'}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-gray-100 flex gap-3">
                    <a
                      href={`tel:${selectedQuotation.phone}`}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                      โทร
                    </a>
                    <a
                      href={`mailto:${selectedQuotation.email}`}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                      อีเมล
                    </a>
                    <button
                      onClick={() => handleDelete(selectedQuotation)}
                      disabled={deletingId === selectedQuotation.id}
                      className="px-4 py-3 bg-red-100 text-red-600 font-semibold rounded-xl hover:bg-red-200 transition-colors disabled:opacity-50"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 p-12 shadow-sm">
                <div className="text-center">
                  <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-emerald-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">เลือกรายการเพื่อดูรายละเอียด</h3>
                  <p className="text-gray-500 text-sm">คลิกที่รายการทางซ้ายเพื่อดูข้อมูลครบถ้วน</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
