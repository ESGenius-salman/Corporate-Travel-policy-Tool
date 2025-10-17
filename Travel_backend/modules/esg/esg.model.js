const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const ESGRecord = sequelize.define("ESGRecord", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  score: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = ESGRecord;
