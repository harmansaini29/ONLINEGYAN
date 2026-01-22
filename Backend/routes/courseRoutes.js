const express = require('express');
const router = express.Router();
// ✅ Import deleteCourse
const { getAllCourses, getCourseDetails, createCourse, addLesson, deleteCourse } = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// --- MULTER SETUP ---
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Routes
router.get('/', getAllCourses); 
router.get('/:id', getCourseDetails); 

// Create Course (Thumbnail + Intro Video)
router.post('/', authMiddleware, upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'video', maxCount: 1 }]), createCourse); 

// Add Lesson (Video Only)
router.post('/lesson', authMiddleware, upload.fields([{ name: 'video', maxCount: 1 }]), addLesson);

// ✅ Delete Course Route (NEW)
router.delete('/:id', authMiddleware, deleteCourse);

module.exports = router;