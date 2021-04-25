import { User } from "../../models/user";
import { Group } from "../../models/group";
import { Expense } from "../../models/expense";
import { Membership } from "../../models/membership";
import { Note } from "../../models/note";

export let ExpenseHandler = {};

ExpenseHandler.register = (params, body, res) => {
  res.status(200).send("success");
};

ExpenseHandler.add = (params, body, res) => {
  return Expense.create({
    name: body.name,
    description: body.description,
    amount: body.amount,
    createdBy: body.createdBy,
  })
    .then((expense) => {
      Group.findOneAndUpdate(
        { _id: params.groupId },
        { $addToSet: { expenses: expense._id } }
      ).then((group) => res.status(200).send(expense));
    })
    .catch((error) => res.status(400).send(error));
};

ExpenseHandler.note = (params, body, res) => {
  return Note.create({
    note: body.note,
    createdBy: body.userId,
  })
    .then((note) =>
      Expense.findOneAndUpdate(
        { _id: params.expenseId },
        { $addToSet: { notes: note._id } },
        { returnOriginal: false, new: true }
      )
        .populate({ path: "notes", populate: { path: "createdBy" } })
        .then((expense) => res.status(200).send(expense))
    )
    .catch((error) => res.status(400).send(error));
};
