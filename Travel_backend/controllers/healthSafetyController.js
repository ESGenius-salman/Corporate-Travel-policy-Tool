const {
  TravelInsurance,
  VaccinationVerification,
  CovidHealthGuideline,
  EmergencyContact,
  EmbassyDetail,
} = require("../modules");

// --------- Travel Insurance ---------
exports.getAllTravelInsurance = async (req, res) => {
  try {
    const data = await TravelInsurance.findAll();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.addTravelInsurance = async (req, res) => {
  try {
    const insurance = await TravelInsurance.create(req.body);
    res.status(201).json(insurance);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// --------- Vaccinations ---------
exports.getAllVaccinations = async (req, res) => {
  try {
    const data = await VaccinationVerification.findAll();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.addVaccinationRecord = async (req, res) => {
  try {
    const record = await VaccinationVerification.create(req.body);
    res.status(201).json(record);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// --------- COVID Guidelines ---------
exports.getAllCovidGuidelines = async (req, res) => {
  try {
    const data = await CovidHealthGuideline.findAll();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.addCovidGuideline = async (req, res) => {
  try {
    const record = await CovidHealthGuideline.create(req.body);
    res.status(201).json(record);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// --------- Emergency Contacts ---------
exports.getAllEmergencyContacts = async (req, res) => {
  try {
    const data = await EmergencyContact.findAll();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.addEmergencyContact = async (req, res) => {
  try {
    const contact = await EmergencyContact.create(req.body);
    res.status(201).json(contact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// --------- Embassies ---------
exports.getAllEmbassies = async (req, res) => {
  try {
    const data = await EmbassyDetail.findAll();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.addEmbassyDetail = async (req, res) => {
  try {
    const record = await EmbassyDetail.create(req.body);
    res.status(201).json(record);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
