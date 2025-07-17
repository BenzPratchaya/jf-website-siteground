'use client'; // Client Component

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar/Navbar';
import { Footer } from '@/components/Footer/Footer';
import Product from '@/components/Product/Product';
// Import แค่ Type Definitions จาก src/data/products.ts**
import { ProductType, PartnerType, CategoryType } from '@/data/products'; 

export default function ProductsPage() {
  // State สำหรับการกรองสินค้า ใช้ State เพื่อเก็บค่าที่เลือกจาก Dropdowns
  // เปลี่ยนค่าเริ่มต้นจาก 'all' เป็น '' (empty string) เพื่อเป็นตัวแทนของ "ทั้งหมด"
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedPartner, setSelectedPartner] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [displayedPartners, setDisplayedPartners] = useState<PartnerType[]>([]); 

  // State สำหรับข้อมูลที่ดึงมาจาก Backend**
  const [allProducts, setAllProducts] = useState<ProductType[]>([]);
  const [allPartners, setAllPartners] = useState<PartnerType[]>([]);
  const [allCategories, setAllCategories] = useState<CategoryType[]>([]);

  // State สำหรับ Loading และ Error**
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

  // Style สำหรับ Background Image ของส่วนหัว Products Page
  const productsPageBgImageStyle: React.CSSProperties = {
    backgroundImage: "url('/images/hero/hero_bg1.jpg')", 
  };

  // useEffect สำหรับ Fetch Data จาก Backend**
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch Products
        const productsRes = await fetch(`${apiBaseUrl}/api/products`);
        if (!productsRes.ok) throw new Error(`Failed to fetch products: ${productsRes.statusText}`);
        const productsData: ProductType[] = await productsRes.json();
        setAllProducts(productsData);

        // Fetch Partners
        const partnersRes = await fetch(`${apiBaseUrl}/api/partners`);
        if (!partnersRes.ok) throw new Error(`Failed to fetch partners: ${partnersRes.statusText}`);
        const partnersData: PartnerType[] = await partnersRes.json();
        // ตรวจสอบข้อมูล partner ที่ดึงมา: ใช้ pnt_name สำหรับชื่อ และ _id เป็น key
        console.log('Fetched partners:', partnersData); 
        setAllPartners(partnersData);

        // Fetch Categories
        const categoriesRes = await fetch(`${apiBaseUrl}/api/categories`);
        if (!categoriesRes.ok) throw new Error(`Failed to fetch categories: ${categoriesRes.statusText}`);
        const categoriesData: CategoryType[] = await categoriesRes.json();
        // ตรวจสอบข้อมูล category ที่ดึงมา: ใช้ cgt_name สำหรับชื่อ และ _id เป็น key
        console.log('Fetched categories:', categoriesData); 
        setAllCategories(categoriesData);

      } catch (err) {
        console.error("Error fetching data from backend:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [apiBaseUrl]); // Effect นี้จะทำงานแค่ครั้งเดียวเมื่อ Component Mount

  // useEffect สำหรับ Logic การกรอง (ใช้ allProducts, allPartners, allCategories)**
  useEffect(() => {
    if (loading || error) return; // ไม่กรองถ้ายังโหลดอยู่หรือมี Error

    console.log('Filtering Logic triggered:', { selectedCategory, selectedPartner });
    
    let currentFilteredProducts: ProductType[] = allProducts; // ใช้ allProducts ที่ดึงมา
    const relevantPartnerIds: Set<string> = new Set(); 

    // 1. กรองสินค้าตาม Category ก่อน
    if (selectedCategory !== '') { // ตรวจสอบเป็น empty string แทน 'all'
      currentFilteredProducts = currentFilteredProducts.filter(product => product.pdt_categoryId === selectedCategory);
    }

    // 2. ดึง Partner ID ที่เกี่ยวข้องจากสินค้าที่ถูกกรองแล้ว
    currentFilteredProducts.forEach(product => {
      relevantPartnerIds.add(product.pdt_partnerId);
    });

    // 3. กรองรายชื่อ Partner ที่จะแสดงผล
    // แสดงเฉพาะ Partners ที่มีสินค้าอยู่ในผลลัพธ์การกรอง Category (ไม่รวม 'all' จาก backend)
    const filteredPartnersForDisplay = allPartners.filter(p => relevantPartnerIds.has(p.pnt_id));
    setDisplayedPartners(filteredPartnersForDisplay);

    // 4. กรองสินค้าอีกครั้งด้วย Partner ที่ถูกเลือก (จาก currentFilteredProducts)
    if (selectedPartner !== '') { // ตรวจสอบเป็น empty string แทน 'all'
      currentFilteredProducts = currentFilteredProducts.filter(product => product.pdt_partnerId === selectedPartner);
    }

    setFilteredProducts(currentFilteredProducts);
    console.log('Filtering Result: Filtered products count =', currentFilteredProducts.length);
    
  }, [selectedCategory, selectedPartner, allProducts, allPartners, allCategories, loading, error]); // Dependencies อัปเดต


  // แสดง Loading
  if (loading) {
  return (
    <>
      <Navbar />
      <main className="bg-gray-100 py-24 min-h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          {/* Loading Spinner */}
          <span className="relative flex h-20 w-20 mb-6">
            <span className="relative inline-flex rounded-full h-20 w-20 border-4 border-blue-500 border-t-transparent animate-spin"></span>
          </span>
          <h1 className="text-4xl font-bold text-gray-800">Loading products...</h1>
          <p className="text-lg text-gray-600 mt-4">please wait a moment</p>
        </div>
      </main>
      <Footer />
    </>
  );
  }

  // แสดง Error
  if (error) {
    return (
      <>
        <Navbar />
        <main className="bg-red-100 py-24 text-center min-h-screen">
          <h1 className="text-4xl font-bold text-red-800">An error occurred while loading data.</h1>
          <p className="text-lg text-red-600 mt-4">{error}</p>
          <p className="text-md text-red-500 mt-2">Please check that the Backend Server is running.</p>
        </main>
        <Footer />
      </>
    );
  }


  return (
    <>
      <Navbar />
      <main className='md:pt-20 pt-16'>
        {/* ส่วนหัวข้อหน้า Products - มี Background Image แบบ Fixed */}
        <section className="container text-center relative py-12 bg-gray-700 bg-cover bg-center bg-fixed text-white" style={productsPageBgImageStyle}>
            {/* Overlay สีดำโปร่งแสง (เพื่อให้ข้อความอ่านง่าย) */}
            <div className="absolute inset-0 bg-black opacity-50 z-0"></div> 
            {/* ข้อความอยู่เหนือ Overlay */}
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
              {/* ปุ่ม "All Categories" (เพิ่มด้วยตนเอง ไม่ได้มาจาก Backend) */}
              <button
                key="all-categories" // Key ที่ไม่ซ้ำกัน
                onClick={() => {
                  setSelectedCategory(''); // ตั้งค่าเป็น empty string สำหรับ "ทั้งหมด"
                  setSelectedPartner(''); // รีเซ็ต Partner เป็น empty string เมื่อเปลี่ยน Category
                }}
                className={`px-6 py-3 rounded-full border-2 transition-all duration-200 hover:scale-110 ease-in-out
                          ${selectedCategory === '' ? 'border-blue-600 shadow-md bg-blue-50 text-blue-800 font-semibold' : 'border-gray-200 hover:border-gray-300 text-gray-700'}`}
              >
                All
              </button>
              {allCategories
                .filter(category => category.cgt_id !== 'all') // กรองค่า 'all' ออก หากมีมาจาก Backend
                .map((category: CategoryType) => (
                  <button
                    key={category.cgt_id} // ใช้ _id เป็น key เพื่อความเสถียร
                    onClick={() => {
                      setSelectedCategory(category.cgt_id);
                      setSelectedPartner(''); // รีเซ็ต Partner เป็น empty string เมื่อเลือก Category อื่น
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
              {/* ปุ่ม "All Partners" (เพิ่มด้วยตนเอง ไม่ได้มาจาก Backend) */}
              <button 
                key="all-partners" // Key ที่ไม่ซ้ำกัน
                onClick={() => setSelectedPartner('')} // ตั้งค่าเป็น empty string สำหรับ "ทั้งหมด"
                className={`px-6 py-3 rounded-full border-2 transition-all duration-200 ease-in-out hover:scale-110
                            ${selectedPartner === '' ? 'border-blue-600 shadow-md bg-blue-50 text-blue-800 font-semibold' : 'border-gray-200 hover:border-gray-300 text-gray-700'}`}
              >
                All
              </button>
              {displayedPartners
                .filter(p => p.pnt_id !== 'all') // กรองค่า 'all' ออก หากมีมาจาก Backend
                .sort((a, b) => a.pnt_name.localeCompare(b.pnt_name)) // เรียงลำดับ Partners ตามชื่อ
                .map((partner: PartnerType) => {
                  const isPartnerSelected = selectedPartner === partner.pnt_id;
                  return (
                    <div
                      key={partner.pnt_id} // ใช้ _id เป็น key เพื่อความเสถียร
                      onClick={() => setSelectedPartner(partner.pnt_id)}
                      className={`cursor-pointer p-3 md:p-4 rounded-lg border-2 transition-all duration-200 ease-in-out hover:scale-110
                                  ${isPartnerSelected ? 'border-blue-600 shadow-2xl bg-blue-50' : 'border-gray-200 hover:border-gray-300'}
                                  w-28 h-28 flex flex-col items-center justify-center text-center overflow-hidden`}
                    >
                      {/* แสดงรูปภาพหรือชื่อ ถ้ามี logo ให้แสดงรูป ถ้าไม่มีหรือโหลดไม่ได้ให้แสดงชื่อ */}
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

        {/* ส่วนแสดงรายการสินค้าที่ถูกกรองแล้ว */}
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