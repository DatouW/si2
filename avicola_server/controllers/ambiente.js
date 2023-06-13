const { Lote } = require("../models");
const Ambiente = require("../models/ambiente");
const MortLote = require("../models/mortandadlote");
const { registerLog } = require("./bitacora");

exports.getAmbienteList = async (req, res) => {
  const { id_galpon } = req.query;
  // console.log(id_galpon);
  try {
    const dates = await Ambiente.findAll({
      where: { id_galpon },
      order: [["fecha", "DESC"]],
    });
    res.send({ status: 0, data: dates });
  } catch (error) {
    console.log(error);
    res.send({ status: 1, msg: error });
  }
};

exports.getmortList = async (req, res) => {
  try {
    const mort = await MortLote.findAll({
      order: [["fecha", "DESC"]],
      include: [
        {
          model: Lote,
          attributes: ["id_lote", "nombre"],
        },
      ],
    });
    // console.log(mort);
    res.send({ status: 0, data: mort });
  } catch (error) {
    console.log(error);
    res.send({ status: 1, msg: error });
  }
};

exports.addAmbiente = async (req, res) => {
  const { id_galpon, fecha, humedad, temperatura } = req.body;
  try {
    const amb = await Ambiente.findOne({
      where: { id_galpon, fecha },
    });
    if (amb) {
      res.send({ status: 1, msg: "Ya existe el registro" });
    } else {
      const nuevo = await Ambiente.create({
        id_galpon,
        fecha,
        humedad,
        temperatura,
      });
      res.send({ status: 0, data: nuevo, msg: "Registro agregado con exito" });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: 1, msg: error });
  }
};

exports.updateAmbiente = async (req, res) => {
  const { id_galpon, fecha, humedad, temperatura } = req.body;
  try {
    const amb = await Ambiente.findOne({
      where: { id_galpon, fecha },
    });
    if (amb) {
      //   amb.fecha = fecha;
      //   amb.hora = hora;
      amb.humedad = humedad;
      amb.temperatura = temperatura;
      await amb.save();
      res.send({ status: 0, data: amb });
    } else {
      res.send({ status: 1, msg: "Ya existe el registro" });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: 1, msg: error });
  }
};

exports.addMortality = async (req, res) => {
  const { fecha, id_lote, cantidad_defuncion } = req.body;
  try {
    const amb = await MortLote.findOne({
      where: { fecha, id_lote },
    });
    if (amb) {
      res.send({ status: 1, msg: "Ya existe el registro" });
    } else {
      const nuevo = await MortLote.create({
        fecha,
        id_lote,
        cantidad_defuncion,
      });
      const lote = await Lote.findOne({
        where: { id_lote },
        attributes: ["nombre"],
      });
      console.log(nuevo);

      res.send({
        status: 0,
        data: nuevo,
        msg: "Registro agregado exitosamente",
      });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: 1, msg: error });
  }
};

exports.updateMortality = async (req, res) => {
  const { fecha, id_lote, cantidad_defuncion } = req.body;
  try {
    const amb = await MortLote.findOne({
      where: { fecha, id_lote },
    });
    if (amb) {
      res.send({ status: 1, msg: "Ya existe el registro" });
    } else {
      await MortLote.update(
        {
          cantidad_defuncion,
        },
        {
          where: {
            fecha,
            id_lote,
          },
        }
      );
      res.send({ status: 0, msg: "Registro modificado exitosamente" });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: 1, msg: error });
  }
};
