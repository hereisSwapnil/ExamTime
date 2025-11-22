const dotenv = require("dotenv");
const mongoose = require("mongoose");
const DB_NAME = require("../constants.js");

dotenv.config({
  path: ".env",
});

// Cache the database connection for serverless environments
let cachedConnection = null;

const connectDB = async () => {
  // If we have a cached connection and it's ready, return it
  if (cachedConnection && mongoose.connection.readyState === 1) {
    console.log("Using cached MongoDB connection");
    return cachedConnection;
  }

  try {
    // Configure mongoose for serverless environments
    mongoose.set('strictQuery', false);
    
    // Connection options optimized for Vercel serverless
    const options = {
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
      socketTimeoutMS: 45000, // Socket timeout
      maxPoolSize: 10, // Connection pool size
      minPoolSize: 2,
      maxIdleTimeMS: 10000,
      connectTimeoutMS: 30000,
      // Recommended for serverless
      bufferCommands: false, // Disable mongoose buffering
    };

    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}${DB_NAME}`,
      options
    );
    
    console.log(
      `\nMONGODB Connected !! HOST: ${connectionInstance.connection.host}`
    );
    
    // Cache the connection
    cachedConnection = connectionInstance;
    return connectionInstance;
  } catch (error) {
    console.log("MongoDB Connection Error: " + error);
    cachedConnection = null;
    
    // Don't exit process in serverless environment
    if (process.env.VERCEL) {
      throw error;
    }
    process.exit(1);
  }
};

module.exports = connectDB;
