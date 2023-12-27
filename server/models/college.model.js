const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const collegeSchema = new Schema(
  {
    collegeName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
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

const College = mongoose.model("College", collegeSchema);

module.exports = College;
