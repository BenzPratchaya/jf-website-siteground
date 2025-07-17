// backend/controllers/productController.js

import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';
// import fs from 'fs';   // *** เพิ่ม: Import fs module สำหรับจัดการไฟล์ ***
// import path from 'path'; // *** เพิ่ม: Import path module สำหรับจัดการ Path ***
// import { fileURLToPath } from 'url'; // *** เพิ่ม: สำหรับ __dirname ใน ES Modules ***
// import { dirname } from 'path';      // *** เพิ่ม: สำหรับ __dirname ใน ES Modules ***

// *** เพิ่ม: Import Cloudinary SDK ***
import { v2 as cloudinary } from 'cloudinary'; 

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

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

// @desc    Get single product by ID (pdt_id)
// @route   GET /api/products/:id
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ pdt_id: req.params.id }); 

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    try {
        const pdt_details = JSON.parse(req.body.pdt_details); 
        let imageUrl = ''; 

        if (req.file) { 
            // *** แก้ไข: ใช้ req.file.buffer โดยตรง ***
            const result = await cloudinary.uploader.upload(
                `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`, 
                {
                    folder: 'uploads/products', 
                    public_id: req.body.pdt_id, 
                    overwrite: true 
                }
            );
            imageUrl = result.secure_url; 
        }

        const newProduct = new Product({
            pdt_id: req.body.pdt_id,
            pdt_name: req.body.pdt_name,
            pdt_image: imageUrl, 
            pdt_description: req.body.pdt_description,
            pdt_link: req.body.pdt_link,
            pdt_partnerId: req.body.pdt_partnerId,
            pdt_categoryId: req.body.pdt_categoryId,
            pdt_details: pdt_details,
        }); 
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error('Error in createProduct:', error);
        if (req.file && imageUrl) { 
            deleteImageFromCloudinary(imageUrl);
        }

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        if (error.code === 11000) { 
            return res.status(400).json({ message: 'Product with this ID already exists.' });
        }
        throw error; 
    }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
    try {
        let productDataToUpdate = { ...req.body }; // Create a mutable copy of req.body, contains all text fields from FormData

        // 1. Manually parse pdt_details from string to object
        //    This is crucial because FormData sends complex objects as stringified JSON.
        if (productDataToUpdate.pdt_details && typeof productDataToUpdate.pdt_details === 'string') {
            try {
                productDataToUpdate.pdt_details = JSON.parse(productDataToUpdate.pdt_details);
            } catch (parseError) {
                console.error('Error parsing pdt_details JSON in updateProduct:', parseError);
                return res.status(400).json({ message: 'Invalid pdt_details format.', error: parseError.message });
            }
        }

        // 2. Handle pdt_image:
        if (req.file) {
            // Case A: อัปโหลดไฟล์รูปภาพใหม่แล้ว อัปโหลดไปยัง Cloudinary
            const result = await cloudinary.uploader.upload(
                `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
                { folder: 'jf-website-products' } // ตัวเลือก: ระบุโฟลเดอร์
            );
            productDataToUpdate.pdt_image = result.secure_url; // Save the new Cloudinary URL
        } else if (productDataToUpdate.pdt_image === '') {
            // Case B: ไม่มีไฟล์ใหม่ และส่วนหน้าส่งสตริงว่างอย่างชัดเจน (ผู้ใช้ล้างรูปภาพที่มีอยู่)
            // `productDataToUpdate` (from `req.body`) จะมี `pdt_image: ''` อยู่แล้ว ไม่ต้องเปลี่ยนแปลงอะไร
            // กรณีนี้จัดการการลบภาพที่มีอยู่จาก DB
        } else {
            // Case C: ไม่มีไฟล์ใหม่ และรูปภาพไม่ได้ถูกล้างอย่างชัดเจน
            // `productDataToUpdate.pdt_image` is `undefined` (เพราะว่า frontend จะไม่ส่งมันมาถ้าไม่มีการเปลี่ยนแปลง)
            // เราตรวจสอบให้แน่ใจว่าไม่ได้ตั้งค่าเป็น 'undefined' เพื่อรักษาค่าที่มีอยู่ใน DB
            delete productDataToUpdate.pdt_image;
        }

        const updatedProduct = await Product.findOneAndUpdate(
            { pdt_id: req.params.id }, // Find by our custom 'pdt_id' slug
            productDataToUpdate, // Use the parsed and image-handled data
            { new: true, runValidators: true } // `new` returns updated doc, `runValidators` ensures validation on update
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(updatedProduct); // Send updated product data
    } catch (error) {
        console.error('Error in updateProduct:', error);
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        if (error.code === 11000) { // Duplicate key error
            return res.status(400).json({ message: 'Product with this ID already exists.' });
        }
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};

// @desc    Delete a product by ID (pdt_id)
// @route   DELETE /api/products/:id
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ pdt_id: req.params.id }); 

  if (product) {
    if (product.pdt_image) {
        await deleteImageFromCloudinary(product.pdt_image);
    } else {
        console.log(`DEBUG: No image path found in DB for product: ${product.pdt_id}, skipping file deletion.`);
    }
    await Product.deleteOne({ _id: product._id });
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export { 
  getAllProducts,
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct 
};