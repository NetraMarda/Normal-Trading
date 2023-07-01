import { DataTypes } from "sequelize";
import { mssql } from "../../connection/index.js";

export const GLedger = mssql.define("gledger", {
  transactionType: {
    type: DataTypes.STRING(2),
    allowNull: true,
  },
  cashCredit: {
    type: DataTypes.STRING(2),
    allowNull: true,
  },
  docNo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  docDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  accountCode: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  ac: {

    // foreign key of id in acctmaster
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  narration: {
    type: DataTypes.STRING(555),
    allowNull: true,
  },
  amount: {
    type: DataTypes.FLOAT(18, 2),
    allowNull: true,
  },
  companyCode: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  yearCode: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  orderCode: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  DRCR: {
    type: DataTypes.CHAR(1),
    allowNull: true,
  },
  DRCRHead: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  progId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});
