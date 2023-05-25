const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");
const { config } = require("../config");
const Rol = require("../models/rol");

exports.postLogin = async (req, res) => {
  const { nombre_usuario, contraseña } = req.body;
  try {
    let user = await Usuario.findOne({
      where: { nombre_usuario },
    });
    if (user) {
      const result = bcrypt.compareSync(contraseña, user.contraseña);
      if (!result) return res.send({ status: 1, msg: "Contraseña incorrecta" });

      user.contraseña = null;
      let rol = await Rol.findOne({
        attributes: ["permisos"],
        where: { id_rol: user.id_rol },
      });
      user.dataValues.permisos = rol.permisos;

      const tokenStr = jwt.sign(user.toJSON(), config.jwtSecretKey, {
        expiresIn: config.expiresIn,
      });
      user.dataValues.token = "Bearer " + tokenStr;
      res.send({ status: 0, data: user });
    } else {
      res.send({ status: 1, msg: "usuario incorrecto o no existe el usuario" });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: 1, msg: error.name });
  }
};

exports.postRegister = async (req, res) => {
  const { nombre_usuario, contraseña, id_rol } = req.body;
  console.log(req.body);
  try {
    const user = await Usuario.findOne({
      where: {
        nombre_usuario,
      },
    });
    if (user) {
      res.send({
        status: 1,
        msg: "Este nombre de usuario ya esta en uso o ya esta registrado. Prueba otro.",
      });
    } else {
      const u = await Usuario.create({
        nombre_usuario,
        contraseña: bcrypt.hashSync(contraseña, 10),
        id_rol,
      });
      u.contraseña = null;
      res.send({ status: 0, msg: "Se creo el usuario exitosamente", data: u });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: 1, msg: error });
  }
};
