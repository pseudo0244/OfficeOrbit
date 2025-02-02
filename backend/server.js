const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const cloudinary = require("./config/cloudinary"); // Cloudinary config
const authRoutes = require("./routes/authRoutes"); // Authentication routes
const buildingRoutes = require("./routes/buildingRoutes"); // Building routes
const floorRoutes = require("./routes/floorRoutes"); // Floor routes
const mapRoutes = require("./routes/mapRoutes"); // Map routes
const pointRoutes = require("./routes/pointRoutes"); // Point routes
const uploadRoutes = require("./routes/uploadRoutes"); // Upload routes (only if you need a separate upload route)

dotenv.config(); // Load environment variables
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Connect to the database
connectDB();

// Initialize Cloudinary configuration
cloudinary();

// Test route to check if the server is running
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/buildings", buildingRoutes); // Building-related routes
app.use("/api/floors", floorRoutes); // Floor-related routes
app.use("/api/maps", mapRoutes); // Map-related routes
app.use("/api/points", pointRoutes); // Point-related routes
app.use("/api/upload", uploadRoutes); // File upload routes (if separate)
  
// Start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
