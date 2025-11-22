const dotenv = require("dotenv");
const mongoose = require("mongoose");
const DB_NAME = require("../constants.js");

dotenv.config({
  path: ".env",
});

// Disable mongoose buffering globally to prevent timeout errors
mongoose.set("bufferCommands", false);
mongoose.set("bufferMaxEntries", 0);

// Track connection state
let isConnected = false;

const connectDB = async () => {
  try {
    // If already connected, return the connection
    if (mongoose.connection.readyState === 1) {
      console.log("✅ MongoDB already connected");
      isConnected = true;
      return mongoose.connection;
    }

    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    // Construct full URI with database name
    // Handle different URI formats
    let fullURI;
    if (mongoURI.includes("?")) {
      // URI already has query parameters
      const [baseURI, queryParams] = mongoURI.split("?");
      const cleanBase = baseURI.endsWith("/") ? baseURI.slice(0, -1) : baseURI;
      fullURI = `${cleanBase}/${DB_NAME}?${queryParams}&retryWrites=true&w=majority`;
    } else {
      // URI doesn't have query parameters
      const cleanBase = mongoURI.endsWith("/")
        ? mongoURI.slice(0, -1)
        : mongoURI;
      fullURI = `${cleanBase}/${DB_NAME}?retryWrites=true&w=majority`;
    }

    console.log("🔄 Attempting to connect to MongoDB...");

    const connectionOptions = {
      serverSelectionTimeoutMS: 50000, // 50 seconds
      socketTimeoutMS: 60000, // 60 seconds
      connectTimeoutMS: 50000, // 50 seconds
      maxPoolSize: 10,
      minPoolSize: 1,
      maxIdleTimeMS: 30000,
      heartbeatFrequencyMS: 10000,
      retryWrites: true,
      w: "majority",
    };

    const connectionInstance = await mongoose.connect(
      fullURI,
      connectionOptions
    );

    isConnected = true;
    console.log(
      `\n✅ MONGODB Connected !! HOST: ${connectionInstance.connection.host}`
    );
    console.log(`📊 Database: ${connectionInstance.connection.name}`);
    console.log(`🔗 Ready State: ${connectionInstance.connection.readyState}`);

    // Handle connection events
    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
      isConnected = false;
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️  MongoDB disconnected");
      isConnected = false;
    });

    mongoose.connection.on("reconnected", () => {
      console.log("✅ MongoDB reconnected");
      isConnected = true;
    });

    // Wait a bit to ensure connection is fully established
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return connectionInstance;
  } catch (error) {
    isConnected = false;
    console.error("❌ MongoDB Connection Error:", error.message);

    // Log more details about the error
    if (error.name === "MongoServerSelectionError") {
      console.error(
        "❌ Could not connect to MongoDB server. Check your connection string and network."
      );
    } else if (error.name === "MongoParseError") {
      console.error("❌ Invalid MongoDB connection string format.");
    }

    // Don't exit in production, let the server try to reconnect
    if (process.env.NODE_ENV === "production") {
      console.log("🔄 Will retry connection in 5 seconds...");
      setTimeout(() => {
        connectDB();
      }, 5000);
      // Return a promise that will resolve when connection is established
      return new Promise((resolve) => {
        const checkConnection = setInterval(() => {
          if (isConnected) {
            clearInterval(checkConnection);
            resolve(mongoose.connection);
          }
        }, 1000);
      });
    } else {
      console.error("Full error:", error);
      process.exit(1);
    }
  }
};

// Helper function to check if database is connected
const isDBConnected = () => {
  return mongoose.connection.readyState === 1;
};

module.exports = { connectDB, isDBConnected };
