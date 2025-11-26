import express from 'express';
import * as voucherController from '../controllers/voucher.controller.js';

const router = express.Router();

/**
 * Public voucher routes
 */

// Validate voucher
router.post('/validate', voucherController.validateVoucher);

// Get public vouchers
router.get('/public', voucherController.getPublicVouchers);

export default router;