"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _v = _interopRequireDefault(require("./versioning/v1"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var app = (0, _express["default"])();
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_bodyParser["default"].json());
app.use((0, _morgan["default"])('dev'));
app.use('/api/v1', _v["default"]);
app.get('/', function (req, res) {
  return res.send({
    ok: true,
    message: 'Welcome to Banka',
    baseurl: '/api/{version}'
  }).status(200);
}); // No routes matched? 404.

app.use(function (req, res) {
  return res.status(404).send('Sorry that route/method doesnt exist');
});
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  if (process.env.NODE_ENV === 'test') {
    console.log("The Dev server is running on port ".concat(PORT));
  } else {
    console.log("The production server is now running at ".concat(PORT));
  }
});
var _default = app;
exports["default"] = _default;
//# sourceMappingURL=app.js.map