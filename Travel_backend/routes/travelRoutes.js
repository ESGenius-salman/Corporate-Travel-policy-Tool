const express = require("express");
const router = express.Router();
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");
const {
  createTravelRequest,
  getMyTravelRequests,
  getAllTravelRequests,
  updateTravelStatus,
} = require("../controllers/travelController");

// Employee submits a new travel request
router.post("/", authMiddleware, roleMiddleware(["employee"]), createTravelRequest);

// Employee views their own requests
router.get("/my", authMiddleware, roleMiddleware(["employee"]), getMyTravelRequests);

// Admin/Manager views all travel requests
router.get("/", authMiddleware, roleMiddleware(["admin", "manager"]), getAllTravelRequests);

// Admin/Manager updates travel status
router.put("/:id/status", authMiddleware, roleMiddleware(["admin", "manager"]), updateTravelStatus);

module.exports = router;
