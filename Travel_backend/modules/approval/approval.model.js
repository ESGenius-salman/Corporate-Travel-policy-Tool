// modules/approval/approval.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Approval = sequelize.define("Approval", {
  travelId: { type: DataTypes.INTEGER, allowNull: false },
  approverId: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.ENUM("pending","approved","rejected"), defaultValue: "pending" },
  comments: { type: DataTypes.TEXT },
});

module.exports = Approval;
