const express = require("express");
const router = express.Router();
const  verifyToken = require("../middlewares/verifyToken");
const {submitFeedback,getFeedback} = require("../controllers/feedback.controller");

router.get("/get",verifyToken,getFeedback);
router.post("/create",verifyToken, submitFeedback);

module.exports = router;