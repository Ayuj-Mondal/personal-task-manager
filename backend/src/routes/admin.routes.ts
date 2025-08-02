import express from 'express';
import { adminLogin, getAdminDashboard } from '../controllers/admin.controller';
import { verifyAdminToken } from '../middleware/adminAuth';

const router = express.Router();

// POST /api/admin/login
router.post('/login', adminLogin);

// GET /api/admin/dashboard (protected)
router.get('/dashboard', verifyAdminToken, getAdminDashboard);

export default router;
