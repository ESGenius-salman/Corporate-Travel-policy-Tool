const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Emergency = sequelize.define("Emergency", {
  contactName: { type: DataTypes.STRING, allowNull: false },
  contactNumber: { type: DataTypes.STRING, allowNull: false },
  instructions: { type: DataTypes.TEXT, allowNull: true },
  travelId: { type: DataTypes.INTEGER, allowNull: true }
});

module.exports = Emergency;
