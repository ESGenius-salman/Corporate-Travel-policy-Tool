// routes/approvalRoutes.js
const express = require("express");
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
