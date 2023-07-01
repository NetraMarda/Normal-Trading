import { DataTypes } from "sequelize";
import { mssql } from "../../connection/index.js";

export const TransactionHead = mssql.define("transactionHead", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  tranType: {
    type: DataTypes.CHAR(2),
    allowNull: true,
  },
  docNo: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  docDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  total: {
    type: DataTypes.DECIMAL(18, 2),
    allowNull:true
  },
  cb: {
    type: DataTypes.INTEGER,
    allowNull:true
  },
  yearCode: {
    type: DataTypes.INTEGER,
  },
  companyCode: {
    type: DataTypes.INTEGER,
  },
  createdBy: {
    type: DataTypes.INTEGER,
  },
  modifiedBy: {
    type: DataTypes.INTEGER,
  },
});
