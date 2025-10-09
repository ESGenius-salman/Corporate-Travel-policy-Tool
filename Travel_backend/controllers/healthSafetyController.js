// controllers/healthSafetyController.js
const {
  TravelInsurance,
  VaccinationVerification,
  CovidHealthGuideline,
  EmergencyContact,
  EmbassyDetail,
} = require("../modules");

// ========== Travel Insurance ==========
exports.getAllTravelInsurance = async (req, res) => {
  try {
    const data = await TravelInsurance.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addTravelInsurance = async (req, res) => {
  try {
    const insurance = await TravelInsurance.create(req.body);
    res.json(insurance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ========== Vaccination Verification ==========
exports.getAllVaccinations = async (req, res) => {
  try {
    const data = await VaccinationVerification.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addVaccinationRecord = async (req, res) => {
  try {
    const record = await VaccinationVerification.create(req.body);
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ========== COVID Health Guidelines ==========
exports.getAllCovidGuidelines = async (req, res) => {
  try {
    const data = await CovidHealthGuideline.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addCovidGuideline = async (req, res) => {
  try {
    const record = await CovidHealthGuideline.create(req.body);
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ========== Emergency Contacts ==========
exports.getAllEmergencyContacts = async (req, res) => {
  try {
    const data = await EmergencyContact.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addEmergencyContact = async (req, res) => {
  try {
    const contact = await EmergencyContact.create(req.body);
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ========== Embassy Details ==========
exports.getAllEmbassies = async (req, res) => {
  try {
    const data = await EmbassyDetail.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addEmbassyDetail = async (req, res) => {
  try {
    const record = await EmbassyDetail.create(req.body);
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
