"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

describe('UNIT TESTS FOR DUMMY USER Accounts', function () {
  /*
     * Test the /GET route
     */
  describe('/GET REQUEST', function () {
    it('it should GET all accounts', function (done) {
      _chai["default"].request(_app["default"]).get('/api/v1/getAccounts/').end(function (err, res) {
        res.body.should.have.property('message').to.equals('Successfully fetched all accounts');
        res.should.have.property('status').to.equals(200);
        res.body.should.have.property('data').to.be.an('array');
        done();
      });
    });
  });
  describe('/POST REQUEST', function () {
    it('it should create Bank account ', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/createAccounts').send({
        email: 'lekan@gmail.com',
        firstName: 'layo',
        lastName: 'dayo',
        type: 'current',
        balance: 123
      }).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.have.property('status').to.equals(201);
        res.body.should.have.property('data').to.be.an('object');
        res.body.should.have.property('message').to.equals('Account created successfully');
        done();
      });
    });
  });
  describe('/PATCH REQUEST', function () {
    it('it should patch account ', function (done) {
      var accounNumber = 123456789;

      _chai["default"].request(_app["default"]).patch("/api/v1/getAccounts/".concat(accounNumber)).send({
        status: 'inactive'
      }).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.have.property('status').to.equals(201);
        res.body.should.have.property('data').to.be.an('object');
        res.body.should.have.property('message').to.equals('account status changed  successfull');
        done();
      });
    });
    it('it should not patch unregistered account ', function (done) {
      var accounNumber = 1098766549;

      _chai["default"].request(_app["default"]).patch("/api/v1/getAccounts/".concat(accounNumber)).send({
        status: 'inactive'
      }).end(function (err, res) {
        res.should.have.status(404);
        done();
      });
    });
  });
  describe('/DELETE REQUEST', function () {
    it('it should delete account ', function (done) {
      var accounNumber = 123456789;

      _chai["default"].request(_app["default"])["delete"]("/api/v1/deleteAccount/".concat(accounNumber)).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.have.property('status').to.equals(201);
        res.body.should.have.property('message').to.equals('Account Succesfully deleted');
        done();
      });
    });
    it('it should not delete unfound  account ', function (done) {
      var accounNumber = 1098766549;

      _chai["default"].request(_app["default"])["delete"]("/api/v1/deleteAccount/".concat(accounNumber)).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.have.property('message').to.equals('This account  does not exist');
        done();
      });
    });
  });
});
//# sourceMappingURL=accountDummy.test.js.map