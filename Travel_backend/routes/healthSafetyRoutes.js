// routes/healthSafetyRoutes.js
const express = require("express");
const router = express.Router();

const {
  getAllTravelInsurance,
  addTravelInsurance,
  getAllVaccinations,
  addVaccinationRecord,
  getAllCovidGuidelines,
  addCovidGuideline,
  getAllEmergencyContacts,
  addEmergencyContact,
  getAllEmbassies,
  addEmbassyDetail,
} = require("../controllers/healthSafetyController");

// ✅ Travel Insurance
router.get("/travel-insurance", getAllTravelInsurance);
router.post("/travel-insurance", addTravelInsurance);

// ✅ Vaccination Verification
router.get("/vaccinations", getAllVaccinations);
router.post("/vaccinations", addVaccinationRecord);

// ✅ Covid Health Guidelines
router.get("/covid-guidelines", getAllCovidGuidelines);
router.post("/covid-guidelines", addCovidGuideline);

// ✅ Emergency Contacts
router.get("/emergency-contacts", getAllEmergencyContacts);
router.post("/emergency-contacts", addEmergencyContact);

// ✅ Embassy Details
router.get("/embassies", getAllEmbassies);
router.post("/embassies", addEmbassyDetail);

// ✅ Export router (important!)
module.exports = router;
