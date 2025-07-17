// backend/server.js

import 'dotenv/config'; 
import express from 'express'; 
import cors from 'cors';       
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser'; 
import path from 'path';      // *** เพิ่ม: Import path module ***
import { fileURLToPath } from 'url'; // *** เพิ่ม: สำหรับ __dirname ใน ES Modules ***
import { dirname } from 'path';      // *** เพิ่ม: สำหรับ __dirname ใน ES Modules ***

// สำหรับ __dirname ใน ES Modules (เพราะ server.js อยู่ใน backend/ )
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// ตอนนี้ __dirname คือ D:\GitHub\jf-website\backend

// Path ไปยัง Root ของโปรเจกต์ (D:\GitHub\jf-website\)
const projectRoot = path.join(__dirname, '..'); 
// Path ไปยัง Folder uploads ที่ Root ของโปรเจกต์ (D:\GitHub\jf-website\uploads)
const uploadsFolder = path.join(projectRoot, 'uploads');

// Import Routes
import productRoutes from './routes/productRoutes.js';
import partnerRoutes from './routes/partnerRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// *** แก้ไข: กำหนด CORS Origin ให้ดึงจาก Environment Variable ***
const allowedOrigins = [
  'http://localhost:3000', // สำหรับการพัฒนา Local
  process.env.CLIENT_ORIGIN_URL, // URL ของ Frontend ที่ Deploy แล้ว (จาก Vercel/Netlify)
];
// Middleware
app.use(cors({
    origin: function (origin, callback) {
        // อนุญาต Requests ที่ไม่มี Origin (เช่น Mobile Apps, Postman)
        // หรือ Requests จาก Origins ที่อยู่ใน allowedOrigins
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // สำคัญ: เพื่อให้ Cookie ถูกส่งระหว่าง Frontend/Backend
})); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Middleware สำหรับ Log Request (เพื่อ debug)
app.use((req, res, next) => {
    console.log('Request received:', req.method, req.url);
    next();
});

// *** แก้ไข: Serve static files จาก Folder uploads ที่ Root ของโปรเจกต์ ***
// app.use('/uploads', express.static(uploadsFolder)); 

// API Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Backend API!');
});

app.use('/api/products', productRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes); // ใช้ Admin Routes

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});