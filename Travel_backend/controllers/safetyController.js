const Alert = require("../modules/safety/alert.model");
const Document = require("../modules/safety/document.model");
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

    // Validate required fields
    const missing = validateFields(req.body, ["travelId", "alertType", "message"]);
    if (missing) {
      return res.status(400).json({ error: `Missing required fields: ${missing.join(", ")}` });
    }

    // Create alert record in DB
    const alert = await Alert.create({
      travelId,
      alertType,
      message,
      notified: fcmToken ? true : false // optional: track if notification sent
    });

    // Send push notification via FCM if token provided
    if (fcmToken) {
      try {
        await admin.messaging().send({
          token: fcmToken,
          notification: {
            title: `Travel Alert: ${alertType}`,
            body: message,
          },
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
    if (missing) {
      return res.status(400).json({ error: `Missing required fields: ${missing.join(", ")}` });
    }

    const message = `Employee checked in at Lat:${latitude}, Lng:${longitude}`;
    const alert = await Alert.create({
      travelId,
      alertType: "Check-In",
      message,
      notified: false
    });

    res.status(201).json({ message: "Check-in recorded", alert });
  } catch (err) {
    console.error("Sequelize Error:", err);
    res.status(500).json({ error: "Failed to record check-in" });
  }
};

// Upload travel documents (passport, visa, health certificate)
exports.uploadDocument = async (req, res) => {
  try {
    const { travelId, type, fileUrl, expiryDate } = req.body;

    const missing = validateFields(req.body, ["travelId", "type", "fileUrl"]);
    if (missing) {
      return res.status(400).json({ error: `Missing required fields: ${missing.join(", ")}` });
    }

    const doc = await Document.create({
      travelId,
      type,
      fileUrl,
      expiryDate: expiryDate || null // optional
    });

    res.status(201).json(doc);
  } catch (err) {
    console.error("Sequelize Error:", err);
    res.status(500).json({ error: "Failed to upload document" });
  }
};
