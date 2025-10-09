const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Policy = sequelize.define("Policy", {
  policyName: { type: DataTypes.STRING, allowNull: false },
  travelPurpose: { type: DataTypes.STRING },
  bookingRules: { type: DataTypes.JSON },
  safetyRules: { type: DataTypes.JSON },
  expenseRules: { type: DataTypes.JSON },
});

module.exports = Policy;
