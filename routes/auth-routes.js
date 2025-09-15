// Import Express
const express = require('express');

// Import the controller functions
const { registerUser, loginUser } = require('../controllers/auth-controller');

const { getCurrentUser } = require('../controllers/auth-controller'); 

const verifyAuthentication = require('../middleware/auth-middleware');

// Create a new router instance 
const router = express.Router();

// Route for registering a new user
// POST /api/auth/register
router.post('/register', registerUser);

// Route for logging in an existing user
// POST /api/auth/login
router.post('/login', loginUser);

// Protected route
router.get('/currentUser', verifyAuthentication, getCurrentUser);

// Export router so it can be used in server.js
module.exports = router;