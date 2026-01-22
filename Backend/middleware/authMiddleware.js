const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Get token from header
    const token = req.header('Authorization');

    // Check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Verify token (Assumes format "Bearer <token>")
        const actualToken = token.split(" ")[1]; 
        const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
        
        req.user = decoded; // Add user payload to request object
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};