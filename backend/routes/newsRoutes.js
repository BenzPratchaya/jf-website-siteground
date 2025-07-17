// backend/routes/newsRoutes.js

import express from 'express';
import multer from 'multer'; // *** เพิ่ม: Import multer ***
// import path from 'path';     // *** เพิ่ม: Import path สำหรับจัดการ Path ไฟล์ ***
// import { fileURLToPath } from 'url'; // *** เพิ่ม: สำหรับ __dirname ใน ES Modules ***
// import { dirname } from 'path';      // *** เพิ่ม: สำหรับ __dirname ใน ES Modules ***

import { 
  getNews, 
  getNewsById, 
  createNews, 
  updateNews,  
  deleteNews   
} from '../controllers/newsController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// *** แก้ไข: ใช้ memoryStorage() แทน diskStorage ***
// Multer จะเก็บไฟล์ใน RAM ชั่วคราวใน req.file.buffer
const storage = multer.memoryStorage(); 

// กำหนด Filter สำหรับชนิดไฟล์ (อนุญาตเฉพาะรูปภาพ)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// สร้าง Multer instance พร้อมการตั้งค่า
const upload = multer({ 
  storage: storage, // ใช้ memoryStorage ที่นี่!
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 10 } // จำกัดขนาดไฟล์ 10MB
});

// Routes สำหรับ News
router.route('/')
  .get(getNews) 
  // POST /api/news (สร้างข่าวใหม่พร้อมอัปโหลดรูปภาพ)
  // 'newsImage' คือชื่อ field ใน FormData ที่ Frontend จะส่งไฟล์มา
  .post(protect, authorizeRoles('admin', 'superadmin'), upload.single('newsImage'), createNews);

router.route('/:id') // ใช้ :id เป็น parameter (ซึ่งจะรับค่า nit_id)
  .get(getNewsById) 
  // PUT /api/news/:id (อัปเดตข่าวและรูปภาพ)
  .put(protect, authorizeRoles('admin', 'superadmin'), upload.single('newsImage'), updateNews) 
  .delete(protect, authorizeRoles('admin', 'superadmin'), deleteNews); 

export default router;