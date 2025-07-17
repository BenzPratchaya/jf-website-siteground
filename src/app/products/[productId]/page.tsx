// src/app/products/[productId]/page.tsx

import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/Navbar/Navbar';
import { Footer } from '@/components/Footer/Footer';
import { products, ProductDetails, ProductDetailSection } from '@/data/products'; 
import RelatedProductsSlider from '@/components/Product/RelatedProductsSlider';

export async function generateStaticParams() {
  return products.map((product) => ({
    productId: product.pdt_id,
  }));
}

const ProductDetailPage = async ( props : { params: Promise<{ productId: string }> }) => {
  const params = await props.params;
  const productId = params.productId;

  // ค้นหาสินค้าจากอาร์เรย์ products โดยตรง
  const product = products.find(p => p.pdt_id === productId);

  // ถ้าหาสินค้าไม่พบ ให้แสดงหน้า 404
  if (!product || !product.pdt_details) {
    notFound();
  }

  const productDetails: ProductDetails = product.pdt_details;

  // Function สำหรับ render เนื้อหาแต่ละส่วนของรายละเอียดสินค้า
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
            {section.pds_content && (
              <Image
                src={section.pds_content}
                alt={section.pds_title || `Product image ${index}`}
                width={1000}
                height={750}
                className="mx-auto rounded-lg shadow-md object-contain"
                style={{ maxHeight: '600px' }}
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

  // กรองสินค้าที่เกี่ยวข้อง (ไม่รวมสินค้าปัจจุบัน) จากอาร์เรย์ products
  const relatedProducts = products.filter(p => p.pdt_id !== productId && p.pdt_details);

  return (
    <>
      <Navbar />

      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-xl p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* กล่อง Product Image Section */}
              <div>
                <Image
                  src={product.pdt_image}
                  alt={product.pdt_name}
                  width={800}
                  height={600}
                  className="max-w-full h-auto object-contain rounded-lg"
                  style={{ maxHeight: '500px' }}
                />
              </div>

              {/* กล่อง Product Details Section */}
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                  {product.pdt_name}
                </h1>
                <p className="text-lg text-gray-700 mb-6">
                  {product.pdt_description}
                </p>

                {/* กล่อง Project Information */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Project Information</h3>
                  <ul className="text-gray-700 text-base space-y-2">
                    <li><strong>Category:</strong> {productDetails.pdd_category}</li>
                    <li><strong>Client:</strong> {productDetails.pdd_client}</li>
                    <li><strong>Project date:</strong> {productDetails.pdd_projectDate}</li>
                    <li><strong>Project URL:</strong> <a href={productDetails.pdd_projectUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{productDetails.pdd_projectUrl.replace(/(^\w+:|^)\/\//, '')}</a></li>
                  </ul>
                </div>

                {/* กล่อง Portfolio Detail Description */}
                <div className="bg-blue-100 p-4 rounded-lg text-blue-800 font-medium">
                  <p>This is an example of portfolio detail</p>
                  <p className="text-sm mt-2">
                    {productDetails.pdd_longDescription}
                  </p>
                </div>
              </div>
            </div>

            {/* กล่อง Full Content ที่ใช้ ProductDetailSection */}
            <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Details</h2>
              <div className="text-gray-700 leading-relaxed">
                {productDetails.pdd_sectionsContent && productDetails.pdd_sectionsContent.map((block, index) => (
                  renderDetailSection(block, index)
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* กล่อง Related Products Slider Component */}
        <div className="container mx-auto px-4">
          <RelatedProductsSlider products={relatedProducts} />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProductDetailPage;