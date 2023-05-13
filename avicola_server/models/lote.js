const { DataTypes } = require("sequelize");
const sequelize = require("../database/index");

const Lote = sequelize.define(
  "lote",
  {
    id_lote: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    proposito: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    procedencia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_galpon: {
      type: DataTypes.INTEGER,
    },
  },

  {
    tableName: "lote",
    timestamps: false,
  }
);

module.exports = Lote;
