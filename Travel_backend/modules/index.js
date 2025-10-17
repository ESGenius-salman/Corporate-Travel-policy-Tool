// modules/index.js

// Safety models
const Alert = require("./safety/alert.model");
const Document = require("./safety/document.model");

// Travel models
const { Trip, Expense } = require("./travel/travel.model");

// Policy
const Policy = require("./policy/policy.model");

// ESG
const ESGRecord = require("./esg/esg.model"); // adjust path if different

// Users
const Users = require("./User.js");

module.exports = {
  Alert,
  Document,
  Trip,
  Expense,
  Policy,
  ESGRecord,
  Users,
};
