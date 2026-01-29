const mongodb = require("mongodb");
const getDb = require("../util/db").getDb;

const ObjectId = mongodb.ObjectId;

// Sequelize ORM version
// const Sequalize = require("sequelize");
// const sequalize = require("../util/db");
//
// const User = sequalize.define("user", {
//   id: {
//     type: Sequalize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   name: {
//     type: Sequalize.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: Sequalize.STRING,
//     allowNull: false,
//     unique: true,
//   },
// });

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart; // {items: []}
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  addToCart(product) {
    const updatedItems = [...(this.cart?.items || [])]; //if there's no cart - items will be []

    const existingProductIndex = this.cart?.items.findIndex(
      (cp) => cp.productId.toString() === product._id.toString(),
    );

    if (existingProductIndex >= 0) {
      updatedItems[existingProductIndex].quantity += 1;
    } else {
      updatedItems.push({
        productId: new ObjectId(product._id),
        quantity: 1,
      });
    }

    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: { items: updatedItems } } },
      );
  }

  getCart() {
    const db = getDb();
    const productIds = this.cart.items.map((i) => {
      return i.productId;
    });
    return db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((p) => {
          return {
            ...p,
            quantity: this.cart.items.find((i) => {
              return i.productId.toString() === p._id.toString();
            }).quantity,
          };
        });
      });
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) })
      .then((user) => {
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = User;
