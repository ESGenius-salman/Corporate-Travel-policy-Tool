
// modules/index.js

/*const safety = {
    alert: require("./safety/alert.model"),
    document: require("./safety/document.model")
};

const travel = require("./travel/travel.model");
const policy = require("./policy/policy.model");

module.exports = {
    safety,
    travel,
    policy
};
*/
// modules/index.js

// modules/index.js
// modules/index.js

const Alert = require("./safety/alert.model");
const Document = require("./safety/document.model");
const Travel = require("./travel/travel.model");
const Policy = require("./policy/policy.model");
const User = require("./User.js");

module.exports = {
  Alert,
  Document,
  Travel,
  Policy,
  User,
};
