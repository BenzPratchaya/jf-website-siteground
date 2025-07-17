// backend/controllers/newsController.js

import asyncHandler from 'express-async-handler';
import News from '../models/News.js';
// import fs from 'fs';   // *** เพิ่ม: Import fs module สำหรับจัดการไฟล์ ***
// import path from 'path'; // *** เพิ่ม: Import path module สำหรับจัดการ Path ***
// import { fileURLToPath } from 'url'; // *** เพิ่ม: สำหรับ __dirname ใน ES Modules ***
// import { dirname } from 'path';      // *** เพิ่ม: สำหรับ __dirname ใน ES Modules ***

import { v2 as cloudinary } from 'cloudinary'; // *** เพิ่ม: Import Cloudinary SDK ***

// *** กำหนดค่า Cloudinary (สำคัญมาก!) ***
// ค่าเหล่านี้จะถูกดึงมาจาก Environment Variables ใน Production (Render)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper function to delete image from Cloudinary (สำหรับ News)
const deleteImageFromCloudinary = async (imageUrl) => {
    if (imageUrl && imageUrl.startsWith('http') && imageUrl.includes('res.cloudinary.com')) { 
        // *** แก้ไข: ปรับ Logic ในการ Extract public_id ให้ถูกต้อง ***
        const urlParts = imageUrl.split('/');
        const uploadIndex = urlParts.indexOf('upload'); // หา index ของ 'upload' ใน URL Path

        let publicId = '';
        if (uploadIndex > -1 && urlParts.length > uploadIndex + 1) {
            // ถ้า URL มี version number (เช่น /v1234567890/...)
            // public ID จะอยู่หลังจาก 'upload/' และเลข version
            const pathAfterUpload = urlParts.slice(uploadIndex + 1).join('/'); // เช่น v1234567890/uploads/news/news7.jpg
            const versionIndex = pathAfterUpload.indexOf('/'); // หา index ของ '/' หลังเลข version
            if (versionIndex > -1) {
                // publicId คือส่วนที่เหลือหลังจาก version number และก่อนนามสกุลไฟล์
                publicId = pathAfterUpload.substring(versionIndex + 1).split('.')[0]; // เช่น uploads/news/news7
            } else { // ไม่มี version number (กรณีใช้ Eager transformations)
                publicId = pathAfterUpload.split('.')[0];
            }
        }

        if (publicId) {
            try {
                // ใช้ publicId ที่ Extract มาได้โดยตรง
                const result = await cloudinary.uploader.destroy(publicId); 
                console.log(`Cloudinary image deleted: ${publicId}`, result);
            } catch (error) {
                console.error(`Error deleting Cloudinary image: ${publicId}`, error);
            }
        } else {
            console.log(`Could not extract public_id from Cloudinary URL: ${imageUrl}`);
        }
    } else {
        console.log(`Not a Cloudinary URL or no valid URL found to delete: ${imageUrl}`);
    }
};


// @desc    Get all news items
// @route   GET /api/news
// @access  Public
const getNews = asyncHandler(async (req, res) => {
    const news = await News.find({});
    res.json(news);
});

// @desc    Get single news item by ID (nit_id)
// @route   GET /api/news/:id
const getNewsById = asyncHandler(async (req, res) => {
  const newsItem = await News.findOne({ nit_id: req.params.id }); 

  if (newsItem) {
    res.json(newsItem);
  } else {
    res.status(404);
    throw new Error('News item not found');
  }
});

// @desc    Create a news item
// @route   POST /api/news
// @access  Private/Admin
const createNews = asyncHandler(async (req, res) => {
    try {
        const nit_details = JSON.parse(req.body.nit_details); 
        let imageUrl = ''; // จะเก็บ URL จาก Cloudinary

        // *** อัปโหลดไฟล์ไป Cloudinary ***
        if (req.file) { 
            const result = await cloudinary.uploader.upload(
                `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`, 
                {
                    folder: 'uploads/news', // Folder ใน Cloudinary ที่จะเก็บรูปภาพข่าวสาร
                    public_id: req.body.nit_id, // ตั้งชื่อ public_id ตาม nit_id
                    overwrite: true // ถ้ามีชื่อเดียวกันให้อัปโหลดทับ
                }
            );
            imageUrl = result.secure_url; // URL ของรูปภาพที่อัปโหลดบน Cloudinary
        }

        const newNewsItem = new News({
            nit_id: req.body.nit_id,
            nit_image: imageUrl, // Path จาก Cloudinary
            nit_category: req.body.nit_category,
            nit_date: req.body.nit_date,
            nit_title: req.body.nit_title,
            nit_description: req.body.nit_description,
            nit_link: req.body.nit_link,
            nit_details: nit_details,
        }); 
        const savedNewsItem = await newNewsItem.save();
        res.status(201).json(savedNewsItem);
    } catch (error) {
        console.error('Error in createNews:', error);
        // หากเกิด Error ระหว่างการบันทึกข้อมูลลง DB แต่ไฟล์ถูกอัปโหลดไปแล้ว ควรลบไฟล์นั้นทิ้งจาก Cloudinary
        if (req.file && imageUrl) { // ถ้ามี imageUrl แสดงว่าอัปโหลด Cloudinary สำเร็จไปแล้ว
            deleteImageFromCloudinary(imageUrl);
        }

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        if (error.code === 11000) { 
            return res.status(400).json({ message: 'News item with this ID already exists.' });
        }
        throw error; 
    }
});


