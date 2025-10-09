const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const SOS = sequelize.define("SOS", {
  travelId: { type: DataTypes.INTEGER, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: "emergency" },
});

module.exports = SOS;
