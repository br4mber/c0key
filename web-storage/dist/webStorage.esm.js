import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _assertThisInitialized from '@babel/runtime/helpers/assertThisInitialized';
import _inherits from '@babel/runtime/helpers/inherits';
import _possibleConstructorReturn from '@babel/runtime/helpers/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime/helpers/getPrototypeOf';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { TkeyError, ShareStore, prettyPrintError } from '@tkey/common-types';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import BN from 'bn.js';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var WebStorageError = /*#__PURE__*/function (_TkeyError) {
  _inherits(WebStorageError, _TkeyError);
  var _super = _createSuper(WebStorageError);
  function WebStorageError(code, message) {
    var _this;
    _classCallCheck(this, WebStorageError);
    // takes care of stack and proto
    _this = _super.call(this, code, message);
    // Set name explicitly as minification can mangle class names
    Object.defineProperty(_assertThisInitialized(_this), "name", {
      value: "WebStorageError"
    });
    return _this;
  }
  _createClass(WebStorageError, null, [{
    key: "fromCode",
    value: function fromCode(code) {
      var extraMessage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      return new WebStorageError(code, "".concat(WebStorageError.messages[code]).concat(extraMessage));
    }
  }, {
    key: "default",
    value: function _default() {
      var extraMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      return new WebStorageError(3000, "".concat(WebStorageError.messages[3000]).concat(extraMessage));
    }
    // Custom methods
  }, {
    key: "unableToReadFromStorage",
    value: function unableToReadFromStorage() {
      var extraMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      return WebStorageError.fromCode(3101, extraMessage);
    }
  }, {
    key: "shareUnavailableInFileStorage",
    value: function shareUnavailableInFileStorage() {
      var extraMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      return WebStorageError.fromCode(3201, extraMessage);
    }
  }, {
    key: "fileStorageUnavailable",
    value: function fileStorageUnavailable() {
      var extraMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      return WebStorageError.fromCode(3202, extraMessage);
    }
  }, {
    key: "localStorageUnavailable",
    value: function localStorageUnavailable() {
      var extraMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      return WebStorageError.fromCode(3301, extraMessage);
    }
  }, {
    key: "shareUnavailableInLocalStorage",
    value: function shareUnavailableInLocalStorage() {
      var extraMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      return WebStorageError.fromCode(3302, extraMessage);
    }
  }]);
  return WebStorageError;
}(TkeyError);
_defineProperty(WebStorageError, "messages", {
  3000: "default",
  // module
  3101: "unableToReadFromStorage",
  // fileStorage
  3201: "No Share exists in file system",
  3202: "No requestFileSystem",
  // localstorage
  3301: "Local storage is not enabled",
  3302: "No share exists in localstorage"
});

function getWindow() {
  if (typeof window !== "undefined") return window;
  if (typeof self !== "undefined") return self;
  throw new Error("Unable to locate window object.");
}

