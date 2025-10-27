// routes/policyRoutes.js
const express = require("express");
const router = express.Router();

const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");
const policyController = require("../controllers/policyController");

//  Create a new policy (Admin only)
router.post("/", authMiddleware, roleMiddleware(["admin"]), policyController.createPolicy);

//  Get all policies
router.get("/", authMiddleware, policyController.getPolicies);

//  Get single policy by ID
router.get("/:id", authMiddleware, policyController.getPolicyById);

//  Update policy (Admin only)
router.put("/:id", authMiddleware, roleMiddleware(["admin"]), policyController.updatePolicy);

//  Delete policy (Admin only)
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), policyController.deletePolicy);

module.exports = router;
