const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

const authenticateOptional = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            console.log("No Authorization header");
            req.userId = null;
            return next();
        }

        if (!authHeader.startsWith('Bearer ')) {
            console.log("Invalid Authorization header format");
            req.userId = null;
            return next();
        }

        const token = authHeader.split(' ')[1];
        
        if (!token) {
            console.log("No token found in Authorization header");
            req.userId = null;
            return next();
        }

        const decoded = jwt.verify(token, secretKey);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        console.error('Auth Error:', err.message);
        req.userId = null;
        next();
    }
};

module.exports = authenticateOptional;