const path = require("path");
const fs = require("fs");

let documents = {
  1: {
    passport: {
      type: "passport",
      number: "A1234567",
      status: "Valid",
      expiryDate: "2028-01-01",
      fileUrl: "/uploads/passport.pdf",
    },
    visa: {
      type: "visa",
      country: "USA",
      status: "Approved",
      expiryDate: "2026-06-01",
    },
    healthCertificate: {
      type: "healthCertificate",
      fileUrl: "",
    },
    additionalDocuments: [],
  },
};

// ✅ GET /api/documents/:employeeId
exports.getDocumentsByEmployee = (req, res) => {
  const { employeeId } = req.params;
  res.json(documents[employeeId] || {});
};

// ✅ POST /api/documents/upload
exports.uploadDocument = (req, res) => {
  const { travelId, type } = req.body;
  const file = req.file;
  if (!file) return res.status(400).json({ message: "File is required" });

  if (!documents[travelId]) documents[travelId] = {};
  documents[travelId][type] = {
    ...documents[travelId][type],
    fileUrl: `/uploads/${file.filename}`,
    status: "Uploaded",
  };

  res.status(200).json({ message: "File uploaded successfully" });
};

// ✅ PUT /api/documents/update/:type
exports.updateDocument = (req, res) => {
  const { type } = req.params;
  const { travelId, ...updates } = req.body;

  if (!documents[travelId]) return res.status(404).json({ message: "Travel record not found" });
  if (!documents[travelId][type]) documents[travelId][type] = { type };

  documents[travelId][type] = {
    ...documents[travelId][type],
    ...updates,
  };

  res.json({ message: `${type} updated successfully`, data: documents[travelId][type] });
};
