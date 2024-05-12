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
    const author = req.user._id;
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
    const user = await User.findById(note.author);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.notes.push(note);
    //add the coins to the user 10 coins per note
    if(user.coins){
      user.coins+=10;
    }
    else{
      user.coins=10;
    }
    await user.save();

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
  const userId = req.user._id;

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
  const userId = req.user._id;

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
  const userId = req.user._id;

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

const deleteNote = wrapAsync(async (req, res) => {
  try {
    const { noteId } = req.params;

  
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    
    if (note.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized to delete this note" });
    }

    
    await Note.findByIdAndDelete(noteId);

    
    const subject = await Subject.findById(note.subject);
    if (subject) {
      subject.notes = subject.notes.filter((note) => note.toString() !== noteId);
      await subject.save();
    }

    
    await User.updateMany(
      { likedNotes: noteId },
      { $pull: { likedNotes: noteId } }
    );

    return res.status(204).end(); 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting note", error: error.message });
  }
});
const bookMarkNotes = async (req, res) => {
  const { noteId } = req.params;
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.bookMarkedNotes.includes(noteId)) {
      user.bookMarkedNotes = user.bookMarkedNotes.filter(
        (id) => id.toString() !== noteId
      );
      await user.save();
      return res
        .status(200)
        .json({ message: "Note unbookmarked successfully" });
    } else {
      user.bookMarkedNotes.push(noteId);
      await user.save();
      return res.status(200).json({ message: "Note bookmarked successfully" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "error bookmarking notes",
      error: error.message,
    });
  }
};

const getBookMarkedNotesByUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId)
      .populate({
        path: "bookMarkedNotes",
        populate: [{ path: "author" }, { path: "subject" }],
      })
      .select("-password")
      .exec();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user.bookMarkedNotes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error getting bookmarked notes",
      error: error.message,
    });
  }
};

module.exports = {
  searchNotes,
  addNote,
  likeNotes,
  unlikeNotes,
  checkIfLiked,
  deleteNote,
  bookMarkNotes,
  getBookMarkedNotesByUser,
};
