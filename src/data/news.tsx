// src/data/news.ts

export type NewsContentBlock = { // Type สำหรับ Content Block
  ncb_title?: string; // ชื่อหัวข้อ (สำหรับ type 'heading')
  ncb_type: 'paragraph' | 'image' | 'heading' | 'list'; // ประเภทของบล็อกเนื้อหา
  ncb_content?: string; // สำหรับ type 'paragraph' หรือ 'heading'
  ncb_image?: string; // สำหรับ type 'image' (Path ของรูปภาพ)
  ncb_items?: string[]; // สำหรับ type 'list'
  ncb_level?: 'h2' | 'h3'; // สำหรับ type 'heading' (ระดับของหัวข้อ)
};

export type NewsItemDetails = {
  nid_contentBlocks: NewsContentBlock[]; // รายการของ Content Block ที่ประกอบด้วยเนื้อหาของข่าว
  nid_author?: string; // ชื่อผู้เขียนข่าว
};

export type NewsItemType = { // Type สำหรับข่าวแต่ละรายการ
  nit_id: string; // รหัสข่าว (เช่น 'news1', 'news2', ...)
  nit_image: string; // รูปภาพหลักของข่าว (สำหรับหน้า List)
  nit_category: string; // เช่น 'JF', 'Event', 'Upnit_date'
  nit_date: string; // เช่น '23 JUNE 2025'
  nit_title: string; // ชื่อข่าว (สำหรับหน้า List)
  nit_description: string; // คำอธิบายสั้นๆ
  nit_link: string; // ลิงก์ไปยังหน้ารายละเอียดข่าว (เช่น '/news/news1')
  nit_details: NewsItemDetails; // รายละเอียดของข่าวที่ประกอบด้วย Content Block
};