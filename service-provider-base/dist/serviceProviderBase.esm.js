import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import { encrypt, decrypt, toPrivKeyECC, toPrivKeyEC, getPubKeyECC } from '@tkey/common-types';
import BN from 'bn.js';

var ServiceProviderBase = /*#__PURE__*/function () {
  // For easy serialization

  function ServiceProviderBase(_ref) {
    var _ref$enableLogging = _ref.enableLogging,
      enableLogging = _ref$enableLogging === void 0 ? false : _ref$enableLogging,
      postboxKey = _ref.postboxKey,
      _ref$useTSS = _ref.useTSS,
      useTSS = _ref$useTSS === void 0 ? false : _ref$useTSS;
    _classCallCheck(this, ServiceProviderBase);
    _defineProperty(this, "enableLogging", void 0);
    _defineProperty(this, "useTSS", void 0);
    _defineProperty(this, "tssPubKeys", void 0);
    _defineProperty(this, "postboxKey", void 0);
    _defineProperty(this, "serviceProviderName", void 0);
    _defineProperty(this, "verifierName", void 0);
    _defineProperty(this, "verifierId", void 0);
    _defineProperty(this, "tssNodeDetails", void 0);
    _defineProperty(this, "rssNodeDetails", void 0);
    _defineProperty(this, "sssNodeDetails", void 0);
    this.useTSS = useTSS;
    this.enableLogging = enableLogging;
    this.postboxKey = new BN(postboxKey, "hex");
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
  _createClass(ServiceProviderBase, [{
    key: "encrypt",
    value: function () {
      var _encrypt = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(msg) {
        var publicKey;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                publicKey = this.retrievePubKey("ecc");
                return _context.abrupt("return", encrypt(publicKey, msg));
              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function encrypt$1(_x) {
        return _encrypt.apply(this, arguments);
      }
      return encrypt$1;
    }()
  }, {
    key: "decrypt",
    value: function () {
      var _decrypt = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(msg) {
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", decrypt(toPrivKeyECC(this.postboxKey), msg));
              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function decrypt$1(_x2) {
        return _decrypt.apply(this, arguments);
      }
      return decrypt$1;
    }()
  }, {
    key: "retrievePubKeyPoint",
    value: function retrievePubKeyPoint() {
      return toPrivKeyEC(this.postboxKey).getPublic();
    }
  }, {
    key: "retrievePubKey",
    value: function retrievePubKey(type) {
      if (type === "ecc") {
        return getPubKeyECC(this.postboxKey);
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
      var _getTSSNodeDetails = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
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
      var _getRSSNodeDetails = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
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
      var _getSSSNodeDetails = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5() {
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
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
      var _getTSSPubKey = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(tssTag, tssNonce) {
        var tssPubKey;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
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
      var tmp = new BN(msg, "hex");
      var sig = toPrivKeyEC(this.postboxKey).sign(tmp.toString("hex"));
      return Buffer.from(sig.r.toString(16, 64) + sig.s.toString(16, 64) + new BN(0).toString(16, 2), "hex").toString("base64");
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

export { ServiceProviderBase, ServiceProviderBase as default };
//# sourceMappingURL=serviceProviderBase.esm.js.map
