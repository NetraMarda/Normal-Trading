import { DataTypes } from "sequelize";
import { mssql } from "../../connection/index.js";

export const GstRateMaster = mssql.define("gstRateMaster", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  gstName: {
    type: DataTypes.STRING(25),
    allowNull: false,
  },
  rate: {
    type: DataTypes.FLOAT(6, 2),
    allowNull: false,
  },
  cGstRate: {
    type: DataTypes.FLOAT(6, 2),
    allowNull: false,
  },
  sGstRate: {
    type: DataTypes.FLOAT(6, 2),
    allowNull: false,
  },
  iGstRate: {
    type: DataTypes.FLOAT(6, 2),
    allowNull: false,
  },
  companyCode: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  modifiedBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});
