/*const express = require("express");
const router = express.Router();
const SOS = require("../modules/safety/sos.model");
const Alert = require("../modules/safety/alert.model");

// Trigger SOS alert
router.post("/", async (req, res) => {
  try {
    const { travelId, location } = req.body;

    // Create SOS entry
    const sos = await SOS.create({
      travelId,
      location: location || "Current Location",
      status: "emergency",
    });

    // Automatically create urgent alert
    await Alert.create({
      travelId,
      alertType: "urgent",
      message:
        "Emergency services and your emergency contacts have been notified. Help is on the way. Stay safe!",
    });

    res.json(sos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get recent SOS history (latest 10)
router.get("/", async (req, res) => {
  try {
    const sosLogs = await SOS.findAll({
      order: [["createdAt", "DESC"]],
      limit: 10,
    });
    res.json(sosLogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
*/
const express = require("express");
const router = express.Router();
const SOS = require("../modules/safety/sos.model");
const Alert = require("../modules/safety/alert.model");

// Trigger SOS alert
router.post("/", async (req, res) => {
  try {
    const { travelId, location } = req.body;
    const sos = await SOS.create({
      travelId,
      location: location || "Current Location",
      status: "emergency",
    });

    await Alert.create({
      travelId,
      alertType: "urgent",
      message:
        "Emergency services and your emergency contacts have been notified. Help is on the way. Stay safe!",
    });

    res.json(sos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get recent SOS history (latest 10)
router.get("/", async (req, res) => {
  try {
    const sosLogs = await SOS.findAll({
      order: [["createdAt", "DESC"]],
      limit: 10,
    });
    res.json(sosLogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
