
// modules/index.js

const safety = {
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
