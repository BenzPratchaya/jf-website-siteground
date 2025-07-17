// backend/controllers/categoryController.js

import Category from '../models/Category.js'; 

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.json(categories);
    } catch (error) {
        console.error('Error in getAllCategories:', error);
        res.status(500).json({ message: 'Error fetching categories', error: error.message });
    }
};