// modules/User.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false }, 
  role: { 
    type: DataTypes.ENUM("employee", "manager", "admin"),
    defaultValue: "employee",
  },
  department: { type: DataTypes.STRING },
});

module.exports = User;
