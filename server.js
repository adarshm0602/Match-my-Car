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
// Configure CORS to allow requests from Vercel frontend in production
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      process.env.FRONTEND_URL
    ].filter(Boolean); // Remove undefined values
    
    if (process.env.NODE_ENV === 'production') {
      // In production, only allow specific frontend URL
      // If FRONTEND_URL is not set, allow all (fallback for initial setup)
      if (!process.env.FRONTEND_URL) {
        console.warn('⚠️  FRONTEND_URL not set in production. Allowing all origins.');
        return callback(null, true);
      }
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    } else {
      // In development, allow localhost and all origins
      callback(null, true);
    }
  },
  credentials: true
};
app.use(cors(corsOptions));

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

