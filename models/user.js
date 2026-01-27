const Sequalize = require("sequelize");

const sequalize = require("../util/db");

const User = sequalize.define("user", {
  id: {
    type: Sequalize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequalize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequalize.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = User;
