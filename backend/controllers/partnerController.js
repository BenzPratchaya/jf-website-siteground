// backend/controllers/partnerController.js

import Partner from '../models/Partner.js'; 

// @desc    Get all partners
// @route   GET /api/partners
// @access  Public
export const getAllPartners = async (req, res) => {
    try {
        const partners = await Partner.find({});
        res.json(partners);
    } catch (error) {
        console.error('Error in getAllPartners:', error);
        res.status(500).json({ message: 'Error fetching partners', error: error.message });
    }
};