const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Ambiente = sequelize.define(
  "Ambiente",
  {
    fecha: {
      type: DataTypes.DATE,
      primaryKey: true,
      allowNull: false,
    },
    hora: {
      type: DataTypes.TIME,
      primaryKey: true,
      allowNull: false,
    },
    temperatura: {
      type: DataTypes.STRING,
    },
    humedad: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "ambiente",
    timestamps: false,
  }
);

module.exports = Ambiente;
