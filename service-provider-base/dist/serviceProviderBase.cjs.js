/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "ServiceProviderBase": () => (/* reexport */ src_ServiceProviderBase),
  "default": () => (/* reexport */ src_ServiceProviderBase)
});

;// CONCATENATED MODULE: external "@babel/runtime/helpers/asyncToGenerator"
const asyncToGenerator_namespaceObject = require("@babel/runtime/helpers/asyncToGenerator");
var asyncToGenerator_default = /*#__PURE__*/__webpack_require__.n(asyncToGenerator_namespaceObject);
;// CONCATENATED MODULE: external "@babel/runtime/helpers/classCallCheck"
const classCallCheck_namespaceObject = require("@babel/runtime/helpers/classCallCheck");
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck_namespaceObject);
;// CONCATENATED MODULE: external "@babel/runtime/helpers/createClass"
const createClass_namespaceObject = require("@babel/runtime/helpers/createClass");
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass_namespaceObject);
;// CONCATENATED MODULE: external "@babel/runtime/helpers/defineProperty"
const defineProperty_namespaceObject = require("@babel/runtime/helpers/defineProperty");
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty_namespaceObject);
;// CONCATENATED MODULE: external "@babel/runtime/regenerator"
const regenerator_namespaceObject = require("@babel/runtime/regenerator");
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator_namespaceObject);
;// CONCATENATED MODULE: external "@tkey/common-types"
const common_types_namespaceObject = require("@tkey/common-types");
;// CONCATENATED MODULE: external "bn.js"
const external_bn_js_namespaceObject = require("bn.js");
var external_bn_js_default = /*#__PURE__*/__webpack_require__.n(external_bn_js_namespaceObject);
;// CONCATENATED MODULE: ./src/ServiceProviderBase.ts







