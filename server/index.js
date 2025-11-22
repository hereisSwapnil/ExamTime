const connectDB = require("./db/index.js");
const app = require("./app");

// Middleware to ensure database connection for each request (Vercel serverless)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(503).json({
      message: "Database connection failed",
      error: error.message
    });
  }
});

// For local development
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  connectDB()
    .then(() => {
      const PORT = process.env.PORT || 8000;
      app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.log("MONGODB Connection failed !! ", err);
    });
}

// Export for Vercel serverless
module.exports = app;
