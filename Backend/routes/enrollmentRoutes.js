const express = require('express');
const router = express.Router();
const { enrollInCourse, checkEnrollment, getMyCourses, markLessonComplete } = require('../controllers/enrollmentController');
const authMiddleware = require('../middleware/authMiddleware');

// Enrollment Routes
router.post('/', authMiddleware, enrollInCourse); // Buy Course
router.get('/my-courses', authMiddleware, getMyCourses); // List My Courses
router.get('/check/:courseId', authMiddleware, checkEnrollment); // Check Status
router.post('/complete', authMiddleware, markLessonComplete); // Mark Lesson Complete (NEW)

module.exports = router;