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
  "SHARE_TRANSFER_MODULE_NAME": () => (/* reexport */ SHARE_TRANSFER_MODULE_NAME),
  "ShareRequest": () => (/* reexport */ src_ShareRequest),
  "ShareTransferError": () => (/* reexport */ errors),
  "ShareTransferModule": () => (/* reexport */ src_ShareTransferModule),
  "ShareTransferStorePointer": () => (/* reexport */ src_ShareTransferStorePointer),
  "default": () => (/* reexport */ src_ShareTransferModule)
});

;// CONCATENATED MODULE: external "@babel/runtime/helpers/classCallCheck"
const classCallCheck_namespaceObject = require("@babel/runtime/helpers/classCallCheck");
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck_namespaceObject);
;// CONCATENATED MODULE: external "@babel/runtime/helpers/createClass"
const createClass_namespaceObject = require("@babel/runtime/helpers/createClass");
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass_namespaceObject);
;// CONCATENATED MODULE: external "@babel/runtime/helpers/assertThisInitialized"
const assertThisInitialized_namespaceObject = require("@babel/runtime/helpers/assertThisInitialized");
var assertThisInitialized_default = /*#__PURE__*/__webpack_require__.n(assertThisInitialized_namespaceObject);
;// CONCATENATED MODULE: external "@babel/runtime/helpers/inherits"
const inherits_namespaceObject = require("@babel/runtime/helpers/inherits");
var inherits_default = /*#__PURE__*/__webpack_require__.n(inherits_namespaceObject);
;// CONCATENATED MODULE: external "@babel/runtime/helpers/possibleConstructorReturn"
const possibleConstructorReturn_namespaceObject = require("@babel/runtime/helpers/possibleConstructorReturn");
var possibleConstructorReturn_default = /*#__PURE__*/__webpack_require__.n(possibleConstructorReturn_namespaceObject);
;// CONCATENATED MODULE: external "@babel/runtime/helpers/getPrototypeOf"
const getPrototypeOf_namespaceObject = require("@babel/runtime/helpers/getPrototypeOf");
var getPrototypeOf_default = /*#__PURE__*/__webpack_require__.n(getPrototypeOf_namespaceObject);
;// CONCATENATED MODULE: external "@babel/runtime/helpers/defineProperty"
const defineProperty_namespaceObject = require("@babel/runtime/helpers/defineProperty");
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty_namespaceObject);
;// CONCATENATED MODULE: external "@tkey/common-types"
const common_types_namespaceObject = require("@tkey/common-types");
;// CONCATENATED MODULE: ./src/errors.ts







