const Router = require("express");
const {
  getRequests,
  addRequest,
  deleteRequest
} = require("../controllers/request.controller.js");
const verifyToken = require("../middlewares/verifyToken.js");

const router = Router();

router.post("/", verifyToken, addRequest);
router.get("/", verifyToken, getRequests);
router.delete("/delete/:requestId", verifyToken, deleteRequest);

module.exports = router;
