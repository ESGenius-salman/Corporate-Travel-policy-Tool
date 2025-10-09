import { DataTypes } from "sequelize";
import { sequelize } from "../index.js";

const TravelInsurance = sequelize.define("TravelInsurance", {
  employeeId: { type: DataTypes.STRING, allowNull: false },
  insuranceProvider: { type: DataTypes.STRING, allowNull: false },
  policyNumber: { type: DataTypes.STRING, allowNull: false },
  coverageDetails: { type: DataTypes.TEXT },
  validTill: { type: DataTypes.DATE, allowNull: false },
});

export default TravelInsurance;
