// models/Document.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Document = sequelize.define("Document", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING, // passport, visa, healthCertificate, etc.
    allowNull: false,
  },
  details: {
    type: DataTypes.JSON, // Store dynamic info like expiry, number, etc.
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "Pending",
  },
  expiry: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  fileUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Document;
