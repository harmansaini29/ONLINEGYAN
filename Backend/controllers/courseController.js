const db = require('../config/db');

exports.createCourse = async (req, res) => {
    const { title, category, price, description } = req.body;
    const instructorId = req.user.id;

    // Get File Paths from Multer (if uploaded)
    // If not uploaded, use default placeholder
    const thumbnailPath = req.files['thumbnail'] 
        ? `http://localhost:9000/uploads/${req.files['thumbnail'][0].filename}` 
        : "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80";
    
    const videoPath = req.files['video'] 
        ? `http://localhost:9000/uploads/${req.files['video'][0].filename}`
        : "https://www.youtube.com/embed/dQw4w9WgXcQ"; // Fallback

    try {
        // 1. Insert Course
        const [result] = await db.execute(
            `INSERT INTO courses (instructor_id, title, category, price, description, thumbnail, is_published) 
             VALUES (?, ?, ?, ?, ?, ?, true)`,
            [instructorId, title, category, price, description, thumbnailPath]
        );
        
        const courseId = result.insertId;

        // 2. Create Default Module
        const [modResult] = await db.execute(
            'INSERT INTO modules (course_id, title, sort_order) VALUES (?, ?, ?)',
            [courseId, "Introduction", 1]
        );

        // 3. Create First Lesson with the Uploaded Video
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

// ... keep getAllCourses and getCourseDetails as they were ...
exports.getAllCourses = async (req, res) => { /* existing code */ 
    // Ensure you copy the existing getAllCourses code here
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

exports.getCourseDetails = async (req, res) => { /* existing code */
    // Ensure you copy the existing getCourseDetails code here 
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