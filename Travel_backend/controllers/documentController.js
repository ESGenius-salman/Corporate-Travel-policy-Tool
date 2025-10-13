const Document = require("../modules/safety/document.model");

// GET /api/documents/:employeeId
exports.getDocumentsByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const documents = await Document.findAll({ where: { employeeId } });
    res.json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while fetching documents" });
  }
};

// POST /api/documents/upload
exports.uploadDocument = async (req, res) => {
  try {
    const { employeeId, type, status, expiry, details } = req.body;

    const document = await Document.create({
      employeeId,
      type,
      status,
      expiry,
      details,
      fileUrl: req.file ? `/uploads/${req.file.filename}` : null,
    });

    res.status(201).json({ message: "Document uploaded successfully", document });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to upload document" });
  }
};

// PUT /api/documents/:id
exports.updateDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, expiry, details } = req.body;

    const document = await Document.findByPk(id);
    if (!document) return res.status(404).json({ error: "Document not found" });

    await document.update({ status, expiry, details });
    res.json({ message: "Document updated successfully", document });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update document" });
  }
};
