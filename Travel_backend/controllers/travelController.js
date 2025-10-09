// controllers/travelController.js
const { Travel, Policy } = require("../modules");

// Employee creates a travel request
exports.createTravelRequest = async (req, res) => {
  try {
    const { destination, purpose, startDate, endDate, budget, policyId, emergencyContact } = req.body;

    // Check if policy exists
    const policy = await Policy.findByPk(policyId);
    if (!policy) return res.status(400).json({ message: "Invalid policy ID" });

    const travel = await Travel.create({
      employeeName: req.user.name,  // from logged-in user
      destination,
      purpose,
      startDate,
      endDate,
      budget,
      policyId,
      emergencyContact,
      userId: req.user.id,          // link travel to logged-in user
    });

    res.status(201).json({ message: "Travel request submitted", travel });
  } catch (err) {
    console.error("Create Travel Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Employee views only their own requests
exports.getMyTravelRequests = async (req, res) => {
  try {
    const travels = await Travel.findAll({ where: { userId: req.user.id }, include: [Policy] });
    res.json(travels);
  } catch (err) {
    console.error("Get My Travels Error:", err);
    res.status(500).json({ message: "Server error" });
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
