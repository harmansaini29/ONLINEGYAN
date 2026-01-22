const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path"); // <--- Import Path

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// --- SERVE STATIC FILES (VIDEOS/IMAGES) ---
// This allows http://localhost:9000/uploads/video.mp4 to work
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes Definition
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/enrollments', require('./routes/enrollmentRoutes'));
app.use('/api/wallet', require('./routes/walletRoutes')); // <--- NEW WALLET ROUTE

app.get("/", (req, res) => {
    res.send("🚀 OnlineGyan Backend is Running Professionally!");
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => { 
    console.log(`🚀 Server running on port ${PORT}`); 
});