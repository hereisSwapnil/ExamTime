const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: true,
    },
    otp: {
      code: {
        type: Number,
      }
    },
    isverified: {
      type: Boolean,
      default: false,
    },
    userPhoto: {
      type: String,
    },
    notes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Note",
      },
    ],
    likedNotes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Note",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Virtual to calculate OTP expiration time (5 minutes)
userSchema.virtual("otp.expiresAt").get(function () {
  return new Date(this.otp.createdAt.getTime() + 5 * 60 * 1000); // Adding 5 minutes to the createdAt timestamp
});

const User = mongoose.model("User", userSchema);

module.exports = User;
