const Router = require("express");
const {
  loginUser,
  registerUser,
  checkUsername,
  getUser,
  verifyOtp,
  getLeaderBoard
} = require("../controllers/user.controller");

const router = Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/verifyOtp", verifyOtp);
router.get("/checkusername/:username", checkUsername);
router.get("/get", getUser);
router.get("/leaderboard", getLeaderBoard);

module.exports = router;
