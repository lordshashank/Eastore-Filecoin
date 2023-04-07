// import { MongoClient } from "mongodb";
const { MongoClient } = require("mongodb");

const DB_NAME = "Eastore";

const db = {
  _dbClient: null,
  connect: async function (url) {
    console.log(url);
    const client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this._dbClient = client;
  },
  getConnection: function () {
    if (!this._dbClient) {
      console.log("You need to call the connect() function first!");
      process.exit(1);
    }

    return this._dbClient.db(DB_NAME);
  },
};
module.exports = db;
