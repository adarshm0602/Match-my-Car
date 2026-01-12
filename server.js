const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Connect to MongoDB database
connectDB();

const app = express();

// Middleware: Allow cross-origin requests (needed for React frontend)
app.use(cors());

// Middleware: Parse JSON data from request body
app.use(express.json());

// Routes: All car-related endpoints will be under /api/cars
const carRoutes = require("./routes/carRoutes");
app.use("/api/cars", carRoutes);

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ message: "Match My Car API is running!" });
});

// Error handling middleware (catches any errors from routes)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: "Something went wrong!", 
    error: process.env.NODE_ENV === "development" ? err.message : {}
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚗 Server running on port ${PORT}`);
});

