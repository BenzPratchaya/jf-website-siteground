// src/app/admin/admins/[adminId]/edit/page.tsx
import EditAdminForm from './editAdminForm';

const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export async function generateStaticParams() {
  // ตัวอย่าง: ดึง ID ของ Admin ทั้งหมดจาก API หรือฐานข้อมูล
  // ในโปรเจกต์ของคุณอาจจะเรียกใช้ข้อมูลจาก backend API
   const res = await fetch(`${apiBaseUrl}/api/admin/all/public` , {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
   const admins = await res.json();

  return admins.map((admin: { _id: string }) => ({
    adminId: admin._id,
  }));
}

// นี่คือ Server Component ที่รับ params จาก URL
export default async function EditAdminPage({ params }: { params: Promise<{ adminId: string }> }) {
  const adminId = (await params).adminId;

  // Render Client Component และส่ง adminId เป็น prop
  return <EditAdminForm adminId={adminId} />;
}