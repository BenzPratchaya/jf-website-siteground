// backend/models/NewsItem.js

import mongoose from 'mongoose';

// --- NewsContentBlock Schema (Nested Schema) ---
// ใช้สำหรับเก็บข้อมูลส่วนต่างๆ ของเนื้อหาข่าว เช่น ย่อหน้า รายการ รูปภาพ หัวข้อ
const NewsContentBlockSchema = new mongoose.Schema({
  ncb_title: { type: String, required: false }, // ตรงกับ ncb_title
  ncb_type: { type: String, enum: ['paragraph', 'list', 'image', 'heading'], required: true }, // ตรงกับ ncb_type
  ncb_content: { type: String, required: false }, // ตรงกับ ncb_content
  ncb_imageUrl: { type: String, required: false }, // ตรงกับ ncb_imageUrl
  ncb_items: { type: [String], required: false }, // ตรงกับ ncb_items
  ncb_level: { type: String, enum: ['h2', 'h3'], required: false }, // ตรงกับ ncb_level
}, { _id: false }); // ไม่สร้าง _id สำหรับ sub-document block


// --- NewsItemDetails Schema (Nested Schema) ---
// ใช้สำหรับเก็บข้อมูลรายละเอียดของข่าว เช่น บล็อกเนื้อหา ผู้เขียน และลิงก์ที่เกี่ยวข้อง
// ใช้ NewsContentBlockSchema สำหรับ nid_contentBlocks
const NewsItemDetailsSchema = new mongoose.Schema({
  nid_contentBlocks: { type: [NewsContentBlockSchema], required: true }, 
  nid_author: { type: String, required: false }, 
  nid_relatedLinks: { type: [{ text: String, url: String }], required: false }, 
}, { _id: false }); // _id: false สำหรับ Nested Schema


// --- News Schema ---
// ใช้สำหรับเก็บข้อมูลข่าว เช่น รหัสชื่อ รูปภาพ หมวดหมู่ วันที่ ชื่อเรื่อง คำอธิบาย และลิงก์
// รวมถึงรายละเอียดที่เก็บใน NewsItemDetailsSchema
const NewsSchema = new mongoose.Schema({
  nit_id: { type: String, required: true, unique: true }, 
  nit_image: { type: String, required: true }, 
  nit_category: { type: String, required: true }, 
  nit_date: { type: String, required: true }, 
  nit_title: { type: String, required: true }, 
  nit_description: { type: String, required: true }, 
  nit_link: { type: String, required: true }, 
  nit_details: { type: NewsItemDetailsSchema, required: true }, 
}, { timestamps: true });

export default mongoose.model('News', NewsSchema);