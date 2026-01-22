const db = require('../config/db');

exports.refillWallet = async (req, res) => {
    const { amount } = req.body;
    const userId = req.user.id;

    if (!amount || amount <= 0) {
        return res.status(400).json({ msg: "Invalid amount" });
    }

    try {
        // 1. Update Balance
        await db.execute('UPDATE users SET wallet_balance = wallet_balance + ? WHERE id = ?', [amount, userId]);

        // 2. Log Transaction
        await db.execute(
            'INSERT INTO transactions (user_id, amount, type, description) VALUES (?, ?, ?, ?)',
            [userId, amount, 'credit', 'Wallet Refill (Demo Gateway)']
        );

        res.json({ msg: "Wallet refilled successfully!", amountAdded: amount });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};