const { Document, Travel, Alert } = require("../modules");  // include models
const { Op } = require("sequelize");

// 📌 Employee uploads new document (file or fileUrl)
exports.uploadDocument = async (req, res) => {
  try {
    const { travelId, type, expiryDate } = req.body;

    // 👇 If file uploaded via multer, use that. Else fallback to body.fileUrl
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : req.body.fileUrl;

    if (!fileUrl) {
      return res.status(400).json({
        error: "File Missing",
        details: "Please upload a file or provide fileUrl"
      });
    }

    // Check if related travel exists
    const travel = await Travel.findByPk(travelId);
    if (!travel) {
      return res.status(404).json({ error: "Not Found", details: "Travel not found" });
    }

    const document = await Document.create({
      travelId,
      type,
      fileUrl,
      expiryDate,
    });

    res.status(201).json({ message: "Document uploaded", document });
  } catch (err) {
    console.error("UploadDocument error:", err);
    res.status(500).json({ error: "Server Error", details: err.message });
  }
};

// 📌 Get all documents for a specific travel
exports.getDocumentsByTravel = async (req, res) => {
  try {
    const { travelId } = req.params;
    const documents = await Document.findAll({ where: { travelId } });
    res.json(documents);
  } catch (err) {
    console.error("GetDocuments error:", err);
    res.status(500).json({ error: "Server Error", details: err.message });
  }
};

// 📌 Admin/Manager can view all documents
exports.getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.findAll({
      include: { model: Travel, attributes: ["employeeName", "destination", "purpose"] }
    });
    res.json(documents);
  } catch (err) {
    console.error("GetAllDocuments error:", err);
    res.status(500).json({ error: "Server Error", details: err.message });
  }
};

// 📌 Check expiry for all documents (within 30 days) & generate alerts
exports.checkExpiryDocuments = async (req, res) => {
  try {
    const today = new Date();
    const upcomingDate = new Date();
    upcomingDate.setDate(today.getDate() + 30); // 30-day warning window

    const expiringDocs = await Document.findAll({
      where: {
        expiryDate: {
          [Op.lte]: upcomingDate,
        },
      },
      include: { model: Travel, attributes: ["employeeName", "destination"] },
    });

    for (const doc of expiringDocs) {
      await Alert.findOrCreate({
        where: {
          travelId: doc.travelId,
          alertType: "Document Expiry",
          message: `${doc.type} is expiring on ${doc.expiryDate}`,
        },
      });
    }

    res.json({ message: "Expiry check completed", expiringDocs });
  } catch (err) {
    console.error("CheckExpiry error:", err);
    res.status(500).json({ error: "Server Error", details: err.message });
  }
};
