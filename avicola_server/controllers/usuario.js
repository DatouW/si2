const { Op } = require("sequelize");
const Usuario = require("../models/usuario");
const Rol = require("../models/rol");
const bcrypt = require("bcryptjs");

exports.getUserList = async (req, res) => {
  const { id_rol } = req.query;
  try {
    let users;
    if (id_rol == 1) {
      users = await Usuario.findAll({
        attributes: { exclude: ["contraseña"] },
        include: {
          model: Rol,
          attributes: ["nombre"],
        },
        order: ["id_user"],
      });
    } else {
      users = await Usuario.findAll({
        attributes: { exclude: ["contraseña"] },
        where: {
          [Op.not]: [{ id_rol: 1 }],
        },
        include: {
          model: Rol,
          attributes: ["nombre"],
        },
        order: ["id_user"],
      });
    }

    // console.log(users);
    res.send({ status: 0, data: users });
  } catch (error) {
    console.log(error);
    res.send({ status: 1, msg: error });
  }
};

exports.putPwd = async (req, res) => {
  const { id_user, newpwd } = req.body;

  try {
    const user = await Usuario.findByPk(id_user);

    if (user) {
      user.contraseña = bcrypt.hashSync(newpwd, 10);
      await user.save();
      res.send({
        status: 0,
        msg: "La contraseña ha sido modificada exitosamente.",
      });
    } else {
      res.send({ status: 1, msg: "Error al cambiar contraseña." });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: 1, msg: error });
  }
};
