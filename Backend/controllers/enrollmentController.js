const db = require('../config/db');

// 1. Enroll / Buy Course
exports.enrollInCourse = async (req, res) => {
    const { courseId } = req.body;
    const userId = req.user.id; 

    const connection = await db.getConnection();
    await connection.beginTransaction();

    try {
        // Check if already enrolled
        const [existing] = await connection.execute(
            'SELECT * FROM enrollments WHERE user_id = ? AND course_id = ?',
            [userId, courseId]
        );
        if (existing.length > 0) {
            await connection.rollback();
            return res.status(400).json({ msg: 'Already enrolled' });
        }

        // Get Course Info
        const [course] = await connection.execute('SELECT price, instructor_id, title FROM courses WHERE id = ?', [courseId]);
        if (course.length === 0) {
            await connection.rollback();
            return res.status(404).json({ msg: 'Course not found' });
        }
        
        const price = parseFloat(course[0].price);
        const instructorId = course[0].instructor_id;

        // Check User Balance
        const [buyer] = await connection.execute('SELECT wallet_balance FROM users WHERE id = ?', [userId]);
        if (buyer[0].wallet_balance < price) {
            await connection.rollback();
            return res.status(400).json({ msg: 'Insufficient funds in wallet' });
        }

        // Transactions
        await connection.execute('UPDATE users SET wallet_balance = wallet_balance - ? WHERE id = ?', [price, userId]);
        await connection.execute('INSERT INTO transactions (user_id, amount, type, description) VALUES (?, ?, ?, ?)',
            [userId, price, 'debit', `Purchased course: ${course[0].title}`]
        );

        await connection.execute('UPDATE users SET wallet_balance = wallet_balance + ? WHERE id = ?', [price, instructorId]);
        await connection.execute('INSERT INTO transactions (user_id, amount, type, description) VALUES (?, ?, ?, ?)',
            [instructorId, price, 'credit', `Sale revenue: ${course[0].title}`]
        );

        // Create Enrollment
        await connection.execute(
            'INSERT INTO enrollments (user_id, course_id, amount_paid) VALUES (?, ?, ?)',
            [userId, courseId, price]
        );

        await connection.commit();
        res.status(201).json({ msg: 'Enrollment successful', pricePaid: price });

    } catch (err) {
        await connection.rollback();
        res.status(500).json({ error: err.message });
    } finally {
        connection.release();
    }
};

// 2. Check Enrollment Status
exports.checkEnrollment = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.user.id;

        const [rows] = await db.execute(
            'SELECT * FROM enrollments WHERE user_id = ? AND course_id = ?',
            [userId, courseId]
        );

        res.json({ isEnrolled: rows.length > 0 });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 3. Get User's Enrolled Courses
exports.getMyCourses = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const [courses] = await db.execute(
            `SELECT c.*, e.progress, e.enrolled_at, u.name as instructor_name
             FROM enrollments e
             JOIN courses c ON e.course_id = c.id
             JOIN users u ON c.instructor_id = u.id
             WHERE e.user_id = ?`,
            [userId]
        );

        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 4. Mark Lesson as Complete (NEW FEATURE)
exports.markLessonComplete = async (req, res) => {
    const { courseId, lessonId } = req.body;
    const userId = req.user.id;

    try {
        // Record Completion if not exists
        const [existing] = await db.execute(
            'SELECT * FROM lesson_completions WHERE user_id = ? AND lesson_id = ?',
            [userId, lessonId]
        );

        if (existing.length === 0) {
            await db.execute(
                'INSERT INTO lesson_completions (user_id, lesson_id, course_id) VALUES (?, ?, ?)',
                [userId, lessonId, courseId]
            );
        }

        // Calculate New Progress
        const [totalRows] = await db.execute(
            `SELECT COUNT(*) as total FROM lessons l 
             JOIN modules m ON l.module_id = m.id 
             WHERE m.course_id = ?`, 
            [courseId]
        );
        const totalLessons = totalRows[0].total;

        const [completedRows] = await db.execute(
            'SELECT COUNT(*) as completed FROM lesson_completions WHERE user_id = ? AND course_id = ?',
            [userId, courseId]
        );
        const completedLessons = completedRows[0].completed;

        // Update Enrollment Percentage
        const newProgress = Math.round((completedLessons / totalLessons) * 100);

        await db.execute(
            'UPDATE enrollments SET progress = ? WHERE user_id = ? AND course_id = ?',
            [newProgress, userId, courseId]
        );

        res.json({ msg: "Progress updated", progress: newProgress });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};