import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Admin from '../models/Admin.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // ตรวจสอบว่ามี accessToken ใน cookie หรือไม่
  token = req.cookies.accessToken;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.admin = await Admin.findById(decoded.userId).select('-password');
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        // ถ้า Access Token หมดอายุ ลองใช้ Refresh Token
        const refreshToken = req.cookies.refreshToken;
        if (refreshToken) {
          try {
            const decodedRefresh = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            const admin = await Admin.findById(decodedRefresh.userId).select('-password');

            if (admin) {
              // สร้าง Access Token ใหม่
              const newAccessToken = jwt.sign({ userId: admin._id }, process.env.JWT_SECRET, {
                expiresIn: '1h',
              });

              res.cookie('accessToken', newAccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                sameSite: 'strict',
                maxAge: 60 * 60 * 1000, // 1 ชั่วโมง
              });
              req.admin = admin;
              next();
            } else {
              res.status(401);
              throw new Error('Not authorized, refresh token failed');
            }
          } catch (refreshError) {
            res.status(401);
            throw new Error('Not authorized, refresh token failed');
          }
        } else {
          res.status(401);
          throw new Error('Not authorized, no refresh token');
        }
      } else {
        res.status(401);
        throw new Error('Not authorized, token failed');
      }
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.admin.role)) {
      res.status(403);
      throw new Error(`Admin with role ${req.admin.role} is not authorized to access this resource`);
    }
    next();
  };
};

export { protect, authorizeRoles };