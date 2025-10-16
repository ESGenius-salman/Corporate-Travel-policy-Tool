// routes/dashboardRoutes.js
const express = require("express");
const router = express.Router();
const { Trip, Expense, Alert, ESGRecord } = require("../modules"); // replace with your actual models
const { authMiddleware } = require("../middleware/authMiddleware");
 // optional auth middleware

// Helper functions to calculate ESG, CO2, budget
async function getESGScore(userId) {
  const records = await ESGRecord.findAll({ where: { userId } });
  if (!records.length) return 0;
  const total = records.reduce((sum, rec) => sum + rec.score, 0);
  return Math.round(total / records.length);
}

async function getCO2ThisMonth(userId) {
  const records = await Trip.findAll({
    where: { userId, createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } }
  });
  return records.reduce((sum, trip) => sum + (trip.co2 || 0), 0);
}

async function getBudgetUsed(userId) {
  const expenses = await Expense.findAll({ where: { userId } });
  return expenses.reduce((sum, e) => sum + e.amount, 0);
}

async function getRecentActivity(userId) {
  const trips = await Trip.findAll({
    where: { userId },
    order: [["updatedAt", "DESC"]],
    limit: 5
  });

  const expenses = await Expense.findAll({
    where: { userId },
    order: [["updatedAt", "DESC"]],
    limit: 5
  });

  // Merge and sort by date
  const activities = [
    ...trips.map(t => ({ action: `Trip to ${t.destination} ${t.status}`, date: t.updatedAt, status: t.status })),
    ...expenses.map(e => ({ action: `Expense ${e.status}`, date: e.updatedAt, status: e.status }))
  ];

  activities.sort((a, b) => new Date(b.date) - new Date(a.date));
  return activities.slice(0, 5);
}

// Dashboard route
router.get("/", authMiddleware, async (req, res) => {

  try {
    const userId = req.user.id;

    const activeTrips = await Trip.count({ where: { userId, status: "active" } });
    const pendingExpenses = await Expense.sum("amount", { where: { userId, status: "pending" } }) || 0;
    const alerts = await Alert.count({ where: { userId, seen: false } });

    const esgScore = await getESGScore(userId);
    const co2ThisMonth = await getCO2ThisMonth(userId);
    const budgetUsed = await getBudgetUsed(userId);
    const recentActivity = await getRecentActivity(userId);

    const quickActions = [
      { title: "New Trip Request", path: "/trip-request", icon: "✈️", color: "#3498db" },
      { title: "View Itinerary", path: "/itinerary", icon: "📋", color: "#27ae60" },
      { title: "Safety Checklist", path: "/safety", icon: "✅", color: "#f39c12" },
      { title: "Upload Expenses", path: "/expenses", icon: "💰", color: "#9b59b6" },
      { title: "ESG Tracking", path: "/esg-tracking", icon: "🌱", color: "#10b981" },
      { title: "Trip History", path: "/trip-history", icon: "📊", color: "#8b5cf6" }
    ];

    res.json({
      quickActions,
      recentActivity,
      stats: {
        activeTrips,
        pendingExpenses,
        alerts,
        esgScore,
        co2ThisMonth,
        budgetUsed
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch dashboard data" });
  }
});

module.exports = router;
