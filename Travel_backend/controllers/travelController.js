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
const Travel = require("../modules/travel/travel.model");

// Create a new travel request
const createTravelRequest = async (req, res) => {
  try {
    const { employeeName, destination, purpose, startDate, endDate, budget, urgency, accommodation } = req.body;

    // Make sure userId comes from the logged-in user
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ message: "User ID not found in request" });
    }

    // Create travel request
    const travel = await Travel.create({
      employeeName,
      destination,
      purpose,
      startDate,
      endDate,
      budget,
      urgency,
      accommodation,
      userId, // assign from logged-in user
    });

    return res.status(201).json({ message: "Trip request created", travel });
  } catch (error) {
    console.error("Error creating travel request:", error);
    return res.status(500).json({ message: "Failed to submit trip request", error: error.message });
  }
};

// Get only logged-in user's travel requests
const getMyTravelRequests = async (req, res) => {
  try {
    const userId = req.user?.id;
    const travels = await Travel.findAll({ where: { userId } });
    return res.json(travels);
  } catch (error) {
    console.error("Error fetching travel requests:", error);
    return res.status(500).json({ message: "Failed to fetch travel requests" });
  }
};

// Get all travel requests (Admin/Manager)
const getAllTravelRequests = async (req, res) => {
  try {
    const travels = await Travel.findAll();
    return res.json(travels);
  } catch (error) {
    console.error("Error fetching all travel requests:", error);
    return res.status(500).json({ message: "Failed to fetch all travel requests" });
  }
};

module.exports = { createTravelRequest, getMyTravelRequests, getAllTravelRequests };
