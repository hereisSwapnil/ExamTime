const Router = require("express");
const {
  searchNotesByTitle,
  addNote,
} = require("../controllers/note.controller.js");
const firebaseUpload = require("../middlewares/firebaseUpload.middleware.js");
const multerUpload = require("../middlewares/multer.middleware.js");

const router = Router();

router.post("/add", multerUpload, firebaseUpload, addNote);
router.get("/search", searchNotesByTitle);

module.exports = router;
