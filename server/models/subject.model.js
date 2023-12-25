import mongoose, { Schema } from "mongoose";

const subjectSchema = new Schema(
  {
    subjectName: {
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

const Subject = mongoose.model("Subject", subjectSchema);

export default Subject;
