// modules/User.js
/*const { DataTypes } = require("sequelize");
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
*/
// models/User.js
// modules/Users.js
// modules/Users.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // adjust if your DB file path differs

const Users = sequelize.define("Users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "user",
  },
});

module.exports = Users;
