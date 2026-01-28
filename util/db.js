// MYSQL
// const Sequalize = require("sequelize");
//
// const sequelize = new Sequalize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     dialect: "mysql",
//     host: process.env.DB_HOST,
//   },
// );
//
// module.exports = sequelize;

// MONGODB
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      console.log("Connected to database");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
