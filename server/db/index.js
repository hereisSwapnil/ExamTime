const dotenv = require("dotenv");
const mongoose = require("mongoose");
const DB_NAME = require("../constants.js");

dotenv.config({
  path: ".env",
});

const connectDB = async () => {
  try {
    // Disable mongoose buffering to prevent timeout errors
    mongoose.set("bufferCommands", false);
    mongoose.set("bufferMaxEntries", 0);

    const mongoURI = `${process.env.MONGODB_URI}${DB_NAME}`;

    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    const connectionOptions = {
      serverSelectionTimeoutMS: 30000, // 30 seconds
      socketTimeoutMS: 45000, // 45 seconds
      connectTimeoutMS: 30000, // 30 seconds
      maxPoolSize: 10, // Maintain up to 10 socket connections
      minPoolSize: 1, // Maintain at least 1 socket connection
      maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity
      heartbeatFrequencyMS: 10000, // Check server status every 10 seconds
    };

    const connectionInstance = await mongoose.connect(
      mongoURI,
      connectionOptions
    );

    console.log(
      `\n✅ MONGODB Connected !! HOST: ${connectionInstance.connection.host}`
    );
    console.log(`📊 Database: ${connectionInstance.connection.name}`);

    // Handle connection events
    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️  MongoDB disconnected");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("✅ MongoDB reconnected");
    });

    return connectionInstance;
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    console.error("Full error:", error);

    // Don't exit in production, let the server try to reconnect
    if (process.env.NODE_ENV === "production") {
      console.log("🔄 Will retry connection...");
      // Retry connection after 5 seconds
      setTimeout(() => {
        connectDB();
      }, 5000);
    } else {
      process.exit(1);
    }
  }
};

module.exports = connectDB;
