const express = require('express');
const router = express.Router();
const { refillWallet } = require('../controllers/walletController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/refill', authMiddleware, refillWallet);

module.exports = router;