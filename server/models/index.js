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
        poolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4,
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
