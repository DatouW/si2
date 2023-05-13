const sequelize = require("../database");
const Lote = require("../models/lote");
const { Op } = require("sequelize");
const { QueryTypes } = require("sequelize");

exports.getBatchList = async (req, res) => {
  try {
    const batches = await Lote.findAll({ order: ["id_lote"] });
    // console.log(batches);
    res.send({ status: 0, data: batches });
  } catch (error) {
    console.log(error);
    res.send({ status: 1, msg: error });
  }
};

exports.addBatch = async (req, res) => {
  const { nombre, fecha, proposito, cantidad, estado, procedencia } = req.body;
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
        fecha,
        proposito,
        cantidad,
        estado,
        procedencia,
      });
      res.send({ status: 0, msg: "producto anadido exitosamente", data: b });
    }
  } catch (error) {
    res.send({ status: 1, msg: error });
  }
};
exports.editBatch = async (req, res) => {
  const { id_lote, nombre, fecha, proposito, cantidad, estado, procedencia } =
    req.body;
  console.log(req.body);
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
          fecha,
          proposito,
          cantidad,
          estado,
          procedencia,
        },
        {
          where: {
            id_lote,
          },
        }
      );
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
  const { id_lote } = req.query;
  // console.log(id_lote);
  try {
    const batch = await Lote.findOne({
      where: {
        id_lote,
      },
    });
    if (batch) {
      await batch.destroy();
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
    });
    res.send({ status: 0, data: batches });
  } catch (error) {
    console.log(error);
    res.send({ status: 1, msg: error });
  }
};

exports.updateShed = async (req, res) => {
  const { id_lote, id_galpon } = req.body;
  try {
    const batch = await Lote.findByPk(id_lote);
    // console.log(batch);
    if (batch) {
      await sequelize.query(
        "CALL asignar_lote(:galpon_id,:lote_id)",
        {
          replacements: { galpon_id: id_galpon, lote_id: id_lote },
        },
        { type: sequelize.QueryTypes.SELECT }
      );
      res.send({ status: 0, msg: `Lote asignado al galpon ${id_galpon}` });
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
