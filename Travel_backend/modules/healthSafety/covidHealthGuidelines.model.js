import { DataTypes } from "sequelize";
import { sequelize } from "../index.js";

const CovidHealthGuideline = sequelize.define("CovidHealthGuideline", {
  guidelineTitle: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  applicableRegions: { type: DataTypes.ARRAY(DataTypes.STRING) },
  lastUpdated: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

export default CovidHealthGuideline;
