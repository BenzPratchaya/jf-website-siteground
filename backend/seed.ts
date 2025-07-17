// backend/seed.ts

import 'dotenv/config'; // สำหรับโหลด Environment Variables
import mongoose from 'mongoose'; // Mongoose สำหรับ MongoDB ODM

// Import Mongoose Models (ต้องเพิ่ม .js ท้ายไฟล์)
import Product from './models/Product.js'; 
import Partner from './models/Partner.js'; 
import Category from './models/Category.js'; 
import News from './models/News.js';

import { products, partners, categories } from '../backend/data/products.js'; 
import { newsItems } from '../backend/data/news.js'


async function seedDatabase() {
    try {
        console.log('Attempting to connect to MongoDB...');
        
        // ตรวจสอบว่า MONGO_URI ถูกกำหนดไว้ใน .env file
        const mongoUri = process.env.MONGO_URI;
        if (!mongoUri) {
            throw new Error('MONGO_URI is not defined in .env file!');
        }
        await mongoose.connect(mongoUri); // เชื่อมต่อกับ MongoDB
        console.log('MongoDB connected successfully for seeding!');

        // --- Clear existing data ---
        console.log('Clearing existing data from collections...');
        await Product.deleteMany({}); // ลบข้อมูล Products ทั้งหมด
        await Partner.deleteMany({}); // ลบข้อมูล Partners ทั้งหมด
        await Category.deleteMany({}); // ลบข้อมูล Categories ทั้งหมด
        await News.deleteMany({}); // ลบข้อมูล News Items ทั้งหมด
        console.log('Old data cleared from all collections.');

        // --- Insert new data ---
        console.log('Starting data insertion...');

        // Insert Products
        try {
            if (products && products.length > 0) {
                const insertedProducts = await Product.insertMany(products);
                console.log(`✅ Successfully inserted ${insertedProducts.length} products.`);
            } else {
                console.warn('⚠️ No products data found to insert.');
            }
        } catch (insertError: unknown) { // ระบุ Type ของ Error เป็น unknown
            let errorMessage = 'An unknown error occurred.';
            if (insertError instanceof Error) { // ตรวจสอบว่าเป็น Error Object เพื่อเข้าถึง .message
                errorMessage = insertError.message;
            }
            console.error('❌ Error inserting products:', errorMessage);
            console.error('Product data that caused error:', products); // แสดงข้อมูลที่พยายามใส่ (เพื่อ Debug)
        }

        // Insert Partners
        try {
            if (partners && partners.length > 0) {
                const insertedPartners = await Partner.insertMany(partners);
                console.log(`✅ Successfully inserted ${insertedPartners.length} partners.`);
            } else {
                console.warn('⚠️ No partners data found to insert.');
            }
        } catch (insertError: unknown) {
            let errorMessage = 'An unknown error occurred.';
            if (insertError instanceof Error) {
                errorMessage = insertError.message;
            }
            console.error('❌ Error inserting partners:', errorMessage);
            console.error('Partner data that caused error:', partners);
        }

        // Insert Categories
        try {
            if (categories && categories.length > 0) {
                const insertedCategories = await Category.insertMany(categories);
                console.log(`✅ Successfully inserted ${insertedCategories.length} categories.`);
            } else {
                console.warn('⚠️ No categories data found to insert.');
            }
        } catch (insertError: unknown) {
            let errorMessage = 'An unknown error occurred.';
            if (insertError instanceof Error) {
                errorMessage = insertError.message;
            }
            console.error('❌ Error inserting categories:', errorMessage);
            console.error('Category data that caused error:', categories);
        }

        // Insert News Items
        try {
            if (newsItems && newsItems.length > 0) {
                const insertedNewsItems = await News.insertMany(newsItems);
                console.log(`✅ Successfully inserted ${insertedNewsItems.length} news items.`);
            } else {
                console.warn('⚠️ No news items data found to insert.');
            }
        } catch (insertError: unknown) {
            let errorMessage = 'An unknown error occurred.';
            if (insertError instanceof Error) {
                errorMessage = insertError.message;
            }
            console.error('❌ Error inserting news items:', errorMessage);
            console.error('News data that caused error:', newsItems);
        }

        console.log('✨ Data seeding process completed.');

    } catch (mainError: unknown) { // ดักจับ Error หลักที่อาจเกิดขึ้น
        let errorMessage = 'An unknown fatal error occurred during seeding process.';
        if (mainError instanceof Error) {
            errorMessage = mainError.message;
        }
        console.error('🔥 Fatal Error during seeding process:', errorMessage);
        console.error(mainError); // แสดง Error object เต็มๆ สำหรับ Debug
    } finally {
        if (mongoose.connection.readyState === 1) { // ตรวจสอบว่าเชื่อมต่ออยู่ก่อนปิด
            await mongoose.connection.close(); // ปิดการเชื่อมต่อ Database
            console.log('MongoDB connection closed.');
        } else {
            console.log('MongoDB connection was not open or already closed.');
        }
    }
}

seedDatabase(); // เรียกใช้ฟังก์ชัน Seeder