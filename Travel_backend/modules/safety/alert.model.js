const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Alert = sequelize.define("Alert", {
  travelId: { type: DataTypes.INTEGER, allowNull: false },
  alertType: { type: DataTypes.STRING, allowNull: false },
  message: { type: DataTypes.STRING, allowNull: false },
  notified: { type: DataTypes.BOOLEAN, defaultValue: false },
});

module.exports = Alert;
