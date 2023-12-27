const Router = require("express");
const {
  addSubject,
  getSubjects,
  getNotesBySubject,
} = require("../controllers/subject.controller");
const { getNotes } = require("../controllers/college.controller");

const router = Router();

router.post("/", addSubject);
router.get("/", getSubjects);
router.get("/:subjectId", getNotesBySubject);

module.exports = router;
