// src/data/products.ts

export type ProductDetailSection = {
  pds_title?: string;
  pds_type: 'paragraph' | 'image' | 'heading' | 'list'; // ประเภทของบล็อกเนื้อหา
  pds_content?: string; // สำหรับ type 'paragraph' หรือ 'heading'
  pds_items?: string[]; // สำหรับ type 'list' or list inside gridItems
  pds_grid?: { title: string; items: string[] }[]; // สำหรับ type 'grid'
  pds_level?: 'h2' | 'h3'; // สำหรับ type 'heading' (ระดับของหัวข้อ)
};

export type ProductDetails = {
  pdd_sectionsContent?: ProductDetailSection[]; // ส่วนรายละเอียดเพิ่มเติมแบบยืดหยุ่น
  pdd_category: string;
  pdd_client: string;
  pdd_projectDate: string;
  pdd_projectUrl: string;
  pdd_longDescription: string;
};

export type ProductType = {
  pdt_id: string; // The URL slug (e.g., 'ge-oec-c-arm')
  pdt_name: string;
  pdt_image: string; // รูปภาพหลักของสินค้า (สำหรับหน้า Products List)
  pdt_description: string; // คำอธิบายสั้นๆ (สำหรับหน้า Products List)
  pdt_link: string; // Full URL path (e.g., '/products/ge-oec-c-arm')
  pdt_details: ProductDetails; // details is REQUIRED and typed as ProductDetails
  pdt_partnerId: string; // Partner ID for filtering
  pdt_categoryId: string; // Category ID
};

export type PartnerType = {
    pnt_id: string;
    pnt_name: string; 
    pnt_logo: string;
};

export type CategoryType = {
    cgt_id: string;
    cgt_name: string; 
};

export const products: ProductType[] = [
  {
    pdt_id: 'ge-oec-c-arm',
    pdt_name: 'GE C-Arm',
    pdt_image: '/images/products/2-GE-C ARM.jpg',
    pdt_description: 'ระบบเอกซเรย์ดิจิทัลคุณภาพสูง.',
    pdt_link: '/products/ge-oec-c-arm',
    pdt_details: {
      pdd_sectionsContent: [
        { pds_type: 'paragraph', pds_content: 'ภาพรวมระบบ DR ปฏิวัติการถ่ายภาพเอกซเรย์...' },
      ],
      pdd_category: 'เครื่องเอกซเรย์ดิจิทัล',
      pdd_client: 'โรงพยาบาลทั่วไป',
      pdd_projectDate: '15 พฤษภาคม 2568',
      pdd_projectUrl: 'https://www.example.com',
      pdd_longDescription: 'GE OEC C-Arm',
    },
    pdt_partnerId: 'ge',
    pdt_categoryId: 'healthcare',
  },
  {
    pdt_id: 'vinno-ultimus-9v',
    pdt_name: 'VINNO Ultimus 9V',
    pdt_image: '/images/products/3-Vinno-9V.jpg',
    pdt_description: 'เทคโนโลยีอัลตราซาวด์.',
    pdt_link: '/products/vinno-ultimus-9v',
    pdt_details: {
      pdd_sectionsContent: [],
      pdd_category: 'เครื่องสแกน CT',
      pdd_client: 'โรงพยาบาลเอกชน',
      pdd_projectDate: '10 เมษายน 2568',
      pdd_projectUrl: 'https://www.example.com',
      pdd_longDescription: 'Vinno Ultimus 9V เป็นเครื่องอัลตราซาวด์ประสิทธิภาพสูง',
    },
    pdt_partnerId: 'vinno',
    pdt_categoryId: 'healthcare',
  },
];

export const partners: PartnerType[] = [
    { pnt_id: 'fujifilm', pnt_name: 'Fujifilm', pnt_logo: '/images/logos_partner/fujifilm_logo.png' },
    { pnt_id: 'mbits', pnt_name: 'Mbits', pnt_logo: '/images/logos_partner/mbits_logo.png' },
    { pnt_id: 'mindray', pnt_name: 'Mindray', pnt_logo: '/images/logos_partner/mindray_logo.png' },
    { pnt_id: 'samsung', pnt_name: 'Samsung', pnt_logo: '/images/logos_partner/samsung_logo.png' },
    { pnt_id: 'synapse', pnt_name: 'Synapse', pnt_logo: '/images/logos_partner/synapse_logo.png' },
    { pnt_id: 'vieworks', pnt_name: 'Vieworks', pnt_logo: '/images/logos_partner/vieworks_logo.png' },
    { pnt_id: 'vinno', pnt_name: 'Vinno', pnt_logo: '/images/logos_partner/vinno_logo.png' }, 
    { pnt_id: 'ge', pnt_name: 'Ge', pnt_logo: '/images/logos_partner/ge_logo.png' },
    { pnt_id: 'poskom', pnt_name: 'Poskom', pnt_logo: '/images/logos_partner/poskom_logo.png' },
    { pnt_id: 'urit', pnt_name: 'Urit', pnt_logo: '/images/logos_partner/urit_logo.png' },
];

export const categories: CategoryType[] = [
    { cgt_id: 'healthcare', cgt_name: 'Health Care' },
    { cgt_id: 'vaterinary', cgt_name: 'Vaterinary' },
    { cgt_id: 'solutions', cgt_name: 'Solutions' },
];