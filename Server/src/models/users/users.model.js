import { DataTypes } from "sequelize";
import { mssql } from "../../connection/index.js";

export const Users = mssql.define("users", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  userName: {
    type: DataTypes.STRING(25),
    allowNull: false,
  },
  userId: {
    type: DataTypes.STRING(25),
    allowNull: false,
  },
  userPassword: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  emailAddress: {
    type: DataTypes.STRING(25),
    allowNull: true,
  },
  emailPassword: {
    type: DataTypes.STRING(25),
    allowNull: true,
  },
  mobileNo: {
    type: DataTypes.STRING(25),
    allowNull: true,
  },
  userType: {
    type: DataTypes.CHAR(1),
    allowNull: false,
  },
  userCategory: {
    type: DataTypes.STRING(25),
    allowNull: true,
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
