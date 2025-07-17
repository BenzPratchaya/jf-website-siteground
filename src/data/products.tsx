// src/data/products.ts

// --- Definition of ProductDetailSection ---
export type ProductDetailSection = {
  pds_title?: string;
  pds_type: 'paragraph' | 'list' | 'image' | 'grid' | 'heading'; 
  pds_content?: string; // สำหรับ type 'paragraph' หรือ 'heading'
  pds_items?: string[]; // สำหรับ type 'list' or list inside gridItems
  pds_grid?: { title: string; items: string[] }[]; // สำหรับ type 'grid'
  pds_level?: 'h2' | 'h3'; // สำหรับ type 'heading' (ระดับของหัวข้อ)
};

// --- Definition of ProductDetails ---
export type ProductDetails = {
  pdd_sectionsContent?: ProductDetailSection[]; // ส่วนรายละเอียดเพิ่มเติมแบบยืดหยุ่น
  pdd_category: string;
  pdd_client: string;
  pdd_projectDate: string;
  pdd_projectUrl: string;
  pdd_longDescription: string;
};

// --- Definition of ProductType ---
export type ProductType = {
  filter(arg0: (p: unknown) => unknown): unknown;
  pdt_id: string; // The URL slug (e.g., 'ge-oec-c-arm')
  pdt_name: string;
  pdt_image: string; // รูปภาพหลักของสินค้า (สำหรับหน้า Products List)
  pdt_description: string; // คำอธิบายสั้นๆ (สำหรับหน้า Products List)
  pdt_link: string; // Full URL path (e.g., '/products/ge-oec-c-arm')
  pdt_details: ProductDetails; // details is REQUIRED and typed as ProductDetails
  pdt_partnerId: string; // Partner ID for filtering
  pdt_categoryId: string; // Category ID
};

// --- Definition of PartnerType ---
export type PartnerType = {
    pnt_id: string;
    pnt_name: string; 
    pnt_logo: string;
};

// --- Definition of CategoryType ---
export type CategoryType = {
    cgt_id: string;
    cgt_name: string; 
};