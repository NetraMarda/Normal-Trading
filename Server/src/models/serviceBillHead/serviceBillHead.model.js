import { DataTypes } from "sequelize";
import { mssql } from "../../connection/index.js";

export const ServiceBillHead = mssql.define("serviceBillHead", {
  id:{
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  docNo: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  billNo: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  cc: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  gstRateCode: {
    type: DataTypes.INTEGER, 
    allowNull: true,
    //foreign key gstratemaster id
  },
  subTotal: {
    type: DataTypes.FLOAT(18, 2),
    allowNull: true,
  },
  CGSTRate: {
    type: DataTypes.FLOAT(18, 2),
    allowNull: true,
  },
  CGSTAmount: {
    type: DataTypes.FLOAT(18, 2),
    allowNull: true,
  },
  SGSTRate: {
    type: DataTypes.FLOAT(18, 2),
    allowNull: true,
  },
  SGSTAmount: {
    type: DataTypes.FLOAT(18, 2),
    allowNull: true,
  },
  IGSTRate: {
    type: DataTypes.FLOAT(18, 2),
    allowNull: true,
  },
  IGSTAmount: {
    type: DataTypes.FLOAT(18, 2),
    allowNull: true,
  },
  Total: {
    type: DataTypes.FLOAT(18, 2),
    allowNull: true,
  },
  roundOff: {
    type: DataTypes.FLOAT(18, 2),
    allowNull: true,
  },
  finalAmount: {
    type: DataTypes.FLOAT(18, 2),
    allowNull: true,
  },
  isTDS: {
    type: DataTypes.CHAR(1),
    allowNull: true,
  },
  TDSPer: {
    type: DataTypes.FLOAT(18, 2),
    allowNull: true,
  },
  TDSAmount: {
    type: DataTypes.FLOAT(18, 2),
    allowNull: true,
  },
  TDS: {
    type: DataTypes.FLOAT(18, 2),
    allowNull: true,
  },
  companyCode: {
    type: DataTypes.INTEGER,
    allowNull: true,

    //foreign key of company id
  },
  yearCode: {
    type: DataTypes.INTEGER,
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
 
  TCSRate: {
    type: DataTypes.FLOAT(18, 2),
    allowNull: true,
  },
  TCSAmount: {
    type: DataTypes.FLOAT(18, 2),
    allowNull: true,
  },
  TCSNetPayable: {
    type: DataTypes.FLOAT(18, 2),
    allowNull: true,
  },
  einVoiceNo: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
  ackNo: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
  QRCode: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  isDeleted: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});
