require("dotenv").config();
require("./modules");
const express = require("express");
const sequelize = require("./config/db");
const cors = require("cors");

const app = express();
app.use(express.json());

// Allow frontend to call API
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// ✅ API Routes
app.use("/api/travel", require("./routes/travelRoutes"));
app.use("/api/policy", require("./routes/policyRoutes"));
app.use("/api/approval", require("./routes/approvalRoutes"));
app.use("/api/safety", require("./routes/safetyRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/documents", require("./routes/documentRoutes"));

// ✅ New Health & Safety Route
app.use("/api/healthsafety", require("./routes/healthSafetyRoutes"));

// Serve login page at root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Start server and sync DB
const PORT = process.env.PORT || 5000;
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database connected & synced");
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Database sync failed:", err);
  });
