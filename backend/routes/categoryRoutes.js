// backend/routes/categoryRoutes.js

import express from 'express';
const router = express.Router();
import * as categoryController from '../controllers/categoryController.js';

router.get('/', categoryController.getAllCategories); // GET /api/categories

export default router;