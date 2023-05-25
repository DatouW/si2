const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Ambiente = require("./ambiente");
const Lote = require("./lote");

const AmbienteLote = sequelize.define(
  "AmbienteLote",
  {
    fecha: {
      type: DataTypes.DATE,
      primaryKey: true,
      allowNull: false,
      references: {
        model: Ambiente,
        key: "fecha",
      },
    },
    hora: {
      type: DataTypes.TIME,
      primaryKey: true,
      allowNull: false,
      references: {
        model: Ambiente,
        key: "hora",
      },
    },
    id_lote: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    cantidad_defuncion: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "ambiente_lote",
    timestamps: false,
  }
);

Ambiente.belongsToMany(Lote, {
  through: AmbienteLote,
  foreignKey: "fecha",
  otherKey: "hora",
});
Lote.belongsToMany(Ambiente, { through: AmbienteLote, foreignKey: "id_lote" });

module.exports = AmbienteLote;
