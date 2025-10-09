const express = require("express");
const router = express.Router();
const safetyController = require("../controllers/safetyController");

// Send alert / push notification
router.post("/alert", safetyController.createAlert);

// Employee check-in
router.post("/checkin", safetyController.checkIn);

// Upload documents
router.post("/document", safetyController.uploadDocument);

module.exports = router;
