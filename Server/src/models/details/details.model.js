import { DataTypes } from "sequelize";
import {mssql} from "../../connection/index.js";

export const Details = mssql.define("details", {
    headId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    detailsId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    itemCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ic: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    brandCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bc: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rate: {
      type: DataTypes.FLOAT(18, 2),
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT(18, 2),
      allowNull: false,
    },
    srno: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

// Details.belongsTo(Head, { foreignKey: "id", sourceKey :"headId" });