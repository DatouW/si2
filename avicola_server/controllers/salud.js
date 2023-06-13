const { QueryTypes, Op } = require("sequelize");
const sequelize = require("../database");
const Vacuna = require("../models/vacuna");
const GalponVacuna = require("../models/galponvacuna");
const { registerLog } = require("./bitacora");

exports.getList = async (req, res) => {
  let sql =
    "SELECT g.id_galpon, v.nombre, gv.fecha, v.id_vac, gv.id " +
    "FROM galpon_vacuna gv " +
    "INNER JOIN galpon g " +
    "ON gv.id_galpon = g.id_galpon " +
    "INNER JOIN vacuna v " +
    "ON gv.id_vac = v.id_vac " +
    "ORDER BY gv.fecha DESC,gv.id DESC";
  try {
    const records = await sequelize.query(sql, { type: QueryTypes.SELECT });
    res.send({ status: 0, data: records });
  } catch (error) {
    console.log("salud get list", error);
    res.send({ status: 1, msg: error });
  }
};

exports.updateRecord = async (req, res) => {
  const { id, id_galpon, id_vac, fecha, nombre_usuario } = req.body;
  try {
    const vacc = await GalponVacuna.findByPk(id);
    const exist = await GalponVacuna.findOne({
      where: { id_galpon, id_vac, fecha },
    });
    // console.log(exist.toJSON());
    if (vacc) {
      if ((exist && exist.id == vacc.id) || exist == null) {
        vacc.id_vac = id_vac;
        vacc.fecha = fecha;
        await vacc.save();
        await registerLog(
          nombre_usuario,
          "Modificacion del registro de vacunacion"
        );

        res.send({
          status: 0,
          data: vacc,
          msg: "Registro modificado exitosamente",
        });
      } else {
        res.send({ status: 1, msg: "Registro duplicado" });
      }
    } else {
      res.send({ status: 1, msg: "No se ha encontrado el registro" });
    }
  } catch (error) {
    console.log("vaccine add", error);
    res.send({ status: 1, msg: error });
  }
};

exports.addRecord = async (req, res) => {
  const { id_galpon, id_vac, fecha, nombre_usuario } = req.body;
  try {
    const vacc = await GalponVacuna.findOne({
      where: {
        id_galpon,
        id_vac,
        fecha,
      },
    });
    if (vacc) {
      res.send({ status: 1, msg: "Registro duplicado" });
    } else {
      const vac = await GalponVacuna.create({
        id_galpon,
        id_vac,
        fecha,
      });
      await registerLog(nombre_usuario, "Registrar fecha de vacunacion");

      res.send({
        status: 0,
        data: vac,
        msg: "La vacunacion ha sido registrada exitosamente",
      });
    }
  } catch (error) {
    console.log("vaccine add", error);
    res.send({ status: 1, msg: error });
  }
};

exports.addVac = async (req, res) => {
  const { nombre, descripcion, nombre_usuario } = req.body;
  let regex = `%${nombre}%`;
  try {
    const exist = await Vacuna.findOne({
      where: {
        nombre: { [Op.iLike]: regex },
      },
    });
    if (exist) {
      res.send({ status: 1, msg: "Ya existe la vacuna introducida" });
    } else {
      const vacc = await Vacuna.create({
        nombre,
        descripcion,
      });

      await registerLog(nombre_usuario, "Añadir vacuna");

      res.send({ status: 0, data: vacc, msg: "Vacuna añadida exitosamente" });
    }
  } catch (error) {
    console.log("vaccine add", error);
    res.send({ status: 1, msg: error });
  }
};

exports.vaccList = async (req, res) => {
  try {
    const vacc = await Vacuna.findAll({
      order: ["id_vac"],
    });
    res.send({ status: 0, data: vacc });
  } catch (error) {
    console.log("vaccine list", error);
    res.send({ status: 1, msg: error });
  }
};

exports.updateVac = async (req, res) => {
  const { id_vac, nombre, descripcion, nombre_usuario } = req.body;
  try {
    const exist = await Vacuna.findByPk(id_vac);
    if (exist) {
      exist.nombre = nombre;
      exist.descripcion = descripcion;
      await exist.save();
      await registerLog(nombre_usuario, `Modificar datos de vacuna ${nombre}`);
      res.send({
        status: 0,
        data: vacc,
        msg: "Vacuna modificada exitosamente",
      });
    } else {
      res.send({ status: 1, msg: "Error al modificar la vacuna" });
    }
  } catch (error) {
    console.log("vaccine add", error);
    res.send({ status: 1, msg: error });
  }
};
