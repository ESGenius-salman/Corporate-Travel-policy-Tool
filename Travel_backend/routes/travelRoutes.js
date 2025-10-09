// routes/travelRoutes.js
const express = require("express");
const {
  createTravelRequest,
  getMyTravelRequests,
  getAllTravelRequests,
} = require("../controllers/travelController");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Employee submits a new travel request
router.post("/request", authMiddleware, roleMiddleware(["employee"]), createTravelRequest);

// Employee views their own travel requests
router.get("/my-requests", authMiddleware, roleMiddleware(["employee"]), getMyTravelRequests);

// Admin/Manager view all travel requests
router.get("/all", authMiddleware, roleMiddleware(["admin", "manager"]), getAllTravelRequests);

module.exports = router;
