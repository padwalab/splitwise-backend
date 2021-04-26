// import { Kafka } from "kafkajs";
// class UserConsumer {
//   constructor(consumer) {
//     // this.kafka = new Kafka({
//     //   clientId: "my-app",
//     //   brokers: ["kafka:9092"],
//     // });
//     this.consumer = consumer;
//     // this.consumer = kafka.consumer({ groupId: "test-group" });
//     this.responses = Object.create(null);
//   }
//   startUserConsumers() {
//     this.consumer.connect();
//     this.consumer.subscribe({ topic: "user" });
//     this.consumer.run({
//       eachMessage: ({ topic, partition, message }) => {
//         const data = JSON.parse(message.value.toString());
//         console.log(data);
//         switch (data.action) {
//           case "signin":
//             UserHandler.signin(data.params, data.body, this.responses[data.id]);
//             delete this.responses[data.id];
//             break;
//           case "list":
//             UserHandler.list(data.params, data.body, this.responses[data.id]);
//             delete this.responses[data.id];
//             break;
//           case "login":
//             UserHandler.login(data.params, data.body, this.responses[data.id]);
//             delete this.responses[data.id];
//             break;
//           case "update":
//             UserHandler.update(data.params, data.body, this.responses[data.id]);
//             delete this.responses[data.id];
//             break;
//           case "groups":
//             UserHandler.groups(data.params, data.body, this.responses[data.id]);
//             delete this.responses[data.id];
//             break;
//           case "getInvites":
//             UserHandler.getInvites(
//               data.params,
//               data.body,
//               this.responses[data.id]
//             );
//             delete this.responses[data.id];
//             break;
//           case "getUserDetails":
//             UserHandler.getUserDetails(
//               data.params,
//               data.body,
//               this.responses[data.id]
//             );
//             delete this.responses[data.id];
//             break;
//           case "getUserIdFromEmail":
//             UserHandler.getUserIdFromEmail(
//               data.params,
//               data.body,
//               this.responses[data.id]
//             );
//             delete this.responses[data.id];
//             break;
//           case "invite":
//             UserHandler.invite(data.params, data.body, this.responses[data.id]);
//             delete this.responses[data.id];
//             break;
//           case "accept":
//             UserHandler.accept(data.params, data.body, this.responses[data.id]);
//             delete this.responses[data.id];
//             break;
//         }
//       },
//     });
//   }
//   pushResponses(replyId, res) {
//     // this.userConsumer.pushResponses(replyId, res);
//     this.responses[replyId] = res;
//   }
// }
// export default UserConsumer;
"use strict";