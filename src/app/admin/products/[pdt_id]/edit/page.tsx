// src/app/admin/products/[pdt_id]/edit/page.tsx
// ไม่มี 'use client' แล้ว ทำให้เป็น Server Component โดยปริยาย

import EditProductForm from './editProductForm'; // นำเข้า Client Component

const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export async function generateStaticParams() {
   const res = await fetch(`${apiBaseUrl}/api/products` , {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
    const products = await res.json();
  // สร้างพารามิเตอร์สำหรับแต่ละ product
  return products.map((product: { pdt_id: string }) => ({
    pdt_id: product.pdt_id,
  }));  
}

// นี่คือ Server Component ที่รับ params จาก URL
// แก้ไข: เปลี่ยน productId เป็น pdt_id ตามชื่อ Folder
export default async function EditProductPage( props : { params: Promise<{ pdt_id: string }> }) {
  const params = await props.params;
  const pdt_id = params.pdt_id;

  // Render Client Component และส่ง pdt_id เป็น prop
  return <EditProductForm pdt_id={pdt_id} />; // แก้ไข: ส่ง pdt_id เป็น prop
}