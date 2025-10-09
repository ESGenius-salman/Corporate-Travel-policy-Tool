import { DataTypes } from "sequelize";
import { sequelize } from "../index.js";

const VaccinationVerification = sequelize.define("VaccinationVerification", {
  employeeId: { type: DataTypes.STRING, allowNull: false },
  vaccineName: { type: DataTypes.STRING },
  doseCount: { type: DataTypes.INTEGER },
  vaccinationDate: { type: DataTypes.DATE },
  verified: { type: DataTypes.BOOLEAN, defaultValue: false },
});

export default VaccinationVerification;
