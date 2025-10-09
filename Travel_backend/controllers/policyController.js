

// controllers/policyController.js
const { Policy } = require("../modules");

// Create new policy (Admin only)
exports.createPolicy = async (req, res) => {
  try {
    const { policyName, travelPurpose, bookingRules, safetyRules, expenseRules } = req.body;

    const policy = await Policy.create({
      policyName,
      travelPurpose,
      bookingRules,
      safetyRules,
      expenseRules,
    });

    res.status(201).json({ message: "Policy created successfully", policy });
  } catch (err) {
    console.error("Policy creation error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all policies
exports.getPolicies = async (req, res) => {
  try {
    const policies = await Policy.findAll();
    res.json(policies);
  } catch (err) {
    console.error("Get policies error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single policy by ID
exports.getPolicyById = async (req, res) => {
  try {
    const policy = await Policy.findByPk(req.params.id);
    if (!policy) return res.status(404).json({ message: "Policy not found" });
    res.json(policy);
  } catch (err) {
    console.error("Get policy by ID error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update policy (Admin only)
exports.updatePolicy = async (req, res) => {
  try {
    const { policyName, travelPurpose, bookingRules, safetyRules, expenseRules } = req.body;

    const policy = await Policy.findByPk(req.params.id);
    if (!policy) return res.status(404).json({ message: "Policy not found" });

    policy.policyName = policyName || policy.policyName;
    policy.travelPurpose = travelPurpose || policy.travelPurpose;
    policy.bookingRules = bookingRules || policy.bookingRules;
    policy.safetyRules = safetyRules || policy.safetyRules;
    policy.expenseRules = expenseRules || policy.expenseRules;

    await policy.save();

    res.json({ message: "Policy updated successfully", policy });
  } catch (err) {
    console.error("Update policy error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete policy (Admin only)
exports.deletePolicy = async (req, res) => {
  try {
    const policy = await Policy.findByPk(req.params.id);
    if (!policy) return res.status(404).json({ message: "Policy not found" });

    await policy.destroy();
    res.json({ message: "Policy deleted successfully" });
  } catch (err) {
    console.error("Delete policy error:", err);
    res.status(500).json({ message: "Server error" });

// Get single policy by ID
exports.getPolicyById = async (req, res) => {
  try {
    const policy = await Policy.findByPk(req.params.id);
    if (!policy) return res.status(404).json({ message: "Policy not found" });
    res.json(policy);
  } catch (err) {
    console.error("Get policy by ID error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update policy (Admin only)
exports.updatePolicy = async (req, res) => {
  try {
    const { policyName, travelPurpose, bookingRules, safetyRules, expenseRules } = req.body;

    const policy = await Policy.findByPk(req.params.id);
    if (!policy) return res.status(404).json({ message: "Policy not found" });

    policy.policyName = policyName || policy.policyName;
    policy.travelPurpose = travelPurpose || policy.travelPurpose;
    policy.bookingRules = bookingRules || policy.bookingRules;
    policy.safetyRules = safetyRules || policy.safetyRules;
    policy.expenseRules = expenseRules || policy.expenseRules;

    await policy.save();

    res.json({ message: "Policy updated successfully", policy });
  } catch (err) {
    console.error("Update policy error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete policy (Admin only)
exports.deletePolicy = async (req, res) => {
  try {
    const policy = await Policy.findByPk(req.params.id);
    if (!policy) return res.status(404).json({ message: "Policy not found" });

    await policy.destroy();
    res.json({ message: "Policy deleted successfully" });
  } catch (err) {
    console.error("Delete policy error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
  }
}
