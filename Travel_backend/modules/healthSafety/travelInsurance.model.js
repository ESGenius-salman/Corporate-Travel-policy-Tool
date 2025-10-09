const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const TravelInsurance = sequelize.define("TravelInsurance", {
  travelId: { type: DataTypes.INTEGER, allowNull: false },
  provider: { type: DataTypes.STRING, allowNull: false },
  policyNumber: { type: DataTypes.STRING, allowNull: false },
  startDate: { type: DataTypes.DATE, allowNull: false },
  endDate: { type: DataTypes.DATE, allowNull: false },
});

module.exports = TravelInsurance;
