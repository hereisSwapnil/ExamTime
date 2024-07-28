const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
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
    },
    googleId: {
      type: String,
    },
    otp: {
      code: {
        type: Number,
      },
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
    bookMarkedNotes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Note",
      },
    ],
    coins: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual to calculate OTP expiration time (5 minutes)
userSchema.virtual("otp.expiresAt").get(function () {
  return new Date(this.otp.createdAt.getTime() + 5 * 60 * 1000); // Adding 5 minutes to the createdAt timestamp
});

// Method to create token
userSchema.methods.createToken = function() {
  return jwt.sign({ _id: this._id, email: this.email, isverified: this.isverified }, process.env.SECRET, {
    expiresIn: "365d",
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
