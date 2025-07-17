// backend/routes/productRoutes.js
import express from 'express';
import multer from 'multer';
// import path from 'path';
// import { fileURLToPath } from 'url'; // *** เพิ่ม: สำหรับ __dirname ใน ES Modules ***
// import { dirname } from 'path';      // *** เพิ่ม: สำหรับ __dirname ใน ES Modules ***
import { 
  getAllProducts, 
  getProductById, 
  createProduct, 
  updateProduct,  
  deleteProduct   
} from '../controllers/productController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// *** แก้ไข: เปลี่ยนไปใช้ memoryStorage() แทน diskStorage ***
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

router.route('/')
  .get(getAllProducts)
  // 'productImage' คือชื่อ field ใน FormData ที่ Frontend ส่งไฟล์มา
  .post(protect, authorizeRoles('admin', 'superadmin'), upload.single('productImage'), createProduct);

router.route('/:id') 
  .get(getProductById) 
  // หากต้องการให้ updateProduct รองรับการเปลี่ยนรูปภาพ
  .put(protect, authorizeRoles('admin', 'superadmin'), upload.single('productImage'), updateProduct) 
  .delete(protect, authorizeRoles('admin', 'superadmin'), deleteProduct); 

export default router;