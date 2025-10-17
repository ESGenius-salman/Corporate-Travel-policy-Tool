// If alert.model.js is in modules/safety/
const sequelize = require("../../config/db");
const { DataTypes } = require("sequelize");

// define Alert model
const Alert = sequelize.define("Alert", {
  // columns
  alertType: { type: DataTypes.STRING, allowNull: false },
  message: { type: DataTypes.STRING, allowNull: false },
  notified: { type: DataTypes.BOOLEAN, defaultValue: false },
  seen: { type: DataTypes.BOOLEAN, defaultValue: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = Alert;
