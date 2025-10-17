require("dotenv").config();
require("./modules"); // Load all models

const express = require("express");
const sequelize = require("./config/db");
const cors = require("cors");
const path = require("path");

const app = express();

// =======================
// MIDDLEWARE
// =======================
app.use(express.json());

// CORS — allow frontend to call backend
app.use(
  cors({
    origin: "http://localhost:3000", // Change if your frontend runs elsewhere
    credentials: true,
  })
);

// Serve uploaded files (for documents)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Serve static frontend files (optional)
app.use(express.static(path.join(__dirname, "public")));

// =======================
// ROUTES
// =======================

// Health check
app.get("/api/healthcheck", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is healthy 🚀" });
});

// Safety routes
app.use("/api/safety", require("./routes/safetyRoutes"));

// Safety submodules
app.use("/api/safety/alerts", require("./routes/alertRoutes"));
app.use("/api/safety/checkin", require("./routes/checkinRoutes"));
app.use("/api/safety/sos", require("./routes/sosRoutes"));

// Other routes
app.use("/api/travel", require("./routes/travelRoutes"));
app.use("/api/policy", require("./routes/policyRoutes"));
app.use("/api/approval", require("./routes/approvalRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/documents", require("./routes/documentRoutes"));

// Dashboard route
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

// Default route (login page)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// =======================
// START SERVER
// =======================
const PORT = process.env.PORT || 5000;

sequelize
  .sync({ alter: true }) // Keep DB in sync
  .then(() => {
    console.log("✅ Database connected & synced");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Database sync failed:", err);
  });
