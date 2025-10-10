const Alert = require("../modules/safety/alert.model");
const Document = require("../modules/safety/document.model");
const Risk = require("../modules/safety/risk.model");
const Emergency = require("../modules/safety/emergency.model");
const TravelInsurance = require("../modules/safety/travelInsurance.model");
const admin = require("../config/firebase");

// Helper: validate required fields
const validateFields = (obj, fields) => {
  const missing = fields.filter(f => obj[f] === undefined || obj[f] === null);
  return missing.length ? missing : null;
};

// Create alert & send push notification
exports.createAlert = async (req, res) => {
  try {
    const { travelId, alertType, message, fcmToken } = req.body;
    const missing = validateFields(req.body, ["travelId", "alertType", "message"]);
    if (missing) return res.status(400).json({ error: `Missing required fields: ${missing.join(", ")}` });

    const alert = await Alert.create({ travelId, alertType, message, notified: !!fcmToken });

    if (fcmToken) {
      try {
        await admin.messaging().send({
          token: fcmToken,
          notification: { title: `Travel Alert: ${alertType}`, body: message }
        });
      } catch (fcmErr) {
        console.error("FCM Error:", fcmErr);
      }
    }
    res.status(201).json(alert);
  } catch (err) {
    console.error("Sequelize Error:", err);
    res.status(500).json({ error: "Failed to create alert" });
  }
};

// Employee check-in for high-risk areas
exports.checkIn = async (req, res) => {
  try {
    const { travelId, latitude, longitude } = req.body;
    const missing = validateFields(req.body, ["travelId", "latitude", "longitude"]);
    if (missing) return res.status(400).json({ error: `Missing required fields: ${missing.join(", ")}` });

    const message = `Employee checked in at Lat:${latitude}, Lng:${longitude}`;
    const alert = await Alert.create({ travelId, alertType: "Check-In", message, notified: false });

    res.status(201).json({ message: "Check-in recorded", alert });
  } catch (err) {
    console.error("Sequelize Error:", err);
    res.status(500).json({ error: "Failed to record check-in" });
  }
};

// Upload travel documents
exports.uploadDocument = async (req, res) => {
  try {
    const { travelId, type, fileUrl, expiryDate } = req.body;
    const missing = validateFields(req.body, ["travelId", "type", "fileUrl"]);
    if (missing) return res.status(400).json({ error: `Missing required fields: ${missing.join(", ")}` });

    const doc = await Document.create({ travelId, type, fileUrl, expiryDate: expiryDate || null });
    res.status(201).json(doc);
  } catch (err) {
    console.error("Sequelize Error:", err);
    res.status(500).json({ error: "Failed to upload document" });
  }
};

// Create Risk rating
exports.createRisk = async (req, res) => {
  try {
    const { travelId, level, description } = req.body;
    const missing = validateFields(req.body, ["travelId", "level", "description"]);
    if (missing) return res.status(400).json({ error: `Missing required fields: ${missing.join(", ")}` });

    const risk = await Risk.create({ travelId, level, description });
    res.status(201).json(risk);
  } catch (err) {
    console.error("Sequelize Error:", err);
    res.status(500).json({ error: "Failed to create risk rating" });
  }
};

// Create Emergency contact
exports.createEmergency = async (req, res) => {
  try {
    const { travelId, contactName, contactNumber, instructions } = req.body;
    const missing = validateFields(req.body, ["travelId", "contactName", "contactNumber"]);
    if (missing) return res.status(400).json({ error: `Missing required fields: ${missing.join(", ")}` });

    const emergency = await Emergency.create({ travelId, contactName, contactNumber, instructions });
    res.status(201).json(emergency);
  } catch (err) {
    console.error("Sequelize Error:", err);
    res.status(500).json({ error: "Failed to create emergency contact" });
  }
};

// Create Travel Insurance record
exports.createTravelInsurance = async (req, res) => {
  try {
    const { travelId, provider, policyNumber, coverage, expiryDate } = req.body;
    const missing = validateFields(req.body, ["travelId", "provider", "policyNumber"]);
    if (missing) return res.status(400).json({ error: `Missing required fields: ${missing.join(", ")}` });

    const insurance = await TravelInsurance.create({ travelId, provider, policyNumber, coverage, expiryDate });
    res.status(201).json(insurance);
  } catch (err) {
    console.error("Sequelize Error:", err);
    res.status(500).json({ error: "Failed to create travel insurance" });
  }
};
