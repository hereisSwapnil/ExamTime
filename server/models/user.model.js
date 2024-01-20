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
    // fullname: {
    //   type: String,
    //   trim: true,
    // },
    // firstName: {
    //   type: String,
    //   trim: true,
    // },
    // lastName: {
    //   type: String,
    //   trim: true,
    // },
    userPhoto: {
      type: String,
    },
    notes: [
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

const User = mongoose.model("User", userSchema);

module.exports = User;
