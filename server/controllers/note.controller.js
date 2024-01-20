const wrapAsync = require("../utils/wrapAsync.js");
const Subject = require("../models/subject.model.js");
const Note = require("../models/note.model.js");

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
  console.log(req.file);
  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  try {
    const { title, description, subject, year, course } = req.body;
    const createdBy = req.user;
    if (!title || !description || !subject || !year || !course) {
      return res.status(400).json({ message: "Missing fields" });
    }
    const url = req.file.url;
    const note = await Note.create({
      title,
      description,
      createdBy,
      subject,
      year,
      course,
      url,
    });
    if (!note) {
      return res.status(400).json({ message: "Note not created" });
    }
    const subject_ = await Subject.findById(note.subject);
    if (!subject_) {
      return res.status(404).json({ message: "Subject not found" });
    }
    subject_.notes.push(note);
    await subject_.save();
    res.status(201).json(note);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Could not add notes", error: error.message });
  }
});

module.exports = {
  searchNotesByTitle,
  addNote,
};
