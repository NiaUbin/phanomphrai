'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { db, storage } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';

interface GalleryItem {
  id?: string;
  description: string;
  imageUrl: string;
  order?: number;
}

interface GalleryListProps {
  onEdit: (item: GalleryItem) => void;
}

export default function GalleryList({ onEdit }: GalleryListProps) {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'gallery'));
      const data: GalleryItem[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as GalleryItem);
      });
      data.sort((a, b) => (a.order || 0) - (b.order || 0));
      setItems(data);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (item: GalleryItem) => {
    if (!item.id) return;
    
    const confirmed = confirm(`ต้องการลบรายการนี้หรือไม่?\n"${item.description}"`);
    if (!confirmed) return;

    setDeletingId(item.id);

    try {
      await deleteDoc(doc(db, 'gallery', item.id));

      if (item.imageUrl && item.imageUrl.includes('firebase')) {
        try {
          const imageRef = ref(storage, item.imageUrl);
          await deleteObject(imageRef);
        } catch (imageError) {
          console.log('Could not delete image:', imageError);
        }
      }

      await fetchItems();
      alert('ลบสำเร็จ!');
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('เกิดข้อผิดพลาด กรุณาลองใหม่');
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="flex flex-col items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-gray-500 text-sm">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">รายการการันตีคุณภาพ</h2>
            <p className="text-sm text-gray-500">ทั้งหมด {items.length} รายการ</p>
          </div>
          <button
            onClick={fetchItems}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title="รีเฟรช"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
            <p className="text-gray-500">ยังไม่มีข้อมูล</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-300 transition-colors"
              >
                {/* Image */}
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-200 shrink-0">
                  <Image
                    src={item.imageUrl}
                    alt={item.description}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 font-medium line-clamp-2 mb-2">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                    <span className="px-2 py-0.5 bg-gray-200 rounded">
                      ID: {item.id}
                    </span>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                      ลำดับ: {item.order || 0}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onEdit(item)}
                    className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  >
                    แก้ไข
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    disabled={deletingId === item.id}
                    className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
                  >
                    {deletingId === item.id ? 'กำลังลบ...' : 'ลบ'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
