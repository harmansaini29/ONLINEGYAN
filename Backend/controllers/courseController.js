const db = require('../config/db');

// 1. Create Course (Initial Setup)
exports.createCourse = async (req, res) => {
    const { title, category, price, description } = req.body;
    const instructorId = req.user.id;

    // Get File Paths from Multer (if uploaded)
    const thumbnailPath = req.files['thumbnail'] 
        ? `http://localhost:9000/uploads/${req.files['thumbnail'][0].filename}` 
        : "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80";
    
    const videoPath = req.files['video'] 
        ? `http://localhost:9000/uploads/${req.files['video'][0].filename}`
        : "https://www.youtube.com/embed/dQw4w9WgXcQ"; // Fallback

    try {
        // Insert Course
        const [result] = await db.execute(
            `INSERT INTO courses (instructor_id, title, category, price, description, thumbnail, is_published) 
             VALUES (?, ?, ?, ?, ?, ?, true)`,
            [instructorId, title, category, price, description, thumbnailPath]
        );
        
        const courseId = result.insertId;

        // Create Default Module
        const [modResult] = await db.execute(
            'INSERT INTO modules (course_id, title, sort_order) VALUES (?, ?, ?)',
            [courseId, "Introduction", 1]
        );

        // Create First Lesson
        await db.execute(
            'INSERT INTO lessons (module_id, title, video_url, duration, sort_order) VALUES (?, ?, ?, ?, ?)',
            [modResult.insertId, "Welcome to the Course", videoPath, "05:00", 1]
        );

        res.status(201).json({ msg: "Course Created Successfully", courseId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// 2. Add Lesson (NEW FEATURE)
exports.addLesson = async (req, res) => {
    const { courseId, moduleId, title, duration } = req.body;
    
    // Handle video upload if present, else use provided URL
    const videoPath = req.files && req.files['video'] 
        ? `http://localhost:9000/uploads/${req.files['video'][0].filename}`
        : req.body.videoUrl || ""; 

    try {
        // Verify ownership
        const [course] = await db.execute('SELECT instructor_id FROM courses WHERE id = ?', [courseId]);
        if (course.length === 0 || course[0].instructor_id !== req.user.id) {
            return res.status(403).json({ msg: "Not authorized" });
        }

        // Get max sort order to append to end
        const [maxSort] = await db.execute('SELECT MAX(sort_order) as maxOrder FROM lessons WHERE module_id = ?', [moduleId]);
        const nextOrder = (maxSort[0].maxOrder || 0) + 1;

        await db.execute(
            'INSERT INTO lessons (module_id, title, video_url, duration, sort_order) VALUES (?, ?, ?, ?, ?)',
            [moduleId, title, videoPath, duration, nextOrder]
        );

        res.status(201).json({ msg: "Lesson added successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 3. Get All Courses
exports.getAllCourses = async (req, res) => {
    try {
        const [courses] = await db.execute(
            `SELECT c.*, u.name as instructor_name 
             FROM courses c 
             JOIN users u ON c.instructor_id = u.id 
             WHERE c.is_published = true`
        );
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 4. Get Course Details (with Modules & Lessons)
exports.getCourseDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const [course] = await db.execute('SELECT * FROM courses WHERE id = ?', [id]);
        if (course.length === 0) return res.status(404).json({ msg: 'Course not found' });
        
        const [modules] = await db.execute('SELECT * FROM modules WHERE course_id = ? ORDER BY sort_order ASC', [id]);
        
        for (let mod of modules) {
            const [lessons] = await db.execute('SELECT * FROM lessons WHERE module_id = ? ORDER BY sort_order ASC', [mod.id]);
            mod.lessons = lessons;
        }
        
        res.json({ ...course[0], modules });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};