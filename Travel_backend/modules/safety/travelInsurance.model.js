const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const TravelInsurance = sequelize.define("TravelInsurance", {
  provider: { type: DataTypes.STRING, allowNull: false },
  policyNumber: { type: DataTypes.STRING, allowNull: false },
  coverage: { type: DataTypes.TEXT, allowNull: true },
  expiryDate: { type: DataTypes.DATEONLY },
  travelId: { type: DataTypes.INTEGER, allowNull: true }
});

module.exports = TravelInsurance;
