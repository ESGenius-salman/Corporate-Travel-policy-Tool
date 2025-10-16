const express = require("express");
const router = express.Router();
const safetyController = require("../controllers/safetyController");

// Alerts
router.post("/alerts", safetyController.createAlert);

// Check-in
router.post("/check-in", safetyController.checkIn);

// Upload Documents
router.post("/documents", safetyController.uploadDocument);

// Risk Ratings
router.post("/risk", safetyController.createRisk);
router.get("/risk", safetyController.getRisks);

// Emergency Contacts
router.post("/emergency", safetyController.createEmergency);

// Travel Insurance
router.post("/insurance", safetyController.createTravelInsurance);

module.exports = router;
