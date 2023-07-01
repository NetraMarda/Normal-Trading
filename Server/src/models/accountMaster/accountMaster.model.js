import { DataTypes } from "sequelize";
import { mssql } from "../../connection/index.js";

export const AccountMaster = mssql.define("accountMaster", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  accountName: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  accountType: {
    type: DataTypes.CHAR(1),
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  cityCode: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  groupId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  openingBalance: {
    type: DataTypes.FLOAT(18, 2),
    allowNull: true,
  },
  drcr: {
    type: DataTypes.CHAR(1),
    allowNull: true,
  },
  unregisted: {
    type: DataTypes.CHAR(1),
    allowNull: true,
  },
  gstNo: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  fssiNo: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },
  stateCode: {
    type: DataTypes.CHAR(2),
    allowNull: true,
  },
  bankAccountCode: {
    type: DataTypes.STRING(25),
    allowNull: true,
  },
  bankName: {
    type: DataTypes.STRING(25),
    allowNull: true,
  },
  branch: {
    type: DataTypes.STRING(25),
    allowNull: true,
  },
  ifsc: {
    type: DataTypes.STRING(25),
    allowNull: true,
  },
  whatsappNo: {
    type: DataTypes.STRING(25),
    allowNull: true,
  },
  tdstcsApplicable: {
    type: DataTypes.CHAR(1),
    allowNull: true,
  },
  locked: {
    type: DataTypes.CHAR(1),
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  ccEmail: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  mobileNo: {
    type: DataTypes.STRING(25),
    allowNull: true,
  },
  tanNo: {
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
