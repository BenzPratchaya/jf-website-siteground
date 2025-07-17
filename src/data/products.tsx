// src/data/products.ts

// --- Definition of ProductDetailSection ---
export type ProductDetailSection = {
  pds_title?: string; // สำหรับ type 'grid' หรือ 'heading'
  pds_type: 'paragraph' | 'list' | 'image' | 'grid' | 'heading'; // ประเภทของเนื้อหา
  pds_content?: string; // สำหรับ type 'paragraph' หรือ 'heading'
  pds_items?: string[]; // สำหรับ type 'list' or list inside gridItems
  pds_grid?: { title: string; items: string[] }[]; // สำหรับ type 'grid'
  pds_level?: 'h2' | 'h3'; // สำหรับ type 'heading' (ระดับของหัวข้อ)
};

// --- Definition of ProductDetails ---
export type ProductDetails = {
  pdd_sectionsContent?: ProductDetailSection[]; // ส่วนรายละเอียดเพิ่มเติมแบบยืดหยุ่น
  pdd_category: string; // ประเภทของสินค้า (เช่น 'medical', 'industrial', 'dental')
  pdd_client: string; // ชื่อของลูกค้า
  pdd_projectDate: string; // วันที่ของโครงการ
  pdd_projectUrl: string; // URL ของโครงการ (ถ้ามี)
  pdd_longDescription: string; // คำอธิบายยาวของสินค้า
};

// --- Definition of ProductType ---
export type ProductType = {
  filter(arg0: (p: unknown) => unknown): unknown;
  pdt_id: string; // The URL slug (e.g., 'ge-oec-c-arm')
  pdt_name: string; // ชื่อของสินค้า
  pdt_image: string; // รูปภาพหลักของสินค้า (สำหรับหน้า Products List)
  pdt_description: string; // คำอธิบายสั้นๆ (สำหรับหน้า Products List)
  pdt_link: string; // Full URL path (e.g., '/products/ge-oec-c-arm')
  pdt_details: ProductDetails; // details is REQUIRED and typed as ProductDetails
  pdt_partnerId: string; // Partner ID for filtering
  pdt_categoryId: string; // Category ID
};

// --- Definition of PartnerType ---
export type PartnerType = {
    pnt_id: string; // Partner ID
    pnt_name: string; // ชื่อของ Partner
    pnt_logo: string; // URL ของโลโก้ Partner
};

// --- Definition of CategoryType ---
export type CategoryType = {
    cgt_id: string; // Category ID
    cgt_name: string; // ชื่อของ Category
};