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
  "SECURITY_QUESTIONS_MODULE_NAME": () => (/* reexport */ SECURITY_QUESTIONS_MODULE_NAME),
  "SecurityQuestionStore": () => (/* reexport */ src_SecurityQuestionStore),
  "SecurityQuestionsError": () => (/* reexport */ errors),
  "SecurityQuestionsModule": () => (/* reexport */ src_SecurityQuestionsModule),
  "default": () => (/* reexport */ src_SecurityQuestionsModule)
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

var SecurityQuestionsError = /*#__PURE__*/function (_TkeyError) {
  inherits_default()(SecurityQuestionsError, _TkeyError);
  var _super = _createSuper(SecurityQuestionsError);
  function SecurityQuestionsError(code, message) {
    var _this;
    classCallCheck_default()(this, SecurityQuestionsError);
    // takes care of stack and proto
    _this = _super.call(this, code, message);

    // Set name explicitly as minification can mangle class names
    Object.defineProperty(assertThisInitialized_default()(_this), "name", {
      value: "SecurityQuestionsError"
    });
    return _this;
  }
  createClass_default()(SecurityQuestionsError, null, [{
    key: "fromCode",
    value: function fromCode(code) {
      var extraMessage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      return new SecurityQuestionsError(code, "".concat(SecurityQuestionsError.messages[code]).concat(extraMessage));
    }

    // Custom methods
  }, {
    key: "unavailable",
    value: function unavailable() {
      var extraMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      return SecurityQuestionsError.fromCode(2101, extraMessage);
    }
  }, {
    key: "unableToReplace",
    value: function unableToReplace() {
      var extraMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      return SecurityQuestionsError.fromCode(2102, extraMessage);
    }
  }, {
    key: "incorrectAnswer",
    value: function incorrectAnswer() {
      var extraMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      return SecurityQuestionsError.fromCode(2103, extraMessage);
    }
  }, {
    key: "noPasswordSaved",
    value: function noPasswordSaved() {
      var extraMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      return SecurityQuestionsError.fromCode(2104, extraMessage);
    }
  }]);
  return SecurityQuestionsError;
}(common_types_namespaceObject.TkeyError);
defineProperty_default()(SecurityQuestionsError, "messages", {
  2101: "security questions might not exist/be setup",
  2102: "security questions exists, cant replace, maybe change?",
  2103: "Incorrect answer",
  2104: "no password saved on tkeyStore"
});
/* harmony default export */ const errors = (SecurityQuestionsError);
;// CONCATENATED MODULE: external "@babel/runtime/helpers/asyncToGenerator"
const asyncToGenerator_namespaceObject = require("@babel/runtime/helpers/asyncToGenerator");
var asyncToGenerator_default = /*#__PURE__*/__webpack_require__.n(asyncToGenerator_namespaceObject);
;// CONCATENATED MODULE: external "@babel/runtime/regenerator"
const regenerator_namespaceObject = require("@babel/runtime/regenerator");
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator_namespaceObject);
;// CONCATENATED MODULE: external "bn.js"
const external_bn_js_namespaceObject = require("bn.js");
var external_bn_js_default = /*#__PURE__*/__webpack_require__.n(external_bn_js_namespaceObject);
;// CONCATENATED MODULE: external "web3-utils"
const external_web3_utils_namespaceObject = require("web3-utils");
;// CONCATENATED MODULE: ./src/SecurityQuestionStore.ts





