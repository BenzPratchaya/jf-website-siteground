// backend/config/db.js

import mongoose from 'mongoose'; // ใช้ mongoose สำหรับการเชื่อมต่อกับ MongoDB

// เชื่อมต่อกับ MongoDB โดยใช้ Mongoose
// ฟังก์ชันนี้จะถูกเรียกใช้ในไฟล์ server.js เพื่อเชื่อมต่อกับฐานข้อมูล
// ถ้าไม่สามารถเชื่อมต่อได้ จะมีการแสดงข้อความผิดพลาด
const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI;

        if (!mongoUri) {
            console.error('Error: MONGO_URI is not defined in .env file!');
            process.exit(1); // ออกจากการทำงานของ Process ถ้าไม่มี MONGO_URI
        }

        const conn = await mongoose.connect(mongoUri);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // ออกจากการทำงานของ Process เมื่อเชื่อมต่อล้มเหลว
    }
};

export default connectDB;