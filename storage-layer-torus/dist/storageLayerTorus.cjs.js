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
  "MockStorageLayer": () => (/* reexport */ src_MockStorageLayer),
  "TorusStorageLayer": () => (/* reexport */ src_TorusStorageLayer),
  "default": () => (/* reexport */ src_TorusStorageLayer)
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
;// CONCATENATED MODULE: external "json-stable-stringify"
const external_json_stable_stringify_namespaceObject = require("json-stable-stringify");
var external_json_stable_stringify_default = /*#__PURE__*/__webpack_require__.n(external_json_stable_stringify_namespaceObject);
;// CONCATENATED MODULE: ./src/MockStorageLayer.ts







var MockStorageLayer = /*#__PURE__*/function () {
  function MockStorageLayer() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        dataMap: {},
        lockMap: {}
      },
      dataMap = _ref.dataMap,
      lockMap = _ref.lockMap;
    classCallCheck_default()(this, MockStorageLayer);
    defineProperty_default()(this, "dataMap", void 0);
    defineProperty_default()(this, "storageLayerName", void 0);
    defineProperty_default()(this, "lockMap", void 0);
    defineProperty_default()(this, "serviceProvider", void 0);
    this.dataMap = dataMap || {};
    this.lockMap = lockMap || {};
    this.storageLayerName = "MockStorageLayer";
  }
  createClass_default()(MockStorageLayer, [{
    key: "getMetadata",
    value:
    /**
     *  Get metadata for a key
     * @param privKey - If not provided, it will use service provider's share for decryption
     */
    function () {
      var _getMetadata = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee(params) {
        var serviceProvider, privKey, usedKey, fromMap;
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                serviceProvider = params.serviceProvider, privKey = params.privKey;
                if (!privKey) usedKey = serviceProvider.retrievePubKeyPoint().getX();else usedKey = (0,common_types_namespaceObject.getPubKeyPoint)(privKey).x;
                fromMap = this.dataMap[usedKey.toString("hex")];
                if (fromMap) {
                  _context.next = 5;
                  break;
                }
                return _context.abrupt("return", Object.create({
                  message: common_types_namespaceObject.KEY_NOT_FOUND
                }));
              case 5:
                return _context.abrupt("return", JSON.parse(this.dataMap[usedKey.toString("hex")]));
              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function getMetadata(_x) {
        return _getMetadata.apply(this, arguments);
      }
      return getMetadata;
    }()
    /**
     * Set Metadata for a key
     * @param input - data to post
     * @param privKey - If not provided, it will use service provider's share for encryption
     */
  }, {
    key: "setMetadata",
    value: function () {
      var _setMetadata = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee2(params) {
        var serviceProvider, privKey, input, usedKey;
        return regenerator_default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                serviceProvider = params.serviceProvider, privKey = params.privKey, input = params.input;
                if (!privKey) usedKey = serviceProvider.retrievePubKeyPoint().getX();else usedKey = (0,common_types_namespaceObject.getPubKeyPoint)(privKey).x;
                this.dataMap[usedKey.toString("hex")] = external_json_stable_stringify_default()(input);
                return _context2.abrupt("return", {
                  message: "success"
                });
              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function setMetadata(_x2) {
        return _setMetadata.apply(this, arguments);
      }
      return setMetadata;
    }()
  }, {
    key: "setMetadataStream",
    value: function () {
      var _setMetadataStream = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee3(params) {
        var _this = this;
        var serviceProvider, privKey, input;
        return regenerator_default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                serviceProvider = params.serviceProvider, privKey = params.privKey, input = params.input;
                input.forEach(function (el, index) {
                  var usedKey;
                  if (!privKey || !privKey[index]) usedKey = serviceProvider.retrievePubKeyPoint().getX();else usedKey = (0,common_types_namespaceObject.getPubKeyPoint)(privKey[index]).x;
                  _this.dataMap[usedKey.toString("hex")] = external_json_stable_stringify_default()(el);
                });
                return _context3.abrupt("return", {
                  message: "success"
                });
              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));
      function setMetadataStream(_x3) {
        return _setMetadataStream.apply(this, arguments);
      }
      return setMetadataStream;
    }()
  }, {
    key: "acquireWriteLock",
    value: function () {
      var _acquireWriteLock = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee4(params) {
        var serviceProvider, privKey, usedKey, id;
        return regenerator_default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                serviceProvider = params.serviceProvider, privKey = params.privKey;
                if (!privKey) usedKey = serviceProvider.retrievePubKeyPoint().getX();else usedKey = (0,common_types_namespaceObject.getPubKeyPoint)(privKey).x;
                if (!this.lockMap[usedKey.toString("hex")]) {
                  _context4.next = 4;
                  break;
                }
                return _context4.abrupt("return", {
                  status: 0
                });
              case 4:
                id = (0,common_types_namespaceObject.generateID)();
                this.lockMap[usedKey.toString("hex")] = id;
                return _context4.abrupt("return", {
                  status: 1,
                  id: id
                });
              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function acquireWriteLock(_x4) {
        return _acquireWriteLock.apply(this, arguments);
      }
      return acquireWriteLock;
    }()
  }, {
    key: "releaseWriteLock",
    value: function () {
      var _releaseWriteLock = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee5(params) {
        var serviceProvider, privKey, id, usedKey;
        return regenerator_default().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                serviceProvider = params.serviceProvider, privKey = params.privKey, id = params.id;
                if (!privKey) usedKey = serviceProvider.retrievePubKeyPoint().getX();else usedKey = (0,common_types_namespaceObject.getPubKeyPoint)(privKey).x;
                if (this.lockMap[usedKey.toString("hex")]) {
                  _context5.next = 4;
                  break;
                }
                return _context5.abrupt("return", {
                  status: 0
                });
              case 4:
                if (!(id !== this.lockMap[usedKey.toString("hex")])) {
                  _context5.next = 6;
                  break;
                }
                return _context5.abrupt("return", {
                  status: 2
                });
              case 6:
                this.lockMap[usedKey.toString("hex")] = null;
                return _context5.abrupt("return", {
                  status: 1
                });
              case 8:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
      function releaseWriteLock(_x5) {
        return _releaseWriteLock.apply(this, arguments);
      }
      return releaseWriteLock;
    }()
  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        dataMap: this.dataMap,
        serviceProvider: this.serviceProvider,
        storageLayerName: this.storageLayerName
      };
    }
  }], [{
    key: "fromJSON",
    value: function fromJSON(value) {
      var dataMap = value.dataMap,
        lockMap = value.lockMap,
        storageLayerName = value.storageLayerName;
      if (storageLayerName !== "MockStorageLayer") return undefined;
      return new MockStorageLayer({
        dataMap: dataMap,
        lockMap: lockMap
      });
    }
  }]);
  return MockStorageLayer;
}();
/* harmony default export */ const src_MockStorageLayer = (MockStorageLayer);
;// CONCATENATED MODULE: external "@babel/runtime/helpers/typeof"
const typeof_namespaceObject = require("@babel/runtime/helpers/typeof");
var typeof_default = /*#__PURE__*/__webpack_require__.n(typeof_namespaceObject);
;// CONCATENATED MODULE: external "@toruslabs/http-helpers"
const http_helpers_namespaceObject = require("@toruslabs/http-helpers");
;// CONCATENATED MODULE: external "bn.js"
const external_bn_js_namespaceObject = require("bn.js");
var external_bn_js_default = /*#__PURE__*/__webpack_require__.n(external_bn_js_namespaceObject);
;// CONCATENATED MODULE: external "web3-utils"
const external_web3_utils_namespaceObject = require("web3-utils");
;// CONCATENATED MODULE: ./src/TorusStorageLayer.ts











