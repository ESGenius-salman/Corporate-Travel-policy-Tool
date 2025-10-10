const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Risk = sequelize.define("Risk", {
  level: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  travelId: { type: DataTypes.INTEGER, allowNull: true }
});

module.exports = Risk;
