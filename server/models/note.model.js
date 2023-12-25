import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    thumbnail: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    subject: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
    },
    year: {
      type: Number,
      required: true,
    },
    course: {
      type: String,
      required: true,
      trim: true,
    },
    college: {
      type: Schema.Types.ObjectId,
      ref: "College",
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
