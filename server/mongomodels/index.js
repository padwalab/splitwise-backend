let mongoose = require("mongoose");

const server = "localhost:27017";
const database = "test";

class Database {
  constructor() {
    this._connect();
  }
  _connect() {
    mongoose
      .connect(`mongodb://${server}/${database}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Database connection successful");
      })
      .catch((error) => {
        console.log("Database connection failed ");
      });
  }
}

module.exports = Database;
