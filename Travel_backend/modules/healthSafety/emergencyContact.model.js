const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const EmergencyContact = sequelize.define("EmergencyContact", {
  name: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING },
  country: { type: DataTypes.STRING },
  type: { type: DataTypes.STRING }, // e.g., hospital, police, embassy
});

module.exports = EmergencyContact;
