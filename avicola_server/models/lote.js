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
    descripcion: DataTypes.STRING,
    fecha_ingreso: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    fecha_salida: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    destino: DataTypes.CHAR,
    archivado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    id_galpon: {
      type: DataTypes.INTEGER,
    },
    id_ave: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "lote",
    timestamps: false,
  }
);

module.exports = Lote;
