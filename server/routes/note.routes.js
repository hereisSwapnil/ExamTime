const Router = require("express");
const {
  searchNotes,
  addNote,
  likeNotes,
  unlikeNotes,
  checkIfLiked,
  bookMarkNotes,
  getBookMarkedNotesByUser,
} = require("../controllers/note.controller.js");
const verifyToken = require("../middlewares/verifyToken.js");

const router = Router();

router.post("/", verifyToken, addNote);
router.get("/", verifyToken, searchNotes);
router.get("/like/:noteId", verifyToken, likeNotes);
router.get("/unlike/:noteId", verifyToken, unlikeNotes);
router.get("/checklike/:noteId", verifyToken, checkIfLiked);
router.post("/bookmark/:noteId", verifyToken, bookMarkNotes);
router.get("/bookmarks", verifyToken, getBookMarkedNotesByUser);

module.exports = router;
