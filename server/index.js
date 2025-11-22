const { connectDB, isDBConnected } = require("./db/index.js");
const app = require("./app");

// Ensure database connection before starting server
const startServer = async () => {
  try {
    console.log("🔄 Starting server initialization...");

    // Wait for database connection with timeout
    const connectionPromise = connectDB();
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Connection timeout")), 60000)
    );

    await Promise.race([connectionPromise, timeoutPromise]);

    // Verify connection is actually ready
    if (!isDBConnected()) {
      throw new Error("Database connection not ready");
    }

    // Wait a bit more to ensure everything is settled
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Only start server after successful database connection
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`✅ Database ready: ${isDBConnected() ? "Yes" : "No"}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    console.error("Full error:", err);

    // In production, retry after delay
    if (process.env.NODE_ENV === "production") {
      console.log("🔄 Retrying server startup in 10 seconds...");
      setTimeout(() => {
        startServer();
      }, 10000);
    } else {
      process.exit(1);
    }
  }
};

startServer();
