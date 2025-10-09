const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const CheckIn = sequelize.define("CheckIn", {
  travelId: { type: DataTypes.INTEGER, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: "safe" },
});

module.exports = CheckIn;
