let mongoose = require("mongoose");
const databaseConfig = require("../config/database");
class Database {
  constructor() {
    this._connect();
  }
  _connect() {
    mongoose
      .connect(databaseConfig.database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
      })
      .then(() => {
        console.log("Database connection successful");
      })
      .catch((error) => {
        console.log("Database connection failed ");
      });
    mongoose.set("toJSON", {
      virtuals: true,
      versionKey: false,
      transform: (doc, converted) => {
        delete converted._id;
      },
    });
  }
}

// module.exports = new Database();
export const db = new Database();
