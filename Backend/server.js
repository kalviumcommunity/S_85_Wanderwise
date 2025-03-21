const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDatabase = require("./config/db");
const wanderwiseRoutes = require("./routes/routes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
connectDatabase();

// Home Route - Show MongoDB Connection Status
app.get("/", (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 
        ? "MongoDB Connected☑" 
        : "MongoDB Not Connected✖";
    
    res.send(`<h2>Welcome to WanderWise - Your Ultimate Travel Companion!</h2>${dbStatus}`);
});

// Use Routes
app.use("/api", wanderwiseRoutes);

app.listen(PORT, () => {
    console.log(`🚀 WanderWise Server is running on http://localhost:${PORT}`);
});
