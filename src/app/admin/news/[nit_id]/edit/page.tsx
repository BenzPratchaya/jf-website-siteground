// src/app/admin/news/[nit_id]/edit/page.tsx
// ไม่มี 'use client' แล้ว ทำให้เป็น Server Component โดยปริยาย

import EditNewsForm from './editNewsForm'; // นำเข้า Client Component

const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export async function generateStaticParams() {
   const res = await fetch(`${apiBaseUrl}/api/news` , {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
    const newsItems = await res.json();
  
  return newsItems.map((newsItem: { nit_id: string }) => ({
    nit_id: newsItem.nit_id,
  }));
}

// นี่คือ Server Component ที่รับ params จาก URL
export default async function EditNewsPage({ params }: { params: Promise<{ nit_id: string }> }) {
  const nit_id = (await params).nit_id;

  // Render Client Component และส่ง nit_id เป็น prop
  return <EditNewsForm nit_id={nit_id} />; // ส่ง nit_id เป็น prop
}