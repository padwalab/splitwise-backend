var assert = require("chai").assert;
var app = require("./app");

var chai = require("chai");
chai.use(require("chai-http"));
var expect = require("chai").expect;

var agent = require("chai").request.agent(app);

describe("Splitwise Backend Testing", function () {
  it("GET Try healthcheck endpoitn", function () {
    agent.get("/api").then(function (res) {
      expect(res.body.result.length).to.greaterThan(1);
    });
  });
  it("should should login user", function () {
    agent
      .post("/login")
      .send({ email: "a@g.com", password: "a" })
      .then(function (res) {
        expect(res.body.result.length).to.greaterThan(1);
      });
  });
  it("should should login user", function () {
    agent
      .put("/api/user/a@g.com")
      .send({ name: "Fake Name", password: "a" })
      .then(function (res) {
        expect(res.body.result.length).to.greaterThan(1);
      });
  });
  it("should be bale to list users", function () {
    agent.get("/api/users").then(function (res) {
      expect(res.body.result.length).to.greaterThan(1);
    });
  });
  it("should should be able to get user by email", function () {
    agent.get("/api/user/get/a@g.com").then(function (res) {
      expect(res.body.result.length).to.greaterThan(1);
    });
  });
  it("should should be able to get user  id", function () {
    agent.get("/api/users/a@g.com").then(function (res) {
      expect(res.body.result.length).to.greaterThan(1);
    });
  });
  it("should should be able to get user name from id", function () {
    agent.get("/api/user/24").then(function (res) {
      expect(res.body.result.length).to.greaterThan(1);
    });
  });
});
