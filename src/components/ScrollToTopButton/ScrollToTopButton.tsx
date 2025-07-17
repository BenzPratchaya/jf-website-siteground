// components/ScrollToTopButton/ScrollToTopButton.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion'; // อนิเมชั่นสำหรับปุ่มเลื่อนขึ้น

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    // ฟังก์ชันสำหรับเลื่อนหน้าไปยังด้านบน ใช้ window.scrollTo เพื่อเลื่อนหน้าไปยังตำแหน่งบนสุด
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleScroll = () => {
    // ตรวจสอบตำแหน่งการเลื่อนหน้า ถ้าเลื่อนลงมามากกว่า 300px ให้แสดงปุ่ม
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    // ตรวจสอบการเลื่อนหน้าเมื่อโหลดคอมโพเนนต์
    window.addEventListener('scroll', handleScroll);

    return () => { 
      // ลบ event listener เมื่อคอมโพเนนต์ถูก unmount
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="fixed bottom-6 right-6 bg-blue-900 text-white p-3 rounded-full shadow-lg hover:bg-blue-800 transition-colors duration-300 z-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaArrowUp className="text-xl" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;