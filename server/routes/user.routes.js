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
  verifyOtp,
  getLeaderBoard,
  sendOTPcon,
} = require("../controllers/user.controller");

const router = Router();

router.get("/", verifyToken, searchNotes);
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/verifyOtp", verifyToken, verifyOtp);
router.get("/logout", logoutUser);
router.get("/checkusername/:username", checkUsername);
router.get("/get", getUser);
router.get("/leaderboard", getLeaderBoard);
router.post("/sendotp", verifyToken, sendOTPcon);

module.exports = router;
