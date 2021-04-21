let mongoose = require("mongoose");

const server = "splitwise_mongo:27017";
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
