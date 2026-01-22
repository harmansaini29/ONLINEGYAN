const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs"); // Added to manage folders

// Load Environment Variables
dotenv.config();

const app = express();

// --- 1. ESSENTIAL CONFIGURATIONS ---
// Critical for Railway/Vercel to detect HTTPS correctly
app.enable("trust proxy"); 

// Enable CORS (Allows your Frontend to talk to Backend)
app.use(cors());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// --- 2. ROBUST FILE UPLOAD SETUP ---
// Ensure 'uploads' directory exists on startup to prevent errors
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log("📂 Created 'uploads' directory automatically.");
}

// Serve Static Files (Images/Videos)
// This allows users to view files at: https://your-app.com/uploads/filename.jpg
app.use('/uploads', express.static(uploadDir));

// --- 3. ROUTES DEFINITION ---
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/enrollments', require('./routes/enrollmentRoutes'));
app.use('/api/wallet', require('./routes/walletRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes')); 

// --- 4. HEALTH CHECK ROUTE ---
app.get("/", (req, res) => {
    res.json({
        msg: "🚀 OnlineGyan Backend is Live & Running Professionally!",
        mode: process.env.NODE_ENV || "development",
        timestamp: new Date().toISOString()
    });
});

// --- 5. ERROR HANDLING (The Safety Net) ---

// Handle 404 (Route Not Found)
app.use((req, res, next) => {
    res.status(404).json({ error: "Route not found" });
});

// Global Error Handler (Prevents Server Crashes)
app.use((err, req, res, next) => {
    console.error("🔥 Server Error:", err.stack);
    res.status(500).json({ 
        error: "Internal Server Error", 
        message: err.message 
    });
});

// --- 6. START SERVER ---
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => { 
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`📂 Serving uploads from: ${uploadDir}`);
});