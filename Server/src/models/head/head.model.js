import { DataTypes } from "sequelize";
import {mssql} from "../../connection/index.js";


export const Head = mssql.define("head", {
  billNo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  billDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  accountCode: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  accountId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  vehicleNo: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  ewayNo: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  taxable: {
    type: DataTypes.FLOAT(18, 2),
    allowNull: false,
  },
  exps: {
    type: DataTypes.FLOAT(18, 2),
    allowNull: false,
  },
  GST: {
    type: DataTypes.FLOAT(18, 2),
    allowNull: false,
  },
  amt: {
    type: DataTypes.FLOAT(18, 2),
    allowNull: false,
  },
  companyCode: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  yearCode: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdBy: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  modifiedBy: {
    type: DataTypes.STRING,
  },
});

// Head.hasMany(Details, { foreignKey: "headId" , targetKey:"id" });

