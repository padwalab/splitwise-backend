const usersController = require("../controllers").users;
const groupsController = require("../controllers").groups;
const expensesController = require("../controllers").expenses;
const usergroupsController = require("../controllers").usergroups;
module.exports = (app) => {
  app.get("/api", (req, res) =>
    res.status(200).send({
      message: "Welcome to the Splitwise backend",
    })
  );
  app.post("/signin", usersController.create);
  app.get("/api/users", usersController.list);
  app.post("/login", usersController.validateUser);
  app.get("/api/users/:userEmail", usersController.getUserId);
  app.get("/api/user/:id", usersController.getUserNameFromId);
  app.post("/api/groups", groupsController.create);
  app.get("/api/groups", groupsController.list);
  app.post("/api/groups/:expensesId/expense", expensesController.create);
  app.get("/api/expenses", expensesController.list);
  app.post("/api/groups/:groupId/add", usergroupsController.AddUserToGroup);
  app.get("/api/groups/:userId", usergroupsController.GetUserGroup);
  app.get("/api/group/:groupId", groupsController.getGroup);
  app.get("/api/group/:groupId/members", usergroupsController.getGroupMembers);
  app.put("/api/expenses/add_share", usergroupsController.updateUserShare);
  app.post("/api/groups/userbalance", usergroupsController.getUserBalance);
  app.get(
    "/api/user/:userId/balance",
    usergroupsController.getUserTotalBalance
  );
};
