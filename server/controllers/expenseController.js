import { User } from "../models/user";
import { Group } from "../models/group";
import { Expense } from "../models/expense";
import { Membership } from "../models/membership";
import { Note } from "../models/note";
import KafkaRunner from "../kafka/kafkaRunner";

const kafkaRunner = new KafkaRunner();

const producer = kafkaRunner.producer;
producer.connect();

kafkaRunner.startExpenseConsumer();

export let ExpenseController = {};

ExpenseController.register = (req, res) => {
  res.status(200).send("success");
};

ExpenseController.add = (req, res) => {
  const replyId = Math.random().toString(36).substr(2);
  kafkaRunner.pushResponses(replyId, res);

  producer.send({
    topic: "expense",
    messages: [
      {
        value: JSON.stringify({
          id: replyId,
          action: "add",
          params: req.params,
          body: req.body,
        }),
      },
    ],
  });
  // return Expense.create({
  //   name: req.body.name,
  //   description: req.body.description,
  //   amount: req.body.amount,
  //   createdBy: req.body.createdBy,
  // })
  //   .then((expense) => {
  //     Group.findOneAndUpdate(
  //       { _id: req.params.groupId },
  //       { $addToSet: { expenses: expense._id } }
  //     ).then((group) => res.status(200).send(expense));
  //   })
  //   .catch((error) => res.status(400).send(error));
};

ExpenseController.note = (req, res) => {
  const replyId = Math.random().toString(36).substr(2);
  kafkaRunner.pushResponses(replyId, res);

  producer.send({
    topic: "expense",
    messages: [
      {
        value: JSON.stringify({
          id: replyId,
          action: "note",
          params: req.params,
          body: req.body,
        }),
      },
    ],
  });
  // return Note.create({
  //   note: req.body.note,
  //   createdBy: req.body.userId,
  // })
  //   .then((note) =>
  //     Expense.findOneAndUpdate(
  //       { _id: req.params.expenseId },
  //       { $addToSet: { notes: note._id } },
  //       { returnOriginal: false, new: true }
  //     )
  //       .populate({ path: "notes", populate: { path: "createdBy" } })
  //       .then((expense) => res.status(200).send(expense))
  //   )
  //   .catch((error) => res.status(400).send(error));
};
