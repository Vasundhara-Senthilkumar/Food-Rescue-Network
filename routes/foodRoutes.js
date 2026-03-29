const express = require("express");
const router = express.Router();
const { addFood, getAllFood, getMyFood, acceptFood, completeFood, deleteFood } = require("../controllers/foodController");
const { protect, allowRoles } = require("../middleware/authMiddleware");

router.use(protect);
router.get("/", getAllFood);
router.get("/my", getMyFood);
router.post("/", allowRoles("provider"), addFood);
router.put("/:id/accept", allowRoles("ngo"), acceptFood);
router.put("/:id/complete", completeFood);
router.delete("/:id", allowRoles("provider"), deleteFood);

module.exports = router;