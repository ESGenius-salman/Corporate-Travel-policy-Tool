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

// Travel Insurance
router.get("/travel-insurance", getAllTravelInsurance);
router.post("/travel-insurance", addTravelInsurance);

// Vaccinations
router.get("/vaccinations", getAllVaccinations);
router.post("/vaccinations", addVaccinationRecord);

// COVID Guidelines
router.get("/covid-guidelines", getAllCovidGuidelines);
router.post("/covid-guidelines", addCovidGuideline);

// Emergency Contacts
router.get("/emergency-contacts", getAllEmergencyContacts);
router.post("/emergency-contacts", addEmergencyContact);

// Embassies
router.get("/embassies", getAllEmbassies);
router.post("/embassies", addEmbassyDetail);

module.exports = router;
