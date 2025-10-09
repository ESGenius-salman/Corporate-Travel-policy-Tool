const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const CovidHealthGuideline = sequelize.define("CovidHealthGuideline", {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  country: { type: DataTypes.STRING, allowNull: false },
});

module.exports = CovidHealthGuideline;