// Web Specific declarations
var requestedBytes = 1024 * 1024 * 10; // 10MB
var win$1 = getWindow();
win$1.requestFileSystem = win$1.requestFileSystem || win$1.webkitRequestFileSystem;
function download(filename, text) {
  var element = document.createElement("a");
  element.setAttribute("href", "data:application/json;charset=utf-8,".concat(encodeURIComponent(text)));
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
function requestQuota() {
  return _requestQuota.apply(this, arguments);
}
function _requestQuota() {
  _requestQuota = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", new Promise(function (resolve, reject) {
              navigator.webkitPersistentStorage.requestQuota(requestedBytes, resolve, reject);
            }));
          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _requestQuota.apply(this, arguments);
}
function browserRequestFileSystem(_x) {
  return _browserRequestFileSystem.apply(this, arguments);
}
function _browserRequestFileSystem() {
  _browserRequestFileSystem = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(grantedBytes) {
    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt("return", new Promise(function (resolve, reject) {
              win$1.requestFileSystem(win$1.PERSISTENT, grantedBytes, resolve, reject);
            }));
          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _browserRequestFileSystem.apply(this, arguments);
}
function getFile(_x2, _x3, _x4) {
  return _getFile.apply(this, arguments);
}
function _getFile() {
  _getFile = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(fs, path, create) {
    return _regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt("return", new Promise(function (resolve, reject) {
              fs.root.getFile(path, {
                create: create
              }, function (data) {
                return resolve(data);
              }, reject);
            }));
          case 1:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _getFile.apply(this, arguments);
}
function readFile(_x5) {
  return _readFile.apply(this, arguments);
}
function _readFile() {
  _readFile = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7(fileEntry) {
    return _regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt("return", new Promise(function (resolve, reject) {
              fileEntry.file(resolve, reject);
            }));
          case 1:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _readFile.apply(this, arguments);
}
var getShareFromFileStorage = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(key) {
    var fs, fileEntry, file, fileStr;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!win$1.requestFileSystem) {
              _context.next = 16;
              break;
            }
            _context.next = 3;
            return browserRequestFileSystem(requestedBytes);
          case 3:
            fs = _context.sent;
            _context.next = 6;
            return getFile(fs, key, false);
          case 6:
            fileEntry = _context.sent;
            _context.next = 9;
            return readFile(fileEntry);
          case 9:
            file = _context.sent;
            _context.next = 12;
            return file.text();
          case 12:
            fileStr = _context.sent;
            if (fileStr) {
              _context.next = 15;
              break;
            }
            throw WebStorageError.shareUnavailableInFileStorage();
          case 15:
            return _context.abrupt("return", ShareStore.fromJSON(JSON.parse(fileStr)));
          case 16:
            throw WebStorageError.fileStorageUnavailable();
          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function getShareFromFileStorage(_x6) {
    return _ref.apply(this, arguments);
  };
}();
var storeShareOnFileStorage = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(share, key) {
    var fileName, fileStr, grantedBytes, fs, fileEntry;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // if we're on chrome (thus window.requestFileSystem exists) we use it
            fileName = "".concat(key, ".json");
            fileStr = JSON.stringify(share);
            if (!win$1.requestFileSystem) {
              _context2.next = 16;
              break;
            }
            _context2.next = 5;
            return requestQuota();
          case 5:
            grantedBytes = _context2.sent;
            _context2.next = 8;
            return browserRequestFileSystem(grantedBytes);
          case 8:
            fs = _context2.sent;
            _context2.next = 11;
            return getFile(fs, key, true);
          case 11:
            fileEntry = _context2.sent;
            _context2.next = 14;
            return new Promise(function (resolve, reject) {
              fileEntry.createWriter(function (fileWriter) {
                fileWriter.onwriteend = resolve;
                fileWriter.onerror = reject;
                var bb = new Blob([fileStr], {
                  type: "application/json"
                });
                fileWriter.write(bb);
              }, reject);
            });
          case 14:
            _context2.next = 17;
            break;
          case 16:
            // we make the user download a file
            download(fileName, fileStr);
          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return function storeShareOnFileStorage(_x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();
var canAccessFileStorage = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", navigator.permissions.query({
              name: "persistent-storage"
            }));
          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return function canAccessFileStorage() {
    return _ref3.apply(this, arguments);
  };
}();

