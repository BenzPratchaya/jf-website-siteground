'use client'; // Client Component

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar/Navbar';
import { Footer } from '@/components/Footer/Footer';
import Product from '@/components/Product/Product';
import { products, partners, categories, ProductType, PartnerType, CategoryType } from '@/data/products'; 

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedPartner, setSelectedPartner] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [displayedPartners, setDisplayedPartners] = useState<PartnerType[]>([]); 

  const [allProducts, setAllProducts] = useState<ProductType[]>([]);
  const [allPartners, setAllPartners] = useState<PartnerType[]>([]);
  const [allCategories, setAllCategories] = useState<CategoryType[]>([]);

  const productsPageBgImageStyle: React.CSSProperties = {
    backgroundImage: "url('/images/hero/hero_bg1.jpg')", 
  };

  useEffect(() => {
    // 1. กำหนดค่าเริ่มต้นจากข้อมูล local
    setAllProducts(products);
    setAllPartners(partners);
    setAllCategories(categories);

    // 2. Logic การกรอง (เหมือนเดิม)
    let currentFilteredProducts: ProductType[] = products;
    const relevantPartnerIds: Set<string> = new Set(); 

    // กรองสินค้าตาม Category
    if (selectedCategory !== '') {
      currentFilteredProducts = currentFilteredProducts.filter(product => product.pdt_categoryId === selectedCategory);
    }

    // ดึง Partner ID ที่เกี่ยวข้อง
    currentFilteredProducts.forEach(product => {
      relevantPartnerIds.add(product.pdt_partnerId);
    });

    // กรองรายชื่อ Partner ที่จะแสดงผล
    const filteredPartnersForDisplay = partners.filter(p => relevantPartnerIds.has(p.pnt_id));
    setDisplayedPartners(filteredPartnersForDisplay);

    // กรองสินค้าอีกครั้งด้วย Partner
    if (selectedPartner !== '') {
      currentFilteredProducts = currentFilteredProducts.filter(product => product.pdt_partnerId === selectedPartner);
    }

    setFilteredProducts(currentFilteredProducts);
    
  }, [selectedCategory, selectedPartner]); // Dependencies ถูกปรับให้สั้นลง
  
  return (
    <>
      <Navbar />
      <main className='md:pt-20 pt-16'>
        {/* ส่วนหัวข้อหน้า Products */}
        <section className="container text-center relative py-12 bg-gray-700 bg-cover bg-center bg-fixed text-white" style={productsPageBgImageStyle}>
          <div className="absolute inset-0 bg-black opacity-50 z-0"></div> 
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-200">Our Products</h1>
            <p className="text-lg text-gray-300 mt-2">JF Med is a manufacturer and suppliers of a wide range of high quality medical, surgical and hospital products. Our products 
            are ISO 9001 and CE certified and we have been recognized as Star Export House by Government of Thailand. We supply our 
            products in more than 80 countries worldwide.</p>
          </div>
        </section>

        {/* ส่วนเลือก Category */}
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Categories</h2>
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
              {/* ปุ่ม "All Categories" */}
              <button
                key="all-categories" 
                onClick={() => {
                  setSelectedCategory(''); 
                  setSelectedPartner(''); 
                }}
                className={`px-6 py-3 rounded-full border-2 transition-all duration-200 hover:scale-110 ease-in-out
                          ${selectedCategory === '' ? 'border-blue-600 shadow-md bg-blue-50 text-blue-800 font-semibold' : 'border-gray-200 hover:border-gray-300 text-gray-700'}`}
              >
                All
              </button>
              {allCategories
                .filter(category => category.cgt_id !== 'all') 
                .map((category: CategoryType) => (
                  <button
                    key={category.cgt_id} 
                    onClick={() => {
                      setSelectedCategory(category.cgt_id);
                      setSelectedPartner(''); 
                    }}
                    className={`px-6 py-3 rounded-full border-2 transition-all duration-200 hover:scale-110 ease-in-out
                              ${selectedCategory === category.cgt_id ? 'border-blue-600 shadow-md bg-blue-50 text-blue-800 font-semibold' : 'border-gray-200 hover:border-gray-300 text-gray-700'}`}
                  >
                    {category.cgt_name}
                  </button>
                ))}
            </div>
          </div>
        </section>

        {/* ส่วนเลือก Partner */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">Filter By Partner</h2>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
              {/* ปุ่ม "All Partners" */}
              <button 
                key="all-partners" 
                onClick={() => setSelectedPartner('')} 
                className={`px-6 py-3 rounded-full border-2 transition-all duration-200 ease-in-out hover:scale-110
                            ${selectedPartner === '' ? 'border-blue-600 shadow-md bg-blue-50 text-blue-800 font-semibold' : 'border-gray-200 hover:border-gray-300 text-gray-700'}`}
              >
                All
              </button>
              {displayedPartners
                .filter(p => p.pnt_id !== 'all') 
                .sort((a, b) => a.pnt_name.localeCompare(b.pnt_name)) 
                .map((partner: PartnerType) => {
                  const isPartnerSelected = selectedPartner === partner.pnt_id;
                  return (
                    <div
                      key={partner.pnt_id} 
                      onClick={() => setSelectedPartner(partner.pnt_id)}
                      className={`cursor-pointer p-3 md:p-4 rounded-lg border-2 transition-all duration-200 ease-in-out hover:scale-110
                                  ${isPartnerSelected ? 'border-blue-600 shadow-2xl bg-blue-50' : 'border-gray-200 hover:border-gray-300'}
                                  w-28 h-28 flex flex-col items-center justify-center text-center overflow-hidden`}
                    >
                      {partner.pnt_logo ? (
                        <Image
                          src={partner.pnt_logo}
                          alt={partner.pnt_name + ' Logo'}
                          width={80} 
                          height={80}
                          className="object-contain"
                        />
                      ) : (
                        <span className="text-sm font-medium text-gray-700">{partner.pnt_name}</span>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </section>

        {/* ส่วนแสดงรายการสินค้า */}
        {filteredProducts.length > 0 ? (
            <Product productsToShow={filteredProducts} />
        ) : (
            <section className="py-12 bg-gray-50 text-center">
                <p className="text-xl text-gray-600">Product Not found</p>
            </section>
        )}
      </main>
      <Footer />
    </>
  );
}