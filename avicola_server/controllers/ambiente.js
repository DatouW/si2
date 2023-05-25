const { Lote } = require("../models");
const Ambiente = require("../models/ambiente");
const AmbienteLote = require("../models/ambientelote");

exports.getAmbienteList = async (req, res) => {
  try {
    const dates = await Ambiente.findAll({
      order: ["fecha", "hora"],
      //   include: [
      //     {
      //       model: Lote,
      //       attributes: ["id_lote", "nombre"],
      //       through: {
      //         model: AmbienteLote,
      //         attributes: ["cantidad_defuncion"],
      //       },
      //     },
      //   ],
    });
    res.send({ status: 0, data: dates });
  } catch (error) {
    console.log(error);
    res.send({ status: 1, msg: error });
  }
};

exports.addAmbiente = async (req, res) => {
  const { fecha, hora, humedad, temperatura } = req.body;
  try {
    const amb = await Ambiente.findOne({
      where: { fecha, hora },
    });
    if (amb) {
      res.send({ status: 1, msg: "Ya existe el registro" });
    } else {
      const nuevo = await Ambiente.create({
        fecha,
        hora,
        humedad,
        temperatura,
      });
      res.send({ status: 0, data: nuevo });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: 1, msg: error });
  }
};

exports.updateAmbiente = async (req, res) => {
  const { fecha, hora, humedad, temperatura } = req.body;
  try {
    const amb = await Ambiente.findOne({
      where: { fecha, hora },
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

exports.addBatch = async (req, res) => {
  const { fecha, hora, id_lote, cantidad_defuncion } = req.body;
  try {
    const amb = await AmbienteLote.findOne({
      where: { fecha, hora, id_lote },
    });
    if (amb) {
      res.send({ status: 1, msg: "Ya existe el registro" });
    } else {
      const nuevo = await AmbienteLote.create({
        fecha,
        hora,
        id_lote,
        cantidad_defuncion,
      });
      res.send({ status: 0, data: nuevo });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: 1, msg: error });
  }
};

exports.updateBatch = async (req, res) => {
  const { fecha, hora, id_lote, cantidad_defuncion } = req.body;
  try {
    const amb = await AmbienteLote.findOne({
      where: { fecha, hora, id_lote },
    });
    if (amb) {
      res.send({ status: 1, msg: "Ya existe el registro" });
    } else {
      const nuevo = await AmbienteLote.update(
        {
          cantidad_defuncion,
        },
        {
          where: {
            fecha,
            hora,
            id_lote,
          },
        }
      );
      res.send({ status: 0, data: nuevo });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: 1, msg: error });
  }
};
