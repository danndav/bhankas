"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var firstName = _joi["default"].string().trim().min(2).min(1).required();

var lastName = _joi["default"].string().trim().min(2).min(1).required();

var email = _joi["default"].string().email().trim().min(8).min(1).required();

var password = _joi["default"].string().trim().min(1).required();

var phoneNumber = _joi["default"].number().integer().min(11).required();

var type = _joi["default"].string().trim().min(1).required();

var balance = _joi["default"].number().integer().min(1).required();

var isAdmin = _joi["default"]["boolean"]();

var userdummySchema = {
  firstName: firstName,
  lastName: lastName,
  email: email,
  password: password,
  phoneNumber: phoneNumber,
  type: type,
  isAdmin: isAdmin
};
var accountdummySchema = {
  firstName: firstName,
  lastName: lastName,
  email: email,
  type: type,
  balance: balance
};
var _default = {
  userdummySchema: userdummySchema,
  accountdummySchema: accountdummySchema
};
exports["default"] = _default;
//# sourceMappingURL=dummyValidator.js.map