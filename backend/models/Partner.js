// backend/models/Partner.js

import mongoose from 'mongoose';

// --- Partner Schema ---
// ใช้สำหรับเก็บข้อมูลพันธมิตร เช่น รหัสชื่อ โลโก้
const PartnerSchema = new mongoose.Schema({
  pnt_id:   { type: String, required: true, unique: true }, // ใช้เป็น slug
  pnt_name: { type: String, required: true },
  pnt_logo: { type: String, required: true }, // Path รูปโลโก้
}, { timestamps: true });

export default mongoose.model('Partner', PartnerSchema);