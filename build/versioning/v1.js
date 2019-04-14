"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _index = _interopRequireDefault(require("../routes/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var api = (0, _express.Router)();
api.use('/', _index["default"]);
api.get('/', function (req, res) {
  return res.send({
    ok: true,
    message: 'Welcome to Andela',
    status: 'API version 1'
  });
});
api.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
}); // No routes matched? 404.

api.use(function (req, res) {
  return res.status(404).send('Sorry that route/method doesnt exist');
});
var _default = api;
exports["default"] = _default;
//# sourceMappingURL=v1.js.map