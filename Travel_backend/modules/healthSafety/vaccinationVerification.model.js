const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const VaccinationVerification = sequelize.define("VaccinationVerification", {
  employeeId: { type: DataTypes.INTEGER, allowNull: false },
  vaccineName: { type: DataTypes.STRING, allowNull: false },
  doseNumber: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATE, allowNull: false },
});

module.exports = VaccinationVerification;
