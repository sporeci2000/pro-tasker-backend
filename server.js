// Load environment variables
require('dotenv').config();

// DB connection
require('./config/db-connection')

// Imports the Express library
const express = require('express');

const authRoutes = require('./routes/auth-routes');

// Creates a new Express application instance
const app = express();

// Sets the port number server will listen on
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

app.use('/api/auth', authRoutes);

// Starts the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});