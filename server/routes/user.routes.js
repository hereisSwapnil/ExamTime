const Router = require("express");
const {
  searchNotes,
  addNote,
  likeNotes,
  unlikeNotes,
  checkIfLiked,
} = require("../controllers/note.controller.js");
const verifyToken = require("../middlewares/verifyToken.js");
const {
  loginUser,
  registerUser,
  logoutUser,
  checkUsername,
  getUser,
} = require("../controllers/user.controller");

const router = Router();

router.get('/',verifyToken,searchNotes);
router.post("/login", loginUser);
router.post("/register", registerUser);
router.get('/logout',logoutUser);
router.get("/checkusername/:username", checkUsername);
router.get("/get", getUser);

module.exports = router;
