/*const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Travel = sequelize.define("Travel", {
  employeeName: { type: DataTypes.STRING, allowNull: false },
  destination: { type: DataTypes.STRING, allowNull: false },
  purpose: { type: DataTypes.STRING, allowNull: false },
  startDate: { type: DataTypes.DATEONLY, allowNull: false },
  endDate: { type: DataTypes.DATEONLY, allowNull: false },
  status: { type: DataTypes.ENUM("pending","approved","rejected"), defaultValue: "pending" },
  budget: { type: DataTypes.FLOAT },
  policyId: { type: DataTypes.INTEGER },
  emergencyContact: { type: DataTypes.STRING },
  insuranceVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
});

module.exports = Travel;
*/
// modules/index.js
// modules/travel/travel.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Travel = sequelize.define("Travel", {
  employeeName: { type: DataTypes.STRING, allowNull: false },
  destination: { type: DataTypes.STRING, allowNull: false },
  purpose: { type: DataTypes.TEXT, allowNull: false },
  startDate: { type: DataTypes.DATEONLY, allowNull: false },
  endDate: { type: DataTypes.DATEONLY, allowNull: false },
  budget: { type: DataTypes.FLOAT, defaultValue: 0 },
  urgency: { type: DataTypes.STRING },
  accommodation: { type: DataTypes.STRING },
  //userId: { type: DataTypes.INTEGER, allowNull: false }
  userId: { type: DataTypes.INTEGER, allowNull: true }

});

module.exports = Travel;
