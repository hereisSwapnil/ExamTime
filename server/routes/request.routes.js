const Router = require("express");
const {
  getRequests,
  addRequest,
} = require("../controllers/request.controller.js");
const verifyToken = require("../middlewares/verifyToken.js");

const router = Router();

router.post("/", verifyToken, addRequest);
router.get("/", verifyToken, getRequests);

module.exports = router;
