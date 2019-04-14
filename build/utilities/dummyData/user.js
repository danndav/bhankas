"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dummyHelper = _interopRequireDefault(require("../../utilities/dummyHelper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var user = [{
  id: 1,
  email: 'danielimodoye@gmail.com',
  firstName: 'Imodoye',
  lastName: 'David',
  phoneNumber: '08023461217',
  password: _dummyHelper["default"].hashPassword('imodoyedavid'),
  type: 'client',
  isAdmin: false
}, {
  id: 2,
  email: 'tolaniabass@gmail.com',
  firstName: 'Tolani',
  lastName: 'Abass',
  phoneNumber: '08023461217',
  password: _dummyHelper["default"].hashPassword('tolaniabass'),
  type: 'client',
  isAdmin: false
}, {
  id: 3,
  email: 'sannimicheal@gmail.com',
  firstName: 'sanni',
  lastName: 'Micheal',
  phoneNumber: '08023461217',
  password: _dummyHelper["default"].hashPassword('sannimicheal'),
  type: 'staff',
  isAdmin: false
}, {
  id: 4,
  email: 'aworenidapo@gmail.com',
  firstName: 'Aworeni',
  lastName: 'Oladapo',
  password: _dummyHelper["default"].hashPassword('dapoaworeni'),
  type: 'staff',
  isAdmin: true
}];
var _default = user;
exports["default"] = _default;
//# sourceMappingURL=user.js.map