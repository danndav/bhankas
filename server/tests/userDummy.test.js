import chai from "chai";
import chaiHttp from "chai-http";
import server from "../app";

chai.use(chaiHttp);
chai.should();

describe("UNIT TESTS FOR DUMMY USER CONTROLLERS", () => {
  /*
   * Test the /GET route
   */
  describe("/GET REQUEST", () => {
    it("it should GET all users", done => {
      chai
        .request(server)
        .get("/api/v1/getUsers/")
        .end((err, res) => {
          res.body.should.have
            .property("message")
            .to.equals("Successfully fetched all users");
          res.should.have.property("status").to.equals(200);
          res.body.should.have.property("data").to.be.an("array");
          done();
        });
    });
  });
  describe("/POST REQUEST", () => {
    it("it should signup user ", done => {
      chai
        .request(server)
        .post("/api/v1/auth/signup")
        .send({
          email: "tolaniabass@gmail.com",
          firstName: "Tolani",
          lastName: "Abass",
          phoneNumber: "08023461217",
          password: "tolaniabass",
          type: "client",
          isAdmin: false
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property("status").to.equals(201);
          res.body.should.have.property("data").to.be.an("object");
          res.body.should.have
            .property("message")
            .to.equals("New user created successfully");

          done();
        });
    });
  });

  describe("/POST REQUEST", () => {
    it("it should signin user ", done => {
      chai
        .request(server)
        .post("/api/v1/auth/signin")
        .send({
          email: "tolaniabass@gmail.com",
          password: "tolaniabass",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("status").to.equals(200);
          res.body.should.have.property("data").to.be.an("object");
          res.body.should.have
            .property("message")
            .to.equals("Authentication Successful");

          done();
        });
    });

    it("it should not login unregistered user ", done => {
      chai
        .request(server)
        .post("/api/v1/auth/login")
        .send({
          email: "danielimodoye@gmail.com",
          password: "danielimodoye"
        })
        .end((err, res) => {
          res.should.have.status(404);

          done();
        });
    });
    it("it should make a post request if all fields are not empty ", done => {
      chai
        .request(server)
        .post("/api/v1/auth/signup")
        .send({
          email: "danielimodoye@gmail.com",
          firstName: "Imodoye",
          lastName: "David",
          phoneNumber: "08023461217",
          password: "danielimodoye",
          type: "client",
          isAdmin: false
        })
        .end((err, res) => {
          res.body.should.have
            .property("message")
            .to.equals("New user created successfully");
          res.body.should.have.property("status").to.equals(201);
          // res.body.should.have.property('token').to.be.a('string');
          done();
        });
    });
  });
});
