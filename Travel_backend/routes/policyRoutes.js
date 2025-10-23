const express = require("express");
const router = express.Router();
const {
  createPolicy,
  getPolicies,
  getPolicyById,
  updatePolicy,
  deletePolicy,
} = require("../controllers/policyController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// CRUD routes
router.post("/create", authMiddleware, roleMiddleware(["admin"]), createPolicy);
router.get("/list", authMiddleware, getPolicies);
router.get("/:id", authMiddleware, getPolicyById);
router.put("/:id", authMiddleware, roleMiddleware(["admin"]), updatePolicy);
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), deletePolicy);

module.exports = router;
