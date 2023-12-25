import { Router } from "express";
import { addSubject, getSubjects } from "../controllers/subject.controller.js";

const router = Router();

router.post("/", addSubject);
router.get("/", getSubjects);

export default router;
