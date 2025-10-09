const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const { uploadDocument, getDocumentsByTravel, getAllDocuments, checkExpiryDocuments } = require("../controllers/documentController");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Employee uploads doc (supports file or manual fileUrl)
router.post("/", authMiddleware, roleMiddleware(["employee"]), upload.single("file"), uploadDocument);

// Employee views docs for their travel
router.get("/:travelId", authMiddleware, roleMiddleware(["employee"]), getDocumentsByTravel);

// Admin/Manager views all docs
router.get("/", authMiddleware, roleMiddleware(["admin", "manager"]), getAllDocuments);

// Admin runs expiry check
router.post("/check-expiry", authMiddleware, roleMiddleware(["admin"]), checkExpiryDocuments);

module.exports = router;
