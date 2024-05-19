const Router = require("express");
const Note = require("../models/note.model.js");
const {
  searchNotes,
  addNote,
  likeNotes,
  unlikeNotes,
  checkIfLiked,
  bookMarkNotes,
  getBookMarkedNotesByUser,
  getSpecificNotesController,
  getFormatedNote,
  getNoteByID
} = require("../controllers/note.controller.js");
const verifyToken = require("../middlewares/verifyToken.js");

const router = Router();
//----------------------------------//put all the details and get specific notes
router.get(
  "/notes/:stream/:course/:year/:semester/:subject",
  verifyToken,
  getSpecificNotesController
);
//-----------------------------------//get formated note
router.get("/formatedNote", verifyToken, getFormatedNote);
//-------------------------------
router.post("/", verifyToken, addNote);
router.get("/", verifyToken, searchNotes);
router.get("/like/:noteId", verifyToken, likeNotes);
router.get("/unlike/:noteId", verifyToken, unlikeNotes);
router.get("/checklike/:noteId", verifyToken, checkIfLiked);
router.post("/bookmark/:noteId", verifyToken, bookMarkNotes);
router.get("/bookmarks", verifyToken, getBookMarkedNotesByUser);
router.get("/:id",getNoteByID)

module.exports = router;
