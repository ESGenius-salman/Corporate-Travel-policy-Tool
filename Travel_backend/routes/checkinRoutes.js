/*const express = require("express");
const router = express.Router();
const CheckIn = require("../modules/safety/checkin.model");
const Alert = require("../modules/safety/alert.model");

// Add new check-in
router.post("/", async (req, res) => {
  try {
    const { travelId, location } = req.body;

    // Create check-in entry
    const checkin = await CheckIn.create({
      travelId,
      location: location || "Current Location",
      status: "safe",
    });

    // Automatically create success alert
    await Alert.create({
      travelId,
      alertType: "success",
      message: "Your safe location has been recorded and shared with your team.",
    });

    res.json(checkin);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get recent check-ins (latest 10)
router.get("/", async (req, res) => {
  try {
    const checkins = await CheckIn.findAll({
      order: [["createdAt", "DESC"]],
      limit: 10,
    });
    res.json(checkins);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
*/
const express = require("express");
const router = express.Router();
const CheckIn = require("../modules/safety/checkin.model");
const Alert = require("../modules/safety/alert.model");

// Add new check-in
router.post("/", async (req, res) => {
  try {
    const { travelId, location } = req.body;
    const checkin = await CheckIn.create({
      travelId,
      location: location || "Current Location",
      status: "safe",
    });

    await Alert.create({
      travelId,
      alertType: "success",
      message:
        "Your safe location has been recorded and shared with your team.",
    });

    res.json(checkin);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get recent check-ins
router.get("/", async (req, res) => {
  try {
    const checkins = await CheckIn.findAll({
      order: [["createdAt", "DESC"]],
      limit: 10,
    });
    res.json(checkins);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
