const Router = require("express");
const {
  loginUser,
  registerUser,
  logoutUser,
  checkUsername,
  getUser,
} = require("../controllers/user.controller");

const router = Router();

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/logout").post(logoutUser);
router.route("/checkusername").post(checkUsername);
router.route("/get").get(getUser);

module.exports = router;
