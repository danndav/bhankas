"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

describe('UNIT TESTS FOR DUMMY USER CONTROLLERS', function () {
  /*
   * Test the /GET route
   */
  describe('/GET REQUEST', function () {
    it('it should GET all users', function (done) {
      _chai["default"].request(_app["default"]).get('/api/v1/getUsers/').end(function (err, res) {
        res.body.should.have.property('message').to.equals('Successfully fetched all users');
        res.should.have.property('status').to.equals(200);
        res.body.should.have.property('data').to.be.an('array');
        done();
      });
    });
  });
  describe('/POST REQUEST', function () {
    it('it should signup user ', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send({
        email: 'tolaniabass@gmail.com',
        firstName: 'Tolani',
        lastName: 'Abass',
        phoneNumber: '08023461217',
        password: 'tolaniabass',
        type: 'client',
        isAdmin: false
      }).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.have.property('status').to.equals(201);
        res.body.should.have.property('data').to.be.an('object');
        res.body.should.have.property('message').to.equals('New user created successfully');
        done();
      });
    });
  });
  describe('/POST REQUEST', function () {
    it('it should signin user ', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send({
        email: 'tolaniabass@gmail.com',
        password: 'tolaniabass'
      }).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.have.property('status').to.equals(200);
        res.body.should.have.property('data').to.be.an('object');
        res.body.should.have.property('message').to.equals('Authentication Successful');
        done();
      });
    });
    it('it should not login unregistered user ', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/login').send({
        email: 'danielimodoye@gmail.com',
        password: 'danielimodoye'
      }).end(function (err, res) {
        res.should.have.status(404);
        done();
      });
    });
    it('it should make a post request if all fields are not empty ', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send({
        email: 'danielimodoye@gmail.com',
        firstName: 'Imodoye',
        lastName: 'David',
        phoneNumber: '08023461217',
        password: 'danielimodoye',
        type: 'client',
        isAdmin: false
      }).end(function (err, res) {
        res.body.should.have.property('message').to.equals('New user created successfully');
        res.body.should.have.property('status').to.equals(201); // res.body.should.have.property('token').to.be.a('string');

        done();
      });
    });
  });
});
//# sourceMappingURL=userDummy.test.js.map