import { DataTypes } from "sequelize";
import { sequelize } from "../index.js";

const EmbassyDetail = sequelize.define("EmbassyDetail", {
  country: { type: DataTypes.STRING, allowNull: false },
  embassyName: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING },
  contactNumber: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
});

export default EmbassyDetail;
