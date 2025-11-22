const Router = require("express");
const {
  searchNotes,
  addNote,
  likeNotes,
  unlikeNotes,
  checkIfLiked,
} = require("../controllers/note.controller.js");
const verifyToken = require("../middlewares/verifyToken.js");
const checkDBConnection = require("../middlewares/checkDBConnection.js");
const {
  loginUser,
  registerUser,
  logoutUser,
  checkUsername,
  getUser,
  verifyOtp,
  getLeaderBoard,
  sendOTPcon,
  forgetPassword,
  vefifyPasswordOtp,
  updatePassword,
  googleAuth,
  updateProfile,
  updateSettings,
} = require("../controllers/user.controller");

const router = Router();

// Apply database connection check to all routes
router.use(checkDBConnection);

router.get("/", verifyToken, searchNotes);
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/verifyOtp", verifyToken, verifyOtp);
router.get("/logout", logoutUser);
router.get("/checkusername/:username", checkUsername);
router.get("/get", getUser);
router.get("/leaderboard", getLeaderBoard);
router.get("/sendotp", verifyToken, sendOTPcon);
router.post("/forget-password", forgetPassword);
router.post("/vefify-password-otp", vefifyPasswordOtp);
router.post("/update-password", updatePassword);
router.post("/google-auth", googleAuth);
router.put("/profile", verifyToken, updateProfile);
router.put("/settings", verifyToken, updateSettings);

module.exports = router;
