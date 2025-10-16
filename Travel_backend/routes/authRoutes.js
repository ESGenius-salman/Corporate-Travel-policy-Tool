// routes/authRoutes.js
/*const express = require("express");
const { register, login, getMe } = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Register new user
router.post("/register", register);

// Login
router.post("/login", login);

// Get logged-in user (requires token)
router.get("/me", authMiddleware, getMe);

module.exports = router;
*/
const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserProfile,
  getAllUsers,
} = require("../controllers/authController");

const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

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
