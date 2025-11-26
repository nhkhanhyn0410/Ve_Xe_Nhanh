import express from 'express';
import * as reviewController from '../controllers/review.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * Review Routes
 */

// Create review for a booking (Customer only)
router.post(
  '/bookings/:bookingId/review',
  authenticate,
  authorize('customer'),
  reviewController.createReview
);

// Check if can review a booking (Customer only)
router.get(
  '/bookings/:bookingId/can-review',
  authenticate,
  authorize('customer'),
  reviewController.canReview
);

// Send review invitation email (Customer only)
router.post(
  '/bookings/:bookingId/send-review-invitation',
  authenticate,
  authorize('customer'),
  reviewController.sendReviewInvitation
);

// Get reviews for a trip (Public)
router.get('/trips/:tripId/reviews', reviewController.getTripReviews);

// Get reviews for an operator (Public)
router.get('/operators/:operatorId/reviews', reviewController.getOperatorReviews);

// Get my reviews (Customer only)
router.get(
  '/users/my-reviews',
  authenticate,
  authorize('customer'),
  reviewController.getMyReviews
);

// Add operator response to review (Operator only)
router.post(
  '/reviews/:reviewId/response',
  authenticate,
  authorize('operator'),
  reviewController.addOperatorResponse
);

// Report a review (Authenticated users)
router.post(
  '/reviews/:reviewId/report',
  authenticate,
  reviewController.reportReview
);

export default router;