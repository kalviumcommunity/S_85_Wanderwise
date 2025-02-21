require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors'); 
const connectDB = require('./db'); // Import DB connection

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS

// Connect to MongoDB
connectDB();

// Routes
app.get('/', (req, res) => {
    const dbStatus = require('mongoose').connection.readyState === 1 
        ? "MongoDB Connected" 
        : "MongoDB Not Connected";
    
    res.send(`<h2>Hello, I am Tanmay. This is my Wanderwise Project!</h2><p>${dbStatus} ✔</p>`);
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});