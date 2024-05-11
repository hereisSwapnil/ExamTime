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
    coins:{
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
