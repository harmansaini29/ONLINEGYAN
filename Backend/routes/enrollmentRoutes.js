const express = require('express');
const router = express.Router();
const { enrollInCourse, checkEnrollment, getMyCourses } = require('../controllers/enrollmentController');
const authMiddleware = require('../middleware/authMiddleware');

// All these require login
router.post('/', authMiddleware, enrollInCourse); // POST /api/enrollments (Buy)
router.get('/my-courses', authMiddleware, getMyCourses); // GET /api/enrollments/my-courses
router.get('/check/:courseId', authMiddleware, checkEnrollment); // GET /api/enrollments/check/:id

module.exports = router;