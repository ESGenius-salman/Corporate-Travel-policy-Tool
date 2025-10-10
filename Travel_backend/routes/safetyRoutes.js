const express = require("express");
const router = express.Router();
const safetyController = require("../controllers/safetyController");

// Alerts
router.post("/alerts", safetyController.createAlert);

// Check-ins
router.post("/check-in", safetyController.checkIn);

// Documents
router.post("/documents", safetyController.uploadDocument);

// Risk Ratings
router.post("/risk", safetyController.createRisk);

// Emergency Contacts
router.post("/emergency", safetyController.createEmergency);

// Travel Insurance
router.post("/travel-insurance", safetyController.createTravelInsurance);

module.exports = router;
