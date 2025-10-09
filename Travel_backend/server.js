require("dotenv").config();
require("./modules"); // Load models
const express = require("express");
const sequelize = require("./config/db");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(express.json());

// Serve uploaded files (static)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Serve static files (for login.html)
app.use(express.static(path.join(__dirname, "public")));

// Allow frontend (React/Next.js) to call API
app.use(
  cors({
    origin: "http://localhost:3000", // change to your frontend URL
    credentials: true,
  })
);

// ✅ Existing API Routes
app.use("/api/travel", require("./routes/travelRoutes"));
app.use("/api/policy", require("./routes/policyRoutes"));
app.use("/api/approval", require("./routes/approvalRoutes"));
app.use("/api/safety", require("./routes/safetyRoutes")); // Existing safety routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/documents", require("./routes/documentRoutes"));

// ✅ Health & Safety Route
app.use("/api/healthsafety", require("./routes/healthSafetyRoutes"));

// ✅ Alerts, Check-in, SOS Routes
app.use("/api/safety/alerts", require("./routes/alertRoutes")); // Alerts CRUD
app.use("/api/safety/checkin", require("./routes/checkinRoutes")); // Geo-tracking check-ins
app.use("/api/safety/sos", require("./routes/sosRoutes")); // Emergency SOS

// Serve login page at root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Start server and sync DB
const PORT = process.env.PORT || 5000;
sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`✅ Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ Database sync failed:", err);
  });
