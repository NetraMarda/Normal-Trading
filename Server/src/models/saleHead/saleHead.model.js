import { DataTypes } from "sequelize";
import {mssql} from "../../connection/index.js";

export const SaleHead = mssql.define("saleHead", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tranType: {
      type: DataTypes.CHAR(2),
      allowNull: true,
    },
    cashCredit: {
      type: DataTypes.STRING(2),
      allowNull: true,
    },
    docNo: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    docDate: {
      type:  DataTypes.DATEONLY,
      allowNull: true,
    },
    billTo: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    shipTo: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    broker: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    LRNo: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    truckNo: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    taxableAmount: {
      type: DataTypes.FLOAT(18,2),
      allowNull: true,
    },
    CGSTAmount: {
      type: DataTypes.FLOAT(18,2),
      allowNull: true,
    },
    SGSTAmount: {
      type: DataTypes.FLOAT(18,2),
      allowNull: true,
    },
    IGSTAmount: {
      type: DataTypes.FLOAT(18,2),
      allowNull: true,
    },
    postage: {
      type: DataTypes.FLOAT(18,2),
      allowNull: true,
    },
    amount: {
      type: DataTypes.FLOAT(18,2),
      allowNull: true,
    },
    TCSPar: {
      type: DataTypes.FLOAT(18,2),
      allowNull: true,
    },
    TCSAmount: {
      type: DataTypes.FLOAT(18,2),
      allowNull: true,
    },
    companyCode: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    ac: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    //   foreign key acctmast id
    bc: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    //   foriegn key acctmast id
    TDSRate:{
        type: DataTypes.FLOAT(18,3),
        allowNull: true,
    },
    TDSAmount:{
        type: DataTypes.FLOAT(18,2),
        allowNull: true,
    },
 
  });
  