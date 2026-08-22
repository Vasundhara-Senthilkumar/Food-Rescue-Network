const express = require("express");
const router = express.Router();
const { createRequest, getMyRequests, getRequestsForFood, updateRequestStatus } = require("../controllers/requestController");
const { protect, allowRoles } = require("../middleware/authMiddleware");

router.use(protect);
router.get("/my", getMyRequests);
router.get("/food/:foodId", allowRoles("provider"), getRequestsForFood);
router.post("/", allowRoles("ngo"), createRequest);
router.put("/:id/status", updateRequestStatus);

module.exports = router;
