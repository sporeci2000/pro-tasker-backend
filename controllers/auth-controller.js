// Import the User model to interact with the users collection in MongoDB
const User = require('../models/user-model');

// Import jsonwebtoken library to create and verify JWTs
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {
    try {
        // Check if a user with this email already exists
        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            // If user exists, return error response 
            return res.status(400).json({ error: 'User already exists' });
        }

        // Create a new user document in MongoDB
        // req.body should contain username, email, and password
        // Password is automatically hashed by the pre-save hook in the User model
        const newUser = await User.create(req.body);

        // Create a JWT token containing the new user's id
        // Uses secret from .env and expires in 1 hour
        const token = jwt.sign(
            { id: newUser.id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Send success response with user details and token
        res.status(201).json({
            success: 'User registered successfully',
            user: { id: newUser.id, username: newUser.username, email: newUser.email },
            token
        });
    } catch (error) {
        // Log the error for debugging
        console.error(error);

        // Send error response if something goes wrong
        res.status(400).json({ error: error.message });
    }
}


async function loginUser(req, res) {
    try {
        // Find a user by email and explicitly include the password field
        const user = await User.findOne({ email: req.body.email }).select('+password');

        // If no user found, return 401 Unauthorized
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordCorrect = await user.isCorrectPassword(req.body.password);

        // If password doesn't match, return 401 Unauthorized
        if (!isPasswordCorrect) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Create a JWT token containing the user's id
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Send success response with user details and token
        res.status(200).json({
            success: 'User logged in successfully',
            user: { id: user.id, username: user.username, email: user.email },
            token
        });
    } catch (error) {
        console.error(error);
        // Send error response
        res.status(400).json({ error: error.message });
    }
}

// Export controller functions so they can be used in routes
module.exports = {
    registerUser,
    loginUser,
};