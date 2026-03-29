const express = require("express");
const router = express.Router();
const { getDashboardStats, getAllUsers } = require("../controllers/adminController");
const { protect, allowRoles } = require("../middleware/authMiddleware");

router.use(protect);
router.use(allowRoles("admin"));
router.get("/stats", getDashboardStats);
router.get("/users", getAllUsers);

module.exports = router;