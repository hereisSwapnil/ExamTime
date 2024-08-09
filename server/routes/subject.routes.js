const Router = require("express");
const {
  addSubject,
  getSubjects,
  getMatchingSubjects,
  getNotesBySubject,
} = require("../controllers/subject.controller");

const router = Router();

router.post("/", addSubject);
router.get("/", getSubjects);
router.get("/match", getMatchingSubjects);
router.get("/notes/:subjectId", getNotesBySubject);

module.exports = router;