function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = getPrototypeOf_default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf_default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn_default()(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var ShareTransferError = /*#__PURE__*/function (_TkeyError) {
  inherits_default()(ShareTransferError, _TkeyError);
  var _super = _createSuper(ShareTransferError);
  function ShareTransferError(code, message) {
    var _this;
    classCallCheck_default()(this, ShareTransferError);
    // takes care of stack and proto
    _this = _super.call(this, code, message);
    // Set name explicitly as minification can mangle class names
    Object.defineProperty(assertThisInitialized_default()(_this), "name", {
      value: "ShareTransferError"
    });
    return _this;
  }
  createClass_default()(ShareTransferError, null, [{
    key: "fromCode",
    value: function fromCode(code) {
      var extraMessage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      return new ShareTransferError(code, "".concat(ShareTransferError.messages[code]).concat(extraMessage));
    }
  }, {
    key: "default",
    value: function _default() {
      var extraMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      return new ShareTransferError(8000, "".concat(ShareTransferError.messages[8000]).concat(extraMessage));
    }

    // Custom methods
  }, {
    key: "missingEncryptionKey",
    value: function missingEncryptionKey() {
      var extraMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      return ShareTransferError.fromCode(8010, extraMessage);
    }
  }, {
    key: "requestExists",
    value: function requestExists() {
      var extraMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      return ShareTransferError.fromCode(8011, extraMessage);
    }
  }, {
    key: "userCancelledRequest",
    value: function userCancelledRequest() {
      var extraMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      return ShareTransferError.fromCode(8012, extraMessage);
    }
  }]);
  return ShareTransferError;
}(common_types_namespaceObject.TkeyError);
defineProperty_default()(ShareTransferError, "messages", {
  8000: "Custom",
  // Misc
  8010: "Missing current enc key",
  8011: "Current request already exists",
  8012: "User cancelled request"
});
/* harmony default export */ const errors = (ShareTransferError);
;// CONCATENATED MODULE: ./src/ShareRequest.ts



var ShareRequest = /*#__PURE__*/createClass_default()(function ShareRequest(_ref) {
  var encPubKey = _ref.encPubKey,
    encShareInTransit = _ref.encShareInTransit,
    availableShareIndexes = _ref.availableShareIndexes,
    userAgent = _ref.userAgent,
    userIp = _ref.userIp,
    timestamp = _ref.timestamp;
  classCallCheck_default()(this, ShareRequest);
  defineProperty_default()(this, "encPubKey", void 0);
  defineProperty_default()(this, "encShareInTransit", void 0);
  defineProperty_default()(this, "availableShareIndexes", void 0);
  defineProperty_default()(this, "userAgent", void 0);
  defineProperty_default()(this, "customInfo", void 0);
  defineProperty_default()(this, "userIp", void 0);
  defineProperty_default()(this, "timestamp", void 0);
  var testEncPubKey = encPubKey;
  if (testEncPubKey.type === "Buffer") {
    this.encPubKey = Buffer.from(testEncPubKey.data);
  } else {
    this.encPubKey = encPubKey;
  }
  this.availableShareIndexes = availableShareIndexes;
  this.encShareInTransit = encShareInTransit;
  this.userAgent = userAgent;
  this.userIp = userIp;
  this.timestamp = timestamp;
});
/* harmony default export */ const src_ShareRequest = (ShareRequest);
;// CONCATENATED MODULE: external "@babel/runtime/helpers/slicedToArray"
const slicedToArray_namespaceObject = require("@babel/runtime/helpers/slicedToArray");
var slicedToArray_default = /*#__PURE__*/__webpack_require__.n(slicedToArray_namespaceObject);
;// CONCATENATED MODULE: external "@babel/runtime/helpers/asyncToGenerator"
const asyncToGenerator_namespaceObject = require("@babel/runtime/helpers/asyncToGenerator");
var asyncToGenerator_default = /*#__PURE__*/__webpack_require__.n(asyncToGenerator_namespaceObject);
;// CONCATENATED MODULE: external "@babel/runtime/regenerator"
const regenerator_namespaceObject = require("@babel/runtime/regenerator");
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator_namespaceObject);
;// CONCATENATED MODULE: external "@toruslabs/eccrypto"
const eccrypto_namespaceObject = require("@toruslabs/eccrypto");
;// CONCATENATED MODULE: external "bn.js"
const external_bn_js_namespaceObject = require("bn.js");
var external_bn_js_default = /*#__PURE__*/__webpack_require__.n(external_bn_js_namespaceObject);
;// CONCATENATED MODULE: ./src/ShareTransferStorePointer.ts




var ShareTransferStorePointer = /*#__PURE__*/createClass_default()(function ShareTransferStorePointer(_ref) {
  var pointer = _ref.pointer;
  classCallCheck_default()(this, ShareTransferStorePointer);
  defineProperty_default()(this, "pointer", void 0);
  this.pointer = new (external_bn_js_default())(pointer, "hex");
});
/* harmony default export */ const src_ShareTransferStorePointer = (ShareTransferStorePointer);
;// CONCATENATED MODULE: external "@toruslabs/http-helpers"
const http_helpers_namespaceObject = require("@toruslabs/http-helpers");
;// CONCATENATED MODULE: ./src/utils.ts



function getClientIp() {
  return _getClientIp.apply(this, arguments);
}
function _getClientIp() {
  _getClientIp = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee() {
    return regenerator_default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0,http_helpers_namespaceObject.promiseTimeout)(10000, fetch("https://icanhazip.com", {}).then(function (response) {
              if (response.ok) {
                return response.text();
              }
              // eslint-disable-next-line @typescript-eslint/no-throw-literal
              throw response;
            }));
          case 3:
            return _context.abrupt("return", _context.sent);
          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", "");
          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 6]]);
  }));
  return _getClientIp.apply(this, arguments);
}
;// CONCATENATED MODULE: ./src/ShareTransferModule.ts













