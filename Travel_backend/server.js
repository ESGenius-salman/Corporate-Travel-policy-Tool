/*require("dotenv").config();
require("./modules"); // Load all models

const express = require("express");
const sequelize = require("./config/db");
const cors = require("cors");
const path = require("path");

const app = express();

// Parse JSON
app.use(express.json());

<<<<<<< HEAD
// CORS — allow frontend to call backend
app.use(
  cors({
    origin: "http://localhost:3000", // React frontend URL
=======
// ✅ Serve uploaded files (important for document previews/downloads)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Allow frontend to call API
app.use(
  cors({
    origin: "http://localhost:3000", // Change this if your frontend runs elsewhere
>>>>>>> c0515adaf3727103ed39feb284157780e2c374bc
    credentials: true,
  })
);

// Routes
app.use("/api/travel", require("./routes/travelRoutes"));
app.use("/api/policy", require("./routes/policyRoutes"));
app.use("/api/approval", require("./routes/approvalRoutes"));
app.use("/api/safety", require("./routes/safetyRoutes")); // Safety routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/documents", require("./routes/documentRoutes")); // Document upload/download API
app.use("/api/dashboard", require("./routes/dashboardRoutes"));


<<<<<<< HEAD
// Safety submodules
app.use("/api/safety/alerts", require("./routes/alertRoutes"));
app.use("/api/safety/checkin", require("./routes/checkinRoutes"));
app.use("/api/safety/sos", require("./routes/sosRoutes"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Default route (login page)
=======
// ✅ New safety modules
app.use("/api/safety/alerts", require("./routes/alertRoutes"));     // Alerts CRUD
app.use("/api/safety/checkin", require("./routes/checkinRoutes"));  // Geo-tracking check-ins
app.use("/api/safety/sos", require("./routes/sosRoutes"));          // Emergency SOS

// ✅ Simple health check route (to verify server status)
app.get("/api/healthcheck", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is healthy 🚀" });
});

// ✅ Serve static login page (optional)
>>>>>>> c0515adaf3727103ed39feb284157780e2c374bc
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

<<<<<<< HEAD
// Start server
=======
// ✅ Start the server and sync the database
>>>>>>> c0515adaf3727103ed39feb284157780e2c374bc
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
  */

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
    origin: "http://localhost:3000", // React frontend
    credentials: true,
  })
);

// =======================
// Import Routes
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
const dashboardRoutes = require("./routes/dashboardRoutes"); // ✅ Added this line

// =======================
// Mount Routes
// =======================

// Safety
app.use("/api/safety", safetyRoutes);
app.use("/api/safety/alerts", alertRoutes);
app.use("/api/safety/checkin", checkinRoutes);
app.use("/api/safety/sos", sosRoutes);

// Dashboard
app.use("/api/dashboard", dashboardRoutes); // ✅ Now properly mounted

// Core routes
app.use("/api/travel", travelRoutes);
app.use("/api/policy", policyRoutes);
app.use("/api/approval", approvalRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);

// =======================
// Static Files
// =======================
app.use(express.static(path.join(__dirname, "public")));

// Default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// =======================
// Start Server
// =======================
const PORT = process.env.PORT || 5000;

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("✅ Database connected & synced");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Database sync failed:", err);
  });
