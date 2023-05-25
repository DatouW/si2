const Ave = require("../models/ave");

exports.getSpeciesList = async (req, res) => {
  try {
    const especies = await Ave.findAll({ order: ["id"] });
    // console.log(batches);
    res.send({ status: 0, data: especies });
  } catch (error) {
    console.log(error);
    res.send({ status: 1, msg: error });
  }
};

exports.addSpecies = async (req, res) => {
  const { especie } = req.body;
  try {
    const es = await Ave.findOne({ where: { especie } });
    if (es) {
      res.send({ status: 1, msg: "Ya existe la especie introducida" });
    } else {
      const nueva = await Ave.create({ especie });
      res.send({ status: 0, data: nueva });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: 1, msg: error });
  }
};

exports.UpdateSpecies = async (req, res) => {
  const { id, especie } = req.body;
  console.log(req.body);
  try {
    const es = await Ave.findByPk(id);
    console.log(id);
    if (es) {
      es.especie = especie;
      await es.save();
      res.send({ status: 0, msg: "" });
    } else {
      res.send({ status: 1, data: "Error al modificar..." });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: 1, msg: error });
  }
};
