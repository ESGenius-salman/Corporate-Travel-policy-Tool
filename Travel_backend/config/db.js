// config/db.js
const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT || 5432,
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => console.log(" Database connected & synced"))
  .catch(err => console.error(" Unable to connect to DB:", err));

module.exports = sequelize;
