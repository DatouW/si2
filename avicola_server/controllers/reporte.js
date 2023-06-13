const { QueryTypes } = require("sequelize");
const sequelize = require("../database");

exports.getDeathByDate = async (req, res) => {
  const { start, end } = req.query;
  let sql =
    "SELECT g.id_galpon, SUM(lote.cantidad) cantidad,SUM(ml.cantidad_defuncion) mortalidad " +
    "FROM mort_lote ml " +
    "INNER JOIN lote " +
    "ON ml.id_lote = lote.id_lote " +
    "INNER JOIN galpon g " +
    "ON g.id_galpon = lote.id_galpon " +
    `WHERE ml.fecha BETWEEN '${start}' AND '${end}' ` +
    "GROUP BY g.id_galpon " +
    "ORDER BY g.id_galpon;";
  try {
    const records = await sequelize.query(sql, { type: QueryTypes.SELECT });

    res.send({ status: 0, data: records });
  } catch (error) {
    console.log(error);
    res.send({ status: 1, msg: "Tiempo de espera agotado de conexión" });
  }
};
