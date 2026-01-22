const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const [existing] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (existing.length > 0) return res.status(400).json({ msg: 'User already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const [result] = await db.execute(
            'INSERT INTO users (name, email, password, role, wallet_balance) VALUES (?, ?, ?, ?, 1000.00)',
            [name, email, hashedPassword, role]
        );

        await db.execute(
            'INSERT INTO transactions (user_id, amount, type, description) VALUES (?, ?, ?, ?)',
            [result.insertId, 1000.00, 'credit', 'Welcome Bonus']
        );

        res.status(201).json({ msg: 'User registered successfully with $1000 bonus' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) return res.status(400).json({ msg: 'Invalid credentials' });

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.json({ 
            token, 
            user: { 
                id: user.id, 
                name: user.name, 
                role: user.role,
                avatar: user.avatar,
                wallet_balance: user.wallet_balance
            } 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getMe = async (req, res) => {
    try {
        const [users] = await db.execute(
            'SELECT id, name, email, role, avatar, wallet_balance, bio FROM users WHERE id = ?', 
            [req.user.id]
        );
        if (users.length === 0) return res.status(404).json({ msg: "User not found" });
        res.json(users[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.socialLogin = async (req, res) => {
    const { provider } = req.body; 

    try {
        let email, name, avatar;

        if (provider === 'google') {
            email = 'demo.google@onlinegyan.com';
            name = 'Google User';
            avatar = 'https://lh3.googleusercontent.com/a/default-user=s96-c';
        } else if (provider === 'github') {
            email = 'demo.github@onlinegyan.com';
            name = 'GitHub Developer';
            avatar = 'https://avatars.githubusercontent.com/u/9919?s=200&v=4';
        } else {
            return res.status(400).json({ msg: "Invalid Provider" });
        }

        const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        
        let user;
        if (users.length > 0) {
            user = users[0];
        } else {
            const randomPassword = Math.random().toString(36).slice(-8);
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(randomPassword, salt);

            const [result] = await db.execute(
                'INSERT INTO users (name, email, password, role, wallet_balance, avatar) VALUES (?, ?, ?, ?, 1000.00, ?)',
                [name, email, hashedPassword, 'learner', avatar]
            );
            
            await db.execute(
                'INSERT INTO transactions (user_id, amount, type, description) VALUES (?, ?, ?, ?)',
                [result.insertId, 1000.00, 'credit', 'Welcome Bonus (Social Login)']
            );

            user = { id: result.insertId, name, email, role: 'learner', wallet_balance: 1000.00, avatar };
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.json({ 
            token, 
            user: { 
                id: user.id, 
                name: user.name, 
                role: user.role, 
                avatar: user.avatar,
                wallet_balance: user.wallet_balance
            } 
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};