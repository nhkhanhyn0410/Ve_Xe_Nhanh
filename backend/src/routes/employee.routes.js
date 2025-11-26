import express from 'express';
import * as employeeController from '../controllers/employee.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * Employee Routes
 * Base path: /api/v1/employees
 */

// Public routes
/**
 * @route   POST /api/v1/employees/login
 * @desc    Employee login (Trip Manager / Driver)
 * @access  Public
 */
router.post('/login', employeeController.login);

// Protected routes (require authentication)
router.use(authenticate);

/**
 * @route   GET /api/v1/employees/my-trips
 * @desc    Get trips assigned to logged-in employee
 * @access  Private (Employee)
 */
router.get('/my-trips', employeeController.getMyTrips);

/**
 * @route   POST /api/v1/employees/change-password
 * @desc    Change password (self)
 * @access  Private (Employee)
 */
router.post('/change-password', employeeController.changePassword);

export default router;