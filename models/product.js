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

const mongodb = require("mongodb");
const getDb = require("../util/db").getDb;

class Product {
  constructor(title, price, imageUrl, description, id, userId) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      dbOp = db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection("products").insertOne(this);
    }
    return dbOp
      .then((result) => {
        console.log("Product Created");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        return products;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then((product) => {
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deleteById(prodId, userId) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .then((result) => {
        return db.collection("users").updateOne(
          { _id: new mongodb.ObjectId(userId) },
          {
            $pull: {
              "cart.items": { productId: new mongodb.ObjectId(prodId) },
            },
          },
        );
      })
      .then((result) => {
        console.log("Cart Item Deleted");
      })
      .then(() => {
        console.log("Product Deleted");
      });
  }
}

module.exports = Product;
