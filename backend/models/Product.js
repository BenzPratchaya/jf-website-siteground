// backend/models/Product.js

import mongoose from 'mongoose'; // ใช้ mongoose สำหรับการสร้าง Schema และโมเดล

// --- ProductDetailSection Schema (Nested Schema) ---
// ใช้สำหรับเก็บข้อมูลส่วนต่างๆ ของรายละเอียดสินค้า เช่น ย่อหน้า รายการ
const ProductDetailSectionSchema = new mongoose.Schema({
  pds_title: { type: String, required: false },
  pds_type: { type: String, enum: ['paragraph', 'list', 'image', 'grid', 'heading'], required: true },
  pds_content: { type: String, required: false },
  pds_items: { type: [String], required: false },
  pds_grid: { type: [{ title: String, items: [String] }], required: false },
  pds_level: { type: String, enum: ['h2', 'h3'], required: false },
});


// --- ProductDetails Schema (Nested Schema) ---
// ใช้สำหรับเก็บข้อมูลรายละเอียดสินค้า เช่น หมวดหมู่ ลูกค้า วันที่โปรเจกต์ URL และคำอธิบายยาว
// รวมถึงส่วนต่างๆ ที่เก็บใน ProductDetailSectionSchema
const ProductDetailsSchema = new mongoose.Schema({
  pdd_sectionsContent: { type: [ProductDetailSectionSchema], required: false },
  pdd_category: { type: String, required: true },
  pdd_client: { type: String, required: true },
  pdd_projectDate: { type: String, required: true },
  pdd_projectUrl: { type: String, required: true },
  pdd_longDescription: { type: String, required: true },
});


// --- Product Schema ---
// ใช้สำหรับเก็บข้อมูลสินค้า เช่น รหัสชื่อ รูปภาพ คำอธิบาย ลิงก์ รายละเอียด และข้อมูลพันธมิตร
// รวมถึงหมวดหมู่ที่เกี่ยวข้อง
const ProductSchema = new mongoose.Schema({
  pdt_id: { type: String, required: true, unique: true },
  pdt_name: { type: String, required: true },
  pdt_image: { type: String, required: true },
  pdt_description: { type: String, required: true },
  pdt_link: { type: String, required: true },
  pdt_details: { type: ProductDetailsSchema, required: true },
  pdt_partnerId: { type: String, required: true },
  pdt_categoryId: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Product', ProductSchema);