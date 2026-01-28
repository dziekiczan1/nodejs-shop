// const Sequalize = require("sequelize");
// const sequalize = require("../util/db");
//
// const Product = sequalize.define("product", {
//   id: {
//     type: Sequalize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   title: {
//     type: Sequalize.STRING,
//     allowNull: false,
//   },
//   price: {
//     type: Sequalize.DOUBLE,
//     allowNull: false,
//   },
//   imageUrl: {
//     type: Sequalize.STRING,
//     allowNull: false,
//   },
//   description: {
//     type: Sequalize.TEXT,
//     allowNull: false,
//   },
// });

const getDb = require("../util/db").getDb;

class Product {
  constructor(title, price, imageUrl, description) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
  }

  save() {
    const db = getDb();
    return db
      .collection("products")
      .insertOne(this)
      .then((result) => {
        console.log("Product Created");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Product;
