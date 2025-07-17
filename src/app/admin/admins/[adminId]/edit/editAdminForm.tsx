// src/app/admin/admins/[adminId]/edit/editAdminForm.tsx
'use client'; // ต้องมี directive นี้เพื่อระบุว่าเป็น Client Component

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Admin {
  _id: string;
  username: string;
  role: string;
}

// Component นี้จะรับ adminId เป็น prop แทนที่จะดึงจาก params โดยตรง
export default function EditAdminForm({ adminId }: { adminId: string }) {
  const router = useRouter();
  const [formData, setFormData] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
  useEffect(() => {
    const fetchAdminUser = async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/api/admin/${adminId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          setFormData(data);
        } else if (res.status === 401 || res.status === 403) {
          router.push('/auth/login');
        } else {
          const data = await res.json();
          setError(data.message || 'Failed to fetch admin user data.');
        }
      } catch (err) {
        console.error('Error fetching admin user:', err);
        setError('An unexpected error occurred while fetching admin user data.');
      } finally {
        setLoading(false);
      }
    };

    if (adminId) {
      fetchAdminUser();
    }
  }, [adminId, router, apiBaseUrl]); // adminId เป็น dependency

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData(prev => ({ ...prev!, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData) {
      setError('No admin user data to save.');
      return;
    }

    try {
      const res = await fetch(`${apiBaseUrl}/api/admin/${adminId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess('Admin user updated successfully!');
        router.push('/admin/admins');
      } else if (res.status === 401 || res.status === 403) {
        router.push('/auth/login');
      } else {
        const data = await res.json();
        setError(data.message || 'Failed to update admin user.');
      }
    } catch (err) {
      console.error('Error updating admin user:', err);
      setError('An unexpected error occurred while updating admin user.');
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading admin user data...</div>;
  }

  if (error && !formData) {
    return <div className="text-center mt-10 text-red-600">{error}</div>;
  }
  
  if (!formData) {
    return <div className="text-center mt-10 text-gray-500">Admin user not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Edit Admin User: {formData.username}</h1>
      <Link href="/admin/admins" className="text-blue-500 hover:underline mb-4 block">
        &larr; Back to Admin List
      </Link>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input type="text" name="username" id="username" value={formData.username} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
          <select name="role" id="role" value={formData.role} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
            <option value="admin">Admin</option>
            <option value="superadmin">Superadmin</option>
          </select>
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mt-2">{success}</p>}

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Update Admin User
        </button>
      </form>
    </div>
  );
}