import { DataTypes } from "sequelize";
import { mssql } from "../../connection/index.js";

export const UserForms = mssql.define("userForms", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  formName: {
    type: DataTypes.STRING(25),
    allowNull: false,
  },
});
