// src/app/news/[newsId]/page.tsx

import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image'; 
import Link from 'next/link'; 
import Navbar from '@/components/Navbar/Navbar';
import { Footer } from '@/components/Footer/Footer';
import { NewsItemType, NewsItemDetails, NewsContentBlock } from '@/data/news'; 

const jfLogo = "/images/LOGO-JF.png"; 

const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export async function generateStaticParams() {
   const res = await fetch(`${apiBaseUrl}/api/news` , {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
    const newsItems = await res.json();
  // สร้างพารามิเตอร์สำหรับแต่ละ news item 
  return newsItems.map((newsItem: { nit_id: string }) => ({
    newsId: newsItem.nit_id,
  }));
}

const NewsDetailPage = async ( props : { params: Promise<{ newsId: string }> }) => {
  const params = await props.params;
  const newsId = params.newsId;
  let newsItem: NewsItemType | undefined; // สำหรับข้อมูลข่าวสารชิ้นเดียว
  const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

  try {
    // ดึงข้อมูลข่าวสารชิ้นเดียวจาก Backend**
    const newsRes = await fetch(`${apiBaseUrl}/api/news/${newsId}`);
    if (!newsRes.ok) {
      if (newsRes.status === 404) {
        console.error(`News item not found with ID: ${newsId}`);
        notFound(); // แสดงหน้า 404 ถ้าข่าวไม่พบ
      }
      throw new Error(`Failed to fetch news item ${newsId}: ${newsRes.statusText}`);
    }
    newsItem = await newsRes.json();

  } catch (error: unknown) {
    console.error('Error fetching news data for NewsDetailPage:', error);
    notFound(); // ในกรณีที่ Fetch ล้มเหลว (เช่น Backend Server ไม่ทำงาน), ให้แสดงหน้า notFound
  }

  // ตรวจสอบความถูกต้องของข้อมูลที่ดึงมา
  if (!newsItem || !newsItem.nit_details) { // **KEY CHANGE: ใช้ nit_details**
    notFound(); 
  }

  const newsDetails: NewsItemDetails = newsItem.nit_details; // **KEY CHANGE: ใช้ nit_details**

  // Helper Function สำหรับ Render แต่ละ Content Block
  const renderContentBlock = (block: NewsContentBlock, blockIndex: number) => {
    switch (block.ncb_type) {
      case 'paragraph':
        return (
          <p key={blockIndex} className={`text-gray-700 leading-relaxed mb-4 `}>
            {block.ncb_content && <span dangerouslySetInnerHTML={{ __html: block.ncb_content }} />}
          </p>
        );
      case 'image':
        return (
          <div key={blockIndex} className={`my-6 flex justify-center`}>
            {block.ncb_image && (
              <Image
                src={block.ncb_image}
                alt={newsItem.nit_title}
                width={800}
                height={500}
                className="rounded-lg shadow-md max-w-full h-auto object-cover"
              />
            )}
          </div>
        );
      case 'heading':
        if (block.ncb_level === 'h2') {
          return <h2 key={blockIndex} className={`text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-4`}>{block.ncb_content}</h2>;
        } else if (block.ncb_level === 'h3') {

          return <h3 key={blockIndex} className={`text-xl md:text-2xl font-semibold text-gray-900 mt-6 mb-3`}>{block.ncb_content}</h3>;
        }
        return null;
      case 'list':
        return (
          <ul key={blockIndex} className={`list-disc list-inside space-y-2 text-gray-700 mb-4`}>
            {block.ncb_items?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 py-8 md:py-12 max-w-5xl mx-auto md:pt-20 pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* การนำทางแบบ Breadcrumb */}
          <nav className="text-sm mb-8">
            <ol className="list-none p-0 inline-flex flex-wrap text-gray-600">
              <li className="flex items-center">
                <Link href="/" className="hover:underline text-blue-600">Home</Link>
                <span className="mx-2">/</span>
              </li>
              <li className="flex items-center">
                <Link href="/news" className="hover:underline text-blue-600">News</Link>
                <span className="mx-2">/</span>
              </li>
              <li className="text-gray-800 font-semibold line-clamp-1 max-w-xs sm:max-w-md">
                {newsItem.nit_title}
              </li>
            </ol>
          </nav>

          {/* เนื้อหาข่าวสาร */}
          <div className="bg-white rounded-lg shadow-xl p-6 md:p-10">
            {/* รูปหลัก */}
            <div className="mb-8 flex justify-center">
              <Image
                src={newsItem.nit_image}
                alt={newsItem.nit_title}
                width={1000}
                height={600}
                className="rounded-lg object-cover w-full h-auto max-h-[600px]"
                priority
              />
            </div>

            {/* หัวข้อและข้อมูล (Author/Date/Category) */}
            <h1 className="text-2xl md:text-3xl text-gray-900 mb-4 leading-tight">
              {newsItem.nit_title}
            </h1>
            <div className="flex justify-between items-start text-sm text-gray-500 mb-6 border-b pb-4">
              {/* ฝั่งซ้าย: ผู้เขียน (กับโลโก้) และเวลา */}
              <div className="flex flex-col items-start">
                {newsDetails.nid_author && (
                  <div className="flex items-center gap-2 mb-1">
                    <Image
                      src={jfLogo}
                      alt="JF Advance Med Logo"
                      width={72}
                      height={72}
                      className="rounded-full object-cover"
                    />
                    <span className="text-gray-600 font-medium">{newsDetails.nid_author}</span>
                  </div>
                )}
                <span className="text-gray-500 text-xs md:text-sm">{newsItem.nit_date}</span>
              </div>

              {/* ฝั่งขวา: หมวดหมู่ */}
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold self-start">
                {newsItem.nit_category}
              </span>
            </div>

            {/* เนื้อหาข่าวสาร */}
            <div className="text-gray-700 leading-relaxed">
              {newsDetails.nid_contentBlocks.map((block, index) => (
                renderContentBlock(block, index)
              ))}
            </div>           
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NewsDetailPage;