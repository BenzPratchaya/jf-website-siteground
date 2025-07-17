// src/app/(admin)/news/[nit_id]/edit/editNewsForm.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface NewsItem {
  _id: string;
  nit_id: string; // Custom news item ID
  nit_image: string; // URL String
  nit_category: string;
  nit_date: string;
  nit_title: string;
  nit_description: string;
  nit_link: string;
  nit_details: {
    nid_contentBlocks: unknown[];
    nid_author?: string;
    nid_relatedLinks?: { text: string; url: string }[];
  };
}

export default function EditNewsForm({ nit_id }: { nit_id: string }) {
  const router = useRouter();
  const [formData, setFormData] = useState<NewsItem | null>(null);
  const [newsImageFile, setNewsImageFile] = useState<File | null>(null); // สถานะใหม่สำหรับไฟล์ที่เลือก
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null); // สถานะใหม่สำหรับ Preview รูปภาพ
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
  useEffect(() => {
    const fetchNewsItem = async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/api/news/${nit_id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          setFormData(data);
          if (data.nit_image) {
            setImagePreviewUrl(data.nit_image); // ใช้ Cloudinary URL โดยตรง
          } else {
            setImagePreviewUrl(null);
          }
        } else if (res.status === 401 || res.status === 403) {
          router.push('/auth/login');
        } else {
          const data = await res.json();
          setError(data.message || 'Failed to fetch news item data.');
        }
      } catch (err) {
        console.error('Error fetching news item:', err);
        setError('An unexpected error occurred while fetching news item data.');
      } finally {
        setLoading(false);
      }
    };

    if (nit_id) {
      fetchNewsItem();
    }
  }, [nit_id, router, apiBaseUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (formData) {
      if (name.startsWith('nid_')) {
        setFormData(prev => ({
          ...prev!,
          nit_details: {
            ...prev!.nit_details,
            [name]: value,
          },
        }));
      } else {
        setFormData(prev => ({ ...prev!, [name]: value }));
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewsImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    } else {
      setNewsImageFile(null);
    }
  };

  const handleClearImage = () => {
    setNewsImageFile(null);
    setImagePreviewUrl(null);
    if (formData) {
      setFormData(prev => ({ ...prev!, nit_image: '' })); 
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData) {
        setError('No news item data to save.');
        return;
    }

    const data = new FormData();
    data.append('nit_id', formData.nit_id);
    data.append('nit_category', formData.nit_category);
    data.append('nit_date', formData.nit_date);
    data.append('nit_title', formData.nit_title);
    data.append('nit_description', formData.nit_description);
    data.append('nit_link', formData.nit_link);
    data.append('nit_details', JSON.stringify(formData.nit_details));

    if (newsImageFile) {
      data.append('newsImage', newsImageFile);
    } else if (formData.nit_image !== undefined && formData.nit_image === '') {
        data.append('nit_image', '');
    }

    try {
      const res = await fetch(`${apiBaseUrl}/api/news/${nit_id}`, {
        method: 'PUT',
        credentials: 'include',
        body: data,
      });

      if (res.ok) {
        setSuccess('News item updated successfully!');
        router.push('/admin/news');
      } else if (res.status === 401 || res.status === 403) {
        router.push('/auth/login');
      } else {
        const resData = await res.json();
        setError(resData.message || 'Failed to update news item.');
      }
    } catch (err) {
      console.error('Error updating news item:', err);
      setError('An unexpected error occurred while updating news item.');
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading news item data...</div>;
  }

  if (error && !formData) {
    return <div className="text-center mt-10 text-red-600">{error}</div>;
  }

  if (!formData) {
    return <div className="text-center mt-10 text-gray-500">News item not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Edit News Item: {formData.nit_title}</h1>
      <Link href="/admin/news" className="text-blue-500 hover:underline mb-4 block">
        &larr; Back to News List
      </Link>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div>
          <label htmlFor="nit_id" className="block text-sm font-medium text-gray-700">News ID</label>
          <input type="text" name="nit_id" id="nit_id" value={formData.nit_id} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>
        </div>
        <div>
          <label htmlFor="nit_title" className="block text-sm font-medium text-gray-700">Title</label>
          <input type="text" name="nit_title" id="nit_title" value={formData.nit_title} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>
        </div>

        {/* ช่องอัปโหลดไฟล์รูปภาพสำหรับ Edit */}
        <div>
          <label htmlFor="newsImage" className="block text-sm font-medium text-gray-700">News Image File</label>
          {imagePreviewUrl && ( // แสดงรูปภาพปัจจุบันหรือรูปที่เลือกใหม่
            <div className="mb-2">
                <Image
                  width={96}
                  height={96}
                  src={imagePreviewUrl} alt="Current News Image" className="w-24 h-24 object-cover rounded" />
                <button 
                    type="button" 
                    onClick={handleClearImage} 
                    className="mt-1 text-red-500 hover:text-red-700 text-sm"
                >
                    Remove Image
                </button>
            </div>
          )}
          <input 
            type="file" 
            name="newsImage" 
            id="newsImage" 
            accept="image/*" 
            onChange={handleImageChange} 
            className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          />
          {!imagePreviewUrl && !newsImageFile && (
            <p className="text-gray-500 text-sm mt-1">No image selected or uploaded.</p>
          )}
        </div>

        <div>
          <label htmlFor="nit_category" className="block text-sm font-medium text-gray-700">Category</label>
          <input type="text" name="nit_category" id="nit_category" value={formData.nit_category} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>
        </div>
        <div>
          <label htmlFor="nit_date" className="block text-sm font-medium text-gray-700">Date</label>
          <input type="text" name="nit_date" id="nit_date" value={formData.nit_date} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="e.g., 2023-01-15"/>
        </div>
        <div>
          <label htmlFor="nit_description" className="block text-sm font-medium text-gray-700">Short Description</label>
          <textarea name="nit_description" id="nit_description" value={formData.nit_description} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
        </div>
        <div>
          <label htmlFor="nit_link" className="block text-sm font-medium text-gray-700">News Link</label>
          <input type="text" name="nit_link" id="nit_link" value={formData.nit_link} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>
        </div>

        <h2 className="text-xl font-semibold mt-6 mb-2">News Details</h2>
        <div>
          <label htmlFor="nid_author" className="block text-sm font-medium text-gray-700">Author</label>
          <input type="text" name="nid_author" id="nid_author" value={formData.nit_details.nid_author || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>
        </div>
        <p className="text-sm text-gray-500">Note: nid_contentBlocks and nid_relatedLinks will require more complex UI for nested data.</p>


        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mt-2">{success}</p>}

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Update News
        </button>
      </form>
    </div>
  );
}