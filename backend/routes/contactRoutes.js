// backend/routes/contactRoutes.js

import express from 'express';
const router = express.Router();
import * as contactController from '../controllers/contactController.js';

router.post('/', contactController.submitContactForm); // POST /api/contact

export default router;