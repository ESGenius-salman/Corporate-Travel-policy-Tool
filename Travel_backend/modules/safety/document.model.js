const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Document = sequelize.define("Document", {
 employeeId: { type: DataTypes.INTEGER, allowNull: true }, // allow nulls
  type: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.STRING },
  expiry: { type: DataTypes.DATEONLY },
  details: { type: DataTypes.TEXT },
  fileUrl: { type: DataTypes.STRING },
});

module.exports = Document;
