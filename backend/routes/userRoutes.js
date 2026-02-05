import express from 'express';
const router = express.Router();
import { authUser, registerUser, getUserProfile, updateUserProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

// Public routes
router.post('/login', authUser);
router.post('/', registerUser);

// Protected routes
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

export default router;

