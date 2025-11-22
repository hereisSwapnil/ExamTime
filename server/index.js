const connectDB = require("./db/index.js");
const app = require("./app");

// For local development only
if (!process.env.VERCEL) {
  connectDB()
    .then(() => {
      const PORT = process.env.PORT || 8000;
      app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.log("MONGODB Connection failed !! ", err);
      process.exit(1);
    });
}

// Export for Vercel serverless
module.exports = app;
