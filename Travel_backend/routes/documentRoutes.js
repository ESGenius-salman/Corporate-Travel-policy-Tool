const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  getDocumentsByEmployee,
  uploadDocument,
  updateDocument,
} = require("../controllers/documentController");

// Multer file upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Routes
router.get("/:employeeId", getDocumentsByEmployee);
router.post("/upload", upload.single("file"), uploadDocument);
router.put("/:id", updateDocument);

module.exports = router;
