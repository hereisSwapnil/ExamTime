const connectDB = require("./db/index.js");
const app = require("./app");

// Ensure database connection before starting server
const startServer = async () => {
  try {
    // Wait for database connection
    await connectDB();
    
    // Only start server after successful database connection
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    // In production, don't exit immediately, allow retries
    if (process.env.NODE_ENV !== "production") {
      process.exit(1);
    }
  }
};

startServer();
