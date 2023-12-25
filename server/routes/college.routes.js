import { Router } from "express";
import { addCollege, getColleges } from "../controllers/college.controller.js";

const router = Router();

router.post("/", addCollege);
router.get("/", getColleges);

export default router;
