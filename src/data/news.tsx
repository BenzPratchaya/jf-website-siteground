// src/data/news.ts

export type NewsContentBlock = {
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

export type NewsItemType = {
  nit_id: string; // รหัสข่าว (เช่น 'news1', 'news2', ...)
  nit_image: string; // รูปภาพหลักของข่าว (สำหรับหน้า List)
  nit_category: string; // เช่น 'JF', 'Event', 'Upnit_date'
  nit_date: string; // เช่น '23 JUNE 2025'
  nit_title: string; // ชื่อข่าว (สำหรับหน้า List)
  nit_description: string; // คำอธิบายสั้นๆ
  nit_link: string; // ลิงก์ไปยังหน้ารายละเอียดข่าว (เช่น '/news/news1')
  nit_details: NewsItemDetails; // รายละเอียดของข่าวที่ประกอบด้วย Content Block
};

export const newsItems: NewsItemType[] = [
  {
    nit_id: 'news1',
    nit_image: '/images/news/picnews1.jpg',
    nit_category: 'Event',
    nit_date: '23 JUNE 2025',
    nit_title: 'ในหลวง-พระราชินี พระราชทานเครื่องเอกซเรย์เคลื่อนที่พร้อมชุดประมวลผลภาพเอกซเรย์ปอดด้วยระบบปัญญาประดิษฐ์(AI)',
    nit_description: 'ในหลวง-พระราชินี พระราชทานเครื่องเอกซเรย์เคลื่อนที่พร้อมชุดประมวลผลภาพเอกซเรย์ปอดด้วยระบบปัญญาประดิษฐ์(AI) ให้แก่ " รพ.สมุทรสาคร"...',
    nit_link: '/news/news1',
    nit_details: {
      nid_contentBlocks: [
        { ncb_type: 'paragraph', ncb_content: '<strong>23 มิถุนายน 2568</strong> — พระบาทสมเด็จพระเจ้าอยู่หัวและสมเด็จพระนางเจ้าฯ พระบรมราชินี ทรงพระราชทานเครื่องเอกซเรย์เคลื่อนที่พร้อมชุดประมวลผลภาพเอกซเรย์ปอดด้วยระบบปัญญาประดิษฐ์ (AI) แก่โรงพยาบาลสมุทรสาคร...' },
        { ncb_type: 'paragraph', ncb_content: 'บริษัท เจ.เอฟ. แอดวาน เมด จำกัด มีความภาคภูมิใจเป็นอย่างยิ่งที่ได้เป็นส่วนหนึ่งในการติดตั้งเครื่องมือและระบบอันทันสมัยนี้...' },
        { ncb_type: 'image', ncb_image: '/images/news/picnews1_1.jpg' }, 
        { ncb_type: 'paragraph', ncb_content: 'โครงการนี้แสดงถึงพระมหากรุณาธิคุณอันหาที่สุดมิได้ และความมุ่งมั่นของทุกภาคส่วน...' },
        { ncb_type: 'heading', ncb_level: 'h3', ncb_content: 'ความสำคัญของเทคโนโลยีนี้' },
        { ncb_type: 'list', ncb_items: ['การวินิจฉัยรวดเร็วและแม่นยำด้วย AI', 'ลดความเสี่ยงจากการเคลื่อนย้ายผู้ป่วย', 'เพิ่มประสิทธิภาพการทำงานของบุคลากรทางการแพทย์'] },
      ],
      nid_author: 'JF Advance Med',
    },
  },
  {
    nit_id: 'news2',
    nit_image: '/images/news/picnews2.jpg',
    nit_category: 'JF',
    nit_date: '20 JUNE 2025',
    nit_title: 'JF Advance Med ร่วมลงนาม MOU พัฒนาระบบ AI สำหรับโรงพยาบาล',
    nit_description: 'บริษัท เจ.เอฟ. แอดวาน เมด จำกัด ร่วมลงนามบันทึกข้อตกลงความร่วมมือว่าด้วยการพัฒนาระบบปัญญาประดิษฐ์ A.I. Technology สำหรับใช้ในโรงพยาบาล เพื่อยกระดับการวินิจฉัยทางการแพทย์.',
    nit_link: '/news/news2',
    nit_details: {
      nid_contentBlocks: [
        { ncb_type: 'paragraph', ncb_content: '<strong>20 มิถุนายน 2568</strong> — บริษัท เจ.เอฟ. แอดวาน เมด จำกัด ได้ร่วมลงนามบันทึกข้อตกลงความร่วมมือ (MOU) กับคณะแพทยศาสตร์ศิริราชพยาบาล...' },
        { ncb_type: 'image', ncb_image: '/images/news/picnews2_1.jpg' }, 
        { ncb_type: 'paragraph', ncb_content: 'ความร่วมมือนี้มีวัตถุประสงค์เพื่อสร้างองค์ความรู้ แลกเปลี่ยนประสบการณ์...' },
      ],
      nid_author: 'JF Advance Med', 
    }
  },
];