// controllers/travelController.js
/*const { Travel } = require("../modules"); // Only Travel model since policy/emergency removed

// Employee creates a travel request
exports.createTravelRequest = async (req, res) => {
  try {
    const { destination, purpose, startDate, endDate, budget, urgency, accommodation } = req.body;

    const travel = await Travel.create({
      employeeName: req.user.name, // from logged-in user
      destination,
      purpose,
      startDate,
      endDate,
      budget,
      urgency,
      accommodation,
      userId: req.user.id, // link travel to logged-in user
    });

    res.status(201).json({ success: true, message: "Trip request submitted", travel });
  } catch (err) {
    console.error("Create Travel Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Employee views only their own requests
exports.getMyTravelRequests = async (req, res) => {
  try {
    const travels = await Travel.findAll({ where: { userId: req.user.id } });
    res.json(travels);
  } catch (err) {
    console.error("Get My Travels Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Admin/Manager view all requests
exports.getAllTravelRequests = async (req, res) => {
  try {
    const travels = await Travel.findAll();
    res.json(travels);
  } catch (err) {
    console.error("Get All Travels Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// Admin/Manager view all requests
exports.getAllTravelRequests = async (req, res) => {
  try {
    const travels = await Travel.findAll({ include: [Policy] });
    res.json(travels);
  } catch (err) {
    console.error("Get All Travels Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
*/
// controllers/travelController.js
/*const Travel = require("../modules/travel/travel.model");

// Employee — create a new travel request
const createTravelRequest = async (req, res) => {
  try {
    const {
      employeeName,
      destination,
      purpose,
      startDate,
      endDate,
      budget,
      urgency,
      accommodation,
    } = req.body;

    // Use logged-in user's ID
    const userId = req.user.id;

    if (!employeeName || !destination || !purpose || !startDate || !endDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newTravel = await Travel.create({
      employeeName,
      destination,
      purpose,
      startDate,
      endDate,
      budget: budget || 0,
      urgency,
      accommodation,
      userId, // attach logged-in user
    });

    res.status(201).json({ message: "Travel request submitted", travel: newTravel });
  } catch (err) {
    console.error("Error creating travel request:", err);
    res.status(500).json({ message: "Failed to submit travel request", error: err.message });
  }
};

// Employee — get only their own travel requests
const getMyTravelRequests = async (req, res) => {
  try {
    const userId = req.user.id;
    const travels = await Travel.findAll({ where: { userId } });
    res.json(travels);
  } catch (err) {
    console.error("Error fetching user's travel requests:", err);
    res.status(500).json({ message: "Failed to fetch travel requests", error: err.message });
  }
};

// Admin/Manager — get all travel requests
const getAllTravelRequests = async (req, res) => {
  try {
    const travels = await Travel.findAll();
    res.json(travels);
  } catch (err) {
    console.error("Error fetching all travel requests:", err);
    res.status(500).json({ message: "Failed to fetch all travel requests", error: err.message });
  }
};

module.exports = {
  createTravelRequest,
  getMyTravelRequests,
  getAllTravelRequests,
};
*/
// controllers/travelController.js
const { Travel } = require("../modules");
const jwt = require("jsonwebtoken");

// ✅ Create a new travel request
const createTravelRequest = async (req, res) => {
  try {
    console.log("📩 Received trip data:", req.body);
    console.log("👤 Authenticated user:", req.user);

    const { destination, purpose, startDate, endDate, budget, urgency, accommodation } = req.body;

    if (!destination || !purpose || !startDate || !endDate) {
      console.warn("⚠️ Missing required fields:", { destination, purpose, startDate, endDate });
      return res.status(400).json({ message: "Missing required fields" });
    }

    const userId = req.user?.id;
    const employeeName = req.user?.name || "Unknown Employee";

    if (!userId) {
      console.warn("⚠️ Missing userId from token");
      return res.status(401).json({ message: "Unauthorized: Missing user ID" });
    }

    const newTrip = await Travel.create({
      userId,
      employeeName,
      destination,
      purpose,
      startDate,
      endDate,
      budget,
      urgency,
      accommodation,
      status: "Pending",
    });

    res.status(201).json({
      success: true,
      message: "Trip request submitted successfully",
      trip: newTrip,
    });
  } catch (error) {
    console.error("❌ Error creating travel request:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


// ✅ Fetch all trips of the logged-in user
const getMyTravelRequests = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: Missing user ID" });
    }

    const trips = await Travel.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });

    // Map trips to include default values for frontend
    const formattedTrips = trips.map(trip => {
      const t = trip.toJSON();
      return {
        id: t.id,
        employeeName: t.employeeName || "Unknown Employee",
        destination: t.destination || "Unknown Destination",
        purpose: t.purpose || "No purpose specified",
        startDate: t.startDate || null,
        endDate: t.endDate || null,
        budget: t.budget != null ? t.budget : 0,
        urgency: t.urgency || "N/A",
        accommodation: t.accommodation || "N/A",
        status: t.status || "unknown",
        submittedDate: t.submittedDate || t.createdAt || null,
        Policy: t.Policy || { name: "N/A" },
        emergencyContact: t.emergencyContact || "N/A"
      };
    });

    res.status(200).json(formattedTrips);
  } catch (error) {
    console.error("❌ Error fetching user trips:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  getMyTravelRequests,
};
// ✅ Admin: Fetch all travel requests
const getAllTravelRequests = async (req, res) => {
  try {
    const trips = await Travel.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(trips);
  } catch (error) {
    console.error("❌ Error fetching all travel requests:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// ✅ Admin: Update status (Approve / Reject)
const updateTravelStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const trip = await Travel.findByPk(id);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    trip.status = status;
    await trip.save();

    res.status(200).json({ message: "Trip status updated successfully", trip });
  } catch (error) {
    console.error("❌ Error updating travel status:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// ✅ Export all controllers properly
module.exports = {
  createTravelRequest,
  getMyTravelRequests,
  getAllTravelRequests,
  updateTravelStatus,
};
