const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Check if MONGODB_URI is set
    if (!process.env.MONGODB_URI) {
      console.error("❌ MONGODB_URI is not set in environment variables");
      console.log("💡 Please set MONGODB_URI in your .env file");
      console.log("   Example: MONGODB_URI=mongodb://localhost:27017/matchmycar");
      return; // Don't exit, let server continue (routes will handle errors)
    }

    // Validate connection string format
    const uri = process.env.MONGODB_URI.trim();
    if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
      console.error("❌ Invalid MongoDB connection string format");
      console.error("   Connection string must start with 'mongodb://' or 'mongodb+srv://'");
      console.error(`   Current value: ${uri.substring(0, 20)}...`);
      return; // Don't exit, let server continue
    }

    // Connect to MongoDB with options
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    console.log("💡 The server will continue running, but database operations will fail.");
    console.log("   Please check:");
    console.log("   1. MongoDB is running (if using local MongoDB)");
    console.log("   2. Your MONGODB_URI in .env is correct");
    console.log("   3. Your network connection (if using MongoDB Atlas)");
    // Don't exit - let the server continue running
    // Routes will handle database errors gracefully
  }
};

module.exports = connectDB;
