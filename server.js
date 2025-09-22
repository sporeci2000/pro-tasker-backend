// Load environment variables
require('dotenv').config();

// DB connection
require('./config/db-connection')

// Imports the Express library
const express = require('express');

const authRoutes = require('./routes/auth-routes');

const projectRoutes = require('./routes/project-routes');

const cors = require('cors');

// Creates a new Express application instance
const app = express();

// Sets the port number server will listen on
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:3000", // local dev
    "https://pro-tasker-frontend-5wc9.onrender.com" // Render frontend
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

// Starts the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});