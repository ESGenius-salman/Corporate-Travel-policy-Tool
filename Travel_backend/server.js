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
require("./modules"); // Load all models

const express = require("express");
const sequelize = require("./config/db");
const cors = require("cors");
const path = require("path");

const app = express();

// Parse JSON
app.use(express.json());

// CORS — allow frontend to call backend
app.use(
  cors({
    origin: "http://localhost:3000", // React frontend URL
    credentials: true,
  })
);

// =======================
// ROUTES
// =======================

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

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Default route (login page)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// =======================
// START SERVER
// =======================
const PORT = process.env.PORT || 3001;

sequelize
  .sync({ alter: true }) // Keep DB in sync
  .then(() => {
    console.log("✅ Database connected & synced");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Database sync failed:", err);
  });
