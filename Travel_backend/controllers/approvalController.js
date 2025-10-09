// controllers/approvalController.js
const { Approval, Travel, User } = require("../modules");

// Approve or reject a travel request
exports.approveRequest = async (req, res) => {
  try {
    const { travelId, status, comments } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    // Create an approval record
    const approval = await Approval.create({
      travelId,
      approverId: req.user.id,
      status,
      comments,
    });

    // Update the travel status
    await Travel.update({ status }, { where: { id: travelId } });

    res.json({ message: "Approval recorded", approval });
  } catch (err) {
    console.error("Approval error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get approvals made by the logged-in manager/admin
exports.getMyApprovals = async (req, res) => {
  try {
    const approvals = await Approval.findAll({
      where: { approverId: req.user.id },
      include: [
        { model: Travel, attributes: ["employeeName", "destination", "purpose", "status"] },
        { model: User, attributes: ["name", "role"] }
      ]
    });

    res.json(approvals);
  } catch (err) {
    console.error("GetMyApprovals error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllApprovals = async (req, res) => {
  try {
    const approvals = await Approval.findAll({
      include: [
        { model: Travel, attributes: ["employeeName", "destination", "purpose", "status"] },
        { model: User, attributes: ["name", "role"] }
      ],
      order: [["createdAt", "DESC"]]
    });

    res.json(approvals);
  } catch (err) {
    console.error("GetAllApprovals error:", err);
    res.status(500).json({ message: "Server error" });
  }
};