const mongoose = require("mongoose");

// CRITICAL: Configure mongoose BEFORE any models are loaded
// This must be the first thing that happens
mongoose.set('bufferCommands', false);
mongoose.set('strictQuery', false);

module.exports = mongoose;
