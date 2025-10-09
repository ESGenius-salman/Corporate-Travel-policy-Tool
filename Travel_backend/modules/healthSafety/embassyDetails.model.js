const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const EmbassyDetail = sequelize.define("EmbassyDetail", {
  country: { type: DataTypes.STRING, allowNull: false },
  embassyName: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING },
  address: { type: DataTypes.TEXT },
});

module.exports = EmbassyDetail;
