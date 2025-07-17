// src/app/admin/layout.tsx
'use client'; // Component นี้จะมี Interaction (State, Hooks) จึงต้องเป็น Client Component

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation'; // ใช้ usePathname เพื่อไฮไลต์ลิงก์ปัจจุบัน
import { FaBars, FaTimes, FaThLarge, FaBox, FaNewspaper, FaUsers, FaSignOutAlt } from 'react-icons/fa'; // ติดตั้ง: npm install react-icons

interface AdminProfile {
  _id: string;
  username: string;
  role: string;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // สถานะ Sidebar เปิด/ปิด
  const [adminProfile, setAdminProfile] = useState<AdminProfile | null>(null); // สถานะข้อมูล Admin
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [errorProfile, setErrorProfile] = useState('');
  const router = useRouter();
  const pathname = usePathname(); // สำหรับไฮไลต์ลิงก์ปัจจุบัน

  // Fetch Admin Profile on component mount
  const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/api/admin/profile`, { // Backend API: GET /api/admin/profile
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          setAdminProfile(data);
        } else if (res.status === 401 || res.status === 403) {
          router.push('/auth/login'); // Redirect หากไม่ได้ Login
        } else {
          const data = await res.json();
          setErrorProfile(data.message || 'Failed to fetch admin profile.');
        }
      } catch (err) {
        console.error('Error fetching admin profile:', err);
        setErrorProfile('An unexpected error occurred while fetching profile.');
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchAdmin();
  }, [router, apiBaseUrl]);

  const handleLogout = async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/api/admin/logout`, { // Backend API: POST /api/admin/logout
        method: 'POST',
        credentials: 'include',
      });

      if (res.ok) {
        router.push('/auth/login'); // Redirect ไปหน้า Login
      } else {
        const data = await res.json();
        alert(data.message || 'Logout failed.'); // แสดงข้อความ Error
      }
    } catch (err) {
      console.error('Logout error:', err);
      alert('An error occurred during logout.');
    }
  };

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: FaThLarge },
    { name: 'Products', href: '/admin/products', icon: FaBox },
    { name: 'News', href: '/admin/news', icon: FaNewspaper },
    { name: 'Admins', href: '/admin/admins', icon: FaUsers, roles: ['superadmin'] }, // เฉพาะ superadmin
  ];

  if (loadingProfile) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        Loading Admin Panel...
      </div>
    );
  }

  if (errorProfile || !adminProfile) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-red-100 text-red-700">
        Error: {errorProfile || 'Admin profile not loaded. Please log in again.'}
        <button onClick={() => router.push('/auth/login')} className="ml-4 px-4 py-2 bg-red-600 text-white rounded">Login</button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 bg-gray-800 text-white w-64 p-4 space-y-6 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="flex items-center justify-between">
          <Link href="/admin/dashboard" className="text-2xl font-bold">
            Admin Panel
          </Link>
          <button 
            className="md:hidden text-white focus:outline-none" 
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaTimes size={24} />
          </button>
        </div>

        <div className="mt-8">
          <div className="text-gray-400 text-sm uppercase tracking-wider mb-2">Logged in as:</div>
          <p className="font-semibold text-lg">{adminProfile.username}</p>
          <p className="text-sm text-gray-400">Role: {adminProfile.role}</p>
        </div>

        <nav className="flex-grow">
          {navItems.map((item) => {
            // แสดงเฉพาะรายการที่ Role มีสิทธิ์
            if (item.roles && !item.roles.includes(adminProfile.role)) {
              return null;
            }
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin/dashboard');
            return (
              <Link 
                key={item.name} 
                href={item.href} 
                className={`flex items-center space-x-3 p-2 rounded-md transition duration-200 
                  ${isActive ? 'bg-gray-700 text-white' : 'hover:bg-gray-700 text-gray-300'}
                `}
                onClick={() => setIsSidebarOpen(false)} // ปิด sidebar หลังจากคลิก (สำหรับ mobile)
              >
                <item.icon />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <button 
          onClick={handleLogout} 
          className="flex items-center space-x-3 p-2 rounded-md text-gray-300 hover:bg-gray-700 transition duration-200 w-full mt-auto"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header/Toggle button for mobile */}
        <header className="flex items-center justify-between p-4 bg-white shadow-md md:hidden">
          <button 
            className="text-gray-800 focus:outline-none" 
            onClick={() => setIsSidebarOpen(true)}
          >
            <FaBars size={24} />
          </button>
          <h1 className="text-xl font-semibold">Admin Panel</h1>
          {/* สามารถเพิ่ม Admin Profile ย่อๆ ตรงนี้ได้ถ้าต้องการ */}
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {children} {/* นี่คือส่วนที่หน้า Content หลักจะถูก Render */}
        </main>
      </div>
    </div>
  );
}