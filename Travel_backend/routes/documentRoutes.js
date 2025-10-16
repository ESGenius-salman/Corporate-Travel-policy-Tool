const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  getDocumentsByEmployee,
  uploadDocument,
  updateDocument,
} = require("../controllers/documentController");

//  Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_"));
  },
});

const upload = multer({ storage });

//  Match frontend routes exactly
router.get("/:employeeId", getDocumentsByEmployee); // GET /api/documents/1
router.post("/upload", upload.single("file"), uploadDocument); // POST /api/documents/upload
router.put("/update/:type", updateDocument); // PUT /api/documents/update/passport

module.exports = router;
