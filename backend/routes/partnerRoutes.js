// backend/routes/partnerRoutes.js

import express from 'express';
const router = express.Router();
import * as partnerController from '../controllers/partnerController.js';

router.get('/', partnerController.getAllPartners); // GET /api/partners

export default router;