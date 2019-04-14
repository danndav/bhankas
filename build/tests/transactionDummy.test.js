"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

describe('UNIT TESTS FOR DUMMY TRANSACTION CONTROLLERS', function () {
  /*
     * Test the /GET route
     */
  describe('/GET REQUEST', function () {
    it('it should GET all transactions', function (done) {
      _chai["default"].request(_app["default"]).get('/api/v1/getTransactions/').end(function (err, res) {
        res.body.should.have.property('message').to.equals('Successfully fetched all Transactions');
        res.body.should.have.property('status').to.equals(200);
        res.body.should.have.property('data').to.be.an('array');
        done();
      });
    });
  });
  describe('/POST REQUEST', function () {
    it('it should credit an account ', function (done) {
      var accountNumber = 987654321;

      _chai["default"].request(_app["default"]).post("/api/v1/transactions/".concat(accountNumber, "/credit")).send({
        amount: 33200,
        cachier: 3
      }).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.have.property('status').to.equals(201);
        res.body.should.have.property('data').to.be.an('object');
        done();
      });
    });
    it('it should reject unavailable acccount ', function (done) {
      var accountNumber = 11682992799;

      _chai["default"].request(_app["default"]).post("/api/v1/transactions/".concat(accountNumber, "/credit")).send({
        amount: 200.20,
        cachier: 3
      }).end(function (err, res) {
        res.should.have.status(404);
        res.should.have.property('status').to.equals(404);
        res.body.should.have.property('error').to.equals('This account  does not exist');
        done();
      });
    });
  });
  describe('/POST REQUEST', function () {
    it('it should debit an account ', function (done) {
      var accountNumber = 987654321;

      _chai["default"].request(_app["default"]).post("/api/v1/transactions/".concat(accountNumber, "/debit")).send({
        amount: 33,
        cachier: 3
      }).end(function (err, res) {
        console.log(res);
        res.should.have.status(201);
        res.body.should.have.property('status').to.equals(201);
        res.body.should.have.property('data').to.be.an('object');
        done();
      });
    });
    it('it should reject if requested amount is greater than balance  ', function (done) {
      var accountNumber = 987654321;

      _chai["default"].request(_app["default"]).post("/api/v1/transactions/".concat(accountNumber, "/debit")).send({
        amount: 5000000.20,
        cachier: 3
      }).end(function (err, res) {
        res.should.have.status(400);
        res.should.have.property('status').to.equals(400);
        res.body.should.have.property('error').to.equals('insufficent account balance');
        done();
      });
    });
    it('it should reject unavailable acccount ', function (done) {
      var accountNumber = 11682992799;

      _chai["default"].request(_app["default"]).post("/api/v1/transactions/".concat(accountNumber, "/debit")).send({
        amount: 200.20,
        cachier: 3
      }).end(function (err, res) {
        res.should.have.status(400);
        res.should.have.property('status').to.equals(400);
        res.body.should.have.property('error').to.equals('This account  does not exist');
        done();
      });
    });
  });
});
//# sourceMappingURL=transactionDummy.test.js.map