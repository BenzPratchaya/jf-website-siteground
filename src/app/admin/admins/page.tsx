// src/app/admin/admins/page.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import React from 'react'; // สำหรับ React.use()

interface Admin {
  _id: string; // MongoDB's internal ID
  username: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminUsersPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
  const fetchAdmins = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      // Frontend เรียก Backend: GET /api/admin/all
      const res = await fetch(`${apiBaseUrl}/api/admin/all`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // ต้องส่ง Cookie ไปด้วย
      });

      if (res.ok) {
        const data = await res.json();
        setAdmins(data);
      } else if (res.status === 401 || res.status === 403) {
        // หากไม่ได้รับอนุญาต (ไม่ได้ login หรือไม่ใช่ superadmin)
        router.push('/auth/login');
      } else {
        const data = await res.json();
        setError(data.message || 'Failed to fetch admin users.');
      }
    } catch (err) {
      console.error('Error fetching admin users:', err);
      setError('An unexpected error occurred while fetching admin users.');
    } finally {
      setLoading(false);
    }
  }, [router, apiBaseUrl]);

  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  const handleDelete = async (adminId: string) => { // รับ _id
    if (!window.confirm('Are you sure you want to delete this admin user?')) {
      return;
    }

    try {
      // Frontend เรียก Backend: DELETE /api/admin/:id
      const res = await fetch(`${apiBaseUrl}/api/admin/${adminId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (res.ok) {
        setAdmins(admins.filter(admin => admin._id !== adminId)); // Filter ด้วย _id
      } else if (res.status === 401 || res.status === 403) {
        router.push('/auth/login');
      } else {
        const data = await res.json();
        setError(data.message || 'Failed to delete admin user.');
      }
    } catch (err) {
      console.error('Error deleting admin user:', err);
      setError('An unexpected error occurred while deleting admin user.');
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading admin users...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin User Management</h1>
        <Link 
          href="/admin/admins/create" 
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add New Admin
        </Link>
      </div>

      {admins.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">No admin users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">ID</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Username</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Role</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4 text-sm text-gray-800">{admin._id}</td>
                  <td className="py-2 px-4 text-sm text-gray-800">{admin.username}</td>
                  <td className="py-2 px-4 text-sm text-gray-800">{admin.role}</td>
                  <td className="py-2 px-4 text-sm">
                    <Link 
                      href={`/admin/admins/${admin._id}/edit`} // ใช้ _id ใน URL
                      className="text-yellow-600 hover:text-yellow-800 mr-3"
                    >
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(admin._id)} // ใช้ _id ในการลบ
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}