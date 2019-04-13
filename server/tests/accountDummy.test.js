import chai from "chai";
import chaiHttp from "chai-http";
import server from "../app";

chai.use(chaiHttp);
chai.should();

describe("UNIT TESTS FOR DUMMY USER Accounts", () => {
    /*
     * Test the /GET route
     */
    describe("/GET REQUEST", () => {
        it("it should GET all accounts", done => {
            chai
                .request(server)
                .get("/api/v1/getAccounts/")
                .end((err, res) => {
                    res.body.should.have
                        .property("message")
                        .to.equals("Successfully fetched all accounts");
                    res.should.have.property("status").to.equals(200);
                    res.body.should.have.property("data").to.be.an("array");
                    done();
                });
        });


        
    });
    describe("/POST REQUEST", () => {
        it("it should create Bank account ", done => {
            chai
                .request(server)
                .post("/api/v1/createAccounts")
                .send({
                    email: "lekan@gmail.com",
                    firstName: "layo",
                    lastName: "dayo",
                    type: "current",
                    balance: 123
                })
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.have.property("status").to.equals(201);
                    res.body.should.have.property("data").to.be.an("object");
                    res.body.should.have
                        .property("message")
                        .to.equals("Account created successfully");

                    done();
                });
        });
    });

    describe("/PATCH REQUEST", () => {
        it("it should patch account ", done => {
            const accounNumber = 123456789;
            chai
                .request(server)
                .patch(`/api/v1/getAccounts/${accounNumber}`)
                .send({
                    status: "inactive"
                })
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.have.property("status").to.equals(201);
                    res.body.should.have.property("data").to.be.an("object");
                    res.body.should.have
                        .property("message")
                        .to.equals("account status changed  successfull");

                    done();
                });
        });

        it("it should not patch unregistered account ", done => {
            const accounNumber = 1098766549;
            chai
                .request(server)
                .patch(`/api/v1/getAccounts/${accounNumber}`)
                .send({
                    status: "inactive"
                })
                .end((err, res) => {
                    res.should.have.status(404);

                    done();
                });
        });
    });

    describe("/DELETE REQUEST", () => {
        it("it should delete account ", done => {
            const accounNumber = 123456789;
            chai
                .request(server)
                .delete(`/api/v1/deleteAccount/${accounNumber}`)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.have.property("status").to.equals(201);
                    res.body.should.have
                        .property("message")
                        .to.equals("Account Succesfully deleted");

                    done();
                });
        });

        it("it should not delete unfound  account ", done => {
            const accounNumber = 1098766549;
            chai
                .request(server)
                .delete(`/api/v1/deleteAccount/${accounNumber}`)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have
                        .property("message")
                        .to.equals("This account  does not exist");
                    done();
                });
        });
    });
});