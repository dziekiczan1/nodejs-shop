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
  constructor(id, name, email) {
    this.name = name;
    this.email = email;
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  static findById(id) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new ObjectId(id) })
      .then()
      .catch((err) => console.log(err));
  }
}
module.exports = User;
