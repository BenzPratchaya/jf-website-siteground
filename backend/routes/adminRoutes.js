// backend/routes/adminRoutes.js

import express from 'express';
import { 
  authAdmin, 
  registerAdmin, 
  logoutAdmin,
  getAdminProfile,
  getAdmins,
  getAdminsPublic,
  getAdminById,
  updateAdmin,
  deleteAdmin
} from '../controllers/adminController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public Routes
router.post('/login', authAdmin); // สำหรับการ Login
router.post('/logout', logoutAdmin); // สำหรับการ Logout

// Private Routes (ต้องการ JWT Token)
// Route สำหรับการลงทะเบียน Admin ใหม่ (ควรทำครั้งแรกโดยปลดล็อก protect ชั่วคราว)
// router.post('/register', registerAdmin); 
// เมื่อมี superadmin คนแรกแล้ว ให้ใช้บรรทัดนี้เพื่อป้องกัน
router.post('/register', protect, authorizeRoles('superadmin'), registerAdmin); 

router.get('/profile', protect, getAdminProfile); // ดึงข้อมูลโปรไฟล์ Admin ที่ Login อยู่

// Admin Management Routes (ต้องเป็น Superadmin เท่านั้น)
// สำหรับจัดการ Admin Users
router.route('/all').get(protect, authorizeRoles('superadmin'), getAdmins); // GET all admins
router.get('/all/public', getAdminsPublic); // GET all admins (Public, ไม่ต้องการ JWT)
router.route('/:id') // ใช้ _id เป็น parameter
  .get(protect, authorizeRoles('superadmin'), getAdminById) // GET single admin by _id
  .put(protect, authorizeRoles('superadmin'), updateAdmin)    // UPDATE admin by _id
  .delete(protect, authorizeRoles('superadmin'), deleteAdmin); // DELETE admin by _id


export default router;