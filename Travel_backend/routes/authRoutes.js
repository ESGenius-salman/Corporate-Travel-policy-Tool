// routes/authRoutes.js
const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserProfile,
  getAllUsers,
} = require("../controllers/authController");

// ✅ FIXED IMPORTS
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// =======================
// Auth routes
// =======================

// Register a new user
router.post("/register", registerUser);
router.post("/login", loginUser);

// Get logged-in user's profile
router.get("/me", authMiddleware, getUserProfile);

// Admin can view all users
router.get("/all", authMiddleware, roleMiddleware(["admin"]), getAllUsers);

module.exports = router;
