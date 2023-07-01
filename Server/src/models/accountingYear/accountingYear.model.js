import { DataTypes } from "sequelize";
import { mssql } from "../../connection/index.js";

export const AccountingYear = mssql.define("accountingYear", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  fromDate:{
    type: DataTypes.DATEONLY,
    allowNull:true,
  },
  toDate :{
    type:DataTypes.DATEONLY,
    allowNull:true
  },
  companyCode:{
    type:DataTypes.INTEGER,
    allowNull:true
  }
});
