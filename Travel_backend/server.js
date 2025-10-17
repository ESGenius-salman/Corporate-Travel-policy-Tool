require("dotenv").config();
require("./modules"); // Load all Sequelize models

const express = require("express");
const sequelize = require("./config/db");
const cors = require("cors");
const path = require("path");

const app = express();

// =======================
// Middleware
// =======================
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // React frontend (change if deployed)
    credentials: true,
  })
);

// Serve uploaded and static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "public")));

// =======================
// Routes Import
// =======================
const safetyRoutes = require("./routes/safetyRoutes");
const alertRoutes = require("./routes/alertRoutes");
const checkinRoutes = require("./routes/checkinRoutes");
const sosRoutes = require("./routes/sosRoutes");
const travelRoutes = require("./routes/travelRoutes");
const policyRoutes = require("./routes/policyRoutes");
const approvalRoutes = require("./routes/approvalRoutes");
const authRoutes = require("./routes/authRoutes");
const documentRoutes = require("./routes/documentRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

// =======================
// Health Check (new)
// =======================
app.get("/api/healthcheck", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is healthy 🚀" });
});

// =======================
// Mount Routes
// =======================

// Safety
app.use("/api/safety", safetyRoutes);
app.use("/api/safety/alerts", alertRoutes);
app.use("/api/safety/checkin", checkinRoutes);
app.use("/api/safety/sos", sosRoutes);

// Dashboard
app.use("/api/dashboard", dashboardRoutes);

// Core routes
app.use("/api/travel", travelRoutes);
app.use("/api/policy", policyRoutes);
app.use("/api/approval", approvalRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);

// =======================
// Default Route (Login page)
// =======================
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// =======================
// Start Server
// =======================
const PORT = process.env.PORT || 5000;

sequelize
  .sync({ alter: true }) // Keep DB schema updated
  .then(() => {
    console.log("✅ Database connected & synced");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ Database sync failed:", err);
  });
