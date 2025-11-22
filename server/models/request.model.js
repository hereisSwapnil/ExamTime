const mongoose = require("../db/mongoose.js");
const Schema = mongoose.Schema;

const requestSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
