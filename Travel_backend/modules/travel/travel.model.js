const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Trip = sequelize.define(
  "Trip",
  {
    employeeName: { type: DataTypes.STRING, allowNull: false },
    destination: { type: DataTypes.STRING, allowNull: false },
    purpose: { type: DataTypes.TEXT, allowNull: false },
    startDate: { type: DataTypes.DATEONLY, allowNull: false },
    endDate: { type: DataTypes.DATEONLY, allowNull: false },
    budget: { type: DataTypes.FLOAT, defaultValue: 0 },
    urgency: { type: DataTypes.STRING },
    accommodation: { type: DataTypes.STRING },
    userId: { type: DataTypes.INTEGER, allowNull: true },
    status: { type: DataTypes.STRING, defaultValue: "Pending" }, // consistent with controller
  },
  {
    timestamps: true, // adds createdAt and updatedAt
    tableName: "travels", // ensures consistent table name
  }
);

const Expense = sequelize.define("Expense", {
  description: { type: DataTypes.STRING, allowNull: false },
  amount: { type: DataTypes.FLOAT, defaultValue: 0 },
  status: { type: DataTypes.STRING, defaultValue: "pending" },
  userId: { type: DataTypes.INTEGER, allowNull: true },
});

module.exports = { Trip, Expense };
