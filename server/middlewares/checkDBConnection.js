const { isDBConnected } = require("../db/index.js");

const checkDBConnection = (req, res, next) => {
  if (!isDBConnected()) {
    return res.status(503).json({
      message: "Database connection not available. Please try again later.",
      error: "Service temporarily unavailable",
    });
  }
  next();
};

module.exports = checkDBConnection;
