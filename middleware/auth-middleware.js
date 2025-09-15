// Import the jsonwebtoken library so we can verify tokens
const jwt = require('jsonwebtoken');

// Handle the authentication
// Double check the token
function verifyAuthentication(req, res, next) {
    try {
        let token = req.headers.authorization;

        if (!token || !token.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No token or incorrect format.' });
        }

        // Extract just the token part
        token = token.split(' ').pop().trim();

        // Get the secret key from environment variables
        const jwtSecretKey = process.env.JWT_SECRET;
        const payload = jwt.verify(token, jwtSecretKey);

        console.log(payload);

        req.user = payload;

        // If it is successful
        next();

    } catch (error) {
        console.error(error);
        // Do not have permission to access this route
        res.status(401).json({ error: 'Token is invalid.' });
    }
}

module.exports = verifyAuthentication;