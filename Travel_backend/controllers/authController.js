// controllers/authController.js
/*const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../modules");

// Register new user
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, department } = req.body;

    // check if email exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "employee",
      department,
    });

    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // ✅ Include "name" in JWT payload
    const token = jwt.sign(
      { id: user.id, role: user.role, name: user.name },
      process.env.JWT_SECRET || "supersecretkey",
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: { id: user.id, name: user.name, role: user.role }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get logged-in user info
exports.getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] }, // hide password
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("GetMe error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
*/

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//const { Users } = require("../modules"); // ✅ modules folder
const { User: Users } = require("../modules");


// =======================
// Register user
// =======================
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Users.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("❌ Registration Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// =======================
// Login user
// =======================
const loginUser = async (req, res) => {
  try {
    console.log("📩 Incoming login data:", req.body);

    const { email, password } = req.body;

    // Step 1: Check if email and password are provided
    if (!email || !password) {
      console.log("⚠️ Missing email or password");
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Step 2: Find user
    const user = await Users.findOne({ where: { email } });
    console.log("👤 User found:", user ? user.email : "No user found");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Step 3: Compare passwords
    console.log("🔐 Comparing passwords...");
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("✅ Password match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Step 4: Check JWT secret
    if (!process.env.JWT_SECRET) {
      console.error("❌ Missing JWT_SECRET in .env");
      return res.status(500).json({ message: "JWT secret missing in environment" });
    }

    // Step 5: Generate token
    /*const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );*/
    const token = jwt.sign(
  { id: user.id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '7d' } // valid for 7 days
);



    console.log("🎟️ Token generated successfully");

    // Step 6: Respond success
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// =======================
// Get user profile
// =======================
const getUserProfile = async (req, res) => {
  try {
    const user = await Users.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Error in getUserProfile:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// =======================
// Admin: Get all users
// =======================
const getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    res.json(users);
  } catch (err) {
    console.error("Error in getAllUsers:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// =======================
// Export controllers
// =======================
module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  getAllUsers,
};
