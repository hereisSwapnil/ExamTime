const connectDB = require("./db/index.js");
const sessionManager = require("./db/sessionManager.js");
const app = require("./app");

// For local development only
if (!process.env.VERCEL) {
  connectDB()
    .then(async () => {
      // Initialize session manager and create global session
      await sessionManager.connect();

      const PORT = process.env.PORT || 8000;
      app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.log("MONGODB Connection failed !! ", err);
      process.exit(1);
    });
} else {
  // For Vercel serverless, initialize session on module load
  sessionManager.connect().catch((err) => {
    console.error("Failed to initialize MongoDB session:", err);
  });
}

// Export for Vercel serverless
module.exports = app;
