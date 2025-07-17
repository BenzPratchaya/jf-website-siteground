import { output } from "framer-motion/client";
import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // *** เพิ่ม domains นี้เข้ามา ***
        domains: ['localhost'], // อนุญาตให้โหลดรูปภาพจาก localhost
        remotePatterns: [ // ใช้ remotePatterns เพื่อควบคุม host และ protocol
           // Localhost สำหรับ Development
            {
              protocol: 'http', hostname: 'localhost', port: '5000', pathname: '/uploads/**', // สำหรับ Local
            },
            {
              protocol: 'https', 
              hostname: 'jf-website-quho.onrender.com', // *** สำคัญ: ต้องมี Domain นี้ ***
              port: '', 
              pathname: '/uploads/**', 
            },
            {
              protocol: 'https', 
              hostname: 'res.cloudinary.com', // *** สำคัญ: ต้องมี Domain นี้ ***
              port: '', 
              pathname: '/dyo2ntkuw/image/upload/**', 
            },
        ],
    },
    output: 'export', // ใช้สำหรับการสร้าง static export
};

export default nextConfig;
