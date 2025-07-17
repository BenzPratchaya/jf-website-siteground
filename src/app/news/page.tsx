// src/app/news/page.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import { Footer } from '@/components/Footer/Footer';
import { NewsItemType } from '../../../backend/data/news';

export default function NewsPage() {
  // ใช้ useState เพื่อเก็บข้อมูลหน้าและจำนวนข่าวต่อหน้า**
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; 
  // ใช้ useState เพื่อเก็บข้อมูลข่าวสารทั้งหมด**
  const [allNewsItems, setAllNewsItems] = useState<NewsItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // สร้าง ref สำหรับ news grid container**
  const newsGridRef = useRef<HTMLDivElement>(null); 
  const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

  // useEffect สำหรับ Fetch Data จาก Backend**
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${apiBaseUrl}/api/news`); // const res = await fetch(`${apiBaseUrl}/api/news`, { cache: 'no-store' }); 
        if (!res.ok) {
          throw new Error(`Failed to fetch news: ${res.statusText}`);
        }
        const data: NewsItemType[] = await res.json();
        setAllNewsItems(data);
      } catch (err: unknown) {
        console.error("Error fetching news:", err);
        setError("Failed to load news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [apiBaseUrl]); // Effect นี้จะทำงานแค่ครั้งเดียวเมื่อ Component Mount


  // คำนวณ Index ของข่าวที่จะแสดงในหน้าปัจจุบัน (ใช้ allNewsItems)
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNewsItems = allNewsItems.slice(indexOfFirstItem, indexOfLastItem);

  // คำนวณจำนวนหน้าทั้งหมด (ใช้ allNewsItems)
  const totalPages = Math.ceil(allNewsItems.length / itemsPerPage);

  // ฟังก์ชันสำหรับเปลี่ยนหน้าไปยังหน้าก่อนหน้า ใช้ setCurrentPage เพื่อเปลี่ยนหน้า**
  const goToPreviousPage = () => {
    setCurrentPage(prevPage => Math.max(1, prevPage - 1));
  };

  // ฟังก์ชันสำหรับเปลี่ยนหน้าไปยังหน้าถัดไป ใช้ setCurrentPage เพื่อเปลี่ยนหน้า**
  const goToNextPage = () => {
    setCurrentPage(prevPage => Math.min(totalPages, prevPage + 1));
  };

  // ปรับ useEffect ให้เลื่อนไปที่ newsGridRef**
  useEffect(() => {
    if (newsGridRef.current) { // ตรวจสอบว่า ref มีค่า (element อยู่ใน DOM)
      newsGridRef.current.scrollIntoView({
        behavior: 'smooth', // เลื่อนแบบ Smooth
        block: 'start' // เลื่อนให้ส่วนบนสุดของ element อยู่ที่ส่วนบนสุดของ viewport
      });
    }
  }, [currentPage]); // Effect นี้จะทำงานทุกครั้งที่ currentPage เปลี่ยน

  const partnersBgImageStyle: React.CSSProperties = {
      backgroundImage: "url('/images/hero/hero_bg1.jpg')",
    };

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
          <h1 className="text-4xl font-bold text-gray-800">Loading news...</h1>
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
        {/* ส่วนหัวข้อหน้า News */}
        <section className="container text-center relative py-12 bg-gray-700 bg-cover bg-center bg-fixed text-white" style={partnersBgImageStyle}>
          <h3 className="text-xl font-semibold text-gray-400 mb-2">NEWS & PROJECTS</h3>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-200 mb-4 leading-tight">Our news archive</h1>
        </section>

        {/* ส่วนแสดง Grid ข่าวสาร */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            {allNewsItems.length === 0 ? (
                <p className="text-center text-xl text-gray-600">No news found at this time.</p>
            ) : (
                // กำหนด ref ให้กับ div ที่เป็น Grid Container**
                <div ref={newsGridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
                {currentNewsItems.map((item: NewsItemType) => (
                  <div key={item.nit_id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group transition-transform duration-300 hover:scale-105">
                    {/* รูปข่าวสาร */}
                    <div className="relative w-full h-48 sm:h-40 md:h-48 lg:h-56 overflow-hidden">
                      <Image
                        width={400} 
                        height={200}
                        src={item.nit_image}
                        alt={item.nit_title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300"
                      />
                    </div>

                    {/* เนื้อหาข่าว */}
                    <div className="p-4 flex flex-col flex-grow">
                      <div className="flex justify-between items-center text-xs font-semibold text-gray-500 mb-2">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{item.nit_category}</span>
                        <span>{item.nit_date}</span>
                      </div>
                      
                      <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {item.nit_title}
                      </h2>
                      <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-3">
                        {item.nit_description}
                      </p>
                      
                      <Link href={item.nit_link} className="text-blue-600 font-medium text-sm hover:underline mt-auto">
                        Read more
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
            

            {/* แสดงปุ่มเปลี่ยนหน้าเมื่อมีหลายหน้า */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-4 mt-12">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <span className="text-lg font-medium text-gray-800">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="px-8 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}