var SecurityQuestionStore = /*#__PURE__*/function () {
  function SecurityQuestionStore(_ref) {
    var nonce = _ref.nonce,
      shareIndex = _ref.shareIndex,
      sqPublicShare = _ref.sqPublicShare,
      polynomialID = _ref.polynomialID,
      questions = _ref.questions;
    classCallCheck_default()(this, SecurityQuestionStore);
    defineProperty_default()(this, "nonce", void 0);
    defineProperty_default()(this, "shareIndex", void 0);
    defineProperty_default()(this, "sqPublicShare", void 0);
    defineProperty_default()(this, "polynomialID", void 0);
    defineProperty_default()(this, "questions", void 0);
    this.nonce = new (external_bn_js_default())(nonce, "hex");
    this.shareIndex = new (external_bn_js_default())(shareIndex, "hex");
    this.sqPublicShare = new common_types_namespaceObject.PublicShare(sqPublicShare.shareIndex, sqPublicShare.shareCommitment);
    this.polynomialID = polynomialID;
    this.questions = questions;
  }
  createClass_default()(SecurityQuestionStore, [{
    key: "toJSON",
    value: function toJSON() {
      return {
        nonce: this.nonce.toString("hex"),
        shareIndex: this.shareIndex.toString("hex"),
        sqPublicShare: this.sqPublicShare,
        polynomialID: this.polynomialID.toString(),
        questions: this.questions
      };
    }
  }], [{
    key: "fromJSON",
    value: function fromJSON(value) {
      var nonce = value.nonce,
        shareIndex = value.shareIndex,
        sqPublicShare = value.sqPublicShare,
        polynomialID = value.polynomialID,
        questions = value.questions;
      return new SecurityQuestionStore({
        nonce: new (external_bn_js_default())(nonce, "hex"),
        shareIndex: new (external_bn_js_default())(shareIndex, "hex"),
        sqPublicShare: common_types_namespaceObject.PublicShare.fromJSON(sqPublicShare),
        polynomialID: polynomialID,
        questions: questions
      });
    }
  }]);
  return SecurityQuestionStore;
}();
/* harmony default export */ const src_SecurityQuestionStore = (SecurityQuestionStore);
;// CONCATENATED MODULE: ./src/SecurityQuestionsModule.ts










