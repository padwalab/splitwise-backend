import { Kafka } from "kafkajs";
import { ExpenseHandler } from "./handlers/expenseHandler";
import { GroupHandler } from "./handlers/groupHandler";
import { MembershipHandler } from "./handlers/membershipHanlder";
import { UserHandler } from "./handlers/userHandler";

class KafkaRunner {
  constructor() {
    this.kafka = new Kafka({
      clientId: "my-app",
      brokers: ["kafka:9092"],
    });
    this.producer = this.kafka.producer();
    this.userConsumer = this.kafka.consumer({ groupId: "user-group" });
    this.membershipConsumer = this.kafka.consumer({
      groupId: "memebership-group",
    });
    this.groupConsumer = this.kafka.consumer({
      groupId: "group-group",
    });
    this.expenseConsumer = this.kafka.consumer({
      groupId: "expense-group",
    });
    this.responses = Object.create(null);
  }

  startExpenseConsumer() {
    this.expenseConsumer.connect();
    this.expenseConsumer.subscribe({ topic: "expense" });
    this.expenseConsumer.run({
      eachMessage: ({ topic, partition, message }) => {
        const data = JSON.parse(message.value.toString());
        console.log(data);
        switch (data.action) {
          case "add":
            ExpenseHandler.add(data.params, data.body, this.responses[data.id]);
            break;
          case "note":
            ExpenseHandler.note(
              data.params,
              data.body,
              this.responses[data.id]
            );
            break;
        }
      },
    });
  }

  startGroupConsumer() {
    this.groupConsumer.connect();
    this.groupConsumer.subscribe({ topic: "group" });
    this.groupConsumer.run({
      eachMessage: ({ topic, partition, message }) => {
        const data = JSON.parse(message.value.toString());
        console.log(data);
        switch (data.action) {
          case "create":
            GroupHandler.create(
              data.params,
              data.body,
              this.responses[data.id]
            );
            break;
          case "get":
            GroupHandler.get(data.params, data.body, this.responses[data.id]);
            break;
          case "members":
            GroupHandler.members(
              data.params,
              data.body,
              this.responses[data.id]
            );
            break;
          case "memberships":
            GroupHandler.memberships(
              data.params,
              data.body,
              this.responses[data.id]
            );
            break;
        }
      },
    });
  }

  startMembershipConsumer() {
    this.membershipConsumer.connect();
    this.membershipConsumer.subscribe({ topic: "membership" });

    this.membershipConsumer.run({
      eachMessage: ({ topic, partition, message }) => {
        const data = JSON.parse(message.value.toString());
        console.log(data);
        switch (data.action) {
          case "add":
            MembershipHandler.add(
              data.params,
              data.body,
              this.responses[data.id]
            );
            break;
          case "exit":
            MembershipHandler.exit(
              data.params,
              data.body,
              this.responses[data.id]
            );
            break;
          case "userBalance":
            MembershipHandler.userBalance(
              data.params,
              data.body,
              this.responses[data.id]
            );
            break;
          case "settleUp":
            MembershipHandler.settleUp(
              data.params,
              data.body,
              this.responses[data.id]
            );
            break;
        }
      },
    });
  }

  startUserConsumer() {
    this.userConsumer.connect();
    this.userConsumer.subscribe({ topic: "user" });

    this.userConsumer.run({
      eachMessage: ({ topic, partition, message }) => {
        const data = JSON.parse(message.value.toString());
        console.log(data);
        switch (data.action) {
          case "signin":
            UserHandler.signin(data.params, data.body, this.responses[data.id]);
            delete this.responses[data.id];
            break;
          case "list":
            UserHandler.list(data.params, data.body, this.responses[data.id]);
            delete this.responses[data.id];
            break;
          case "login":
            UserHandler.login(data.params, data.body, this.responses[data.id]);
            delete this.responses[data.id];
            break;
          case "update":
            UserHandler.update(data.params, data.body, this.responses[data.id]);
            delete this.responses[data.id];
            break;
          case "groups":
            UserHandler.groups(data.params, data.body, this.responses[data.id]);
            delete this.responses[data.id];
            break;
          case "getInvites":
            UserHandler.getInvites(
              data.params,
              data.body,
              this.responses[data.id]
            );
            delete this.responses[data.id];
            break;
          case "getUserDetails":
            UserHandler.getUserDetails(
              data.params,
              data.body,
              this.responses[data.id]
            );
            delete this.responses[data.id];
            break;
          case "getUserIdFromEmail":
            UserHandler.getUserIdFromEmail(
              data.params,
              data.body,
              this.responses[data.id]
            );
            delete this.responses[data.id];
            break;
          case "invite":
            UserHandler.invite(data.params, data.body, this.responses[data.id]);
            delete this.responses[data.id];
            break;
          case "accept":
            UserHandler.accept(data.params, data.body, this.responses[data.id]);
            delete this.responses[data.id];
            break;
        }
      },
    });
  }

  pushResponses(replyId, res) {
    this.responses[replyId] = res;
  }
}

export default KafkaRunner;
