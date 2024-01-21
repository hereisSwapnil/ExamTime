const wrapAsync = require("../utils/wrapAsync.js");
const Subject = require("../models/subject.model.js");
const Note = require("../models/note.model.js");
const User = require("../models/user.model.js");

const searchNotes = wrapAsync(async (req, res) => {
  const query = req.query;

  try {
    const searchFilter = {
      title: { $regex: query.search, $options: "i" },
    };
    const notes = await Note.find(query.search ? searchFilter : null)
      .populate("subject")
      .populate("author")
      .exec();
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not get notes by title" });
  }
});

const addNote = wrapAsync(async (req, res) => {
  try {
    const { title, description, subject, year, course, fileUrl } = req.body;
    const author = req.user.id;
    if (!title || !description || !subject || !year || !course || !fileUrl) {
      return res.status(400).json({ message: "Missing fields" });
    }
    const note = await Note.create({
      title,
      description,
      author,
      subject,
      year,
      course,
      fileUrl,
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

const likeNotes = wrapAsync(async (req, res) => {
  const { noteId } = req.params;
  const userId = req.user.id;

  try {
    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    if (note.likedBy.includes(userId)) {
      return res.status(400).json({ error: "Note already liked by the user" });
    }

    note.likedBy.push(userId);
    note.likes += 1;
    await note.save();

    const user = await User.findById(userId);
    user.likedNotes.push(noteId);
    await user.save();

    return res.status(200).json({ message: "Note liked successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "error liking notes", error: error.message });
  }
});

const unlikeNotes = wrapAsync(async (req, res) => {
  const { noteId } = req.params;
  const userId = req.user.id;

  try {
    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    if (!note.likedBy.includes(userId)) {
      return res.status(400).json({ error: "Note not liked by the user" });
    }

    note.likedBy = note.likedBy.filter((id) => id.toString() !== userId);
    note.likes -= 1;
    await note.save();

    const user = await User.findById(userId);
    user.likedNotes = user.likedNotes.filter((id) => id.toString() !== noteId);
    await user.save();

    return res.status(200).json({ message: "Note unliked successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "error unliking notes", error: error.message });
  }
});

const checkIfLiked = wrapAsync(async (req, res) => {
  const { noteId } = req.params;
  const userId = req.user.id;

  try {
    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    const isLiked = note.likedBy.includes(userId);

    return res.status(200).json({ isLiked });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "error checking if post is liked",
      error: error.message,
    });
  }
});

module.exports = {
  searchNotes,
  addNote,
  likeNotes,
  unlikeNotes,
  checkIfLiked,
};