function answerToUserInputHashBN(answerString) {
  return new (external_bn_js_default())((0,external_web3_utils_namespaceObject.keccak256)(answerString).slice(2), "hex");
}
var SECURITY_QUESTIONS_MODULE_NAME = "securityQuestions";
var TKEYSTORE_ID = "answer";
var SecurityQuestionsModule = /*#__PURE__*/function () {
  function SecurityQuestionsModule(saveAnswers) {
    classCallCheck_default()(this, SecurityQuestionsModule);
    defineProperty_default()(this, "moduleName", void 0);
    defineProperty_default()(this, "tbSDK", void 0);
    defineProperty_default()(this, "saveAnswers", void 0);
    this.saveAnswers = saveAnswers;
    this.moduleName = SECURITY_QUESTIONS_MODULE_NAME;
  }
  createClass_default()(SecurityQuestionsModule, [{
    key: "setModuleReferences",
    value: function setModuleReferences(tbSDK) {
      this.tbSDK = tbSDK;
      this.tbSDK._addRefreshMiddleware(this.moduleName, SecurityQuestionsModule.refreshSecurityQuestionsMiddleware);
    }

    // eslint-disable-next-line
  }, {
    key: "initialize",
    value: function () {
      var _initialize = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee() {
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      function initialize() {
        return _initialize.apply(this, arguments);
      }
      return initialize;
    }()
  }, {
    key: "generateNewShareWithSecurityQuestions",
    value: function () {
      var _generateNewShareWithSecurityQuestions = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee2(answerString, questions) {
        var metadata, rawSqStore, newSharesDetails, newShareStore, userInputHash, nonce, sqStore;
        return regenerator_default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                metadata = this.tbSDK.getMetadata(); // TODO: throw in case of TSS
                rawSqStore = metadata.getGeneralStoreDomain(this.moduleName);
                if (!rawSqStore) {
                  _context2.next = 4;
                  break;
                }
                throw errors.unableToReplace();
              case 4:
                _context2.next = 6;
                return this.tbSDK.generateNewShare();
              case 6:
                newSharesDetails = _context2.sent;
                newShareStore = newSharesDetails.newShareStores[newSharesDetails.newShareIndex.toString("hex")];
                userInputHash = answerToUserInputHashBN(answerString);
                nonce = newShareStore.share.share.sub(userInputHash);
                nonce = nonce.umod(common_types_namespaceObject.ecCurve.curve.n);
                sqStore = new src_SecurityQuestionStore({
                  nonce: nonce,
                  questions: questions,
                  sqPublicShare: newShareStore.share.getPublicShare(),
                  shareIndex: newShareStore.share.shareIndex,
                  polynomialID: newShareStore.polynomialID
                });
                metadata.setGeneralStoreDomain(this.moduleName, sqStore);
                _context2.next = 15;
                return this.tbSDK.addShareDescription(newSharesDetails.newShareIndex.toString("hex"), JSON.stringify({
                  module: this.moduleName,
                  questions: questions,
                  dateAdded: Date.now()
                }), false // READ TODO1 (don't sync metadata)
                );
              case 15:
                _context2.next = 17;
                return this.saveAnswerOnTkeyStore(answerString);
              case 17:
                _context2.next = 19;
                return this.tbSDK._syncShareMetadata();
              case 19:
                return _context2.abrupt("return", newSharesDetails);
              case 20:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function generateNewShareWithSecurityQuestions(_x, _x2) {
        return _generateNewShareWithSecurityQuestions.apply(this, arguments);
      }
      return generateNewShareWithSecurityQuestions;
    }()
  }, {
    key: "getSecurityQuestions",
    value: function getSecurityQuestions() {
      var metadata = this.tbSDK.getMetadata();
      var sqStore = new src_SecurityQuestionStore(metadata.getGeneralStoreDomain(this.moduleName));
      return sqStore.questions;
    }
  }, {
    key: "inputShareFromSecurityQuestions",
    value: function () {
      var _inputShareFromSecurityQuestions = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee3(answerString) {
        var metadata, rawSqStore, sqStore, userInputHash, share, shareStore, derivedPublicShare, latestShareDetails;
        return regenerator_default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                metadata = this.tbSDK.getMetadata();
                rawSqStore = metadata.getGeneralStoreDomain(this.moduleName);
                if (rawSqStore) {
                  _context3.next = 4;
                  break;
                }
                throw errors.unavailable();
              case 4:
                sqStore = new src_SecurityQuestionStore(rawSqStore);
                userInputHash = answerToUserInputHashBN(answerString);
                share = sqStore.nonce.add(userInputHash);
                share = share.umod(common_types_namespaceObject.ecCurve.curve.n);
                shareStore = new common_types_namespaceObject.ShareStore(new common_types_namespaceObject.Share(sqStore.shareIndex, share), sqStore.polynomialID); // validate if share is correct
                derivedPublicShare = shareStore.share.getPublicShare();
                if (!(derivedPublicShare.shareCommitment.x.cmp(sqStore.sqPublicShare.shareCommitment.x) !== 0)) {
                  _context3.next = 12;
                  break;
                }
                throw errors.incorrectAnswer();
              case 12:
                _context3.next = 14;
                return this.tbSDK.catchupToLatestShare({
                  shareStore: shareStore,
                  includeLocalMetadataTransitions: true
                });
              case 14:
                latestShareDetails = _context3.sent;
                // TODO: update share nonce on all metadata. would be cleaner in long term?
                // if (shareStore.polynomialID !== latestShareDetails.latestShare.polynomialID) this.storeDeviceShare(latestShareDetails.latestShare);
                this.tbSDK.inputShareStore(latestShareDetails.latestShare);
              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function inputShareFromSecurityQuestions(_x3) {
        return _inputShareFromSecurityQuestions.apply(this, arguments);
      }
      return inputShareFromSecurityQuestions;
    }()
  }, {
    key: "changeSecurityQuestionAndAnswer",
    value: function () {
      var _changeSecurityQuestionAndAnswer = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee4(newAnswerString, newQuestions) {
        var metadata, rawSqStore, sqStore, userInputHash, sqShare, nonce, newSqStore;
        return regenerator_default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                metadata = this.tbSDK.getMetadata();
                rawSqStore = metadata.getGeneralStoreDomain(this.moduleName);
                if (rawSqStore) {
                  _context4.next = 4;
                  break;
                }
                throw errors.unavailable();
              case 4:
                sqStore = new src_SecurityQuestionStore(rawSqStore);
                userInputHash = answerToUserInputHashBN(newAnswerString);
                sqShare = this.tbSDK.outputShareStore(sqStore.shareIndex);
                nonce = sqShare.share.share.sub(userInputHash);
                nonce = nonce.umod(common_types_namespaceObject.ecCurve.curve.n);
                newSqStore = new src_SecurityQuestionStore({
                  nonce: nonce,
                  polynomialID: sqStore.polynomialID,
                  sqPublicShare: sqStore.sqPublicShare,
                  shareIndex: sqStore.shareIndex,
                  questions: newQuestions
                });
                metadata.setGeneralStoreDomain(this.moduleName, newSqStore);
                _context4.next = 13;
                return this.saveAnswerOnTkeyStore(newAnswerString);
              case 13:
                _context4.next = 15;
                return this.tbSDK._syncShareMetadata();
              case 15:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function changeSecurityQuestionAndAnswer(_x4, _x5) {
        return _changeSecurityQuestionAndAnswer.apply(this, arguments);
      }
      return changeSecurityQuestionAndAnswer;
    }()
  }, {
    key: "saveAnswerOnTkeyStore",
    value: function () {
      var _saveAnswerOnTkeyStore = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee5(answerString) {
        var answerStore;
        return regenerator_default().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (this.saveAnswers) {
                  _context5.next = 2;
                  break;
                }
                return _context5.abrupt("return");
              case 2:
                answerStore = {
                  answer: answerString,
                  id: TKEYSTORE_ID
                };
                _context5.next = 5;
                return this.tbSDK._setTKeyStoreItem(this.moduleName, answerStore, false);
              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
      function saveAnswerOnTkeyStore(_x6) {
        return _saveAnswerOnTkeyStore.apply(this, arguments);
      }
      return saveAnswerOnTkeyStore;
    }()
  }, {
    key: "getAnswer",
    value: function () {
      var _getAnswer = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee6() {
        var answerStore;
        return regenerator_default().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!this.saveAnswers) {
                  _context6.next = 5;
                  break;
                }
                _context6.next = 3;
                return this.tbSDK.getTKeyStoreItem(this.moduleName, TKEYSTORE_ID);
              case 3:
                answerStore = _context6.sent;
                return _context6.abrupt("return", answerStore.answer);
              case 5:
                throw errors.noPasswordSaved();
              case 6:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
      function getAnswer() {
        return _getAnswer.apply(this, arguments);
      }
      return getAnswer;
    }()
  }], [{
    key: "refreshSecurityQuestionsMiddleware",
    value: function refreshSecurityQuestionsMiddleware(generalStore, oldShareStores, newShareStores) {
      if (generalStore === undefined || (0,common_types_namespaceObject.isEmptyObject)(generalStore)) {
        return generalStore;
      }
      var sqStore = new src_SecurityQuestionStore(generalStore);
      var sqIndex = sqStore.shareIndex.toString("hex");

      // Assumption: If sqIndex doesn't exist, it must have been explicitly deleted.
      if (oldShareStores[sqIndex] && newShareStores[sqIndex]) {
        var sqAnswer = oldShareStores[sqIndex].share.share.sub(sqStore.nonce);
        var newNonce = newShareStores[sqIndex].share.share.sub(sqAnswer);
        newNonce = newNonce.umod(common_types_namespaceObject.ecCurve.curve.n);
        return new src_SecurityQuestionStore({
          nonce: newNonce,
          polynomialID: newShareStores[Object.keys(newShareStores)[0]].polynomialID,
          sqPublicShare: newShareStores[sqIndex].share.getPublicShare(),
          shareIndex: sqStore.shareIndex,
          questions: sqStore.questions
        });
      }
      return undefined;
    }
  }]);
  return SecurityQuestionsModule;
}();
/* harmony default export */ const src_SecurityQuestionsModule = (SecurityQuestionsModule);
;// CONCATENATED MODULE: ./src/index.ts



module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=securityQuestions.cjs.js.map