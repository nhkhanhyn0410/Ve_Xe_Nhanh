import express from 'express';
import * as tripController from '../controllers/trip.controller.js';

const router = express.Router();

/**
 * Trip Routes (Public)
 * /api/v1/trips
 *
 * These routes are public for customers to search and view trips
 */

// Search trips
router.get('/search', tripController.search);

// Get trip detail (public)
router.get('/:id', tripController.getPublicTripDetail);

// Get dynamic price for a trip
router.get('/:id/dynamic-price', tripController.getDynamicPrice);

export default router;