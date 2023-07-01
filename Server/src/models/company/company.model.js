import { DataTypes } from "sequelize";
import { mssql } from "../../connection/index.js";

export const Company = mssql.define("company", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  companyName: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  mobile: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  gstNo: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  panNo: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  modifiedBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  fssiNo: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  signPath: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  logoPath: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  stateCode: {
    type: DataTypes.STRING(2),
    allowNull: false,
  }
});
