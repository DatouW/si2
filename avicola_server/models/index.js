const Lote = require("./lote");
const Rol = require("./rol");
const Usuario = require("./usuario");
const Galpon = require("./galpon");

// rol --- usuario
Rol.hasMany(Usuario, {
  foreignKey: "id_rol",
});

Usuario.belongsTo(Rol, {
  foreignKey: "id_rol",
});

// galpon ---- lote
Galpon.hasMany(Lote, {
  foreignKey: "id_galpon",
});
Lote.belongsTo(Galpon, {
  foreignKey: "id_galpon",
});

module.exports = {
  Rol,
  Usuario,
  Galpon,
  Lote,
};
