// src/app/admin/dashboard/page.tsx
'use client'; // ยังคงเป็น Client Component ถ้ามี Hooks/Interaction ที่นี่

// ไม่มี import React icons หรือ Link/useRouter ที่นี่แล้ว ถ้าไม่มีการใช้งานโดยตรงในหน้านี้
// Layout จะจัดการส่วนเหล่านี้ให้

export default function AdminDashboardPage() {
  // ไม่ต้องมี state หรือ fetch สำหรับ admin profile ที่นี่แล้ว เพราะ layout จัดการให้
  // ไม่ต้องมีปุ่ม logout ที่นี่แล้ว เพราะ layout จัดการให้

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome to Your Admin Dashboard!</h1>
      <p className="text-gray-700">
        Use the sidebar to navigate and manage your website content.
      </p>

      {/* คุณสามารถเพิ่มสรุปข้อมูล หรือ Widgets ต่างๆ ได้ที่นี่ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3">Total Products</h2>
          <p className="text-3xl text-blue-600">50</p> {/* Example stat */}
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3">Total News Articles</h2>
          <p className="text-3xl text-green-600">25</p> {/* Example stat */}
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3">Active Admins</h2>
          <p className="text-3xl text-purple-600">3</p> {/* Example stat */}
        </div>
      </div>
    </div>
  );
}