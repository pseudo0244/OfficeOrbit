const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authroutes"); // Import auth routes

dotenv.config(); // Load environment variables
const app = express();
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json()); 

connectDB(); // Connect to the database

// Simple route to test if the server is running
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Use authentication routes for handling login and registration
app.use("/api/auth", authRoutes); // All routes starting with /api/auth will be handled by authRoutes

// Add any other routes here as needed, for example:
// app.use("/api/employees", employeeRoutes);

// Set up the server to listen on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
