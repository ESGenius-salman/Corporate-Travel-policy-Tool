
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

const safety = {
  alert: require("./safety/alert.model"),
  document: require("./safety/document.model"),
};

const travel = require("./travel/travel.model");
const policy = require("./policy/policy.model");
//const Users = require("./Users"); // make sure this file exists!
//const Users = require("./Users.js"); // if the file is Users.js
const Users = require("./User.js");



module.exports = {
  safety,
  travel,
  policy,
  Users,
};
