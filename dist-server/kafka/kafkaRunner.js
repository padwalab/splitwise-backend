"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _kafkajs = require("kafkajs");

var _expenseHandler = require("./handlers/expenseHandler");

var _groupHandler = require("./handlers/groupHandler");

var _membershipHanlder = require("./handlers/membershipHanlder");

var _userHandler = require("./handlers/userHandler");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var KafkaRunner = /*#__PURE__*/function () {
  function KafkaRunner() {
    _classCallCheck(this, KafkaRunner);

    this.kafka = new _kafkajs.Kafka({
      clientId: "my-app",
      brokers: ["kafka:9092"]
    });
    this.producer = this.kafka.producer();
    this.userConsumer = this.kafka.consumer({
      groupId: "user-group"
    });
    this.membershipConsumer = this.kafka.consumer({
      groupId: "memebership-group"
    });
    this.groupConsumer = this.kafka.consumer({
      groupId: "group-group"
    });
    this.expenseConsumer = this.kafka.consumer({
      groupId: "expense-group"
    });
    this.responses = Object.create(null);
  }

  _createClass(KafkaRunner, [{
    key: "startExpenseConsumer",
    value: function startExpenseConsumer() {
      var _this = this;

      this.expenseConsumer.connect();
      this.expenseConsumer.subscribe({
        topic: "expense"
      });
      this.expenseConsumer.run({
        eachMessage: function eachMessage(_ref) {
          var topic = _ref.topic,
              partition = _ref.partition,
              message = _ref.message;
          var data = JSON.parse(message.value.toString());
          console.log(data);

          switch (data.action) {
            case "add":
              _expenseHandler.ExpenseHandler.add(data.params, data.body, _this.responses[data.id]);

              break;

            case "note":
              _expenseHandler.ExpenseHandler.note(data.params, data.body, _this.responses[data.id]);

              break;
          }
        }
      });
    }
  }, {
    key: "startGroupConsumer",
    value: function startGroupConsumer() {
      var _this2 = this;

      this.groupConsumer.connect();
      this.groupConsumer.subscribe({
        topic: "group"
      });
      this.groupConsumer.run({
        eachMessage: function eachMessage(_ref2) {
          var topic = _ref2.topic,
              partition = _ref2.partition,
              message = _ref2.message;
          var data = JSON.parse(message.value.toString());
          console.log(data);

          switch (data.action) {
            case "create":
              _groupHandler.GroupHandler.create(data.params, data.body, _this2.responses[data.id]);

              break;

            case "get":
              _groupHandler.GroupHandler.get(data.params, data.body, _this2.responses[data.id]);

              break;

            case "members":
              _groupHandler.GroupHandler.members(data.params, data.body, _this2.responses[data.id]);

              break;

            case "memberships":
              _groupHandler.GroupHandler.memberships(data.params, data.body, _this2.responses[data.id]);

              break;
          }
        }
      });
    }
  }, {
    key: "startMembershipConsumer",
    value: function startMembershipConsumer() {
      var _this3 = this;

      this.membershipConsumer.connect();
      this.membershipConsumer.subscribe({
        topic: "membership"
      });
      this.membershipConsumer.run({
        eachMessage: function eachMessage(_ref3) {
          var topic = _ref3.topic,
              partition = _ref3.partition,
              message = _ref3.message;
          var data = JSON.parse(message.value.toString());
          console.log(data);

          switch (data.action) {
            case "add":
              _membershipHanlder.MembershipHandler.add(data.params, data.body, _this3.responses[data.id]);

              break;

            case "exit":
              _membershipHanlder.MembershipHandler.exit(data.params, data.body, _this3.responses[data.id]);

              break;

            case "userBalance":
              _membershipHanlder.MembershipHandler.userBalance(data.params, data.body, _this3.responses[data.id]);

              break;

            case "settleUp":
              _membershipHanlder.MembershipHandler.settleUp(data.params, data.body, _this3.responses[data.id]);

              break;
          }
        }
      });
    }
  }, {
    key: "startUserConsumer",
    value: function startUserConsumer() {
      var _this4 = this;

      this.userConsumer.connect();
      this.userConsumer.subscribe({
        topic: "user"
      });
      this.userConsumer.run({
        eachMessage: function eachMessage(_ref4) {
          var topic = _ref4.topic,
              partition = _ref4.partition,
              message = _ref4.message;
          var data = JSON.parse(message.value.toString());
          console.log(data);

          switch (data.action) {
            case "signin":
              _userHandler.UserHandler.signin(data.params, data.body, _this4.responses[data.id]);

              delete _this4.responses[data.id];
              break;

            case "list":
              _userHandler.UserHandler.list(data.params, data.body, _this4.responses[data.id]);

              delete _this4.responses[data.id];
              break;

            case "login":
              _userHandler.UserHandler.login(data.params, data.body, _this4.responses[data.id]);

              delete _this4.responses[data.id];
              break;

            case "update":
              _userHandler.UserHandler.update(data.params, data.body, _this4.responses[data.id]);

              delete _this4.responses[data.id];
              break;

            case "groups":
              _userHandler.UserHandler.groups(data.params, data.body, _this4.responses[data.id]);

              delete _this4.responses[data.id];
              break;

            case "getInvites":
              _userHandler.UserHandler.getInvites(data.params, data.body, _this4.responses[data.id]);

              delete _this4.responses[data.id];
              break;

            case "getUserDetails":
              _userHandler.UserHandler.getUserDetails(data.params, data.body, _this4.responses[data.id]);

              delete _this4.responses[data.id];
              break;

            case "getUserIdFromEmail":
              _userHandler.UserHandler.getUserIdFromEmail(data.params, data.body, _this4.responses[data.id]);

              delete _this4.responses[data.id];
              break;

            case "invite":
              _userHandler.UserHandler.invite(data.params, data.body, _this4.responses[data.id]);

              delete _this4.responses[data.id];
              break;

            case "accept":
              _userHandler.UserHandler.accept(data.params, data.body, _this4.responses[data.id]);

              delete _this4.responses[data.id];
              break;
          }
        }
      });
    }
  }, {
    key: "pushResponses",
    value: function pushResponses(replyId, res) {
      this.responses[replyId] = res;
    }
  }]);

  return KafkaRunner;
}();

var _default = KafkaRunner;
exports["default"] = _default;