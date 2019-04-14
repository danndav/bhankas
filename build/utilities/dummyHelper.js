"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @exports
 * @class helperClass
 */
var helperClass =
/*#__PURE__*/
function () {
  function helperClass() {
    _classCallCheck(this, helperClass);
  }

  _createClass(helperClass, null, [{
    key: "hashPassword",

    /**
     * Userhelper Class
     * @staticmethod hashpassword
     * @param  {array} dataStore
     * @param {string} password
     * @return {string} hashedpassword
     */
    value: function hashPassword(password) {
      var hash = _bcrypt["default"].hashSync(password, 10);

      return hash;
    }
    /**
     * Userhelper Class
     * @staticmethod compare
     * @param  {array} dataStore
     * @param {string} passwordcompare
     * @return {string} comparedpassword
     */

  }, {
    key: "compare",
    value: function compare(password, hashedpassword) {
      return _bcrypt["default"].compareSync(password, hashedpassword); // true
    }
    /**
     * Userhelper Class
     * @staticmethod generateToken
     * @param  {array} dataStore
     * @param {string} email
     * @param {string} type
     * @return {string}
     */

  }, {
    key: "generateToken",
    value: function generateToken(_ref) {
      var email = _ref.email,
          type = _ref.type;
      return _jsonwebtoken["default"].sign({
        email: email,
        type: type
      }, 'privatekey', {
        expiresIn: '2h'
      });
    }
  }]);

  return helperClass;
}();

var _default = helperClass;
exports["default"] = _default;
//# sourceMappingURL=dummyHelper.js.map