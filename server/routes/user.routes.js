import { Router } from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  checkUsername,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/logout").post(logoutUser);
router.route("/checkusername").post(checkUsername);

export default router;
