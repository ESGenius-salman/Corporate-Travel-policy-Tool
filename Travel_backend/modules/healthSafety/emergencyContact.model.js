import { DataTypes } from "sequelize";
import { sequelize } from "../index.js";

const EmergencyContact = sequelize.define("EmergencyContact", {
  employeeId: { type: DataTypes.STRING, allowNull: false },
  contactName: { type: DataTypes.STRING, allowNull: false },
  relationship: { type: DataTypes.STRING },
  phoneNumber: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING },
});

export default EmergencyContact;
