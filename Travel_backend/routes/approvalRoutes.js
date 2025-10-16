// routes/approvalRoutes.js
/*const express = require("express");
const { approveRequest, getMyApprovals, getAllApprovals } = require("../controllers/approvalController");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Manager/Admin can approve/reject
router.post("/", authMiddleware, roleMiddleware(["manager", "admin"]), approveRequest);

// Manager/Admin can see only their own approvals
router.get("/my", authMiddleware, roleMiddleware(["manager", "admin"]), getMyApprovals);

// Admin can view ALL approvals
router.get("/all", authMiddleware, roleMiddleware(["admin"]), getAllApprovals);

module.exports = router;
*/

// routes/approvalRoutes.js
const express = require("express");
const router = express.Router();

// ✅ Import controller functions
const {
  approveRequest,
  getMyApprovals,
  getAllApprovals
} = require("../controllers/approvalController");

// ✅ Import authentication middleware
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

// ✅ Route 1: Manager/Admin can approve or reject a request
router.post(
  "/approve",
  authMiddleware,
  roleMiddleware(["manager", "admin"]),
  approveRequest
);

// ✅ Route 2: Manager/Admin can view only their approvals
router.get(
  "/my",
  authMiddleware,
  roleMiddleware(["manager", "admin"]),
  getMyApprovals
);

// ✅ Route 3: Admin can view all approvals
router.get(
  "/all",
  authMiddleware,
  roleMiddleware(["admin"]),
  getAllApprovals
);

module.exports = router;
