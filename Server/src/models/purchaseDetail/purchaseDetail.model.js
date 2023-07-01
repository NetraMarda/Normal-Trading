import { DataTypes } from "sequelize";
import {mssql} from "../../connection/index.js";

export const PurchaseDetail = mssql.define("purchaseDetail", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    psId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    //   foreignkey for purchasehead id
    }, 
    itemCode: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    quantity: {
      type:  DataTypes.INTEGER,
      allowNull: true,
    },
    rate: {
      type: DataTypes.FLOAT(18,2),
      allowNull: true,
    },
    value: {
      type: DataTypes.FLOAT(18,2),
      allowNull: true,
    },
    gstId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }, //FOREIGN KEY og gstratemaster id
    SGSTAmount: {
      type: DataTypes.FLOAT(18,2),
      allowNull: true,
    },
    CGSTAmount: {
      type: DataTypes.FLOAT(18,2),
      allowNull: true,
    },
    IGSTAmount: {
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
    ic: {
        type: DataTypes.INTEGER,
        allowNull: true,
      }, //foriegnkey of itemmaster id
    purchaseAc: {
        type: DataTypes.INTEGER,
        allowNull: true,
      }, //foreign key of id in account master
    pac: {
        type: DataTypes.INTEGER,
        allowNull: true,
      }, //foregin key of id in account master
   
  });
  
  