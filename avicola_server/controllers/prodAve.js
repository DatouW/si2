const sequelize = require("../database");
const Ave = require("../models/ave");
const Lote = require("../models/lote");
const { Op } = require("sequelize");
const { registerLog } = require("./bitacora");
const { Galpon } = require("../models");

exports.getBatchList = async (req, res) => {
  try {
    const batches = await Lote.findAll({
      order: ["id_lote"],
      include: [
        {
          model: Ave,
        },
      ],
    });
    // console.log(batches);
    res.send({ status: 0, data: batches });
  } catch (error) {
    console.log(error);
    res.send({ status: 1, msg: error });
  }
};
exports.getBatchId = async (req, res) => {
  try {
    const batches = await Lote.findAll({
      order: ["id_lote"],
      attributes: ["id_lote", "nombre"],
    });
    // console.log(batches);
    res.send({ status: 0, data: batches });
  } catch (error) {
    console.log(error);
    res.send({ status: 1, msg: error });
  }
};
exports.addBatch = async (req, res) => {
  const {
    nombre,
    fecha_ingreso,
    origen,
    descripcion,
    cantidad,
    id_ave,
    nombre_usuario,
  } = req.body;
  try {
    const batch = await Lote.findOne({
      where: {
        nombre,
      },
    });
    if (batch) {
      res.send({ status: 1, msg: "ya existe el producto" });
    } else {
      const b = await Lote.create({
        nombre,
        fecha_ingreso,
        descripcion,
        cantidad,
        origen,
        id_ave,
      });
      await registerLog(nombre_usuario, "Ingresar nuevo lote");
      res.send({ status: 0, msg: "producto anadido exitosamente", data: b });
    }
  } catch (error) {
    res.send({ status: 1, msg: error });
  }
};

exports.editBatch = async (req, res) => {
  const {
    id_lote,
    nombre,
    fecha_ingreso,
    origen,
    descripcion,
    cantidad,
    id_ave,
    nombre_usuario,
  } = req.body;
  // console.log(req.body);
  try {
    // verifica si existe el lote
    const batch = await Lote.findOne({
      where: {
        id_lote,
      },
    });
    //en caso de que exista
    if (batch) {
      await Lote.update(
        {
          nombre,
          fecha_ingreso,
          descripcion,
          cantidad,
          origen,
          id_ave,
        },
        {
          where: {
            id_lote,
          },
        }
      );
      await registerLog(nombre_usuario, `Modificar datos de ${nombre}`);

      res.send({ status: 0, msg: "lote modificado con exito" });
    } else {
      res.send({ status: 1, msg: "no existe el lote" });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: 1, msg: "el nombre del lote esta duplicado" });
  }
};

exports.deleteBatch = async (req, res) => {
  const { id_lote, nombre_usuario } = req.query;
  // console.log(id_lote);
  try {
    const batch = await Lote.findOne({
      where: {
        id_lote,
      },
    });
    if (batch) {
      await batch.destroy();
      await registerLog(nombre_usuario, `Eliminar ${nombre}`);
      res.send({ status: 0, msg: "eliminado existosamente" });
    } else {
      res.send({
        status: 1,
        msg: "no se encontro el lote que desea eliminar",
      });
    }
  } catch (error) {
    res.send({ status: 1, msg: error });
  }
};

exports.searchBatches = async (req, res) => {
  const { str } = req.query;
  console.log(str);
  let regex = `%${str}%`;
  // console.log(regex);
  try {
    const batches = await Lote.findAll({
      where: {
        nombre: { [Op.like]: regex },
      },
      order: ["id_lote"],
      include: [
        {
          model: Ave,
        },
      ],
    });
    res.send({ status: 0, data: batches });
  } catch (error) {
    console.log(error);
    res.send({ status: 1, msg: error });
  }
};

exports.updateShed = async (req, res) => {
  const { id_lote, id_galpon, nombre_usuario } = req.body;
  try {
    const batch = await Lote.findByPk(id_lote);
    // console.log(batch);
    if (batch) {
      const gal = await Galpon.findByPk(id_galpon);
      if (gal.en_cuar) {
        res.send({ status: 1, msg: "Galpon en cuarentena" });
      } else {
        await sequelize.query(
          "CALL asignar_lote(:galpon_id,:lote_id)",
          {
            replacements: { galpon_id: id_galpon, lote_id: id_lote },
          },
          { type: sequelize.QueryTypes.SELECT }
        );
        await registerLog(
          nombre_usuario,
          `Trasladacion del ${batch.nombre} al galpon ${id_galpon}`
        );
        res.send({ status: 0, msg: `Lote asignado al galpon ${id_galpon}` });
      }
    } else {
      res.send({
        status: 1,
        msg: "no se encontro el lote",
      });
    }
  } catch (error) {
    console.log("update shed batch: ", error);
    res.send({
      status: 1,
      msg: "El galpón no tiene suficiente capacidad para asignar el lote",
    });
  }
};

exports.updateSalida = async (req, res) => {
  const { id_lote, fecha_salida, destino, nombre_usuario } = req.body;
  try {
    const batch = await Lote.findByPk(id_lote);
    // console.log(batch);
    if (batch) {
      batch.fecha_salida = fecha_salida;
      batch.destino = destino;
      await batch.save();
      await registerLog(
        nombre_usuario,
        `Modificar la salida del ${batch.nombre}`
      );
      res.send({ status: 0, data: batch });
    } else {
      res.send({
        status: 1,
        msg: "no se encontro el lote",
      });
    }
  } catch (error) {
    console.log("update salida batch: ", error);
    res.send({
      status: 1,
      msg: "Error al modificar",
    });
  }
};
