'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc, orderBy, query } from 'firebase/firestore';
import { QuotationRequest } from '@/types';
import { QUOTATION_STATUS_OPTIONS } from '@/app/constants/data';
import Loading from '@/components/ui/Loading';
import EmptyState from '@/components/ui/EmptyState';
import QuotationCard from './QuotationCard';
import QuotationDetailPanel from './QuotationDetailPanel';

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

  // กรองตามสถานะ
  const filteredQuotations = filterStatus === 'all' 
    ? quotations 
    : quotations.filter(q => q.status === filterStatus);

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <Loading message="กำลังโหลดข้อมูลใบเสนอราคา..." size="lg" />
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
              title="กรองตามสถานะ"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-400 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="all">ทั้งหมด</option>
              {QUOTATION_STATUS_OPTIONS.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
            <button
              title="รีเฟรช"
              onClick={fetchQuotations}
              className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
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
        <EmptyState
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          }
          title="ยังไม่มีคำขอใบเสนอราคา"
          description="เมื่อลูกค้ากรอกแบบฟอร์มขอใบเสนอราคา จะแสดงที่นี่"
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quotation List */}
          <div className="space-y-4">
            {filteredQuotations.map((quotation) => (
              <QuotationCard
                key={quotation.id}
                quotation={quotation}
                isSelected={selectedQuotation?.id === quotation.id}
                onClick={() => setSelectedQuotation(quotation)}
              />
            ))}
          </div>

          {/* Detail Panel */}
          <div className="lg:sticky lg:top-8 self-start">
            {selectedQuotation ? (
              <QuotationDetailPanel
                quotation={selectedQuotation}
                updatingId={updatingId}
                deletingId={deletingId}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
                onClose={() => setSelectedQuotation(null)}
              />
            ) : (
              <EmptyState
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-emerald-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
                  </svg>
                }
                title="เลือกรายการเพื่อดูรายละเอียด"
                description="คลิกที่รายการทางซ้ายเพื่อดูข้อมูลครบถ้วน"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
