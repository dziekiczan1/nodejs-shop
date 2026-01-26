const Sequalize = require("sequelize");

const sequalize = requie("../utils/db");

const Product = sequalize.define("product", {
  id: {
    type: Sequalize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequalize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequalize.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: Sequalize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequalize.TEXT,
    allowNull: false,
  },
});

module.exports = Product;
