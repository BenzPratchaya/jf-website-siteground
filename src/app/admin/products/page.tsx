// src/app/admin/products/page.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaEye, FaTrash, FaPen } from 'react-icons/fa'; // Import FaTimes if not already

// Import the new ProductDetailsModal component
import ProductDetailsModal from '@/components/Product/ProductDetailsModal';// Adjust path if necessary

interface Product {
  _id: string;
  pdt_id: string;
  pdt_name: string;
  pdt_image: string; // Product Image URL
  pdt_description: string;
  pdt_link: string;
  pdt_partnerId: string;
  pdt_categoryId: string;
  pdt_details: {
    // Ensuring pdd_sectionsContent type is consistent with ProductDetailsModalProps
    pdd_sectionsContent?: {
        pds_title?: string;
        pds_type: 'paragraph' | 'list' | 'image' | 'grid' | 'heading';
        pds_content?: string;
        pds_items?: string[];
        pds_grid?: { title: string; items: string[] }[];
        pds_level?: 'h2' | 'h3';
    }[];
    pdd_category: string;
    pdd_client: string;
    pdd_projectDate: string;
    pdd_projectUrl: string;
    pdd_longDescription: string;
  };
}

export default function AdminProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showProductDetailsModal, setShowProductDetailsModal] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const router = useRouter();
  const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${apiBaseUrl}/api/products`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      } else if (res.status === 401 || res.status === 403) {
        router.push('/auth/login');
      } else {
        const data = await res.json();
        setError(data.message || 'Failed to fetch products.');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('An unexpected error occurred while fetching products.');
    } finally {
      setLoading(false);
    }
  }, [router, apiBaseUrl]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (pdt_id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const res = await fetch(`${apiBaseUrl}/api/products/${pdt_id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (res.ok) {
        setProducts(products.filter(product => product.pdt_id !== pdt_id));
      } else if (res.status === 401 || res.status === 403) {
        router.push('/auth/login');
      } else {
        const data = await res.json();
        setError(data.message || 'Failed to delete product.');
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('An unexpected error occurred while deleting product.');
    }
  };

  // Function to open the modal
  const handleViewDetailsClick = (product: Product) => {
    setSelectedProductForModal(product);
    setShowProductDetailsModal(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowProductDetailsModal(false);
    setSelectedProductForModal(null); // Clear selected product data
  };


  if (loading) {
    return <div className="text-center mt-10">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl">Product Management</h1>
        <Link 
          href="/admin/products/create" 
          className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
        >
          + Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">No products found. Add a new product to get started!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">ID</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Product Name</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Product Image</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Partner ID</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Category ID</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4 text-sm text-gray-800">{product.pdt_id}</td>
                  <td className="py-2 px-4 text-sm text-gray-800">{product.pdt_name}</td>
                  <td className="py-2 px-4 text-sm">
                    {product.pdt_image && (
                      <Image
                        width={64}
                        height={64}
                        src={product.pdt_image}
                        alt={product.pdt_name}
                        className="w-16 h-16 object-cover rounded"
                        onError={(e) => {
                          (e.target as HTMLImageElement).onerror = null;
                          (e.target as HTMLImageElement).src = '/images/placeholder.png'; // แสดงรูป placeholder หากมี error
                        }}
                      />
                    )}
                    {!product.pdt_image && (
                      <span className="text-gray-500">No Image</span>
                    )}
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-800">{product.pdt_partnerId}</td>
                  <td className="py-2 px-4 text-sm text-gray-800">{product.pdt_categoryId}</td>
                  <td className="py-2 px-4 text-sm whitespace-nowrap">
                    {/* View Details Button - now opens modal */}
                    <button
                      onClick={() => handleViewDetailsClick(product)}
                      className="inline-flex items-center justify-center p-2 rounded-md bg-gray-600 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200 mr-2"
                      title="View Details"
                    >
                      <FaEye className="text-lg" />
                    </button>
                    {/* Edit Button */}
                    <Link
                      href={`/admin/products/${product.pdt_id}/edit`} // ใช้ pdt_id ใน URL
                      className="inline-flex items-center justify-center p-2 rounded-md bg-yellow-600 text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200"
                      title="Edit Product"
                    >
                      <FaPen className="text-lg" />
                    </Link>
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(product.pdt_id)} // ใช้ pdt_id ในการลบ
                      className="inline-flex items-center justify-center p-2 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 ml-2"
                      title="Delete Product"
                    >
                      <FaTrash className="text-lg" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Product Details Modal */}
      {showProductDetailsModal && selectedProductForModal && (
        <ProductDetailsModal
          product={selectedProductForModal}
          onClose={handleCloseModal}
          // apiBaseUrl={apiBaseUrl} // No longer needed if Cloudinary URLs are full
        />
      )}
    </div>
  );
}