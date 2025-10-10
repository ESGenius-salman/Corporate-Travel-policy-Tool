// checkModels.js
require("dotenv").config();
const sequelize = require("./config/db"); // your Sequelize instance
const {
  TravelInsurance,
  VaccinationVerification,
  CovidHealthGuideline,
  EmergencyContact,
  EmbassyDetail,
} = require("./modules"); // imports from modules/index.js

async function checkModels() {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");

    // Sync models (optional, you can remove if not needed)
    await sequelize.sync({ alter: true });

    // Check each model
    const travelData = await TravelInsurance.findAll();
    const vaccinationData = await VaccinationVerification.findAll();
    const covidData = await CovidHealthGuideline.findAll();
    const emergencyData = await EmergencyContact.findAll();
    const embassyData = await EmbassyDetail.findAll();

    console.log("TravelInsurance:", travelData.length, "records");
    console.log("VaccinationVerification:", vaccinationData.length, "records");
    console.log("CovidHealthGuideline:", covidData.length, "records");
    console.log("EmergencyContact:", emergencyData.length, "records");
    console.log("EmbassyDetail:", embassyData.length, "records");

    console.log("✅ All models are loaded correctly");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error in models:", err);
    process.exit(1);
  }
}

checkModels();
