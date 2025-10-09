// modules/index.js
const User = require("./User");
const Travel = require("./travel/travel.model");
const Policy = require("./policy/policy.model");
const Approval = require("./approval/approval.model");
const Alert = require("./safety/alert.model");
const Document = require("./safety/document.model");

// Associations
User.hasMany(Travel, { foreignKey: "userId" });
Travel.belongsTo(User, { foreignKey: "userId" });

Policy.hasMany(Travel, { foreignKey: "policyId" });
Travel.belongsTo(Policy, { foreignKey: "policyId" });

Travel.hasMany(Approval, { foreignKey: "travelId" });
Approval.belongsTo(Travel, { foreignKey: "travelId" });

User.hasMany(Approval, { foreignKey: "approverId" });
Approval.belongsTo(User, { foreignKey: "approverId" });

Travel.hasMany(Alert, { foreignKey: "travelId" });
Alert.belongsTo(Travel, { foreignKey: "travelId" });

Travel.hasMany(Document, { foreignKey: "travelId" });
Document.belongsTo(Travel, { foreignKey: "travelId" });

module.exports = { User, Travel, Policy, Approval, Alert, Document };
