import { DataTypes } from "sequelize";
import { mssql } from "../../connection/index.js";

export const ServiceBillDetail = mssql.define("serviceBillDetail", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  rbId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    //   foreignkey for servicehead id
  },
  docNo: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  detailId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING(1000),
    allowNull: true,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  ic: {
    type: DataTypes.INTEGER,
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
});
