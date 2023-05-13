const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("avicola", "postgres", "abc123", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