var win = getWindow();
function storageAvailable(type) {
  var storage;
  try {
    storage = win[type];
    var x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return e instanceof DOMException && (
    // everything except Firefox
    e.code === 22 ||
    // Firefox
    e.code === 1014 ||
    // test name field too, because code might not be present
    // everything except Firefox
    e.name === "QuotaExceededError" ||
    // Firefox
    e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
    // acknowledge QuotaExceededError only if there's something already stored
    storage && storage.length !== 0;
  }
}
var storeShareOnLocalStorage = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(share, key) {
    var fileStr;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fileStr = JSON.stringify(share);
            if (storageAvailable("localStorage")) {
              _context.next = 3;
              break;
            }
            throw WebStorageError.localStorageUnavailable();
          case 3:
            win.localStorage.setItem(key, fileStr);
          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function storeShareOnLocalStorage(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getShareFromLocalStorage = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(key) {
    var foundFile;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (storageAvailable("localStorage")) {
              _context2.next = 2;
              break;
            }
            throw WebStorageError.localStorageUnavailable();
          case 2:
            foundFile = win.localStorage.getItem(key);
            if (foundFile) {
              _context2.next = 5;
              break;
            }
            throw WebStorageError.shareUnavailableInLocalStorage();
          case 5:
            return _context2.abrupt("return", ShareStore.fromJSON(JSON.parse(foundFile)));
          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return function getShareFromLocalStorage(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

var WEB_STORAGE_MODULE_NAME = "webStorage";
var WebStorageModule = /*#__PURE__*/function () {
  function WebStorageModule() {
    var canUseFileStorage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    _classCallCheck(this, WebStorageModule);
    _defineProperty(this, "moduleName", void 0);
    _defineProperty(this, "tbSDK", void 0);
    _defineProperty(this, "canUseFileStorage", void 0);
    this.moduleName = WEB_STORAGE_MODULE_NAME;
    this.canUseFileStorage = canUseFileStorage;
    this.setFileStorageAccess();
  }
  _createClass(WebStorageModule, [{
    key: "setFileStorageAccess",
    value: function () {
      var _setFileStorageAccess = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var result, self;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return canAccessFileStorage();
              case 3:
                result = _context.sent;
                if (result.state === "denied") {
                  this.canUseFileStorage = false;
                } else if (result.state === "granted") {
                  this.canUseFileStorage = true;
                }
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                self = this;
                result.onchange = function permissionChange() {
                  if (this.state === "denied") {
                    self.canUseFileStorage = false;
                  } else if (this.state === "granted") {
                    self.canUseFileStorage = true;
                  }
                };
                _context.next = 11;
                break;
              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](0);
              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 9]]);
      }));
      function setFileStorageAccess() {
        return _setFileStorageAccess.apply(this, arguments);
      }
      return setFileStorageAccess;
    }()
  }, {
    key: "setModuleReferences",
    value: function setModuleReferences(tbSDK) {
      this.tbSDK = tbSDK;
      this.tbSDK._setDeviceStorage(this.storeDeviceShare.bind(this));
    }
    // eslint-disable-next-line
  }, {
    key: "initialize",
    value: function () {
      var _initialize = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));
      function initialize() {
        return _initialize.apply(this, arguments);
      }
      return initialize;
    }()
  }, {
    key: "storeDeviceShare",
    value: function () {
      var _storeDeviceShare = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(deviceShareStore, customDeviceInfo) {
        var metadata, tkeypubx, shareDescription;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                metadata = this.tbSDK.getMetadata();
                tkeypubx = metadata.pubKey.x.toString("hex");
                _context3.next = 4;
                return storeShareOnLocalStorage(deviceShareStore, tkeypubx);
              case 4:
                shareDescription = {
                  module: this.moduleName,
                  userAgent: navigator.userAgent,
                  dateAdded: Date.now()
                };
                if (customDeviceInfo) {
                  shareDescription.customDeviceInfo = JSON.stringify(customDeviceInfo);
                }
                _context3.next = 8;
                return this.tbSDK.addShareDescription(deviceShareStore.share.shareIndex.toString("hex"), JSON.stringify(shareDescription), true);
              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function storeDeviceShare(_x, _x2) {
        return _storeDeviceShare.apply(this, arguments);
      }
      return storeDeviceShare;
    }()
  }, {
    key: "storeDeviceShareOnFileStorage",
    value: function () {
      var _storeDeviceShareOnFileStorage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(shareIndex) {
        var metadata, tkeypubx, shareStore;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                metadata = this.tbSDK.getMetadata();
                tkeypubx = metadata.pubKey.x.toString("hex");
                shareStore = this.tbSDK.outputShareStore(new BN(shareIndex));
                return _context4.abrupt("return", storeShareOnFileStorage(shareStore, tkeypubx));
              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function storeDeviceShareOnFileStorage(_x3) {
        return _storeDeviceShareOnFileStorage.apply(this, arguments);
      }
      return storeDeviceShareOnFileStorage;
    }()
  }, {
    key: "getDeviceShare",
    value: function () {
      var _getDeviceShare = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5() {
        var metadata, tkeypubx, shareStore, _fileErr$message;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                metadata = this.tbSDK.getMetadata();
                tkeypubx = metadata.pubKey.x.toString("hex");
                _context5.prev = 2;
                _context5.next = 5;
                return getShareFromLocalStorage(tkeypubx);
              case 5:
                shareStore = _context5.sent;
                _context5.next = 22;
                break;
              case 8:
                _context5.prev = 8;
                _context5.t0 = _context5["catch"](2);
                if (!this.canUseFileStorage) {
                  _context5.next = 21;
                  break;
                }
                _context5.prev = 11;
                _context5.next = 14;
                return getShareFromFileStorage(tkeypubx);
              case 14:
                shareStore = _context5.sent;
                _context5.next = 21;
                break;
              case 17:
                _context5.prev = 17;
                _context5.t1 = _context5["catch"](11);
                if (_context5.t1 !== null && _context5.t1 !== void 0 && (_fileErr$message = _context5.t1.message) !== null && _fileErr$message !== void 0 && _fileErr$message.includes("storage quota")) {
                  // User has denied access to storage. stop asking for every share
                  this.canUseFileStorage = false;
                }
                throw WebStorageError.unableToReadFromStorage("Error inputShareFromWebStorage: ".concat(prettyPrintError(_context5.t0), " and ").concat(prettyPrintError(_context5.t1)));
              case 21:
                throw WebStorageError.unableToReadFromStorage("Error inputShareFromWebStorage: ".concat(prettyPrintError(_context5.t0)));
              case 22:
                return _context5.abrupt("return", shareStore);
              case 23:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[2, 8], [11, 17]]);
      }));
      function getDeviceShare() {
        return _getDeviceShare.apply(this, arguments);
      }
      return getDeviceShare;
    }()
  }, {
    key: "inputShareFromWebStorage",
    value: function () {
      var _inputShareFromWebStorage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6() {
        var shareStore, latestShareStore, metadata, tkeypubx;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.getDeviceShare();
              case 2:
                shareStore = _context6.sent;
                latestShareStore = shareStore;
                metadata = this.tbSDK.getMetadata();
                if (!(metadata.getLatestPublicPolynomial().getPolynomialID() !== shareStore.polynomialID)) {
                  _context6.next = 12;
                  break;
                }
                _context6.next = 8;
                return this.tbSDK.catchupToLatestShare({
                  shareStore: shareStore,
                  includeLocalMetadataTransitions: true
                });
              case 8:
                latestShareStore = _context6.sent.latestShare;
                tkeypubx = metadata.pubKey.x.toString("hex");
                _context6.next = 12;
                return storeShareOnLocalStorage(latestShareStore, tkeypubx);
              case 12:
                this.tbSDK.inputShareStore(latestShareStore);
              case 13:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
      function inputShareFromWebStorage() {
        return _inputShareFromWebStorage.apply(this, arguments);
      }
      return inputShareFromWebStorage;
    }()
  }]);
  return WebStorageModule;
}();

export { WEB_STORAGE_MODULE_NAME, WebStorageError, WebStorageModule, canAccessFileStorage, WebStorageModule as default, getShareFromFileStorage, getShareFromLocalStorage, storeShareOnFileStorage, storeShareOnLocalStorage };
//# sourceMappingURL=webStorage.esm.js.map
