const dotenv = require("dotenv");
const mongoose = require("./mongoose.js"); // Use pre-configured mongoose
const DB_NAME = require("../constants.js");

dotenv.config({
  path: ".env",
});

// Cache the database connection for serverless environments
let isConnected = false;

const connectDB = async () => {
  mongoose.set('strictQuery', false);

  // If already connected, reuse the connection
  if (isConnected) {
    console.log("Using cached MongoDB connection");
    return;
  }

  if (mongoose.connection.readyState === 1) {
    isConnected = true;
    console.log("Using cached MongoDB connection (readyState check)");
    return;
  }

  try {
    // Connection options optimized for Vercel serverless
    const options = {
      dbName: DB_NAME,
      bufferCommands: false, // Disable mongoose buffering
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
      socketTimeoutMS: 45000,
    };

    const connectionInstance = await mongoose.connect(
      process.env.MONGODB_URI,
      options
    );
    
    isConnected = true;
    console.log(
      `\nMONGODB Connected !! HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB Connection Error: " + error);
    isConnected = false;
    throw error;
  }
};

module.exports = connectDB;
