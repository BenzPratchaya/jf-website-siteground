// src/components/Product/ProductDetailsModal.tsx
'use client'; // This component needs to be a client component because it handles UI interactions (closing modal) and state.

import React from 'react';
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';

// Re-using ProductDetailSection type (you might need to ensure this is imported or defined if src/data/products is not directly accessible)
interface ProductDetailSection {
  pds_title?: string;
  pds_type: 'paragraph' | 'list' | 'image' | 'grid' | 'heading';
  pds_content?: string;
  pds_items?: string[];
  pds_grid?: { title: string; items: string[] }[];
  pds_level?: 'h2' | 'h3';
}

// Define the Product interface specific to what the modal expects (or import your existing one if it matches)
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
    pdd_sectionsContent?: ProductDetailSection[];
    pdd_category: string;
    pdd_client: string;
    pdd_projectDate: string;
    pdd_projectUrl: string;
    pdd_longDescription: string;
  };
}

interface ProductDetailsModalProps {
  product: Product;
  onClose: () => void;
  // apiBaseUrl: string; // Removed, as image URLs from Cloudinary are usually full URLs
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ product, onClose }) => {

    // Re-using the rendering logic from src/app/products/[productId]/page.tsx
    const renderDetailSection = (section: ProductDetailSection, index: number) => {
        switch (section.pds_type) {
            case 'paragraph':
                return (
                    <p key={index} className="text-gray-700 leading-relaxed mb-4">
                        {section.pds_content && <span dangerouslySetInnerHTML={{ __html: section.pds_content }} />}
                    </p>
                );
            case 'list':
                return (
                    <div key={index} className="mb-4">
                        {section.pds_title && <h4 className="text-lg font-semibold text-gray-800 mb-2">{section.pds_title}</h4>}
                        {section.pds_items && section.pds_items.length > 0 && (
                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                                {section.pds_items.map((item, itemIndex) => (
                                    <li key={itemIndex} dangerouslySetInnerHTML={{ __html: item }}></li>
                                ))}
                            </ul>
                        )}
                    </div>
                );
            case 'image':
                return (
                    <div key={index} className="mb-6 text-center">
                        {section.pds_title && <h4 className="text-lg font-semibold text-gray-800 mb-2">{section.pds_title}</h4>}
                        {section.pds_content && ( // pds_content is used for image URL
                            <Image
                                src={section.pds_content}
                                alt={section.pds_title || `Product image ${index}`}
                                width={1000} // Adjust based on your design needs
                                height={750} // Adjust based on your design needs
                                className="mx-auto rounded-lg shadow-md object-contain"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).onerror = null;
                                  (e.target as HTMLImageElement).src = '/images/placeholder.png';
                                }}
                            />
                        )}
                    </div>
                );
            case 'grid':
                return (
                    <div key={index} className="mb-6">
                        {section.pds_title && <h3 className="text-xl font-bold text-gray-900 mb-4">{section.pds_title}</h3>}
                        {section.pds_grid && section.pds_grid.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {section.pds_grid.map((gridItem, gridItemIndex) => (
                                    <div key={gridItemIndex} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                                        <h4 className="text-lg font-semibold text-gray-800 mb-2">{gridItem.title}</h4>
                                        {gridItem.items && gridItem.items.length > 0 && (
                                            <ul className="list-disc list-inside text-gray-600 space-y-1">
                                                {gridItem.items.map((item, subItemIndex) => (
                                                    <li key={subItemIndex} dangerouslySetInnerHTML={{ __html: item }}></li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            case 'heading':
                const HeadingTag = section.pds_level === 'h2' ? 'h2' : 'h3';
                const headingClass = section.pds_level === 'h2' ? 'text-2xl font-bold text-gray-900 mb-4' : 'text-xl font-semibold text-gray-800 mb-3';
                return (
                    <HeadingTag key={index} className={`${headingClass}`}>
                        {section.pds_title}
                    </HeadingTag>
                );
            default:
                return null;
        }
    };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
          title="Close"
        >
          <FaTimes />
        </button>

        <h2 className="text-3xl font-bold mb-4 text-gray-900">{product.pdt_name}</h2>
        <p className="text-lg text-gray-700 mb-6">{product.pdt_description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-6">
          {/* Product Image */}
          <div>
            {product.pdt_image && (
              <Image
                src={product.pdt_image}
                alt={product.pdt_name}
                width={800}
                height={600}
                className="max-w-full h-auto object-contain rounded-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).onerror = null;
                  (e.target as HTMLImageElement).src = '/images/placeholder.png';
                }}
              />
            )}
          </div>

          {/* Project Information & Long Description */}
          <div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Project Information</h3>
              <ul className="text-gray-700 text-base space-y-2">
                <li><strong>Category:</strong> {product.pdt_details.pdd_category}</li>
                <li><strong>Client:</strong> {product.pdt_details.pdd_client}</li>
                <li><strong>Project date:</strong> {product.pdt_details.pdd_projectDate}</li>
                <li><strong>Project URL:</strong> <a href={product.pdt_details.pdd_projectUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{product.pdt_details.pdd_projectUrl.replace(/(^\w+:|^)\/\//, '')}</a></li>
              </ul>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg text-blue-800 font-medium">
              <p>This is an example of portfolio detail</p>
              <p className="text-sm mt-2">
                {product.pdt_details.pdd_longDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Full Content Sections */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">Full Details Content</h3>
          {product.pdt_details.pdd_sectionsContent && product.pdt_details.pdd_sectionsContent.length > 0 ? (
            product.pdt_details.pdd_sectionsContent.map((section, index) => (
              renderDetailSection(section, index)
            ))
          ) : (
            <p className="text-gray-500">No additional content sections available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;