var ServiceProviderBase = /*#__PURE__*/function () {
  // For easy serialization

  function ServiceProviderBase(_ref) {
    var _ref$enableLogging = _ref.enableLogging,
      enableLogging = _ref$enableLogging === void 0 ? false : _ref$enableLogging,
      postboxKey = _ref.postboxKey,
      _ref$useTSS = _ref.useTSS,
      useTSS = _ref$useTSS === void 0 ? false : _ref$useTSS;
    classCallCheck_default()(this, ServiceProviderBase);
    defineProperty_default()(this, "enableLogging", void 0);
    defineProperty_default()(this, "useTSS", void 0);
    defineProperty_default()(this, "tssPubKeys", void 0);
    defineProperty_default()(this, "postboxKey", void 0);
    defineProperty_default()(this, "serviceProviderName", void 0);
    defineProperty_default()(this, "verifierName", void 0);
    defineProperty_default()(this, "verifierId", void 0);
    defineProperty_default()(this, "tssNodeDetails", void 0);
    defineProperty_default()(this, "rssNodeDetails", void 0);
    defineProperty_default()(this, "sssNodeDetails", void 0);
    this.useTSS = useTSS;
    this.enableLogging = enableLogging;
    this.postboxKey = new (external_bn_js_default())(postboxKey, "hex");
    this.serviceProviderName = "ServiceProviderBase";
    this.tssPubKeys = {};
    this.tssNodeDetails = {
      serverEndpoints: [],
      serverPubKeys: [],
      serverThreshold: -1
    };
    this.rssNodeDetails = {
      serverEndpoints: [],
      serverPubKeys: [],
      serverThreshold: -1
    };
    this.sssNodeDetails = {
      serverEndpoints: [],
      serverPubKeys: [],
      serverThreshold: -1
    };
  }
  createClass_default()(ServiceProviderBase, [{
    key: "encrypt",
    value: function () {
      var _encrypt = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee(msg) {
        var publicKey;
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                publicKey = this.retrievePubKey("ecc");
                return _context.abrupt("return", (0,common_types_namespaceObject.encrypt)(publicKey, msg));
              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function encrypt(_x) {
        return _encrypt.apply(this, arguments);
      }
      return encrypt;
    }()
  }, {
    key: "decrypt",
    value: function () {
      var _decrypt = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee2(msg) {
        return regenerator_default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", (0,common_types_namespaceObject.decrypt)((0,common_types_namespaceObject.toPrivKeyECC)(this.postboxKey), msg));
              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function decrypt(_x2) {
        return _decrypt.apply(this, arguments);
      }
      return decrypt;
    }()
  }, {
    key: "retrievePubKeyPoint",
    value: function retrievePubKeyPoint() {
      return (0,common_types_namespaceObject.toPrivKeyEC)(this.postboxKey).getPublic();
    }
  }, {
    key: "retrievePubKey",
    value: function retrievePubKey(type) {
      if (type === "ecc") {
        return (0,common_types_namespaceObject.getPubKeyECC)(this.postboxKey);
      }
      throw new Error("Unsupported pub key type");
    }
  }, {
    key: "_setVerifierNameVerifierId",
    value: function _setVerifierNameVerifierId(verifierName, verifierId) {
      this.verifierName = verifierName;
      this.verifierId = verifierId;
    }
  }, {
    key: "getVerifierNameVerifierId",
    value: function getVerifierNameVerifierId() {
      return "".concat(this.verifierName, "\x1C").concat(this.verifierId);
    }
  }, {
    key: "_setTSSNodeDetails",
    value: function _setTSSNodeDetails(serverEndpoints, serverPubKeys, serverThreshold) {
      this.tssNodeDetails = {
        serverEndpoints: serverEndpoints,
        serverPubKeys: serverPubKeys,
        serverThreshold: serverThreshold
      };
    }
  }, {
    key: "getTSSNodeDetails",
    value: function () {
      var _getTSSNodeDetails = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee3() {
        return regenerator_default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", this.tssNodeDetails);
              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function getTSSNodeDetails() {
        return _getTSSNodeDetails.apply(this, arguments);
      }
      return getTSSNodeDetails;
    }()
  }, {
    key: "getRSSNodeDetails",
    value: function () {
      var _getRSSNodeDetails = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee4() {
        return regenerator_default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", this.rssNodeDetails);
              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function getRSSNodeDetails() {
        return _getRSSNodeDetails.apply(this, arguments);
      }
      return getRSSNodeDetails;
    }()
  }, {
    key: "getSSSNodeDetails",
    value: function () {
      var _getSSSNodeDetails = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee5() {
        return regenerator_default().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", this.sssNodeDetails);
              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
      function getSSSNodeDetails() {
        return _getSSSNodeDetails.apply(this, arguments);
      }
      return getSSSNodeDetails;
    }()
  }, {
    key: "_setTSSPubKey",
    value: function _setTSSPubKey(tssTag, tssNonce, tssPubKey) {
      this.tssPubKeys["".concat(this.verifierName, "\x1C").concat(this.verifierId, "\x15").concat(tssTag, "\x16").concat(tssNonce)] = tssPubKey;
    }
  }, {
    key: "getTSSPubKey",
    value: function () {
      var _getTSSPubKey = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee6(tssTag, tssNonce) {
        var tssPubKey;
        return regenerator_default().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                tssPubKey = this.tssPubKeys["".concat(this.verifierName, "\x1C").concat(this.verifierId, "\x15").concat(tssTag, "\x16").concat(tssNonce)];
                if (tssPubKey) {
                  _context6.next = 3;
                  break;
                }
                throw new Error("tss pub key could not be found for ".concat(this.verifierName, "\x1C").concat(this.verifierId, "\x15").concat(tssTag, "\x16").concat(tssNonce));
              case 3:
                return _context6.abrupt("return", tssPubKey);
              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
      function getTSSPubKey(_x3, _x4) {
        return _getTSSPubKey.apply(this, arguments);
      }
      return getTSSPubKey;
    }()
  }, {
    key: "sign",
    value: function sign(msg) {
      var tmp = new (external_bn_js_default())(msg, "hex");
      var sig = (0,common_types_namespaceObject.toPrivKeyEC)(this.postboxKey).sign(tmp.toString("hex"));
      return Buffer.from(sig.r.toString(16, 64) + sig.s.toString(16, 64) + new (external_bn_js_default())(0).toString(16, 2), "hex").toString("base64");
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        enableLogging: this.enableLogging,
        postboxKey: this.postboxKey.toString("hex"),
        serviceProviderName: this.serviceProviderName
      };
    }
  }], [{
    key: "fromJSON",
    value: function fromJSON(value) {
      var enableLogging = value.enableLogging,
        postboxKey = value.postboxKey,
        serviceProviderName = value.serviceProviderName;
      if (serviceProviderName !== "ServiceProviderBase") return undefined;
      return new ServiceProviderBase({
        enableLogging: enableLogging,
        postboxKey: postboxKey
      });
    }
  }]);
  return ServiceProviderBase;
}();
/* harmony default export */ const src_ServiceProviderBase = (ServiceProviderBase);
;// CONCATENATED MODULE: ./src/index.ts

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=serviceProviderBase.cjs.js.map