import express from 'express';
import { param } from 'express-validator';
import * as userController from '../controllers/user.controller.js';
import * as ticketController from '../controllers/ticket.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { uploadAvatar, handleUploadError } from '../middleware/upload.middleware.js';
import {
  validateUpdateProfile,
  validateChangePassword,
} from '../middleware/validate.middleware.js';

const router = express.Router();

/**
 * User Routes
 * Base path: /api/v1/users
 * All routes require authentication
 */

// Apply authentication to all routes
router.use(authenticate);

// Profile routes
router.get('/profile', userController.getProfile);
router.put('/profile', validateUpdateProfile, userController.updateProfile);

// Avatar routes
router.post('/avatar', uploadAvatar, handleUploadError, userController.uploadAvatar);
router.delete('/avatar', userController.deleteAvatar);

// Password management
router.put('/change-password', validateChangePassword, userController.changePassword);

// Saved passengers routes
router.post('/saved-passengers', userController.addSavedPassenger);
router.delete('/saved-passengers/:passengerId', userController.removeSavedPassenger);

// Loyalty points routes
router.get('/points-history', userController.getPointsHistory);
router.get('/loyalty/history', userController.getLoyaltyHistory);
router.get('/loyalty/overview', userController.getLoyaltyOverview);
router.post('/loyalty/redeem', userController.redeemPoints);

// ============================================================================
// UC-8: Ticket Management Routes
// ============================================================================

/**
 * Get customer tickets with filtering
 * GET /api/v1/users/tickets
 * Query params:
 * - type: upcoming | past | cancelled
 * - status: valid | used | cancelled | expired
 * - search: search by ticket/booking code
 * - fromDate, toDate: date range filter
 * - page, limit: pagination
 */
router.get('/tickets', ticketController.getCustomerTickets);

/**
 * Get ticket details by ID
 * GET /api/v1/users/tickets/:id
 */
router.get(
  '/tickets/:id',
  [param('id').isMongoId().withMessage('Ticket ID không hợp lệ')],
  ticketController.getTicketById
);

/**
 * Download ticket PDF
 * GET /api/v1/users/tickets/:id/download
 */
router.get(
  '/tickets/:id/download',
  [param('id').isMongoId().withMessage('Ticket ID không hợp lệ')],
  ticketController.downloadTicket
);

/**
 * Resend ticket notifications
 * POST /api/v1/users/tickets/:id/resend
 */
router.post(
  '/tickets/:id/resend',
  [param('id').isMongoId().withMessage('Ticket ID không hợp lệ')],
  ticketController.resendTicket
);

/**
 * Cancel ticket
 * POST /api/v1/users/tickets/:id/cancel
 * Note: Cancellation logic should check refund policy
 */
router.post(
  '/tickets/:id/cancel',
  [param('id').isMongoId().withMessage('Ticket ID không hợp lệ')],
  ticketController.cancelTicket
);

export default router;