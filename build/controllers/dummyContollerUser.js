"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dummyHelper = _interopRequireDefault(require("../utilities/dummyHelper"));

var _user = _interopRequireDefault(require("../utilities/dummyData/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @exports
 * @class DummyControllerUser
 */
var DummyControllerUser =
/*#__PURE__*/
function () {
  function DummyControllerUser() {
    _classCallCheck(this, DummyControllerUser);
  }

  _createClass(DummyControllerUser, null, [{
    key: "getAllUsers",

    /**
     * @description get all users
     * @staticmethod getAllUsers
     * @param  {object} req - req object
     * @param {object} res - Response object
     * @return {json} res.json
     */
    value: function getAllUsers(req, res) {
      var existingUsers = _user["default"];
      res.status(200).json({
        message: 'Successfully fetched all users',
        status: 200,
        data: existingUsers
      });
    }
    /**
     * @description Signup a new user
     * @staticmethod userSignup
     * @param  {object} req - req object
     * @param {object} res - Response object
     * @return {json} res.json
     */

  }, {
    key: "userSignup",
    value: function userSignup(req, res) {
      var _req$body = req.body,
          firstName = _req$body.firstName,
          lastName = _req$body.lastName,
          email = _req$body.email,
          phoneNumber = _req$body.phoneNumber,
          password = _req$body.password,
          type = _req$body.type,
          isAdmin = _req$body.isAdmin;

      var user = _user["default"].find(function (email) {
        return email.email === email;
      });

      if (user) {
        return res.status(400).json({
          status: 400,
          message: 'email already exits'
        });
      }

      var passwordhashed = _dummyHelper["default"].hashPassword(password); // const passwordhashed = helperClass.hashPassword(password);


      var users = {
        id: _user["default"].length + 1,
        email: email,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        password: passwordhashed,
        type: type,
        isAdmin: isAdmin
      };

      _user["default"].push(users);

      var token = _dummyHelper["default"].generateToken({
        email: email,
        type: type
      });

      return res.header('x-access-token', token).status(201).json({
        status: 201,
        data: {
          token: token,
          id: users.id,
          firstName: users.firstName,
          lastName: users.lastName,
          email: users.email,
          password: users.password
        },
        message: 'New user created successfully'
      });
    }
    /**
     * @description Login a new user
     * @staticmethod userLogin
     * @param  {object} req - req object
     * @param {object} res - Response object
     * @return {json} res.json
     */

  }, {
    key: "userLogin",
    value: function userLogin(req, res) {
      var _req$body2 = req.body,
          userEmail = _req$body2.email,
          userPassword = _req$body2.password;

      var userChecked = _user["default"].find(function (user) {
        return user.email === userEmail;
      });

      if (userChecked) {
        console.log(userChecked);
        var email = userChecked.email,
            type = userChecked.type,
            firstName = userChecked.firstName,
            lastName = userChecked.lastName,
            id = userChecked.id,
            password = userChecked.password;

        var foundUserPassword = _dummyHelper["default"].compare(userPassword, password);

        if (foundUserPassword) {
          var token = _dummyHelper["default"].generateToken({
            id: id,
            email: email,
            type: type
          });

          return res.header('x-access-token', token).status(200).json({
            status: 200,
            data: {
              token: token,
              id: id,
              firstName: firstName,
              lastName: lastName,
              email: email,
              type: type
            },
            message: 'Authentication Successful'
          });
        }

        return res.status(400).json({
          status: 404,
          error: 'please type in the correct Password '
        });
      }

      return res.status(400).json({
        status: 404,
        error: 'please input the correct email'
      });
    }
  }]);

  return DummyControllerUser;
}();

var _default = DummyControllerUser;
exports["default"] = _default;
//# sourceMappingURL=dummyContollerUser.js.map