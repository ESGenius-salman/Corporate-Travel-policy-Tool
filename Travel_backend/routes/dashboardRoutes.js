const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

// Routes
router.get("/", dashboardController.getDashboardData);
router.get("/reports", dashboardController.getReports);

module.exports = router;
