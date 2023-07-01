import { DataTypes } from "sequelize";
import { mssql } from "../../connection/index.js";

export const ItemMaster = mssql.define("itemMaster", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  itemCode: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  itemName: {
    type: DataTypes.STRING(25),
    allowNull: false,
  },
  openingStock: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  wtPer: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  hsnNo: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  gstCode: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isService: {
    type: DataTypes.CHAR(1),
    allowNull: false,
  },
  openingValue: {
    type: DataTypes.FLOAT(18, 2),
    allowNull: true,
  },
  ratePer: {
    type: DataTypes.CHAR(1),
    allowNull: true,
  },
  reverseCalculation: {
    type: DataTypes.CHAR(1),
    allowNull: true,
  },
  companyCode: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  purchaseAccount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pa: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sellAccount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sa: {
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
  }
});
