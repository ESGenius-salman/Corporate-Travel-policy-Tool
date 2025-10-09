const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Document = sequelize.define("Document", {
  travelId: { type: DataTypes.INTEGER, allowNull: false },
  type: { type: DataTypes.STRING, allowNull: false },
  fileUrl: { type: DataTypes.STRING, allowNull: false },
  expiryDate: { type: DataTypes.DATEONLY },
});

module.exports = Document;
