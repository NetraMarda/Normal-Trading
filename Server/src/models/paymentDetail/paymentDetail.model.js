import { DataTypes } from "sequelize";
import { mssql } from "../../connection/index.js";

export const PaymentDetails = mssql.define("paymentDetails", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  tranId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  tranType: {
    type: DataTypes.STRING(5),
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
  detailId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  amount: {
    type: DataTypes.DECIMAL(18, 2),
    allowNull: true,
  },
  drcr: {
    type: DataTypes.CHAR(1),
    allowNull: true,
  },
  narration: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },

  ac: {
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
