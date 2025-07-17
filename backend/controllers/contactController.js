// backend/controllers/contactController.js

// อาจจะใช้ Nodemailer สำหรับส่งอีเมล
// const nodemailer = require('nodemailer'); 

export const submitContactForm = async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // **ในอนาคต:**
        // 1. บันทึกข้อมูลลง Database (สร้าง ContactFormModel)
        // 2. ส่งอีเมล (ใช้ Nodemailer)
        // 3. เชื่อมต่อกับบริการ CRM

        console.log(`Contact form received from ${name} (${email}): Subject: ${subject}, Message: "${message}"`);

        // ตัวอย่างการตอบกลับ
        res.status(200).json({ message: 'Message received successfully! We will get back to you shortly.' });
    } catch (error) {
        console.error('Error processing contact form:', error);
        res.status(500).json({ message: 'Failed to process your message.', error: error.message });
    }
};