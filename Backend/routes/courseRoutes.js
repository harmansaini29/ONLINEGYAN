const express = require('express');
const router = express.Router();
const { getAllCourses, getCourseDetails, createCourse } = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// --- MULTER SETUP ---
// Ensure 'uploads' directory exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Save to 'uploads' folder
    },
    filename: function (req, file, cb) {
        // Create unique filename: video-123456789.mp4
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Routes
router.get('/', getAllCourses); 
router.get('/:id', getCourseDetails); 

// NEW: Upload Middleware attached to POST
// We accept 2 files: 'thumbnail' and 'video' (for the intro lesson)
router.post('/', authMiddleware, upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'video', maxCount: 1 }]), createCourse); 

module.exports = router;