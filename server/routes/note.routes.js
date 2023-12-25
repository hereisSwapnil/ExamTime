import { Router } from "express";
import { searchNotesByTitle, addNote } from "../controllers/note.controller.js";

const router = Router();

router.post("/note", addNote);
router.get("/notes/search", searchNotesByTitle);

export default router;
