// backend/models/Category.js

import mongoose from 'mongoose';

// --- Category Schema ---
// ใช้สำหรับเก็บข้อมูลหมวดหมู่ เช่น รหัสชื่อ (slug) และชื่อหมวดหมู่
const CategorySchema = new mongoose.Schema({
  cgt_id:   { type: String, required: true, unique: true }, // ใช้เป็น slug
  cgt_name: { type: String, required: true },
},{ timestamps: true });

export default mongoose.model('Category', CategorySchema);