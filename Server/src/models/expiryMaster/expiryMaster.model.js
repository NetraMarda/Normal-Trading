import { DataTypes } from "sequelize";
import {mssql} from "../../connection/index.js";

export const ExpiryMaster = mssql.define("expiryMaster", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  expiryDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});