function signDataWithPrivKey(data, privKey) {
  var sig = common_types_namespaceObject.ecCurve.sign((0,common_types_namespaceObject.stripHexPrefix)((0,external_web3_utils_namespaceObject.keccak256)(external_json_stable_stringify_default()(data))), (0,common_types_namespaceObject.toPrivKeyECC)(privKey), "utf-8");
  return sig.toDER("hex");
}
var TorusStorageLayer = /*#__PURE__*/function () {
  function TorusStorageLayer(_ref) {
    var _ref$enableLogging = _ref.enableLogging,
      enableLogging = _ref$enableLogging === void 0 ? false : _ref$enableLogging,
      _ref$hostUrl = _ref.hostUrl,
      hostUrl = _ref$hostUrl === void 0 ? "http://localhost:5051" : _ref$hostUrl,
      _ref$serverTimeOffset = _ref.serverTimeOffset,
      serverTimeOffset = _ref$serverTimeOffset === void 0 ? 0 : _ref$serverTimeOffset;
    classCallCheck_default()(this, TorusStorageLayer);
    defineProperty_default()(this, "enableLogging", void 0);
    defineProperty_default()(this, "hostUrl", void 0);
    defineProperty_default()(this, "storageLayerName", void 0);
    defineProperty_default()(this, "serverTimeOffset", void 0);
    this.enableLogging = enableLogging;
    this.hostUrl = hostUrl;
    this.storageLayerName = "TorusStorageLayer";
    this.serverTimeOffset = serverTimeOffset;
  }
  createClass_default()(TorusStorageLayer, [{
    key: "getMetadata",
    value:
    /**
     *  Get metadata for a key
     * @param privKey - If not provided, it will use service provider's share for decryption
     */
    function () {
      var _getMetadata = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee(params) {
        var serviceProvider, privKey, keyDetails, metadataResponse, encryptedMessage, decrypted;
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                serviceProvider = params.serviceProvider, privKey = params.privKey;
                keyDetails = this.generateMetadataParams({}, serviceProvider, privKey);
                _context.next = 4;
                return (0,http_helpers_namespaceObject.post)("".concat(this.hostUrl, "/get"), keyDetails);
              case 4:
                metadataResponse = _context.sent;
                if (!(metadataResponse.message === "")) {
                  _context.next = 7;
                  break;
                }
                return _context.abrupt("return", Object.create({
                  message: common_types_namespaceObject.KEY_NOT_FOUND
                }));
              case 7:
                encryptedMessage = JSON.parse(atob(metadataResponse.message));
                if (!privKey) {
                  _context.next = 14;
                  break;
                }
                _context.next = 11;
                return (0,common_types_namespaceObject.decrypt)((0,common_types_namespaceObject.toPrivKeyECC)(privKey), encryptedMessage);
              case 11:
                decrypted = _context.sent;
                _context.next = 17;
                break;
              case 14:
                _context.next = 16;
                return serviceProvider.decrypt(encryptedMessage);
              case 16:
                decrypted = _context.sent;
              case 17:
                return _context.abrupt("return", JSON.parse(decrypted.toString()));
              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function getMetadata(_x) {
        return _getMetadata.apply(this, arguments);
      }
      return getMetadata;
    }()
    /**
     * Set Metadata for a key
     * @param input - data to post
     * @param privKey - If not provided, it will use service provider's share for encryption
     */
  }, {
    key: "setMetadata",
    value: function () {
      var _setMetadata = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee2(params) {
        var serviceProvider, privKey, input, metadataParams, apiError;
        return regenerator_default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                serviceProvider = params.serviceProvider, privKey = params.privKey, input = params.input;
                _context2.t0 = this;
                _context2.next = 5;
                return TorusStorageLayer.serializeMetadataParamsInput(input, serviceProvider, privKey);
              case 5:
                _context2.t1 = _context2.sent;
                _context2.t2 = serviceProvider;
                _context2.t3 = privKey;
                metadataParams = _context2.t0.generateMetadataParams.call(_context2.t0, _context2.t1, _context2.t2, _context2.t3);
                _context2.next = 11;
                return (0,http_helpers_namespaceObject.post)("".concat(this.hostUrl, "/set"), metadataParams);
              case 11:
                return _context2.abrupt("return", _context2.sent);
              case 14:
                _context2.prev = 14;
                _context2.t4 = _context2["catch"](0);
                _context2.prev = 16;
                _context2.next = 19;
                return _context2.t4.json();
              case 19:
                apiError = _context2.sent;
                _context2.next = 25;
                break;
              case 22:
                _context2.prev = 22;
                _context2.t5 = _context2["catch"](16);
                throw _context2.t4;
              case 25:
                if (!apiError) {
                  _context2.next = 27;
                  break;
                }
                throw new Error((0,common_types_namespaceObject.prettyPrintError)(apiError));
              case 27:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 14], [16, 22]]);
      }));
      function setMetadata(_x2) {
        return _setMetadata.apply(this, arguments);
      }
      return setMetadata;
    }()
  }, {
    key: "setMetadataStream",
    value: function () {
      var _setMetadataStream = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee4(params) {
        var _this = this;
        var serviceProvider, privKey, input, newInput, finalMetadataParams, FD, options, customOptions, apiError;
        return regenerator_default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                serviceProvider = params.serviceProvider, privKey = params.privKey, input = params.input;
                newInput = input;
                _context4.next = 5;
                return Promise.all(newInput.map( /*#__PURE__*/function () {
                  var _ref2 = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee3(el, i) {
                    return regenerator_default().wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.t0 = _this;
                            _context3.next = 3;
                            return TorusStorageLayer.serializeMetadataParamsInput(el, serviceProvider, privKey[i]);
                          case 3:
                            _context3.t1 = _context3.sent;
                            _context3.t2 = serviceProvider;
                            _context3.t3 = privKey[i];
                            return _context3.abrupt("return", _context3.t0.generateMetadataParams.call(_context3.t0, _context3.t1, _context3.t2, _context3.t3));
                          case 7:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
                  }));
                  return function (_x4, _x5) {
                    return _ref2.apply(this, arguments);
                  };
                }()));
              case 5:
                finalMetadataParams = _context4.sent;
                FD = new FormData();
                finalMetadataParams.forEach(function (el, index) {
                  FD.append(index.toString(), JSON.stringify(el));
                });
                options = {
                  mode: "cors",
                  method: "POST",
                  headers: {
                    "Content-Type": undefined
                  }
                };
                customOptions = {
                  isUrlEncodedData: true,
                  timeout: 600 * 1000 // 10 mins of timeout for excessive shares case
                };
                _context4.next = 12;
                return (0,http_helpers_namespaceObject.post)("".concat(this.hostUrl, "/bulk_set_stream"), FD, options, customOptions);
              case 12:
                return _context4.abrupt("return", _context4.sent);
              case 15:
                _context4.prev = 15;
                _context4.t0 = _context4["catch"](0);
                _context4.prev = 17;
                _context4.next = 20;
                return _context4.t0.json();
              case 20:
                apiError = _context4.sent;
                _context4.next = 26;
                break;
              case 23:
                _context4.prev = 23;
                _context4.t1 = _context4["catch"](17);
                throw _context4.t0;
              case 26:
                if (!apiError) {
                  _context4.next = 28;
                  break;
                }
                throw new Error((0,common_types_namespaceObject.prettyPrintError)(apiError));
              case 28:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 15], [17, 23]]);
      }));
      function setMetadataStream(_x3) {
        return _setMetadataStream.apply(this, arguments);
      }
      return setMetadataStream;
    }()
  }, {
    key: "generateMetadataParams",
    value: function generateMetadataParams(message, serviceProvider, privKey) {
      var sig;
      var pubX;
      var pubY;
      var namespace = "tkey";
      var setTKeyStore = {
        data: message,
        timestamp: new (external_bn_js_default())(~~((this.serverTimeOffset + Date.now()) / 1000)).toString(16)
      };

      // Overwrite bulk_set to allow deleting nonce v2 together with creating tKey.
      // This is a workaround, a better solution is allow upstream API to set tableName/namespace of metadata params
      if (message === common_types_namespaceObject.ONE_KEY_DELETE_NONCE) {
        namespace = common_types_namespaceObject.ONE_KEY_NAMESPACE;
        setTKeyStore.data = "<deleted>";
      }
      var hash = (0,external_web3_utils_namespaceObject.keccak256)(external_json_stable_stringify_default()(setTKeyStore)).slice(2);
      if (privKey) {
        var unparsedSig = (0,common_types_namespaceObject.toPrivKeyEC)(privKey).sign(hash);
        sig = Buffer.from(unparsedSig.r.toString(16, 64) + unparsedSig.s.toString(16, 64) + new (external_bn_js_default())(0).toString(16, 2), "hex").toString("base64");
        var pubK = (0,common_types_namespaceObject.getPubKeyPoint)(privKey);
        pubX = pubK.x.toString("hex");
        pubY = pubK.y.toString("hex");
      } else {
        var point = serviceProvider.retrievePubKeyPoint();
        sig = serviceProvider.sign(hash);
        pubX = point.getX().toString("hex");
        pubY = point.getY().toString("hex");
      }
      return {
        pub_key_X: pubX,
        pub_key_Y: pubY,
        set_data: setTKeyStore,
        signature: sig,
        namespace: namespace
      };
    }
  }, {
    key: "acquireWriteLock",
    value: function () {
      var _acquireWriteLock = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee5(params) {
        var serviceProvider, privKey, data, signature, metadataParams;
        return regenerator_default().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                serviceProvider = params.serviceProvider, privKey = params.privKey;
                data = {
                  timestamp: Math.floor((this.serverTimeOffset + Date.now()) / 1000)
                };
                if (privKey) {
                  signature = signDataWithPrivKey(data, privKey);
                } else {
                  signature = serviceProvider.sign((0,common_types_namespaceObject.stripHexPrefix)((0,external_web3_utils_namespaceObject.keccak256)(external_json_stable_stringify_default()(data))));
                }
                metadataParams = {
                  key: (0,common_types_namespaceObject.toPrivKeyEC)(privKey).getPublic("hex"),
                  data: data,
                  signature: signature
                };
                return _context5.abrupt("return", (0,http_helpers_namespaceObject.post)("".concat(this.hostUrl, "/acquireLock"), metadataParams));
              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
      function acquireWriteLock(_x6) {
        return _acquireWriteLock.apply(this, arguments);
      }
      return acquireWriteLock;
    }()
  }, {
    key: "releaseWriteLock",
    value: function () {
      var _releaseWriteLock = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee6(params) {
        var serviceProvider, privKey, id, data, signature, metadataParams;
        return regenerator_default().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                serviceProvider = params.serviceProvider, privKey = params.privKey, id = params.id;
                data = {
                  timestamp: Math.floor((this.serverTimeOffset + Date.now()) / 1000)
                };
                if (privKey) {
                  signature = signDataWithPrivKey(data, privKey);
                } else {
                  signature = serviceProvider.sign((0,common_types_namespaceObject.stripHexPrefix)((0,external_web3_utils_namespaceObject.keccak256)(external_json_stable_stringify_default()(data))));
                }
                metadataParams = {
                  key: (0,common_types_namespaceObject.toPrivKeyEC)(privKey).getPublic("hex"),
                  data: data,
                  signature: signature,
                  id: id
                };
                return _context6.abrupt("return", (0,http_helpers_namespaceObject.post)("".concat(this.hostUrl, "/releaseLock"), metadataParams));
              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
      function releaseWriteLock(_x7) {
        return _releaseWriteLock.apply(this, arguments);
      }
      return releaseWriteLock;
    }()
  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        enableLogging: this.enableLogging,
        hostUrl: this.hostUrl,
        storageLayerName: this.storageLayerName
      };
    }
  }], [{
    key: "serializeMetadataParamsInput",
    value: function () {
      var _serializeMetadataParamsInput = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee7(el, serviceProvider, privKey) {
        var obj, isCommandMessage, bufferMetadata, encryptedDetails, serializedEncryptedDetails;
        return regenerator_default().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!(typeof_default()(el) === "object")) {
                  _context7.next = 5;
                  break;
                }
                // Allow using of special message as command, in which case, do not encrypt
                obj = el;
                isCommandMessage = obj.message === common_types_namespaceObject.ONE_KEY_DELETE_NONCE;
                if (!isCommandMessage) {
                  _context7.next = 5;
                  break;
                }
                return _context7.abrupt("return", obj.message);
              case 5:
                // General case, encrypt message
                bufferMetadata = Buffer.from(external_json_stable_stringify_default()(el));
                if (!privKey) {
                  _context7.next = 12;
                  break;
                }
                _context7.next = 9;
                return (0,common_types_namespaceObject.encrypt)((0,common_types_namespaceObject.getPubKeyECC)(privKey), bufferMetadata);
              case 9:
                encryptedDetails = _context7.sent;
                _context7.next = 15;
                break;
              case 12:
                _context7.next = 14;
                return serviceProvider.encrypt(bufferMetadata);
              case 14:
                encryptedDetails = _context7.sent;
              case 15:
                serializedEncryptedDetails = btoa(external_json_stable_stringify_default()(encryptedDetails));
                return _context7.abrupt("return", serializedEncryptedDetails);
              case 17:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));
      function serializeMetadataParamsInput(_x8, _x9, _x10) {
        return _serializeMetadataParamsInput.apply(this, arguments);
      }
      return serializeMetadataParamsInput;
    }()
  }, {
    key: "fromJSON",
    value: function fromJSON(value) {
      var enableLogging = value.enableLogging,
        hostUrl = value.hostUrl,
        storageLayerName = value.storageLayerName,
        _value$serverTimeOffs = value.serverTimeOffset,
        serverTimeOffset = _value$serverTimeOffs === void 0 ? 0 : _value$serverTimeOffs;
      if (storageLayerName !== "TorusStorageLayer") return undefined;
      return new TorusStorageLayer({
        enableLogging: enableLogging,
        hostUrl: hostUrl,
        serverTimeOffset: serverTimeOffset
      });
    }
  }]);
  return TorusStorageLayer;
}();
/* harmony default export */ const src_TorusStorageLayer = (TorusStorageLayer);
;// CONCATENATED MODULE: ./src/index.ts


module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=storageLayerTorus.cjs.js.map