var SHARE_TRANSFER_MODULE_NAME = "shareTransfer";
var ShareTransferModule = /*#__PURE__*/function () {
  function ShareTransferModule() {
    classCallCheck_default()(this, ShareTransferModule);
    defineProperty_default()(this, "moduleName", void 0);
    defineProperty_default()(this, "tbSDK", void 0);
    defineProperty_default()(this, "currentEncKey", void 0);
    defineProperty_default()(this, "requestStatusCheckId", void 0);
    defineProperty_default()(this, "requestStatusCheckInterval", void 0);
    this.moduleName = SHARE_TRANSFER_MODULE_NAME;
    this.requestStatusCheckInterval = 1000;
  }
  createClass_default()(ShareTransferModule, [{
    key: "setModuleReferences",
    value: function setModuleReferences(tbSDK) {
      this.tbSDK = tbSDK;
      this.tbSDK._addRefreshMiddleware(this.moduleName, ShareTransferModule.refreshShareTransferMiddleware);
    }
  }, {
    key: "setRequestStatusCheckInterval",
    value: function setRequestStatusCheckInterval(interval) {
      this.requestStatusCheckInterval = interval;
    }
  }, {
    key: "initialize",
    value: function () {
      var _initialize = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee() {
        var metadata, rawShareTransferStorePointer, shareTransferStorePointer;
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                metadata = this.tbSDK.getMetadata();
                rawShareTransferStorePointer = metadata.getGeneralStoreDomain(this.moduleName);
                if (!rawShareTransferStorePointer) {
                  shareTransferStorePointer = {
                    pointer: new (external_bn_js_default())((0,eccrypto_namespaceObject.generatePrivate)())
                  };
                  metadata.setGeneralStoreDomain(this.moduleName, shareTransferStorePointer);
                  // await this.tbSDK.syncShareMetadata(); // Requires threshold shares
                  // OPTIMIZATION TO NOT SYNC METADATA TWICE ON INIT, WILL FAIL IF TKEY DOES NOT HAVE MODULE AS DEFAULT
                } else {
                  shareTransferStorePointer = new src_ShareTransferStorePointer(rawShareTransferStorePointer);
                }
              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function initialize() {
        return _initialize.apply(this, arguments);
      }
      return initialize;
    }()
  }, {
    key: "requestNewShare",
    value: function () {
      var _requestNewShare = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee3(userAgent, availableShareIndexes, callback) {
        var _this = this;
        var _yield$Promise$all, _yield$Promise$all2, newShareTransferStore, userIp, encPubKeyX;
        return regenerator_default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.currentEncKey) {
                  _context3.next = 2;
                  break;
                }
                throw errors.requestExists("".concat(this.currentEncKey.toString("hex")));
              case 2:
                this.currentEncKey = new (external_bn_js_default())((0,eccrypto_namespaceObject.generatePrivate)());
                _context3.next = 5;
                return Promise.all([this.getShareTransferStore(), getClientIp()]);
              case 5:
                _yield$Promise$all = _context3.sent;
                _yield$Promise$all2 = slicedToArray_default()(_yield$Promise$all, 2);
                newShareTransferStore = _yield$Promise$all2[0];
                userIp = _yield$Promise$all2[1];
                encPubKeyX = (0,common_types_namespaceObject.getPubKeyPoint)(this.currentEncKey).x.toString("hex");
                newShareTransferStore[encPubKeyX] = new src_ShareRequest({
                  encPubKey: (0,common_types_namespaceObject.getPubKeyECC)(this.currentEncKey),
                  encShareInTransit: undefined,
                  availableShareIndexes: availableShareIndexes,
                  userAgent: userAgent,
                  userIp: userIp,
                  timestamp: Date.now()
                });
                _context3.next = 13;
                return this.setShareTransferStore(newShareTransferStore);
              case 13:
                // watcher
                if (callback) {
                  this.requestStatusCheckId = Number(setInterval( /*#__PURE__*/asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee2() {
                    var latestShareTransferStore, shareStoreBuf, receivedShare;
                    return regenerator_default().wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _context2.prev = 0;
                            _context2.next = 3;
                            return _this.getShareTransferStore();
                          case 3:
                            latestShareTransferStore = _context2.sent;
                            if (_this.currentEncKey) {
                              _context2.next = 6;
                              break;
                            }
                            throw errors.missingEncryptionKey();
                          case 6:
                            if (!latestShareTransferStore[encPubKeyX].encShareInTransit) {
                              _context2.next = 17;
                              break;
                            }
                            _context2.next = 9;
                            return (0,common_types_namespaceObject.decrypt)((0,common_types_namespaceObject.toPrivKeyECC)(_this.currentEncKey), latestShareTransferStore[encPubKeyX].encShareInTransit);
                          case 9:
                            shareStoreBuf = _context2.sent;
                            receivedShare = common_types_namespaceObject.ShareStore.fromJSON(JSON.parse(shareStoreBuf.toString()));
                            _context2.next = 13;
                            return _this.tbSDK.inputShareStoreSafe(receivedShare, true);
                          case 13:
                            _this._cleanUpCurrentRequest();
                            callback(null, receivedShare);
                            _context2.next = 18;
                            break;
                          case 17:
                            if (!latestShareTransferStore[encPubKeyX]) {
                              _this._cleanUpCurrentRequest();
                              callback(errors.userCancelledRequest());
                            }
                          case 18:
                            _context2.next = 24;
                            break;
                          case 20:
                            _context2.prev = 20;
                            _context2.t0 = _context2["catch"](0);
                            _this._cleanUpCurrentRequest();
                            callback(_context2.t0);
                          case 24:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2, null, [[0, 20]]);
                  })), this.requestStatusCheckInterval));
                }
                return _context3.abrupt("return", encPubKeyX);
              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function requestNewShare(_x, _x2, _x3) {
        return _requestNewShare.apply(this, arguments);
      }
      return requestNewShare;
    }()
  }, {
    key: "addCustomInfoToShareRequest",
    value: function () {
      var _addCustomInfoToShareRequest = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee4(encPubKeyX, customInfo) {
        var shareTransferStore;
        return regenerator_default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.getShareTransferStore();
              case 2:
                shareTransferStore = _context4.sent;
                if (shareTransferStore[encPubKeyX]) {
                  _context4.next = 5;
                  break;
                }
                throw errors.missingEncryptionKey();
              case 5:
                shareTransferStore[encPubKeyX].customInfo = customInfo;
                _context4.next = 8;
                return this.setShareTransferStore(shareTransferStore);
              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function addCustomInfoToShareRequest(_x4, _x5) {
        return _addCustomInfoToShareRequest.apply(this, arguments);
      }
      return addCustomInfoToShareRequest;
    }()
  }, {
    key: "lookForRequests",
    value: function () {
      var _lookForRequests = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee5() {
        var shareTransferStore;
        return regenerator_default().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.getShareTransferStore();
              case 2:
                shareTransferStore = _context5.sent;
                return _context5.abrupt("return", Object.keys(shareTransferStore));
              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
      function lookForRequests() {
        return _lookForRequests.apply(this, arguments);
      }
      return lookForRequests;
    }()
  }, {
    key: "approveRequest",
    value: function () {
      var _approveRequest = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee6(encPubKeyX, shareStore) {
        var shareTransferStore, bufferedShare, store, availableShareIndexes, metadata, latestPolynomial, latestPolynomialId, indexes, filtered, share, shareRequest;
        return regenerator_default().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.getShareTransferStore();
              case 2:
                shareTransferStore = _context6.sent;
                if (shareTransferStore[encPubKeyX]) {
                  _context6.next = 5;
                  break;
                }
                throw errors.missingEncryptionKey();
              case 5:
                if (shareStore) {
                  bufferedShare = Buffer.from(JSON.stringify(shareStore));
                } else {
                  store = new src_ShareRequest(shareTransferStore[encPubKeyX]);
                  availableShareIndexes = store.availableShareIndexes;
                  metadata = this.tbSDK.getMetadata();
                  latestPolynomial = metadata.getLatestPublicPolynomial();
                  latestPolynomialId = latestPolynomial.getPolynomialID();
                  indexes = metadata.getShareIndexesForPolynomial(latestPolynomialId);
                  filtered = indexes.filter(function (el) {
                    return !availableShareIndexes.includes(el);
                  });
                  share = this.tbSDK.outputShareStore(filtered[0]);
                  bufferedShare = Buffer.from(JSON.stringify(share));
                }
                shareRequest = new src_ShareRequest(shareTransferStore[encPubKeyX]);
                _context6.next = 9;
                return (0,common_types_namespaceObject.encrypt)(shareRequest.encPubKey, bufferedShare);
              case 9:
                shareTransferStore[encPubKeyX].encShareInTransit = _context6.sent;
                _context6.next = 12;
                return this.setShareTransferStore(shareTransferStore);
              case 12:
                this.currentEncKey = undefined;
              case 13:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
      function approveRequest(_x6, _x7) {
        return _approveRequest.apply(this, arguments);
      }
      return approveRequest;
    }()
  }, {
    key: "approveRequestWithShareIndex",
    value: function () {
      var _approveRequestWithShareIndex = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee7(encPubKeyX, shareIndex) {
        var deviceShare;
        return regenerator_default().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                deviceShare = this.tbSDK.outputShareStore(shareIndex);
                return _context7.abrupt("return", this.approveRequest(encPubKeyX, deviceShare));
              case 2:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));
      function approveRequestWithShareIndex(_x8, _x9) {
        return _approveRequestWithShareIndex.apply(this, arguments);
      }
      return approveRequestWithShareIndex;
    }()
  }, {
    key: "getShareTransferStore",
    value: function () {
      var _getShareTransferStore = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee8() {
        var metadata, shareTransferStorePointer, storageLayer;
        return regenerator_default().wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                metadata = this.tbSDK.getMetadata();
                shareTransferStorePointer = new src_ShareTransferStorePointer(metadata.getGeneralStoreDomain(this.moduleName));
                storageLayer = this.tbSDK.getStorageLayer();
                return _context8.abrupt("return", storageLayer.getMetadata({
                  privKey: shareTransferStorePointer.pointer
                }));
              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));
      function getShareTransferStore() {
        return _getShareTransferStore.apply(this, arguments);
      }
      return getShareTransferStore;
    }()
  }, {
    key: "setShareTransferStore",
    value: function () {
      var _setShareTransferStore = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee9(shareTransferStore) {
        var metadata, shareTransferStorePointer, storageLayer;
        return regenerator_default().wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                metadata = this.tbSDK.getMetadata();
                shareTransferStorePointer = new src_ShareTransferStorePointer(metadata.getGeneralStoreDomain(this.moduleName));
                storageLayer = this.tbSDK.getStorageLayer();
                _context9.next = 5;
                return storageLayer.setMetadata({
                  input: shareTransferStore,
                  privKey: shareTransferStorePointer.pointer
                });
              case 5:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));
      function setShareTransferStore(_x10) {
        return _setShareTransferStore.apply(this, arguments);
      }
      return setShareTransferStore;
    }()
  }, {
    key: "startRequestStatusCheck",
    value: function () {
      var _startRequestStatusCheck = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee11(encPubKeyX, deleteRequestAfterCompletion) {
        var _this2 = this;
        return regenerator_default().wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                return _context11.abrupt("return", new Promise(function (resolve, reject) {
                  _this2.requestStatusCheckId = Number(setInterval( /*#__PURE__*/asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee10() {
                    var latestShareTransferStore, shareStoreBuf, receivedShare;
                    return regenerator_default().wrap(function _callee10$(_context10) {
                      while (1) {
                        switch (_context10.prev = _context10.next) {
                          case 0:
                            _context10.prev = 0;
                            _context10.next = 3;
                            return _this2.getShareTransferStore();
                          case 3:
                            latestShareTransferStore = _context10.sent;
                            if (_this2.currentEncKey) {
                              _context10.next = 6;
                              break;
                            }
                            throw errors.missingEncryptionKey();
                          case 6:
                            if (latestShareTransferStore[encPubKeyX]) {
                              _context10.next = 11;
                              break;
                            }
                            _this2._cleanUpCurrentRequest();
                            reject(errors.userCancelledRequest());
                            _context10.next = 23;
                            break;
                          case 11:
                            if (!latestShareTransferStore[encPubKeyX].encShareInTransit) {
                              _context10.next = 23;
                              break;
                            }
                            _context10.next = 14;
                            return (0,common_types_namespaceObject.decrypt)((0,common_types_namespaceObject.toPrivKeyECC)(_this2.currentEncKey), latestShareTransferStore[encPubKeyX].encShareInTransit);
                          case 14:
                            shareStoreBuf = _context10.sent;
                            receivedShare = common_types_namespaceObject.ShareStore.fromJSON(JSON.parse(shareStoreBuf.toString()));
                            _context10.next = 18;
                            return _this2.tbSDK.inputShareStoreSafe(receivedShare, true);
                          case 18:
                            if (!deleteRequestAfterCompletion) {
                              _context10.next = 21;
                              break;
                            }
                            _context10.next = 21;
                            return _this2.deleteShareTransferStore(encPubKeyX);
                          case 21:
                            _this2._cleanUpCurrentRequest();
                            resolve(receivedShare);
                          case 23:
                            _context10.next = 29;
                            break;
                          case 25:
                            _context10.prev = 25;
                            _context10.t0 = _context10["catch"](0);
                            _this2._cleanUpCurrentRequest();
                            reject(_context10.t0);
                          case 29:
                          case "end":
                            return _context10.stop();
                        }
                      }
                    }, _callee10, null, [[0, 25]]);
                  })), _this2.requestStatusCheckInterval));
                }));
              case 1:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }));
      function startRequestStatusCheck(_x11, _x12) {
        return _startRequestStatusCheck.apply(this, arguments);
      }
      return startRequestStatusCheck;
    }()
  }, {
    key: "cancelRequestStatusCheck",
    value: function () {
      var _cancelRequestStatusCheck = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee12() {
        return regenerator_default().wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                clearInterval(this.requestStatusCheckId);
              case 1:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));
      function cancelRequestStatusCheck() {
        return _cancelRequestStatusCheck.apply(this, arguments);
      }
      return cancelRequestStatusCheck;
    }()
  }, {
    key: "deleteShareTransferStore",
    value: function () {
      var _deleteShareTransferStore = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee13(encPubKey) {
        var currentShareTransferStore;
        return regenerator_default().wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return this.getShareTransferStore();
              case 2:
                currentShareTransferStore = _context13.sent;
                delete currentShareTransferStore[encPubKey];
                _context13.next = 6;
                return this.setShareTransferStore(currentShareTransferStore);
              case 6:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));
      function deleteShareTransferStore(_x13) {
        return _deleteShareTransferStore.apply(this, arguments);
      }
      return deleteShareTransferStore;
    }()
  }, {
    key: "resetShareTransferStore",
    value: function () {
      var _resetShareTransferStore = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee14() {
        var metadata, shareTransferStorePointer;
        return regenerator_default().wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                metadata = this.tbSDK.getMetadata();
                shareTransferStorePointer = {
                  pointer: new (external_bn_js_default())((0,eccrypto_namespaceObject.generatePrivate)())
                };
                metadata.setGeneralStoreDomain(this.moduleName, shareTransferStorePointer);
                _context14.next = 5;
                return this.tbSDK._syncShareMetadata();
              case 5:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));
      function resetShareTransferStore() {
        return _resetShareTransferStore.apply(this, arguments);
      }
      return resetShareTransferStore;
    }()
  }, {
    key: "_cleanUpCurrentRequest",
    value: function _cleanUpCurrentRequest() {
      this.currentEncKey = undefined;
      clearInterval(this.requestStatusCheckId);
    }
  }], [{
    key: "refreshShareTransferMiddleware",
    value: function refreshShareTransferMiddleware(generalStore, oldShareStores, newShareStores) {
      var numberOfOldShares = Object.keys(oldShareStores).length;
      var numberOfNewShares = Object.keys(newShareStores).length;

      // This is needed to avoid MIM during share deletion.
      if (numberOfNewShares <= numberOfOldShares) {
        var shareTransferStorePointer = {
          pointer: new (external_bn_js_default())((0,eccrypto_namespaceObject.generatePrivate)())
        };
        return shareTransferStorePointer;
      }
      return generalStore;
    }
  }]);
  return ShareTransferModule;
}();
/* harmony default export */ const src_ShareTransferModule = (ShareTransferModule);
;// CONCATENATED MODULE: ./src/index.ts





module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=shareTransfer.cjs.js.map