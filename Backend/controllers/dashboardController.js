const db = require('../config/db');

exports.getInstructorStats = async (req, res) => {
    try {
        const instructorId = req.user.id; 

        const [revenueData] = await db.execute(
            `SELECT SUM(e.amount_paid) as total_revenue
             FROM enrollments e
             JOIN courses c ON e.course_id = c.id
             WHERE c.instructor_id = ?`, 
            [instructorId]
        );

        const [studentsData] = await db.execute(
            `SELECT COUNT(DISTINCT e.user_id) as total_students
             FROM enrollments e
             JOIN courses c ON e.course_id = c.id
             WHERE c.instructor_id = ?`,
            [instructorId]
        );

        res.json({
            revenue: revenueData[0].total_revenue || 0,
            students: studentsData[0].total_students || 0,
            rating: 4.9 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error" });
    }
};