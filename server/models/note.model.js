const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
      default:
        "https://www.umass.edu/studentsuccess/sites/default/files/inline-images/cornell-note-taking-strategy.jpg",
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
    url: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
