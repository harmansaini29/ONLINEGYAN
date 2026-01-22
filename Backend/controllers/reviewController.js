const db = require('../config/db');

// 1. Add a Review
exports.addReview = async (req, res) => {
    const { courseId, rating, comment } = req.body;
    const userId = req.user.id;

    try {
        // Check if user is enrolled
        const [enrollment] = await db.execute(
            'SELECT * FROM enrollments WHERE user_id = ? AND course_id = ?',
            [userId, courseId]
        );

        if (enrollment.length === 0) {
            return res.status(403).json({ msg: "You must be enrolled to review this course." });
        }

        // Check if already reviewed
        const [existing] = await db.execute(
            'SELECT * FROM reviews WHERE user_id = ? AND course_id = ?',
            [userId, courseId]
        );

        if (existing.length > 0) {
            return res.status(400).json({ msg: "You have already reviewed this course." });
        }

        await db.execute(
            'INSERT INTO reviews (course_id, user_id, rating, comment) VALUES (?, ?, ?, ?)',
            [courseId, userId, rating, comment]
        );

        res.status(201).json({ msg: "Review added successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Get Course Reviews
exports.getReviews = async (req, res) => {
    const { courseId } = req.params;
    try {
        const [reviews] = await db.execute(
            `SELECT r.*, u.name as user_name, u.avatar 
             FROM reviews r 
             JOIN users u ON r.user_id = u.id 
             WHERE r.course_id = ? 
             ORDER BY r.created_at DESC`,
            [courseId]
        );
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};