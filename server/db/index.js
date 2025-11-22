const dotenv = require("dotenv");
const mongoose = require("./mongoose.js"); // Use pre-configured mongoose
const DB_NAME = require("../constants.js");

dotenv.config({
  path: ".env",
});

const connectDB = async () => {
  mongoose.set('strictQuery', false);

  // Check current connection state
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  if (mongoose.connection.readyState === 1) {
    console.log("Using cached MongoDB connection");
    return;
  }

  // If connecting, wait for it
  if (mongoose.connection.readyState === 2) {
    console.log("Connection already in progress, waiting...");
    // Wait for connection to complete
    return mongoose.connection.asPromise();
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
    
    console.log(
      `\nMONGODB Connected !! HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB Connection Error: " + error);
    throw error;
  }
};

module.exports = connectDB;
