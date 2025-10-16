// routes/travelRoutes.js
/*const express = require("express");
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

module.exports = router;*/

// routes/travelRoutes.js
// routes/travelRoutes.js
const express = require("express");
const router = express.Router();

const {
  createTravelRequest,
  getMyTravelRequests,
  getAllTravelRequests,
} = require("../controllers/travelController");

// ✅ Correct middleware imports
//const authMiddleware = require("../middleware/authMiddleware");
//const roleMiddleware = require("../middleware/roleMiddleware");
const { authMiddleware } = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");


// =======================
// Employee routes
// =======================

// Create a new travel request (Employee)
router.post("/", authMiddleware, roleMiddleware(["employee"]), createTravelRequest);

// Get only logged-in employee's travel requests
router.get("/my", authMiddleware, roleMiddleware(["employee"]), getMyTravelRequests);

// =======================
// Admin/Manager routes
// =======================

// Get all travel requests
router.get("/all", authMiddleware, roleMiddleware(["admin", "manager"]), getAllTravelRequests);

module.exports = router;
