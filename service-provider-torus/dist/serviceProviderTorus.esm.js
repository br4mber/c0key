import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _assertThisInitialized from '@babel/runtime/helpers/assertThisInitialized';
import _get from '@babel/runtime/helpers/get';
import _inherits from '@babel/runtime/helpers/inherits';
import _possibleConstructorReturn from '@babel/runtime/helpers/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime/helpers/getPrototypeOf';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import { Point } from '@tkey/common-types';
import { ServiceProviderBase } from '@tkey/service-provider-base';
import CustomAuth from '@toruslabs/customauth';
import BN from 'bn.js';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var TorusServiceProvider = /*#__PURE__*/function (_ServiceProviderBase) {
  _inherits(TorusServiceProvider, _ServiceProviderBase);
  var _super = _createSuper(TorusServiceProvider);
  function TorusServiceProvider(_ref) {
    var _this;
    var _ref$enableLogging = _ref.enableLogging,
      enableLogging = _ref$enableLogging === void 0 ? false : _ref$enableLogging,
      postboxKey = _ref.postboxKey,
      customAuthArgs = _ref.customAuthArgs,
      nodeEndpoints = _ref.nodeEndpoints,
      nodePubKeys = _ref.nodePubKeys,
      useTSS = _ref.useTSS;
    _classCallCheck(this, TorusServiceProvider);
    _this = _super.call(this, {
      enableLogging: enableLogging,
      postboxKey: postboxKey,
      useTSS: useTSS
    });
    _defineProperty(_assertThisInitialized(_this), "directWeb", void 0);
    _defineProperty(_assertThisInitialized(_this), "singleLoginKey", void 0);
    _defineProperty(_assertThisInitialized(_this), "customAuthArgs", void 0);
    _defineProperty(_assertThisInitialized(_this), "verifierType", void 0);
    _this.customAuthArgs = customAuthArgs;
    if (nodeEndpoints && nodeEndpoints.length > 0) {
      CustomAuth.torusNodeEndpoints = nodeEndpoints;
    }
    if (nodePubKeys && nodePubKeys.length > 0) {
      CustomAuth.torusPubKeys = nodePubKeys;
    }
    _this.directWeb = new CustomAuth(customAuthArgs);
    _this.serviceProviderName = "TorusServiceProvider";
    return _this;
  }
  _createClass(TorusServiceProvider, [{
    key: "init",
    value: function () {
      var _init = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(params) {
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this.directWeb.init(params));
              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function init(_x) {
        return _init.apply(this, arguments);
      }
      return init;
    }()
  }, {
    key: "_setTSSPubKey",
    value: function _setTSSPubKey(tssTag, tssNonce, tssPubKey) {
      throw new Error("this method has been overriden and should not be called with ".concat(tssTag, ", ").concat(tssNonce, ", ").concat(tssPubKey));
    }
  }, {
    key: "retrieveVerifierId",
    value: function retrieveVerifierId() {
      if (!this.verifierId) throw new Error("no verifierId, not logged in");
      return this.verifierId;
    }
  }, {
    key: "_setTSSNodeDetails",
    value: function _setTSSNodeDetails(serverEndpoints, serverPubKeys, serverThreshold) {
      throw new Error("this method has been overriden and should not be called with ".concat(serverEndpoints, ", ").concat(serverPubKeys, ", ").concat(serverThreshold));
    }
  }, {
    key: "getTSSNodeDetails",
    value: function () {
      var _getTSSNodeDetails = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
        var torusPubKeys, tssNodeEndpoints;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                torusPubKeys = CustomAuth.torusPubKeys;
                tssNodeEndpoints = CustomAuth.getTSSEndpoints();
                return _context2.abrupt("return", {
                  serverEndpoints: tssNodeEndpoints,
                  serverPubKeys: torusPubKeys,
                  serverThreshold: Math.ceil(tssNodeEndpoints.length / 2)
                });
              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));
      function getTSSNodeDetails() {
        return _getTSSNodeDetails.apply(this, arguments);
      }
      return getTSSNodeDetails;
    }()
  }, {
    key: "getSSSNodeDetails",
    value: function () {
      var _getSSSNodeDetails = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
        var torusPubKeys, tssNodeEndpoints;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                torusPubKeys = CustomAuth.torusPubKeys;
                tssNodeEndpoints = CustomAuth.getSSSEndpoints();
                return _context3.abrupt("return", {
                  serverEndpoints: tssNodeEndpoints,
                  serverPubKeys: torusPubKeys,
                  serverThreshold: Math.ceil(tssNodeEndpoints.length / 2)
                });
              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));
      function getSSSNodeDetails() {
        return _getSSSNodeDetails.apply(this, arguments);
      }
      return getSSSNodeDetails;
    }()
  }, {
    key: "getRSSNodeDetails",
    value: function () {
      var _getRSSNodeDetails = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
        var torusPubKeys, rssNodeEndpoints;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                torusPubKeys = CustomAuth.torusPubKeys;
                rssNodeEndpoints = CustomAuth.getRSSEndpoints();
                return _context4.abrupt("return", {
                  serverEndpoints: rssNodeEndpoints,
                  serverPubKeys: torusPubKeys,
                  serverThreshold: Math.ceil(rssNodeEndpoints.length / 2)
                });
              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));
      function getRSSNodeDetails() {
        return _getRSSNodeDetails.apply(this, arguments);
      }
      return getRSSNodeDetails;
    }()
  }, {
    key: "getTSSPubKey",
    value: function () {
      var _getTSSPubKey = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(tssTag, tssNonce) {
        var sssNodeEndpoints, tssServerPub;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(!this.verifierName || !this.verifierId)) {
                  _context5.next = 2;
                  break;
                }
                throw new Error("verifier userinfo not found, not logged in yet");
              case 2:
                sssNodeEndpoints = CustomAuth.getSSSEndpoints();
                _context5.next = 5;
                return this.directWeb.torus.getPublicAddress(sssNodeEndpoints, {
                  verifier: this.verifierName,
                  verifierId: this.verifierId,
                  extendedVerifierId: "".concat(this.verifierId, "\x15").concat(tssTag || "default", "\x16").concat(tssNonce || 0)
                }, true);
              case 5:
                tssServerPub = _context5.sent;
                return _context5.abrupt("return", new Point(tssServerPub.X, tssServerPub.Y));
              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
      function getTSSPubKey(_x2, _x3) {
        return _getTSSPubKey.apply(this, arguments);
      }
      return getTSSPubKey;
    }()
  }, {
    key: "triggerLogin",
    value: function () {
      var _triggerLogin = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(params) {
        var obj, _obj$userInfo, verifier, verifierId;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.directWeb.triggerLogin(params);
              case 2:
                obj = _context6.sent;
                this.postboxKey = new BN(obj.privateKey, "hex");
                _obj$userInfo = obj.userInfo, verifier = _obj$userInfo.verifier, verifierId = _obj$userInfo.verifierId;
                this.verifierName = verifier;
                this.verifierId = verifierId;
                this.verifierType = "normal";
                return _context6.abrupt("return", obj);
              case 9:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
      function triggerLogin(_x4) {
        return _triggerLogin.apply(this, arguments);
      }
      return triggerLogin;
    }()
  }, {
    key: "triggerAggregateLogin",
    value: function () {
      var _triggerAggregateLogin = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7(params) {
        var obj, _obj$userInfo$, verifier, verifierId;
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.directWeb.triggerAggregateLogin(params);
              case 2:
                obj = _context7.sent;
                this.postboxKey = new BN(obj.privateKey, "hex");
                _obj$userInfo$ = obj.userInfo[0], verifier = _obj$userInfo$.verifier, verifierId = _obj$userInfo$.verifierId;
                this.verifierName = verifier;
                this.verifierId = verifierId;
                this.verifierType = "aggregate";
                return _context7.abrupt("return", obj);
              case 9:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));
      function triggerAggregateLogin(_x5) {
        return _triggerAggregateLogin.apply(this, arguments);
      }
      return triggerAggregateLogin;
    }()
  }, {
    key: "triggerHybridAggregateLogin",
    value: function () {
      var _triggerHybridAggregateLogin = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee8(params) {
        var obj, aggregateLoginKey, _obj$singleLogin$user, verifier, verifierId;
        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.directWeb.triggerHybridAggregateLogin(params);
              case 2:
                obj = _context8.sent;
                aggregateLoginKey = obj.aggregateLogins[0].privateKey;
                this.postboxKey = new BN(aggregateLoginKey, "hex");
                this.singleLoginKey = new BN(obj.singleLogin.privateKey, "hex");
                _obj$singleLogin$user = obj.singleLogin.userInfo, verifier = _obj$singleLogin$user.verifier, verifierId = _obj$singleLogin$user.verifierId;
                this.verifierName = verifier;
                this.verifierId = verifierId;
                this.verifierType = "hybrid";
                return _context8.abrupt("return", obj);
              case 11:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));
      function triggerHybridAggregateLogin(_x6) {
        return _triggerHybridAggregateLogin.apply(this, arguments);
      }
      return triggerHybridAggregateLogin;
    }()
  }, {
    key: "toJSON",
    value: function toJSON() {
      return _objectSpread(_objectSpread({}, _get(_getPrototypeOf(TorusServiceProvider.prototype), "toJSON", this).call(this)), {}, {
        serviceProviderName: this.serviceProviderName,
        customAuthArgs: this.customAuthArgs
      });
    }
  }], [{
    key: "fromJSON",
    value: function fromJSON(value) {
      var enableLogging = value.enableLogging,
        postboxKey = value.postboxKey,
        customAuthArgs = value.customAuthArgs,
        serviceProviderName = value.serviceProviderName;
      if (serviceProviderName !== "TorusServiceProvider") return undefined;
      return new TorusServiceProvider({
        enableLogging: enableLogging,
        postboxKey: postboxKey,
        customAuthArgs: customAuthArgs
      });
    }
  }]);
  return TorusServiceProvider;
}(ServiceProviderBase);

export { TorusServiceProvider, TorusServiceProvider as default };
//# sourceMappingURL=serviceProviderTorus.esm.js.map
