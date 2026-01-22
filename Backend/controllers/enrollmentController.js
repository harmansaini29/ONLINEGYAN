const db = require('../config/db');

exports.enrollInCourse = async (req, res) => {
    const { courseId } = req.body;
    const userId = req.user.id; 

    // Start a Transaction (Ensures money isn't lost if something fails)
    const connection = await db.getConnection();
    await connection.beginTransaction();

    try {
        // 1. Check if already enrolled
        const [existing] = await connection.execute(
            'SELECT * FROM enrollments WHERE user_id = ? AND course_id = ?',
            [userId, courseId]
        );
        if (existing.length > 0) {
            await connection.rollback();
            return res.status(400).json({ msg: 'Already enrolled' });
        }

        // 2. Get Course Info & Instructor Info
        const [course] = await connection.execute('SELECT price, instructor_id, title FROM courses WHERE id = ?', [courseId]);
        if (course.length === 0) {
            await connection.rollback();
            return res.status(404).json({ msg: 'Course not found' });
        }
        
        const price = parseFloat(course[0].price);
        const instructorId = course[0].instructor_id;

        // 3. Check User Balance
        const [buyer] = await connection.execute('SELECT wallet_balance FROM users WHERE id = ?', [userId]);
        if (buyer[0].wallet_balance < price) {
            await connection.rollback();
            return res.status(400).json({ msg: 'Insufficient funds in wallet' });
        }

        // 4. DEDUCT from Student
        await connection.execute('UPDATE users SET wallet_balance = wallet_balance - ? WHERE id = ?', [price, userId]);
        await connection.execute('INSERT INTO transactions (user_id, amount, type, description) VALUES (?, ?, ?, ?)',
            [userId, price, 'debit', `Purchased course: ${course[0].title}`]
        );

        // 5. ADD to Instructor
        await connection.execute('UPDATE users SET wallet_balance = wallet_balance + ? WHERE id = ?', [price, instructorId]);
        await connection.execute('INSERT INTO transactions (user_id, amount, type, description) VALUES (?, ?, ?, ?)',
            [instructorId, price, 'credit', `Sale revenue: ${course[0].title}`]
        );

        // 6. Create Enrollment
        await connection.execute(
            'INSERT INTO enrollments (user_id, course_id, amount_paid) VALUES (?, ?, ?)',
            [userId, courseId, price]
        );

        await connection.commit(); // SAVE EVERYTHING
        res.status(201).json({ msg: 'Enrollment successful', pricePaid: price });

    } catch (err) {
        await connection.rollback(); // UNDO IF ERROR
        res.status(500).json({ error: err.message });
    } finally {
        connection.release();
    }
};

// 2. Check Enrollment Status (To decide: Show "Buy" or "Watch" button?)
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

// 3. Get User's Enrolled Courses (For "My Learning" Page)
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