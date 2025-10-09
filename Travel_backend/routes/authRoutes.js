// routes/authRoutes.js
const express = require("express");
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