// @desc    Update a news item by ID (nit_id)
// @route   PUT /api/news/:id
const updateNews = asyncHandler(async (req, res) => {
  console.log('DEBUG: News update request received.'); // Log สำหรับ Debug
  console.log('DEBUG: req.body:', req.body);
  console.log('DEBUG: req.file:', req.file);

  const newsItem = await News.findOne({ nit_id: req.params.id }); 

  if (newsItem) {
    let newImageUrl = newsItem.nit_image; // เก็บ URL รูปภาพเดิมไว้ก่อน

    // ถ้ามีไฟล์ใหม่ถูกอัปโหลดมา (req.file)
    if (req.file) {
        // ถ้ามีรูปภาพเก่าอยู่แล้วใน DB ให้ลบรูปภาพเก่าจาก Cloudinary ก่อน
        if (newsItem.nit_image) {
            await deleteImageFromCloudinary(newsItem.nit_image); 
        }
        // อัปโหลดรูปภาพใหม่ไป Cloudinary
        const result = await cloudinary.uploader.upload(
            `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
            {
                folder: 'uploads/news', 
                public_id: req.body.nit_id, 
                overwrite: true
            }
        );
        newImageUrl = result.secure_url;
    } else if (req.body.nit_image !== undefined && req.body.nit_image === '') { 
        // ถ้า Frontend ส่ง nit_image เป็นค่าว่าง (หมายถึงต้องการลบรูปภาพ)
        if (newsItem.nit_image) {
            await deleteImageFromCloudinary(newsItem.nit_image); 
        }
        newImageUrl = ''; 
    }

    // *** เพิ่ม Log เพื่อตรวจสอบค่าก่อน save ***
    console.log('DEBUG: Before save - newsItem.nit_image in model:', newsItem.nit_image);
    console.log('DEBUG: Before save - newImageUrl calculated:', newImageUrl);

    newsItem.nit_id = req.body.nit_id || newsItem.nit_id;
    newsItem.nit_category = req.body.nit_category || newsItem.nit_category;
    newsItem.nit_date = req.body.nit_date || newsItem.nit_date;
    newsItem.nit_title = req.body.nit_title || newsItem.nit_title;
    newsItem.nit_description = req.body.nit_description || newsItem.nit_description;
    newsItem.nit_link = req.body.nit_link || newsItem.nit_link;
    newsItem.nit_image = newImageUrl; // อัปเดต Path ของรูปภาพใหม่ (จาก Cloudinary)

    if (req.body.nit_details) {
        const nid_details_parsed = typeof req.body.nit_details === 'string' ? JSON.parse(req.body.nit_details) : req.body.nit_details;
        newsItem.nit_details.nid_author = nid_details_parsed.nid_author || newsItem.nit_details.nid_author;
    }

    const updatedNewsItem = await newsItem.save(); 
    console.log('DEBUG: After save - updatedNewsItem.nit_image:', updatedNewsItem.nit_image); // Log เพื่อ Debug

    res.json(updatedNewsItem);
  } else {
    res.status(404);
    throw new Error('News item not found');
  }
});

// @desc    Delete a news item by ID (nit_id)
// @route   DELETE /api/news/:id
const deleteNews = asyncHandler(async (req, res) => {
  const newsItem = await News.findOne({ nit_id: req.params.id }); 

  if (newsItem) {
    if (newsItem.nit_image) {
        await deleteImageFromCloudinary(newsItem.nit_image);
    } else {
        console.log(`DEBUG: No image path found in DB for news item: ${newsItem.nit_id}, skipping file deletion.`);
    }
    await News.deleteOne({ _id: newsItem._id });
    res.json({ message: 'News item removed' });
  } else {
    res.status(404);
    throw new Error('News item not found');
  }
});

export { 
  getNews, 
  getNewsById, 
  createNews, 
  updateNews, 
  deleteNews 
};