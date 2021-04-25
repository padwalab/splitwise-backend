"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var mongoose = require("mongoose");

var databaseConfig = require("../config/database");

var Database = /*#__PURE__*/function () {
  function Database() {
    _classCallCheck(this, Database);

    this._connect();
  }

  _createClass(Database, [{
    key: "_connect",
    value: function _connect() {
      mongoose.connect(databaseConfig.database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true
      }).then(function () {
        console.log("Database connection successful");
      })["catch"](function (error) {
        console.log("Database connection failed ");
      });
      mongoose.set("toJSON", {
        virtuals: true,
        versionKey: false,
        transform: function transform(doc, converted) {
          delete converted._id;
        }
      });
    }
  }]);

  return Database;
}(); // module.exports = new Database();


var db = new Database();
exports.db = db;