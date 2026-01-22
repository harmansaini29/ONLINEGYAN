const express = require('express');
const router = express.Router();
// Import ALL controllers
const { register, login, getMe, socialLogin } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Define Routes
router.post('/register', register);
router.post('/login', login);
router.post('/social-login', socialLogin); // <--- New Route for Social Buttons
router.get('/me', authMiddleware, getMe);  // <--- New Route for Wallet Balance

module.exports = router;