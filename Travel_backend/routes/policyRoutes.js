

// routes/policyRoutes.js
const express = require("express");
const {
  createPolicy,
  getPolicies,
  getPolicyById,
  updatePolicy,
  deletePolicy,
} = require("../controllers/policyController");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();
// CRUD routes
router.post("/create", authMiddleware, roleMiddleware(["admin"]), createPolicy);
router.get("/list", authMiddleware, getPolicies);
router.get("/:id", authMiddleware, getPolicyById);
router.put("/:id", authMiddleware, roleMiddleware(["admin"]), updatePolicy);
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), deletePolicy);

module.exports = router;