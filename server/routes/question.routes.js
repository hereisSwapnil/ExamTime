const Router = require("express");
const {
    askQuestion,
    getQuestion,
    deleteQuestion
} = require("../controllers/question.controller.js");
const verifyToken = require("../middlewares/verifyToken.js");

const router = Router();

router.post("/", verifyToken, askQuestion);
router.get("/", verifyToken, getQuestion);
router.delete("/delete/:questionId", verifyToken, deleteQuestion);

module.exports = router;
