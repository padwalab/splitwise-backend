var chai = require("chai"),
  chaiHttp = require("chai-http");

chai.use(chaiHttp);
let should = chai.should();
let expect = chai.expect();

it("should login the user", function (done) {
  chai
    .request("http://localhost:8000")
    .post("/login")
    .send({ email: "a@g.com", password: "a" })
    .end(function (err, res) {
      expect(res).to.have.status(200);
      done();
    });
});
