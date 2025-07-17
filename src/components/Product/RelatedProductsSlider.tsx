// components/Product/RelatedProductsSlider.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation'; // Navigation (ลูกศร)
import 'swiper/css/pagination'; // Pagination (จุด)
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { ProductType } from '@/data/products';

interface RelatedProductsSliderProps {
  products: ProductType[]; // รับ array ของสินค้าที่เกี่ยวข้องเข้ามา
}

const RelatedProductsSlider = ({ products }: RelatedProductsSliderProps) => {
  return (
    <div className="mt-16 pt-8 border-t border-gray-200">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">Other related products</h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-600">There are no other related products at this time.</p>
      ) : (
        <Swiper
          // Modules ที่จะใช้
          modules={[Navigation, Pagination, A11y]}
          // จำนวนสไลด์ที่แสดงพร้อมกัน
          slidesPerView={1} // Default: 1 สไลด์ต่อการดูบนหน้าจอที่เล็กที่สุด
          spaceBetween={20} // ช่องว่างระหว่างสไลด์
          // การตั้งค่า breakpoints สำหรับ responsive design
          // เมื่อหน้าจอมีขนาดต่างกัน จะเปลี่ยนจำนวนสไล
          breakpoints={{
            640: { // เมื่อหน้าต่าง width >= 640px (sm breakpoint)
              slidesPerView: 2,
              spaceBetween: 30,
            },
            768: { // เมื่อหน้าต่าง width >= 768px (md breakpoint)
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: { // เมื่อหน้าต่าง width >= 1024px (lg breakpoint)
              slidesPerView: 4, // 4 สไลด์บนหน้าจอที่ใหญ่ขึ้น
              spaceBetween: 40,
            },
          }}
          navigation // เปิด navigation arrows
          pagination={{ clickable: true }} // เปิด pagination dots
          // loop={true} // ถ้าต้องการให้สไลด์วนกลับไปเริ่มต้นใหม่
          className="mySwiper pb-10" // กำหนด className สำหรับ Swiper
        >
          {products.map((p, idx) => (
            <SwiperSlide key={p.pdt_id || idx}> {/* ใช้ p.id เป็น key */}
              <Link href={p.pdt_link} className="block group">
                <div className="bg-white mb-10 rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:scale-105 flex flex-col h-full">
                  <div className="relative w-full flex justify-center items-center p-4">
                    <Image
                      src={p.pdt_image}
                      alt={p.pdt_name}
                      width={200}
                      height={200} 
                      className="max-w-xs h-auto object-contain mx-auto"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">
                      {p.pdt_name}
                    </h3>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default RelatedProductsSlider;