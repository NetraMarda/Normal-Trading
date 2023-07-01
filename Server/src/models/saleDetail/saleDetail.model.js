import { DataTypes } from "sequelize";
import { mssql } from "../../connection/index.js";

export const SaleDetail = mssql.define("saleDetail", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    primaryKey: true,
    autoIncrement: true,
  },
  sbId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    //   foreignkey for salehead id
  },
  itemCode: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  rate: {
    type: DataTypes.FLOAT(18, 2),
    allowNull: true,
  },
  value: {
    type: DataTypes.FLOAT(18, 2),
    allowNull: true,
  },
  gstId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }, //FOREIGN KEY of gstratemaster id
  SGSTAmount: {
    type: DataTypes.FLOAT(18, 2),
    allowNull: true,
  },
  CGSTAmount: {
    type: DataTypes.FLOAT(18, 2),
    allowNull: true,
  },
  IGSTAmount: {
    type: DataTypes.FLOAT(18, 2),
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
    allowNull: true,
  },
  modifiedBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  ic: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }, //foriegnkey of itemmaster id
  saleAc: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }, //foreign key of id in account master
  sac: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }, //foregin key of id in account master
});
