// routes/approvalRoutes.js
const express = require("express");
const router = express.Router();

const {
  approveRequest,
  getMyApprovals,
  getAllApprovals,
} = require("../controllers/approvalController");

const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

router.post(
  "/approve",
  authMiddleware,
  roleMiddleware(["manager", "admin"]),
  approveRequest
);

router.get(
  "/my",
  authMiddleware,
  roleMiddleware(["manager", "admin"]),
  getMyApprovals
);

router.get(
  "/all",
  authMiddleware,
  roleMiddleware(["admin"]),
  getAllApprovals
);

module.exports = router;
