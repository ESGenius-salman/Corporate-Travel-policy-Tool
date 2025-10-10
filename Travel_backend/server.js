require("dotenv").config();
require("./modules"); // Load models

const express = require("express");
const sequelize = require("./config/db");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());

// ✅ Allow frontend to call API
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// ✅ Core Routes
app.use("/api/travel", require("./routes/travelRoutes"));
app.use("/api/policy", require("./routes/policyRoutes"));
app.use("/api/approval", require("./routes/approvalRoutes"));
app.use("/api/safety", require("./routes/safetyRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/documents", require("./routes/documentRoutes"));

// ✅ New safety modules
app.use("/api/safety/alerts", require("./routes/alertRoutes")); // Alerts CRUD
app.use("/api/safety/checkin", require("./routes/checkinRoutes")); // Geo-tracking check-ins
app.use("/api/safety/sos", require("./routes/sosRoutes")); // Emergency SOS

// ✅ Remove old Health & Safety route (now merged into safety)
 // ❌ No longer needed: app.use("/api/healthsafety", require("./routes/healthSafetyRoutes"));

// ✅ Serve login page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// ✅ Start server
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
s