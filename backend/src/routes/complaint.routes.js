import express from 'express';
import * as complaintController from '../controllers/complaint.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * Complaint Routes (User-facing)
 * /api/v1/complaints
 */

// All routes require authentication
router.use(authenticate);

// User complaint routes
router.post('/', complaintController.createComplaint);
router.get('/', complaintController.getMyComplaints);
router.get('/:id', complaintController.getComplaintById);
router.post('/:id/notes', complaintController.addNote);
router.put('/:id/satisfaction', complaintController.addSatisfactionRating);

export default router;