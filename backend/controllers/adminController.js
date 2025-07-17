// backend/controllers/adminController.js

import asyncHandler from 'express-async-handler';
import Admin from '../models/Admin.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth admin & get token (Login)
// @route   POST /api/admin/login
// @access  Public
const authAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });

  if (admin && (await admin.matchPassword(password))) {
    generateToken(res, admin._id); 

    res.json({
      _id: admin._id,
      username: admin.username,
      role: admin.role,
    });
  } else {
    res.status(401);
    throw new Error('Invalid username or password');
  }
});

// @desc    Register a new admin user
// @route   POST /api/admin/register
// @access  Private (เฉพาะ Superadmin เท่านั้น)
const registerAdmin = asyncHandler(async (req, res) => {
  const { username, password, role } = req.body;

  const adminExists = await Admin.findOne({ username });

  if (adminExists) {
    res.status(400);
    throw new Error('Admin already exists');
  }

  const admin = await Admin.create({
    username,
    password,
    role,
  });

  if (admin) {
    res.status(201).json({
      _id: admin._id,
      username: admin.username,
      role: admin.role,
    });
  } else {
    res.status(400);
    throw new Error('Invalid admin data');
  }
});

// @desc    Logout admin / clear cookie
// @route   POST /api/admin/logout
// @access  Public
const logoutAdmin = (req, res) => {
  res.cookie('accessToken', '', {
    httpOnly: true,
    expires: new Date(0), // กำหนดให้ cookie หมดอายุทันที
  });
  res.cookie('refreshToken', '', {
    httpOnly: true,
    expires: new Date(0), // กำหนดให้ cookie หมดอายุทันที
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get logged in admin user profile
// @route   GET /api/admin/profile
// @access  Private
const getAdminProfile = asyncHandler(async (req, res) => {
    // req.admin ถูกตั้งค่าโดย protect middleware
    if (req.admin) {
        res.json({
            _id: req.admin._id,
            username: req.admin.username,
            role: req.admin.role,
        });
    } else {
        res.status(404);
        throw new Error('Admin user not found');
    }
});

// @desc    Get all admin users
// @route   GET /api/admin/all
// @access  Private/Superadmin
const getAdmins = asyncHandler(async (req, res) => {
  const admins = await Admin.find({}).select('-password'); // ไม่ส่ง password กลับไปด้วย
  res.json(admins);
});

// @desc    Get all admin users (Public)
// @route   GET /api/admin/all/public
// @access  Public
const getAdminsPublic = asyncHandler(async (req, res) => {
  const admins = await Admin.find({}).select('-password'); // ไม่ส่ง password กลับไปด้วย
  res.json(admins);
});

// @desc    Get admin user by ID
// @route   GET /api/admin/:id
// @access  Private/Superadmin
const getAdminById = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.params.id).select('-password');
  if (admin) {
    res.json(admin);
  } else {
    res.status(404);
    throw new Error('Admin user not found');
  }
});

// @desc    Update admin user
// @route   PUT /api/admin/:id
// @access  Private/Superadmin
const updateAdmin = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.params.id);

  if (admin) {
    admin.username = req.body.username || admin.username;
    admin.role = req.body.role || admin.role;

    // สามารถเพิ่ม logic สำหรับเปลี่ยน password ได้ที่นี่ หากมี
    // เช่น if (req.body.password) { admin.password = req.body.password; }

    const updatedAdmin = await admin.save();
    res.json({
      _id: updatedAdmin._id,
      username: updatedAdmin.username,
      role: updatedAdmin.role,
    });
  } else {
    res.status(404);
    throw new Error('Admin user not found');
  }
});

// @desc    Delete admin user
// @route   DELETE /api/admin/:id
// @access  Private/Superadmin
const deleteAdmin = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.params.id);

  if (admin) {
    // ป้องกันการลบ superadmin คนสุดท้าย
    if (admin.role === 'superadmin' && (await Admin.countDocuments({ role: 'superadmin' })) === 1) {
        res.status(400);
        throw new Error('Cannot delete the last superadmin.');
    }
    await Admin.deleteOne({ _id: admin._id });
    res.json({ message: 'Admin user removed' });
  } else {
    res.status(404);
    throw new Error('Admin user not found');
  }
});

export { 
  authAdmin, 
  registerAdmin, 
  logoutAdmin,
  getAdminProfile, 
  getAdmins,
  getAdminsPublic,
  getAdminById,
  updateAdmin,
  deleteAdmin
};