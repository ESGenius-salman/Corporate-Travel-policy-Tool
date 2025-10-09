const Alert = require("../modules/safety/alert.model");
const Document = require("../modules/safety/document.model");
const admin = require("../config/firebase");

// Create alert & send push notification
exports.createAlert = async (req, res) => {
  try {
    const { travelId, alertType, message, fcmToken } = req.body;

    const alert = await Alert.create({ travelId, alertType, message });

    // Send push notification via FCM
    if (fcmToken) {
      await admin.messaging().send({
        token: fcmToken,
        notification: {
          title: `Travel Alert: ${alertType}`,
          body: message
        }
      });
    }

    res.status(201).json(alert);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create alert" });
  }
};

// Employee check-in for high-risk areas
exports.checkIn = async (req, res) => {
  try {
    const { travelId, latitude, longitude } = req.body;
    const message = `Employee checked in at Lat:${latitude}, Lng:${longitude}`;
    const alert = await Alert.create({ travelId, alertType: "Check-In", message, notified: false });

    res.json({ message: "Check-in recorded", alert });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to record check-in" });
  }
};

// Upload travel documents (passport, visa, health certificate)
exports.uploadDocument = async (req, res) => {
  try {
    const { travelId, type, fileUrl, expiryDate } = req.body;
    const doc = await Document.create({ travelId, type, fileUrl, expiryDate });
    res.status(201).json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to upload document" });
  }
};
