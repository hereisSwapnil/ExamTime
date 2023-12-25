import wrapAsync from "../utils/wrapAsync.js";
import Note from "../models/note.model.js";
import College from "../models/college.model.js";
import Subject from "../models/subject.model.js";
import uniqueFilename from "unique-filename";
import { uploadFile } from "../utils/firebase.js";

const searchNotesByTitle = wrapAsync(async (req, res) => {
  try {
    const { college } = req.params;
    const notes = await Note.find({ college });
    if (!notes) {
      return res.status(404).json({ message: "Notes not found" });
    }
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not get notes by title" });
  }
});

const addNote = wrapAsync(async (req, res) => {
  console.log(req.body);
  // try {
  //   const { title, description, subject, year, course, college } = req.body;
  //   const createdBy = req.user;
  //   console.log(req.file);
  //   let file_ = await uploadFile(file.path, uniqueFilename());
  //   console.log(file_);
  //   const note = await Note.create({
  //     title,
  //     description,
  //     createdBy,
  //     subject,
  //     year,
  //     course,
  //     college,
  //   });
  //   if (!note) {
  //     return res.status(400).json({ message: "Note not created" });
  //   }
  //   const college_ = await College.findById(note.college);
  //   if (!college_) {
  //     return res.status(404).json({ message: "College not found" });
  //   }
  //   college_.notes.push(note);
  //   await college_.save();
  //   const subject_ = await Subject.findById(note.subject);
  //   if (!subject_) {
  //     return res.status(404).json({ message: "Subject not found" });
  //   }
  //   subject_.notes.push(note);
  //   await subject_.save();
  //   res.status(201).json(note);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ message: "Could not add notes" });
  // }
});

export { searchNotesByTitle, addNote };
