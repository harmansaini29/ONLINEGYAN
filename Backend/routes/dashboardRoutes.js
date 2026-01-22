const express = require('express');
const router = express.Router();
const { getInstructorStats } = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/authMiddleware');

// Protected Route (Requires Login)
router.get('/instructor-stats', authMiddleware, getInstructorStats);

module.exports = router;