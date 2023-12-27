const Router = require("express");
const {
  getColleges,
  addCollege,
  getNotesByCollege,
} = require("../controllers/college.controller.js");

const router = Router();

router.post("/", addCollege);
router.get("/", getColleges);
router.get("/:collegeId", getNotesByCollege);

module.exports = router;
