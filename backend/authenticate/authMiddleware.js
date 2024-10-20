// authMiddleware.js
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY; // Ensure this is set in your .env file

const authenticateOptional = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log("No token provided. Proceeding without authentication.");
        req.userId = null; // No user ID for unauthenticated users
        return next();     // Let unauthenticated users pass
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, secretKey);
        req.userId = decoded.userId; // Attach userId to the request object for authenticated users
        next();
    } catch (err) {
        console.error('JWT Verification Error:', err.message);
        // Proceed without userId if token is invalid or expired
        req.userId = null;
        return next();  // Let users with invalid tokens interact without saving
    }
};


module.exports = authenticateOptional;