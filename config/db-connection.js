// Load environment variables
require('dotenv').config();

// Import mongoose library
const mongoose = require('mongoose');

// Call it and pass in the connection string 
mongoose.connect(process.env.MONGO_URI)

    // If the connection succeeds, this .then() runs
    .then(() => {
        console.log(`Connected to MongoDB database: ${mongoose.connection.name}`);
    })

    // If something goes wrong, .catch() runs.
    .catch(error => {
        console.error("Failed to connect to MongoDB", error.message);

        //This will kill the server
        process.exit(1);
    })

// Sets up an event listener for runtime errors on the DB connection
mongoose.connection.on("error", error => {
    console.error("MongoDB connection error:", error.message);
})