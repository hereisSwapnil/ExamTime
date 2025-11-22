const mongoose = require("../db/mongoose.js");

const passwordResetSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // Document will be removed after 300 seconds
  },
});

const ResetPassword = mongoose.model("ResetPassword", passwordResetSchema);

module.exports = ResetPassword;
